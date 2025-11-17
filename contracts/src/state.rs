use super::{Asset, IncomeRecord, Ownership, Proposal, RWAId};
use linera_sdk::base::{Amount, Owner};
use std::time::{SystemTime, UNIX_EPOCH};

#[derive(Clone, Debug, serde::Deserialize, serde::Serialize)]
pub struct RWAState {
    pub assets: std::collections::HashMap<RWAId, Asset>,
    pub ownerships: Vec<Ownership>,
    pub next_asset_id: u64,
    pub balances: std::collections::HashMap<Owner, Amount>,
    pub income_history: Vec<IncomeRecord>,
    pub proposals: std::collections::HashMap<u64, Proposal>,
    pub votes: std::collections::HashMap<(u64, Owner), bool>, // (proposal_id, owner) -> vote_for
    pub next_proposal_id: u64,
}

impl RWAState {
    pub fn new() -> Self {
        Self {
            assets: std::collections::HashMap::new(),
            ownerships: Vec::new(),
            next_asset_id: 1,
            balances: std::collections::HashMap::new(),
            income_history: Vec::new(),
            proposals: std::collections::HashMap::new(),
            votes: std::collections::HashMap::new(),
            next_proposal_id: 1,
        }
    }

    pub fn create_asset(
        &mut self,
        id: RWAId,
        name: String,
        value: Amount,
        token_price: Amount,
        description: String,
    ) -> Result<(), String> {
        if self.assets.contains_key(&id) {
            return Err("Asset already exists".to_string());
        }

        let asset = Asset {
            id,
            name,
            value,
            token_price,
            total_percentage: 0,
            description,
        };

        self.assets.insert(id, asset);
        self.next_asset_id = id.0 + 1;
        Ok(())
    }

    pub fn transfer_ownership(
        &mut self,
        asset_id: RWAId,
        from: Owner,
        to: Owner,
        percentage: u64,
    ) -> Result<(), String> {
        // Validate ownership
        let current_ownership: u64 = self
            .ownerships
            .iter()
            .filter(|o| o.asset_id == asset_id && o.owner == from)
            .map(|o| o.percentage)
            .sum();

        if current_ownership < percentage {
            return Err("Insufficient ownership".to_string());
        }

        // Update from ownership
        for owner in &mut self.ownerships {
            if owner.asset_id == asset_id && owner.owner == from {
                if owner.percentage > percentage {
                    owner.percentage -= percentage;
                } else {
                    owner.percentage = 0;
                }
                break;
            }
        }

        // Add to ownership
        self.ownerships.push(Ownership {
            asset_id,
            owner: to,
            percentage,
        });

        Ok(())
    }

    pub fn buy_tokens(
        &mut self,
        asset_id: RWAId,
        buyer: Owner,
        amount: Amount,
    ) -> Result<u64, String> {
        let asset = self.assets.get_mut(&asset_id)
            .ok_or("Asset not found")?;

        let tokens = amount.checked_div(asset.token_price)
            .ok_or("Invalid token price")?;

        let percentage = (tokens.0 as f64 / (asset.value.0 as f64 / asset.token_price.0 as f64) * 100.0) as u64;

        if asset.total_percentage + percentage > 100 {
            return Err("Cannot exceed 100% total ownership".to_string());
        }

        asset.total_percentage += percentage;

        // Add ownership
        self.ownerships.push(Ownership {
            asset_id,
            owner: buyer,
            percentage,
        });

        Ok(tokens.0 as u64)
    }

    pub fn get_asset(&self, asset_id: RWAId) -> Option<&Asset> {
        self.assets.get(&asset_id)
    }

    pub fn list_assets(&self) -> Vec<&Asset> {
        self.assets.values().collect()
    }

    pub fn get_ownership(&self, owner: Owner) -> Vec<Ownership> {
        self.ownerships
            .iter()
            .filter(|o| o.owner == owner)
            .cloned()
            .collect()
    }

    pub fn distribute_rental_income(
        &mut self,
        asset_id: RWAId,
        total_amount: Amount,
    ) -> Result<Vec<(Owner, Amount)>, String> {
        let asset = self.assets.get(&asset_id)
            .ok_or("Asset not found")?;

        // Get all owners of this asset
        let owners: Vec<(Owner, u64)> = self.ownerships
            .iter()
            .filter(|o| o.asset_id == asset_id)
            .map(|o| (o.owner, o.percentage))
            .collect();

        let total_percentage: u64 = owners.iter().map(|(_, p)| p).sum();
        if total_percentage == 0 {
            return Err("No owners found".to_string());
        }

        let mut distributions = Vec::new();
        let timestamp = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs();

        for (owner, percentage) in owners {
            let owner_amount = Amount(
                (total_amount.0 as f64 * percentage as f64 / total_percentage as f64) as u64
            );
            
            // Update balance
            *self.balances.entry(owner).or_insert(Amount(0)) += owner_amount;

            // Record income history
            self.income_history.push(IncomeRecord {
                asset_id,
                owner,
                amount: owner_amount,
                timestamp,
            });

            distributions.push((owner, owner_amount));
        }

        Ok(distributions)
    }

    pub fn create_proposal(
        &mut self,
        asset_id: RWAId,
        proposal_id: u64,
        title: String,
        description: String,
        proposal_type: String,
    ) -> Result<(), String> {
        if self.proposals.contains_key(&proposal_id) {
            return Err("Proposal already exists".to_string());
        }

        let deadline = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs() + (7 * 24 * 60 * 60); // 7 days from now

        let proposal = Proposal {
            id: proposal_id,
            asset_id,
            title,
            description,
            proposal_type,
            votes_for: 0,
            votes_against: 0,
            deadline,
            status: "active".to_string(),
        };

        self.proposals.insert(proposal_id, proposal);
        self.next_proposal_id = proposal_id + 1;
        Ok(())
    }

    pub fn vote(
        &mut self,
        proposal_id: u64,
        voter: Owner,
        vote_for: bool,
        voting_power: u64,
    ) -> Result<(), String> {
        let proposal = self.proposals.get_mut(&proposal_id)
            .ok_or("Proposal not found")?;

        // Check if already voted
        if self.votes.contains_key(&(proposal_id, voter)) {
            return Err("Already voted".to_string());
        }

        // Check deadline
        let now = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs();
        if now > proposal.deadline {
            return Err("Proposal deadline passed".to_string());
        }

        // Record vote
        self.votes.insert((proposal_id, voter), vote_for);

        // Update vote counts
        if vote_for {
            proposal.votes_for += voting_power;
        } else {
            proposal.votes_against += voting_power;
        }

        Ok(())
    }

    pub fn get_income_history(&self, asset_id: RWAId, owner: Owner) -> Vec<IncomeRecord> {
        self.income_history
            .iter()
            .filter(|r| r.asset_id == asset_id && r.owner == owner)
            .cloned()
            .collect()
    }

    pub fn get_proposals(&self, asset_id: RWAId) -> Vec<Proposal> {
        self.proposals
            .values()
            .filter(|p| p.asset_id == asset_id)
            .cloned()
            .collect()
    }

    pub fn get_proposal(&self, proposal_id: u64) -> Option<&Proposal> {
        self.proposals.get(&proposal_id)
    }
}

