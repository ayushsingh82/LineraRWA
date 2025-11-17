pub mod contract;
pub mod service;
pub mod state;

pub use contract::RWAContract;
pub use service::RWAService;
pub use state::RWAState;

use async_trait::async_trait;
use linera_sdk::base::{Amount, ApplicationId, ChainId, Destination, MessageId, Owner, WithCallbacks};
use linera_sdk::service::SystemContext;

#[derive(Clone, Copy, Debug, serde::Deserialize, serde::Serialize, PartialEq, Eq, Hash)]
pub struct RWAId(pub u64);

#[derive(Debug, serde::Deserialize, serde::Serialize)]
pub struct Ownership {
    pub asset_id: RWAId,
    pub owner: Owner,
    pub percentage: u64,
}

#[derive(Debug, serde::Deserialize, serde::Serialize)]
pub struct Asset {
    pub id: RWAId,
    pub name: String,
    pub value: Amount,
    pub token_price: Amount,
    pub total_percentage: u64,
    pub description: String,
}

#[async_trait]
pub trait RWAApplication: WithCallbacks + Send + Sync {
    fn balance(&self) -> &Amount;

    async fn initialize(&mut self, application_parameters: Vec<u8>);

    async fn execute_operation(&mut self, operation: Operation);

    async fn execute_message(&mut self, message: Message);

    async fn store_operation(&mut self) -> Result<String, String>;

    async fn handle_query(&self, request: Request) -> Response;
}

#[derive(Clone, Debug, serde::Deserialize, serde::Serialize)]
pub enum Operation {
    CreateAsset {
        asset_id: RWAId,
        name: String,
        value: Amount,
        token_price: Amount,
        description: String,
    },
    TransferOwnership {
        asset_id: RWAId,
        to: Owner,
        percentage: u64,
    },
    BuyTokens {
        asset_id: RWAId,
        amount: Amount,
    },
    DistributeRentalIncome {
        asset_id: RWAId,
        total_amount: Amount,
    },
    CreateProposal {
        asset_id: RWAId,
        proposal_id: u64,
        title: String,
        description: String,
        proposal_type: String,
    },
    Vote {
        proposal_id: u64,
        vote_for: bool,
        voting_power: u64,
    },
}

#[derive(Clone, Debug, serde::Deserialize, serde::Serialize)]
pub enum Message {
    AssetCreated {
        asset_id: RWAId,
        name: String,
    },
    IncomeDistributed {
        asset_id: RWAId,
        owner: Owner,
        amount: Amount,
    },
    ProposalCreated {
        proposal_id: u64,
        asset_id: RWAId,
    },
    VoteCast {
        proposal_id: u64,
        voter: Owner,
        vote_for: bool,
    },
}

#[derive(Clone, Debug, serde::Deserialize, serde::Serialize)]
pub enum Request {
    Balance,
    GetAsset { asset_id: RWAId },
    ListAssets,
    GetOwnership { owner: Owner },
    GetIncomeHistory { asset_id: RWAId, owner: Owner },
    GetProposals { asset_id: RWAId },
    GetProposal { proposal_id: u64 },
}

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub enum Response {
    Balance(Amount),
    Asset(Asset),
    Assets(Vec<Asset>),
    Ownership(Vec<Ownership>),
    Error(String),
}

