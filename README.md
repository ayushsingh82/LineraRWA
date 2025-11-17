# LineraRWA

A Real World Asset (RWA) tokenization platform built on Linera chain with percentage-based fractional ownership.

## 🌟 Features

- ✅ **Multi-chain Architecture** - 3 Linera microchains (User, Market, Oracle)
- ✅ **Fractional Ownership** - Buy/sell RWA assets in percentages (1-100%)
- ✅ **Smart Contracts** - Linera-based contracts for secure tokenization
- ✅ **Web3 Integration** - MetaMask, Coinbase, Linera wallet support
- ✅ **Real-time Trading** - Instant P2P transactions
- ✅ **Rental Income Streaming** - Automated micro-payments for rental yields
- ✅ **Cross-Chain Syndication** - Combine assets across multiple Linera chains
- ✅ **Dark Theme UI** - Modern orange-themed interface
- ✅ **Advanced Analytics** - Portfolio performance metrics, risk analysis, and income history
- ✅ **Marketplace** - Order book, limit orders, and trading history
- ✅ **Governance** - Decentralized voting on asset management decisions
- ✅ **Real-time Notifications** - Income alerts, trade notifications, and price updates

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Deploy Linera Contracts

### Build Contracts

```bash
cd contracts
./build.sh
```

### Deploy to Linera Network

```bash
# Install Linera CLI
curl --proto '=https' --tlsv1.2 -sSfL https://raw.githubusercontent.com/linera-io/linera-protocol/main/scripts/install.sh | sh

# Deploy 3 microchains
# See contracts/DEPLOYMENT.md for detailed instructions
```

## 🏗️ Architecture

```
Frontend (Next.js)
    ↓
Linera Chains:
├── User Chain (accounts, profiles)
├── Market Chain (trading, order book)  
└── Oracle Chain (price feeds)
```

## 📁 Project Structure

```
my-app/
├── app/                    # Next.js pages
│   ├── components/         # UI components
│   ├── tokenize/          # Tokenization page
│   └── portfolio/         # Portfolio page
├── lib/                   # Utilities & wallet context
├── contracts/             # Linera smart contracts
│   ├── src/
│   │   ├── lib.rs        # ABI definitions
│   │   ├── state.rs      # State management
│   │   ├── contract.rs   # Contract logic
│   │   └── service.rs    # Service logic
│   └── Cargo.toml        # Rust dependencies
└── components/            # Shared components
```

## 🔗 Pages

- `/` - Landing page with hero, features, CTA
- `/tokenize` - Tokenize your RWA assets
- `/portfolio` - View and manage your portfolio
- `/marketplace` - Trade RWA tokens with order book and limit orders
- `/analytics` - Advanced portfolio analytics, performance metrics, and risk analysis
- `/governance` - Participate in asset management decisions through voting

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React, Tailwind CSS v4
- **Web3**: Wallet integration (MetaMask, Coinbase, Linera)
- **Blockchain**: Linera (microchain architecture)
- **Contracts**: Rust (Linera SDK)
- **Styling**: Custom dark theme with RWA Orange (#fc6432)

## 📝 Environment Setup

```bash
# Install Rust (if not already installed)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install dependencies
npm install
cd contracts && cargo build
```

## 🚢 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy to your hosting platform
```

### Linera Contracts
See `contracts/DEPLOYMENT.md` for detailed deployment instructions.

## 💰 Use Cases

### For Property Owners
- Tokenize properties for liquidity
- Retain partial ownership while accessing funds
- Sell fractional shares to investors
- Distribute rental income automatically

### For Investors
- Invest in premium real estate with small amounts
- Diversify across multiple properties and chains
- Earn passive rental income
- Trade tokens instantly on marketplace
- Benefit from property appreciation

### For Portfolio Managers
- Manage multiple properties across chains
- Aggregate rental income streams
- Track performance metrics
- Execute complex investment strategies

## 📚 Documentation

- [Linera Docs](https://linera.io/docs)
- [Contract README](contracts/README.md)
- [Deployment Guide](contracts/DEPLOYMENT.md)

## 🎯 Key Features

### Tokenization Flow
1. Select asset to tokenize
2. Set percentage to offer (0-100%)
3. Configure recipients and ownership splits
4. Deploy to Linera chain
5. Start trading fractional shares

### Portfolio Management
- View owned assets with percentage breakdown
- Track APY and monthly income
- Buy/sell fractional shares instantly
- Real-time price updates

### Rental Income Streaming
- **Automated micro-payments** - Receive rental income proportionally based on your ownership
- **Real-time distribution** - Income streams directly to your wallet
- **Transparent tracking** - See exact income per property
- **Multi-asset aggregation** - Combine income from multiple properties

### Cross-Chain Property Syndication
- **Combine assets** across multiple Linera microchains
- **Diversified portfolios** - Spread investments across different chains
- **Unified management** - View all assets from one dashboard
- **Chain-agnostic trading** - Trade tokens regardless of origin chain

## 💡 Innovation Highlights

Built on Linera's microchain architecture for:
- **Lightning-fast transactions** - Sub-second finality
- **Cross-chain messaging** - Seamless communication between chains
- **Scalable infrastructure** - Handle thousands of properties
- **Privacy-preserving** - User data isolation per microchain
- **Cost-efficient** - Low gas fees for fractional ownership transfers

## 🔐 Security Features

- **Ownership Validation** - Prevents total ownership >100%
- **State Isolation** - Each asset's state independently managed
- **Cross-chain Security** - Message validation between chains
- **Smart Contract Enforcement** - All transfers verified on-chain
- **Percentage Tracking** - Accurate fractional ownership management
- **Price Oracle Integration** - Real-time, verified property valuations



## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

## 📄 License

MIT License - See LICENSE file for details
