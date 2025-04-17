"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  CalendarIcon, 
  Download, 
  FileText, 
  Save, 
  Upload, 
  AlertTriangle, 
  CheckCircle, 
  X, 
  Loader2,
  Shield
} from "
  FileText,
  Save,
  Upload,
  AlertTriangle,
  CheckCircle,
  X,
  Loader2,
  Shield
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useNotifications } from "@/components/notification-provider"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function ProfileForm({ id }: { id?: string }) {
  const { toast } = useToast()
  const { addNotification } = useNotifications()
  const [date, setDate] = useState<Date>()
  const [entryDate, setEntryDate] = useState<Date>()
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedIdProofs, setSelectedIdProofs] = useState<string[]>([])
  const [hasCriminalBackground, setHasCriminalBackground] = useState(false)
  const [embassyContacted, setEmbassyContacted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [formProgress, setFormProgress] = useState(0)
  const [formData, setFormData] = useState({
    name: id ? "John Smith" : "",
    alias: id ? "JS" : "",
    fatherName: id ? "Robert Smith" : "",
    gender: id ? "male" : "",
    contact: id ? "+91 98765 43210" : "",
    passport: id ? "A12345678" : "",
    visa: id ? "Tourist Visa #V87654321" : "",
    physical: id ? "Height: 5'10\", Hair: Brown, Eyes: Blue, Distinguishing marks: Scar on right forearm" : "",
    occupation: id ? "Engineer" : "",
    entryMode: id ? "land" : "",
    entryPoint: id ? "North Sector" : "",
    assisting: id ? "Self" : "",
    supportNetwork: id ? "none" : "",
    lastStay: id ? "Hotel Metropole, Room 302, New Delhi" : "",
    nativeAddress: id ? "123 Main St, Apt 4B, Springfield, IL, USA" : "",
    caseDetails: id ? "No prior cases" : "",
    detainedBy: id ? "N/A" : "",
    courtProceedings: id ? "not-applicable" : "",
    embassyDetails: id ? "US Embassy contacted on 2023-10-15" : "",
    remarks: id ? "Subject is cooperative and has all required documentation" : ""
  })

  // Track form completion progress
  useEffect(() => {
    // Count filled fields
    const totalFields = Object.keys(formData).length + 4 // Add 4 for the date fields and checkboxes
    
    let filledFields = 0
    for (const key in formData) {
      if (formData[key as keyof typeof formData] !== "") {
        filledFields++
      }
    }
    
    // Add date fields if set
    if (date) filledFields++
    if (entryDate) filledFields++
    
    // Add checkbox groups based on selection count
    if (selectedLanguages.length > 0) filledFields++
    if (selectedLocations.length > 0) filledFields++
    
    const progress = Math.round((filledFields / totalFields) * 100)
    setFormProgress(progress)
  }, [formData, date, entryDate, selectedLanguages, selectedLocations])

  const languages = [
    { id: "english", label: "English" },
    { id: "hindi", label: "Hindi" },
    { id: "urdu", label: "Urdu" },
    { id: "bengali", label: "Bengali" },
    { id: "punjabi", label: "Punjabi" },
    { id: "arabic", label: "Arabic" },
    { id: "french", label: "French" },
    { id: "spanish", label: "Spanish" },
  ]

  const locations = [
    { id: "delhi", label: "Delhi" },
    { id: "mumbai", label: "Mumbai" },
    { id: "kolkata", label: "Kolkata" },
    { id: "chennai", label: "Chennai" },
    { id: "bangalore", label: "Bangalore" },
    { id: "hyderabad", label: "Hyderabad" },
    { id: "jaipur", label: "Jaipur" },
    { id: "lucknow", label: "Lucknow" },
  ]

  const idProofs = [
    { id: "aadhar", label: "Aadhar Card" },
    { id: "pan", label: "PAN Card" },
    { id: "voter", label: "Voter ID" },
    { id: "driving", label: "Driving License" },
    { id: "ration", label: "Ration Card" },
    { id: "bank", label: "Bank Account" },
    { id: "utility", label: "Utility Bills" },
    { id: "rental", label: "Rental Agreement" },
  ]

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages((prev) => (prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]))
  }

  const handleLocationToggle = (location: string) => {
    setSelectedLocations((prev) => (prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]))
  }

  const handleIdProofToggle = (idProof: string) => {
    setSelectedIdProofs((prev) => (prev.includes(idProof) ? prev.filter((id) => id !== idProof) : [...prev, idProof]))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission with progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      if (progress > 100) {
        clearInterval(interval)
        setIsSubmitting(false)
        setShowSuccessDialog(true)
        
        // Show toast and notification
        toast({
          title: id ? "Profile Updated" : "Profile Created",
          description: id 
            ? "Profile has been successfully updated." 
            : "New profile has been successfully created.",
        })
        
        addNotification(
          "success", 
          id ? "Profile Updated" : "Profile Created", 
          id 
            ? `Profile #${id} has been successfully updated.` 
            : "A new profile has been successfully created."
        )
      }
    }, 300)
  }

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Exporting profile data to PDF...",
    })
    
    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Profile data has been exported to PDF.",
      })
      
      addNotification(
        "success", 
        "Export Complete", 
        "Profile data has been exported to PDF format."
      )
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold glow-text">Profile Information</h2>
          <p className="text-sm text-muted-foreground">Enter detailed information about the individual</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" type="button" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button type="submit" disabled={isSubmitting} className="relative overflow-hidden">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
                <span 
                  className="absolute bottom-0 left-0 h-1 bg-primary-foreground" 
                  style={{ width: `${Math.min(100, progress * 3)}%`, transition: "width 300ms ease" }}
                />
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Profile
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="w-full bg-muted/30 h-2 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-in-out"
          style={{ width: `${formProgress}%` }}
        />
      </div>
      <div className="flex justify-between text-sm">
        <span>Form Completion</span>
        <span className="font-medium">{formProgress}%</span>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="personal" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Personal Information
          </TabsTrigger>
          <TabsTrigger value="entry" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Entry Details
          </TabsTrigger>
          <TabsTrigger value="residence" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Residence & Network
          </TabsTrigger>
          <TabsTrigger value="legal" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Legal Status
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter full name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-background/50 border-muted focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alias">Alias Name</Label>
                  <Input 
                    id="alias" 
                    placeholder="Enter alias (if any)" 
                    value={formData.alias}
                    onChange={handleInputChange}
                    className="bg-background/50 border-muted focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherName">Father's Name</Label>
                <Input 
                  id="fatherName" 
                  placeholder="Enter father's name" 
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  className="bg-background/50 border-muted focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                    <SelectTrigger id="gender" className="bg-background/50 border-muted focus:border-primary">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-background/50 border-muted hover:bg-background/70", 
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input 
                  id="contact" 
                  placeholder="Enter contact number" 
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="bg-background/50 border-muted focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passport">Passport Number</Label>
                  <Input 
                    id="passport" 
                    placeholder="Enter passport number" 
                    value={formData.passport}
                    onChange={handleInputChange}
                    className="bg-background/50 border-muted focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visa">Visa Details</Label>
                  <Input 
                    id="visa" 
                    placeholder="Enter visa details" 
                    value={formData.visa}
                    onChange={handleInputChange}
                    className="bg-background/50 border-muted focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Photograph</Label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-background/30 border-muted hover:border-primary/50 transition-colors">
                  <div className="w-32 h-32 bg-muted rounded-md flex items-center justify-center mb-4 relative overflow-hidden group">
                    <FileText className="h-10 w-10 text-muted-foreground group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Plus className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <Button variant="outline" type="button" className="bg-background/50 border-muted hover:bg-background/70">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF, max 5MB</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Languages Known</Label>
                <div className="border rounded-md p-4 bg-background/30 border-muted">
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((language) => (
                      <div key={language.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`language-${language.id}`}
                          checked={selectedLanguages.includes(language.id)}
                          onCheckedChange={() => handleLanguageToggle(language.id)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <label
                          htmlFor={`language-${language.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {language.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="physical">Physical Identifiers</Label>
                <Textarea
                  id="physical"
                  placeholder="Enter physical identifiers and distinguishing marks"
                  className="min-h-[120px] bg-background/50 border-muted focus:border-primary"
                  value={formData.physical}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation">Current Occupation</Label>
                <Input 
                  id="occupation" 
                  placeholder="Enter current occupation" 
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="bg-background/50 border-muted focus:border-primary"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="entry" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="entryMode">Mode of Entry</Label>
                <Select value={formData.entryMode} onValueChange={(value) => handleSelectChange("entryMode", value)}>
                  <SelectTrigger id="entryMode" className="bg-background/50 border-muted focus:border-primary">
                    <SelectValue placeholder="Select mode of entry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="air">Air</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                    <SelectItem value="sea">Sea</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="entryPoint">Entry Point (Location/Sector)</Label>
                <Input 
                  id="entryPoint" 
                  placeholder="Enter entry point" 
                  value={formData.entryPoint}
                  onChange={handleInputChange}
                  className="bg-background/50 border-muted focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label>Date of Entry</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-background/50 border-muted hover:bg-background/70",
                        !entryDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {entryDate ? format(entryDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={entryDate} onSelect={setEntryDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assisting">Name/Organization Assisting</Label>
                <Input 
                  id="assisting" 
                  placeholder="Enter name or organization" 
                  value={formData.assisting}
                  onChange={handleInputChange}
                  className="bg-background/50 border-muted focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supportNetwork">Support Network</Label>
                <Select value={formData.supportNetwork} onValueChange={(value) => handleSelectChange("supportNetwork", value)}>
                  <SelectTrigger id="supportNetwork" className="bg-background/50 border-muted focus:border-primary">
                    <SelectValue placeholder="Select support network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="political">Political</SelectItem>
                    <SelectItem value="ngo">NGO</SelectItem>
                    <SelectItem value="religious">Religious</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seized-ids">Seized IDs</Label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-background/30 border-muted hover:border-primary/50 transition-colors">
                  <Button variant="outline" type="button" className="bg-background/50 border-muted hover:bg-background/70">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Documents
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">PDF, JPG, PNG, max 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="residence" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lastStay">Last Stay Address</Label>
                <Textarea 
                  id="lastStay" 
                  placeholder="Enter last stay address in India" 
                  className="min-h-[120px] bg-background/50 border-muted focus:border-primary"
                  value={formData.lastStay}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nativeAddress">Native Address</Label>
                <Textarea 
                  id="nativeAddress" 
                  placeholder="Enter native address" 
                  className="min-h-[120px] bg-background/50 border-muted focus:border-primary"
                  value={formData.nativeAddress}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Associated Locations in India</Label>
                <div className="border rounded-md p-4 bg-background/30 border-muted">
                  <div className="grid grid-cols-2 gap-2">
                    {locations.map((location) => (
                      <div key={location.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`location-${location.id}`}
                          checked={selectedLocations.includes(location.id)}
                          onCheckedChange={() => handleLocationToggle(location.id)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <label
                          htmlFor={`location-${location.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {location.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>ID Proofs Obtained in India</Label>
                <div className="border rounded-md p-4 bg-background/30 border-muted">
                  <div className="grid grid-cols-2 gap-2">
                    {idProofs.map((idProof) => (
                      <div key={idProof.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`idproof-${idProof.id}`}
                          checked={selectedIdProofs.includes(idProof.id)}
                          onCheckedChange={() => handleIdProofToggle(idProof.id)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <label
                          htmlFor={`idproof-${idProof.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {idProof.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="legal" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2 flex items-center justify-between">
                <div>
                  <Label htmlFor="criminal-background" className="text-base">
                    Criminal Background
                  </Label>
                  <p className="text-sm text-muted-foreground">Does the individual have a criminal background?</p>
                </div>
                <Switch
                  id="criminal-background"
                  checked={hasCriminalBackground}
                  onCheckedChange={setHasCriminalBackground}
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              {hasCriminalBackground && (
                <div className="space-y-2">
                  <Label htmlFor="caseDetails">Case Details</Label>
                  <Textarea 
                    id="caseDetails" 
                    placeholder="Enter case details" 
                    className="min-h-[120px] bg-background/50 border-muted focus:border-primary"
                    value={formData.caseDetails}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="detainedBy">Detained By (Agency/Police Station)</Label>
                <Input 
                  id="detainedBy" 
                  placeholder="Enter detaining agency" 
                  value={formData.detainedBy}
                  onChange={handleInputChange}
                  className="bg-background/50 border-muted focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="courtProceedings">Court Proceedings Status</Label>
                <Select value={formData.courtProceedings} onValueChange={(value) => handleSelectChange("courtProceedings", value)}>
                  <SelectTrigger id="courtProceedings" className="bg-background/50 border-muted focus:border-primary">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-applicable">Not Applicable</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="appealed">Appealed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2 flex items-center justify-between">
                <div>
                  <Label htmlFor="embassy-contacted" className="text-base">
                    Embassy Contacted
                  </Label>
                  <p className="text-sm text-muted-foreground">Has the embassy been contacted?</p>
                </div>
                <Switch 
                  id="embassy-contacted" 
                  checked={embassyContacted} 
                  onCheckedChange={setEmbassyContacted}
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              {embassyContacted && (
                <div className="space-y-2">
                  <Label htmlFor="embassyDetails">Embassy Contact Details</Label>
                  <Textarea 
                    id="embassyDetails" 
                    placeholder="Enter embassy contact details" 
                    className="min-h-[80px] bg-background/50 border-muted focus:border-primary"
                    value={formData.embassyDetails}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea 
                  id="remarks" 
                  placeholder="Enter additional remarks" 
                  className="min-h-[120px] bg-background/50 border-muted focus:border-primary"
                  value={formData.remarks}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Profile
            </>
          )}
        </Button>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center
