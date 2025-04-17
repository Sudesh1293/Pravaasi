"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  ChevronDown,
  Edit,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  RefreshCw,
  SlidersHorizontal,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useNotifications } from "@/components/notification-provider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface Profile {
  id: string
  name: string
  alias: string
  gender: string
  age: number
  entryPoint: string
  entryDate: string
  occupation: string
  criminalBackground: boolean
  status: string
  lastUpdated: Date
  selected?: boolean
}

export function ProfilesPage() {
  const { toast } = useToast()
  const { addNotification } = useNotifications()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [exportFormat, setExportFormat] = useState("pdf")
  const [exportOptions, setExportOptions] = useState({
    includePersonalInfo: true,
    includeEntryDetails: true,
    includeLegalStatus: true,
    includeAttachments: false,
  })

  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: "1",
      name: "John Smith",
      alias: "JS",
      gender: "Male",
      age: 32,
      entryPoint: "North Sector",
      entryDate: "2023-10-15",
      occupation: "Engineer",
      criminalBackground: false,
      status: "Active",
      lastUpdated: new Date(Date.now() - 120000),
    },
    {
      id: "2",
      name: "Maria Garcia",
      alias: "MG",
      gender: "Female",
      age: 28,
      entryPoint: "East Sector",
      entryDate: "2023-11-22",
      occupation: "Teacher",
      criminalBackground: false,
      status: "Active",
      lastUpdated: new Date(Date.now() - 300000),
    },
    {
      id: "3",
      name: "Ahmed Khan",
      alias: "AK",
      gender: "Male",
      age: 35,
      entryPoint: "South Sector",
      entryDate: "2023-09-05",
      occupation: "Businessman",
      criminalBackground: true,
      status: "Under Investigation",
      lastUpdated: new Date(Date.now() - 600000),
    },
    {
      id: "4",
      name: "Sarah Johnson",
      alias: "SJ",
      gender: "Female",
      age: 41,
      entryPoint: "West Sector",
      entryDate: "2023-12-10",
      occupation: "Doctor",
      criminalBackground: false,
      status: "Active",
      lastUpdated: new Date(Date.now() - 900000),
    },
    {
      id: "5",
      name: "Li Wei",
      alias: "LW",
      gender: "Male",
      age: 29,
      entryPoint: "North Sector",
      entryDate: "2024-01-18",
      occupation: "Student",
      criminalBackground: false,
      status: "Pending Verification",
      lastUpdated: new Date(Date.now() - 1200000),
    },
    {
      id: "6",
      name: "Elena Petrova",
      alias: "EP",
      gender: "Female",
      age: 33,
      entryPoint: "East Sector",
      entryDate: "2024-02-05",
      occupation: "Researcher",
      criminalBackground: false,
      status: "Active",
      lastUpdated: new Date(Date.now() - 1500000),
    },
    {
      id: "7",
      name: "Carlos Rodriguez",
      alias: "CR",
      gender: "Male",
      age: 45,
      entryPoint: "South Sector",
      entryDate: "2024-01-30",
      occupation: "Consultant",
      criminalBackground: true,
      status: "Under Investigation",
      lastUpdated: new Date(Date.now() - 1800000),
    },
  ])

  // Filter profiles based on search term and status filter
  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearch =
      searchTerm === "" ||
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.alias.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.entryPoint.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || profile.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: "Search Results",
      description: `Found ${filteredProfiles.length} profiles matching "${searchTerm}"`,
    })
  }

  const handleRefresh = () => {
    setIsLoading(true)

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)

      // Add a new profile
      if (Math.random() > 0.5) {
        const newProfile: Profile = {
          id: (profiles.length + 1).toString(),
          name: "Alex Rodriguez",
          alias: "AR",
          gender: "Male",
          age: 27,
          entryPoint: "Northeast Sector",
          entryDate: new Date().toISOString().split("T")[0],
          occupation: "Technician",
          criminalBackground: false,
          status: "Active",
          lastUpdated: new Date(),
        }

        setProfiles((prev) => [newProfile, ...prev])

        addNotification("info", "New Profile Added", `${newProfile.name} has been added to the system.`)
      } else {
        toast({
          title: "Data Refreshed",
          description: "Profile data has been updated.",
        })
      }
    }, 1500)
  }

  const handleExport = () => {
    setShowExportDialog(true)
  }

  const processExport = () => {
    setIsLoading(true)
    setShowExportDialog(false)

    // Simulate export process
    setTimeout(() => {
      setIsLoading(false)

      const selectedProfiles = profiles.filter((p) => p.selected)
      const count = selectedProfiles.length || profiles.length

      toast({
        title: "Export Complete",
        description: `${count} profiles exported as ${exportFormat.toUpperCase()}`,
      })

      addNotification(
        "success",
        "Export Complete",
        `${count} profiles have been exported to ${exportFormat.toUpperCase()} format.`,
      )
    }, 2000)
  }

  const toggleProfileSelection = (id: string) => {
    setProfiles((prev) =>
      prev.map((profile) => (profile.id === id ? { ...profile, selected: !profile.selected } : profile)),
    )
  }

  const selectedCount = profiles.filter((p) => p.selected).length

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight glow-text">Profiles</h2>
          <p className="text-muted-foreground">Manage and search through all registered profiles</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            {isLoading ? <div className="loading-indicator mr-2" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport} disabled={isLoading}>
            {isLoading ? <div className="loading-indicator mr-2" /> : <FileText className="mr-2 h-4 w-4" />}
            Export
          </Button>
          <Button size="sm" asChild>
            <Link href="/profiles/new">
              <Plus className="mr-2 h-4 w-4" />
              New Profile
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="grid gap-2 flex-1">
          <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search profiles..."
                className="w-full pl-9 bg-background/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit" size="sm" variant="secondary">
              Search
            </Button>
          </form>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending verification">Pending Verification</SelectItem>
              <SelectItem value="under investigation">Under Investigation</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Options
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>View Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Checkbox id="show-deleted" className="mr-2" />
                <label htmlFor="show-deleted">Show Deleted</label>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Checkbox id="show-archived" className="mr-2" />
                <label htmlFor="show-archived">Show Archived</label>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border bg-card/30 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30px]">
                <Checkbox
                  onCheckedChange={(checked) => {
                    setProfiles((prev) => prev.map((profile) => ({ ...profile, selected: checked === true })))
                  }}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Entry Point</TableHead>
              <TableHead>Entry Date</TableHead>
              <TableHead>Occupation</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProfiles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  No profiles found matching your search criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredProfiles.map((profile) => (
                <TableRow key={profile.id} className={profile.selected ? "bg-primary/5" : ""}>
                  <TableCell>
                    <Checkbox checked={profile.selected} onCheckedChange={() => toggleProfileSelection(profile.id)} />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${profile.alias}`} />
                        <AvatarFallback>{profile.alias}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div>{profile.name}</div>
                        <div className="text-xs text-muted-foreground">{profile.alias}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{profile.gender}</TableCell>
                  <TableCell>{profile.age}</TableCell>
                  <TableCell>{profile.entryPoint}</TableCell>
                  <TableCell>{profile.entryDate}</TableCell>
                  <TableCell>{profile.occupation}</TableCell>
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
                    {profile.criminalBackground && (
                      <Badge
                        variant="destructive"
                        className="ml-2 bg-red-500/20 text-red-500 hover:bg-red-500/20 border-red-500/20"
                      >
                        Criminal Record
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/profiles/${profile.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
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
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          {selectedCount > 0
            ? `${selectedCount} profiles selected`
            : `Showing ${filteredProfiles.length} of ${profiles.length} profiles`}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>

      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Export Profiles</DialogTitle>
            <DialogDescription>
              Choose export format and options for {selectedCount > 0 ? selectedCount : "all"} profiles.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="format">Export Format</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger id="format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="word">Word Document</SelectItem>
                  <SelectItem value="csv">CSV File</SelectItem>
                  <SelectItem value="json">JSON Data</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Export Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="personal-info"
                    checked={exportOptions.includePersonalInfo}
                    onCheckedChange={(checked) =>
                      setExportOptions((prev) => ({ ...prev, includePersonalInfo: checked === true }))
                    }
                  />
                  <label htmlFor="personal-info" className="text-sm">
                    Include Personal Information
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="entry-details"
                    checked={exportOptions.includeEntryDetails}
                    onCheckedChange={(checked) =>
                      setExportOptions((prev) => ({ ...prev, includeEntryDetails: checked === true }))
                    }
                  />
                  <label htmlFor="entry-details" className="text-sm">
                    Include Entry Details
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="legal-status"
                    checked={exportOptions.includeLegalStatus}
                    onCheckedChange={(checked) =>
                      setExportOptions((prev) => ({ ...prev, includeLegalStatus: checked === true }))
                    }
                  />
                  <label htmlFor="legal-status" className="text-sm">
                    Include Legal Status
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="attachments"
                    checked={exportOptions.includeAttachments}
                    onCheckedChange={(checked) =>
                      setExportOptions((prev) => ({ ...prev, includeAttachments: checked === true }))
                    }
                  />
                  <label htmlFor="attachments" className="text-sm">
                    Include Attachments
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Cancel
            </Button>
            <Button onClick={processExport}>Export</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
