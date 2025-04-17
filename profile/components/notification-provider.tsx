"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Bell, Info, AlertTriangle, CheckCircle } from "lucide-react"

type NotificationType = "info" | "warning" | "success" | "error"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  timestamp: Date
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (type: NotificationType, title: string, message: string) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { toast } = useToast()

  const unreadCount = notifications.filter((n) => !n.read).length

  // Simulate receiving notifications periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const shouldAddNotification = Math.random() > 0.7 // 30% chance
      if (shouldAddNotification) {
        const types: NotificationType[] = ["info", "warning", "success", "error"]
        const randomType = types[Math.floor(Math.random() * types.length)]
        const titles = {
          info: "System Update",
          warning: "Security Alert",
          success: "Profile Updated",
          error: "Connection Issue",
        }
        const messages = {
          info: "New system features have been deployed.",
          warning: "Unusual login activity detected.",
          success: "Profile data has been successfully updated.",
          error: "Unable to connect to the database server.",
        }

        addNotification(randomType, titles[randomType], messages[randomType])
      }
    }, 45000) // Every 45 seconds

    return () => clearInterval(interval)
  }, [])

  const addNotification = (type: NotificationType, title: string, message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      read: false,
      timestamp: new Date(),
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Show toast for new notifications
    toast({
      title: title,
      description: message,
      variant: type === "error" ? "destructive" : "default",
    })
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

export const NotificationIcon = ({ type }: { type: NotificationType }) => {
  switch (type) {
    case "info":
      return <Info className="h-4 w-4 text-blue-400" />
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-amber-400" />
    case "success":
      return <CheckCircle className="h-4 w-4 text-emerald-400" />
    case "error":
      return <AlertTriangle className="h-4 w-4 text-red-400" />
    default:
      return <Bell className="h-4 w-4" />
  }
}
