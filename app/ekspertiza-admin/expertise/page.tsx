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

const PROJECTS = [
  {
    id: 1,
    code: "EIF-2025-001",
    leadName: "Dr. Əliyəv Ramil",
    projectName: "Dərin öyrənmə modelləri üzrə GPU-ə optimizasiya",
    annotation: "Layihə çərçivəsində müasir dərin öyrənmə modelləri üçün GPU-ə optimizasiya metodologiyası işlənən burada neyroşəbəkə parametrləri əsasında avtomat düzəlişlər ediləcəkdir.",
    field: "Kompüter elmləri",
    status: "Texniki ekspertizadan keçib",
    documents: [
      { id: 1, code: "DOC-001", signer: "Əliyəv Ramil", signingDate: "15.01.2025", format: "PDF", type: "Layihə Təklifi" },
      { id: 2, code: "DOC-002", signer: "Əliyəv Ramil", signingDate: "15.01.2025", format: "PDF", type: "Büdcə Planı" },
    ],
    expertOpinion: {
      scores: [5, 5, 5, 5, 5],
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
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null)
  const [projectDetailOpen, setProjectDetailOpen] = useState(false)
  const [documentsOpen, setDocumentsOpen] = useState(false)
  const [expertOpinionOpen, setExpertOpinionOpen] = useState(false)
  const [changeStatusOpen, setChangeStatusOpen] = useState(false)
  const [newStatus, setNewStatus] = useState("")

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesSearch =
      project.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.code.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = !statusFilter || project.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      "Təsdiq olunmayan versiya": "bg-yellow-100 text-yellow-700",
      "Təsdiq olunan versiya": "bg-blue-100 text-blue-700",
      "Kağız versiya təqdim olunmayıb": "bg-orange-100 text-orange-700",
      "Təsdiq olunub": "bg-green-100 text-green-700",
      "Texniki ekspertizadan keçib": "bg-emerald-100 text-emerald-700",
      "Texniki ekspertizadan keçməyib": "bg-red-100 text-red-700",
      "Elmi ekspertizadan keçib": "bg-green-100 text-green-700",
      "Elmi ekspertizadan keçməyib": "bg-red-100 text-red-700",
    }
    return (
      <Badge className={colors[status] || "bg-muted text-muted-foreground"}>
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Açar söz ilə axtarış..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="w-64">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Sıra</TableHead>
                <TableHead>Layihə rəhbərinin adı</TableHead>
                <TableHead>Layihənin adı</TableHead>
                <TableHead>Annotasiya</TableHead>
                <TableHead>Elm sahəsi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12">Əməliyyatlar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project, index) => (
                <TableRow key={project.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{project.leadName}</TableCell>
                  <TableCell>{project.projectName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate" title={project.annotation}>
                    {project.annotation || "Annotasiya yoxdur"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{project.field}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(project.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          setSelectedProject(project)
                          setProjectDetailOpen(true)
                        }}>
                          <Eye className="h-4 w-4 mr-2" />
                          Layihəyə baxış
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Send className="h-4 w-4 mr-2" />
                          Ekspertə göndər
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedProject(project)
                          setDocumentsOpen(true)
                        }}>
                          <FileText className="h-4 w-4 mr-2" />
                          Sənədlərin siyahısı
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedProject(project)
                          setNewStatus(project.status)
                          setChangeStatusOpen(true)
                        }}>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Statusu dəyiş
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => {
                            setSelectedProject(project)
                            setExpertOpinionOpen(true)
                          }}
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
        </CardContent>
      </Card>

      {/* Project Detail Dialog */}
      <Dialog open={projectDetailOpen} onOpenChange={setProjectDetailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Layihə məlumatları</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">Kod</p>
                <p className="font-medium">{selectedProject.code}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Layihə rəhbəri</p>
                <p className="font-medium">{selectedProject.leadName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Layihənin adı</p>
                <p className="font-medium">{selectedProject.projectName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Annotasiya</p>
                <p className="text-sm">{selectedProject.annotation || "Yoxdur"}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setProjectDetailOpen(false)}>Bağla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Documents Dialog */}
      <Dialog open={documentsOpen} onOpenChange={setDocumentsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>İmzalanmış sənədlər</DialogTitle>
          </DialogHeader>
          {selectedProject && selectedProject.documents.length > 0 ? (
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
                    <TableCell>{doc.code}</TableCell>
                    <TableCell>{doc.signer}</TableCell>
                    <TableCell>{doc.signingDate}</TableCell>
                    <TableCell>{doc.format}</TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>Sənəd tapılmadı</p>
          )}
          <DialogFooter>
            <Button onClick={() => setDocumentsOpen(false)}>Bağla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Status Dialog */}
      <Dialog open={changeStatusOpen} onOpenChange={setChangeStatusOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Statusu dəyiş</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger>
                <SelectValue />
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
            <Button onClick={() => setChangeStatusOpen(false)}>Dəyiş</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Expert Opinion Dialog */}
      <Dialog open={expertOpinionOpen} onOpenChange={setExpertOpinionOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ekspertin rəyi</DialogTitle>
          </DialogHeader>
          {selectedProject?.expertOpinion && (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Ekspert məlumatları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Ekspert</p>
                    <p className="font-medium">{selectedProject.expertOpinion.expertName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tarix</p>
                    <p className="font-medium">{selectedProject.expertOpinion.signingDate}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Meyarlar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2">
                    {selectedProject.expertOpinion.scores.map((score, i) => (
                      <div key={i} className="bg-muted p-2 rounded text-center">
                        <p className="text-xs text-muted-foreground">Meyar {i + 1}</p>
                        <p className="text-lg font-bold">{score}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Yekun</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-blue-900">{selectedProject.expertOpinion.finalScore}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Rəy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{selectedProject.expertOpinion.review}</p>
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setExpertOpinionOpen(false)}>Bağla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
