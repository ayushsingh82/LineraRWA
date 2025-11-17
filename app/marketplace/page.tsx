"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Clock, ArrowUpDown, X, Check } from "lucide-react"

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<"orderbook" | "trades" | "my-orders">("orderbook")
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy")
  const [showOrderModal, setShowOrderModal] = useState(false)

  // Mock order book data
  const buyOrders = [
    { price: 0.0105, amount: 15000, total: 157.5 },
    { price: 0.0104, amount: 12000, total: 124.8 },
    { price: 0.0103, amount: 20000, total: 206.0 },
    { price: 0.0102, amount: 18000, total: 183.6 },
    { price: 0.0101, amount: 10000, total: 101.0 },
  ]

  const sellOrders = [
    { price: 0.0106, amount: 8000, total: 84.8 },
    { price: 0.0107, amount: 15000, total: 160.5 },
    { price: 0.0108, amount: 12000, total: 129.6 },
    { price: 0.0109, amount: 20000, total: 218.0 },
    { price: 0.0110, amount: 18000, total: 198.0 },
  ]

  const recentTrades = [
    { asset: "Manhattan Tower", type: "buy", price: 0.0105, amount: 5000, time: "2 min ago" },
    { asset: "Silicon Valley Office", type: "sell", price: 0.0104, amount: 3000, time: "5 min ago" },
    { asset: "Miami Beach Resort", type: "buy", price: 0.0106, amount: 8000, time: "8 min ago" },
    { asset: "Manhattan Tower", type: "sell", price: 0.0103, amount: 2000, time: "12 min ago" },
    { asset: "Chicago Warehouse", type: "buy", price: 0.0102, amount: 10000, time: "15 min ago" },
  ]

  const myOrders = [
    { id: "1", asset: "Manhattan Tower", type: "buy", price: 0.0104, amount: 10000, filled: 3500, status: "partial" },
    { id: "2", asset: "Miami Beach Resort", type: "sell", price: 0.0108, amount: 5000, filled: 0, status: "pending" },
    { id: "3", asset: "Silicon Valley Office", type: "buy", price: 0.0102, amount: 8000, filled: 8000, status: "filled" },
  ]

  const currentPrice = 0.0105
  const priceChange = 2.3

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            RWA <span className="text-primary">Marketplace</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Trade fractional ownership tokens with instant settlement
          </p>
        </div>

        {/* Price Ticker */}
        <div className="mb-6 p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Price</p>
              <p className="text-3xl font-bold text-foreground">${currentPrice.toFixed(4)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">24h Change</p>
              <div className={`flex items-center gap-2 ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                {priceChange >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                <p className="text-2xl font-bold">{priceChange >= 0 ? "+" : ""}{priceChange}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-4 border-b border-border">
          {[
            { id: "orderbook", label: "Order Book" },
            { id: "trades", label: "Recent Trades" },
            { id: "my-orders", label: "My Orders" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "orderbook" && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Order Book */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">Order Book</h2>
                  <button
                    onClick={() => setShowOrderModal(true)}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
                  >
                    Place Order
                  </button>
                </div>

                {/* Sell Orders */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm font-semibold text-muted-foreground mb-2 px-2">
                    <span>Price</span>
                    <span>Amount</span>
                    <span>Total</span>
                  </div>
                  <div className="space-y-1">
                    {sellOrders.map((order, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition cursor-pointer"
                      >
                        <span className="text-red-500 font-medium w-24 text-right">{order.price.toFixed(4)}</span>
                        <span className="text-foreground flex-1 text-center">{order.amount.toLocaleString()}</span>
                        <span className="text-muted-foreground w-24 text-right">{order.total.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spread */}
                <div className="py-4 border-y border-border text-center">
                  <p className="text-sm text-muted-foreground">
                    Spread: <span className="text-foreground font-semibold">0.0001</span> (
                    <span className="text-foreground font-semibold">0.95%</span>)
                  </p>
                </div>

                {/* Buy Orders */}
                <div>
                  <div className="space-y-1">
                    {buyOrders.map((order, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition cursor-pointer"
                      >
                        <span className="text-green-500 font-medium w-24 text-right">{order.price.toFixed(4)}</span>
                        <span className="text-foreground flex-1 text-center">{order.amount.toLocaleString()}</span>
                        <span className="text-muted-foreground w-24 text-right">{order.total.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Trading Panel */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">Quick Trade</h2>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setOrderType("buy")}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                      orderType === "buy"
                        ? "bg-green-500 text-white"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setOrderType("sell")}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                      orderType === "sell"
                        ? "bg-red-500 text-white"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    Sell
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Price</label>
                  <input
                    type="number"
                    step="0.0001"
                    defaultValue={currentPrice}
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Amount</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-semibold text-foreground">$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fee (0.1%)</span>
                    <span className="text-muted-foreground">$0.00</span>
                  </div>
                </div>

                <button className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">
                  {orderType === "buy" ? "Place Buy Order" : "Place Sell Order"}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "trades" && (
          <div className="p-6 rounded-xl bg-card border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-6">Recent Trades</h2>
            <div className="space-y-2">
              {recentTrades.map((trade, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border hover:bg-muted transition"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        trade.type === "buy" ? "bg-green-500/10" : "bg-red-500/10"
                      }`}
                    >
                      {trade.type === "buy" ? (
                        <TrendingUp className="text-green-500" size={20} />
                      ) : (
                        <TrendingDown className="text-red-500" size={20} />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{trade.asset}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock size={14} />
                        {trade.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">${trade.price.toFixed(4)}</p>
                    <p className="text-sm text-muted-foreground">{trade.amount.toLocaleString()} tokens</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "my-orders" && (
          <div className="p-6 rounded-xl bg-card border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-6">My Orders</h2>
            <div className="space-y-2">
              {myOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-lg bg-muted/50 border border-border hover:bg-muted transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          order.type === "buy"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {order.type.toUpperCase()}
                      </div>
                      <p className="font-semibold text-foreground">{order.asset}</p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        order.status === "filled"
                          ? "bg-green-500/10 text-green-500"
                          : order.status === "partial"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {order.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Price</p>
                      <p className="font-semibold text-foreground">${order.price.toFixed(4)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Amount</p>
                      <p className="font-semibold text-foreground">
                        {order.filled.toLocaleString()} / {order.amount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Progress</p>
                      <p className="font-semibold text-foreground">
                        {((order.filled / order.amount) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  {order.status !== "filled" && (
                    <button className="mt-3 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition text-sm">
                      Cancel Order
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

