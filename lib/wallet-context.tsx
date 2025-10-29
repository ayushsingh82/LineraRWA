"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface WalletContextType {
  address: string | null
  isConnected: boolean
  isConnecting: boolean
  connect: (walletId?: string) => Promise<void>
  disconnect: () => void
  balance: string
  chainId: string | null
  selectedWallet: string | null
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [balance, setBalance] = useState("0")
  const [chainId, setChainId] = useState<string | null>(null)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  const isConnected = address !== null

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts.length > 0) {
            setAddress(accounts[0])
            await fetchBalance(accounts[0])
            const chain = await window.ethereum.request({ method: "eth_chainId" })
            setChainId(chain)
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error)
        }
      }
    }

    checkConnection()
  }, [])

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0])
          fetchBalance(accounts[0])
        } else {
          setAddress(null)
          setBalance("0")
        }
      }

      const handleChainChanged = (chainId: string) => {
        setChainId(chainId)
        window.location.reload()
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [])

  const fetchBalance = async (addr: string) => {
    try {
      if (window.ethereum) {
        const bal = await window.ethereum.request({
          method: "eth_getBalance",
          params: [addr, "latest"],
        })
        // Convert from wei to ether (simplified)
        const ethBalance = (Number.parseInt(bal, 16) / 1e18).toFixed(4)
        setBalance(ethBalance)
      }
    } catch (error) {
      console.error("Error fetching balance:", error)
    }
  }

  const connect = async (walletId = "metamask") => {
    if (typeof window === "undefined") {
      alert("Please use a Web3-enabled browser")
      return
    }

    setIsConnecting(true)
    setSelectedWallet(walletId)

    try {
      // Handle different wallet types
      if (walletId === "metamask" || walletId === "coinbase" || walletId === "linera") {
        if (!window.ethereum) {
          alert(
            `Please install ${walletId === "metamask" ? "MetaMask" : walletId === "coinbase" ? "Coinbase Wallet" : "a Web3 wallet"}`,
          )
          setIsConnecting(false)
          return
        }

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })

        if (accounts.length > 0) {
          setAddress(accounts[0])
          await fetchBalance(accounts[0])
          const chain = await window.ethereum.request({ method: "eth_chainId" })
          setChainId(chain)
        }
      } else if (walletId === "walletconnect") {
        // WalletConnect integration would go here
        alert("WalletConnect integration coming soon!")
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      setSelectedWallet(null)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    setAddress(null)
    setBalance("0")
    setChainId(null)
    setSelectedWallet(null)
  }

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected,
        isConnecting,
        connect,
        disconnect,
        balance,
        chainId,
        selectedWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any
  }
}

