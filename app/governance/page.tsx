"use client"

import { useState } from "react"
import { Vote, CheckCircle, XCircle, Clock, Users, TrendingUp, Building2 } from "lucide-react"

type ActiveProposal = {
  id: string
  title: string
  asset: string
  description: string
  type: string
  votesFor: number
  votesAgainst: number
  totalVotes: number
  deadline: Date
  quorum: number
  status: string
}

type PastProposal = {
  id: string
  title: string
  asset: string
  description: string
  type: string
  votesFor: number
  votesAgainst: number
  totalVotes: number
  result: string
  endedAt: Date
}

export default function GovernancePage() {
  const [activeTab, setActiveTab] = useState<"active" | "past">("active")

  const activeProposals: ActiveProposal[] = [
    {
      id: "1",
      title: "Property Management Contract Renewal",
      asset: "Manhattan Tower",
      description: "Vote on renewing the property management contract with ABC Management for another 2 years. The contract includes maintenance, tenant relations, and financial reporting.",
      type: "management",
      votesFor: 125000,
      votesAgainst: 32000,
      totalVotes: 157000,
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      quorum: 60,
      status: "active",
    },
    {
      id: "2",
      title: "Rental Rate Increase Proposal",
      asset: "Miami Beach Resort",
      description: "Proposal to increase rental rates by 8% starting next quarter to align with market rates and improve yield for token holders.",
      type: "financial",
      votesFor: 45000,
      votesAgainst: 28000,
      totalVotes: 73000,
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      quorum: 50,
      status: "active",
    },
    {
      id: "3",
      title: "Major Renovation Project",
      asset: "Silicon Valley Office",
      description: "Vote on approving a $500K renovation project to modernize the building facade and improve energy efficiency. Expected ROI: 12% over 3 years.",
      type: "capital",
      votesFor: 89000,
      votesAgainst: 12000,
      totalVotes: 101000,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      quorum: 55,
      status: "active",
    },
  ]

  const pastProposals: PastProposal[] = [
    {
      id: "4",
      title: "New Tenant Approval",
      asset: "Chicago Warehouse",
      description: "Approve new commercial tenant for 5-year lease",
      type: "management",
      votesFor: 95000,
      votesAgainst: 15000,
      totalVotes: 110000,
      result: "passed",
      endedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    },
    {
      id: "5",
      title: "Insurance Provider Change",
      asset: "Manhattan Tower",
      description: "Switch to new insurance provider with better coverage",
      type: "financial",
      votesFor: 42000,
      votesAgainst: 68000,
      totalVotes: 110000,
      result: "rejected",
      endedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    },
  ]

  const myVotingPower = 15000 // tokens
  const totalSupply = 1000000

  const formatTimeRemaining = (deadline: Date) => {
    const now = new Date()
    const diff = deadline.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) return `${days}d ${hours}h remaining`
    if (hours > 0) return `${hours}h remaining`
    return "Ending soon"
  }

  const getVotingPercentage = (votes: number, total: number) => {
    return total > 0 ? (votes / total) * 100 : 0
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Governance <span className="text-primary">Portal</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Participate in asset management decisions through decentralized voting
          </p>
        </div>

        {/* Voting Power Card */}
        <div className="mb-8 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Your Voting Power</p>
              <p className="text-3xl font-bold text-foreground">{myVotingPower.toLocaleString()} tokens</p>
              <p className="text-sm text-muted-foreground mt-1">
                {((myVotingPower / totalSupply) * 100).toFixed(2)}% of total supply
              </p>
            </div>
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <Vote className="text-primary" size={40} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-4 border-b border-border">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === "active"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Active Proposals
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === "past"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Past Proposals
          </button>
        </div>

        {/* Proposals */}
        <div className="space-y-6">
          {(activeTab === "active" ? activeProposals : pastProposals).map((proposal) => {
            const isActive = activeTab === "active"
            const activeProposal = isActive ? (proposal as ActiveProposal) : null
            const pastProposal = !isActive ? (proposal as PastProposal) : null
            
            return (
            <div
              key={proposal.id}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="text-primary" size={20} />
                    <span className="text-sm text-muted-foreground">{proposal.asset}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        proposal.type === "management"
                          ? "bg-blue-500/10 text-blue-500"
                          : proposal.type === "financial"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-purple-500/10 text-purple-500"
                      }`}
                    >
                      {proposal.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{proposal.title}</h3>
                  <p className="text-muted-foreground mb-4">{proposal.description}</p>
                </div>
              </div>

              {/* Voting Stats */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm text-foreground">
                        {proposal.votesFor.toLocaleString()} votes
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({getVotingPercentage(proposal.votesFor, proposal.totalVotes).toFixed(1)}%)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle className="text-red-500" size={16} />
                      <span className="text-sm text-foreground">
                        {proposal.votesAgainst.toLocaleString()} votes
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({getVotingPercentage(proposal.votesAgainst, proposal.totalVotes).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users size={14} />
                    <span>{proposal.totalVotes.toLocaleString()} total votes</span>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-2">
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-green-500 rounded-full h-3 transition-all"
                      style={{
                        width: `${getVotingPercentage(proposal.votesFor, proposal.totalVotes)}%`,
                      }}
                    />
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-red-500 rounded-full h-3 transition-all"
                      style={{
                        width: `${getVotingPercentage(proposal.votesAgainst, proposal.totalVotes)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {isActive && activeProposal ? (
                    <>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{formatTimeRemaining(activeProposal.deadline)}</span>
                      </div>
                      <span>Quorum: {activeProposal.quorum}%</span>
                    </>
                  ) : pastProposal ? (
                    <div className="flex items-center gap-2">
                      {pastProposal.result === "passed" ? (
                        <CheckCircle className="text-green-500" size={16} />
                      ) : (
                        <XCircle className="text-red-500" size={16} />
                      )}
                      <span className={pastProposal.result === "passed" ? "text-green-500" : "text-red-500"}>
                        {pastProposal.result.toUpperCase()}
                      </span>
                    </div>
                  ) : null}
                </div>
                {isActive && activeProposal && (
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg bg-green-500/10 text-green-500 font-medium hover:bg-green-500/20 transition">
                      Vote For
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 font-medium hover:bg-red-500/20 transition">
                      Vote Against
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
          })}
        </div>
      </div>
    </div>
  )
}

