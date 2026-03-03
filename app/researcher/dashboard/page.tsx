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
import { FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react"

const competitions = [
  {
    id: 1,
    name: "Süni İntellekt və Rəqəmsal Transformasiya",
    deadline: "15 Mart 2026",
    status: "Aktiv" as const,
    amount: "50,000 - 120,000 AZN",
  },
  {
    id: 2,
    name: "Yaşıl Enerji və Dayanıqlı İnkişaf",
    deadline: "30 Mart 2026",
    status: "Aktiv" as const,
    amount: "40,000 - 100,000 AZN",
  },
  {
    id: 3,
    name: "Tibbi Biotexnologiya və Genomika",
    deadline: "10 Aprel 2026",
    status: "Gözləmədə" as const,
    amount: "60,000 - 150,000 AZN",
  },
  {
    id: 4,
    name: "Rəqəmsal Humanitar Elmlər",
    deadline: "25 Aprel 2026",
    status: "Aktiv" as const,
    amount: "30,000 - 80,000 AZN",
  },
  {
    id: 5,
    name: "İqlim Dəyişikliyi və Ekoloji Tədqiqatlar",
    deadline: "01 Fevral 2026",
    status: "Tamamlanmış" as const,
    amount: "45,000 - 110,000 AZN",
  },
]

const statusConfig = {
  Aktiv: { variant: "default" as const, className: "bg-green-100 text-green-800 hover:bg-green-100", icon: CheckCircle2 },
  Gözləmədə: { variant: "secondary" as const, className: "bg-amber-100 text-amber-800 hover:bg-amber-100", icon: Clock },
  Tamamlanmış: { variant: "outline" as const, className: "bg-gray-100 text-gray-600 hover:bg-gray-100", icon: AlertCircle },
}

export default function ResearcherDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Qrant Müsabiqələri</h1>
        <p className="text-gray-500 mt-1">
          Hazırda müraciət üçün açıq olan və keçmiş müsabiqələr
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-xs text-gray-500">Aktiv müsabiqə</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">1</p>
              <p className="text-xs text-gray-500">Gözləmədə</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <FileText className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">1</p>
              <p className="text-xs text-gray-500">Tamamlanmış</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desktop Table */}
      <Card className="hidden md:block">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Müsabiqələr</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Müsabiqənin adı</TableHead>
                <TableHead>Maliyyələşmə</TableHead>
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
                    <TableCell className="text-gray-600">{comp.amount}</TableCell>
                    <TableCell className="text-gray-600">{comp.deadline}</TableCell>
                    <TableCell>
                      <Badge className={config.className}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {comp.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      {comp.status === "Aktiv" ? (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          Müraciət et
                        </Button>
                      ) : comp.status === "Gözləmədə" ? (
                        <Button size="sm" variant="outline" disabled>
                          Gözləyin
                        </Button>
                      ) : (
                        <Button size="sm" variant="ghost" className="text-gray-400">
                          Baxış
                        </Button>
                      )}
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
                  <h3 className="font-medium text-sm text-gray-900">{comp.name}</h3>
                  <Badge className={`shrink-0 ${config.className}`}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {comp.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{comp.amount}</span>
                  <span>Son tarix: {comp.deadline}</span>
                </div>
                {comp.status === "Aktiv" && (
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Müraciət et
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
