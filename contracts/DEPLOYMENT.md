# Linera Chain Deployment Guide

## 📋 Overview

For a complete RWA Tokenization Platform on Linera, you need to deploy **3 microchains**:

1. **User Chain** - User accounts, wallets, profiles
2. **Market Chain** - Trading, order book, liquidity pools
3. **Oracle Chain** - Price feeds, data verification

## 🚀 Deployment Steps

### Step 1: Install Linera CLI

```bash
# Install Linera CLI
curl --proto '=https' --tlsv1.2 -sSfL https://raw.githubusercontent.com/linera-io/linera-protocol/main/scripts/install.sh | sh

# Or via cargo
cargo install --git https://github.com/linera-io/linera-protocol linera
```

### Step 2: Build Your Contracts

```bash
cd contracts

# Build the service binary
cargo build --release --bin service

# Build the contract binary  
cargo build --release --bin contract

# You should see these files in target/release/
# - service
# - contract
```

### Step 3: Initialize Local Linera Network

```bash
# Start local Linera network
linera net up 2

# This creates 2 local Linera chains for testing
# Output: Chain IDs and validator URLs
```

### Step 4: Deploy User Chain

```bash
# Get your service WASM bytecode path
SERVICE_BYTECODE="target/release/service"
CONTRACT_BYTECODE="target/release/contract"

# Deploy to User chain
linera publish-and-create \
  "$CONTRACT_BYTECODE" \
  "$SERVICE_BYTECODE" \
  --json-abi "src/lib.rs" \
  --application-id "rwa-user"
```

### Step 5: Deploy Market Chain

```bash
# Deploy market functionality to separate chain
linera publish-and-create \
  "$CONTRACT_BYTECODE" \
  "$SERVICE_BYTECODE" \
  --json-abi "src/lib.rs" \
  --application-id "rwa-market" \
  --chain-id "0x..." # Use different chain ID
```

### Step 6: Deploy Oracle Chain

```bash
# Deploy oracle service
linera publish-and-create \
  "$CONTRACT_BYTECODE" \
  "$SERVICE_BYTECODE" \
  --json-abi "src/lib.rs" \
  --application-id "rwa-oracle"
```

### Step 7: Cross-Chain Messaging Setup

```bash
# Configure messaging between chains
linera link \
  --from-application rwa-user \
  --to-application rwa-market \
  --message-type "CreateMarketOrder"
```

## 📊 Architecture

```
┌─────────────────┐
│   User Chain    │  # User accounts, holdings
│  (User Data)    │
└────────┬────────┘
         │ Messages
         ▼
┌─────────────────┐
│  Market Chain   │  # Trading, liquidity
│  (Order Book)   │
└────────┬────────┘
         │ Messages
         ▼
┌─────────────────┐
│  Oracle Chain   │  # Price feeds
│  (Data Feed)    │
└─────────────────┘
```

## 🧪 Testing

```bash
# Test local deployment
linera query --application rwa-user "ListAssets"
linera query --application rwa-market "GetOrderBook"

# Send test transaction
linera operation \
  --application rwa-user \
  --operation '{"CreateAsset": {...}}'
```

## 🌐 Production Deployment

### Option 1: Linera Devnet
```bash
# Deploy to Linera devnet
linera publish-and-create \
  --api "https://linera.devnet" \
  --contract "$CONTRACT_BYTECODE" \
  --service "$SERVICE_BYTECODE" \
  --application-id "rwa-production"
```

### Option 2: Run Your Own Validator
```bash
# Setup validator
linera validator add \
  --name "rwa-validator" \
  --chain-count 3 \
  --api-port 8080
```

## 📝 Next Steps

1. ✅ Build contracts
2. ⏳ Deploy to local network
3. ⏳ Test cross-chain messaging
4. ⏳ Deploy to devnet
5. ⏳ Connect frontend via SDK

## 🔗 Resources

- [Linera Docs](https://linera.io/docs)
- [Linera SDK](https://docs.rs/linera-sdk)
- [Example Apps](https://github.com/linera-io/linera-protocol/tree/main/examples)


