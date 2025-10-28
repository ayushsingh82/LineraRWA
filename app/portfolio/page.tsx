"use client"

import { useState } from "react"
import { ArrowLeft, Wallet, TrendingUp, DollarSign, PieChart } from "lucide-react"
import Link from "next/link"

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<"owned" | "available">("owned")

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

  const buyRWA = (assetId: string) => {
    console.log(`Buying ${assetId}`)
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-4">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            My <span className="text-primary">RWA Portfolio</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your tokenized real estate assets and earnings
          </p>
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
                  onClick={() => buyRWA(asset.id)}
                  className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
                >
                  Buy RWA
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

