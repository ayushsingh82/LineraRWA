import { Building2, TrendingUp, Lock, Zap, DollarSign, Link2 } from "lucide-react"

const features = [
  {
    icon: Building2,
    title: "RWA Tokenization",
    description: "Convert real estate assets into blockchain tokens with transparent ownership.",
  },
  {
    icon: TrendingUp,
    title: "Fractional Ownership",
    description: "Buy and sell fractional tokens of premium properties with ease.",
  },
  {
    icon: DollarSign,
    title: "Rental Income Streaming",
    description: "Automated micro-payments for rental yields distributed proportionally to owners.",
  },
  {
    icon: Link2,
    title: "Cross-Chain Syndication",
    description: "Combine assets across multiple Linera microchains for diversified portfolios.",
  },
  {
    icon: Lock,
    title: "Smart Contracts",
    description: "Automated, secure transactions powered by Linera microchains.",
  },
  {
    icon: Zap,
    title: "24/7 Trading",
    description: "Trade RWA tokens instantly on our decentralized marketplace.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black -mt-px">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">LineraRWA Tokenization</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Transform real estate assets into tradeable blockchain tokens
          </p>
        </div>

        {/* Vertical Box on Right */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-8 md:p-12 shadow-2xl">
            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 rounded-xl bg-black/50 border border-gray-800 hover:border-primary/30 transition-all hover:bg-primary/5"
                  >
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="text-primary" size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
