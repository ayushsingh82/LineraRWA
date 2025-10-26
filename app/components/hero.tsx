import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                🏢 Real World Assets Tokenized
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Invest in <span className="text-primary">Real Estate</span> with Blockchain
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              RWA brings institutional-grade real estate investments to everyone. Own fractionalized building tokens,
              earn passive income, and trade on our decentralized marketplace.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition flex items-center justify-center gap-2">
                Start Investing <ArrowRight size={20} />
              </button>
              <button className="px-8 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-card transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 md:h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-3xl" />
            <div className="relative bg-card rounded-2xl p-8 border border-border shadow-lg">
              <div className="space-y-4">
                <div className="h-32 bg-gradient-to-br from-primary/30 to-primary/10 rounded-lg" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
