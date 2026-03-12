"use client"

import { useState, useMemo } from "react"
import { useRouter, useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, ArrowLeft, CheckCircle2, Info } from "lucide-react"

const competitionNames: Record<string, string> = {
  "1": "Gənc alimlər üçün qrant müsabiqəsi",
  "2": "İnnovasiya layihələri müsabiqəsi",
  "3": "Beynəlxalq elmi əməkdaşlıq proqramı",
  "4": "Tibbi tədqiqatlar üzrə qrant müsabiqəsi",
}

const allProjects = [
  {
    id: 1,
    name: "Neyroşəbəkələrdə dərin öyrənmə alqoritmlərinin optimallaşdırılması",
    annotation:
      "Bu layihə müxtəlif neyroşəbəkə arxitekturalarında dərin öyrənmə alqoritmlərinin performansının artırılmasına yönəlib. Xüsusilə, böyük həcmli verilənlər üzərində emal sürətinin və dəqiqliyinin yaxşılaşdırılması nəzərdə tutulur.",
    field: "Texnika",
  },
  {
    id: 2,
    name: "Azərbaycanın endemik bitki növlərinin genomik analizi",
    annotation:
      "Layihə çərçivəsində Azərbaycanın endemik bitki növlərinin tam genomik ardıcıllığı müəyyən ediləcək və biomüxtəlifliyin qorunması üçün genetik verilənlər bazası yaradılacaq.",
    field: "Təbiət elmləri",
  },
  {
    id: 3,
    name: "Şəhər mühitində hava keyfiyyətinin monitorinqi üçün IoT sistemi",
    annotation:
      "Bu tədqiqat layihəsi Bakı şəhərində IoT sensorları vasitəsilə real vaxt rejimində hava keyfiyyətinin monitorinqi və proqnozlaşdırılması üçün ağıllı sistem yaratmağı hədəfləyir.",
    field: "Texnika",
  },
  {
    id: 4,
    name: "Orta əsr Azərbaycan ədəbiyyatında sufi motivlərinin tədqiqi",
    annotation:
      "XII-XVI əsrlər Azərbaycan ədəbiyyatında sufi düşüncəsinin poetik ifadəsini, rəmzləri və obrazlar sistemini araşdırmaq, müqayisəli ədəbiyyatşünaslıq metodları ilə təhlil etmək.",
    field: "Humanitar",
  },
  {
    id: 5,
    name: "Ürək-damar xəstəliklərinin erkən diaqnostikası üçün biomarkerlər",
    annotation:
      "Layihə ürək-damar xəstəliklərinin erkən mərhələdə aşkarlanması üçün yeni biomarkerlərin identifikasiyasını, validasiyasını və klinik tətbiq imkanlarının araşdırılmasını nəzərdə tutur.",
    field: "Tibb",
  },
  {
    id: 6,
    name: "Bərpa olunan enerji mənbələrinin hibrid inteqrasiyası",
    annotation:
      "Günəş və külək enerjisi mənbələrinin hibrid şəbəkə sistemlərinə inteqrasiyası və enerji saxlama texnologiyalarının optimallaşdırılması üzrə tədqiqat layihəsi.",
    field: "Texnika",
  },
  {
    id: 7,
    name: "Azərbaycan dilinin kompüter linqvistikası modeli",
    annotation:
      "Azərbaycan dili üçün böyük dil modelinin (LLM) yaradılması, morfoloji analiz, sintaktik təhlil və semantik emal alqoritmlərinin işlənməsi.",
    field: "Humanitar",
  },
  {
    id: 8,
    name: "Torpaq degradasiyasının peyk verilənləri əsasında qiymətləndirilməsi",
    annotation:
      "Uzaq məsafəli zondlama və süni intellekt texnologiyalarından istifadə etməklə Azərbaycanda torpaq degradasiya proseslərinin monitorinqi və proqnozlaşdırılması.",
    field: "Təbiət elmləri",
  },
]

function getFieldBadge(field: string) {
  switch (field) {
    case "Texnika":
      return (
        <Badge className="bg-sky-100 text-sky-700 border-sky-200 hover:bg-sky-100">{field}</Badge>
      )
    case "Tibb":
      return (
        <Badge className="bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-100">
          {field}
        </Badge>
      )
    case "Humanitar":
      return (
        <Badge className="bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-100">
          {field}
        </Badge>
      )
    case "Təbiət elmləri":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
          {field}
        </Badge>
      )
    default:
      return <Badge variant="secondary">{field}</Badge>
  }
}

function formatDate() {
  const now = new Date()
  const dd = String(now.getDate()).padStart(2, "0")
  const mm = String(now.getMonth() + 1).padStart(2, "0")
  const yyyy = now.getFullYear()
  return `${dd}.${mm}.${yyyy}`
}

export default function ProjectsSelectionPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const competitionName = competitionNames[id] || "Müsabiqə"

  const [search, setSearch] = useState("")
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [selectionDates, setSelectionDates] = useState<Record<number, string>>({})
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [expandedAnnotations, setExpandedAnnotations] = useState<Set<number>>(new Set())

  const filtered = useMemo(() => {
    if (!search.trim()) return allProjects
    const q = search.toLowerCase()
    return allProjects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.annotation.toLowerCase().includes(q) ||
        p.field.toLowerCase().includes(q)
    )
  }, [search])

  const toggleSelect = (projectId: number) => {
    if (submitted) return
    const next = new Set(selectedIds)
    const nextDates = { ...selectionDates }
    if (next.has(projectId)) {
      next.delete(projectId)
      delete nextDates[projectId]
    } else {
      next.add(projectId)
      nextDates[projectId] = formatDate()
    }
    setSelectedIds(next)
    setSelectionDates(nextDates)
  }

  const toggleAnnotation = (projectId: number) => {
    const next = new Set(expandedAnnotations)
    if (next.has(projectId)) {
      next.delete(projectId)
    } else {
      next.add(projectId)
    }
    setExpandedAnnotations(next)
  }

  const handleSubmit = () => {
    // Mark this competition as completed in sessionStorage
    const existing = sessionStorage.getItem("completedCompetitions")
    const ids: number[] = existing ? JSON.parse(existing) : []
    if (!ids.includes(Number(id))) ids.push(Number(id))
    sessionStorage.setItem("completedCompetitions", JSON.stringify(ids))

    setSubmitted(true)
    setConfirmOpen(false)

    // Redirect after short delay so user sees the success state
    setTimeout(() => {
      router.push("/expert/dashboard")
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Back + Title */}
      <div className="flex items-start gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/expert/dashboard")}
          className="mt-1 p-1.5"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Layihələrin siyahısı</h1>
          <p className="text-muted-foreground mt-0.5">{competitionName}</p>
        </div>
      </div>

      {/* Success Alert */}
      {submitted && (
        <Alert className="bg-green-50 border-green-200 text-green-800">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="font-medium">
            Seçimləriniz uğurla göndərildi! Ana səhifəyə yönləndirilirsiniz...
          </AlertDescription>
        </Alert>
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Açar sözə görə axtarın..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Layihələr</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Seçim</TableHead>
                  <TableHead>Layihənin adı</TableHead>
                  <TableHead className="max-w-[300px]">Layihənin annotasiyası</TableHead>
                  <TableHead>Elm sahəsi</TableHead>
                  <TableHead>Seçim tarixi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((project) => {
                  const isSelected = selectedIds.has(project.id)
                  const isExpanded = expandedAnnotations.has(project.id)
                  const annotationShort =
                    project.annotation.length > 120
                      ? project.annotation.slice(0, 120) + "..."
                      : project.annotation

                  return (
                    <TableRow
                      key={project.id}
                      className={`transition-colors ${
                        isSelected ? "bg-blue-50/60" : "hover:bg-muted/50"
                      }`}
                    >
                      <TableCell>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelect(project.id)}
                          disabled={submitted}
                        />
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {project.name}
                      </TableCell>
                      <TableCell className="max-w-[300px]">
                        <div className="text-sm text-muted-foreground">
                          {isExpanded ? project.annotation : annotationShort}
                        </div>
                        {project.annotation.length > 120 && (
                          <button
                            onClick={() => toggleAnnotation(project.id)}
                            className="text-xs text-blue-600 hover:underline mt-1"
                          >
                            {isExpanded ? "Gizlə" : "Ətraflı"}
                          </button>
                        )}
                      </TableCell>
                      <TableCell>{getFieldBadge(project.field)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {isSelected ? selectionDates[project.id] : "—"}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-3">
            {filtered.map((project) => {
              const isSelected = selectedIds.has(project.id)
              const isExpanded = expandedAnnotations.has(project.id)
              const annotationShort =
                project.annotation.length > 100
                  ? project.annotation.slice(0, 100) + "..."
                  : project.annotation

              return (
                <div
                  key={project.id}
                  className={`p-4 border rounded-lg space-y-3 transition-colors ${
                    isSelected ? "bg-blue-50/60 border-blue-200" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSelect(project.id)}
                      disabled={submitted}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <p className="font-medium text-sm text-foreground">{project.name}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {getFieldBadge(project.field)}
                        {isSelected && (
                          <span className="text-xs text-muted-foreground">
                            Seçim: {selectionDates[project.id]}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {isExpanded ? project.annotation : annotationShort}
                      </p>
                      {project.annotation.length > 100 && (
                        <button
                          onClick={() => toggleAnnotation(project.id)}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          {isExpanded ? "Gizlə" : "Ətraflı"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nəticə tapılmadı.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white border rounded-lg">
        <p className="text-sm text-muted-foreground">
          Seçilmiş layihələr:{" "}
          <span className="font-bold text-foreground">{selectedIds.size}</span>
        </p>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => router.push("/expert/dashboard")}
            disabled={submitted}
          >
            Ləğv et
          </Button>
          <Button
            onClick={() => setConfirmOpen(true)}
            disabled={selectedIds.size === 0 || submitted}
          >
            {submitted ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Göndərildi
              </span>
            ) : (
              "Rəyi göndər"
            )}
          </Button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Seçimlərinizi təsdiqləyirsiniz?</DialogTitle>
            <DialogDescription>
              Siz{" "}
              <span className="font-semibold text-foreground">{selectedIds.size}</span>{" "}
              layihə seçmisiniz. Bu seçimlər Fond İnzibatçısına göndəriləcək.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Xeyr, qayıt
            </Button>
            <Button onClick={handleSubmit}>Bəli, göndər</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
