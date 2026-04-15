"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  Eye, ClipboardCheck, Calendar, Users, FileText, 
  Briefcase, CheckCircle, Clock, TrendingUp
} from "lucide-react"

interface Competition {
  id: string
  name: string
  code: string
  announcementDateStart: string
  announcementDateEnd: string
  totalApplications: number
  totalProjects: number
  totalParticipants: number
  confirmedProjects: number
  confirmedParticipants: number
  currentPhase: string
  phaseStartDate: string
  phaseEndDate: string
}

export default function ExpertisePage() {
  const [competitions] = useState<Competition[]>([
    {
      id: "1",
      name: "Fundamental Tədqiqatlar Qrant Müsabiqəsi 2024",
      code: "FT-2024-001",
      announcementDateStart: "2024-01-15",
      announcementDateEnd: "2024-03-15",
      totalApplications: 156,
      totalProjects: 45,
      totalParticipants: 178,
      confirmedProjects: 38,
      confirmedParticipants: 142,
      currentPhase: "Ekspertiza mərhələsi",
      phaseStartDate: "2024-03-20",
      phaseEndDate: "2024-05-20",
    },
    {
      id: "2",
      name: "Tətbiqi Tədqiqatlar Qrant Müsabiqəsi 2024",
      code: "TT-2024-002",
      announcementDateStart: "2024-02-01",
      announcementDateEnd: "2024-04-01",
      totalApplications: 89,
      totalProjects: 32,
      totalParticipants: 98,
      confirmedProjects: 28,
      confirmedParticipants: 85,
      currentPhase: "Müraciət qəbulu",
      phaseStartDate: "2024-02-01",
      phaseEndDate: "2024-04-01",
    },
    {
      id: "3",
      name: "Gənc Alimlər Qrant Proqramı 2024",
      code: "GA-2024-003",
      announcementDateStart: "2024-03-01",
      announcementDateEnd: "2024-05-01",
      totalApplications: 67,
      totalProjects: 28,
      totalParticipants: 56,
      confirmedProjects: 22,
      confirmedParticipants: 44,
      currentPhase: "İlkin qiymətləndirmə",
      phaseStartDate: "2024-05-05",
      phaseEndDate: "2024-06-15",
    },
  ])

  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)

  const openCompetitionDetail = (competition: Competition) => {
    setSelectedCompetition(competition)
    setDetailDialogOpen(true)
  }

  const getPhaseColor = (phase: string) => {
    if (phase.includes("Ekspertiza")) return "bg-blue-100 text-blue-700"
    if (phase.includes("Müraciət")) return "bg-emerald-100 text-emerald-700"
    if (phase.includes("qiymətləndirmə")) return "bg-amber-100 text-amber-700"
    return "bg-gray-100 text-gray-700"
  }

  // Summary Stats
  const totalCompetitions = competitions.length
  const totalApplicationsAll = competitions.reduce((sum, c) => sum + c.totalApplications, 0)
  const totalProjectsAll = competitions.reduce((sum, c) => sum + c.totalProjects, 0)
  const totalConfirmedAll = competitions.reduce((sum, c) => sum + c.confirmedProjects, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-blue-50">
          <ClipboardCheck className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ekspertiza</h1>
          <p className="text-sm text-muted-foreground">Müsabiqələrin ekspertiza statistikası və mərhələləri</p>
        </div>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Aktiv müsabiqələr</p>
                <p className="text-xl font-bold">{totalCompetitions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-50">
                <FileText className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ümumi müraciətlər</p>
                <p className="text-xl font-bold">{totalApplicationsAll}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-50">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ümumi layihələr</p>
                <p className="text-xl font-bold">{totalProjectsAll}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-50">
                <CheckCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Təsdiqlənmiş layihələr</p>
                <p className="text-xl font-bold">{totalConfirmedAll}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Competitions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Müsabiqələr üzrə ekspertiza məlumatları</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Müsabiqənin adı</TableHead>
                <TableHead>Kod</TableHead>
                <TableHead>Elan tarixi aralığı</TableHead>
                <TableHead>Cari mərhələ</TableHead>
                <TableHead className="text-right">Əməliyyatlar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitions.map((competition) => (
                <TableRow key={competition.id} className="cursor-pointer hover:bg-muted/50" onClick={() => openCompetitionDetail(competition)}>
                  <TableCell className="font-medium">{competition.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">{competition.code}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {competition.announcementDateStart} - {competition.announcementDateEnd}
                  </TableCell>
                  <TableCell>
                    <Badge className={getPhaseColor(competition.currentPhase)}>
                      {competition.currentPhase}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); openCompetitionDetail(competition); }}>
                      <Eye className="h-4 w-4 mr-1" />
                      Ətraflı bax
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Competition Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-blue-600" />
              Ekspertiza məlumatları
            </DialogTitle>
            <DialogDescription>Müsabiqə üzrə ətraflı statistika</DialogDescription>
          </DialogHeader>
          {selectedCompetition && (
            <div className="space-y-4 py-2">
              {/* Competition Name and Date Range */}
              <Card className="bg-gradient-to-r from-blue-50 to-emerald-50 border-blue-100">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{selectedCompetition.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="font-mono">{selectedCompetition.code}</Badge>
                        <span className="text-sm text-muted-foreground">
                          Elan tarixi: {selectedCompetition.announcementDateStart} - {selectedCompetition.announcementDateEnd}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Application Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Ümumi müraciət sayı
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Layihə sayı:</span>
                        <span className="font-bold text-lg">{selectedCompetition.totalProjects}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Nəfər sayı:</span>
                        <span className="font-bold text-lg">{selectedCompetition.totalParticipants}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Təsdiqlənmiş layihələr
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Layihə sayı:</span>
                        <span className="font-bold text-lg text-emerald-600">{selectedCompetition.confirmedProjects}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Nəfər sayı:</span>
                        <span className="font-bold text-lg text-emerald-600">{selectedCompetition.confirmedParticipants}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Current Phase */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Cari mərhələ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className={`${getPhaseColor(selectedCompetition.currentPhase)} px-3 py-1`}>
                        {selectedCompetition.currentPhase}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {selectedCompetition.phaseStartDate} - {selectedCompetition.phaseEndDate}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Təsdiqləmə nisbəti
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Layihələr</span>
                        <span className="font-medium">
                          {selectedCompetition.confirmedProjects} / {selectedCompetition.totalProjects} 
                          ({Math.round((selectedCompetition.confirmedProjects / selectedCompetition.totalProjects) * 100)}%)
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full transition-all"
                          style={{ width: `${(selectedCompetition.confirmedProjects / selectedCompetition.totalProjects) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">İştirakçılar</span>
                        <span className="font-medium">
                          {selectedCompetition.confirmedParticipants} / {selectedCompetition.totalParticipants}
                          ({Math.round((selectedCompetition.confirmedParticipants / selectedCompetition.totalParticipants) * 100)}%)
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${(selectedCompetition.confirmedParticipants / selectedCompetition.totalParticipants) * 100}%` }}
                        />
                      </div>
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
    </div>
  )
}
