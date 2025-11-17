"use client"

import { useState, useEffect } from "react"
import { Bell, X, DollarSign, TrendingUp, TrendingDown, CheckCircle, AlertCircle, Info } from "lucide-react"

interface Notification {
  id: string
  type: "income" | "trade" | "price" | "governance" | "system"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

export default function Notifications() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "income",
      title: "Rental Income Received",
      message: "You received $1,220 from Manhattan Tower (15% ownership)",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      actionUrl: "/portfolio",
    },
    {
      id: "2",
      type: "trade",
      title: "Order Filled",
      message: "Your buy order for Silicon Valley Office (8,000 tokens) has been filled",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      actionUrl: "/marketplace",
    },
    {
      id: "3",
      type: "price",
      title: "Price Alert",
      message: "Miami Beach Resort price increased by 5.2%",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      actionUrl: "/marketplace",
    },
    {
      id: "4",
      type: "governance",
      title: "New Proposal",
      message: "Vote on property management proposal for Chicago Warehouse",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      actionUrl: "/governance",
    },
    {
      id: "5",
      type: "system",
      title: "System Update",
      message: "New analytics features are now available",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "income":
        return <DollarSign className="text-green-500" size={20} />
      case "trade":
        return <TrendingUp className="text-blue-500" size={20} />
      case "price":
        return <TrendingDown className="text-yellow-500" size={20} />
      case "governance":
        return <CheckCircle className="text-purple-500" size={20} />
      case "system":
        return <Info className="text-muted-foreground" size={20} />
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-muted transition"
      >
        <Bell className="text-foreground" size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-12 w-96 bg-card border border-border rounded-xl shadow-2xl z-50 max-h-[600px] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Notifications</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-primary hover:underline"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded hover:bg-muted transition"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-muted/50 transition cursor-pointer ${
                        !notification.read ? "bg-primary/5" : ""
                      }`}
                      onClick={() => {
                        markAsRead(notification.id)
                        if (notification.actionUrl) {
                          window.location.href = notification.actionUrl
                        }
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="font-semibold text-foreground text-sm">{notification.title}</p>
                              <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {formatTime(notification.timestamp)}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full" />
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteNotification(notification.id)
                                }}
                                className="p-1 rounded hover:bg-muted transition"
                              >
                                <X size={14} className="text-muted-foreground" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

