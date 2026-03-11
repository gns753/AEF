"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trophy, FileText, Users, ClipboardList } from "lucide-react"

const competitions = [
  {
    id: 1,
    name: "Gənc alimlər üçün qrant müsabiqəsi",
    code: "QM-2025-01",
    startDate: "01.03.2025",
    endDate: "30.06.2025",
  },
  {
    id: 2,
    name: "İnnovasiya layihələri müsabiqəsi",
    code: "QM-2025-02",
    startDate: "10.03.2025",
    endDate: "25.07.2025",
  },
  {
    id: 3,
    name: "Fundamental tədqiqatlar proqramı",
    code: "QM-2024-05",
    startDate: "01.01.2025",
    endDate: "31.03.2025",
  },
]

export default function AdminDashboardPage() {
  const handleDownloadPdf = (name: string) => {
    alert(`PDF yüklənir: ${name}`)
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Qrant müsabiqələrinin siyahısı</h1>
        <p className="text-muted-foreground mt-1">Bütün müsabiqələri idarə edin</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-50">
                <Trophy className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cəmi müsabiqə</p>
                <p className="text-2xl font-bold text-foreground">{competitions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-50">
                <ClipboardList className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cəmi müraciət</p>
                <p className="text-2xl font-bold text-foreground">9</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-50">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ekspertlər</p>
                <p className="text-2xl font-bold text-foreground">4</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-violet-50">
                <FileText className="h-6 w-6 text-violet-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Aktiv müsabiqə</p>
                <p className="text-2xl font-bold text-foreground">2</p>
              </div>
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
          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Müsabiqənin adı</TableHead>
                  <TableHead>Kod</TableHead>
                  <TableHead>Başlama tarixi</TableHead>
                  <TableHead>Bitmə tarixi</TableHead>
                  <TableHead className="text-right">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitions.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <button
                        onClick={() => handleDownloadPdf(c.name)}
                        className="font-medium text-emerald-700 hover:text-emerald-800 hover:underline text-left"
                      >
                        {c.name}
                      </button>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono text-xs">
                        {c.code}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{c.startDate}</TableCell>
                    <TableCell className="text-muted-foreground">{c.endDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/admin/competitions/${c.id}/applications`}>
                            Müraciətlər
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white"
                          asChild
                        >
                          <Link href={`/admin/competitions/${c.id}/expertise`}>
                            Ekspertiza
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {competitions.map((c) => (
              <div key={c.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <button
                    onClick={() => handleDownloadPdf(c.name)}
                    className="font-medium text-emerald-700 hover:underline text-left text-sm"
                  >
                    {c.name}
                  </button>
                  <Badge variant="outline" className="font-mono text-[10px] flex-shrink-0 ml-2">
                    {c.code}
                  </Badge>
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>Başlama: {c.startDate}</span>
                  <span>Bitmə: {c.endDate}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs" asChild>
                    <Link href={`/admin/competitions/${c.id}/applications`}>Müraciətlər</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                    asChild
                  >
                    <Link href={`/admin/competitions/${c.id}/expertise`}>Ekspertiza</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
