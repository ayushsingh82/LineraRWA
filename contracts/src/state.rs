use super::{Asset, Ownership, RWAId};
use linera_sdk::base::{Amount, Owner};

#[derive(Clone, Debug, serde::Deserialize, serde::Serialize)]
pub struct RWAState {
    pub assets: std::collections::HashMap<RWAId, Asset>,
    pub ownerships: Vec<Ownership>,
    pub next_asset_id: u64,
    pub balances: std::collections::HashMap<Owner, Amount>,
}

impl RWAState {
    pub fn new() -> Self {
        Self {
            assets: std::collections::HashMap::new(),
            ownerships: Vec::new(),
            next_asset_id: 1,
            balances: std::collections::HashMap::new(),
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
}

