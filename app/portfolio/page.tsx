"use client"

import { useState } from "react"
import Link from "next/link"
import { Wallet, TrendingUp, DollarSign, X, BarChart3, Vote } from "lucide-react"

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<"owned" | "available">("owned")
  const [showBuyModal, setShowBuyModal] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [buyPercentage, setBuyPercentage] = useState(0)
  const [walletAddress, setWalletAddress] = useState("")

  const myAssets = [
    { id: "1", name: "Manhattan Tower", percentage: 15, value: 750000, price: 0.01, image: "🏢", location: "New York", apy: 12 },
    { id: "2", name: "Silicon Valley Office", percentage: 8, value: 280000, price: 0.01, image: "🏘️", location: "California", apy: 10 },
    { id: "3", name: "Miami Beach Resort", percentage: 5, value: 400000, price: 0.01, image: "🏖️", location: "Florida", apy: 15 },
  ]

  const availableAssets = [
    { id: "1", name: "Manhattan Tower", percentage: 15, value: 750000, price: 0.01, image: "🏢", location: "New York", apy: 12 },
    { id: "2", name: "Chicago Warehouse", availablePercentage: 25, value: 625000, price: 0.01, image: "🏭", location: "Illinois", apy: 11 },
    { id: "4", name: "Seattle Office Complex", availablePercentage: 30, value: 900000, price: 0.01, image: "🏙️", location: "Washington", apy: 9 },
  ]

  const buyRWA = (asset: any) => {
    setSelectedAsset(asset)
    setShowBuyModal(true)
    setBuyPercentage(0)
    setWalletAddress("")
  }

  const handleBuySubmit = () => {
    console.log("Buying RWA:", {
      asset: selectedAsset,
      percentage: buyPercentage,
      wallet: walletAddress
    })
    setShowBuyModal(false)
  }

  const calculateTotalCost = () => {
    if (!selectedAsset || buyPercentage === 0) return 0
    const percentageValue = (buyPercentage / 100) * selectedAsset.value
    return percentageValue
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                My <span className="text-primary">LineraRWA Portfolio</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Manage your tokenized real estate assets and earnings
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/analytics"
                className="px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 font-medium hover:bg-primary/20 transition flex items-center gap-2"
              >
                <BarChart3 size={18} />
                Analytics
              </Link>
              <Link
                href="/governance"
                className="px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 font-medium hover:bg-primary/20 transition flex items-center gap-2"
              >
                <Vote size={18} />
                Governance
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-4 border-b border-border">
          <button
            onClick={() => setActiveTab("owned")}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === "owned"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            My Assets
          </button>
          <button
            onClick={() => setActiveTab("available")}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === "available"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Available Investments
          </button>
        </div>

        {/* Content */}
        {activeTab === "owned" ? (
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Wallet className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Portfolio</p>
                    <p className="text-2xl font-bold text-foreground">$1.43M</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-green-500" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Annual Yield</p>
                    <p className="text-2xl font-bold text-foreground">12.3%</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="text-blue-500" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Income</p>
                    <p className="text-2xl font-bold text-foreground">$14,660</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Owned Assets */}
            <div className="space-y-4">
              {myAssets.map((asset) => (
                <div key={asset.id} className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-4xl">{asset.image}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground">{asset.name}</h3>
                        <p className="text-sm text-muted-foreground">{asset.location}</p>
                        <div className="mt-3 flex items-center gap-6">
                          <div>
                            <p className="text-xs text-muted-foreground">Ownership</p>
                            <p className="text-xl font-bold text-primary">{asset.percentage}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Value</p>
                            <p className="text-lg font-semibold text-foreground">${asset.value.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">APY</p>
                            <p className="text-lg font-semibold text-green-500">{asset.apy}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {availableAssets.map((asset) => (
              <div key={asset.id} className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{asset.image}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{asset.name}</h3>
                    <p className="text-sm text-muted-foreground">{asset.location}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Available</span>
                    <span className="text-lg font-bold text-primary">
                      {(asset as any).availablePercentage || asset.percentage}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Value</span>
                    <span className="text-lg font-semibold text-foreground">${asset.value.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">APY</span>
                    <span className="text-lg font-semibold text-green-500">{asset.apy}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Price per Token</span>
                    <span className="text-sm font-medium">${asset.price}</span>
                  </div>
                </div>

                <button
                  onClick={() => buyRWA(asset)}
                  className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
                >
                  Buy RWA
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Buy RWA Modal */}
      {showBuyModal && selectedAsset && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border max-w-xl w-full">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">Purchase RWA Tokens</h2>
                <button
                  onClick={() => setShowBuyModal(false)}
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Asset Info */}
              <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{selectedAsset.image}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{selectedAsset.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedAsset.location}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Asset Value</p>
                    <p className="text-lg font-bold text-primary">${selectedAsset.value.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Expected APY</p>
                    <p className="text-lg font-bold text-green-500">{selectedAsset.apy}%</p>
                  </div>
                </div>
              </div>

              {/* Purchase Form */}
              <div className="space-y-6">
                {/* Wallet Address */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Wallet Address
                  </label>
                  <input
                    type="text"
                    placeholder="0x..."
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Percentage Slider */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ownership Percentage: <span className="text-primary font-bold">{buyPercentage}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={(selectedAsset as any).availablePercentage || selectedAsset.percentage}
                    value={buyPercentage}
                    onChange={(e) => setBuyPercentage(parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    style={{
                      background: `linear-gradient(to right, #fc6432 0%, #fc6432 ${(buyPercentage / ((selectedAsset as any).availablePercentage || selectedAsset.percentage)) * 100}%, var(--color-muted) ${(buyPercentage / ((selectedAsset as any).availablePercentage || selectedAsset.percentage)) * 100}%, var(--color-muted) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0%</span>
                    <span>{((selectedAsset as any).availablePercentage || selectedAsset.percentage)}% max</span>
                  </div>
                </div>

                {/* Purchase Summary */}
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Purchase Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Percentage</span>
                      <span className="font-medium">{buyPercentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Purchase Amount</span>
                      <span className="font-medium">${calculateTotalCost().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tokens</span>
                      <span className="font-medium">{(calculateTotalCost() / selectedAsset.price).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border">
                      <span className="font-semibold">Total</span>
                      <span className="text-lg font-bold text-primary">${calculateTotalCost().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setShowBuyModal(false)}
                    className="flex-1 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBuySubmit}
                    disabled={buyPercentage === 0 || !walletAddress}
                    className="flex-1 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm Purchase
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

