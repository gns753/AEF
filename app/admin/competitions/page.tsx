"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Plus, Pencil, FileText, MessageSquare, Upload } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface Competition {
  id: string
  category: string
  nameAz: string
  nameEn: string
  descriptionAz: string
  descriptionEn: string
  detailLink: string
  buttonLink: string
  statusAz: string
  statusEn: string
  code: string
  startDate: string
  endDate: string
  minSalary: string
  language: string
  totalBudget: string
  maxProjectBudget: string
  maxMonthlySalary: string
  showInList: boolean
  projectType: string
  coLeaderType: string
  projectCategory: string
  projectCharacter: string
  applicantStatus: string
  duration: string
  maxParticipants: string
  over35Restriction: boolean
  logo: string
  hasApplications: boolean
}

export default function CompetitionsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [competitions, setCompetitions] = useState<Competition[]>([
    {
      id: "1",
      category: "Fundamental",
      nameAz: "Fundamental Elmi Tədqiqatlar - 2024",
      nameEn: "Fundamental Scientific Research - 2024",
      descriptionAz: "Fundamental elmi tədqiqatlar üçün qrant müsabiqəsi",
      descriptionEn: "Grant competition for fundamental scientific research",
      detailLink: "https://aef.gov.az/grants/2024",
      buttonLink: "https://aef.gov.az/apply",
      statusAz: "Aktiv",
      statusEn: "Active",
      code: "FET-2024",
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      minSalary: "500",
      language: "Azərbaycanca",
      totalBudget: "5000000",
      maxProjectBudget: "100000",
      maxMonthlySalary: "3000",
      showInList: true,
      projectType: "Fərdi",
      coLeaderType: "Yerli",
      projectCategory: "Ölkədaxili",
      projectCharacter: "Bir elm sahəsi üzrə",
      applicantStatus: "Alim",
      duration: "24",
      maxParticipants: "10",
      over35Restriction: false,
      logo: "",
      hasApplications: true,
    },
    {
      id: "2",
      category: "Tətbiqi",
      nameAz: "Tətbiqi Tədqiqatlar Qrantı - 2024",
      nameEn: "Applied Research Grant - 2024",
      descriptionAz: "Tətbiqi elmi layihələr üçün maliyyə dəstəyi",
      descriptionEn: "Financial support for applied research projects",
      detailLink: "https://aef.gov.az/grants/applied-2024",
      buttonLink: "https://aef.gov.az/apply-applied",
      statusAz: "Gözləmədə",
      statusEn: "Pending",
      code: "TET-2024",
      startDate: "2024-03-01",
      endDate: "2024-09-30",
      minSalary: "600",
      language: "Azərbaycanca",
      totalBudget: "3000000",
      maxProjectBudget: "80000",
      maxMonthlySalary: "2500",
      showInList: true,
      projectType: "Müştərək",
      coLeaderType: "Xarici",
      projectCategory: "Beynəlxalq",
      projectCharacter: "Elm sahələrinin qovşağında",
      applicantStatus: "Müvəqqəti yaradıcı kollektiv",
      duration: "18",
      maxParticipants: "15",
      over35Restriction: true,
      logo: "",
      hasApplications: false,
    },
  ])

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Competition | null>(null)
  const [form, setForm] = useState<Competition>({
    id: "",
    category: "",
    nameAz: "",
    nameEn: "",
    descriptionAz: "",
    descriptionEn: "",
    detailLink: "",
    buttonLink: "",
    statusAz: "",
    statusEn: "",
    code: "",
    startDate: "",
    endDate: "",
    minSalary: "",
    language: "",
    totalBudget: "",
    maxProjectBudget: "",
    maxMonthlySalary: "",
    showInList: true,
    projectType: "",
    coLeaderType: "",
    projectCategory: "",
    projectCharacter: "",
    applicantStatus: "",
    duration: "",
    maxParticipants: "",
    over35Restriction: false,
    logo: "",
    hasApplications: false,
  })

  // Message Dialog
  const [messageDialogOpen, setMessageDialogOpen] = useState(false)
  const [messageForm, setMessageForm] = useState({
    title: "",
    content: "",
    startDate: "",
    endDate: "",
  })
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null)

  const openAdd = () => {
    setEditing(null)
    setForm({
      id: "",
      category: "",
      nameAz: "",
      nameEn: "",
      descriptionAz: "",
      descriptionEn: "",
      detailLink: "",
      buttonLink: "",
      statusAz: "",
      statusEn: "",
      code: "",
      startDate: "",
      endDate: "",
      minSalary: "",
      language: "",
      totalBudget: "",
      maxProjectBudget: "",
      maxMonthlySalary: "",
      showInList: true,
      projectType: "",
      coLeaderType: "",
      projectCategory: "",
      projectCharacter: "",
      applicantStatus: "",
      duration: "",
      maxParticipants: "",
      over35Restriction: false,
      logo: "",
      hasApplications: false,
    })
    setDialogOpen(true)
  }

  const openEdit = (comp: Competition) => {
    setEditing(comp)
    setForm(comp)
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (editing) {
      setCompetitions(competitions.map(c => c.id === editing.id ? { ...form, id: editing.id } : c))
    } else {
      setCompetitions([...competitions, { ...form, id: Date.now().toString() }])
    }
    setDialogOpen(false)
  }

  const openMessage = (comp: Competition) => {
    setSelectedCompetition(comp)
    setMessageForm({ title: "", content: "", startDate: "", endDate: "" })
    setMessageDialogOpen(true)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "image/jpeg") {
      const reader = new FileReader()
      reader.onloadend = () => {
        setForm({ ...form, logo: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const categories = ["Fundamental", "Tətbiqi", "İnnovasiya", "Gənc alimlər"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Elan olunmuş qrant müsabiqələri</h1>
        <Button onClick={openAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Yeni müsabiqə əlavə et
        </Button>
      </div>

      {/* Competitions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Müsabiqələr siyahısı</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kateqoriya</TableHead>
                  <TableHead>Müsabiqənin adı</TableHead>
                  <TableHead>Kod</TableHead>
                  <TableHead>Başlama tarixi</TableHead>
                  <TableHead>Son tarix</TableHead>
                  <TableHead>Ümumi büdcə (AZN)</TableHead>
                  <TableHead>Max layihə büdcəsi</TableHead>
                  <TableHead>Max aylıq əmək haqqı</TableHead>
                  <TableHead>Max iştirakçı</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitions.map((comp) => (
                  <TableRow key={comp.id}>
                    <TableCell>
                      <Badge variant="outline">{comp.category}</Badge>
                    </TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">{comp.nameAz}</TableCell>
                    <TableCell>{comp.code}</TableCell>
                    <TableCell>{comp.startDate}</TableCell>
                    <TableCell>{comp.endDate}</TableCell>
                    <TableCell>{parseInt(comp.totalBudget).toLocaleString()}</TableCell>
                    <TableCell>{parseInt(comp.maxProjectBudget).toLocaleString()}</TableCell>
                    <TableCell>{parseInt(comp.maxMonthlySalary).toLocaleString()}</TableCell>
                    <TableCell>{comp.maxParticipants}</TableCell>
                    <TableCell>
                      <Badge variant={comp.statusAz === "Aktiv" ? "default" : "secondary"}>
                        {comp.statusAz}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(comp)} title="Redaktə et">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => window.open(comp.detailLink, '_blank')} title="Ətraflı məlumat">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openMessage(comp)}
                          disabled={!comp.hasApplications}
                          title="Layihə rəhbərinə mesaj"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Competition Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Müsabiqəni redaktə et" : "Yeni müsabiqə əlavə et"}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="text-sm font-medium">Kateqoriya seçimi</label>
              <div className="flex flex-wrap gap-4 mt-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2">
                    <Checkbox
                      checked={form.category === cat}
                      onCheckedChange={() => setForm({ ...form, category: cat })}
                    />
                    <span className="text-sm">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Azərbaycan dilində adı</label>
                <Input value={form.nameAz} onChange={(e) => setForm({ ...form, nameAz: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Title on English</label>
                <Input value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Müsabiqənin təsviri (Azərbaycanca)</label>
                <Textarea value={form.descriptionAz} onChange={(e) => setForm({ ...form, descriptionAz: e.target.value })} rows={3} />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Müsabiqənin təsviri (İngiliscə)</label>
                <Textarea value={form.descriptionEn} onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })} rows={3} />
              </div>
              <div>
                <label className="text-sm font-medium">Ətraflı məlumat (elana link)</label>
                <Input value={form.detailLink} onChange={(e) => setForm({ ...form, detailLink: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Ətraflı məlumat (düyməyə link)</label>
                <Input value={form.buttonLink} onChange={(e) => setForm({ ...form, buttonLink: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Müsabiqənin statusu (Azərbaycanca)</label>
                <Input value={form.statusAz} onChange={(e) => setForm({ ...form, statusAz: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Müsabiqənin statusu (İngiliscə)</label>
                <Input value={form.statusEn} onChange={(e) => setForm({ ...form, statusEn: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Kod</label>
                <Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Başlama tarixi</label>
                <Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Bitmə tarixi</label>
                <Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Aylıq minimum əmək haqqı</label>
                <Input type="number" value={form.minSalary} onChange={(e) => setForm({ ...form, minSalary: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Müsabiqə dilini seçin</label>
                <Select value={form.language} onValueChange={(v) => setForm({ ...form, language: v })}>
                  <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Azərbaycanca">Azərbaycanca</SelectItem>
                    <SelectItem value="İngiliscə">İngiliscə</SelectItem>
                    <SelectItem value="Rusca">Rusca</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Müsabiqənin ümumi büdcəsi</label>
                <Input type="number" value={form.totalBudget} onChange={(e) => setForm({ ...form, totalBudget: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Layihənin maksimum büdcəsi</label>
                <Input type="number" value={form.maxProjectBudget} onChange={(e) => setForm({ ...form, maxProjectBudget: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Aylıq maksimum əmək haqqı</label>
                <Input type="number" value={form.maxMonthlySalary} onChange={(e) => setForm({ ...form, maxMonthlySalary: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Müsabiqələr siyahısında göstərilməsi</label>
                <Select value={form.showInList ? "show" : "hide"} onValueChange={(v) => setForm({ ...form, showInList: v === "show" })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="show">Göstərilsin</SelectItem>
                    <SelectItem value="hide">Göstərilməsin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Special Conditions */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Xüsusi şərtlər</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Layihənin tipi</label>
                  <Select value={form.projectType} onValueChange={(v) => setForm({ ...form, projectType: v })}>
                    <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fərdi">Fərdi</SelectItem>
                      <SelectItem value="Müştərək">Müştərək</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {form.projectType === "Müştərək" && (
                  <div>
                    <label className="text-sm font-medium">Həmrəhbərin tipi</label>
                    <Select value={form.coLeaderType} onValueChange={(v) => setForm({ ...form, coLeaderType: v })}>
                      <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yerli">Yerli</SelectItem>
                        <SelectItem value="Xarici">Xarici</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium">Layihənin kateqoriyası</label>
                  <Select value={form.projectCategory} onValueChange={(v) => setForm({ ...form, projectCategory: v })}>
                    <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ölkədaxili">Ölkədaxili</SelectItem>
                      <SelectItem value="Regional">Regional</SelectItem>
                      <SelectItem value="Beynəlxalq">Beynəlxalq</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Layihənin xarakteri</label>
                  <Select value={form.projectCharacter} onValueChange={(v) => setForm({ ...form, projectCharacter: v })}>
                    <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bir elm sahəsi üzrə">Bir elm sahəsi üzrə</SelectItem>
                      <SelectItem value="Elm sahələrinin qovşağında">Elm sahələrinin qovşağında</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Qrant ərizəçinin statusu</label>
                  <Select value={form.applicantStatus} onValueChange={(v) => setForm({ ...form, applicantStatus: v })}>
                    <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Müvəqqəti yaradıcı kollektiv">Müvəqqəti yaradıcı kollektiv</SelectItem>
                      <SelectItem value="Alim">Alim</SelectItem>
                      <SelectItem value="Fiziki şəxs">Fiziki şəxs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Layihənin icra müddəti (ay)</label>
                  <Select value={form.duration} onValueChange={(v) => setForm({ ...form, duration: v })}>
                    <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                      <SelectItem value="18">18</SelectItem>
                      <SelectItem value="24">24</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Maksimum iştirakçı sayı</label>
                  <Input type="number" value={form.maxParticipants} onChange={(e) => setForm({ ...form, maxParticipants: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium">35-dən yuxarı məhdudiyyət</label>
                  <Select value={form.over35Restriction ? "yes" : "no"} onValueChange={(v) => setForm({ ...form, over35Restriction: v === "yes" })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Bəli</SelectItem>
                      <SelectItem value="no">Xeyr</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Logo Upload */}
            <div>
              <label className="text-sm font-medium">Logo (yalnız JPG)</label>
              <div className="mt-2 flex items-center gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Logo yüklə
                </Button>
                {form.logo && (
                  <img src={form.logo} alt="Logo" className="h-12 w-12 object-contain rounded border" />
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>İmtina et</Button>
            <Button onClick={handleSave}>Təsdiq et</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Message to Project Leader Dialog */}
      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Layihə rəhbərinə mesaj</DialogTitle>
          </DialogHeader>
          {selectedCompetition && (
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">{selectedCompetition.nameAz}</p>
                <p className="text-xs text-muted-foreground">{selectedCompetition.code}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Başlıq</label>
                <Input
                  value={messageForm.title}
                  onChange={(e) => setMessageForm({ ...messageForm, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Məzmun</label>
                <Textarea
                  value={messageForm.content}
                  onChange={(e) => setMessageForm({ ...messageForm, content: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Başlama tarixi</label>
                  <Input
                    type="date"
                    value={messageForm.startDate}
                    onChange={(e) => setMessageForm({ ...messageForm, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Bitmə tarixi</label>
                  <Input
                    type="date"
                    value={messageForm.endDate}
                    onChange={(e) => setMessageForm({ ...messageForm, endDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setMessageDialogOpen(false)}>İmtina et</Button>
            <Button onClick={() => setMessageDialogOpen(false)}>Göndər</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
