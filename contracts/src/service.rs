use super::{Asset, Message, Operation, Ownership, Request, Response, RWAApplication, RWAId, RWAState};
use async_trait::async_trait;
use linera_sdk::base::{Amount, ChainId, Owner};
use linera_sdk::service::{ServiceContext, ViewStateContext};

pub struct RWAService {
    state: RWAState,
}

impl RWAService {
    pub fn new(state: RWAState) -> Self {
        Self { state }
    }

    pub async fn query_balance(&self, _context: &ServiceContext) -> Amount {
        Amount(0) // TODO: Implement actual balance
    }

    pub async fn query_asset(
        &self,
        _context: &ServiceContext,
        asset_id: RWAId,
    ) -> Option<Asset> {
        self.state.get_asset(asset_id).cloned()
    }

    pub async fn list_assets(&self, _context: &ServiceContext) -> Vec<Asset> {
        self.state.list_assets().into_iter().cloned().collect()
    }

    pub async fn query_ownership(
        &self,
        _context: &ServiceContext,
        owner: Owner,
    ) -> Vec<Ownership> {
        self.state.get_ownership(owner)
    }
}

#[async_trait]
impl RWAApplication for RWAService {
    fn balance(&self) -> &Amount {
        &Amount(0)
    }

    async fn initialize(&mut self, _application_parameters: Vec<u8>) {
        // Service initialization
    }

    async fn execute_operation(&mut self, operation: Operation) {
        // Service operations
        eprintln!("Executing operation in service: {:?}", operation);
    }

    async fn execute_message(&mut self, message: Message) {
        // Service messages
        eprintln!("Executing message in service: {:?}", message);
    }

    async fn store_operation(&mut self) -> Result<String, String> {
        Ok("Service operation stored".to_string())
    }

    async fn handle_query(&self, request: Request) -> Response {
        // For now, return state queries
        // In a real implementation, this would interface with a service
        match request {
            Request::Balance => Response::Balance(Amount(0)),
            Request::GetAsset { asset_id } => {
                self.query_asset(&ServiceContext::default(), asset_id)
                    .map(Response::Asset)
                    .unwrap_or_else(|| Response::Error("Asset not found".to_string()))
            }
            Request::ListAssets => {
                Response::Assets(self.list_assets(&ServiceContext::default()).await)
            }
            Request::GetOwnership { owner } => {
                Response::Ownership(self.query_ownership(&ServiceContext::default(), owner).await)
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_service_creation() {
        let state = RWAState::new();
        let service = RWAService::new(state);
        assert_eq!(*service.balance(), Amount(0));
    }

    #[tokio::test]
    async fn test_query_assets() {
        let mut state = RWAState::new();
        let asset_id = RWAId(1);
        
        state.create_asset(
            asset_id,
            "Test Asset".to_string(),
            Amount(1000000),
            Amount(1),
            "Test Description".to_string(),
        ).unwrap();

        let service = RWAService::new(state);
        let assets = service.list_assets(&ServiceContext::default()).await;
        assert_eq!(assets.len(), 1);
    }
}

