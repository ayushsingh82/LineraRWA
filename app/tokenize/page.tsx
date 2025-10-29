"use client"

import { useState } from "react"
import { Building2, TrendingUp, PieChart, Plus, X } from "lucide-react"

export default function TokenizePage() {
  const [percentage, setPercentage] = useState(0)
  const [amount, setAmount] = useState(0)
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [addresses, setAddresses] = useState([{ address: "", percentage: 0 }])
  const [tokenizePercentage, setTokenizePercentage] = useState(0)

  const assets = [
    { id: "1", name: "Manhattan Tower", value: 5000000, image: "🏢", location: "New York" },
    { id: "2", name: "Silicon Valley Office", value: 3500000, image: "🏘️", location: "California" },
    { id: "3", name: "Miami Beach Resort", value: 8000000, image: "🏖️", location: "Florida" },
    { id: "4", name: "Chicago Warehouse", value: 2500000, image: "🏭", location: "Illinois" },
  ]

  const handleTokenize = () => {
    if (!selectedAsset || percentage === 0) return
    setShowModal(true)
  }

  const addAddress = () => {
    setAddresses([...addresses, { address: "", percentage: 0 }])
  }

  const handleTokenizeSubmit = () => {
    console.log("Tokenizing with addresses:", addresses)
    setShowModal(false)
  }

  const updateAddress = (index: number, field: "address" | "percentage", value: string | number) => {
    const newAddresses = [...addresses]
    newAddresses[index] = { ...newAddresses[index], [field]: value }
    setAddresses(newAddresses)
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Tokenize Your <span className="text-primary">LineraRWA Assets</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Convert your real estate assets into blockchain tokens and offer fractional ownership
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Select Asset */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
              <Building2 className="text-primary" size={24} />
              Select Asset to Tokenize
            </h2>

            <div className="grid gap-4">
              {assets.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset.id)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition ${
                    selectedAsset === asset.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{asset.image}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{asset.name}</h3>
                      <p className="text-sm text-muted-foreground">{asset.location}</p>
                      <p className="text-xl font-bold text-primary mt-2">
                        ${asset.value.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tokenize Controls */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
              <PieChart className="text-primary" size={24} />
              Set Tokenization Parameters
            </h2>

            <div className="p-6 rounded-xl bg-card border border-border">
              {/* Percentage Slider */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-4">
                  Percentage to Tokenize: <span className="text-primary font-bold">{percentage}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={percentage}
                  onChange={(e) => {
                    const val = parseInt(e.target.value)
                    setPercentage(val)
                    setAmount(selectedAsset ? (val / 100) * (assets.find(a => a.id === selectedAsset)?.value || 0) : 0)
                  }}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  style={{
                    background: `linear-gradient(to right, #fc6432 0%, #fc6432 ${percentage}%, var(--color-muted) ${percentage}%, var(--color-muted) 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Amount Display */}
              <div className="bg-primary/10 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tokenized Value</span>
                  <span className="text-2xl font-bold text-primary">
                    ${amount.toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Token Price</span>
                  <span className="font-medium">$0.01 per token</span>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-muted-foreground">Total Tokens</span>
                  <span className="font-bold text-lg">{(amount / 0.01).toLocaleString()} tokens</span>
                </div>
              </div>

              {/* Tokenize Button */}
              <button
                onClick={handleTokenize}
                disabled={!selectedAsset || percentage === 0}
                className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Tokenization
              </button>
            </div>

            {/* Info */}
            <div className="p-6 rounded-xl bg-muted/50 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="text-primary" size={20} />
                How It Works
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Select your property to tokenize</li>
                <li>• Choose the percentage to offer (1-100%)</li>
                <li>• Get instant liquidity through blockchain</li>
                <li>• Earn from property appreciation automatically</li>
                <li>• Transfer ownership via smart contracts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Tokenization Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">Configure Token Distribution</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {addresses.map((addr, index) => (
                  <div key={index} className="p-6 rounded-xl bg-muted/50 border border-border">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Recipient Address {index + 1}
                      </label>
                      <input
                        type="text"
                        placeholder="0x..."
                        value={addr.address}
                        onChange={(e) => updateAddress(index, "address", e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Percentage: <span className="text-primary font-bold">{addr.percentage}%</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={addr.percentage}
                        onChange={(e) => updateAddress(index, "percentage", parseInt(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                        style={{
                          background: `linear-gradient(to right, #fc6432 0%, #fc6432 ${addr.percentage}%, var(--color-muted) ${addr.percentage}%, var(--color-muted) 100%)`
                        }}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    {addresses.length > 1 && (
                      <button
                        onClick={() => setAddresses(addresses.filter((_, i) => i !== index))}
                        className="mt-3 px-3 py-1 rounded-lg text-sm bg-destructive/10 text-destructive hover:bg-destructive/20 transition"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                <button
                  onClick={addAddress}
                  className="w-full px-4 py-3 rounded-lg border border-primary text-primary font-medium hover:bg-primary/10 transition flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Add Address
                </button>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleTokenizeSubmit}
                    className="flex-1 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
                  >
                    Confirm Tokenization
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

