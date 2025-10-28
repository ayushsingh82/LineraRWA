# RWA Tokenization Smart Contract

A Linera-based smart contract for Real World Asset (RWA) tokenization with percentage-based fractional ownership.

## 📁 Project Structure

```
contracts/
├── Cargo.toml          # Project manifest with dependencies
├── README.md           # This file
└── src/
    ├── lib.rs          # Application ABI & exports
    ├── state.rs        # Application state management
    ├── contract.rs     # Contract logic & bytecode
    └── service.rs      # Service logic & bytecode
```

## 🔧 Files Created

### **Cargo.toml**
- Project manifest
- Dependencies: `async-trait`, `linera-sdk`
- Binary targets: `service` and `contract`

### **src/lib.rs**
- **ABI definitions**
- Exports: `Operation`, `Message`, `Request`, `Response`
- Types: `RWAId`, `Asset`, `Ownership`
- `RWAApplication` trait

Key components:
- `RWAId`: Unique identifier for RWA assets
- `Asset`: Represents a tokenized real-world asset with value, price, and metadata
- `Ownership`: Tracks fractional ownership (percentage-based)
- `Operation`: Defines contract operations (Create, Transfer, Buy)
- `Request/Response`: Query interface for retrieving data

### **src/state.rs**
- **Manages asset state and ownership**
- Methods:
  - `create_asset()` - Create new RWA
  - `transfer_ownership()` - Transfer ownership percentages
  - `buy_tokens()` - Buy RWA tokens with percentage tracking

Key features:
- Hash map-based asset storage
- Ownership list management
- Automatic percentage validation
- Balance tracking per owner

### **src/contract.rs**
- **Contract execution logic**
- Handles operations:
  - Create asset
  - Transfer ownership
  - Buy tokens
- Tests included

Contract methods:
- `initialize()` - Setup new contract instance
- `execute_operation()` - Process blockchain operations
- `execute_message()` - Handle cross-chain messages
- `store_operation()` - Persist operations

### **src/service.rs**
- **Query handling for the service**
- Methods: query balance, assets, ownership
- Uses `RWAState` for queries

Service methods:
- `query_balance()` - Get user's balance
- `query_asset()` - Get asset by ID
- `list_assets()` - List all available assets
- `query_ownership()` - Get ownership records for a user

## ✨ Features

### **Percentage-based ownership (1–100%)**
Assets can be divided into fractional ownership shares, tracked as percentages. Multiple owners can own different percentages of the same asset.

### **Fractional tokenization**
Real-world assets are converted into tokens at a configurable price. Users can buy tokens representing ownership percentages.

### **Ownership transfer**
Owners can transfer their ownership percentage to other addresses. The system validates that you cannot transfer more than you own.

### **Built-in tests**
Comprehensive test suite included:
- Asset creation tests
- Token purchase tests
- Ownership validation tests
- Edge case handling

### **State validation (prevents >100% ownership)**
The contract enforces that total ownership percentage never exceeds 100%. This prevents double-spending and ensures data integrity.

### **Query functionality**
Multiple query endpoints allow users to:
- Check their balance
- Look up specific assets
- Browse available investment opportunities
- View their ownership records

## 🔨 Building the Contract

The contract is ready for building with:

```bash
# Navigate to contracts directory
cd contracts

# Build the contract
cargo build --release

# Run tests
cargo test

# Check for issues
cargo check
```

## 📊 Data Structures

### Asset
```rust
pub struct Asset {
    pub id: RWAId,
    pub name: String,
    pub value: Amount,
    pub token_price: Amount,
    pub total_percentage: u64,
    pub description: String,
}
```

### Ownership
```rust
pub struct Ownership {
    pub asset_id: RWAId,
    pub owner: Owner,
    pub percentage: u64,
}
```

## 🎯 Use Cases

1. **Real Estate Tokenization**
   - Convert properties into tradeable tokens
   - Enable fractional ownership
   - Distribute rental income proportionally

2. **Asset Investment**
   - Buy small percentages of high-value assets
   - Portfolio diversification
   - Lower investment barriers

3. **Liquidity Provision**
   - Convert illiquid assets into liquid tokens
   - Instant trading capabilities
   - Market-driven pricing

## 🔐 Security Features

- **Ownership Validation**: Prevents transferring more than owned
- **Percentage Limits**: Total ownership cannot exceed 100%
- **Type Safety**: Strong typing throughout the contract
- **State Isolation**: Each asset's state is independently managed
- **Query Separation**: Read operations don't modify state

## 🚀 Integration

The contract can be integrated into your Next.js frontend through:

1. **Web3 Integration**: Connect wallet and call contract methods
2. **GraphQL/API**: Expose queries via service layer
3. **SDK Wrapper**: Create TypeScript bindings for easy integration

## 📝 Example Usage

### Creating an Asset
```rust
let operation = Operation::CreateAsset {
    asset_id: RWAId(1),
    name: "Manhattan Tower".to_string(),
    value: Amount(1000000),
    token_price: Amount(1),
    description: "Premium real estate".to_string(),
};
```

### Buying Tokens
```rust
let operation = Operation::BuyTokens {
    asset_id: RWAId(1),
    amount: Amount(10000),
};
```

### Transferring Ownership
```rust
let operation = Operation::TransferOwnership {
    asset_id: RWAId(1),
    to: new_owner,
    percentage: 10,
};
```

## 🧪 Testing

Run the test suite:
```bash
cargo test
```

Test coverage includes:
- Asset creation and validation
- Token purchase calculations
- Ownership transfer logic
- Edge cases and error handling

## 📚 Documentation

For more information on Linera SDK:
- [Linera Documentation](https://linera.io/docs)
- [Linera SDK Reference](https://docs.rs/linera-sdk)

## 🤝 Contributing

When adding features:
1. Update tests in corresponding files
2. Add documentation comments
3. Follow Rust naming conventions
4. Ensure state validation remains intact

## 📄 License

This contract is part of the RWA Tokenization Platform project.

