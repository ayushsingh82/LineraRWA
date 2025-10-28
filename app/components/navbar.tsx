"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-primary">RWA</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/tokenize" className="text-foreground hover:text-primary transition">
              Tokenization
            </Link>
            <Link href="/portfolio" className="text-foreground hover:text-primary transition">
              Portfolio
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition">
              Connect Wallet
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/tokenize" className="block px-4 py-2 text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>
              Tokenization
            </Link>
            <Link href="/portfolio" className="block px-4 py-2 text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>
              Portfolio
            </Link>
            <button className="w-full mt-4 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium">
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
