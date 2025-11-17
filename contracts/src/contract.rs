use super::{Asset, IncomeRecord, Message, Operation, Ownership, Proposal, Request, Response, RWAApplication, RWAId, RWAState};
use async_trait::async_trait;
use linera_sdk::base::{Amount, ApplicationId, ChainId, Destination, MessageId, Owner, WithCallbacks};
use linera_sdk::service::SystemContext;

pub struct RWAContract {
    state: RWAState,
    system_context: SystemContext,
}

#[async_trait]
impl RWAApplication for RWAContract {
    fn balance(&self) -> &Amount {
        // TODO: Implement balance
        &Amount(0)
    }

    async fn initialize(&mut self, _application_parameters: Vec<u8>) {
        // Initialize the application
    }

    async fn execute_operation(&mut self, operation: Operation) {
        match operation {
            Operation::CreateAsset {
                asset_id,
                name,
                value,
                token_price,
                description,
            } => {
                if let Err(e) = self.state.create_asset(
                    asset_id,
                    name,
                    value,
                    token_price,
                    description,
                ) {
                    eprintln!("Error creating asset: {}", e);
                }
            }
            Operation::TransferOwnership { asset_id, to, percentage } => {
                // Get current owner from system context
                let from = self.system_context.owner();
                if let Err(e) = self.state.transfer_ownership(asset_id, from, to, percentage) {
                    eprintln!("Error transferring ownership: {}", e);
                }
            }
            Operation::BuyTokens { asset_id, amount } => {
                let buyer = self.system_context.owner();
                match self.state.buy_tokens(asset_id, buyer, amount) {
                    Ok(tokens) => {
                        println!("Bought {} tokens for asset {}", tokens, asset_id.0);
                    }
                    Err(e) => {
                        eprintln!("Error buying tokens: {}", e);
                    }
                }
            }
            Operation::DistributeRentalIncome { asset_id, total_amount } => {
                match self.state.distribute_rental_income(asset_id, total_amount) {
                    Ok(distributions) => {
                        println!("Distributed rental income for asset {}: {} distributions", asset_id.0, distributions.len());
                    }
                    Err(e) => {
                        eprintln!("Error distributing rental income: {}", e);
                    }
                }
            }
            Operation::CreateProposal { asset_id, proposal_id, title, description, proposal_type } => {
                match self.state.create_proposal(asset_id, proposal_id, title, description, proposal_type) {
                    Ok(_) => {
                        println!("Proposal {} created for asset {}", proposal_id, asset_id.0);
                    }
                    Err(e) => {
                        eprintln!("Error creating proposal: {}", e);
                    }
                }
            }
            Operation::Vote { proposal_id, vote_for, voting_power } => {
                let voter = self.system_context.owner();
                match self.state.vote(proposal_id, voter, vote_for, voting_power) {
                    Ok(_) => {
                        println!("Vote cast on proposal {}: {}", proposal_id, if vote_for { "FOR" } else { "AGAINST" });
                    }
                    Err(e) => {
                        eprintln!("Error casting vote: {}", e);
                    }
                }
            }
        }
    }

    async fn execute_message(&mut self, message: Message) {
        match message {
            Message::AssetCreated { asset_id, name } => {
                println!("Asset created: {} ({})", name, asset_id.0);
            }
            Message::IncomeDistributed { asset_id, owner, amount } => {
                println!("Income distributed: {} to owner for asset {}", amount.0, asset_id.0);
            }
            Message::ProposalCreated { proposal_id, asset_id } => {
                println!("Proposal {} created for asset {}", proposal_id, asset_id.0);
            }
            Message::VoteCast { proposal_id, voter, vote_for } => {
                println!("Vote cast on proposal {}: {}", proposal_id, if vote_for { "FOR" } else { "AGAINST" });
            }
        }
    }

    async fn store_operation(&mut self) -> Result<String, String> {
        // Store operations for cross-chain messaging
        Ok("Operation stored".to_string())
    }

    async fn handle_query(&self, request: Request) -> Response {
        match request {
            Request::Balance => {
                Response::Balance(*self.balance())
            }
            Request::GetAsset { asset_id } => {
                match self.state.get_asset(asset_id) {
                    Some(asset) => Response::Asset(asset.clone()),
                    None => Response::Error("Asset not found".to_string()),
                }
            }
            Request::ListAssets => {
                Response::Assets(
                    self.state.list_assets().into_iter().cloned().collect(),
                )
            }
            Request::GetOwnership { owner } => {
                Response::Ownership(self.state.get_ownership(owner))
            }
            Request::GetIncomeHistory { asset_id, owner } => {
                Response::IncomeHistory(self.state.get_income_history(asset_id, owner))
            }
            Request::GetProposals { asset_id } => {
                Response::Proposals(self.state.get_proposals(asset_id))
            }
            Request::GetProposal { proposal_id } => {
                match self.state.get_proposal(proposal_id) {
                    Some(proposal) => Response::Proposal(proposal.clone()),
                    None => Response::Error("Proposal not found".to_string()),
                }
            }
        }
    }
}

impl RWAContract {
    pub fn new(system_context: SystemContext) -> Self {
        Self {
            state: RWAState::new(),
            system_context,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_create_asset() {
        let mut state = RWAState::new();
        let asset_id = RWAId(1);
        
        state.create_asset(
            asset_id,
            "Test Asset".to_string(),
            Amount(1000000),
            Amount(1),
            "Test Description".to_string(),
        ).unwrap();

        assert!(state.get_asset(asset_id).is_some());
    }

    #[test]
    fn test_buy_tokens() {
        let mut state = RWAState::new();
        let asset_id = RWAId(1);
        let owner = Owner::from([0; 32]);

        state.create_asset(
            asset_id,
            "Test Asset".to_string(),
            Amount(1000000),
            Amount(1),
            "Test Description".to_string(),
        ).unwrap();

        let result = state.buy_tokens(asset_id, owner, Amount(10000));
        assert!(result.is_ok());
    }
}

