"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenuBadge,
} from "@/components/ui/sidebar"
import {
  BarChart3,
  Bell,
  FileText,
  Home,
  LogOut,
  Plus,
  Search,
  Settings,
  Shield,
  Users,
  Globe,
  Zap,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useNotifications } from "@/components/notification-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NotificationIcon } from "@/components/notification-provider"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

export function AppSidebar() {
  const pathname = usePathname()
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeUsers, setActiveUsers] = useState(42)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Simulate active users changing
    const userTimer = setInterval(() => {
      setActiveUsers((prev) => {
        const change = Math.floor(Math.random() * 5) - 2 // -2 to +2
        return Math.max(30, prev + change)
      })
    }, 5000)

    return () => {
      clearInterval(timer)
      clearInterval(userTimer)
    }
  }, [])

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="flex flex-col items-center justify-center py-6">
        <div className="flex items-center justify-between w-full px-2">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary pulse-animation" />
            <span className="font-bold text-lg glow-text">SecureProfile</span>
          </div>
          <SidebarTrigger />
        </div>
        <div className="w-full px-2 mt-4 text-xs text-muted-foreground">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <div className="status-indicator status-active"></div>
              <span>System Active</span>
            </div>
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              <span>Active Users: {activeUsers}</span>
            </div>
            <Badge variant="outline" className="text-[10px] h-4">
              <Zap className="h-2.5 w-2.5 mr-1" />
              SECURE
            </Badge>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/")} className="gradient-border">
              <Link href="/">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/profiles")} className="gradient-border">
              <Link href="/profiles">
                <Users className="h-5 w-5" />
                <span>Profiles</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/profiles/new")} className="gradient-border">
              <Link href="/profiles/new">
                <Plus className="h-5 w-5" />
                <span>New Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/search")} className="gradient-border">
              <Link href="/search">
                <Search className="h-5 w-5" />
                <span>Advanced Search</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/reports")} className="gradient-border">
              <Link href="/reports">
                <FileText className="h-5 w-5" />
                <span>Reports</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/analytics")} className="gradient-border">
              <Link href="/analytics">
                <BarChart3 className="h-5 w-5" />
                <span>Analytics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/settings")} className="gradient-border">
              <Link href="/settings">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="gradient-border">
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                  {unreadCount > 0 && <SidebarMenuBadge className="bg-primary">{unreadCount}</SidebarMenuBadge>}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex justify-between">
                  <span>Notifications</span>
                  <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto py-0 px-2 text-xs">
                    Mark all as read
                  </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <div className="py-4 text-center text-sm text-muted-foreground">No notifications</div>
                ) : (
                  notifications.slice(0, 5).map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={`flex flex-col items-start p-3 ${!notification.read ? "bg-secondary/50" : ""}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex w-full">
                        <div className="mr-2">
                          <NotificationIcon type={notification.type} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{notification.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">{notification.message}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {notification.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))
                )}
                {notifications.length > 5 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="justify-center text-sm">View all notifications</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
          {isActive("/profiles") && (
            <div className="px-2 py-4">
              <div className="text-xs font-medium text-muted-foreground mb-2">QUICK STATS</div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Total Profiles</span>
                  <span className="font-medium">1,248</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Cases</span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending Verification</span>
                  <span className="font-medium">32</span>
                </div>
                <div className="flex justify-between">
                  <span>Recent Updates</span>
                  <span className="font-medium">17</span>
                </div>
              </div>
            </div>
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Avatar className="border-2 border-primary glow-effect">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Shield className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notification Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
