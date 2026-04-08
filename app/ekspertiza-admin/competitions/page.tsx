"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
import { Trophy, Users, ClipboardCheck, Eye, FileText, Download } from "lucide-react"

interface Competition {
  id: string
  name: string
  code: string
  startDate: string
  endDate: string
}

interface Application {
  id: string
  leaderName: string
  projectName: string
  signDate: string
  participants: { name: string; surname: string; fatherName: string; role: string }[]
}

interface Document {
  id: string
  name: string
  signedBy: string
  signDate: string
  format: string
  type: string
}

export default function EkspertizaCompetitionsPage() {
  const [competitions] = useState<Competition[]>([
    { id: "1", name: "Fundamental Elmi Tədqiqatlar - 2024", code: "FET-2024", startDate: "2024-01-15", endDate: "2024-06-30" },
    { id: "2", name: "Tətbiqi Tədqiqatlar Qrantı - 2024", code: "TET-2024", startDate: "2024-03-01", endDate: "2024-09-30" },
    { id: "3", name: "Gənc Alimlər Proqramı - 2024", code: "GAP-2024", startDate: "2024-02-01", endDate: "2024-08-31" },
  ])

  const [applications] = useState<Application[]>([
    { 
      id: "1", 
      leaderName: "Elşən Məmmədov", 
      projectName: "Süni intellekt tətbiqləri", 
      signDate: "2024-02-15", 
      participants: [
        { name: "Elşən", surname: "Məmmədov", fatherName: "Rəşid", role: "Layihə rəhbəri" },
        { name: "Günel", surname: "Əliyeva", fatherName: "Əli", role: "Tədqiqatçı" },
        { name: "Orxan", surname: "Həsənov", fatherName: "Fəxrəddin", role: "Laborant" },
      ]
    },
    { 
      id: "2", 
      leaderName: "Orxan Həsənov", 
      projectName: "Kvant hesablamaları", 
      signDate: "2024-02-20", 
      participants: [
        { name: "Orxan", surname: "Həsənov", fatherName: "Fəxrəddin", role: "Layihə rəhbəri" },
        { name: "Nigar", surname: "Rəhimova", fatherName: "Kamil", role: "Tədqiqatçı" },
      ]
    },
    { 
      id: "3", 
      leaderName: "Aytən Nəsirli", 
      projectName: "Nano materiallar tədqiqi", 
      signDate: "2024-02-22", 
      participants: [
        { name: "Aytən", surname: "Nəsirli", fatherName: "Vüqar", role: "Layihə rəhbəri" },
      ]
    },
  ])

  const [documents] = useState<Document[]>([
    { id: "1", name: "DOC-2024-001", signedBy: "Elşən Məmmədov", signDate: "2024-02-15", format: "PDF", type: "Ərizə" },
    { id: "2", name: "DOC-2024-002", signedBy: "Elşən Məmmədov", signDate: "2024-02-15", format: "PDF", type: "Layihə planı" },
    { id: "3", name: "DOC-2024-003", signedBy: "Günel Əliyeva", signDate: "2024-02-16", format: "PDF", type: "CV" },
  ])

  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null)
  const [showApplications, setShowApplications] = useState(false)
  
  const [participantsDialogOpen, setParticipantsDialogOpen] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  
  const [documentsDialogOpen, setDocumentsDialogOpen] = useState(false)

  const openApplications = (comp: Competition) => {
    setSelectedCompetition(comp)
    setShowApplications(true)
  }

  const openParticipants = (app: Application) => {
    setSelectedApplication(app)
    setParticipantsDialogOpen(true)
  }

  const openDocuments = (app: Application) => {
    setSelectedApplication(app)
    setDocumentsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-blue-50">
          <Trophy className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Qrant müsabiqələri</h1>
          <p className="text-sm text-muted-foreground">Müsabiqələri və müraciətləri idarə edin</p>
        </div>
      </div>

      {/* Competitions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Müsabiqələr siyahısı</CardTitle>
        </CardHeader>
        <CardContent>
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
              {competitions.map((comp) => (
                <TableRow key={comp.id}>
                  <TableCell className="font-medium">{comp.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{comp.code}</Badge>
                  </TableCell>
                  <TableCell>{comp.startDate}</TableCell>
                  <TableCell>{comp.endDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => openApplications(comp)}>
                        <Users className="h-4 w-4 mr-1" />
                        Müraciətlər
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => window.location.href = `/ekspertiza-admin/expertise?competition=${comp.id}`}>
                        <ClipboardCheck className="h-4 w-4 mr-1" />
                        Ekspertiza
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Applications Section */}
      {showApplications && selectedCompetition && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Müraciətlər - {selectedCompetition.name}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowApplications(false)}>
              Bağla
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Layihə rəhbərinin adı</TableHead>
                  <TableHead>Layihənin adı</TableHead>
                  <TableHead>İmzalama tarixi</TableHead>
                  <TableHead className="text-right">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.leaderName}</TableCell>
                    <TableCell>{app.projectName}</TableCell>
                    <TableCell>{app.signDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openParticipants(app)} title="İştirakçılara bax">
                          <Users className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Baxış">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openDocuments(app)} title="Sənədə baxış">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Participants Dialog */}
      <Dialog open={participantsDialogOpen} onOpenChange={setParticipantsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Layihə iştirakçıları</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">{selectedApplication.projectName}</p>
                <p className="text-sm text-muted-foreground">Layihə rəhbəri: {selectedApplication.leaderName}</p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ad</TableHead>
                    <TableHead>Soyad</TableHead>
                    <TableHead>Ata adı</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead className="text-right">Əməliyyatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedApplication.participants.map((p, index) => (
                    <TableRow key={index}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.surname}</TableCell>
                      <TableCell>{p.fatherName}</TableCell>
                      <TableCell>
                        <Badge variant={p.role === "Layihə rəhbəri" ? "default" : "secondary"}>
                          {p.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Ətraflı
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setParticipantsDialogOpen(false)}>Bağla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Documents Dialog */}
      <Dialog open={documentsDialogOpen} onOpenChange={setDocumentsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>İmzalanmış sənədlər</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">{selectedApplication.projectName}</p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>İmzalanmış sənədlər</TableHead>
                    <TableHead>İmzalamış şəxs</TableHead>
                    <TableHead>İmzalama tarixi</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Sənədin növü</TableHead>
                    <TableHead className="text-right">Əməliyyatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-mono text-sm">{doc.name}</TableCell>
                      <TableCell>{doc.signedBy}</TableCell>
                      <TableCell>{doc.signDate}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.format}</Badge>
                      </TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm" title="Sənədə baxış">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Sənədi endirin">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDocumentsDialogOpen(false)}>Bağla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
