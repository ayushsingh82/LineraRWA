"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Wallet, LogOut } from "lucide-react"
import { useWallet } from "../../lib/wallet-context"
import { WalletSelectModal } from "../../components/wallet-select-modal"
import Notifications from "../../components/notifications"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const { address, isConnected, isConnecting, connect, disconnect, balance } = useWallet()

  const handleConnect = () => {
    if (isConnected) {
      disconnect()
    } else {
      setShowWalletModal(true)
    }
  }

  const handleSelectWallet = (walletId: string) => {
    connect(walletId)
  }

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-primary">LineraRWA</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/tokenize" className="text-foreground hover:text-primary transition">
              Tokenization
            </Link>
            <Link href="/portfolio" className="text-foreground hover:text-primary transition">
              Portfolio
            </Link>
            <Link href="/marketplace" className="text-foreground hover:text-primary transition">
              Marketplace
            </Link>
            <Link href="/analytics" className="text-foreground hover:text-primary transition">
              Analytics
            </Link>
            <Link href="/governance" className="text-foreground hover:text-primary transition">
              Governance
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            {isConnected ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{balance} ETH</span>
                <button 
                  onClick={handleConnect}
                  className="px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 font-medium hover:bg-primary/20 transition flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Disconnect
                </button>
              </div>
            ) : (
              <button 
                onClick={handleConnect}
                disabled={isConnecting}
                className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition flex items-center gap-2 disabled:opacity-50"
              >
                <Wallet size={18} />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
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
            <button 
              onClick={handleConnect}
              className="w-full mt-4 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2"
            >
              <Wallet size={18} />
              {isConnected ? "Disconnect" : "Connect Wallet"}
            </button>
          </div>
        )}
      </div>

      {/* Wallet Select Modal */}
      <WalletSelectModal
        open={showWalletModal}
        onOpenChange={setShowWalletModal}
        onSelectWallet={handleSelectWallet}
      />
    </nav>
  )
}
