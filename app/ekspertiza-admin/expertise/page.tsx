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
import { Search, Eye } from "lucide-react"

const PROJECTS = [
  {
    id: 1,
    code: "EIF-2025-001",
    leadName: "Dr. Əliyəv Ramil",
    projectName: "Dərin öyrənmə modelləri üzrə GPU-ə optimizasiya",
    annotation: "Layihə çərçivəsində müasir dərin öyrənmə modelləri üçün GPU-ə optimizasiya metodologiyası işlənən burada neyroşəbəkə parametrləri əsasında avtomat düzəlişlər ediləcəkdir.",
    field: "Kompüter elmləri",
    status: "Texniki ekspertizadan keçib",
  },
  {
    id: 2,
    code: "EIF-2025-002",
    leadName: "Dr. Hacıyeva Leyla",
    projectName: "Azərbaycanın endemik bitki növlərinin genomik analizi",
    annotation: "Layihə çərçivəsində Azərbaycanın endemik bitki növlərinin tam genomik ardıcıllığı müəyyən ediləcəkdir.",
    field: "Biologiya",
    status: "Elmi ekspertizadan keçməyib",
  },
  {
    id: 3,
    code: "EIF-2025-003",
    leadName: "Prof. Vəliyev Kamil",
    projectName: "Kənd təsərrüfatı robotlarının süni intellekt ilə idarə edilməsi",
    annotation: "Kənd təsərrüfatı sektoru üçün avtonomluq səviyyəsi yüksək robotlar sistemi",
    field: "Mühəndislik",
    status: "Təsdiq olunan versiya",
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
                      <Button size="sm" variant="outline" className="gap-1">
                        <Eye className="h-4 w-4" />
                        <span className="hidden sm:inline">Baxış</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
