import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start Tokenizing RWA Assets</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Convert your real estate assets into blockchain tokens or invest in fractional property ownership with as little as $100.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition flex items-center justify-center gap-2">
              Launch App <ArrowRight size={20} />
            </button>
            <button className="px-8 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10 transition">
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
