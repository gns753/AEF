"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Bold,
  Italic,
  Strikethrough,
  Link,
  Heading,
  Quote,
  Code,
  List,
  ListOrdered,
  IndentDecrease,
  IndentIncrease,
  Undo,
  Redo,
  Plus,
  Trash2,
  Upload,
  AlertCircle,
  Info,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

// Rich Text Editor Component with Toolbar
function RichTextEditor({ 
  labelAz, 
  labelEn, 
  showCharCount = false,
  maxChars = 3500,
  note = ""
}: { 
  labelAz: string
  labelEn: string
  showCharCount?: boolean
  maxChars?: number
  note?: string
}) {
  const [contentAz, setContentAz] = useState("")
  const [contentEn, setContentEn] = useState("")

  const ToolbarButton = ({ icon: Icon, title }: { icon: React.ElementType, title: string }) => (
    <button
      type="button"
      className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
      title={title}
    >
      <Icon className="h-4 w-4" />
    </button>
  )

  const Toolbar = () => (
    <div className="flex flex-wrap items-center gap-0.5 p-2 border-b bg-muted/30">
      <ToolbarButton icon={Bold} title="Qalın / Bold" />
      <ToolbarButton icon={Italic} title="Kursiv / Italic" />
      <ToolbarButton icon={Strikethrough} title="Üstündən xətt / Strikethrough" />
      <div className="w-px h-5 bg-border mx-1" />
      <ToolbarButton icon={Link} title="Keçid / Link" />
      <ToolbarButton icon={Heading} title="Başlıq / Heading" />
      <ToolbarButton icon={Quote} title="Sitat / Quote" />
      <ToolbarButton icon={Code} title="Kod / Code" />
      <div className="w-px h-5 bg-border mx-1" />
      <ToolbarButton icon={List} title="Nöqtəli siyahı / Bullets" />
      <ToolbarButton icon={ListOrdered} title="Nömrəli siyahı / Numbers" />
      <ToolbarButton icon={IndentDecrease} title="Girintini azalt / Decrease Level" />
      <ToolbarButton icon={IndentIncrease} title="Girintini artır / Increase Level" />
      <div className="w-px h-5 bg-border mx-1" />
      <ToolbarButton icon={Undo} title="Geri al / Undo" />
      <ToolbarButton icon={Redo} title="İrəli al / Redo" />
    </div>
  )

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">
          {labelAz} / {labelEn}
        </CardTitle>
        {note && (
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Info className="h-4 w-4" />
            {note}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">Azərbaycan</Label>
            <div className="border rounded-lg overflow-hidden">
              <Toolbar />
              <Textarea
                value={contentAz}
                onChange={(e) => setContentAz(e.target.value)}
                className="min-h-[150px] border-0 rounded-none resize-none focus-visible:ring-0"
                placeholder="Mətn daxil edin..."
              />
              {showCharCount && (
                <div className="px-3 py-2 border-t bg-muted/30 text-sm text-muted-foreground text-right">
                  {maxChars} / {contentAz.length} simvol
                </div>
              )}
            </div>
          </div>
          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">English</Label>
            <div className="border rounded-lg overflow-hidden">
              <Toolbar />
              <Textarea
                value={contentEn}
                onChange={(e) => setContentEn(e.target.value)}
                className="min-h-[150px] border-0 rounded-none resize-none focus-visible:ring-0"
                placeholder="Enter text..."
              />
              {showCharCount && (
                <div className="px-3 py-2 border-t bg-muted/30 text-sm text-muted-foreground text-right">
                  {maxChars} / {contentEn.length} symbols
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Research Structure Editor - 4 levels
function ResearchStructureEditor() {
  const levels = [
    { az: "Mərhələ 1", en: "Level 1" },
    { az: "Mərhələ 2", en: "Level 2" },
    { az: "Mərhələ 3", en: "Level 3" },
    { az: "Mərhələ 4", en: "Level 4" },
  ]

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">
          Layihə üzrə tədqiqatın strukturu / Structure of the research
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {levels.map((level, idx) => (
          <div key={idx} className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">{level.az} / {level.en}</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <Textarea placeholder="Mətn daxil edin..." className="min-h-[100px]" />
              <Textarea placeholder="Enter text..." className="min-h-[100px]" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default function ProjectDetailPage() {
  const params = useParams()
  const [agreed, setAgreed] = useState(false)

  // Science fields table data
  const [scienceFields, setScienceFields] = useState([
    { id: 1, code: "2501", name: "Ümumi riyaziyyat / General Mathematics" },
    { id: 2, code: "3304", name: "Tədbiqi fizika / Applied Physics" },
  ])

  // Documents table data
  const [documents, setDocuments] = useState([
    { id: 1, document: "CV.pdf", note: "Layihə rəhbərinin CV-si" },
  ])

  // Participants table data
  const [participants, setParticipants] = useState([
    { id: 1, position: "Layihə rəhbəri", surname: "ƏSGƏROV", name: "ABBAS", fatherName: "BABAŞ OĞLU", status: "Təsdiq edilib" },
    { id: 2, position: "İcraçı", surname: "MƏMMƏDOV", name: "FUAD", fatherName: "ELMAR OĞLU", status: "Gözləmədə" },
  ])

  // Salary table data
  const [salaries, setSalaries] = useState([
    { id: 1, fullName: "ƏSGƏROV ABBAS", position: "Layihə rəhbəri", totalAmount: 5000, monthlySalary: 417, insurance: 2.08, duration: 12, totalSalary: 5000, note: "" },
    { id: 2, fullName: "MƏMMƏDOV FUAD", position: "İcraçı", totalAmount: 3600, monthlySalary: 300, insurance: 1.50, duration: 12, totalSalary: 3600, note: "" },
  ])

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Fundamental və tətbiqi xarakterli elmi-tədqiqat layihələri müsabiqəsi</h1>
        <p className="text-muted-foreground">Layihə ID: {params.id}</p>
      </div>

      {/* Section 1: Basic Form Fields */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Əsas Məlumatlar / Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Project Name */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Layihənin adı *</Label>
              <Input defaultValue="Süni intellekt əsaslı tibbi diaqnostika sistemi" />
            </div>
            <div className="space-y-2">
              <Label>Title of the project *</Label>
              <Input defaultValue="AI-based medical diagnostic system" />
            </div>
          </div>

          {/* Category */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Layihənin kateqoriyası *</Label>
              <Select defaultValue="domestic">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domestic">Ölkədaxili</SelectItem>
                  <SelectItem value="international">Beynəlxalq</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Category of the proposal *</Label>
              <Select defaultValue="domestic">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Character */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Layihənin xarakteri *</Label>
              <Select defaultValue="interdisciplinary">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="interdisciplinary">Elm sahələrinin qovşağında</SelectItem>
                  <SelectItem value="single">Tək elm sahəsi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Character of the project proposal *</Label>
              <Select defaultValue="interdisciplinary">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="interdisciplinary">Interdisciplinary</SelectItem>
                  <SelectItem value="single">Single discipline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Applicant Status */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Qrant ərizəçisinin statusu *</Label>
              <Select defaultValue="collective">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="collective">Müvəqqəti yaradıcı kollektiv</SelectItem>
                  <SelectItem value="individual">Fərdi tədqiqatçı</SelectItem>
                  <SelectItem value="organization">Təşkilat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status of the applicant *</Label>
              <Select defaultValue="collective">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="collective">Temporary creative scientific collective</SelectItem>
                  <SelectItem value="individual">Individual researcher</SelectItem>
                  <SelectItem value="organization">Organization</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Duration */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Layihənin icra müddəti (Ay) *</Label>
              <Input type="number" defaultValue={12} min={1} max={60} />
            </div>
            <div className="space-y-2">
              <Label>Duration of the project (Month) *</Label>
              <Input type="number" defaultValue={12} min={1} max={60} />
            </div>
          </div>

          {/* Type */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Layihənin tipi *</Label>
              <Select defaultValue="personal">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Fərdi</SelectItem>
                  <SelectItem value="team">Komanda</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Type of the proposal *</Label>
              <Select defaultValue="personal">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: WYSIWYG Rich Text Editors */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Layihə Təsviri / Project Description</h2>
        
        <RichTextEditor 
          labelAz="Layihənin məqsədi, qarşıya qoyulan məsələləri, aktuallığı" 
          labelEn="Objectives, goals and actuality"
        />
        
        <RichTextEditor 
          labelAz="Layihənin annotasiyası" 
          labelEn="Project annotation"
          showCharCount={true}
          maxChars={3500}
        />
        
        <RichTextEditor 
          labelAz="Açar sözlər" 
          labelEn="Keywords"
          note="Maksimum 10 söz, nöqtəli vergüllə ayrılmalıdır / Maximum 10 words, separated by semicolons"
        />
        
        <RichTextEditor 
          labelAz="Layihənin elmi istiqaməti və icmalı" 
          labelEn="Scientific direction and review"
        />
        
        <RichTextEditor 
          labelAz="Layihənin elmi ideyası" 
          labelEn="Scientific idea"
        />
        
        <ResearchStructureEditor />
        
        <RichTextEditor 
          labelAz="Gözlənilən nəticələr" 
          labelEn="Expected results"
        />
        
        <RichTextEditor 
          labelAz="Nəticələrin istifadəsi və tətbiqi sahələri" 
          labelEn="Areas of application"
        />
        
        <RichTextEditor 
          labelAz="Kollektivin ixtisasının uyğunluğu" 
          labelEn="Characterization of scientific collective"
        />
        
        <RichTextEditor 
          labelAz="Avadanlıq, cihaz məlumatları" 
          labelEn="Information about equipment"
        />
        
        <RichTextEditor 
          labelAz="Maliyyələşdirilmiş layihələrdə iştirak (Tarixçə)" 
          labelEn="Previous grant participation"
        />
      </div>

      {/* Section 3: Dynamic Tables */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Cədvəllər / Tables</h2>
        
        {/* Science Fields Table */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Elmi sahələr / Science fields</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Əlavə et
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Elmi sahə əlavə et</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Kod</Label>
                    <Input placeholder="Məs: 2501" />
                  </div>
                  <div className="space-y-2">
                    <Label>Təsnifat üzrə tam adı</Label>
                    <Input placeholder="Elm sahəsinin adı" />
                  </div>
                  <Button className="w-full">Əlavə et</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kodu</TableHead>
                  <TableHead>Təsnifat üzrə tam adı</TableHead>
                  <TableHead className="w-[100px]">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scienceFields.map((field) => (
                  <TableRow key={field.id}>
                    <TableCell className="font-mono">{field.code}</TableCell>
                    <TableCell>{field.name}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Documents Table */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Digər sənəd və məktubların əlavə edilməsi</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Sənəd əlavə et
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sənəd əlavə et</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Sənəd</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Faylı buraya sürükləyin və ya klikləyin</p>
                      <Input type="file" className="hidden" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Qeyd</Label>
                    <Input placeholder="Sənəd haqqında qeyd" />
                  </div>
                  <Button className="w-full">Əlavə et</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sənəd</TableHead>
                  <TableHead>Qeyd</TableHead>
                  <TableHead className="w-[100px]">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium text-blue-600">{doc.document}</TableCell>
                    <TableCell>{doc.note}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Participants Table */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Layihədə iştirak edən şəxslər</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-1">
                    <Plus className="h-4 w-4" />
                    İştirakçı əlavə et
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>İştirakçı əlavə et</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Tutduğu vəzifə</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Vəzifə seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="leader">Layihə rəhbəri</SelectItem>
                          <SelectItem value="executor">İcraçı</SelectItem>
                          <SelectItem value="consultant">Məsləhətçi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-2">
                        <Label>Soyadı</Label>
                        <Input />
                      </div>
                      <div className="space-y-2">
                        <Label>Adı</Label>
                        <Input />
                      </div>
                      <div className="space-y-2">
                        <Label>Atasının adı</Label>
                        <Input />
                      </div>
                    </div>
                    <Button className="w-full">Əlavə et</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg mt-4">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                İddiaçı kimi qeydiyyatdan keçmiş şəxslər avtomatik olaraq layihəyə əlavə olunur. 
                Əlavə iştirakçılar yuxarıdakı düymə vasitəsilə əlavə edilə bilər.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tutduğu vəzifə</TableHead>
                  <TableHead>Soyadı</TableHead>
                  <TableHead>Adı</TableHead>
                  <TableHead>Atasının adı</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participants.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell>{person.position}</TableCell>
                    <TableCell className="font-medium">{person.surname}</TableCell>
                    <TableCell>{person.name}</TableCell>
                    <TableCell>{person.fatherName}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        person.status === "Təsdiq edilib" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {person.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Section 4: Budget Planning (Smeta) */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Smeta (Büdcə Planlaması) / Budget Planning</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="salary">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="salary">Əmək haqqları</TabsTrigger>
              <TabsTrigger value="assets">Əsas vəsaitlər</TabsTrigger>
              <TabsTrigger value="travel">Ezamiyyət xərcləri</TabsTrigger>
              <TabsTrigger value="expenses">Xərclər smetası</TabsTrigger>
            </TabsList>
            
            <TabsContent value="salary" className="mt-4">
              <div className="flex justify-end mb-4">
                <Button size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Əlavə et
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>İştirakçı S.A.A</TableHead>
                      <TableHead>Vəzifəsi</TableHead>
                      <TableHead>Tam məbləğ</TableHead>
                      <TableHead>Aylıq əmək haqqı</TableHead>
                      <TableHead>İşsizlik 0.5%</TableHead>
                      <TableHead>Müddət (ay)</TableHead>
                      <TableHead>Ümumi</TableHead>
                      <TableHead>Qeyd</TableHead>
                      <TableHead className="w-[80px]">Əməliyyatlar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salaries.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="font-medium">{row.fullName}</TableCell>
                        <TableCell>{row.position}</TableCell>
                        <TableCell>{row.totalAmount} AZN</TableCell>
                        <TableCell>{row.monthlySalary} AZN</TableCell>
                        <TableCell>{row.insurance} AZN</TableCell>
                        <TableCell>{row.duration}</TableCell>
                        <TableCell className="font-medium">{row.totalSalary} AZN</TableCell>
                        <TableCell>
                          <Input className="w-24 h-8" placeholder="Qeyd" />
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  * Layihə icraçılarının əmək haqqları 14% gəlir vergisi və 3% DSMF daxil olmaqla göstərilməlidir.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="assets" className="mt-4">
              <div className="flex justify-end mb-4">
                <Button size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Əlavə et
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Avadanlıq adı</TableHead>
                    <TableHead>Miqdarı</TableHead>
                    <TableHead>Vahid qiyməti</TableHead>
                    <TableHead>Ümumi məbləğ</TableHead>
                    <TableHead>Əməliyyatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-muted-foreground text-center" colSpan={5}>
                      Məlumat yoxdur
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="travel" className="mt-4">
              <div className="flex justify-end mb-4">
                <Button size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Əlavə et
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ezamiyyət yeri</TableHead>
                    <TableHead>Müddət (gün)</TableHead>
                    <TableHead>Nəfər sayı</TableHead>
                    <TableHead>Gündəlik xərc</TableHead>
                    <TableHead>Ümumi məbləğ</TableHead>
                    <TableHead>Əməliyyatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-muted-foreground text-center" colSpan={6}>
                      Məlumat yoxdur
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="expenses" className="mt-4">
              <div className="flex justify-end mb-4">
                <Button size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Əlavə et
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Xərc maddəsi</TableHead>
                    <TableHead>Təsvir</TableHead>
                    <TableHead>Məbləğ</TableHead>
                    <TableHead>Əməliyyatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-muted-foreground text-center" colSpan={4}>
                      Məlumat yoxdur
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Section 5: Footer & Confirmation */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 p-4 border rounded-lg mb-6">
            <Checkbox 
              id="agreement" 
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
              className="mt-1"
            />
            <label htmlFor="agreement" className="text-sm leading-relaxed cursor-pointer">
              Mən Azərbaycan Respublikası Elm və Təhsil Nazirliyinin Elmin İnkişafı Fondunun qaydaları ilə 
              tanış oldum və layihənin müəlliflik hüquqlarının qorunması, məlumatların düzgünlüyü və 
              təqdim olunan sənədlərin orijinallığı barədə öhdəlik götürürəm. / 
              I have read the rules of the Science Development Foundation of the Ministry of Science and 
              Education of the Republic of Azerbaijan and I undertake to protect the copyright of the project, 
              the accuracy of the data and the originality of the submitted documents.
            </label>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <span className="font-semibold">
                DİQQƏT! Layihənin təqdim olunması üçün son tarix: 09.04.2026
              </span>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline">
                Yadda saxla / Save Draft
              </Button>
              <Button 
                disabled={!agreed}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Layihəni Təsdiqlə / Submit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
