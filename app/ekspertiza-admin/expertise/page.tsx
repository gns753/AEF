'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  DialogDescription,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, Send, FileText, CheckCircle2, Download, Search, Filter, MoreHorizontal } from "lucide-react"

// Mock project data
interface Project {
  id: number
  code: string
  leadName: string
  projectName: string
  annotation: string
  field: string
  status: "Təsdiq olunmayan versiya" | "Təsdiq olunan versiya" | "Kağız versiya təqdim olunmayıb" | "Təsdiq olunub" | "Texniki ekspertizadan keçib" | "Texniki ekspertizadan keçməyib" | "Elmi ekspertizadan keçib" | "Elmi ekspertizadan keçməyib"
  participants: string[]
  documents: Document[]
  expertOpinion?: ExpertOpinion
}

interface Document {
  id: number
  code: string
  signer: string
  signingDate: string
  format: string
  type: string
}

interface ExpertOpinion {
  criteria: Record<string, number>
  finalScore: string
  review: string
  expertName: string
  signingDate: string
}

const PROJECTS: Project[] = [
  {
    id: 1,
    code: "EIF-2025-001",
    leadName: "Dr. Əliyəv Ramil",
    projectName: "Dərin öyrənmə modelləri üzrə GPU-ə optimizasiya",
    annotation: "Layihə çərçivəsində müasir dərin öyrənmə modelləri üçün GPU-ə optimizasiya metodologiyası işlənən burada neyroşəbəkə parametrləri əsasında avtomat düzəlişlər ediləcəkdir.",
    field: "Kompüter elmləri",
    status: "Texniki ekspertizadan keçib",
    participants: ["Dr. Əliyəv Ramil", "Əsgər Həsənov", "Leyla Paşayeva"],
    documents: [
      { id: 1, code: "DOC-001", signer: "Əliyəv Ramil", signingDate: "15.01.2025", format: "PDF", type: "Layihə Təklifi" },
      { id: 2, code: "DOC-002", signer: "Əliyəv Ramil", signingDate: "15.01.2025", format: "PDF", type: "Büdcə Planı" },
    ],
    expertOpinion: {
      criteria: { c1: 5, c2: 5, c3: 5, c4: 5, c5: 5 },
      finalScore: "5 bal - Layihə çox əhəmiyyətlidir",
      review: "Layihə çox yüksək səviyyəli elmi nailiyyətlərə yönəldilmişdir. GPU optimizasiyası sahəsində böyük töhfə verəcəkdir.",
      expertName: "Prof. Fəridə Qasımova",
      signingDate: "20.01.2025"
    }
  },
  {
    id: 2,
    code: "EIF-2025-002",
    leadName: "Dr. Hacıyeva Leyla",
    projectName: "Azərbaycanın endemik bitki növlərinin genomik analizi",
    annotation: "Layihə çərçivəsində Azərbaycanın endemik bitki növlərinin tam genomik ardıcıllığı müəyyən ediləcəkdir.",
    field: "Biologiya",
    status: "Elmi ekspertizadan keçməyib",
    participants: ["Dr. Hacıyeva Leyla", "Vasif Məcidov", "Aynur Hüseynova"],
    documents: [
      { id: 3, code: "DOC-003", signer: "Hacıyeva Leyla", signingDate: "18.01.2025", format: "PDF", type: "Layihə Təklifi" },
    ],
  },
  {
    id: 3,
    code: "EIF-2025-003",
    leadName: "Prof. Vəliyev Kamil",
    projectName: "Kənd təsərrüfatı robotlarının süni intellekt ilə idarə edilməsi",
    annotation: "",
    field: "Mühəndislik",
    status: "Təsdiq olunan versiya",
    participants: ["Prof. Vəliyev Kamil", "İsmət Səfərov"],
    documents: [],
  },
]

const STATUS_OPTIONS = [
  "Təsdiq olunmayan versiya",
  "Təsdiq olunan versiya",
  "Kağız versiya təqdim olunmayıb",
  "Təsdiq olunub",
  "Texniki ekspertizadan keçib",
  "Texniki ekspertizadan keçməyib",
  "Elmi ekspertizadan keçib",
  "Elmi ekspertizadan keçməyib",
]

export default function ExpertisePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projectDetailOpen, setProjectDetailOpen] = useState(false)
  const [documentsOpen, setDocumentsOpen] = useState(false)
  const [expertOpinionOpen, setExpertOpinionOpen] = useState(false)
  const [sendToExpertOpen, setSendToExpertOpen] = useState(false)
  const [changeStatusOpen, setChangeStatusOpen] = useState(false)
  const [newStatus, setNewStatus] = useState<string>("")

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesSearch =
      project.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.code.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = !statusFilter || project.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const openProjectDetail = (project: Project) => {
    setSelectedProject(project)
    setProjectDetailOpen(true)
  }

  const openDocuments = (project: Project) => {
    setSelectedProject(project)
    setDocumentsOpen(true)
  }

  const openExpertOpinion = (project: Project) => {
    if (project.expertOpinion) {
      setSelectedProject(project)
      setExpertOpinionOpen(true)
    }
  }

  const openChangeStatus = (project: Project) => {
    setSelectedProject(project)
    setNewStatus(project.status)
    setChangeStatusOpen(true)
  }

  const handleChangeStatus = () => {
    if (selectedProject && newStatus) {
      setChangeStatusOpen(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      "Təsdiq olunmayan versiya": "bg-yellow-100 text-yellow-700 border-yellow-200",
      "Təsdiq olunan versiya": "bg-blue-100 text-blue-700 border-blue-200",
      "Kağız versiya təqdim olunmayıb": "bg-orange-100 text-orange-700 border-orange-200",
      "Təsdiq olunub": "bg-green-100 text-green-700 border-green-200",
      "Texniki ekspertizadan keçib": "bg-emerald-100 text-emerald-700 border-emerald-200",
      "Texniki ekspertizadan keçməyib": "bg-red-100 text-red-700 border-red-200",
      "Elmi ekspertizadan keçib": "bg-green-100 text-green-700 border-green-200",
      "Elmi ekspertizadan keçməyib": "bg-red-100 text-red-700 border-red-200",
    }
    return (
      <Badge className={`${colors[status] || "bg-muted text-muted-foreground"}`}>
        {status}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Ekspertiza</h1>
        <p className="text-muted-foreground">Qrant müsabiqəsi layihələrinin ekspertizası</p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Axtarış və Filtr</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Açar söz ilə axtarış (ad, layihə adı, kod)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="w-64 relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              <Select value={statusFilter || ""} onValueChange={(val) => setStatusFilter(val || null)}>
                <SelectTrigger className="pl-9">
                  <SelectValue placeholder="Status üzrə filtr" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Bütün statuslar</SelectItem>
                  {STATUS_OPTIONS.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Sıra</TableHead>
                  <TableHead>Layihə rəhbərinin adı</TableHead>
                  <TableHead>Layihənin adı</TableHead>
                  <TableHead>Annotasiya</TableHead>
                  <TableHead>Elm sahəsi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12 text-right">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project, index) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{project.leadName}</TableCell>
                    <TableCell>{project.projectName}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate" title={project.annotation}>
                      {project.annotation || "Annotasiya yoxdur"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{project.field}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(project.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openProjectDetail(project)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Layihəyə baxış
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSendToExpertOpen(true)}>
                            <Send className="h-4 w-4 mr-2" />
                            Ekspertə göndər
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openDocuments(project)}>
                            <FileText className="h-4 w-4 mr-2" />
                            Sənədlərin siyahısı
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openChangeStatus(project)}>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Statusu dəyiş
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => openExpertOpinion(project)}
                            disabled={!project.expertOpinion}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Ekspertin rəyi
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Project Detail Dialog */}
      <Dialog open={projectDetailOpen} onOpenChange={setProjectDetailOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Layihə məlumatları (Yalnız oxu)</DialogTitle>
            <DialogDescription>{selectedProject?.code}</DialogDescription>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Layihə Kodu</p>
                  <p className="font-medium">{selectedProject.code}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Layihə rəhbəri</p>
                  <p className="font-medium">{selectedProject.leadName}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Layihənin adı</p>
                <p className="font-medium">{selectedProject.projectName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Annotasiya</p>
                <p className="text-sm">{selectedProject.annotation || "Annotasiya yoxdur"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Elm sahəsi</p>
                <Badge variant="outline">{selectedProject.field}</Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Status</p>
                {getStatusBadge(selectedProject.status)}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setProjectDetailOpen(false)}>Bağla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Documents Dialog */}
      <Dialog open={documentsOpen} onOpenChange={setDocumentsOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>İmzalanmış sənədlər</DialogTitle>
            <DialogDescription>{selectedProject?.projectName}</DialogDescription>
          </DialogHeader>
          {selectedProject && selectedProject.documents.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sənədin Kodu</TableHead>
                    <TableHead>İmzalamış Şəxs</TableHead>
                    <TableHead>İmzalama Tarixi</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Sənədin Növü</TableHead>
                    <TableHead>Əməliyyatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedProject.documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.code}</TableCell>
                      <TableCell>{doc.signer}</TableCell>
                      <TableCell>{doc.signingDate}</TableCell>
                      <TableCell>{doc.format}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" title="Sənədə bax">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" title="Sənədi yüklə">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-muted-foreground">Sənəd tapılmadı</p>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDocumentsOpen(false)}>Bağla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Status Dialog */}
      <Dialog open={changeStatusOpen} onOpenChange={setChangeStatusOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Layihənin statusunu dəyiş</DialogTitle>
            <DialogDescription>{selectedProject?.projectName}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status seçin" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setChangeStatusOpen(false)}>Ləğv et</Button>
            <Button onClick={handleChangeStatus} className="bg-primary text-primary-foreground">Dəyiş</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Expert Opinion Dialog - Read-only Wizard */}
      <Dialog open={expertOpinionOpen} onOpenChange={setExpertOpinionOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ekspertin rəyi (Yalnız oxu)</DialogTitle>
            <DialogDescription>{selectedProject?.projectName}</DialogDescription>
          </DialogHeader>
          {selectedProject?.expertOpinion && (
            <div className="space-y-6 py-2">
              {/* Expert Info */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Ekspert məlumatları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Ekspert adı</p>
                    <p className="font-medium">{selectedProject.expertOpinion.expertName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">İmzalama tarixi</p>
                    <p className="font-medium">{selectedProject.expertOpinion.signingDate}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Criteria Scores */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Meyarlar üzrə ballar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-5 gap-2">
                    <div className="bg-muted p-2 rounded text-center">
                      <p className="text-xs text-muted-foreground mb-1">Meyar 1</p>
                      <p className="text-xl font-bold">{selectedProject.expertOpinion.criteria.c1}</p>
                    </div>
                    <div className="bg-muted p-2 rounded text-center">
                      <p className="text-xs text-muted-foreground mb-1">Meyar 2</p>
                      <p className="text-xl font-bold">{selectedProject.expertOpinion.criteria.c2}</p>
                    </div>
                    <div className="bg-muted p-2 rounded text-center">
                      <p className="text-xs text-muted-foreground mb-1">Meyar 3</p>
                      <p className="text-xl font-bold">{selectedProject.expertOpinion.criteria.c3}</p>
                    </div>
                    <div className="bg-muted p-2 rounded text-center">
                      <p className="text-xs text-muted-foreground mb-1">Meyar 4</p>
                      <p className="text-xl font-bold">{selectedProject.expertOpinion.criteria.c4}</p>
                    </div>
                    <div className="bg-muted p-2 rounded text-center">
                      <p className="text-xs text-muted-foreground mb-1">Meyar 5</p>
                      <p className="text-xl font-bold">{selectedProject.expertOpinion.criteria.c5}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Final Score */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Yekun qiymətləndirmə</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="font-medium text-blue-900">{selectedProject.expertOpinion.finalScore}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Written Review */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Ekspertin yazılı rəyi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{selectedProject.expertOpinion.review}</p>
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setExpertOpinionOpen(false)}>Bağla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send to Expert Dialog */}
      <Dialog open={sendToExpertOpen} onOpenChange={setSendToExpertOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ekspertə göndər</DialogTitle>
            <DialogDescription>Layihəni ekspertə təyin edin</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <p className="text-sm font-medium mb-2">Ekspert seçin</p>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Ekspert seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expert1">Prof. Fəridə Qasımova</SelectItem>
                  <SelectItem value="expert2">Dr. Vasif Əlibekov</SelectItem>
                  <SelectItem value="expert3">Dr. Aynur Hüseynova</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSendToExpertOpen(false)}>Ləğv et</Button>
            <Button className="bg-primary text-primary-foreground">Göndər</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
