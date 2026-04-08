"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  AlertTriangle,
  Bold,
  Italic,
  Strikethrough,
  Link2,
  Heading,
  Quote,
  Code,
  List,
  ListOrdered,
  ChevronLeft,
  ChevronRight,
  Undo,
  Redo,
  Search,
  Upload
} from "lucide-react"

// Rich Text Toolbar Component
function RichTextToolbar() {
  return (
    <div className="flex flex-wrap gap-1 p-2 border-b bg-muted/30">
      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0"><Bold className="h-4 w-4" /></Button>
      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0"><Italic className="h-4 w-4" /></Button>
      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0"><Strikethrough className="h-4 w-4" /></Button>
      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0"><Link2 className="h-4 w-4" /></Button>
      <div className="w-px h-8 bg-border mx-1" />
      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0"><Heading className="h-4 w-4" /></Button>
      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0"><Quote className="h-4 w-4" /></Button>
      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0"><Code className="h-4 w-4" /></Button>
      <div className="w-px h-8 bg-border mx-1" />
      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0"><List className="h-4 w-4" /></Button>
      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0"><ListOrdered className="h-4 w-4" /></Button>
      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0"><ChevronLeft className="h-4 w-4" /></Button>
      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0"><ChevronRight className="h-4 w-4" /></Button>
      <div className="w-px h-8 bg-border mx-1" />
      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0"><Undo className="h-4 w-4" /></Button>
      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0"><Redo className="h-4 w-4" /></Button>
    </div>
  )
}

// Rich Text Editor Component
function RichTextEditor({ 
  labelAz, 
  labelEn, 
  placeholderAz = "", 
  placeholderEn = "",
  showCharCount = false,
  minChars = 0,
  maxChars = 0,
  note = ""
}: { 
  labelAz: string
  labelEn: string
  placeholderAz?: string
  placeholderEn?: string
  showCharCount?: boolean
  minChars?: number
  maxChars?: number
  note?: string
}) {
  const [valueAz, setValueAz] = useState("")
  const [valueEn, setValueEn] = useState("")

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label className="font-medium">{labelAz} *</Label>
        <div className="border rounded-lg overflow-hidden">
          <RichTextToolbar />
          <Textarea 
            value={valueAz}
            onChange={(e) => setValueAz(e.target.value)}
            placeholder={placeholderAz}
            className="min-h-[150px] border-0 rounded-none focus-visible:ring-0"
          />
        </div>
        {showCharCount && (
          <p className={`text-xs ${valueAz.length < minChars || valueAz.length > maxChars ? 'text-red-500' : 'text-muted-foreground'}`}>
            {maxChars} / {valueAz.length} simvol {minChars > 0 && `(${minChars}-${maxChars} arası olmalıdır)`}
          </p>
        )}
        {note && <p className="text-xs text-muted-foreground">{note}</p>}
      </div>
      <div className="space-y-2">
        <Label className="font-medium">{labelEn} *</Label>
        <div className="border rounded-lg overflow-hidden">
          <RichTextToolbar />
          <Textarea 
            value={valueEn}
            onChange={(e) => setValueEn(e.target.value)}
            placeholder={placeholderEn}
            className="min-h-[150px] border-0 rounded-none focus-visible:ring-0"
          />
        </div>
        {showCharCount && (
          <p className={`text-xs ${valueEn.length < minChars || valueEn.length > maxChars ? 'text-red-500' : 'text-muted-foreground'}`}>
            {maxChars} / {valueEn.length} characters {minChars > 0 && `(must be between ${minChars}-${maxChars})`}
          </p>
        )}
        {note && <p className="text-xs text-muted-foreground">{note}</p>}
      </div>
    </div>
  )
}

// Interfaces
interface ScienceField {
  id: string
  code: string
  name: string
}

interface Participant {
  id: string
  position: string
  surname: string
  name: string
  fatherName: string
  status: string
}

interface Salary {
  id: string
  participant: string
  position: string
  fullAmount: number
  netSalary: number
  insurance: number
  duration: number
  totalSalary: number
  note: string
  editing: boolean
}

interface Asset {
  id: string
  name: string
  type: string
  company: string
  country: string
  city: string
  link: string
  quantity: number
  unit: string
  unitPrice: number
  currency: string
  totalAzn: number
}

interface Travel {
  id: string
  participant: string
  duration: number
  purpose: string
  transport: string
  country: string
  city: string
  destination: string
  travelCost: number
  travelCurrency: string
  travelAzn: number
  visaCost: number
  visaCurrency: string
  visaAzn: number
  insuranceCost: number
  insuranceCurrency: string
  insuranceAzn: number
  dailyRate: number
  total: number
}

interface Document {
  id: string
  name: string
  note: string
}

export default function ApplyPage() {
  const params = useParams()
  const competitionId = params.competitionId

  // Science Fields State
  const [scienceFields, setScienceFields] = useState<ScienceField[]>([
    { id: "1", code: "01.01", name: "Riyazi analiz / Mathematical Analysis" }
  ])
  const [showAddFieldDialog, setShowAddFieldDialog] = useState(false)
  const [newField, setNewField] = useState({ direction: "", specialty: "", subDirection: "" })

  // Participants State
  const [participants, setParticipants] = useState<Participant[]>([
    { id: "1", position: "Layihə rəhbəri", surname: "ƏSGƏROV", name: "ABBAS", fatherName: "BABAŞ OĞLU", status: "Təsdiq edilib" }
  ])
  const [showAddParticipantDialog, setShowAddParticipantDialog] = useState(false)
  const [newParticipant, setNewParticipant] = useState({ name: "", surname: "", fatherName: "", birthDate: "" })

  // Salaries State
  const [salaries, setSalaries] = useState<Salary[]>([
    { id: "1", participant: "ƏSGƏROV ABBAS", position: "Layihə rəhbəri", fullAmount: 2000, netSalary: 1660, insurance: 10, duration: 12, totalSalary: 24000, note: "", editing: false }
  ])

  // Assets State
  const [assets, setAssets] = useState<Asset[]>([])
  const [showAddAssetDialog, setShowAddAssetDialog] = useState(false)
  const [newAsset, setNewAsset] = useState({
    name: "", type: "", company: "", country: "", city: "", link: "",
    quantity: 1, unit: "", unitPrice: 0, currency: "AZN"
  })

  // Travel State
  const [travels, setTravels] = useState<Travel[]>([])
  const [showAddTravelDialog, setShowAddTravelDialog] = useState(false)
  const [newTravel, setNewTravel] = useState({
    participant: "", duration: 1, purpose: "", transport: "", country: "", city: "", destination: "",
    travelCost: 0, travelCurrency: "AZN", visaCost: 0, visaCurrency: "AZN", insuranceCost: 0, insuranceCurrency: "AZN"
  })

  // Documents State
  const [documents, setDocuments] = useState<Document[]>([])
  const [showAddDocDialog, setShowAddDocDialog] = useState(false)

  // Agreement State
  const [agreed, setAgreed] = useState(false)

  // Add Science Field
  const addScienceField = () => {
    if (newField.direction && newField.specialty) {
      setScienceFields([...scienceFields, {
        id: Date.now().toString(),
        code: `0${scienceFields.length + 1}.0${scienceFields.length + 1}`,
        name: `${newField.specialty} / ${newField.specialty}`
      }])
      setNewField({ direction: "", specialty: "", subDirection: "" })
      setShowAddFieldDialog(false)
    }
  }

  // Delete Science Field
  const deleteScienceField = (id: string) => {
    setScienceFields(scienceFields.filter(f => f.id !== id))
  }

  // Add Participant
  const addParticipant = () => {
    if (newParticipant.name && newParticipant.surname) {
      setParticipants([...participants, {
        id: Date.now().toString(),
        position: "İcraçı",
        surname: newParticipant.surname.toUpperCase(),
        name: newParticipant.name.toUpperCase(),
        fatherName: newParticipant.fatherName.toUpperCase(),
        status: "Gözləmədə"
      }])
      setNewParticipant({ name: "", surname: "", fatherName: "", birthDate: "" })
      setShowAddParticipantDialog(false)
    }
  }

  // Delete Participant
  const deleteParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id))
  }

  // Toggle Salary Edit
  const toggleSalaryEdit = (id: string) => {
    setSalaries(salaries.map(s => s.id === id ? { ...s, editing: !s.editing } : s))
  }

  // Update Salary
  const updateSalary = (id: string, field: string, value: number | string) => {
    setSalaries(salaries.map(s => {
      if (s.id === id) {
        const updated = { ...s, [field]: value }
        if (field === "fullAmount") {
          const amount = Number(value)
          updated.netSalary = Math.round(amount * 0.83)
          updated.insurance = Math.round(amount * 0.005)
          updated.totalSalary = amount * updated.duration
        }
        return updated
      }
      return s
    }))
  }

  // Add Asset
  const addAsset = () => {
    if (newAsset.name && newAsset.type) {
      const totalAzn = newAsset.unitPrice * newAsset.quantity
      setAssets([...assets, {
        id: Date.now().toString(),
        ...newAsset,
        totalAzn
      }])
      setNewAsset({ name: "", type: "", company: "", country: "", city: "", link: "", quantity: 1, unit: "", unitPrice: 0, currency: "AZN" })
      setShowAddAssetDialog(false)
    }
  }

  // Delete Asset
  const deleteAsset = (id: string) => {
    setAssets(assets.filter(a => a.id !== id))
  }

  // Add Travel
  const addTravel = () => {
    if (newTravel.participant && newTravel.purpose) {
      const dailyRate = 50 // Example daily rate
      const dailyTotal = dailyRate * newTravel.duration
      const total = dailyTotal + newTravel.travelCost + newTravel.visaCost + newTravel.insuranceCost
      setTravels([...travels, {
        id: Date.now().toString(),
        ...newTravel,
        travelAzn: newTravel.travelCost,
        visaAzn: newTravel.visaCost,
        insuranceAzn: newTravel.insuranceCost,
        dailyRate,
        total
      }])
      setNewTravel({ participant: "", duration: 1, purpose: "", transport: "", country: "", city: "", destination: "", travelCost: 0, travelCurrency: "AZN", visaCost: 0, visaCurrency: "AZN", insuranceCost: 0, insuranceCurrency: "AZN" })
      setShowAddTravelDialog(false)
    }
  }

  // Delete Travel
  const deleteTravel = (id: string) => {
    setTravels(travels.filter(t => t.id !== id))
  }

  return (
    <div className="container mx-auto py-6 px-4 space-y-8 max-w-7xl">
      {/* Page Header */}
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold text-foreground">Layihə müraciət forması / Project Application Form</h1>
        <p className="text-muted-foreground mt-1">Müsabiqə #{competitionId}</p>
      </div>

      {/* Science Fields Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Elm sahələri / Science Fields</CardTitle>
          <Button size="sm" onClick={() => setShowAddFieldDialog(true)}>
            <Plus className="h-4 w-4 mr-1" /> Əlavə et / Add
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kod / Code</TableHead>
                <TableHead>Təsnifat üzrə elm sahəsinin tam adı / Science full name</TableHead>
                <TableHead className="text-right">Əməliyyatlar / Operations</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scienceFields.map((field) => (
                <TableRow key={field.id}>
                  <TableCell className="font-mono">{field.code}</TableCell>
                  <TableCell>{field.name}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700" onClick={() => deleteScienceField(field.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Science Field Dialog */}
      <Dialog open={showAddFieldDialog} onOpenChange={setShowAddFieldDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Elm sahəsi əlavə et / Add Science Field</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Elmi istiqamətin adı / Scientific direction name *</Label>
              <Select value={newField.direction} onValueChange={(v) => setNewField({ ...newField, direction: v })}>
                <SelectTrigger><SelectValue placeholder="Seçin / Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="natural">Təbiət elmləri / Natural Sciences</SelectItem>
                  <SelectItem value="technical">Texniki elmlər / Technical Sciences</SelectItem>
                  <SelectItem value="medical">Tibb elmləri / Medical Sciences</SelectItem>
                  <SelectItem value="humanitarian">Humanitar elmlər / Humanitarian Sciences</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Elmi ixtisasın adı / Scientific specialty name *</Label>
              <Select value={newField.specialty} onValueChange={(v) => setNewField({ ...newField, specialty: v })}>
                <SelectTrigger><SelectValue placeholder="Seçin / Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Riyaziyyat / Mathematics</SelectItem>
                  <SelectItem value="physics">Fizika / Physics</SelectItem>
                  <SelectItem value="chemistry">Kimya / Chemistry</SelectItem>
                  <SelectItem value="biology">Biologiya / Biology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Alt istiqamət / Sub-direction *</Label>
              <Select value={newField.subDirection} onValueChange={(v) => setNewField({ ...newField, subDirection: v })}>
                <SelectTrigger><SelectValue placeholder="Seçin / Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="analysis">Analiz / Analysis</SelectItem>
                  <SelectItem value="algebra">Cəbr / Algebra</SelectItem>
                  <SelectItem value="geometry">Həndəsə / Geometry</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddFieldDialog(false)}>İmtina et / Cancel</Button>
            <Button onClick={addScienceField}>Əlavə et / Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Əsas məlumatlar / Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Applicant Status */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Qrant ərizəçisinin statusu *</Label>
              <Select defaultValue="collective">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="collective">Müvəqqəti yaradıcı kollektiv</SelectItem>
                  <SelectItem value="individual">Fərdi tədqiqatçı</SelectItem>
                  <SelectItem value="organization">Elm təşkilatı</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status of the applicant *</Label>
              <Select defaultValue="collective">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="collective">Temporary creative scientific collective</SelectItem>
                  <SelectItem value="individual">Individual researcher</SelectItem>
                  <SelectItem value="organization">Scientific organization</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Duration */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Layihənin icra müddəti (Ay) *</Label>
              <Select defaultValue="12">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 ay</SelectItem>
                  <SelectItem value="12">12 ay</SelectItem>
                  <SelectItem value="18">18 ay</SelectItem>
                  <SelectItem value="24">24 ay</SelectItem>
                  <SelectItem value="36">36 ay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Duration of the project (Month) *</Label>
              <Select defaultValue="12">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 months</SelectItem>
                  <SelectItem value="12">12 months</SelectItem>
                  <SelectItem value="18">18 months</SelectItem>
                  <SelectItem value="24">24 months</SelectItem>
                  <SelectItem value="36">36 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Type */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Layihənin tipi *</Label>
              <Select defaultValue="team">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Fərdi layihə</SelectItem>
                  <SelectItem value="team">Kollektiv layihə</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Type of the proposal *</Label>
              <Select defaultValue="team">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal project</SelectItem>
                  <SelectItem value="team">Team project</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rich Text Editors Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Layihə təsviri / Project Description</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <RichTextEditor 
            labelAz="Layihənin məqsədi, qarşıya qoyulan məsələləri, aktuallığı, multidissiplinar xarakterinin əsaslandırılması"
            labelEn="Objectives, goals and actuality of the grant proposal, justification of multidisciplinary characters"
            placeholderAz="Layihənin məqsədini daxil edin..."
            placeholderEn="Enter project objectives..."
          />

          <RichTextEditor 
            labelAz="Layihənin annotasiyası"
            labelEn="Project annotation"
            placeholderAz="Layihənin annotasiyasını daxil edin (2400-3500 simvol)..."
            placeholderEn="Enter project annotation (2400-3500 characters)..."
            showCharCount
            minChars={2400}
            maxChars={3500}
          />

          <RichTextEditor 
            labelAz="Layihənin məzmununu tam əks etdirən açar sözlər və ya söz birləşmələri"
            labelEn="Keywords and/or phrases fully reflecting the content of proposal"
            placeholderAz="Açar sözləri daxil edin..."
            placeholderEn="Enter keywords..."
            note="Maksimum 10 söz, nöqtəli vergüllə ayrılmalıdır / Maximum 10 words, separated by semicolons"
          />

          <RichTextEditor 
            labelAz="Layihənin elmi istiqaməti və qarşıya qoyulan problem üzrə qısa icmal"
            labelEn="Scientific direction of the proposal and brief review on the proposed scientific problem"
            placeholderAz="Elmi istiqaməti daxil edin..."
            placeholderEn="Enter scientific direction..."
          />

          <RichTextEditor 
            labelAz="Layihənin elmi ideyası"
            labelEn="Scientific idea of the proposal"
            placeholderAz="Elmi ideyanı daxil edin..."
            placeholderEn="Enter scientific idea..."
          />

          <div className="space-y-4">
            <h3 className="font-semibold">Layihə üzrə tədqiqatın strukturu / Structure of the research</h3>
            {[1, 2, 3, 4].map((level) => (
              <RichTextEditor 
                key={level}
                labelAz={`Mərhələ ${level}`}
                labelEn={`Stage ${level}`}
                placeholderAz={`Mərhələ ${level} təsvirini daxil edin...`}
                placeholderEn={`Enter stage ${level} description...`}
              />
            ))}
          </div>

          <RichTextEditor 
            labelAz="Layihədən gözlənilən nəticələr, onların elmi və təcrübi əhəmiyyəti"
            labelEn="Expected results of the project, their scientific and practical importance"
            placeholderAz="Gözlənilən nəticələri daxil edin..."
            placeholderEn="Enter expected results..."
          />

          <RichTextEditor 
            labelAz="Layihə üzrə tədqiqatın nəticələrinin istifadəsi və tətbiqi mümkün olan sahələr"
            labelEn="Areas where expected results could be used or applied"
            placeholderAz="Tətbiq sahələrini daxil edin..."
            placeholderEn="Enter application areas..."
          />

          <RichTextEditor 
            labelAz="Layihə rəhbərinin/kollektivin ixtisasının və məşğul olduğu elm sahəsinin elmi layihənin mövzusuna uyğunluq dərəcəsi"
            labelEn="Characterization of the scientific collective/staff"
            placeholderAz="Kollektivin ixtisasını daxil edin..."
            placeholderEn="Enter collective characterization..."
          />

          <RichTextEditor 
            labelAz="Layihə üzrə elmi-tədqiqat işinin yerinə yetirilməsi üçün lazım olan avadanlıq, cihaz və qurğular haqqında məlumat"
            labelEn="Information about equipment needed for the research"
            placeholderAz="Avadanlıq məlumatlarını daxil edin..."
            placeholderEn="Enter equipment information..."
          />

          <RichTextEditor 
            labelAz="Layihə rəhbərinin və icraçıların Elmin İnkişafı Fondu tərəfindən maliyyələşdirilmiş layihələrdə iştirakı barədə məlumat"
            labelEn="Information about the participation in previous grant projects"
            placeholderAz="Əvvəlki layihələr haqqında məlumat..."
            placeholderEn="Enter previous grant participation info..."
          />
        </CardContent>
      </Card>

      {/* Participants Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Layihədə iştirak edən şəxslər / Project Participants</CardTitle>
          <Button size="sm" onClick={() => setShowAddParticipantDialog(true)}>
            <Plus className="h-4 w-4 mr-1" /> Layihəyə icraçı əlavə edin
          </Button>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm text-blue-800">
            <strong>Qeyd:</strong> Yalnız e-Qrant sistemində &quot;İddiaçı&quot; kimi qeydiyyatdan keçmiş şəxslər əlavə edilə bilər.
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tutduğu vəzifə</TableHead>
                <TableHead>Soyadı</TableHead>
                <TableHead>Adı</TableHead>
                <TableHead>Atasının adı</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Əməliyyatlar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.position}</TableCell>
                  <TableCell className="font-medium">{p.surname}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.fatherName}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${p.status === "Təsdiq edilib" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                      {p.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {p.position !== "Layihə rəhbəri" && (
                      <Button size="sm" variant="ghost" className="text-red-600" onClick={() => deleteParticipant(p.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Participant Dialog */}
      <Dialog open={showAddParticipantDialog} onOpenChange={setShowAddParticipantDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Layihəyə icraçı əlavə edin / Add Participant</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Adı / Name *</Label>
              <Input value={newParticipant.name} onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Soyadı / Surname *</Label>
              <Input value={newParticipant.surname} onChange={(e) => setNewParticipant({ ...newParticipant, surname: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Atasının adı / Father&apos;s name *</Label>
              <Input value={newParticipant.fatherName} onChange={(e) => setNewParticipant({ ...newParticipant, fatherName: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Doğum tarixi / Birth date *</Label>
              <Input type="date" value={newParticipant.birthDate} onChange={(e) => setNewParticipant({ ...newParticipant, birthDate: e.target.value })} />
            </div>
            <Button variant="outline" className="w-full">
              <Search className="h-4 w-4 mr-2" /> Axtar / Search
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddParticipantDialog(false)}>İmtina et / Cancel</Button>
            <Button onClick={addParticipant}>Əlavə et / Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Documents Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Digər sənəd və məktubların əlavə edilməsi / Additional Documents</CardTitle>
          <Button size="sm" onClick={() => setShowAddDocDialog(true)}>
            <Upload className="h-4 w-4 mr-1" /> Sənəd əlavə et
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sənəd / Document</TableHead>
                <TableHead>Qeyd / Note</TableHead>
                <TableHead className="text-right">Əməliyyatlar / Operations</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                    Hələ sənəd əlavə edilməyib / No documents added yet
                  </TableCell>
                </TableRow>
              ) : (
                documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.name}</TableCell>
                    <TableCell>{doc.note}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Document Dialog */}
      <Dialog open={showAddDocDialog} onOpenChange={setShowAddDocDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sənəd əlavə et / Add Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Fayl seçin / Select file *</Label>
              <Input type="file" accept=".pdf" />
            </div>
            <div className="space-y-2">
              <Label>Qeyd / Note</Label>
              <Textarea placeholder="Sənəd haqqında qeyd..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDocDialog(false)}>İmtina et / Cancel</Button>
            <Button onClick={() => setShowAddDocDialog(false)}>Əlavə et / Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Budget Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Smeta / Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="salaries">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="salaries">Əmək haqqları</TabsTrigger>
              <TabsTrigger value="assets">Əsas vəsaitlər</TabsTrigger>
              <TabsTrigger value="travel">Ezamiyyət</TabsTrigger>
              <TabsTrigger value="summary">Xərclər smetası</TabsTrigger>
            </TabsList>

            {/* Salaries Tab */}
            <TabsContent value="salaries" className="space-y-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>İştirakçı S.A.A</TableHead>
                      <TableHead>Vəzifəsi</TableHead>
                      <TableHead>Tam məbləğ (AZN)</TableHead>
                      <TableHead>Ələ çatacaq aylıq</TableHead>
                      <TableHead>İşsizlik 0.5%</TableHead>
                      <TableHead>Müddət (ay)</TableHead>
                      <TableHead>Ümumi</TableHead>
                      <TableHead>Qeyd</TableHead>
                      <TableHead>Əməliyyatlar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salaries.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell className="font-medium">{s.participant}</TableCell>
                        <TableCell>{s.position}</TableCell>
                        <TableCell>
                          {s.editing ? (
                            <Input 
                              type="number" 
                              value={s.fullAmount} 
                              onChange={(e) => updateSalary(s.id, "fullAmount", Number(e.target.value))}
                              className="w-24"
                            />
                          ) : s.fullAmount}
                        </TableCell>
                        <TableCell>{s.netSalary}</TableCell>
                        <TableCell>{s.insurance}</TableCell>
                        <TableCell>{s.duration}</TableCell>
                        <TableCell className="font-medium">{s.totalSalary}</TableCell>
                        <TableCell>
                          {s.editing ? (
                            <Input 
                              value={s.note} 
                              onChange={(e) => updateSalary(s.id, "note", e.target.value)}
                              className="w-32"
                            />
                          ) : s.note || "-"}
                        </TableCell>
                        <TableCell>
                          {s.editing ? (
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" onClick={() => toggleSalaryEdit(s.id)}>
                                <Save className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => toggleSalaryEdit(s.id)}>
                                <X className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          ) : (
                            <Button size="sm" variant="ghost" onClick={() => toggleSalaryEdit(s.id)}>
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-xs text-red-600">
                * Layihə icraçılarının əmək haqqları 14% gəlir vergisi və 3% DSMF daxil olmaqla göstərilməlidir
              </p>
            </TabsContent>

            {/* Assets Tab */}
            <TabsContent value="assets" className="space-y-4">
              <div className="flex justify-end">
                <Button size="sm" onClick={() => setShowAddAssetDialog(true)}>
                  <Plus className="h-4 w-4 mr-1" /> Əsas vəsait və ya xidmət əlavə edin
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vəsait / xidmət</TableHead>
                    <TableHead>Növü</TableHead>
                    <TableHead>Şirkət</TableHead>
                    <TableHead>Link</TableHead>
                    <TableHead>Vahidin qiyməti</TableHead>
                    <TableHead>Miqdarı</TableHead>
                    <TableHead>Cəmi məbləğ</TableHead>
                    <TableHead>Əməliyyatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                        Hələ vəsait əlavə edilməyib
                      </TableCell>
                    </TableRow>
                  ) : (
                    assets.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell>{a.name}</TableCell>
                        <TableCell>{a.type}</TableCell>
                        <TableCell>{a.company}</TableCell>
                        <TableCell><a href={a.link} className="text-blue-600 hover:underline">Link</a></TableCell>
                        <TableCell>{a.unitPrice}</TableCell>
                        <TableCell>{a.quantity}</TableCell>
                        <TableCell>{a.totalAzn}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost"><Edit2 className="h-4 w-4" /></Button>
                            <Button size="sm" variant="ghost" className="text-red-600" onClick={() => deleteAsset(a.id)}><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Add Asset Dialog */}
            <Dialog open={showAddAssetDialog} onOpenChange={setShowAddAssetDialog}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Əsas vəsait və ya xidmət əlavə edin / Add Asset or Service</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Material / xidmətin adı *</Label>
                    <Input value={newAsset.name} onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Vəsait növünü seçin *</Label>
                    <Select value={newAsset.type} onValueChange={(v) => setNewAsset({ ...newAsset, type: v })}>
                      <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equipment">Avadanlıq</SelectItem>
                        <SelectItem value="material">Material</SelectItem>
                        <SelectItem value="service">Xidmət</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>İstehsalçı / satış edən şirkətin ölkəsi *</Label>
                    <Select value={newAsset.country} onValueChange={(v) => setNewAsset({ ...newAsset, country: v })}>
                      <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AZ">Azərbaycan</SelectItem>
                        <SelectItem value="TR">Türkiyə</SelectItem>
                        <SelectItem value="DE">Almaniya</SelectItem>
                        <SelectItem value="US">ABŞ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Şirkətin adı *</Label>
                    <Input value={newAsset.company} onChange={(e) => setNewAsset({ ...newAsset, company: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Şirkətin şəhəri *</Label>
                    <Input value={newAsset.city} onChange={(e) => setNewAsset({ ...newAsset, city: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Ətraflı məlumat üçün link</Label>
                    <Input value={newAsset.link} onChange={(e) => setNewAsset({ ...newAsset, link: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Miqdarı *</Label>
                    <Input type="number" value={newAsset.quantity} onChange={(e) => setNewAsset({ ...newAsset, quantity: Number(e.target.value) })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Ölçü vahidi</Label>
                    <Select value={newAsset.unit} onValueChange={(v) => setNewAsset({ ...newAsset, unit: v })}>
                      <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="piece">Ədəd</SelectItem>
                        <SelectItem value="set">Dəst</SelectItem>
                        <SelectItem value="kg">Kq</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Vahidin qiyməti *</Label>
                    <Input type="number" value={newAsset.unitPrice} onChange={(e) => setNewAsset({ ...newAsset, unitPrice: Number(e.target.value) })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Pul vahidi *</Label>
                    <Select value={newAsset.currency} onValueChange={(v) => setNewAsset({ ...newAsset, currency: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AZN">AZN</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddAssetDialog(false)}>İmtina et</Button>
                  <Button onClick={addAsset}>Əlavə et</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Travel Tab */}
            <TabsContent value="travel" className="space-y-4">
              <div className="flex justify-end">
                <Button size="sm" onClick={() => setShowAddTravelDialog(true)}>
                  <Plus className="h-4 w-4 mr-1" /> Ezamiyyət xərclərini daxil edin
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Məqsəd</TableHead>
                      <TableHead>Təşkilat</TableHead>
                      <TableHead>İştirakçı</TableHead>
                      <TableHead>Nəqliyyat</TableHead>
                      <TableHead>Müddət (gün)</TableHead>
                      <TableHead>Gündəlik</TableHead>
                      <TableHead>Yol xərci</TableHead>
                      <TableHead>Viza + Sığorta</TableHead>
                      <TableHead>Cəmi</TableHead>
                      <TableHead>Əməliyyatlar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {travels.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center text-muted-foreground py-8">
                          Hələ ezamiyyət əlavə edilməyib
                        </TableCell>
                      </TableRow>
                    ) : (
                      travels.map((t) => (
                        <TableRow key={t.id}>
                          <TableCell>{t.purpose}</TableCell>
                          <TableCell>{t.destination}</TableCell>
                          <TableCell>{t.participant}</TableCell>
                          <TableCell>{t.transport}</TableCell>
                          <TableCell>{t.duration}</TableCell>
                          <TableCell>{t.dailyRate * t.duration}</TableCell>
                          <TableCell>{t.travelAzn}</TableCell>
                          <TableCell>{t.visaAzn + t.insuranceAzn}</TableCell>
                          <TableCell className="font-medium">{t.total}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost"><Edit2 className="h-4 w-4" /></Button>
                              <Button size="sm" variant="ghost" className="text-red-600" onClick={() => deleteTravel(t.id)}><Trash2 className="h-4 w-4" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Add Travel Dialog */}
            <Dialog open={showAddTravelDialog} onOpenChange={setShowAddTravelDialog}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Ezamiyyət xərclərini daxil edin / Add Travel Expenses</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Ezam olunan layihə iştirakçısı *</Label>
                    <Select value={newTravel.participant} onValueChange={(v) => setNewTravel({ ...newTravel, participant: v })}>
                      <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>
                        {participants.map(p => (
                          <SelectItem key={p.id} value={`${p.surname} ${p.name}`}>{p.surname} {p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Müddət (gün ilə) *</Label>
                    <Input type="number" value={newTravel.duration} onChange={(e) => setNewTravel({ ...newTravel, duration: Number(e.target.value) })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Ezamiyyətin məqsədi *</Label>
                    <Select value={newTravel.purpose} onValueChange={(v) => setNewTravel({ ...newTravel, purpose: v })}>
                      <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="discussion">Elmi nəticələrin müzakirəsi</SelectItem>
                        <SelectItem value="training">Təcrübəkeçmə</SelectItem>
                        <SelectItem value="conference">Konfrans iştirakı</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Nəqliyyatın növü *</Label>
                    <Select value={newTravel.transport} onValueChange={(v) => setNewTravel({ ...newTravel, transport: v })}>
                      <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plane">Təyyarə</SelectItem>
                        <SelectItem value="train">Qatar</SelectItem>
                        <SelectItem value="bus">Avtobus</SelectItem>
                        <SelectItem value="car">Avtomobil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Ezam olunduğu ölkə *</Label>
                    <Select value={newTravel.country} onValueChange={(v) => setNewTravel({ ...newTravel, country: v })}>
                      <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TR">Türkiyə</SelectItem>
                        <SelectItem value="DE">Almaniya</SelectItem>
                        <SelectItem value="US">ABŞ</SelectItem>
                        <SelectItem value="GB">Böyük Britaniya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Ezam olunduğu şəhər</Label>
                    <Input value={newTravel.city} onChange={(e) => setNewTravel({ ...newTravel, city: e.target.value })} />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Ezam olunduğu yer / Destination *</Label>
                    <Input value={newTravel.destination} onChange={(e) => setNewTravel({ ...newTravel, destination: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Yol xərci *</Label>
                    <div className="flex gap-2">
                      <Input type="number" value={newTravel.travelCost} onChange={(e) => setNewTravel({ ...newTravel, travelCost: Number(e.target.value) })} />
                      <Select value={newTravel.travelCurrency} onValueChange={(v) => setNewTravel({ ...newTravel, travelCurrency: v })}>
                        <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AZN">AZN</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Viza xərci</Label>
                    <div className="flex gap-2">
                      <Input type="number" value={newTravel.visaCost} onChange={(e) => setNewTravel({ ...newTravel, visaCost: Number(e.target.value) })} />
                      <Select value={newTravel.visaCurrency} onValueChange={(v) => setNewTravel({ ...newTravel, visaCurrency: v })}>
                        <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AZN">AZN</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Səfər sığortası xərci</Label>
                    <div className="flex gap-2">
                      <Input type="number" value={newTravel.insuranceCost} onChange={(e) => setNewTravel({ ...newTravel, insuranceCost: Number(e.target.value) })} />
                      <Select value={newTravel.insuranceCurrency} onValueChange={(v) => setNewTravel({ ...newTravel, insuranceCurrency: v })}>
                        <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AZN">AZN</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Gündəlik xərc norması</Label>
                    <Input disabled placeholder="Qanuna əsasən hesablanır" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddTravelDialog(false)}>İmtina et</Button>
                  <Button onClick={addTravel}>Əlavə et</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Summary Tab */}
            <TabsContent value="summary">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Xərc maddələrinin adları</TableHead>
                    <TableHead className="text-right">Layihə üzrə cəmi (AZN)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Əmək haqqı xərcləri</TableCell>
                    <TableCell className="text-right">{salaries.reduce((sum, s) => sum + s.totalSalary, 0).toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Əsas vəsaitlər və xidmətlər</TableCell>
                    <TableCell className="text-right">{assets.reduce((sum, a) => sum + a.totalAzn, 0).toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Ezamiyyət xərcləri</TableCell>
                    <TableCell className="text-right">{travels.reduce((sum, t) => sum + t.total, 0).toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow className="font-bold">
                    <TableCell>CƏMİ</TableCell>
                    <TableCell className="text-right">
                      {(
                        salaries.reduce((sum, s) => sum + s.totalSalary, 0) +
                        assets.reduce((sum, a) => sum + a.totalAzn, 0) +
                        travels.reduce((sum, t) => sum + t.total, 0)
                      ).toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Agreement & Submit */}
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="flex items-start gap-3">
            <Checkbox 
              id="agreement" 
              checked={agreed} 
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
            />
            <label htmlFor="agreement" className="text-sm leading-relaxed cursor-pointer">
              Mən Azərbaycan Respublikasının Elmin İnkişafı Fondunun qaydaları ilə tanış oldum və bu qaydaları qəbul edirəm. 
              Layihədə təqdim olunan məlumatların doğruluğunu təsdiq edirəm və müəlliflik hüquqları ilə bağlı tam məsuliyyət daşıyıram.
              <br /><br />
              I have read and accept the rules of the Science Development Foundation of the Republic of Azerbaijan. 
              I confirm the accuracy of the information provided in the project and take full responsibility for the copyright.
            </label>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="flex-1 min-w-[200px]">
              Aralıq versiya kimi yadda saxlayın
            </Button>
            <Button className="flex-1 min-w-[200px] bg-blue-600 hover:bg-blue-700" disabled={!agreed}>
              Layihəni təsdiqləyərək, müsabiqədə iştirakı rəsmiləşdir
            </Button>
            <Button variant="destructive" className="flex-1 min-w-[200px]">
              Müsabiqədə iştirakdan imtina edin
            </Button>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
            <p className="text-red-700 font-medium">
              DİQQƏT! Layihənin təqdim olunması üçün son tarix: 09.04.2026
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
