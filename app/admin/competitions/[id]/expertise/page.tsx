"use client"

import { useState, useMemo, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  Search,
  MoreVertical,
  Eye,
  FileText,
  CheckCircle,
  XCircle,
  StickyNote,
  Bell,
  X,
} from "lucide-react"

const competitionNames: Record<string, string> = {
  "1": "Gənc alimlər üçün qrant müsabiqəsi",
  "2": "İnnovasiya layihələri müsabiqəsi",
  "3": "Fundamental tədqiqatlar proqramı",
}

const initialProjects = [
  {
    id: 1,
    name: "Süni intellekt vasitəsilə xərçəng diaqnostikası",
    field: "Tibb",
    status: "Aktiv" as const,
    techExpertise: true,
    annotation: "",
  },
  {
    id: 2,
    name: "Yeni nəsil batareya texnologiyaları",
    field: "Texnika",
    status: "Aktiv" as const,
    techExpertise: false,
    annotation: "",
  },
  {
    id: 3,
    name: "Kənd təsərrüfatında IoT tətbiqləri",
    field: "Texnika",
    status: "Aktiv" as const,
    techExpertise: true,
    annotation: "",
  },
  {
    id: 4,
    name: "Azərbaycan memarlıq irsinin rəqəmsallaşdırılması",
    field: "Humanitar",
    status: "Dayandırılmış" as const,
    techExpertise: false,
    annotation: "Layihə büdcə problemləri səbəbindən dayandırılıb.",
  },
]

// Documents data for modal
const documentsData = [
  { name: "Layihə müqaviləsi", signer: "Rauf Əliyev", format: "PDF", date: "15.02.2025" },
  { name: "Smeta cədvəli", signer: "Sevinc Quliyeva", format: "XLSX", date: "16.02.2025" },
  { name: "Ərizə forması", signer: "Rauf Əliyev", format: "PDF", date: "14.02.2025" },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "Aktiv":
      return <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">{status}</Badge>
    case "Dayandırılmış":
      return <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100">{status}</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function getFormatBadge(format: string) {
  switch (format) {
    case "PDF":
      return <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100">{format}</Badge>
    case "XLSX":
      return <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">{format}</Badge>
    case "DOCX":
      return <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">{format}</Badge>
    default:
      return <Badge variant="secondary">{format}</Badge>
  }
}

export default function ExpertisePage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const competitionName = competitionNames[id] || "Müsabiqə"

  const [projects, setProjects] = useState(initialProjects)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState<"prepare" | "suspended">("prepare")
  const [annotationOpen, setAnnotationOpen] = useState(false)
  const [annotationProjectId, setAnnotationProjectId] = useState<number>(0)
  const [annotationText, setAnnotationText] = useState("")
  const [docsOpen, setDocsOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [expertNotificationVisible, setExpertNotificationVisible] = useState(false)
  const [expertSelectionData, setExpertSelectionData] = useState<{
    sentAt: string
    selectedProjects: string[]
  } | null>(null)

  // Check expert selections from sessionStorage (set by expert module)
  useEffect(() => {
    const completedRaw = sessionStorage.getItem("completedCompetitions")
    if (completedRaw) {
      const completedIds: number[] = JSON.parse(completedRaw)
      if (completedIds.includes(Number(id))) {
        setExpertNotificationVisible(true)
        setExpertSelectionData({
          sentAt: new Date().toLocaleDateString("az-AZ") + " " + new Date().toLocaleTimeString("az-AZ", { hour: "2-digit", minute: "2-digit" }),
          selectedProjects: ["Süni intellekt vasitəsilə xərçəng diaqnostikası", "Kənd təsərrüfatında IoT tətbiqləri"],
        })
      }
    }
  }, [id])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(""), 3000)
  }

  const toggleTechExpertise = (projectId: number) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const next = !p.techExpertise
          showToast(next ? "Texniki ekspertizadan keçib" : "Texniki ekspertizadan keçməyib")
          return { ...p, techExpertise: next }
        }
        return p
      })
    )
  }

  const openAnnotation = (projectId: number) => {
    const proj = projects.find((p) => p.id === projectId)
    setAnnotationProjectId(projectId)
    setAnnotationText(proj?.annotation || "")
    setAnnotationOpen(true)
  }

  const saveAnnotation = () => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === annotationProjectId ? { ...p, annotation: annotationText } : p
      )
    )
    setAnnotationOpen(false)
    showToast("Annotasiya yadda saxlanıldı")
  }

  const filtered = useMemo(() => {
    let list = projects

    // Tab filter
    if (activeTab === "suspended") {
      list = list.filter((p) => p.status === "Dayandırılmış")
    } else {
      list = list.filter((p) => p.status !== "Dayandırılmış")
    }

    // Status filter
    if (statusFilter !== "all") {
      if (statusFilter === "tech-passed") {
        list = list.filter((p) => p.techExpertise)
      } else if (statusFilter === "suspended") {
        list = list.filter((p) => p.status === "Dayandırılmış")
      }
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.field.toLowerCase().includes(q)
      )
    }

    return list
  }, [projects, search, statusFilter, activeTab])

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-in slide-in-from-bottom-2">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.push("/admin/dashboard")} className="mt-1 p-1.5">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <p className="text-sm text-muted-foreground">Müsabiqələrə qayıt</p>
          <h1 className="text-2xl font-bold text-foreground">Ekspertiza — {competitionName}</h1>
        </div>
      </div>

      {/* Expert Notification */}
      {expertNotificationVisible && expertSelectionData && (
        <Alert className="bg-blue-50 border-blue-200">
          <Bell className="h-4 w-4 text-blue-600" />
          <AlertDescription>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="font-medium text-blue-900">
                  Ekspert Fuad Məmmədov seçimlərini göndərdi
                </p>
                <p className="text-sm text-blue-700">Tarix: {expertSelectionData.sentAt}</p>
                <p className="text-sm text-blue-700">
                  Seçilmiş layihələr: {expertSelectionData.selectedProjects.join(", ")}
                </p>
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 mt-1">
                  Göndərildi
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="p-1 h-auto"
                onClick={() => setExpertNotificationVisible(false)}
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <div className="flex gap-1 border-b">
        <button
          onClick={() => setActiveTab("prepare")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
            activeTab === "prepare"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Ekspertlər üçün hazırlamaq
        </button>
        <button
          onClick={() => setActiveTab("suspended")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
            activeTab === "suspended"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          İştirakı dayandırılmış layihələr
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
          <Input
            placeholder="Açar sözə görə axtar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Hamısı</SelectItem>
            <SelectItem value="tech-passed">Texniki keçib</SelectItem>
            <SelectItem value="suspended">Dayandırılmış</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects Table */}
      <Card>
        <CardContent className="pt-6">
          {/* Desktop */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Layihənin adı</TableHead>
                  <TableHead>Elm sahəsi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Texniki ekspertiza</TableHead>
                  <TableHead className="text-right">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium max-w-[300px]">{project.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{project.field}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(project.status)}</TableCell>
                    <TableCell>
                      {project.techExpertise ? (
                        <span className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium">
                          <CheckCircle className="h-4 w-4" /> Keçib
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-red-500 text-sm font-medium">
                          <XCircle className="h-4 w-4" /> Keçməyib
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/competitions/${id}/project/${project.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              Layihəyə baxış
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setDocsOpen(true)}>
                            <FileText className="h-4 w-4 mr-2" />
                            Sənədlərin siyahısı
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleTechExpertise(project.id)}>
                            {project.techExpertise ? (
                              <><XCircle className="h-4 w-4 mr-2" />Texniki ekspertizadan keçməyib</>
                            ) : (
                              <><CheckCircle className="h-4 w-4 mr-2" />Texniki ekspertizadan keçib</>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openAnnotation(project.id)}>
                            <StickyNote className="h-4 w-4 mr-2" />
                            Annotasiya
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      Nəticə tapılmadı.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-3">
            {filtered.map((project) => (
              <div key={project.id} className="p-4 border rounded-lg space-y-3">
                <p className="font-medium text-sm">{project.name}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{project.field}</Badge>
                  {getStatusBadge(project.status)}
                  {project.techExpertise ? (
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">Keçib</Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100">Keçməyib</Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs" asChild>
                    <Link href={`/admin/competitions/${id}/project/${project.id}`}>Baxış</Link>
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs" onClick={() => toggleTechExpertise(project.id)}>
                    Toggle texniki
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs" onClick={() => openAnnotation(project.id)}>
                    Annotasiya
                  </Button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">Nəticə tapılmadı.</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Annotation Modal */}
      <Dialog open={annotationOpen} onOpenChange={setAnnotationOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Annotasiya</DialogTitle>
          </DialogHeader>
          <Textarea
            value={annotationText}
            onChange={(e) => setAnnotationText(e.target.value)}
            placeholder="Annotasiya daxil edin..."
            rows={5}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setAnnotationOpen(false)}>Ləğv et</Button>
            <Button onClick={saveAnnotation} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Yadda saxla
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Documents Modal */}
      <Dialog open={docsOpen} onOpenChange={setDocsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Layihəyə aid sənədlər</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sənədin adı</TableHead>
                <TableHead>İmzalayan</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Tarix</TableHead>
                <TableHead className="text-right">Əməliyyat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentsData.map((doc, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell className="text-muted-foreground">{doc.signer}</TableCell>
                  <TableCell>{getFormatBadge(doc.format)}</TableCell>
                  <TableCell className="text-muted-foreground">{doc.date}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" onClick={() => alert(`Sənəd yüklənir: ${doc.name}`)}>
                      Sənədə baxış
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end pt-2">
            <Button variant="outline" onClick={() => setDocsOpen(false)}>Bağla</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
