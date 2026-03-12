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
import { Search, Eye, Send, FileText, Download, Users, ClipboardList, AlertCircle, CheckCircle, XCircle, FileCheck } from "lucide-react"

interface Competition {
  id: string
  name: string
  code: string
  startDate: string
  endDate: string
}

interface Application {
  id: string
  leaderName: string
  projectName: string
  signDate: string
  participants: { name: string; surname: string; fatherName: string; role: string }[]
}

interface Project {
  id: string
  leaderName: string
  projectName: string
  annotation: string
  scienceField: string
  status: string
}

interface StoppedProject {
  id: string
  leaderName: string
  projectName: string
  status: string
}

interface ExpertReview {
  id: string
  expertName: string
  projectName: string
  reviewDate: string
  content: string
}

interface Document {
  id: string
  name: string
  signedBy: string
  signDate: string
  format: string
  type: string
}

const projectStatuses = [
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
  const [activeTab, setActiveTab] = useState("competitions")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Competitions
  const [competitions] = useState<Competition[]>([
    { id: "1", name: "Fundamental Elmi Tədqiqatlar - 2024", code: "FET-2024", startDate: "2024-01-15", endDate: "2024-06-30" },
    { id: "2", name: "Tətbiqi Tədqiqatlar Qrantı - 2024", code: "TET-2024", startDate: "2024-03-01", endDate: "2024-09-30" },
  ])
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null)

  // Applications
  const [applications] = useState<Application[]>([
    { id: "1", leaderName: "Elşən Məmmədov", projectName: "Süni intellekt tətbiqləri", signDate: "2024-02-15", participants: [
      { name: "Elşən", surname: "Məmmədov", fatherName: "Rəşid", role: "Layihə rəhbəri" },
      { name: "Günel", surname: "Əliyeva", fatherName: "Əli", role: "İştirakçı" },
    ]},
    { id: "2", leaderName: "Orxan Həsənov", projectName: "Kvant hesablamaları", signDate: "2024-02-20", participants: [
      { name: "Orxan", surname: "Həsənov", fatherName: "Fəxrəddin", role: "Layihə rəhbəri" },
    ]},
  ])
  const [participantsDialogOpen, setParticipantsDialogOpen] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)

  // Projects for expertise
  const [projects, setProjects] = useState<Project[]>([
    { id: "1", leaderName: "Elşən Məmmədov", projectName: "Süni intellekt tətbiqləri", annotation: "Bu layihə süni intellekt sahəsində yeni alqoritmlərin işlənməsini nəzərdə tutur.", scienceField: "İnformatika", status: "Təsdiq olunub" },
    { id: "2", leaderName: "Orxan Həsənov", projectName: "Kvant hesablamaları", annotation: "", scienceField: "Fizika", status: "Kağız versiya təqdim olunmayıb" },
    { id: "3", leaderName: "Günel Əliyeva", projectName: "Nano materiallar", annotation: "Nano ölçülü materialların xassələrinin tədqiqi.", scienceField: "Kimya", status: "Texniki ekspertizadan keçib" },
  ])

  // Experts for sending
  const [experts] = useState([
    { id: "1", name: "Dr. Kamil Əliyev", field: "İnformatika" },
    { id: "2", name: "Prof. Rəna Hüseynova", field: "Fizika" },
    { id: "3", name: "Dr. Nigar Məmmədova", field: "Kimya" },
  ])
  const [sendToExpertDialogOpen, setSendToExpertDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedExpert, setSelectedExpert] = useState<string>("")

  // Documents
  const [documents] = useState<Document[]>([
    { id: "1", name: "Ərizə forması", signedBy: "Elşən Məmmədov", signDate: "2024-02-15", format: "PDF", type: "Ərizə" },
    { id: "2", name: "Layihə planı", signedBy: "Elşən Məmmədov", signDate: "2024-02-15", format: "PDF", type: "Anket" },
  ])
  const [documentsDialogOpen, setDocumentsDialogOpen] = useState(false)

  // Stopped projects
  const [stoppedProjects] = useState<StoppedProject[]>([
    { id: "1", leaderName: "Vüqar Qasımov", projectName: "Ekoloji tədqiqatlar", status: "İştirakı dayandırılıb" },
  ])

  // Expert reviews
  const [expertReviews] = useState<ExpertReview[]>([
    { id: "1", expertName: "Dr. Kamil Əliyev", projectName: "Süni intellekt tətbiqləri", reviewDate: "2024-03-10", content: "Layihə elmi cəhətdən əsaslıdır və yüksək potensiala malikdir. Metodologiya düzgün seçilmişdir." },
  ])
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState<ExpertReview | null>(null)

  // Status change dialog
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState<string>("")

  // Summary info for selected competition
  const summaryInfo = {
    totalApplications: 45,
    totalParticipants: 120,
    approvedProjects: 30,
    approvedParticipants: 85,
    currentPhase: "Texniki ekspertiza",
    phaseStartDate: "2024-03-01",
    phaseEndDate: "2024-04-15",
  }

  const openParticipants = (app: Application) => {
    setSelectedApplication(app)
    setParticipantsDialogOpen(true)
  }

  const openSendToExpert = (project: Project) => {
    setSelectedProject(project)
    setSelectedExpert("")
    setSendToExpertDialogOpen(true)
  }

  const openDocuments = (project: Project) => {
    setSelectedProject(project)
    setDocumentsDialogOpen(true)
  }

  const openStatusChange = (project: Project) => {
    setSelectedProject(project)
    setNewStatus(project.status)
    setStatusDialogOpen(true)
  }

  const handleStatusChange = () => {
    if (selectedProject && newStatus) {
      setProjects(projects.map(p => p.id === selectedProject.id ? { ...p, status: newStatus } : p))
    }
    setStatusDialogOpen(false)
  }

  const handleSendToExpert = () => {
    // In real app, this would send to backend
    setSendToExpertDialogOpen(false)
  }

  const openReview = (review: ExpertReview) => {
    setSelectedReview(review)
    setReviewDialogOpen(true)
  }

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.projectName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.leaderName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Ekspertiza</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 max-w-3xl">
          <TabsTrigger value="competitions" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">Müsabiqələr</span>
          </TabsTrigger>
          <TabsTrigger value="prepare" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Hazırla</span>
          </TabsTrigger>
          <TabsTrigger value="stopped" className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Dayandırılmış</span>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Ekspert rəyi</span>
          </TabsTrigger>
        </TabsList>

        {/* Competitions Tab */}
        <TabsContent value="competitions" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Qrant müsabiqələri</CardTitle>
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
                      <TableCell>{comp.code}</TableCell>
                      <TableCell>{comp.startDate}</TableCell>
                      <TableCell>{comp.endDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => setSelectedCompetition(comp)}>
                            <Users className="h-4 w-4 mr-1" />
                            Müraciətlər
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => { setSelectedCompetition(comp); setActiveTab("prepare") }}>
                            <Send className="h-4 w-4 mr-1" />
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

          {/* Applications for selected competition */}
          {selectedCompetition && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Müraciətlər - {selectedCompetition.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedCompetition(null)}>
                    <XCircle className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Layihə rəhbərinin adı</TableHead>
                      <TableHead>Layihənin adı</TableHead>
                      <TableHead>İmzalama tarixi</TableHead>
                      <TableHead className="text-right">Əməliyyatlar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.leaderName}</TableCell>
                        <TableCell>{app.projectName}</TableCell>
                        <TableCell>{app.signDate}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => openParticipants(app)}>
                            <Users className="h-4 w-4 mr-1" />
                            İştirakçılara bax
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Prepare for Experts Tab */}
        <TabsContent value="prepare" className="mt-6 space-y-6">
          {/* Summary Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Ümumi müraciət sayı</p>
                  <p className="text-2xl font-bold">{summaryInfo.totalApplications} layihə / {summaryInfo.totalParticipants} nəfər</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Təsdiqlənmiş layihələr</p>
                  <p className="text-2xl font-bold">{summaryInfo.approvedProjects} layihə / {summaryInfo.approvedParticipants} nəfər</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Cari mərhələ</p>
                  <p className="text-lg font-bold">{summaryInfo.currentPhase}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Mərhələ tarixləri</p>
                  <p className="text-lg font-bold">{summaryInfo.phaseStartDate} - {summaryInfo.phaseEndDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Açar sözlə axtar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-64">
                    <SelectValue placeholder="Status üzrə filtr" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Hamısı</SelectItem>
                    {projectStatuses.map((status) => (
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
              <CardTitle>Ekspertlər üçün hazırlamaq</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Layihə rəhbəri</TableHead>
                    <TableHead>Layihənin adı</TableHead>
                    <TableHead>Annotasiya</TableHead>
                    <TableHead>Elm sahəsi</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Əməliyyatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project, index) => (
                    <TableRow key={project.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{project.leaderName}</TableCell>
                      <TableCell>{project.projectName}</TableCell>
                      <TableCell className="max-w-[200px]">
                        {project.annotation ? (
                          <span className="truncate block">{project.annotation}</span>
                        ) : (
                          <span className="text-muted-foreground flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            Annotasiya yoxdur
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{project.scienceField}</TableCell>
                      <TableCell>
                        <Badge variant={project.status.includes("keçib") || project.status === "Təsdiq olunub" ? "default" : "secondary"}>
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Select onValueChange={(value) => {
                          if (value === "view") {
                            // View project - read only
                          } else if (value === "sendExpert") {
                            openSendToExpert(project)
                          } else if (value === "documents") {
                            openDocuments(project)
                          } else if (value === "changeStatus") {
                            openStatusChange(project)
                          }
                        }}>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Əməliyyat" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="view">Layihəyə baxış</SelectItem>
                            <SelectItem value="sendExpert">Ekspertə göndər</SelectItem>
                            <SelectItem value="documents">Sənədlər siyahısı</SelectItem>
                            <SelectItem value="changeStatus">Statusu dəyiş</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stopped Projects Tab */}
        <TabsContent value="stopped" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>İştirakı dayandırılmış layihələr</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Axtar..." className="pl-9" />
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Layihə rəhbəri</TableHead>
                    <TableHead>Layihənin adı</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Əməliyyatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stoppedProjects.map((project, index) => (
                    <TableRow key={project.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{project.leaderName}</TableCell>
                      <TableCell>{project.projectName}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">{project.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
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

        {/* Expert Reviews Tab */}
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Ekspert rəyləri</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ekspert</TableHead>
                    <TableHead>Layihə</TableHead>
                    <TableHead>Rəy tarixi</TableHead>
                    <TableHead className="text-right">Əməliyyatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expertReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell className="font-medium">{review.expertName}</TableCell>
                      <TableCell>{review.projectName}</TableCell>
                      <TableCell>{review.reviewDate}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => openReview(review)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Rəyə bax
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

      {/* Participants Dialog */}
      <Dialog open={participantsDialogOpen} onOpenChange={setParticipantsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Layihə üzvləri</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">{selectedApplication.projectName}</p>
                <p className="text-sm text-muted-foreground">{selectedApplication.leaderName}</p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ad</TableHead>
                    <TableHead>Soyad</TableHead>
                    <TableHead>Ata adı</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedApplication.participants.map((p, index) => (
                    <TableRow key={index}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.surname}</TableCell>
                      <TableCell>{p.fatherName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{p.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setParticipantsDialogOpen(false)}>Bağla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send to Expert Dialog */}
      <Dialog open={sendToExpertDialogOpen} onOpenChange={setSendToExpertDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ekspertə göndər</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">{selectedProject.projectName}</p>
                <p className="text-sm text-muted-foreground">{selectedProject.leaderName}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Ekspert seçin</label>
                <Select value={selectedExpert} onValueChange={setSelectedExpert}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ekspert seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {experts.map((expert) => (
                      <SelectItem key={expert.id} value={expert.id}>
                        {expert.name} ({expert.field})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSendToExpertDialogOpen(false)}>İmtina</Button>
            <Button onClick={handleSendToExpert} disabled={!selectedExpert}>Göndər</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Documents Dialog */}
      <Dialog open={documentsDialogOpen} onOpenChange={setDocumentsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Sənədlər siyahısı</DialogTitle>
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
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>{doc.signedBy}</TableCell>
                  <TableCell>{doc.signDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{doc.format}</Badge>
                  </TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
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
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Layihənin statusunu dəyiş</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">{selectedProject.projectName}</p>
                <p className="text-sm text-muted-foreground">Cari status: {selectedProject.status}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Yeni status</label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectStatuses.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusDialogOpen(false)}>İmtina</Button>
            <Button onClick={handleStatusChange}>Təsdiq et</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Expert Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ekspert rəyi</DialogTitle>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Ekspert</p>
                  <p className="font-medium">{selectedReview.expertName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tarix</p>
                  <p className="font-medium">{selectedReview.reviewDate}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Layihə</p>
                <p className="font-medium">{selectedReview.projectName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Rəy məzmunu</p>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm">{selectedReview.content}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>Bağla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
