"use client"

import { useState } from "react"
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Eye, FolderOpen } from "lucide-react"

const projects = [
  {
    id: 1,
    competition: "Süni İntellekt və Rəqəmsal Transformasiya",
    project: "Dərin öyrənmə ilə tibbi görüntülərin analizi",
    leader: "Dr. Aysel Məmmədova",
    role: "Müraciətçi" as const,
    date: "10 Fevral 2026",
    amount: "85,000 AZN",
    status: "Qiymətləndirmədə",
    description: "Bu layihə dərin öyrənmə alqoritmlərindən istifadə edərək tibbi görüntülərin (MRT, KT) avtomatik analizi sisteminin yaradılmasını nəzərdə tutur.",
  },
  {
    id: 2,
    competition: "Yaşıl Enerji və Dayanıqlı İnkişaf",
    project: "Günəş panellərinin effektivliyinin artırılması",
    leader: "Prof. Kamran Əliyev",
    role: "İştirakçı" as const,
    date: "25 Dekabr 2025",
    amount: "120,000 AZN",
    status: "Qəbul edilib",
    description: "Nanomateriallar əsasında yeni nəsil günəş panellərinin effektivliyinin 30% artırılması üzrə tədqiqat layihəsi.",
  },
  {
    id: 3,
    competition: "Rəqəmsal Humanitar Elmlər 2024",
    project: "Azərbaycan folklorunun rəqəmsallaşdırılması",
    leader: "Dr. Aysel Məmmədova",
    role: "Müraciətçi" as const,
    date: "15 İyun 2024",
    amount: "45,000 AZN",
    status: "Tamamlanmış",
    description: "Azərbaycan şifahi xalq ədəbiyyatının rəqəmsal arxivinin yaradılması və süni intellekt vasitəsilə analizi.",
  },
  {
    id: 4,
    competition: "Tibbi Biotexnologiya 2024",
    project: "Gen terapiyası üçün yeni daşıyıcı sistem",
    leader: "Prof. Nigar Həsənova",
    role: "Rədd edilib" as const,
    date: "01 Mart 2024",
    amount: "95,000 AZN",
    status: "Rədd edilib",
    description: "Lipid nanopartikulları əsasında gen terapiyası üçün yeni daşıyıcı sistemin işlənib hazırlanması.",
  },
]

const roleColors: Record<string, string> = {
  Müraciətçi: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  İştirakçı: "bg-green-100 text-green-700 hover:bg-green-100",
  "Rədd edilib": "bg-red-100 text-red-700 hover:bg-red-100",
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Qrant layihələri</h1>
          <p className="text-muted-foreground mt-1">Sizə aid olan qrant layihələri və müraciətlər</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FolderOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{projects.length}</p>
                <p className="text-xs text-muted-foreground">Ümumi layihə</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">2</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-xs text-muted-foreground">Müraciətçi kimi</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center">
                <span className="text-sm font-bold text-green-600">1</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">1</p>
                <p className="text-xs text-muted-foreground">İştirakçı kimi</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Desktop Table */}
        <Card className="hidden md:block">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Layihələr</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Müsabiqənin adı</TableHead>
                  <TableHead>Layihənin adı</TableHead>
                  <TableHead>Layihə rəhbəri</TableHead>
                  <TableHead>İştirak statusu</TableHead>
                  <TableHead>Tarix</TableHead>
                  <TableHead className="text-right pr-6">Ətraflı</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="pl-6 text-muted-foreground max-w-[180px] truncate">{p.competition}</TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">{p.project}</TableCell>
                    <TableCell className="text-muted-foreground">{p.leader}</TableCell>
                    <TableCell>
                      <Badge className={roleColors[p.role] || ""}>{p.role}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{p.date}</TableCell>
                    <TableCell className="text-right pr-6">
                      <Button size="sm" variant="outline" onClick={() => setSelectedProject(p)}>
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        Bax
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {projects.map((p) => (
            <Card key={p.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedProject(p)}>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-sm text-foreground">{p.project}</h3>
                  <Badge className={`shrink-0 ${roleColors[p.role] || ""}`}>{p.role}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{p.competition}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{p.leader}</span>
                  <span>{p.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedProject?.project}</DialogTitle>
            <DialogDescription>{selectedProject?.competition}</DialogDescription>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Layihə rəhbəri</p>
                  <p className="text-sm font-medium">{selectedProject.leader}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">İştirak statusu</p>
                  <Badge className={`mt-0.5 ${roleColors[selectedProject.role] || ""}`}>{selectedProject.role}</Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tarix</p>
                  <p className="text-sm font-medium">{selectedProject.date}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Maliyyələşmə</p>
                  <p className="text-sm font-bold text-green-600">{selectedProject.amount}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Layihə haqqında</p>
                <p className="text-sm text-foreground leading-relaxed">{selectedProject.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
