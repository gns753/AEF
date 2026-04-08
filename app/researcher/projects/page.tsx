"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { FileText, Eye, ChevronRight } from "lucide-react"
import Link from "next/link"
import { format, differenceInDays, isPast, parseISO } from "date-fns"
import { az } from "date-fns/locale"

const projects = [
  {
    id: 1,
    competition: "Süni İntellekt və Rəqəmsal Transformasiya",
    project: "Dərin öyrənmə ilə tibbi görüntülərin analizi",
    category: "Əsas tədqiqat",
    leader: "Dr. Aysel Məmmədova",
    leaderEmail: "aysel.mammadova@amea.gov.az",
    leaderInfo: "AMEA Sistem və Nəzarətli Sistemlər İnstitutu, Kompüter Elmləri Bölməsi",
    deadline: "2026-02-10",
    status: "Qiymətləndirmədə",
    participationStatus: "Müraciətçi",
    description: "Bu layihə dərin öyrənmə alqoritmlərindən istifadə edərək tibbi görüntülərin (MRT, KT) avtomatik analizi sisteminin yaradılmasını nəzərdə tutur.",
  },
  {
    id: 2,
    competition: "Yaşıl Enerji və Dayanıqlı İnkişaf",
    project: "Günəş panellərinin effektivliyinin artırılması",
    category: "Tətbiqi tədqiqat",
    leader: "Prof. Kamran Əliyev",
    leaderEmail: "kamran.aliyev@amea.gov.az",
    leaderInfo: "AMEA Fizika İnstitutu, Müəyyən Madddələr Fizikası Bölməsi",
    deadline: "2025-12-25",
    status: "Qəbul edilib",
    participationStatus: "İştirakçı",
    description: "Nanomateriallar əsasında yeni nəsil günəş panellərinin effektivliyinin 30% artırılması üzrə tədqiqat layihəsi.",
  },
  {
    id: 3,
    competition: "Rəqəmsal Humanitar Elmlər 2024",
    project: "Azərbaycan folklorunun rəqəmsallaşdırılması",
    category: "Əsas tədqiqat",
    leader: "Dr. Aysel Məmmədova",
    leaderEmail: "aysel.mammadova@amea.gov.az",
    leaderInfo: "AMEA Sistem və Nəzarətli Sistemlər İnstitutu, Kompüter Elmləri Bölməsi",
    deadline: "2024-06-15",
    status: "Tamamlanmış",
    participationStatus: "Müraciətçi",
    description: "Azərbaycan şifahi xalq ədəbiyyatının rəqəmsal arxivinin yaradılması və süni intellekt vasitəsilə analizi.",
  },
]

const statusColors: Record<string, { bg: string; text: string }> = {
  "Müraciətçi": { bg: "bg-blue-100", text: "text-blue-700" },
  "İştirakçı": { bg: "bg-green-100", text: "text-green-700" },
  "Qəbul edilib": { bg: "bg-emerald-100", text: "text-emerald-700" },
  "Qiymətləndirmədə": { bg: "bg-yellow-100", text: "text-yellow-700" },
  "Tamamlanmış": { bg: "bg-gray-100", text: "text-gray-700" },
}

function getDeadlineDisplay(deadline: string) {
  try {
    const date = parseISO(deadline)
    const now = new Date()
    
    if (isPast(date)) {
      const daysAgo = differenceInDays(now, date)
      return {
        formatted: format(date, "dd.MM.yyyy"),
        isOverdue: true,
        daysAgo,
      }
    }
    
    return {
      formatted: format(date, "dd.MM.yyyy"),
      isOverdue: false,
    }
  } catch {
    return { formatted: deadline, isOverdue: false }
  }
}

export default function ProjectsPage() {
  const [selectedLeader, setSelectedLeader] = useState<typeof projects[0]["leader"] | null>(null)
  const [leaderInfo, setLeaderInfo] = useState<string | null>(null)

  const openLeaderModal = (leader: string, info: string) => {
    setSelectedLeader(leader)
    setLeaderInfo(info)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Sizə aid olan qrant layihələri</h1>
        <p className="text-muted-foreground mt-2">Müsabiqələrdə iştirak etdiyiniz layihələrin siyahısı</p>
      </div>

      {/* Projects Cards */}
      <div className="space-y-4">
        {projects.map((project) => {
          const deadline = getDeadlineDisplay(project.deadline)
          
          return (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground mb-1">{project.competition}</p>
                    <h2 className="text-lg font-bold text-foreground">{project.project}</h2>
                  </div>
                  <Badge variant="default" className="shrink-0">
                    {project.participationStatus}
                  </Badge>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Category */}
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Layihənin kateqoriyası
                    </label>
                    <input
                      type="text"
                      value={project.category}
                      readOnly
                      className="w-full px-3 py-2 text-sm bg-muted border border-border rounded text-foreground"
                    />
                  </div>

                  {/* Deadline */}
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Təqdim olunma üçün son tarix
                    </label>
                    <input
                      type="text"
                      value={deadline.formatted}
                      readOnly
                      className={`w-full px-3 py-2 text-sm border rounded ${
                        deadline.isOverdue
                          ? "bg-red-50 border-red-200 text-red-700 font-semibold"
                          : "bg-muted border-border text-foreground"
                      }`}
                    />
                    {deadline.isOverdue && (
                      <p className="text-xs text-red-600 mt-1">
                        {deadline.daysAgo} gün keçmişdir
                      </p>
                    )}
                  </div>

                  {/* Project Leader */}
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Layihə rəhbəri
                    </label>
                    <button
                      onClick={() => openLeaderModal(project.leader, project.leaderInfo)}
                      className="w-full px-3 py-2 text-sm bg-muted border border-border rounded text-left text-blue-600 hover:underline truncate"
                    >
                      {project.leader}
                    </button>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Layihənin statusu
                    </label>
                    <input
                      type="text"
                      value={project.status}
                      readOnly
                      className="w-full px-3 py-2 text-sm bg-muted border border-border rounded text-foreground"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button asChild variant="default" className="flex-1 md:flex-none">
                    <Link href={`/researcher/project/${project.id}`}>
                      Layihəyə keçin
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex-1 md:flex-none">
                    <FileText className="h-4 w-4 mr-2" />
                    Sənədələrə baxış
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Leader Info Modal */}
      <Dialog open={!!selectedLeader} onOpenChange={() => setSelectedLeader(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{selectedLeader}</DialogTitle>
            <DialogDescription>Layihə rəhbərinin məlumatları</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">
                Vəzifəsi
              </label>
              <p className="text-sm text-foreground">{leaderInfo}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">
                E-poçt
              </label>
              <p className="text-sm text-blue-600 hover:underline cursor-pointer">
                {projects.find((p) => p.leader === selectedLeader)?.leaderEmail}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
