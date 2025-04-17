"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Activity, FileCheck, UserPlus, AlertTriangle, Search } from "lucide-react"

type ActivityEvent = {
  id: string
  type: "login" | "profile" | "search" | "alert" | "system"
  message: string
  time: Date
}

export function RealTimeActivity() {
  const [events, setEvents] = useState<ActivityEvent[]>([])

  useEffect(() => {
    // Initial events
    setEvents([
      {
        id: "1",
        type: "login",
        message: "User admin logged in",
        time: new Date(Date.now() - 120000),
      },
      {
        id: "2",
        type: "profile",
        message: "Profile #1248 updated",
        time: new Date(Date.now() - 300000),
      },
    ])

    // Generate new events periodically
    const interval = setInterval(() => {
      const eventTypes = ["login", "profile", "search", "alert", "system"] as const
      const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]

      const messages = {
        login: ["User admin logged in", "User operator1 logged in", "User analyst2 logged in"],
        profile: ["New profile created", "Profile #1248 updated", "Profile #1242 exported"],
        search: ["Search performed: 'Khan'", "Advanced search executed", "Location search: 'North Sector'"],
        alert: [
          "Security alert: Failed login attempt",
          "System alert: High CPU usage",
          "Data alert: Duplicate entry detected",
        ],
        system: ["System backup completed", "Database optimization complete", "Cache cleared successfully"],
      }

      const message = messages[eventType][Math.floor(Math.random() * messages[eventType].length)]

      const newEvent = {
        id: Date.now().toString(),
        type: eventType,
        message,
        time: new Date(),
      }

      setEvents((prev) => [newEvent, ...prev].slice(0, 5))
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getEventIcon = (type: ActivityEvent["type"]) => {
    switch (type) {
      case "login":
        return <UserPlus className="h-3 w-3" />
      case "profile":
        return <FileCheck className="h-3 w-3" />
      case "search":
        return <Search className="h-3 w-3" />
      case "alert":
        return <AlertTriangle className="h-3 w-3" />
      case "system":
        return <Activity className="h-3 w-3" />
    }
  }

  const getEventColor = (type: ActivityEvent["type"]) => {
    switch (type) {
      case "login":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "profile":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "search":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "alert":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "system":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"
    }
  }

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium flex items-center">
        <Activity className="h-3.5 w-3.5 mr-1.5" />
        REAL-TIME ACTIVITY
      </div>
      <div className="space-y-2 max-h-[150px] overflow-auto pr-1">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between text-xs animate-in fade-in slide-in-from-bottom-1 duration-300"
          >
            <div className="flex items-center">
              <Badge variant="outline" className={`mr-2 ${getEventColor(event.type)}`}>
                {getEventIcon(event.type)}
              </Badge>
              <span>{event.message}</span>
            </div>
            <span className="text-muted-foreground">
              {event.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
