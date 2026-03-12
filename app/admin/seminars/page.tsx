"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Search } from "lucide-react"

interface SeminarApplication {
  id: string
  competitionName: string
  seminarDate: string
  participantName: string
  participantSurname: string
  participantPhone: string
  status: "pending" | "approved" | "rejected"
  rejectionReason?: string
}

export default function SeminarsPage() {
  const [applications, setApplications] = useState<SeminarApplication[]>([
    {
      id: "1",
      competitionName: "Fundamental Elmi Tədqiqatlar - 2024",
      seminarDate: "2024-03-15",
      participantName: "Elşən",
      participantSurname: "Məmmədov",
      participantPhone: "+994501234567",
      status: "pending",
    },
    {
      id: "2",
      competitionName: "Fundamental Elmi Tədqiqatlar - 2024",
      seminarDate: "2024-03-15",
      participantName: "Günel",
      participantSurname: "Əliyeva",
      participantPhone: "+994502345678",
      status: "approved",
    },
    {
      id: "3",
      competitionName: "Tətbiqi Tədqiqatlar Qrantı - 2024",
      seminarDate: "2024-03-20",
      participantName: "Orxan",
      participantSurname: "Həsənov",
      participantPhone: "+994503456789",
      status: "rejected",
      rejectionReason: "Seminar tarixində yer qalmayıb",
    },
    {
      id: "4",
      competitionName: "Tətbiqi Tədqiqatlar Qrantı - 2024",
      seminarDate: "2024-03-20",
      participantName: "Rəşad",
      participantSurname: "Quliyev",
      participantPhone: "+994504567890",
      status: "pending",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<SeminarApplication | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")

  const handleApprove = (app: SeminarApplication) => {
    setApplications(applications.map(a => 
      a.id === app.id ? { ...a, status: "approved" as const } : a
    ))
  }

  const openRejectDialog = (app: SeminarApplication) => {
    setSelectedApplication(app)
    setRejectionReason("")
    setRejectDialogOpen(true)
  }

  const handleReject = () => {
    if (selectedApplication) {
      setApplications(applications.map(a => 
        a.id === selectedApplication.id 
          ? { ...a, status: "rejected" as const, rejectionReason: rejectionReason || undefined } 
          : a
      ))
    }
    setRejectDialogOpen(false)
  }

  const filteredApplications = applications.filter(app => {
    const searchLower = searchTerm.toLowerCase()
    return (
      app.participantName.toLowerCase().includes(searchLower) ||
      app.participantSurname.toLowerCase().includes(searchLower) ||
      app.competitionName.toLowerCase().includes(searchLower)
    )
  })

  const pendingCount = applications.filter(a => a.status === "pending").length
  const approvedCount = applications.filter(a => a.status === "approved").length
  const rejectedCount = applications.filter(a => a.status === "rejected").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Məsləhət seminarlarına müraciətlər</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Gözləmədə</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full">
                <div className="h-6 w-6 rounded-full bg-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Təsdiqlənmiş</p>
                <p className="text-2xl font-bold">{approvedCount}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">İnkar edilmiş</p>
                <p className="text-2xl font-bold">{rejectedCount}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Axtar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Müraciətlər siyahısı</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Müsabiqənin adı</TableHead>
                  <TableHead>Seminarda iştirak tarixi</TableHead>
                  <TableHead>İştirakçının adı</TableHead>
                  <TableHead>İştirakçının soyadı</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium max-w-[200px] truncate">{app.competitionName}</TableCell>
                    <TableCell>{app.seminarDate}</TableCell>
                    <TableCell>{app.participantName}</TableCell>
                    <TableCell>{app.participantSurname}</TableCell>
                    <TableCell>{app.participantPhone}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          app.status === "approved" ? "default" :
                          app.status === "rejected" ? "destructive" : "secondary"
                        }
                      >
                        {app.status === "approved" ? "Təsdiqlənmiş" :
                         app.status === "rejected" ? "İnkar edilmiş" : "Gözləmədə"}
                      </Badge>
                      {app.rejectionReason && (
                        <p className="text-xs text-muted-foreground mt-1">{app.rejectionReason}</p>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {app.status === "pending" && (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-emerald-600 hover:text-emerald-700"
                            onClick={() => handleApprove(app)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Təsdiq et
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => openRejectDialog(app)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            İnkar et
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Müraciəti inkar et</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">{selectedApplication.participantName} {selectedApplication.participantSurname}</p>
                <p className="text-sm text-muted-foreground">{selectedApplication.competitionName}</p>
              </div>
              <div>
                <label className="text-sm font-medium">İnkar səbəbi (ixtiyari)</label>
                <Textarea
                  placeholder="Səbəbi daxil edin..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">Boş qoyula bilər. İddiaçıya bildiriş göndəriləcək.</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>İmtina</Button>
            <Button variant="destructive" onClick={handleReject}>İnkar et</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
