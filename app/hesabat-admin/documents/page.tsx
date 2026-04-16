'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Eye, CheckCircle, XCircle } from "lucide-react"

interface DocumentRecord {
  id: number
  competitionName: string
  submissionDate: string
  status: "Gözlənilir" | "Təsdiqlənib" | "İnkar edilib"
  filePath?: string
}

export default function HesabatAdminDocuments() {
  const [documents] = useState<DocumentRecord[]>([
    {
      id: 1,
      competitionName: "Fundamental Tədqiqatlar Qrant Müsabiqəsi 2024",
      submissionDate: "2024-03-15",
      status: "Təsdiqlənib",
      filePath: "/documents/fundamental-2024.pdf"
    },
    {
      id: 2,
      competitionName: "Tətbiqi Tədqiqatlar Qrant Müsabiqəsi 2024",
      submissionDate: "2024-03-18",
      status: "Gözlənilir",
      filePath: "/documents/tetbiqi-2024.pdf"
    },
    {
      id: 3,
      competitionName: "Gənc Alimlər Qrant Proqramı 2024",
      submissionDate: "2024-02-28",
      status: "İnkar edilib",
      filePath: "/documents/genc-alimler-2024.pdf"
    },
    {
      id: 4,
      competitionName: "Elmi Səfərlərin Dəstəklənməsi Proqramı 2024",
      submissionDate: "2024-01-20",
      status: "Təsdiqlənib",
      filePath: "/documents/seferler-2024.pdf"
    },
  ])

  const [selectedDocument, setSelectedDocument] = useState<DocumentRecord | null>(null)
  const [rejectReasonOpen, setRejectReasonOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [rejectingDocId, setRejectingDocId] = useState<number | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Təsdiqlənib":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Təsdiqlənib
          </Badge>
        )
      case "Gözlənilir":
        return (
          <Badge variant="outline">Gözlənilir</Badge>
        )
      case "İnkar edilib":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            İnkar edilib
          </Badge>
        )
      default:
        return null
    }
  }

  const handleApprove = (doc: DocumentRecord) => {
    alert(`Sənəd təsdiqləndi: ${doc.competitionName}\n\nİstifadəçiyə bildiriş gəndərildi.`)
  }

  const openRejectDialog = (docId: number) => {
    setRejectingDocId(docId)
    setRejectReason("")
    setRejectReasonOpen(true)
  }

  const handleReject = () => {
    const doc = documents.find(d => d.id === rejectingDocId)
    if (doc) {
      alert(`Sənəd rədd edildi: ${doc.competitionName}\n\nSəbəb: ${rejectReason || "Əlavə səbəb qeyd edilmədi"}\n\nİstifadəçiyə bildiriş gəndərildi.`)
    }
    setRejectReasonOpen(false)
  }

  const handleViewPDF = (doc: DocumentRecord) => {
    alert(`PDF açılırdı: ${doc.competitionName}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Sənədlər</h1>
        <p className="text-sm text-muted-foreground mt-1">Qrant müsabiqələrinin elmi-texniki hesabatları</p>
      </div>

      {/* Documents Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="border-b px-6 py-4">
          <CardTitle className="text-base">Sənədlərin Siyahısı ({documents.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-6 py-3 font-semibold text-sm">Müsabiqənin adı</th>
                  <th className="text-left px-6 py-3 font-semibold text-sm">Elektronik versiyağnı göndərilmə tarixi</th>
                  <th className="text-left px-6 py-3 font-semibold text-sm">Status</th>
                  <th className="text-left px-6 py-3 font-semibold text-sm">Əməliyyatlar</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">{doc.competitionName}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{doc.submissionDate}</td>
                    <td className="px-6 py-4">{getStatusBadge(doc.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {/* Baxış - PDF View Button */}
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 text-xs h-8 px-3"
                          onClick={() => handleViewPDF(doc)}
                          title="PDF'yi görüntüle"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Baxış
                        </Button>

                        {/* Approve Button - Only show if status is Gözlənilir */}
                        {doc.status === "Gözlənilir" && (
                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1 text-xs h-8 px-3"
                            onClick={() => handleApprove(doc)}
                            title="Sənədi təsdiq et"
                          >
                            <CheckCircle className="h-3.5 w-3.5" />
                            Təsdiqlə
                          </Button>
                        )}

                        {/* Reject Button - Only show if status is Gözlənilir */}
                        {doc.status === "Gözlənilir" && (
                          <Button
                            size="sm"
                            variant="destructive"
                            className="gap-1 text-xs h-8 px-3"
                            onClick={() => openRejectDialog(doc.id)}
                            title="Sənədi rədd et"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                            İnkar et
                          </Button>
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

      {/* Reject Reason Dialog */}
      <Dialog open={rejectReasonOpen} onOpenChange={setRejectReasonOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sənədi inkar et</DialogTitle>
            <DialogDescription>
              Sənədin rədd edilməsinin səbəbini yazın (isteğe bağlı)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="İnkar səbəbini yazın... (Boş qoyula bilər)"
              className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectReasonOpen(false)}>
              Ləğv et
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleReject}
            >
              İnkar et
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
