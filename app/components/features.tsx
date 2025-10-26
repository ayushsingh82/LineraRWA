import { Building2, TrendingUp, Lock, Zap } from "lucide-react"

const features = [
  {
    icon: Building2,
    title: "Tokenized Properties",
    description: "Own fractions of premium real estate properties through blockchain-verified tokens.",
  },
  {
    icon: TrendingUp,
    title: "Passive Income",
    description: "Earn rental yields and appreciation directly to your wallet automatically.",
  },
  {
    icon: Lock,
    title: "Secure & Transparent",
    description: "Smart contracts ensure transparency and security for all transactions.",
  },
  {
    icon: Zap,
    title: "Instant Liquidity",
    description: "Trade your property tokens on our decentralized marketplace anytime.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose RWA?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of real estate investment with blockchain technology
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
