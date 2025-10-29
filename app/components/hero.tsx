"use client"

import { ArrowRight } from "lucide-react"
import LaserFlow from "./LaserFlow"
import { useRef } from "react"

export default function Hero() {
  const laserContainerRef = useRef<HTMLDivElement>(null);
  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 w-full">
        {/* Center Content */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              🏢 LineraRWA - Tokenized Real World Assets
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
            Invest in <span className="text-primary">Real Estate</span> with Blockchain
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            LineraRWA brings institutional-grade real estate investments to everyone. Own fractionalized building tokens,
            earn passive income, and trade on our decentralized marketplace.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition flex items-center justify-center gap-2">
              Start Investing <ArrowRight size={20} />
            </button>
            <button className="px-8 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-card transition">
              Learn More
            </button>
          </div>
        </div>

        {/* LaserFlow Background */}
        <div 
          ref={laserContainerRef}
          className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-6"
        >
          <LaserFlow
            horizontalBeamOffset={0.1}
            verticalBeamOffset={0.0}
            color="#fc6432"
          />
        </div>

        {/* Data Box Below */}
        <div className="max-w-3xl mx-auto -mt-28">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-3xl" />
            <div className="relative bg-card rounded-2xl p-8 border border-border shadow-lg">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Platform Performance</h3>
                    <p className="text-sm text-muted-foreground">Live Metrics</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
                    <div className="text-3xl font-bold text-primary mb-1">$2.5B+</div>
                    <div className="text-xs text-muted-foreground">Total Assets</div>
                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 24% this month</div>
                  </div>

                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
                    <div className="text-3xl font-bold text-primary mb-1">50K+</div>
                    <div className="text-xs text-muted-foreground">Active Investors</div>
                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 1,200 this week</div>
                  </div>

                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
                    <div className="text-3xl font-bold text-primary mb-1">500+</div>
                    <div className="text-xs text-muted-foreground">Properties</div>
                    <div className="text-xs text-muted-foreground mt-1">Tokenized</div>
                  </div>

                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
                    <div className="text-3xl font-bold text-primary mb-1">8-12%</div>
                    <div className="text-xs text-muted-foreground">Avg. Yield</div>
                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">Annual return</div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">APY Distribution</span>
                    <span className="text-xs text-muted-foreground">Last 30 days</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-2 bg-primary rounded-full flex-1" />
                    <div className="h-2 bg-primary/70 rounded-full flex-1" />
                    <div className="h-2 bg-primary/50 rounded-full flex-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
