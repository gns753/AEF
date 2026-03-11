"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ClipboardCheck, Clock, CheckCircle2 } from "lucide-react"

const initialCompetitions = [
  {
    id: 1,
    name: "Gənc alimlər üçün qrant müsabiqəsi",
    stage: "Ekspert seçimi",
    startDate: "01.03.2025",
    endDate: "15.03.2025",
  },
  {
    id: 2,
    name: "İnnovasiya layihələri müsabiqəsi",
    stage: "Qiymətləndirmə",
    startDate: "10.03.2025",
    endDate: "25.03.2025",
  },
  {
    id: 3,
    name: "Beynəlxalq elmi əməkdaşlıq proqramı",
    stage: "Ekspert seçimi",
    startDate: "05.04.2025",
    endDate: "20.04.2025",
  },
  {
    id: 4,
    name: "Tibbi tədqiqatlar üzrə qrant müsabiqəsi",
    stage: "Tamamlanmış",
    startDate: "01.01.2025",
    endDate: "28.02.2025",
  },
]

function getStageBadge(stage: string) {
  switch (stage) {
    case "Ekspert seçimi":
      return (
        <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">
          {stage}
        </Badge>
      )
    case "Qiymətləndirmə":
      return (
        <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
          {stage}
        </Badge>
      )
    case "Tamamlanmış":
      return (
        <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
          {stage}
        </Badge>
      )
    default:
      return <Badge variant="secondary">{stage}</Badge>
  }
}

export default function ExpertDashboard() {
  const router = useRouter()
  const [competitions, setCompetitions] = useState(initialCompetitions)

  // Read completed competitions from sessionStorage (set after submission)
  if (typeof window !== "undefined") {
    const completed = sessionStorage.getItem("completedCompetitions")
    if (completed) {
      const ids: number[] = JSON.parse(completed)
      const updated = competitions.map((c) =>
        ids.includes(c.id) ? { ...c, stage: "Tamamlanmış" } : c
      )
      if (JSON.stringify(updated) !== JSON.stringify(competitions)) {
        setCompetitions(updated)
      }
    }
  }

  const handleSelect = (competitionId: number) => {
    router.push(`/expert/competitions/${competitionId}/projects`)
  }

  const summary = {
    total: competitions.length,
    selection: competitions.filter((c) => c.stage === "Ekspert seçimi").length,
    evaluation: competitions.filter((c) => c.stage === "Qiymətləndirmə").length,
    completed: competitions.filter((c) => c.stage === "Tamamlanmış").length,
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Qiymətləndirmə üçün təyin edilmiş müsabiqələr
        </h1>
        <p className="text-muted-foreground mt-1">
          Sizə təyin edilmiş qrant müsabiqələrini idarə edin
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-100">
              <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{summary.total}</p>
              <p className="text-xs text-muted-foreground">Ümumi müsabiqə</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50">
              <ClipboardCheck className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-700">{summary.selection}</p>
              <p className="text-xs text-muted-foreground">Ekspert seçimi</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-50">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-700">{summary.evaluation}</p>
              <p className="text-xs text-muted-foreground">Qiymətləndirmə</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-50">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-700">{summary.completed}</p>
              <p className="text-xs text-muted-foreground">Tamamlanmış</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Competitions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Müsabiqələr</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Müsabiqənin adı</TableHead>
                  <TableHead>Müsabiqənin mərhələsi</TableHead>
                  <TableHead>Başlama tarixi</TableHead>
                  <TableHead>Bitmə tarixi</TableHead>
                  <TableHead className="text-right">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitions.map((comp) => (
                  <TableRow key={comp.id} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium">{comp.name}</TableCell>
                    <TableCell>{getStageBadge(comp.stage)}</TableCell>
                    <TableCell className="text-muted-foreground">{comp.startDate}</TableCell>
                    <TableCell className="text-muted-foreground">{comp.endDate}</TableCell>
                    <TableCell className="text-right">
                      {comp.stage !== "Tamamlanmış" ? (
                        <Button
                          size="sm"
                          onClick={() => handleSelect(comp.id)}
                        >
                          Seçim edin
                        </Button>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-sm text-green-600 font-medium">
                          <CheckCircle2 className="h-4 w-4" />
                          Göndərildi
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-3">
            {competitions.map((comp) => (
              <div
                key={comp.id}
                className="p-4 border rounded-lg space-y-3"
              >
                <div className="flex justify-between items-start gap-2">
                  <p className="font-medium text-sm text-foreground">{comp.name}</p>
                  {getStageBadge(comp.stage)}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Başlama: {comp.startDate}</span>
                  <span>Bitmə: {comp.endDate}</span>
                </div>
                {comp.stage !== "Tamamlanmış" ? (
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => handleSelect(comp.id)}
                  >
                    Seçim edin
                  </Button>
                ) : (
                  <div className="flex items-center justify-center gap-1 text-sm text-green-600 font-medium py-1">
                    <CheckCircle2 className="h-4 w-4" />
                    Göndərildi
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
