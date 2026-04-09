"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Search, Eye, Send, CheckCircle, XCircle, Clock, 
  ClipboardCheck, Briefcase, Calendar, Users, MessageSquare 
} from "lucide-react"

interface Expert {
  id: string
  name: string
  surname: string
  email: string
  fin: string
  expertise: string
  submissionDate: string
  status: "pending" | "approved" | "rejected"
  assignedProjects: number
}

interface Project {
  id: string
  name: string
  leader: string
  scienceField: string
  status: string
}

export default function ExpertisePage() {
  const [experts, setExperts] = useState<Expert[]>([
    {
      id: "1",
      name: "Elnur",
      surname: "Akbarov",
      email: "elnur.akbarov@example.com",
      fin: "1234567890",
      expertise: "Süni Zeka, Məlumat Elmi",
      submissionDate: "2024-01-15",
      status: "approved",
      assignedProjects: 3,
    },
    {
      id: "2",
      name: "Ayşe",
      surname: "Hasanova",
      email: "ayse.hasanova@example.com",
      fin: "0987654321",
      expertise: "Kənd Təsərrüfatı, Əkinçilik",
      submissionDate: "2024-01-20",
      status: "approved",
      assignedProjects: 2,
    },
    {
      id: "3",
      name: "Rəfail",
      surname: "Məmmədov",
      email: "refail.mammadov@example.com",
      fin: "5555555555",
      expertise: "Enerji, Elektrik Mühəndisliyi",
      submissionDate: "2024-01-10",
      status: "approved",
      assignedProjects: 4,
    },
    {
      id: "4",
      name: "Leyla",
      surname: "Quliyeva",
      email: "leyla.quliyeva@example.com",
      fin: "7777777777",
      expertise: "Fizika, Kvant mexanikası",
      submissionDate: "2024-01-25",
      status: "pending",
      assignedProjects: 0,
    },
  ])

  const [projects] = useState<Project[]>([
    { id: "1", name: "Süni intellekt tətbiqləri", leader: "Elşən Məmmədov", scienceField: "İT", status: "Gözlənilir" },
    { id: "2", name: "Kvant hesablamaları", leader: "Orxan Həsənov", scienceField: "Fizika", status: "Ekspertizada" },
    { id: "3", name: "Nano materiallar tədqiqi", leader: "Aytən Nəsirli", scienceField: "Kimya", status: "Gözlənilir" },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [assignProjectDialogOpen, setAssignProjectDialogOpen] = useState(false)
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = 
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.expertise.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || expert.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-emerald-600 text-white flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Aktiv</Badge>
      case "rejected":
        return <Badge className="bg-red-600 text-white flex items-center gap-1"><XCircle className="h-3 w-3" /> Deaktiv</Badge>
      case "pending":
        return <Badge className="bg-amber-600 text-white flex items-center gap-1"><Clock className="h-3 w-3" /> Gözlənilir</Badge>
      default:
        return null
    }
  }

  const openDetail = (expert: Expert) => {
    setSelectedExpert(expert)
    setDetailDialogOpen(true)
  }

  const openAssignProjects = (expert: Expert) => {
    setSelectedExpert(expert)
    setSelectedProjects([])
    setAssignProjectDialogOpen(true)
  }

  const toggleProjectSelection = (projectId: string) => {
    setSelectedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    )
  }

  const handleAssignProjects = () => {
    console.log("Assigning projects to expert:", selectedProjects)
    setAssignProjectDialogOpen(false)
  }

  // Summary Stats
  const totalExperts = experts.length
  const activeExperts = experts.filter(e => e.status === "approved").length
  const pendingExperts = experts.filter(e => e.status === "pending").length
  const totalAssignedProjects = experts.reduce((sum, e) => sum + e.assignedProjects, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-blue-50">
          <ClipboardCheck className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ekspertiza</h1>
          <p className="text-sm text-muted-foreground">Ekspertlərin idarəsi və layihə təyinatları</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ümumi ekspert</p>
                <p className="text-xl font-bold">{totalExperts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-50">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Aktiv ekspertlər</p>
                <p className="text-xl font-bold">{activeExperts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-50">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gözləyən müraciətlər</p>
                <p className="text-xl font-bold">{pendingExperts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-50">
                <Briefcase className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Təyin olunmuş layihələr</p>
                <p className="text-xl font-bold">{totalAssignedProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Ekspert adı, e-mail, ixtisas üzrə axtarış..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Status üzrə filtr" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Bütün statuslar</SelectItem>
                <SelectItem value="approved">Aktiv</SelectItem>
                <SelectItem value="pending">Gözlənilir</SelectItem>
                <SelectItem value="rejected">Deaktiv</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Experts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Ekspertlər siyahısı ({filteredExperts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Soyad</TableHead>
                <TableHead>Ad</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>İxtisas</TableHead>
                <TableHead>Təyin olunmuş layihələr</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Əməliyyatlar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExperts.map((expert) => (
                <TableRow key={expert.id}>
                  <TableCell className="font-medium">{expert.surname}</TableCell>
                  <TableCell>{expert.name}</TableCell>
                  <TableCell className="text-muted-foreground">{expert.email}</TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{expert.expertise}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{expert.assignedProjects} layihə</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(expert.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => openDetail(expert)}>
                        <Eye className="h-4 w-4 mr-1" />
                        Baxış
                      </Button>
                      {expert.status === "approved" && (
                        <Button variant="outline" size="sm" onClick={() => openAssignProjects(expert)}>
                          <Send className="h-4 w-4 mr-1" />
                          Layihə təyin et
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Expert Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Ekspert məlumatları</DialogTitle>
            <DialogDescription>Ekspert haqqında ətraflı məlumat</DialogDescription>
          </DialogHeader>
          {selectedExpert && (
            <div className="space-y-4 py-2">
              <div className="flex justify-center">
                {getStatusBadge(selectedExpert.status)}
              </div>
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Ad</p>
                      <p className="font-medium">{selectedExpert.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Soyad</p>
                      <p className="font-medium">{selectedExpert.surname}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">E-mail</p>
                      <p className="font-medium text-sm">{selectedExpert.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">FİN</p>
                      <p className="font-medium font-mono">{selectedExpert.fin}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">İxtisas sahələri</p>
                    <p className="font-medium">{selectedExpert.expertise}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Qeydiyyat tarixi</p>
                      <p className="font-medium">{selectedExpert.submissionDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Təyin olunmuş layihələr</p>
                      <p className="font-medium">{selectedExpert.assignedProjects} layihə</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailDialogOpen(false)}>Bağla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Projects Dialog */}
      <Dialog open={assignProjectDialogOpen} onOpenChange={setAssignProjectDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Layihə təyin et</DialogTitle>
            <DialogDescription>
              {selectedExpert?.name} {selectedExpert?.surname} üçün qiymətləndiriləcək layihələri seçin
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {projects.map(project => (
                <div
                  key={project.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedProjects.includes(project.id) ? "border-blue-500 bg-blue-50" : "border-border hover:bg-muted/50"
                  }`}
                  onClick={() => toggleProjectSelection(project.id)}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox checked={selectedProjects.includes(project.id)} />
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-muted-foreground">Rəhbər: {project.leader}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{project.scienceField}</Badge>
                    <Badge variant="secondary">{project.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignProjectDialogOpen(false)}>Ləğv et</Button>
            <Button
              onClick={handleAssignProjects}
              disabled={selectedProjects.length === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4 mr-2" />
              Təyin et ({selectedProjects.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
