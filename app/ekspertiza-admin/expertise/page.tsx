'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Eye, Send, CheckCircle, XCircle, Clock } from 'lucide-react'

interface Expert {
  id: string
  name: string
  surname: string
  email: string
  fin: string
  expertise: string
  submissionDate: string
  status: 'pending' | 'approved' | 'rejected'
}

export default function ExpertisePage() {
  const [experts, setExperts] = useState<Expert[]>([
    {
      id: '1',
      name: 'Elnur',
      surname: 'Akbarov',
      email: 'elnur.akbarov@example.com',
      fin: '1234567890',
      expertise: 'Süni Zeka, Məlumat Elmi',
      submissionDate: '2024-01-15',
      status: 'approved',
    },
    {
      id: '2',
      name: 'Ayşe',
      surname: 'Hasanova',
      email: 'ayse.hasanova@example.com',
      fin: '0987654321',
      expertise: 'Kənd Təsərrüfatı, Əkinçilik',
      submissionDate: '2024-01-20',
      status: 'pending',
    },
    {
      id: '3',
      name: 'Rəfail',
      surname: 'Məmmədov',
      email: 'refail.mammadov@example.com',
      fin: '5555555555',
      expertise: 'Enerji, Elektrik Mühəndisliyi',
      submissionDate: '2024-01-10',
      status: 'rejected',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null)

  const filteredExperts = experts.filter(expert =>
    expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expert.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expert.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expert.expertise.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-emerald-600 text-white flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Təsdiqlənib</Badge>
      case 'rejected':
        return <Badge className="bg-red-600 text-white flex items-center gap-1"><XCircle className="h-3 w-3" /> İnkar edilib</Badge>
      case 'pending':
        return <Badge className="bg-amber-600 text-white flex items-center gap-1"><Clock className="h-3 w-3" /> Gözlənilir</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ekspertiza</h1>
          <p className="text-sm text-muted-foreground mt-1">Ekspertlərin idarəsi və status izləməsi</p>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Ekspert adı, e-mail, ixtisas üzrə axtarış..."
              className="pl-10 bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Experts Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="border-b px-6 py-4">
          <CardTitle className="text-base">Ekspertlər Siyahısı ({filteredExperts.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-6 py-3 font-semibold text-sm">Soyad</th>
                  <th className="text-left px-6 py-3 font-semibold text-sm">Ad</th>
                  <th className="text-left px-6 py-3 font-semibold text-sm">E-mail</th>
                  <th className="text-left px-6 py-3 font-semibold text-sm">İxtisas</th>
                  <th className="text-left px-6 py-3 font-semibold text-sm">Status</th>
                  <th className="text-left px-6 py-3 font-semibold text-sm">Əməliyyatlar</th>
                </tr>
              </thead>
              <tbody>
                {filteredExperts.map((expert) => (
                  <tr key={expert.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm">{expert.surname}</td>
                    <td className="px-6 py-4 text-sm">{expert.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{expert.email}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{expert.expertise}</td>
                    <td className="px-6 py-4">{getStatusBadge(expert.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedExpert(expert)}
                          className="h-8 px-2 text-xs"
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          Baxış
                        </Button>
                        {expert.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              className="h-8 px-2 text-xs bg-emerald-600 hover:bg-emerald-700"
                              onClick={() => {
                                setExperts(experts.map(e =>
                                  e.id === expert.id ? { ...e, status: 'approved' } : e
                                ))
                              }}
                            >
                              <CheckCircle className="h-3.5 w-3.5 mr-1" />
                              Təsdiq et
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-8 px-2 text-xs"
                              onClick={() => {
                                setExperts(experts.map(e =>
                                  e.id === expert.id ? { ...e, status: 'rejected' } : e
                                ))
                              }}
                            >
                              <XCircle className="h-3.5 w-3.5 mr-1" />
                              İnkar et
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

      {/* Expert Details Modal */}
      {selectedExpert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <Card className="w-full max-w-2xl shadow-2xl border-0">
            <CardHeader className="border-b px-6 py-4 flex items-center justify-between">
              <CardTitle>Ekspert Detallı Məlumatı</CardTitle>
              <button
                onClick={() => setSelectedExpert(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Ad</p>
                  <p className="font-semibold">{selectedExpert.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Soyad</p>
                  <p className="font-semibold">{selectedExpert.surname}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">E-mail</p>
                  <p className="font-semibold">{selectedExpert.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">FİN</p>
                  <p className="font-semibold">{selectedExpert.fin}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">İxtisas</p>
                  <p className="font-semibold">{selectedExpert.expertise}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Müraciət Tarixi</p>
                  <p className="font-semibold">{selectedExpert.submissionDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedExpert.status)}</div>
                </div>
              </div>
              <div className="flex gap-2 justify-end border-t pt-4">
                <Button variant="outline" onClick={() => setSelectedExpert(null)}>
                  Bağla
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
