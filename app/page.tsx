import Image from "next/image";

import Navbar from "./components/navbar"
import Hero from "./components/hero"
import Features from "./components/features"


import CTA from "./components/cta"
import Footer from "./components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Features />
 
      <CTA />
      <Footer />
    </main>
  );
}
