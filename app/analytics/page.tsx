"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">("30d")

  // Mock data for charts and metrics
  const portfolioValue = 1430000
  const portfolioChange = 8.5
  const monthlyIncome = 14660
  const incomeChange = 12.3
  const totalYield = 12.3
  const yieldChange = 2.1

  const incomeHistory = [
    { month: "Jan", income: 12000 },
    { month: "Feb", income: 13200 },
    { month: "Mar", income: 12800 },
    { month: "Apr", income: 14000 },
    { month: "May", income: 14500 },
    { month: "Jun", income: 14660 },
  ]

  const assetPerformance = [
    { name: "Manhattan Tower", value: 750000, change: 12.5, apy: 12 },
    { name: "Silicon Valley Office", value: 280000, change: 8.2, apy: 10 },
    { name: "Miami Beach Resort", value: 400000, change: 15.3, apy: 15 },
  ]

  const diversification = {
    realEstate: 65,
    commercial: 20,
    residential: 15,
  }

  const riskMetrics = {
    volatility: 8.2,
    sharpeRatio: 1.45,
    maxDrawdown: -5.3,
    beta: 0.78,
  }

  const maxIncome = Math.max(...incomeHistory.map(d => d.income))

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Portfolio <span className="text-primary">Analytics</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Advanced insights and performance metrics for your RWA investments
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="mb-6 flex gap-2">
          {(["7d", "30d", "90d", "1y"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                timeRange === range
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : range === "90d" ? "90 Days" : "1 Year"}
            </button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="text-primary" size={24} />
              </div>
              <div className={`flex items-center gap-1 ${portfolioChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                {portfolioChange >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                <span className="text-sm font-semibold">{Math.abs(portfolioChange)}%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Portfolio Value</p>
            <p className="text-3xl font-bold text-foreground">${(portfolioValue / 1000).toFixed(0)}K</p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-green-500" size={24} />
              </div>
              <div className={`flex items-center gap-1 ${incomeChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                {incomeChange >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                <span className="text-sm font-semibold">{Math.abs(incomeChange)}%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Monthly Income</p>
            <p className="text-3xl font-bold text-foreground">${monthlyIncome.toLocaleString()}</p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <PieChart className="text-blue-500" size={24} />
              </div>
              <div className={`flex items-center gap-1 ${yieldChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                {yieldChange >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                <span className="text-sm font-semibold">{Math.abs(yieldChange)}%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Average APY</p>
            <p className="text-3xl font-bold text-foreground">{totalYield}%</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Income History Chart */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="text-primary" size={20} />
                Income History
              </h2>
            </div>
            <div className="h-64 flex items-end gap-3">
              {incomeHistory.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col justify-end" style={{ height: "200px" }}>
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-primary to-primary/60 transition-all hover:opacity-80"
                      style={{ height: `${(data.income / maxIncome) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                  <span className="text-xs font-medium text-foreground">${(data.income / 1000).toFixed(1)}K</span>
                </div>
              ))}
            </div>
          </div>

          {/* Asset Performance */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Activity className="text-primary" size={20} />
              Asset Performance
            </h2>
            <div className="space-y-4">
              {assetPerformance.map((asset, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{asset.name}</h3>
                    <span className={`text-sm font-semibold ${asset.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {asset.change >= 0 ? "+" : ""}{asset.change}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Value: ${(asset.value / 1000).toFixed(0)}K</span>
                    <span className="text-muted-foreground">APY: {asset.apy}%</span>
                  </div>
                  <div className="mt-2 w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{ width: `${asset.change}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Diversification */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <PieChart className="text-primary" size={20} />
              Portfolio Diversification
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-foreground">Real Estate</span>
                  <span className="text-sm font-semibold text-foreground">{diversification.realEstate}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-primary rounded-full h-3 transition-all"
                    style={{ width: `${diversification.realEstate}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-foreground">Commercial</span>
                  <span className="text-sm font-semibold text-foreground">{diversification.commercial}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-blue-500 rounded-full h-3 transition-all"
                    style={{ width: `${diversification.commercial}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-foreground">Residential</span>
                  <span className="text-sm font-semibold text-foreground">{diversification.residential}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-green-500 rounded-full h-3 transition-all"
                    style={{ width: `${diversification.residential}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Risk Metrics */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <TrendingDown className="text-primary" size={20} />
              Risk Analysis
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Volatility</p>
                <p className="text-2xl font-bold text-foreground">{riskMetrics.volatility}%</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Sharpe Ratio</p>
                <p className="text-2xl font-bold text-foreground">{riskMetrics.sharpeRatio}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Max Drawdown</p>
                <p className="text-2xl font-bold text-red-500">{riskMetrics.maxDrawdown}%</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Beta</p>
                <p className="text-2xl font-bold text-foreground">{riskMetrics.beta}</p>
              </div>
            </div>
            <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm text-green-500 font-medium">
                ✓ Low risk profile - Well diversified portfolio
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

