"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Trophy, Users, ClipboardCheck, Eye, FileText, Download, Search, 
  MoreHorizontal, Send, FileStack, Edit, MessageSquare, AlertTriangle,
  Calendar, Briefcase, ChevronRight
} from "lucide-react"

interface Competition {
  id: string
  name: string
  code: string
  startDate: string
  endDate: string
}

interface Project {
  id: string
  orderNumber: number
  leaderName: string
  projectName: string
  annotation: string
  scienceField: string
  status: string
  signDate: string
  participants: { name: string; surname: string; fatherName: string; role: string }[]
}

interface Document {
  id: string
  name: string
  signedBy: string
  signDate: string
  format: string
  type: string
}

interface Expert {
  id: string
  name: string
  surname: string
  email: string
  expertise: string
}

const projectStatuses = [
  "Təsdiq olunmayan versiya",
  "Təsdiq olunan versiya",
  "Kağız versiya təqdim olunmayıb",
  "Təsdiq olunub",
  "Texniki ekspertizadan keçib",
  "Texniki ekspertizadan keçməyib",
  "Elmi ekspertizadan keçib",
  "Elmi ekspertizadan keçməyib"
]

const stoppedProjectStatuses = [
  "İştirakı dayandırılıb",
  "Geri çəkilib",
  "Ləğv edilib"
]

export default function EkspertizaCompetitionsPage() {
  const [competitions] = useState<Competition[]>([
    { id: "1", name: "Fundamental Elmi Tədqiqatlar - 2024", code: "FET-2024", startDate: "2024-01-15", endDate: "2024-06-30" },
    { id: "2", name: "Tətbiqi Tədqiqatlar Qrantı - 2024", code: "TET-2024", startDate: "2024-03-01", endDate: "2024-09-30" },
    { id: "3", name: "Gənc Alimlər Proqramı - 2024", code: "GAP-2024", startDate: "2024-02-01", endDate: "2024-08-31" },
  ])

  const [projects, setProjects] = useState<Project[]>([
    { 
      id: "1", 
      orderNumber: 1,
      leaderName: "Elşən Məmmədov", 
      projectName: "Süni intellekt tətbiqləri", 
      annotation: "Bu layihə süni intellekt texnologiyalarının müxtəlif sahələrdə tətbiqi ilə bağlı fundamental tədqiqatları əhatə edir.",
      scienceField: "İnformasiya texnologiyaları",
      status: "Təsdiq olunub",
      signDate: "2024-02-15", 
      participants: [
        { name: "Elşən", surname: "Məmmədov", fatherName: "Rəşid", role: "Layihə rəhbəri" },
        { name: "Günel", surname: "Əliyeva", fatherName: "Əli", role: "Tədqiqatçı" },
        { name: "Orxan", surname: "Həsənov", fatherName: "Fəxrəddin", role: "Laborant" },
      ]
    },
    { 
      id: "2", 
      orderNumber: 2,
      leaderName: "Orxan Həsənov", 
      projectName: "Kvant hesablamaları", 
      annotation: "Kvant kompüter sistemlərinin inkişafı və tətbiqi sahəsində innovativ yanaşmalar.",
      scienceField: "Fizika",
      status: "Texniki ekspertizadan keçib",
      signDate: "2024-02-20", 
      participants: [
        { name: "Orxan", surname: "Həsənov", fatherName: "Fəxrəddin", role: "Layihə rəhbəri" },
        { name: "Nigar", surname: "Rəhimova", fatherName: "Kamil", role: "Tədqiqatçı" },
      ]
    },
    { 
      id: "3", 
      orderNumber: 3,
      leaderName: "Aytən Nəsirli", 
      projectName: "Nano materiallar tədqiqi", 
      annotation: "",
      scienceField: "Kimya",
      status: "Gözlənilir",
      signDate: "2024-02-22", 
      participants: [
        { name: "Aytən", surname: "Nəsirli", fatherName: "Vüqar", role: "Layihə rəhbəri" },
      ]
    },
  ])

  const [stoppedProjects] = useState<Project[]>([
    { 
      id: "4", 
      orderNumber: 1,
      leaderName: "Kamil Əliyev", 
      projectName: "Bərpa olunan enerji", 
      annotation: "Günəş enerjisi panellərinin effektivliyinin artırılması.",
      scienceField: "Enerji",
      status: "İştirakı dayandırılıb",
      signDate: "2024-01-10", 
      participants: []
    },
    { 
      id: "5", 
      orderNumber: 2,
      leaderName: "Sara Məmmədova", 
      projectName: "Biotexnoloji tədqiqatlar", 
      annotation: "Gen mühəndisliyi sahəsində yeni metodlar.",
      scienceField: "Biologiya",
      status: "Geri çəkilib",
      signDate: "2024-01-15", 
      participants: []
    },
  ])

  const [documents] = useState<Document[]>([
    { id: "1", name: "DOC-2024-001", signedBy: "Elşən Məmmədov", signDate: "2024-02-15", format: "PDF", type: "Ərizə" },
    { id: "2", name: "DOC-2024-002", signedBy: "Elşən Məmmədov", signDate: "2024-02-15", format: "PDF", type: "Layihə planı" },
    { id: "3", name: "DOC-2024-003", signedBy: "Günel Əliyeva", signDate: "2024-02-16", format: "PDF", type: "CV" },
  ])

  const [experts] = useState<Expert[]>([
    { id: "1", name: "Elnur", surname: "Akbarov", email: "elnur@example.com", expertise: "Süni Zeka" },
    { id: "2", name: "Ayşe", surname: "Hasanova", email: "ayse@example.com", expertise: "Kənd Təsərrüfatı" },
    { id: "3", name: "Rəfail", surname: "Məmmədov", email: "refail@example.com", expertise: "Enerji" },
    { id: "4", name: "Leyla", surname: "Quliyeva", email: "leyla@example.com", expertise: "Fizika" },
  ])

  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null)
  const [showCompetitionDetail, setShowCompetitionDetail] = useState(false)
  const [activeTab, setActiveTab] = useState("projects")
  
  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  
  // Dialog States
  const [projectViewDialogOpen, setProjectViewDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  
  const [documentsDialogOpen, setDocumentsDialogOpen] = useState(false)
  
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState("")
  
  const [sendToExpertDialogOpen, setSendToExpertDialogOpen] = useState(false)
  const [selectedExperts, setSelectedExperts] = useState<string[]>([])
  
  const [expertOpinionDialogOpen, setExpertOpinionDialogOpen] = useState(false)
  
  const [participantsDialogOpen, setParticipantsDialogOpen] = useState(false)

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.leaderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.annotation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.scienceField.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredStoppedProjects = stoppedProjects.filter(project => {
    const matchesSearch = project.leaderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const openCompetitionDetail = (comp: Competition) => {
    setSelectedCompetition(comp)
    setShowCompetitionDetail(true)
    setActiveTab("projects")
  }

  const openProjectView = (project: Project) => {
    setSelectedProject(project)
    setProjectViewDialogOpen(true)
  }

  const openDocuments = (project: Project) => {
    setSelectedProject(project)
    setDocumentsDialogOpen(true)
  }

  const openStatusChange = (project: Project) => {
    setSelectedProject(project)
    setNewStatus(project.status)
    setStatusChangeDialogOpen(true)
  }

  const openSendToExpert = (project: Project) => {
    setSelectedProject(project)
    setSelectedExperts([])
    setSendToExpertDialogOpen(true)
  }

  const openExpertOpinion = (project: Project) => {
    setSelectedProject(project)
    setExpertOpinionDialogOpen(true)
  }

  const openParticipants = (project: Project) => {
    setSelectedProject(project)
    setParticipantsDialogOpen(true)
  }

  const handleStatusChange = () => {
    if (selectedProject && newStatus) {
      setProjects(projects.map(p => 
        p.id === selectedProject.id ? { ...p, status: newStatus } : p
      ))
      setStatusChangeDialogOpen(false)
    }
  }

  const handleSendToExperts = () => {
    // Mock sending to experts
    console.log("Sending project to experts:", selectedExperts)
    setSendToExpertDialogOpen(false)
    setSelectedExperts([])
  }

  const toggleExpertSelection = (expertId: string) => {
    setSelectedExperts(prev => 
      prev.includes(expertId) 
        ? prev.filter(id => id !== expertId)
        : [...prev, expertId]
    )
  }

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      "Təsdiq olunmayan versiya": "bg-gray-100 text-gray-700",
      "Təsdiq olunan versiya": "bg-blue-100 text-blue-700",
      "Kağız versiya təqdim olunmayıb": "bg-amber-100 text-amber-700",
      "Təsdiq olunub": "bg-emerald-100 text-emerald-700",
      "Texniki ekspertizadan keçib": "bg-green-100 text-green-700",
      "Texniki ekspertizadan keçməyib": "bg-red-100 text-red-700",
      "Elmi ekspertizadan keçib": "bg-teal-100 text-teal-700",
      "Elmi ekspertizadan keçməyib": "bg-rose-100 text-rose-700",
      "Gözlənilir": "bg-yellow-100 text-yellow-700",
      "İştirakı dayandırılıb": "bg-red-100 text-red-700",
      "Geri çəkilib": "bg-gray-100 text-gray-700",
      "Ləğv edilib": "bg-red-100 text-red-700",
    }
    return <Badge className={statusColors[status] || "bg-gray-100 text-gray-700"}>{status}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-blue-50">
          <Trophy className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Qrant müsabiqələri</h1>
          <p className="text-sm text-muted-foreground">Müsabiqələri və müraciətləri idarə edin</p>
        </div>
      </div>

      {!showCompetitionDetail ? (
        /* Competitions Table */
        <Card>
          <CardHeader>
            <CardTitle>Müsabiqələr siyahısı</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Müsabiqənin adı</TableHead>
                  <TableHead>Kod</TableHead>
                  <TableHead>Başlama tarixi</TableHead>
                  <TableHead>Bitmə tarixi</TableHead>
                  <TableHead className="text-right">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitions.map((comp) => (
                  <TableRow key={comp.id}>
                    <TableCell className="font-medium">{comp.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{comp.code}</Badge>
                    </TableCell>
                    <TableCell>{comp.startDate}</TableCell>
                    <TableCell>{comp.endDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => openCompetitionDetail(comp)}>
                          <Users className="h-4 w-4 mr-1" />
                          Müraciətlər
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => {
                          setSelectedCompetition(comp)
                          setShowCompetitionDetail(true)
                          setActiveTab("expertise")
                        }}>
                          <ClipboardCheck className="h-4 w-4 mr-1" />
                          Ekspertiza
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        /* Competition Detail View */
        <div className="space-y-6">
          {/* Back Button and Competition Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" onClick={() => setShowCompetitionDetail(false)}>
                    <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
                    Geri
                  </Button>
                  <div className="h-8 w-px bg-border" />
                  <div>
                    <h2 className="font-semibold">{selectedCompetition?.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedCompetition?.startDate} - {selectedCompetition?.endDate}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-base px-3 py-1">
                  {selectedCompetition?.code}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="projects">Layihələr</TabsTrigger>
              <TabsTrigger value="expertise">Ekspertiza</TabsTrigger>
              <TabsTrigger value="stopped">İştirakı dayandırılmış layihələr</TabsTrigger>
            </TabsList>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-4">
              {/* Search and Filter */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Layihə adı, rəhbər, annotasiya üzrə axtarış..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Status üzrə filtr" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Bütün statuslar</SelectItem>
                        {projectStatuses.map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Projects Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Layihələr siyahısı ({filteredProjects.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60px]">Sıra</TableHead>
                        <TableHead>Layihə rəhbərinin adı</TableHead>
                        <TableHead>Layihənin adı</TableHead>
                        <TableHead className="max-w-[200px]">Annotasiya</TableHead>
                        <TableHead>Elm sahəsi</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Əməliyyatlar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProjects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell>{project.orderNumber}</TableCell>
                          <TableCell className="font-medium">{project.leaderName}</TableCell>
                          <TableCell>{project.projectName}</TableCell>
                          <TableCell className="max-w-[200px]">
                            <p className="truncate text-sm text-muted-foreground">
                              {project.annotation || "Annotasiya yoxdur"}
                            </p>
                          </TableCell>
                          <TableCell>{project.scienceField}</TableCell>
                          <TableCell>{getStatusBadge(project.status)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuItem onClick={() => openProjectView(project)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Layihəyə baxış
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => openParticipants(project)}>
                                  <Users className="h-4 w-4 mr-2" />
                                  İştirakçılara bax
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => openSendToExpert(project)}>
                                  <Send className="h-4 w-4 mr-2" />
                                  Ekspertə göndər
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => openDocuments(project)}>
                                  <FileStack className="h-4 w-4 mr-2" />
                                  Sənədlərin siyahısı
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => openStatusChange(project)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Statusu dəyiş
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => openExpertOpinion(project)}>
                                  <MessageSquare className="h-4 w-4 mr-2" />
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
            </TabsContent>

            {/* Expertise Tab */}
            <TabsContent value="expertise" className="space-y-4">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-50">
                        <Briefcase className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Ümumi müraciət sayı</p>
                        <p className="text-xl font-bold">12 layihə / 45 nəfər</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-50">
                        <ClipboardCheck className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Təsdiqlənmiş layihələr</p>
                        <p className="text-xl font-bold">8 layihə / 32 nəfər</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-50">
                        <Calendar className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cari mərhələ</p>
                        <p className="text-lg font-semibold">Texniki ekspertiza</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-50">
                        <Calendar className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Mərhələ tarixləri</p>
                        <p className="text-sm font-medium">15 Mart - 30 Aprel 2024</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Competition Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-blue-600" />
                    {selectedCompetition?.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Elan tarixi: </span>
                      <span className="font-medium">{selectedCompetition?.startDate} - {selectedCompetition?.endDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Projects for Expertise */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Ekspertizaya göndəriləcək layihələr</CardTitle>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4 mr-2" />
                    Seçilənləri ekspertlərə göndər
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox />
                        </TableHead>
                        <TableHead>Layihə adı</TableHead>
                        <TableHead>Layihə rəhbəri</TableHead>
                        <TableHead>Elm sahəsi</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Əməliyyatlar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects.filter(p => p.status === "Təsdiq olunub" || p.status === "Texniki ekspertizadan keçib").map((project) => (
                        <TableRow key={project.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell className="font-medium">{project.projectName}</TableCell>
                          <TableCell>{project.leaderName}</TableCell>
                          <TableCell>{project.scienceField}</TableCell>
                          <TableCell>{getStatusBadge(project.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="sm" onClick={() => openProjectView(project)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => openSendToExpert(project)}>
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Stopped Projects Tab */}
            <TabsContent value="stopped" className="space-y-4">
              {/* Search and Filter */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Açar sözlə axtarış..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Status üzrə filtr" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Bütün statuslar</SelectItem>
                        {stoppedProjectStatuses.map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Stopped Projects Table */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <CardTitle>İştirakı dayandırılmış layihələr ({filteredStoppedProjects.length})</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60px]">Sıra</TableHead>
                        <TableHead>Layihə rəhbərinin adı</TableHead>
                        <TableHead>Layihənin adı</TableHead>
                        <TableHead>Layihənin statusu</TableHead>
                        <TableHead className="text-right">Əməliyyatlar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStoppedProjects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell>{project.orderNumber}</TableCell>
                          <TableCell className="font-medium">{project.leaderName}</TableCell>
                          <TableCell>{project.projectName}</TableCell>
                          <TableCell>{getStatusBadge(project.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => openProjectView(project)}>
                              <Eye className="h-4 w-4 mr-1" />
                              Baxış
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
        </div>
      )}

      {/* Project View Dialog */}
      <Dialog open={projectViewDialogOpen} onOpenChange={setProjectViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Layihəyə baxış (Read-only)</DialogTitle>
            <DialogDescription>Layihə haqqında ətraflı məlumat</DialogDescription>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Layihənin adı</p>
                  <p className="font-medium">{selectedProject.projectName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Elm sahəsi</p>
                  <p className="font-medium">{selectedProject.scienceField}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Layihə rəhbəri</p>
                  <p className="font-medium">{selectedProject.leaderName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedProject.status)}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Annotasiya</p>
                <Card>
                  <CardContent className="p-3">
                    <p className="text-sm">{selectedProject.annotation || "Annotasiya yoxdur"}</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">İştirakçılar ({selectedProject.participants.length} nəfər)</p>
                <div className="space-y-2">
                  {selectedProject.participants.map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                      <span>{p.name} {p.surname}</span>
                      <Badge variant="outline">{p.role}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setProjectViewDialogOpen(false)}>Bağla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Participants Dialog */}
      <Dialog open={participantsDialogOpen} onOpenChange={setParticipantsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Layihə iştirakçıları</DialogTitle>
            <DialogDescription>{selectedProject?.projectName}</DialogDescription>
          </DialogHeader>
          {selectedProject && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ad</TableHead>
                  <TableHead>Soyad</TableHead>
                  <TableHead>Ata adı</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead className="text-right">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedProject.participants.map((p, index) => (
                  <TableRow key={index}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.surname}</TableCell>
                    <TableCell>{p.fatherName}</TableCell>
                    <TableCell>
                      <Badge variant={p.role === "Layihə rəhbəri" ? "default" : "secondary"}>
                        {p.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Ətraflı
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setParticipantsDialogOpen(false)}>Bağla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Documents Dialog */}
      <Dialog open={documentsDialogOpen} onOpenChange={setDocumentsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Sənədlərin siyahısı</DialogTitle>
            <DialogDescription>Müsabiqə üzrə ərizə və anketlər</DialogDescription>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>İmzalanmış sənədlər</TableHead>
                <TableHead>İmzalamış şəxs</TableHead>
                <TableHead>İmzalama tarixi</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Sənədin növü</TableHead>
                <TableHead className="text-right">Əməliyyatlar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-mono text-sm">{doc.name}</TableCell>
                  <TableCell>{doc.signedBy}</TableCell>
                  <TableCell>{doc.signDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{doc.format}</Badge>
                  </TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" title="Sənədə bax">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Sənədi yüklə">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDocumentsDialogOpen(false)}>Bağla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Change Dialog */}
      <Dialog open={statusChangeDialogOpen} onOpenChange={setStatusChangeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Layihənin statusunu dəyiş</DialogTitle>
            <DialogDescription>{selectedProject?.projectName}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status seçin" />
              </SelectTrigger>
              <SelectContent>
                {projectStatuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusChangeDialogOpen(false)}>Ləğv et</Button>
            <Button onClick={handleStatusChange} className="bg-blue-600 hover:bg-blue-700">Yadda saxla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send to Expert Dialog */}
      <Dialog open={sendToExpertDialogOpen} onOpenChange={setSendToExpertDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ekspertə göndər</DialogTitle>
            <DialogDescription>Layihəni qiymətləndirmək üçün ekspert seçin</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-3">Layihə: <span className="font-medium text-foreground">{selectedProject?.projectName}</span></p>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {experts.map(expert => (
                <div 
                  key={expert.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedExperts.includes(expert.id) ? 'border-blue-500 bg-blue-50' : 'border-border hover:bg-muted/50'
                  }`}
                  onClick={() => toggleExpertSelection(expert.id)}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox checked={selectedExperts.includes(expert.id)} />
                    <div>
                      <p className="font-medium">{expert.name} {expert.surname}</p>
                      <p className="text-sm text-muted-foreground">{expert.email}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{expert.expertise}</Badge>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSendToExpertDialogOpen(false)}>Ləğv et</Button>
            <Button 
              onClick={handleSendToExperts} 
              disabled={selectedExperts.length === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4 mr-2" />
              Göndər ({selectedExperts.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Expert Opinion Dialog */}
      <Dialog open={expertOpinionDialogOpen} onOpenChange={setExpertOpinionDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ekspertin rəyi</DialogTitle>
            <DialogDescription>{selectedProject?.projectName}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Bu layihəyə hələ ekspert rəyi bildirilməyib</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExpertOpinionDialogOpen(false)}>Bağla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
