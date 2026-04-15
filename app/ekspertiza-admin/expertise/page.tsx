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
import { Search, Eye, Download, Send, CheckCircle, FileText } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

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
      expertName: "Prof. Fəridə Qasımova",
      signingDate: "20.01.2025",
      scores: [5, 5, 5, 5, 5],
      finalScore: "5 bal - Layihə çox əhəmiyyətlidir",
      review: "Layihə çox yüksək səviyyəli elmi nailiyyətlərə yönəldilmişdir. GPU optimizasiyası sahəsində böyük töhfə verəcəkdir.",
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
    annotation: "Kənd təsərrüfatı sektoru üçün avtonomluq səviyyəsi yüksək robotlar sistemi",
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
  const [statusFilter, setStatusFilter] = useState("")
  const [selectedProject, setSelectedProject] = useState(null)
  const [projectDetailOpen, setProjectDetailOpen] = useState(false)
  const [documentsOpen, setDocumentsOpen] = useState(false)
  const [statusChangeOpen, setStatusChangeOpen] = useState(false)
  const [expertOpinionOpen, setExpertOpinionOpen] = useState(false)
  const [sendToExpertOpen, setSendToExpertOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedExpert, setSelectedExpert] = useState("")

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
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-sm"
            >
              <option value="">Bütün statuslar</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
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
                  <TableHead className="w-24 text-right">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project, index) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{project.leadName}</TableCell>
                    <TableCell className="max-w-xs">{project.projectName}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                      {project.annotation || "Annotasiya yoxdur"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{project.field}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(project.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="gap-1"
                          onClick={() => {
                            setSelectedProject(project)
                            setProjectDetailOpen(true)
                          }}
                          title="Layihəyə baxış"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <select 
                          defaultValue=""
                          onChange={(e) => {
                            const action = e.target.value
                            setSelectedProject(project)
                            
                            if (action === "view") {
                              setProjectDetailOpen(true)
                            } else if (action === "send") {
                              setSendToExpertOpen(true)
                            } else if (action === "documents") {
                              setDocumentsOpen(true)
                            } else if (action === "changeStatus") {
                              setStatusChangeOpen(true)
                            } else if (action === "opinion") {
                              setExpertOpinionOpen(true)
                            }
                          }}
                          className="px-2 py-1 text-sm border border-input rounded-md bg-background cursor-pointer"
                        >
                          <option value="">Əməliyyat</option>
                          <option value="view">Layihəyə baxış</option>
                          <option value="send">Ekspertə göndər</option>
                          <option value="documents">Sənədlərin siyahısı</option>
                          <option value="changeStatus">Statusu dəyiş</option>
                          {project.expertOpinion && <option value="opinion">Ekspertin rəyi</option>}
                        </select>
                      </div>
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
        <DialogContent className="max-w-2xl">
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Elm sahəsi</p>
                  <Badge variant="outline">{selectedProject.field}</Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  {getStatusBadge(selectedProject.status)}
                </div>
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
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>İmzalanmış sənədlər</DialogTitle>
            <DialogDescription>{selectedProject?.projectName}</DialogDescription>
          </DialogHeader>
          {selectedProject && selectedProject.documents && selectedProject.documents.length > 0 ? (
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
                          <Button size="sm" variant="ghost" title="Sənədə bax" className="gap-1">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" title="Sənədi yüklə" className="gap-1">
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
            <p className="text-muted-foreground py-4">Sənəd tapılmadı</p>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDocumentsOpen(false)}>Bağla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Status Dialog */}
      <Dialog open={statusChangeOpen} onOpenChange={setStatusChangeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Layihənin statusunu dəyiş</DialogTitle>
            <DialogDescription>{selectedProject?.projectName}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
            >
              <option value="">Status seçin</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusChangeOpen(false)}>Ləğv et</Button>
            <Button onClick={() => {
              alert(`Status dəyişdirildi: ${selectedStatus}`)
              setStatusChangeOpen(false)
            }} className="bg-primary text-primary-foreground">Dəyiş</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send to Expert Dialog */}
      <Dialog open={sendToExpertOpen} onOpenChange={setSendToExpertOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ekspertə göndər</DialogTitle>
            <DialogDescription>{selectedProject?.projectName}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <select 
              value={selectedExpert} 
              onChange={(e) => setSelectedExpert(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
            >
              <option value="">Ekspert seçin</option>
              <option value="expert1">Prof. Fəridə Qasımova</option>
              <option value="expert2">Dr. Vasif Əlibekov</option>
              <option value="expert3">Dr. Aynur Hüseynova</option>
            </select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSendToExpertOpen(false)}>Ləğv et</Button>
            <Button onClick={() => {
              if (selectedExpert) {
                alert(`Layihə göndərildi: ${selectedExpert}`)
                setSendToExpertOpen(false)
              }
            }} className="bg-primary text-primary-foreground">Göndər</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Expert Opinion Dialog - Read-only Wizard */}
      <Dialog open={expertOpinionOpen} onOpenChange={setExpertOpinionOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ekspertin rəyi (Yalnız oxu)</DialogTitle>
            <DialogDescription>{selectedProject?.projectName}</DialogDescription>
          </DialogHeader>
          {selectedProject?.expertOpinion && (
            <div className="space-y-6 py-2">
              {/* 4-Step Wizard Visualization */}
              <div className="space-y-4">
                <p className="text-sm font-semibold text-muted-foreground">Ekspertiza Mərhələləri</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold text-sm">
                        {step}
                      </div>
                      <p className="text-xs text-center text-muted-foreground">
                        {step === 1 && "İlkin Qiymətləndirmə"}
                        {step === 2 && "Texniki Ekspertiza"}
                        {step === 3 && "Elmi Ekspertiza"}
                        {step === 4 && "Yekun Qərar"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

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
                    {selectedProject.expertOpinion.scores.map((score, idx) => (
                      <div key={idx} className="bg-muted p-2 rounded text-center">
                        <p className="text-xs text-muted-foreground mb-1">Meyar {idx + 1}</p>
                        <p className="text-xl font-bold">{score}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Final Score */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Yekun qiymətləndirmə</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                    <p className="font-medium text-emerald-900">{selectedProject.expertOpinion.finalScore}</p>
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
    </div>
  )
}
