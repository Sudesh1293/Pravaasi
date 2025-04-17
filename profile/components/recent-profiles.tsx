"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Eye, MoreHorizontal, FileText, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Profile {
  id: string
  name: string
  alias: string
  entryPoint: string
  entryDate: string
  status: string
  lastUpdated: Date
  isNew?: boolean
}

export function RecentProfiles() {
  const { toast } = useToast()
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: "1",
      name: "John Smith",
      alias: "JS",
      entryPoint: "North Sector",
      entryDate: "2023-10-15",
      status: "Active",
      lastUpdated: new Date(Date.now() - 120000),
    },
    {
      id: "2",
      name: "Maria Garcia",
      alias: "MG",
      entryPoint: "East Sector",
      entryDate: "2023-11-22",
      status: "Active",
      lastUpdated: new Date(Date.now() - 300000),
    },
    {
      id: "3",
      name: "Ahmed Khan",
      alias: "AK",
      entryPoint: "South Sector",
      entryDate: "2023-09-05",
      status: "Under Investigation",
      lastUpdated: new Date(Date.now() - 600000),
    },
    {
      id: "4",
      name: "Sarah Johnson",
      alias: "SJ",
      entryPoint: "West Sector",
      entryDate: "2023-12-10",
      status: "Active",
      lastUpdated: new Date(Date.now() - 900000),
    },
    {
      id: "5",
      name: "Li Wei",
      alias: "LW",
      entryPoint: "North Sector",
      entryDate: "2024-01-18",
      status: "Pending Verification",
      lastUpdated: new Date(Date.now() - 1200000),
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    // Add a new profile after 10 seconds
    const timer = setTimeout(() => {
      const newProfile: Profile = {
        id: "6",
        name: "Alex Rodriguez",
        alias: "AR",
        entryPoint: "Northeast Sector",
        entryDate: new Date().toISOString().split("T")[0],
        status: "Active",
        lastUpdated: new Date(),
        isNew: true,
      }

      setProfiles((prev) => [newProfile, ...prev.slice(0, 4)])

      toast({
        title: "New Profile Added",
        description: `${newProfile.name} has been added to the system.`,
      })
    }, 10000)

    // Update a random profile every 15 seconds
    const updateInterval = setInterval(() => {
      setProfiles((prev) => {
        const index = Math.floor(Math.random() * prev.length)
        const updated = [...prev]
        updated[index] = {
          ...updated[index],
          lastUpdated: new Date(),
          status: Math.random() > 0.8 ? "Under Investigation" : "Active",
        }
        return updated
      })
    }, 15000)

    return () => {
      clearTimeout(timer)
      clearInterval(updateInterval)
    }
  }, [toast])

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    if (seconds < 60) return `${seconds} seconds ago`

    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`

    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`

    const days = Math.floor(hours / 24)
    return `${days} day${days !== 1 ? "s" : ""} ago`
  }

  const handleViewDetails = (id: string) => {
    toast({
      title: "Profile Details",
      description: `Viewing details for profile #${id}`,
    })
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Profile</TableHead>
          <TableHead>Entry Point</TableHead>
          <TableHead>Entry Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {profiles.map((profile) => (
          <TableRow key={profile.id} className={profile.isNew ? "bg-primary/5 animate-pulse" : ""}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className={profile.isNew ? "ring-2 ring-primary" : ""}>
                  <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${profile.alias}`} />
                  <AvatarFallback>{profile.alias}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium flex items-center">
                    {profile.name}
                    {profile.isNew && (
                      <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
                        NEW
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">ID: {profile.id}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{profile.entryPoint}</TableCell>
            <TableCell>{profile.entryDate}</TableCell>
            <TableCell>
              <Badge
                variant={
                  profile.status === "Active"
                    ? "default"
                    : profile.status === "Under Investigation"
                      ? "destructive"
                      : "outline"
                }
                className={
                  profile.status === "Active"
                    ? "bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20"
                    : profile.status === "Under Investigation"
                      ? "bg-red-500/20 text-red-500 hover:bg-red-500/20 border-red-500/20"
                      : "bg-amber-500/20 text-amber-500 hover:bg-amber-500/20 border-amber-500/20"
                }
              >
                <div
                  className={`status-indicator ${
                    profile.status === "Active"
                      ? "status-active"
                      : profile.status === "Under Investigation"
                        ? "status-error"
                        : "status-pending"
                  } mr-1`}
                ></div>
                {profile.status}
              </Badge>
            </TableCell>
            <TableCell>
              <span className="text-xs">{formatTimeAgo(profile.lastUpdated)}</span>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/profiles/${profile.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleViewDetails(profile.id)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    Export
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
