"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"

interface WalletOption {
  id: string
  name: string
  icon: string
  description: string
}

const walletOptions: WalletOption[] = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "🦊",
    description: "Connect using MetaMask browser extension",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "🔗",
    description: "Scan with WalletConnect to connect",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "💼",
    description: "Connect using Coinbase Wallet",
  },
  {
    id: "linera",
    name: "Linera Wallet",
    icon: "⚡",
    description: "Connect using Linera native wallet",
  },
]

interface WalletSelectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectWallet: (walletId: string) => void
}

export function WalletSelectModal({ open, onOpenChange, onSelectWallet }: WalletSelectModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">Connect Wallet</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Choose your preferred wallet to connect to LineraRWA
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          {walletOptions.map((wallet) => (
            <button
              key={wallet.id}
              className="h-auto p-4 justify-start gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all bg-muted/50 border border-border rounded-lg text-left flex items-start gap-4"
              onClick={() => {
                onSelectWallet(wallet.id)
                onOpenChange(false)
              }}
            >
              <div className="text-3xl">{wallet.icon}</div>
              <div className="flex-1">
                <div className="font-semibold text-foreground">{wallet.name}</div>
                <div className="text-sm text-muted-foreground">{wallet.description}</div>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

