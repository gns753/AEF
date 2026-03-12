"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Search, Globe, Building2, Briefcase, FlaskConical, GitBranch, Award, Building, Plane } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

// ============ COUNTRIES ============
interface Country {
  id: string
  code: string
  nameAz: string
  nameEn: string
  active: boolean
}

// ============ UNIVERSITIES ============
interface University {
  id: string
  nameAz: string
  nameEn: string
  addressAz: string
  addressEn: string
  phone: string
  active: boolean
}

// ============ WORKPLACES ============
interface Workplace {
  id: string
  nameAz: string
  nameEn: string
  shortNameAz: string
  shortNameEn: string
  addressAz: string
  addressEn: string
  managerAz: string
  managerEn: string
  subordination: string
  website: string
  subordinationStrAze: string
  subordinationStrEng: string
  phone: string
  active: boolean
  scienceFields: { branch: string; profile: string }[]
}

// ============ SCIENCE FIELDS ============
interface ScienceField {
  id: string
  nameAz: string
  nameEn: string
  active: boolean
}

// ============ SCIENCE DIRECTIONS ============
interface ScienceDirection {
  id: string
  branch: string
  code: string
  nameAz: string
  nameEn: string
  active: boolean
}

// ============ SCIENCE SPECIALIZATIONS ============
interface ScienceSpecialization {
  id: string
  profile: string
  code: string
  nameAz: string
  nameEn: string
  active: boolean
}

// ============ ORGANIZATION CATEGORIES ============
interface OrgCategory {
  id: string
  nameAz: string
  nameEn: string
  active: boolean
}

// ============ BUSINESS TRIP NORMS ============
interface TripNorm {
  id: string
  country: string
  nameAz: string
  nameEn: string
  currency: string
  dailyExpense: string
}

export default function ReferencesPage() {
  const [activeTab, setActiveTab] = useState("countries")
  const [searchTerm, setSearchTerm] = useState("")

  // Countries State
  const [countries, setCountries] = useState<Country[]>([
    { id: "1", code: "AZ", nameAz: "Azərbaycan", nameEn: "Azerbaijan", active: true },
    { id: "2", code: "TR", nameAz: "Türkiyə", nameEn: "Turkey", active: true },
    { id: "3", code: "RU", nameAz: "Rusiya", nameEn: "Russia", active: true },
    { id: "4", code: "US", nameAz: "Amerika Birləşmiş Ştatları", nameEn: "United States", active: true },
    { id: "5", code: "DE", nameAz: "Almaniya", nameEn: "Germany", active: true },
  ])
  const [countryDialogOpen, setCountryDialogOpen] = useState(false)
  const [editingCountry, setEditingCountry] = useState<Country | null>(null)
  const [countryForm, setCountryForm] = useState<Country>({ id: "", code: "", nameAz: "", nameEn: "", active: true })

  // Universities State
  const [universities, setUniversities] = useState<University[]>([
    { id: "1", nameAz: "Bakı Dövlət Universiteti", nameEn: "Baku State University", addressAz: "Bakı, Akademik Zahid Xəlilov küç., 23", addressEn: "Baku, Akademik Zahid Khalilov str., 23", phone: "0124393104", active: true },
    { id: "2", nameAz: "Azərbaycan Dövlət Neft və Sənaye Universiteti", nameEn: "Azerbaijan State Oil and Industry University", addressAz: "Bakı, Azadlıq prospekti, 20", addressEn: "Baku, Azadlig ave., 20", phone: "0124934557", active: true },
  ])
  const [uniDialogOpen, setUniDialogOpen] = useState(false)
  const [editingUni, setEditingUni] = useState<University | null>(null)
  const [uniForm, setUniForm] = useState<University>({ id: "", nameAz: "", nameEn: "", addressAz: "", addressEn: "", phone: "", active: true })

  // Workplaces State
  const [workplaces, setWorkplaces] = useState<Workplace[]>([
    { id: "1", nameAz: "AMEA Riyaziyyat və Mexanika İnstitutu", nameEn: "ANAS Institute of Mathematics and Mechanics", shortNameAz: "RMİ", shortNameEn: "IMM", addressAz: "Bakı, B.Vahabzadə küç., 9", addressEn: "Baku, B.Vahabzade str., 9", managerAz: "Akademik Misir Mərdanov", managerEn: "Academician Misir Mardanov", subordination: "AMEA", website: "imm.az", subordinationStrAze: "AMEA-ya tabe", subordinationStrEng: "Subordinate to ANAS", phone: "0125393170", active: true, scienceFields: [] },
  ])
  const [workDialogOpen, setWorkDialogOpen] = useState(false)
  const [editingWork, setEditingWork] = useState<Workplace | null>(null)
  const [workForm, setWorkForm] = useState<Workplace>({ id: "", nameAz: "", nameEn: "", shortNameAz: "", shortNameEn: "", addressAz: "", addressEn: "", managerAz: "", managerEn: "", subordination: "", website: "", subordinationStrAze: "", subordinationStrEng: "", phone: "", active: true, scienceFields: [] })

  // Science Fields State
  const [scienceFields, setScienceFields] = useState<ScienceField[]>([
    { id: "1", nameAz: "Riyaziyyat", nameEn: "Mathematics", active: true },
    { id: "2", nameAz: "Fizika", nameEn: "Physics", active: true },
    { id: "3", nameAz: "Kimya", nameEn: "Chemistry", active: true },
    { id: "4", nameAz: "Biologiya", nameEn: "Biology", active: true },
    { id: "5", nameAz: "İnformatika", nameEn: "Computer Science", active: true },
  ])
  const [fieldDialogOpen, setFieldDialogOpen] = useState(false)
  const [editingField, setEditingField] = useState<ScienceField | null>(null)
  const [fieldForm, setFieldForm] = useState<ScienceField>({ id: "", nameAz: "", nameEn: "", active: true })

  // Science Directions State
  const [scienceDirections, setScienceDirections] = useState<ScienceDirection[]>([
    { id: "1", branch: "Riyaziyyat", code: "01", nameAz: "Riyazi analiz", nameEn: "Mathematical Analysis", active: true },
    { id: "2", branch: "Riyaziyyat", code: "02", nameAz: "Diferensial tənliklər", nameEn: "Differential Equations", active: true },
    { id: "3", branch: "Fizika", code: "01", nameAz: "Nəzəri fizika", nameEn: "Theoretical Physics", active: true },
  ])
  const [dirDialogOpen, setDirDialogOpen] = useState(false)
  const [editingDir, setEditingDir] = useState<ScienceDirection | null>(null)
  const [dirForm, setDirForm] = useState<ScienceDirection>({ id: "", branch: "", code: "", nameAz: "", nameEn: "", active: true })

  // Science Specializations State
  const [scienceSpecs, setScienceSpecs] = useState<ScienceSpecialization[]>([
    { id: "1", profile: "Riyazi analiz", code: "1201.01", nameAz: "Riyazi analiz", nameEn: "Mathematical Analysis", active: true },
    { id: "2", profile: "Diferensial tənliklər", code: "1202.01", nameAz: "Adi diferensial tənliklər", nameEn: "Ordinary Differential Equations", active: true },
  ])
  const [specDialogOpen, setSpecDialogOpen] = useState(false)
  const [editingSpec, setEditingSpec] = useState<ScienceSpecialization | null>(null)
  const [specForm, setSpecForm] = useState<ScienceSpecialization>({ id: "", profile: "", code: "", nameAz: "", nameEn: "", active: true })

  // Organization Categories State
  const [orgCategories, setOrgCategories] = useState<OrgCategory[]>([
    { id: "1", nameAz: "Dövlət təşkilatı", nameEn: "State Organization", active: true },
    { id: "2", nameAz: "Özəl şirkət", nameEn: "Private Company", active: true },
    { id: "3", nameAz: "Qeyri-hökumət təşkilatı", nameEn: "Non-Governmental Organization", active: true },
  ])
  const [orgDialogOpen, setOrgDialogOpen] = useState(false)
  const [editingOrg, setEditingOrg] = useState<OrgCategory | null>(null)
  const [orgForm, setOrgForm] = useState<OrgCategory>({ id: "", nameAz: "", nameEn: "", active: true })

  // Trip Norms State
  const [tripNorms, setTripNorms] = useState<TripNorm[]>([
    { id: "1", country: "Türkiyə", nameAz: "Türkiyəyə ezamiyyət", nameEn: "Business Trip to Turkey", currency: "USD", dailyExpense: "150" },
    { id: "2", country: "Rusiya", nameAz: "Rusiyaya ezamiyyət", nameEn: "Business Trip to Russia", currency: "USD", dailyExpense: "180" },
    { id: "3", country: "Almaniya", nameAz: "Almaniyaya ezamiyyət", nameEn: "Business Trip to Germany", currency: "EUR", dailyExpense: "200" },
  ])
  const [tripDialogOpen, setTripDialogOpen] = useState(false)
  const [editingTrip, setEditingTrip] = useState<TripNorm | null>(null)
  const [tripForm, setTripForm] = useState<TripNorm>({ id: "", country: "", nameAz: "", nameEn: "", currency: "", dailyExpense: "" })

  // ============ COUNTRY CRUD ============
  const openAddCountry = () => { setEditingCountry(null); setCountryForm({ id: "", code: "", nameAz: "", nameEn: "", active: true }); setCountryDialogOpen(true) }
  const openEditCountry = (c: Country) => { setEditingCountry(c); setCountryForm(c); setCountryDialogOpen(true) }
  const saveCountry = () => {
    if (editingCountry) {
      setCountries(countries.map(c => c.id === editingCountry.id ? { ...countryForm, id: editingCountry.id } : c))
    } else {
      setCountries([...countries, { ...countryForm, id: Date.now().toString() }])
    }
    setCountryDialogOpen(false)
  }

  // ============ UNIVERSITY CRUD ============
  const openAddUni = () => { setEditingUni(null); setUniForm({ id: "", nameAz: "", nameEn: "", addressAz: "", addressEn: "", phone: "", active: true }); setUniDialogOpen(true) }
  const openEditUni = (u: University) => { setEditingUni(u); setUniForm(u); setUniDialogOpen(true) }
  const saveUni = () => {
    if (editingUni) {
      setUniversities(universities.map(u => u.id === editingUni.id ? { ...uniForm, id: editingUni.id } : u))
    } else {
      setUniversities([...universities, { ...uniForm, id: Date.now().toString() }])
    }
    setUniDialogOpen(false)
  }

  // ============ WORKPLACE CRUD ============
  const openAddWork = () => { setEditingWork(null); setWorkForm({ id: "", nameAz: "", nameEn: "", shortNameAz: "", shortNameEn: "", addressAz: "", addressEn: "", managerAz: "", managerEn: "", subordination: "", website: "", subordinationStrAze: "", subordinationStrEng: "", phone: "", active: true, scienceFields: [] }); setWorkDialogOpen(true) }
  const openEditWork = (w: Workplace) => { setEditingWork(w); setWorkForm(w); setWorkDialogOpen(true) }
  const saveWork = () => {
    if (editingWork) {
      setWorkplaces(workplaces.map(w => w.id === editingWork.id ? { ...workForm, id: editingWork.id } : w))
    } else {
      setWorkplaces([...workplaces, { ...workForm, id: Date.now().toString() }])
    }
    setWorkDialogOpen(false)
  }

  // ============ SCIENCE FIELD CRUD ============
  const openAddField = () => { setEditingField(null); setFieldForm({ id: "", nameAz: "", nameEn: "", active: true }); setFieldDialogOpen(true) }
  const openEditField = (f: ScienceField) => { setEditingField(f); setFieldForm(f); setFieldDialogOpen(true) }
  const saveField = () => {
    if (editingField) {
      setScienceFields(scienceFields.map(f => f.id === editingField.id ? { ...fieldForm, id: editingField.id } : f))
    } else {
      setScienceFields([...scienceFields, { ...fieldForm, id: Date.now().toString() }])
    }
    setFieldDialogOpen(false)
  }

  // ============ SCIENCE DIRECTION CRUD ============
  const openAddDir = () => { setEditingDir(null); setDirForm({ id: "", branch: "", code: "", nameAz: "", nameEn: "", active: true }); setDirDialogOpen(true) }
  const openEditDir = (d: ScienceDirection) => { setEditingDir(d); setDirForm(d); setDirDialogOpen(true) }
  const saveDir = () => {
    if (editingDir) {
      setScienceDirections(scienceDirections.map(d => d.id === editingDir.id ? { ...dirForm, id: editingDir.id } : d))
    } else {
      setScienceDirections([...scienceDirections, { ...dirForm, id: Date.now().toString() }])
    }
    setDirDialogOpen(false)
  }

  // ============ SCIENCE SPEC CRUD ============
  const openAddSpec = () => { setEditingSpec(null); setSpecForm({ id: "", profile: "", code: "", nameAz: "", nameEn: "", active: true }); setSpecDialogOpen(true) }
  const openEditSpec = (s: ScienceSpecialization) => { setEditingSpec(s); setSpecForm(s); setSpecDialogOpen(true) }
  const saveSpec = () => {
    if (editingSpec) {
      setScienceSpecs(scienceSpecs.map(s => s.id === editingSpec.id ? { ...specForm, id: editingSpec.id } : s))
    } else {
      setScienceSpecs([...scienceSpecs, { ...specForm, id: Date.now().toString() }])
    }
    setSpecDialogOpen(false)
  }

  // ============ ORG CATEGORY CRUD ============
  const openAddOrg = () => { setEditingOrg(null); setOrgForm({ id: "", nameAz: "", nameEn: "", active: true }); setOrgDialogOpen(true) }
  const openEditOrg = (o: OrgCategory) => { setEditingOrg(o); setOrgForm(o); setOrgDialogOpen(true) }
  const saveOrg = () => {
    if (editingOrg) {
      setOrgCategories(orgCategories.map(o => o.id === editingOrg.id ? { ...orgForm, id: editingOrg.id } : o))
    } else {
      setOrgCategories([...orgCategories, { ...orgForm, id: Date.now().toString() }])
    }
    setOrgDialogOpen(false)
  }

  // ============ TRIP NORM CRUD ============
  const openAddTrip = () => { setEditingTrip(null); setTripForm({ id: "", country: "", nameAz: "", nameEn: "", currency: "", dailyExpense: "" }); setTripDialogOpen(true) }
  const openEditTrip = (t: TripNorm) => { setEditingTrip(t); setTripForm(t); setTripDialogOpen(true) }
  const saveTrip = () => {
    if (editingTrip) {
      setTripNorms(tripNorms.map(t => t.id === editingTrip.id ? { ...tripForm, id: editingTrip.id } : t))
    } else {
      setTripNorms([...tripNorms, { ...tripForm, id: Date.now().toString() }])
    }
    setTripDialogOpen(false)
  }

  const tabs = [
    { id: "countries", label: "Ölkələr", icon: Globe },
    { id: "universities", label: "Ali təhsil müəssisələri", icon: Building2 },
    { id: "workplaces", label: "İş yerləri", icon: Briefcase },
    { id: "fields", label: "Elm sahələri", icon: FlaskConical },
    { id: "directions", label: "Elm istiqamətləri", icon: GitBranch },
    { id: "specs", label: "Elm ixtisasları", icon: Award },
    { id: "orgCategories", label: "Qurumun kateqoriyaları", icon: Building },
    { id: "tripNorms", label: "Ezamiyyət normaları", icon: Plane },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Məlumat kitabçaları</h1>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Axtar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="overflow-x-auto">
          <TabsList className="inline-flex min-w-max">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* COUNTRIES TAB */}
        <TabsContent value="countries" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Ölkələr</CardTitle>
              <Button size="sm" onClick={openAddCountry}>
                <Plus className="h-4 w-4 mr-2" />
                Əlavə et
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kod</TableHead>
                    <TableHead>Adı (AZE)</TableHead>
                    <TableHead>Adı (ENG)</TableHead>
                    <TableHead>Aktiv</TableHead>
                    <TableHead className="text-right">Əməliyyatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {countries.filter(c => c.nameAz.toLowerCase().includes(searchTerm.toLowerCase())).map((country) => (
                    <TableRow key={country.id}>
                      <TableCell className="font-medium">{country.code}</TableCell>
                      <TableCell>{country.nameAz}</TableCell>
                      <TableCell>{country.nameEn}</TableCell>
                      <TableCell>
                        <Badge variant={country.active ? "default" : "secondary"}>
                          {country.active ? "Aktiv" : "Deaktiv"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openEditCountry(country)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* UNIVERSITIES TAB */}
        <TabsContent value="universities" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Ali təhsil müəssisələri</CardTitle>
              <Button size="sm" onClick={openAddUni}>
                <Plus className="h-4 w-4 mr-2" />
                Əlavə et
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Adı (AZE)</TableHead>
                    <TableHead>Adı (ENG)</TableHead>
                    <TableHead>Ünvan (AZE)</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Aktiv</TableHead>
                    <TableHead className="text-right">Əməliyyatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {universities.filter(u => u.nameAz.toLowerCase().includes(searchTerm.toLowerCase())).map((uni) => (
                    <TableRow key={uni.id}>
                      <TableCell className="font-medium">{uni.nameAz}</TableCell>
                      <TableCell>{uni.nameEn}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{uni.addressAz}</TableCell>
                      <TableCell>{uni.phone}</TableCell>
                      <TableCell>
                        <Badge variant={uni.active ? "default" : "secondary"}>
                          {uni.active ? "Aktiv" : "Deaktiv"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openEditUni(uni)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* WORKPLACES TAB */}
        <TabsContent value="workplaces" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>İş yerləri</CardTitle>
              <Button size="sm" onClick={openAddWork}>
                <Plus className="h-4 w-4 mr-2" />
                Əlavə et
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Adı (AZE)</TableHead>
                    <TableHead>Adı (ENG)</TableHead>
                    <TableHead>Qısa ad (AZE)</TableHead>
                    <TableHead>Qısa ad (ENG)</TableHead>
                    <TableHead>Aktiv</TableHead>
                    <TableHead className="text-right">Əməliyyatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workplaces.filter(w => w.nameAz.toLowerCase().includes(searchTerm.toLowerCase())).map((work) => (
                    <TableRow key={work.id}>
                      <TableCell className="font-medium">{work.nameAz}</TableCell>
                      <TableCell>{work.nameEn}</TableCell>
                      <TableCell>{work.shortNameAz}</TableCell>
                      <TableCell>{work.shortNameEn}</TableCell>
                      <TableCell>
                        <Badge variant={work.active ? "default" : "secondary"}>
                          {work.active ? "Aktiv" : "Deaktiv"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openEditWork(work)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SCIENCE FIELDS TAB */}
        <TabsContent value="fields" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Elm sahələri</CardTitle>
              <Button size="sm" onClick={openAddField}>
                <Plus className="h-4 w-4 mr-2" />
                Əlavə et
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Adı (AZE)</TableHead>
                    <TableHead>Adı (ENG)</TableHead>
                    <TableHead>Aktiv</TableHead>
                    <TableHead className="text-right">Əməliyyatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scienceFields.filter(f => f.nameAz.toLowerCase().includes(searchTerm.toLowerCase())).map((field) => (
                    <TableRow key={field.id}>
                      <TableCell className="font-medium">{field.nameAz}</TableCell>
                      <TableCell>{field.nameEn}</TableCell>
                      <TableCell>
                        <Badge variant={field.active ? "default" : "secondary"}>
                          {field.active ? "Aktiv" : "Deaktiv"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openEditField(field)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SCIENCE DIRECTIONS TAB */}
        <TabsContent value="directions" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Elm istiqamətləri</CardTitle>
              <Button size="sm" onClick={openAddDir}>
                <Plus className="h-4 w-4 mr-2" />
                Əlavə et
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Branch</TableHead>
                    <TableHead>Kod</TableHead>
                    <TableHead>Ad (AZE)</TableHead>
                    <TableHead>Ad (ENG)</TableHead>
                    <TableHead>Aktiv</TableHead>
                    <TableHead className="text-right">Əməliyyatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scienceDirections.filter(d => d.nameAz.toLowerCase().includes(searchTerm.toLowerCase())).map((dir) => (
                    <TableRow key={dir.id}>
                      <TableCell>{dir.branch}</TableCell>
                      <TableCell className="font-medium">{dir.code}</TableCell>
                      <TableCell>{dir.nameAz}</TableCell>
                      <TableCell>{dir.nameEn}</TableCell>
                      <TableCell>
                        <Badge variant={dir.active ? "default" : "secondary"}>
                          {dir.active ? "Aktiv" : "Deaktiv"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openEditDir(dir)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SCIENCE SPECIALIZATIONS TAB */}
        <TabsContent value="specs" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Elm ixtisasları</CardTitle>
              <Button size="sm" onClick={openAddSpec}>
                <Plus className="h-4 w-4 mr-2" />
                Əlavə et
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Profil</TableHead>
                    <TableHead>Kod</TableHead>
                    <TableHead>Ad (AZE)</TableHead>
                    <TableHead>Ad (ENG)</TableHead>
                    <TableHead>Aktiv</TableHead>
                    <TableHead className="text-right">Əməliyyatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scienceSpecs.filter(s => s.nameAz.toLowerCase().includes(searchTerm.toLowerCase())).map((spec) => (
                    <TableRow key={spec.id}>
                      <TableCell>{spec.profile}</TableCell>
                      <TableCell className="font-medium">{spec.code}</TableCell>
                      <TableCell>{spec.nameAz}</TableCell>
                      <TableCell>{spec.nameEn}</TableCell>
                      <TableCell>
                        <Badge variant={spec.active ? "default" : "secondary"}>
                          {spec.active ? "Aktiv" : "Deaktiv"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openEditSpec(spec)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ORG CATEGORIES TAB */}
        <TabsContent value="orgCategories" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Qurumun kateqoriyaları</CardTitle>
              <Button size="sm" onClick={openAddOrg}>
                <Plus className="h-4 w-4 mr-2" />
                Əlavə et
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ad (AZE)</TableHead>
                    <TableHead>Ad (ENG)</TableHead>
                    <TableHead>Aktiv</TableHead>
                    <TableHead className="text-right">Əməliyyatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orgCategories.filter(o => o.nameAz.toLowerCase().includes(searchTerm.toLowerCase())).map((org) => (
                    <TableRow key={org.id}>
                      <TableCell className="font-medium">{org.nameAz}</TableCell>
                      <TableCell>{org.nameEn}</TableCell>
                      <TableCell>
                        <Badge variant={org.active ? "default" : "secondary"}>
                          {org.active ? "Aktiv" : "Deaktiv"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openEditOrg(org)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TRIP NORMS TAB */}
        <TabsContent value="tripNorms" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Ezamiyyət normaları</CardTitle>
              <Button size="sm" onClick={openAddTrip}>
                <Plus className="h-4 w-4 mr-2" />
                Əlavə et
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ölkə</TableHead>
                    <TableHead>Adı (AZE)</TableHead>
                    <TableHead>Adı (ENG)</TableHead>
                    <TableHead>Valyuta növü</TableHead>
                    <TableHead>Günlük xərc</TableHead>
                    <TableHead className="text-right">Əməliyyatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tripNorms.filter(t => t.nameAz.toLowerCase().includes(searchTerm.toLowerCase())).map((trip) => (
                    <TableRow key={trip.id}>
                      <TableCell>{trip.country}</TableCell>
                      <TableCell className="font-medium">{trip.nameAz}</TableCell>
                      <TableCell>{trip.nameEn}</TableCell>
                      <TableCell>{trip.currency}</TableCell>
                      <TableCell>{trip.dailyExpense}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openEditTrip(trip)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ============ DIALOGS ============ */}

      {/* Country Dialog */}
      <Dialog open={countryDialogOpen} onOpenChange={setCountryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCountry ? "Ölkəni redaktə et" : "Yeni ölkə əlavə et"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Kod</label>
              <Input value={countryForm.code} onChange={(e) => setCountryForm({ ...countryForm, code: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Adı (AZE)</label>
              <Input value={countryForm.nameAz} onChange={(e) => setCountryForm({ ...countryForm, nameAz: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Adı (ENG)</label>
              <Input value={countryForm.nameEn} onChange={(e) => setCountryForm({ ...countryForm, nameEn: e.target.value })} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked={countryForm.active} onCheckedChange={(checked) => setCountryForm({ ...countryForm, active: !!checked })} />
              <label className="text-sm">Aktiv</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCountryDialogOpen(false)}>İmtina</Button>
            <Button onClick={saveCountry}>Təsdiq et</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* University Dialog */}
      <Dialog open={uniDialogOpen} onOpenChange={setUniDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingUni ? "Müəssisəni redaktə et" : "Yeni müəssisə əlavə et"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div>
              <label className="text-sm font-medium">Adı (AZE)</label>
              <Input value={uniForm.nameAz} onChange={(e) => setUniForm({ ...uniForm, nameAz: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Adı (ENG)</label>
              <Input value={uniForm.nameEn} onChange={(e) => setUniForm({ ...uniForm, nameEn: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Ünvan (AZE)</label>
              <Input value={uniForm.addressAz} onChange={(e) => setUniForm({ ...uniForm, addressAz: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Ünvan (ENG)</label>
              <Input value={uniForm.addressEn} onChange={(e) => setUniForm({ ...uniForm, addressEn: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Telefon</label>
              <Input value={uniForm.phone} onChange={(e) => setUniForm({ ...uniForm, phone: e.target.value })} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked={uniForm.active} onCheckedChange={(checked) => setUniForm({ ...uniForm, active: !!checked })} />
              <label className="text-sm">Aktiv</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUniDialogOpen(false)}>İmtina</Button>
            <Button onClick={saveUni}>Təsdiq et</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Workplace Dialog */}
      <Dialog open={workDialogOpen} onOpenChange={setWorkDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingWork ? "İş yerini redaktə et" : "Yeni iş yeri əlavə et"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
            <div>
              <label className="text-sm font-medium">Adı (AZE)</label>
              <Input value={workForm.nameAz} onChange={(e) => setWorkForm({ ...workForm, nameAz: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Adı (ENG)</label>
              <Input value={workForm.nameEn} onChange={(e) => setWorkForm({ ...workForm, nameEn: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Qısa ad (AZE)</label>
              <Input value={workForm.shortNameAz} onChange={(e) => setWorkForm({ ...workForm, shortNameAz: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Qısa ad (ENG)</label>
              <Input value={workForm.shortNameEn} onChange={(e) => setWorkForm({ ...workForm, shortNameEn: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Ünvan (AZE)</label>
              <Input value={workForm.addressAz} onChange={(e) => setWorkForm({ ...workForm, addressAz: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Ünvan (ENG)</label>
              <Input value={workForm.addressEn} onChange={(e) => setWorkForm({ ...workForm, addressEn: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Menecer (AZE)</label>
              <Input value={workForm.managerAz} onChange={(e) => setWorkForm({ ...workForm, managerAz: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Menecer (ENG)</label>
              <Input value={workForm.managerEn} onChange={(e) => setWorkForm({ ...workForm, managerEn: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Subordination</label>
              <Input value={workForm.subordination} onChange={(e) => setWorkForm({ ...workForm, subordination: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Website</label>
              <Input value={workForm.website} onChange={(e) => setWorkForm({ ...workForm, website: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">SubordinationStrAze</label>
              <Input value={workForm.subordinationStrAze} onChange={(e) => setWorkForm({ ...workForm, subordinationStrAze: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">SubordinationStrEng</label>
              <Input value={workForm.subordinationStrEng} onChange={(e) => setWorkForm({ ...workForm, subordinationStrEng: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Telefon (max 10 rəqəm)</label>
              <Input value={workForm.phone} onChange={(e) => setWorkForm({ ...workForm, phone: e.target.value.slice(0, 10) })} maxLength={10} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked={workForm.active} onCheckedChange={(checked) => setWorkForm({ ...workForm, active: !!checked })} />
              <label className="text-sm">Aktiv</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWorkDialogOpen(false)}>İmtina</Button>
            <Button onClick={saveWork}>Təsdiq et</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Science Field Dialog */}
      <Dialog open={fieldDialogOpen} onOpenChange={setFieldDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingField ? "Elm sahəsini redaktə et" : "Yeni elm sahəsi əlavə et"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Adı (AZE)</label>
              <Input value={fieldForm.nameAz} onChange={(e) => setFieldForm({ ...fieldForm, nameAz: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Adı (ENG)</label>
              <Input value={fieldForm.nameEn} onChange={(e) => setFieldForm({ ...fieldForm, nameEn: e.target.value })} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked={fieldForm.active} onCheckedChange={(checked) => setFieldForm({ ...fieldForm, active: !!checked })} />
              <label className="text-sm">Aktiv</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFieldDialogOpen(false)}>İmtina</Button>
            <Button onClick={saveField}>Təsdiq et</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Science Direction Dialog */}
      <Dialog open={dirDialogOpen} onOpenChange={setDirDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingDir ? "Elm istiqamətini redaktə et" : "Yeni elm istiqaməti əlavə et"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Branch</label>
              <Select value={dirForm.branch} onValueChange={(v) => setDirForm({ ...dirForm, branch: v })}>
                <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                <SelectContent>
                  {scienceFields.map((f) => (
                    <SelectItem key={f.id} value={f.nameAz}>{f.nameAz}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Kod</label>
              <Input value={dirForm.code} onChange={(e) => setDirForm({ ...dirForm, code: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Ad (AZE)</label>
              <Input value={dirForm.nameAz} onChange={(e) => setDirForm({ ...dirForm, nameAz: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Ad (ENG)</label>
              <Input value={dirForm.nameEn} onChange={(e) => setDirForm({ ...dirForm, nameEn: e.target.value })} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked={dirForm.active} onCheckedChange={(checked) => setDirForm({ ...dirForm, active: !!checked })} />
              <label className="text-sm">Aktiv</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDirDialogOpen(false)}>İmtina</Button>
            <Button onClick={saveDir}>Təsdiq et</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Science Specialization Dialog */}
      <Dialog open={specDialogOpen} onOpenChange={setSpecDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSpec ? "Elm ixtisasını redaktə et" : "Yeni elm ixtisası əlavə et"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Profil</label>
              <Select value={specForm.profile} onValueChange={(v) => setSpecForm({ ...specForm, profile: v })}>
                <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                <SelectContent>
                  {scienceDirections.map((d) => (
                    <SelectItem key={d.id} value={d.nameAz}>{d.nameAz}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Kod</label>
              <Input value={specForm.code} onChange={(e) => setSpecForm({ ...specForm, code: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Ad (AZE)</label>
              <Input value={specForm.nameAz} onChange={(e) => setSpecForm({ ...specForm, nameAz: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Ad (ENG)</label>
              <Input value={specForm.nameEn} onChange={(e) => setSpecForm({ ...specForm, nameEn: e.target.value })} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked={specForm.active} onCheckedChange={(checked) => setSpecForm({ ...specForm, active: !!checked })} />
              <label className="text-sm">Aktiv</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSpecDialogOpen(false)}>İmtina</Button>
            <Button onClick={saveSpec}>Təsdiq et</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Org Category Dialog */}
      <Dialog open={orgDialogOpen} onOpenChange={setOrgDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingOrg ? "Kateqoriyanı redaktə et" : "Yeni kateqoriya əlavə et"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Ad (AZE)</label>
              <Input value={orgForm.nameAz} onChange={(e) => setOrgForm({ ...orgForm, nameAz: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Ad (ENG)</label>
              <Input value={orgForm.nameEn} onChange={(e) => setOrgForm({ ...orgForm, nameEn: e.target.value })} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked={orgForm.active} onCheckedChange={(checked) => setOrgForm({ ...orgForm, active: !!checked })} />
              <label className="text-sm">Aktiv</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOrgDialogOpen(false)}>İmtina</Button>
            <Button onClick={saveOrg}>Təsdiq et</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Trip Norm Dialog */}
      <Dialog open={tripDialogOpen} onOpenChange={setTripDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTrip ? "Ezamiyyət normasını redaktə et" : "Yeni ezamiyyət norması əlavə et"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Ölkə</label>
              <Select value={tripForm.country} onValueChange={(v) => setTripForm({ ...tripForm, country: v })}>
                <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.id} value={c.nameAz}>{c.nameAz}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Adı (AZE)</label>
              <Input value={tripForm.nameAz} onChange={(e) => setTripForm({ ...tripForm, nameAz: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Adı (ENG)</label>
              <Input value={tripForm.nameEn} onChange={(e) => setTripForm({ ...tripForm, nameEn: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Valyuta növü</label>
              <Select value={tripForm.currency} onValueChange={(v) => setTripForm({ ...tripForm, currency: v })}>
                <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="AZN">AZN</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="RUB">RUB</SelectItem>
                  <SelectItem value="TRY">TRY</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Günlük xərc</label>
              <Input value={tripForm.dailyExpense} onChange={(e) => setTripForm({ ...tripForm, dailyExpense: e.target.value })} type="number" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTripDialogOpen(false)}>İmtina</Button>
            <Button onClick={saveTrip}>Təsdiq et</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
