"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, FileText, MapPin, Plus, Users, RefreshCw, Shield, Zap, ChevronUp, Clock } from "lucide-react"
import { RecentProfiles } from "@/components/recent-profiles"
import { ProfilesChart } from "@/components/profiles-chart"
import { LocationMap } from "@/components/location-map"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useNotifications } from "@/components/notification-provider"
import { Progress } from "@/components/ui/progress"
import { RealTimeActivity } from "@/components/real-time-activity"
import Link from "next/link"

export function DashboardPage() {
  const { toast } = useToast()
  const { addNotification } = useNotifications()
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [stats, setStats] = useState({
    totalProfiles: 1248,
    newEntries: 42,
    activeCases: 89,
    entryPoints: 24,
    systemLoad: 42,
    dataProcessed: 1.7,
    uptime: "99.98%",
    securityLevel: "High",
  })

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        totalProfiles: prev.totalProfiles + Math.floor(Math.random() * 3),
        newEntries: Math.max(38, prev.newEntries + Math.floor(Math.random() * 5) - 2),
        activeCases: Math.max(80, prev.activeCases + Math.floor(Math.random() * 5) - 2),
        systemLoad: Math.min(95, Math.max(30, prev.systemLoad + Math.floor(Math.random() * 10) - 5)),
        dataProcessed: Number.parseFloat((prev.dataProcessed + 0.1).toFixed(1)),
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      setLastUpdated(new Date())

      // Update stats with new random values
      setStats((prev) => ({
        ...prev,
        totalProfiles: prev.totalProfiles + Math.floor(Math.random() * 5) + 1,
        newEntries: Math.max(38, prev.newEntries + Math.floor(Math.random() * 5) - 2),
        activeCases: Math.max(80, prev.activeCases + Math.floor(Math.random() * 5) - 2),
        entryPoints: prev.entryPoints + (Math.random() > 0.8 ? 1 : 0),
        systemLoad: Math.min(95, Math.max(30, prev.systemLoad + Math.floor(Math.random() * 10) - 5)),
      }))

      toast({
        title: "Dashboard Refreshed",
        description: `Data updated as of ${new Date().toLocaleTimeString()}`,
      })

      addNotification("info", "Dashboard Updated", "Latest profile data has been loaded.")
    }, 1500)
  }

  const handleExport = () => {
    setIsLoading(true)

    // Simulate export process
    setTimeout(() => {
      setIsLoading(false)

      toast({
        title: "Export Complete",
        description: "Dashboard data has been exported successfully.",
      })

      addNotification("success", "Export Complete", "Dashboard data has been exported to your downloads folder.")
    }, 1500)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight glow-text">Command Center</h2>
          <p className="text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
            <span className="ml-2 text-xs">
              <Clock className="inline h-3 w-3 mr-1" />
              Auto-refreshing
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExport} disabled={isLoading}>
            {isLoading ? <div className="loading-indicator mr-2" /> : <FileText className="mr-2 h-4 w-4" />}
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            {isLoading ? <div className="loading-indicator mr-2" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            Refresh
          </Button>
          <Button size="sm" asChild>
            <Link href="/profiles/new">
              <Plus className="mr-2 h-4 w-4" />
              New Profile
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-highlight">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profiles</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProfiles.toLocaleString()}</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-emerald-400 flex items-center">
                <ChevronUp className="h-3 w-3 mr-1" />
                12%
              </span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-highlight">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Entries</CardTitle>
            <Plus className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newEntries}</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-emerald-400 flex items-center">
                <ChevronUp className="h-3 w-3 mr-1" />
                8%
              </span>
              <span className="text-xs text-muted-foreground ml-1">from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-highlight">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <AlertCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCases}</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-emerald-400 flex items-center">
                <ChevronUp className="h-3 w-3 mr-1" />
                4%
              </span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-highlight">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entry Points</CardTitle>
            <MapPin className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.entryPoints}</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-emerald-400 flex items-center">
                <Plus className="h-3 w-3 mr-1" />2
              </span>
              <span className="text-xs text-muted-foreground ml-1">new this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 card-highlight">
          <CardHeader>
            <CardTitle>Profile Analytics</CardTitle>
            <CardDescription>Profile creation trends over the past 30 days</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ProfilesChart />
          </CardContent>
        </Card>

        <Card className="col-span-3 card-highlight">
          <CardHeader>
            <CardTitle>Entry Point Distribution</CardTitle>
            <CardDescription>Geographic distribution of entry points</CardDescription>
          </CardHeader>
          <CardContent>
            <LocationMap />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="md:col-span-2 card-highlight">
          <CardHeader>
            <CardTitle>Recent Profiles</CardTitle>
            <CardDescription>Recently added or updated profiles</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentProfiles />
          </CardContent>
        </Card>

        <Card className="card-highlight">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Real-time system performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>System Load</span>
                <span className="font-medium">{stats.systemLoad}%</span>
              </div>
              <Progress
                value={stats.systemLoad}
                className="h-2"
                style={
                  {
                    background: "rgba(var(--border-rgb), 0.3)",
                    "--progress-background":
                      stats.systemLoad > 80
                        ? "hsl(var(--destructive))"
                        : stats.systemLoad > 60
                          ? "hsl(var(--chart-5))"
                          : "hsl(var(--chart-4))",
                  } as any
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Data Processed</span>
                <span className="font-medium">{stats.dataProcessed} TB</span>
              </div>
              <Progress value={stats.dataProcessed * 10} max={30} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Uptime</div>
                <div className="text-sm font-medium flex items-center">
                  <div className="status-indicator status-active mr-1.5"></div>
                  {stats.uptime}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Security</div>
                <div className="text-sm font-medium flex items-center">
                  <Shield className="h-3.5 w-3.5 text-primary mr-1.5" />
                  {stats.securityLevel}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Database</div>
                <div className="text-sm font-medium flex items-center">
                  <div className="status-indicator status-active mr-1.5"></div>
                  Connected
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">API Status</div>
                <div className="text-sm font-medium flex items-center">
                  <Zap className="h-3.5 w-3.5 text-primary mr-1.5" />
                  Operational
                </div>
              </div>
            </div>

            <RealTimeActivity />
          </CardContent>
        </Card>
      </div>

      <Alert className="border-primary/50 bg-primary/5">
        <AlertCircle className="h-4 w-4 text-primary" />
        <AlertTitle>System Notice</AlertTitle>
        <AlertDescription>
          New security protocol update available. Please review the latest guidelines.
        </AlertDescription>
      </Alert>
    </div>
  )
}
