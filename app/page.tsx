import Hero from "./components/hero"
import Features from "./components/features"
import Stats from "./components/stats"
import CTA from "./components/cta"
import Footer from "./components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="bg-black">
        <Features />
      </div>
      <Stats />
      <div className="bg-black">
        <CTA />
      </div>
      <Footer />
    </main>
  );
}
