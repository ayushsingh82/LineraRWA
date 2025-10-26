import Image from "next/image";

import Navbar from "./components/navbar"
import Hero from "./components/hero"
import Features from "./components/features"

import Stats from "./components/stats"
import CTA from "./components/cta"
import Footer from "./components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
  <Navbar />
      <Hero />
      <Features />
  
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
}
