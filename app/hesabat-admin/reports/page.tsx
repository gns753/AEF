'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Eye, Download, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface Report {
  id: string
  title: string
  author: string
  category: string
  submissionDate: string
  status: 'pending' | 'approved' | 'rejected'
  fileSize: string
}

export default function HesabatAdminReports() {
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      title: '2024 Maliyyə Hesabatı',
      author: 'Sevinc Quliyeva',
      category: 'Maliyyə',
      submissionDate: '2024-03-15',
      status: 'approved',
      fileSize: '2.4 MB',
    },
    {
      id: '2',
      title: 'Tədqiqat Fəaliyyətinin Xülasəsi',
      author: 'Rəşad Quliyev',
      category: 'Tədqiqat',
      submissionDate: '2024-03-10',
      status: 'approved',
      fileSize: '1.8 MB',
    },
    {
      id: '3',
      title: 'Layihə İcraatı Hesabatı',
      author: 'Günel Əliyeva',
      category: 'Layihə',
      submissionDate: '2024-03-08',
      status: 'pending',
      fileSize: '3.1 MB',
    },
    {
      id: '4',
      title: 'Kadr Dəyişiklikləri Xülasəsi',
      author: 'Orxan Həsənov',
      category: 'Kadr',
      submissionDate: '2024-03-05',
      status: 'pending',
      fileSize: '1.2 MB',
    },
    {
      id: '5',
      title: 'Beynəlxalq Əməkdaşlıq Hesabatı',
      author: 'Aynur Məmmədova',
      category: 'Əməkdaşlıq',
      submissionDate: '2024-02-28',
      status: 'rejected',
      fileSize: '2.6 MB',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-emerald-600 text-white flex items-center gap-1 w-fit">
            <CheckCircle className="h-3 w-3" />
            Təsdiqlənib
          </Badge>
        )
      case 'pending':
        return (
          <Badge className="bg-amber-600 text-white flex items-center gap-1 w-fit">
            <Clock className="h-3 w-3" />
            Gözlənilir
          </Badge>
        )
      case 'rejected':
        return (
          <Badge className="bg-red-600 text-white flex items-center gap-1 w-fit">
            <AlertCircle className="h-3 w-3" />
            İnkar edilib
          </Badge>
        )
      default:
        return null
    }
  }

  const handleApprove = (id: string) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: 'approved' } : r))
  }

  const handleReject = (id: string) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: 'rejected' } : r))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Hesabatlar</h1>
          <p className="text-sm text-muted-foreground mt-1">Bütün elmi-texniki hesabatları idarə edin</p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700 text-white gap-2">
          <Plus className="h-4 w-4" />
          Yeni Hesabat
        </Button>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Başlıq, müəllif və ya kateqoriya üzrə axtarış..."
              className="pl-10 bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="border-b px-6 py-4">
          <CardTitle className="text-base">Hesabatlar ({filteredReports.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-6 py-3 font-semibold text-sm">Başlıq</th>
                  <th className="text-left px-6 py-3 font-semibold text-sm">Müəllif</th>
                  <th className="text-left px-6 py-3 font-semibold text-sm">Kateqoriya</th>
                  <th className="text-left px-6 py-3 font-semibold text-sm">Tarix</th>
                  <th className="text-left px-6 py-3 font-semibold text-sm">Status</th>
                  <th className="text-left px-6 py-3 font-semibold text-sm">Əməliyyatlar</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">{report.title}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{report.author}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{report.category}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{report.submissionDate}</td>
                    <td className="px-6 py-4">{getStatusBadge(report.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 px-2 text-xs gap-1">
                          <Eye className="h-3.5 w-3.5" />
                          Baxış
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 px-2 text-xs gap-1">
                          <Download className="h-3.5 w-3.5" />
                          Yüklə
                        </Button>
                        {report.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              className="h-8 px-2 text-xs bg-emerald-600 hover:bg-emerald-700 gap-1"
                              onClick={() => handleApprove(report.id)}
                            >
                              <CheckCircle className="h-3.5 w-3.5" />
                              Təsdiq
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-8 px-2 text-xs gap-1"
                              onClick={() => handleReject(report.id)}
                            >
                              <AlertCircle className="h-3.5 w-3.5" />
                              İnkar
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
