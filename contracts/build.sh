#!/bin/bash

# Build script for RWA Tokenization Contracts

echo "🏗️  Building RWA Tokenization Contracts..."

# Check if cargo is installed
if ! command -v cargo &> /dev/null; then
    echo "❌ Cargo not found. Please install Rust: https://rustup.rs/"
    exit 1
fi

# Build release binaries
echo "📦 Compiling service binary..."
cargo build --release --bin service

echo "📦 Compiling contract binary..."
cargo build --release --bin contract

# Check if build succeeded
if [ -f "target/release/service" ] && [ -f "target/release/contract" ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📁 Binaries located at:"
    echo "  - Service: target/release/service"
    echo "  - Contract: target/release/contract"
    echo ""
    echo "🚀 Next step: Deploy to Linera network"
    echo "   See contracts/DEPLOYMENT.md for instructions"
else
    echo "❌ Build failed. Check errors above."
    exit 1
fi


