import { Building2, TrendingUp, Lock, Zap } from "lucide-react"

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
    icon: Lock,
    title: "Smart Contracts",
    description: "Automated, secure transactions powered by Ethereum smart contracts.",
  },
  {
    icon: Zap,
    title: "24/7 Trading",
    description: "Trade RWA tokens instantly on our decentralized marketplace.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">RWA Tokenization</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform real estate assets into tradeable blockchain tokens
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
