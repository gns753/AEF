"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FileText, Download, Plus, Pencil, Trash2, AlertCircle, CheckCircle2, Clock, XCircle, FolderOpen } from "lucide-react"

// Sənəd şablonları
const documentTemplates = [
  {
    id: 1,
    title: "Müqavilə üçün lazım olan sənədlər",
    size: "1.2 MB",
  },
  {
    id: 2,
    title: "Ezamiyyət hesabatları",
    size: "890 KB",
  },
  {
    id: 3,
    title: "Yekun hesabat",
    size: "1.5 MB",
  },
  {
    id: 4,
    title: "Layihənin qısa forması",
    size: "650 KB",
  },
  {
    id: 5,
    title: "Elmi hesabat",
    size: "2.1 MB",
  },
]

// Layihələr və onların sənədləri
const initialProjectDocuments = [
  {
    projectId: 1,
    projectName: "Süni İntellekt və Maşın Öyrənməsi",
    competitionName: "2026-cı il Elm və Texnologiya Qrantları",
    documents: [
      {
        id: 1,
        name: "Layihə_təklifi_AI_2026.pdf",
        uploadDate: "15 Yanvar 2026",
        status: "Təsdiqlənib",
        rejectReason: null,
      },
      {
        id: 2,
        name: "Büdcə_planı_AI.pdf",
        uploadDate: "14 Yanvar 2026",
        status: "Gözləmədə",
        rejectReason: null,
      },
      {
        id: 3,
        name: "CV_tədqiqatçı_komanda.pdf",
        uploadDate: "10 Yanvar 2026",
        status: "İmtina edilib",
        rejectReason: "Sənəddə imza yoxdur. Zəhmət olmasa imzalı versiyanı yükləyin.",
      },
    ],
  },
  {
    projectId: 2,
    projectName: "Yaşıl Enerji Texnologiyaları",
    competitionName: "Davamlı İnkişaf Qrantları 2026",
    documents: [
      {
        id: 4,
        name: "Enerji_layihəsi_təklif.pdf",
        uploadDate: "20 Yanvar 2026",
        status: "Təsdiqlənib",
        rejectReason: null,
      },
      {
        id: 5,
        name: "Texniki_hesabat.pdf",
        uploadDate: "18 Yanvar 2026",
        status: "Təsdiqlənib",
        rejectReason: null,
      },
    ],
  },
  {
    projectId: 3,
    projectName: "Biotexnologiya Tədqiqatları",
    competitionName: "Tibbi Araşdırmalar Qrantı",
    documents: [
      {
        id: 6,
        name: "Biotech_proposal.pdf",
        uploadDate: "5 Fevral 2026",
        status: "Gözləmədə",
        rejectReason: null,
      },
    ],
  },
]

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  "Təsdiqlənib": {
    color: "bg-emerald-100 text-emerald-700",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  "Gözləmədə": {
    color: "bg-amber-100 text-amber-700",
    icon: <Clock className="h-3.5 w-3.5" />,
  },
  "İmtina edilib": {
    color: "bg-red-100 text-red-700",
    icon: <XCircle className="h-3.5 w-3.5" />,
  },
}

interface Document {
  id: number
  name: string
  uploadDate: string
  status: string
  rejectReason: string | null
}

interface ProjectDocuments {
  projectId: number
  projectName: string
  competitionName: string
  documents: Document[]
}

export default function DocumentsPage() {
  const searchParams = useSearchParams()
  const projectIdFromUrl = searchParams.get("project")
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(undefined)
  const [projectDocuments, setProjectDocuments] = useState<ProjectDocuments[]>(initialProjectDocuments)
  const [editingDoc, setEditingDoc] = useState<Document | null>(null)
  const [editName, setEditName] = useState("")
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadError, setUploadError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (projectIdFromUrl) {
      setOpenAccordion(`project-${projectIdFromUrl}`)
      // Scroll to accordion after a small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(`project-${projectIdFromUrl}`)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }, 100)
    }
  }, [projectIdFromUrl])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== "application/pdf") {
        setUploadError("Yalnız PDF formatında fayllar qəbul edilir!")
        setSelectedFile(null)
        return
      }
      setUploadError("")
      setSelectedFile(file)
    }
  }

  const handleUpload = () => {
    if (!selectedFile || selectedProjectId === null) return

    const newDoc: Document = {
      id: Date.now(),
      name: selectedFile.name,
      uploadDate: new Date().toLocaleDateString("az-AZ", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      status: "Gözləmədə",
      rejectReason: null,
    }

    setProjectDocuments(
      projectDocuments.map((project) =>
        project.projectId === selectedProjectId
          ? { ...project, documents: [newDoc, ...project.documents] }
          : project
      )
    )
    setShowUploadDialog(false)
    setSelectedFile(null)
    setSelectedProjectId(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleEditSave = () => {
    if (!editingDoc || !editName.trim()) return

    setProjectDocuments(
      projectDocuments.map((project) => ({
        ...project,
        documents: project.documents.map((doc) =>
          doc.id === editingDoc.id ? { ...doc, name: editName } : doc
        ),
      }))
    )
    setEditingDoc(null)
    setEditName("")
  }

  const handleDelete = (projectId: number, docId: number) => {
    setProjectDocuments(
      projectDocuments.map((project) =>
        project.projectId === projectId
          ? { ...project, documents: project.documents.filter((doc) => doc.id !== docId) }
          : project
      )
    )
  }

  const openEditDialog = (doc: Document) => {
    setEditingDoc(doc)
    setEditName(doc.name)
  }

  const openUploadDialog = (projectId: number) => {
    setSelectedProjectId(projectId)
    setShowUploadDialog(true)
  }

  const getTotalDocuments = (project: ProjectDocuments) => project.documents.length
  const getApprovedCount = (project: ProjectDocuments) => 
    project.documents.filter(d => d.status === "Təsdiqlənib").length

  return (
    <div className="space-y-8">
      {/* Sənəd şablonları */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Sənəd şablonları
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {documentTemplates.map((template) => (
              <div
                key={template.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-red-50 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{template.title}</p>
                    <p className="text-xs text-muted-foreground">PDF • {template.size}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  Yüklə
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Əlavə edilmiş sənədlər - Layihələr üzrə */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" />
            Əlavə edilmiş sənədlər
          </CardTitle>
        </CardHeader>
        <CardContent>
          {projectDocuments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FolderOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Hələ heç bir layihə yoxdur</p>
            </div>
          ) : (
            <Accordion 
              type="single" 
              collapsible 
              className="w-full space-y-2"
              value={openAccordion}
              onValueChange={setOpenAccordion}
            >
              {projectDocuments.map((project) => (
                <AccordionItem
                  key={project.projectId}
                  value={`project-${project.projectId}`}
                  id={`project-${project.projectId}`}
                  className="border border-border rounded-lg px-4 data-[state=open]:bg-muted/30"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-4 text-left flex-1">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <FolderOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground truncate">
                          {project.projectName}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {project.competitionName}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <Badge variant="outline" className="text-xs">
                          {getTotalDocuments(project)} sənəd
                        </Badge>
                        <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                          {getApprovedCount(project)} təsdiqlənib
                        </Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
                    <div className="space-y-4">
                      <div className="flex justify-end">
                        <Button onClick={() => openUploadDialog(project.projectId)} size="sm">
                          <Plus className="h-4 w-4 mr-1.5" />
                          Sənəd əlavə et
                        </Button>
                      </div>

                      {project.documents.length === 0 ? (
                        <div className="text-center py-6 text-muted-foreground border border-dashed border-border rounded-lg">
                          <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Bu layihəyə hələ sənəd əlavə edilməyib</p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto border border-border rounded-lg">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-muted/50">
                                <TableHead>Sənədin adı</TableHead>
                                <TableHead>Yüklənmə tarixi</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>İmtina səbəbi</TableHead>
                                <TableHead className="text-right">Əməliyyatlar</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {project.documents.map((doc) => (
                                <TableRow key={doc.id}>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-red-600" />
                                      <span className="font-medium text-sm">{doc.name}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-sm text-muted-foreground">
                                    {doc.uploadDate}
                                  </TableCell>
                                  <TableCell>
                                    <Badge className={`${statusConfig[doc.status]?.color} flex items-center gap-1 w-fit`}>
                                      {statusConfig[doc.status]?.icon}
                                      {doc.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    {doc.rejectReason ? (
                                      <div className="flex items-start gap-1.5 max-w-xs">
                                        <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                                        <span className="text-sm text-red-600">{doc.rejectReason}</span>
                                      </div>
                                    ) : (
                                      <span className="text-sm text-muted-foreground">—</span>
                                    )}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-1">
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8"
                                        onClick={() => openEditDialog(doc)}
                                      >
                                        <Pencil className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => handleDelete(project.projectId, doc.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>

      {/* Sənəd yükləmə dialoqu */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sənəd əlavə et</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <FileText className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-1">
                PDF faylı seçmək üçün klikləyin
              </p>
              <p className="text-xs text-muted-foreground">
                Yalnız PDF formatı qəbul edilir
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>

            {selectedFile && (
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <FileText className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium">{selectedFile.name}</span>
              </div>
            )}

            {uploadError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg text-red-600">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm">{uploadError}</span>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
              Ləğv et
            </Button>
            <Button onClick={handleUpload} disabled={!selectedFile}>
              Yüklə
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sənəd adını redaktə etmə dialoqu */}
      <Dialog open={!!editingDoc} onOpenChange={() => setEditingDoc(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sənəd adını redaktə et</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Sənədin adı"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingDoc(null)}>
              Ləğv et
            </Button>
            <Button onClick={handleEditSave}>Yadda saxla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
