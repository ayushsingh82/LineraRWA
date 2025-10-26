import Navbar from "./navbar"
import Hero from "./hero"
import Features from "./features"

import Stats from "./stats"
import CTA from "./cta"
import Footer from "./footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
     
      <Stats />
      <CTA />
      <Footer />
    </main>
  )
}
