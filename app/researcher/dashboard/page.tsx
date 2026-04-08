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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, XCircle, ExternalLink, AlertCircle } from "lucide-react"
import Link from "next/link"

const competitions = [
  {
    id: 1,
    name: "Süni İntellekt və Rəqəmsal Transformasiya",
    deadline: "15 Mart 2026",
    status: "Aktiv" as const,
  },
  {
    id: 2,
    name: "Yaşıl Enerji və Dayanıqlı İnkişaf",
    deadline: "30 Mart 2026",
    status: "Aktiv" as const,
  },
  {
    id: 3,
    name: "Tibbi Biotexnologiya və Genomika",
    deadline: "10 Aprel 2026",
    status: "Aktiv" as const,
  },
  {
    id: 4,
    name: "Rəqəmsal Humanitar Elmlər",
    deadline: "25 Aprel 2026",
    status: "Aktiv" as const,
  },
  {
    id: 5,
    name: "İqlim Dəyişikliyi və Ekoloji Tədqiqatlar",
    deadline: "01 Fevral 2026",
    status: "Vaxtı bitmiş" as const,
  },
  {
    id: 6,
    name: "Kənd Təsərrüfatı İnnovasiyaları",
    deadline: "15 Yanvar 2026",
    status: "Vaxtı bitmiş" as const,
  },
]

const statusConfig = {
  "Aktiv": { 
    variant: "default" as const, 
    className: "bg-green-100 text-green-800 hover:bg-green-100", 
    icon: CheckCircle2 
  },
  "Vaxtı bitmiş": { 
    variant: "outline" as const, 
    className: "bg-red-100 text-red-800 hover:bg-red-100", 
    icon: XCircle 
  },
}

// Participation Dialog Component
function ParticipationDialog({ competition, children }: { competition: typeof competitions[0], children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Müsabiqəyə qeydiyyat / Competition Registration
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{competition.name}</p>
        </DialogHeader>

        {/* Warning Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-medium mb-1">Diqqət!</p>
            <p>Ad və soyadın düzgün daxil edilməməsi layihənin dayandırılması ilə nəticələnə bilər.</p>
          </div>
        </div>

        <div className="space-y-6 py-4">
          {/* Project Name */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Layihənin adı *</Label>
              <Input placeholder="Layihənin adını daxil edin" />
            </div>
            <div className="space-y-2">
              <Label>Title of the project *</Label>
              <Input placeholder="Enter project title" />
            </div>
          </div>

          {/* Category */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Layihənin kateqoriyası *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domestic">Ölkədaxili</SelectItem>
                  <SelectItem value="international">Beynəlxalq</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Category of the proposal *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Character */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Layihənin xarakteri *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="interdisciplinary">Elm sahələrinin qovşağında</SelectItem>
                  <SelectItem value="single">Tək elm sahəsi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Character of the project proposal *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="interdisciplinary">Interdisciplinary</SelectItem>
                  <SelectItem value="single">Single discipline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Applicant Status */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Qrant ərizəçisinin statusu *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="collective">Müvəqqəti yaradıcı kollektiv</SelectItem>
                  <SelectItem value="individual">Fərdi tədqiqatçı</SelectItem>
                  <SelectItem value="organization">Təşkilat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status of the applicant *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="collective">Temporary creative scientific collective</SelectItem>
                  <SelectItem value="individual">Individual researcher</SelectItem>
                  <SelectItem value="organization">Organization</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Duration */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Layihənin icra müddəti (Ay) *</Label>
              <Input type="number" placeholder="12" min={1} max={60} />
            </div>
            <div className="space-y-2">
              <Label>Duration of the project (Month) *</Label>
              <Input type="number" placeholder="12" min={1} max={60} />
            </div>
          </div>

          {/* Type */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Layihənin tipi *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Fərdi</SelectItem>
                  <SelectItem value="team">Komanda</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Type of the proposal *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Annotation */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Layihənin annotasiyası *</Label>
              <Textarea 
                placeholder="Layihənin qısa təsviri (2400-3500 simvol)"
                className="min-h-[120px]"
              />
              <p className="text-xs text-muted-foreground">3500 / 0 simvol</p>
            </div>
            <div className="space-y-2">
              <Label>Project annotation *</Label>
              <Textarea 
                placeholder="Brief description of the project (2400-3500 characters)"
                className="min-h-[120px]"
              />
              <p className="text-xs text-muted-foreground">3500 / 0 characters</p>
            </div>
          </div>

          {/* Keywords */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Açar sözlər *</Label>
              <Input placeholder="Maksimum 10 söz, nöqtəli vergüllə ayrılsın" />
              <p className="text-xs text-muted-foreground">Nümunə: süni intellekt; maşın öyrənməsi; tibbi diaqnostika</p>
            </div>
            <div className="space-y-2">
              <Label>Keywords *</Label>
              <Input placeholder="Maximum 10 words, separated by semicolons" />
              <p className="text-xs text-muted-foreground">Example: artificial intelligence; machine learning; medical diagnostics</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Ləğv et / Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Qeydiyyatı tamamla / Complete Registration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function ResearcherDashboard() {
  const activeCount = competitions.filter(c => c.status === "Aktiv").length
  const expiredCount = competitions.filter(c => c.status === "Vaxtı bitmiş").length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Qrant Müsabiqələri</h1>
        <p className="text-muted-foreground mt-1">
          Elan olunmuş qrant müsabiqələri və onların statusları
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{activeCount}</p>
              <p className="text-xs text-muted-foreground">Aktiv müsabiqə</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{expiredCount}</p>
              <p className="text-xs text-muted-foreground">Vaxtı bitmiş</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desktop Table */}
      <Card className="hidden md:block">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Elan olunmuş müsabiqələr</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Müsabiqənin adı</TableHead>
                <TableHead>Son təqdimetmə tarixi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Əməliyyatlar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitions.map((comp) => {
                const config = statusConfig[comp.status]
                const StatusIcon = config.icon
                return (
                  <TableRow key={comp.id}>
                    <TableCell className="pl-6 font-medium">{comp.name}</TableCell>
                    <TableCell className="text-muted-foreground">{comp.deadline}</TableCell>
                    <TableCell>
                      <Badge className={config.className}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {comp.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/researcher/project/${comp.id}`}>
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Layihəyə keçin
                          </Link>
                        </Button>
                        {comp.status === "Aktiv" && (
                          <ParticipationDialog competition={comp}>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                              İştirak et
                            </Button>
                          </ParticipationDialog>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {competitions.map((comp) => {
          const config = statusConfig[comp.status]
          const StatusIcon = config.icon
          return (
            <Card key={comp.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-sm text-foreground">{comp.name}</h3>
                  <Badge className={`shrink-0 ${config.className}`}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {comp.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Son tarix: {comp.deadline}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1" asChild>
                    <Link href={`/researcher/project/${comp.id}`}>
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Layihəyə keçin
                    </Link>
                  </Button>
                  {comp.status === "Aktiv" && (
                    <ParticipationDialog competition={comp}>
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                        İştirak et
                      </Button>
                    </ParticipationDialog>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
