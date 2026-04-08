"use client"

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
import { CheckCircle2, XCircle, ExternalLink } from "lucide-react"
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
                          <Link href={`/researcher/projects/${comp.id}`}>
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Layihəyə keçin
                          </Link>
                        </Button>
                        {comp.status === "Aktiv" && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                            <Link href={`/researcher/apply/${comp.id}`}>
                              İştirak et
                            </Link>
                          </Button>
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
                    <Link href={`/researcher/projects/${comp.id}`}>
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Layihəyə keçin
                    </Link>
                  </Button>
                  {comp.status === "Aktiv" && (
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" asChild>
                      <Link href={`/researcher/apply/${comp.id}`}>
                        İştirak et
                      </Link>
                    </Button>
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
