"use client"

import { useState, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import { FileText, Download, Plus, Pencil, Trash2, AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react"

// Sənəd şablonları
const documentTemplates = [
  {
    id: 1,
    title: "Müqavilə üçün lazım olan sənədlər",
    size: "1.2 MB",
  },
  {
    id: 2,
    title: "Ezamiyyət hesabatları",
    size: "890 KB",
  },
  {
    id: 3,
    title: "Yekun hesabat",
    size: "1.5 MB",
  },
  {
    id: 4,
    title: "Layihənin qısa forması",
    size: "650 KB",
  },
  {
    id: 5,
    title: "Elmi hesabat",
    size: "2.1 MB",
  },
]

// İstifadəçinin yüklədiyi sənədlər
const initialUserDocuments = [
  {
    id: 1,
    name: "Layihə_təklifi_2026.pdf",
    uploadDate: "15 Yanvar 2026",
    status: "Təsdiqlənib",
    rejectReason: null,
  },
  {
    id: 2,
    name: "Büdcə_planı.pdf",
    uploadDate: "14 Yanvar 2026",
    status: "Gözləmədə",
    rejectReason: null,
  },
  {
    id: 3,
    name: "CV_tədqiqatçı.pdf",
    uploadDate: "10 Yanvar 2026",
    status: "İmtina edilib",
    rejectReason: "Sənəddə imza yoxdur. Zəhmət olmasa imzalı versiyanı yükləyin.",
  },
]

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  "Təsdiqlənib": {
    color: "bg-emerald-100 text-emerald-700",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  "Gözləmədə": {
    color: "bg-amber-100 text-amber-700",
    icon: <Clock className="h-3.5 w-3.5" />,
  },
  "İmtina edilib": {
    color: "bg-red-100 text-red-700",
    icon: <XCircle className="h-3.5 w-3.5" />,
  },
}

interface UserDocument {
  id: number
  name: string
  uploadDate: string
  status: string
  rejectReason: string | null
}

export default function DocumentsPage() {
  const [userDocuments, setUserDocuments] = useState<UserDocument[]>(initialUserDocuments)
  const [editingDoc, setEditingDoc] = useState<UserDocument | null>(null)
  const [editName, setEditName] = useState("")
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadError, setUploadError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== "application/pdf") {
        setUploadError("Yalnız PDF formatında fayllar qəbul edilir!")
        setSelectedFile(null)
        return
      }
      setUploadError("")
      setSelectedFile(file)
    }
  }

  const handleUpload = () => {
    if (!selectedFile) return

    const newDoc: UserDocument = {
      id: Date.now(),
      name: selectedFile.name,
      uploadDate: new Date().toLocaleDateString("az-AZ", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      status: "Gözləmədə",
      rejectReason: null,
    }

    setUserDocuments([newDoc, ...userDocuments])
    setShowUploadDialog(false)
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleEditSave = () => {
    if (!editingDoc || !editName.trim()) return

    setUserDocuments(
      userDocuments.map((doc) =>
        doc.id === editingDoc.id ? { ...doc, name: editName } : doc
      )
    )
    setEditingDoc(null)
    setEditName("")
  }

  const handleDelete = (id: number) => {
    setUserDocuments(userDocuments.filter((doc) => doc.id !== id))
  }

  const openEditDialog = (doc: UserDocument) => {
    setEditingDoc(doc)
    setEditName(doc.name)
  }

  return (
    <div className="space-y-8">
      {/* Sənəd şablonları */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Sənəd şablonları
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {documentTemplates.map((template) => (
              <div
                key={template.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-red-50 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{template.title}</p>
                    <p className="text-xs text-muted-foreground">PDF • {template.size}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-3.5 w-3.5 mr-1.5" />
                  Yüklə
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Əlavə edilmiş sənədlər */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Əlavə edilmiş sənədlər
          </CardTitle>
          <Button onClick={() => setShowUploadDialog(true)} size="sm">
            <Plus className="h-4 w-4 mr-1.5" />
            Sənəd əlavə et
          </Button>
        </CardHeader>
        <CardContent>
          {userDocuments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Hələ heç bir sənəd əlavə edilməyib</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sənədin adı</TableHead>
                    <TableHead>Yüklənmə tarixi</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>İmtina səbəbi</TableHead>
                    <TableHead className="text-right">Əməliyyatlar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-red-600" />
                          <span className="font-medium text-sm">{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {doc.uploadDate}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${statusConfig[doc.status]?.color} flex items-center gap-1 w-fit`}>
                          {statusConfig[doc.status]?.icon}
                          {doc.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {doc.rejectReason ? (
                          <div className="flex items-start gap-1.5 max-w-xs">
                            <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                            <span className="text-sm text-red-600">{doc.rejectReason}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => openEditDialog(doc)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(doc.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sənəd yükləmə dialoqu */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sənəd əlavə et</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <FileText className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-1">
                PDF faylı seçmək üçün klikləyin
              </p>
              <p className="text-xs text-muted-foreground">
                Yalnız PDF formatı qəbul edilir
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>

            {selectedFile && (
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <FileText className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium">{selectedFile.name}</span>
              </div>
            )}

            {uploadError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg text-red-600">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm">{uploadError}</span>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
              Ləğv et
            </Button>
            <Button onClick={handleUpload} disabled={!selectedFile}>
              Yüklə
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sənəd adını redaktə etmə dialoqu */}
      <Dialog open={!!editingDoc} onOpenChange={() => setEditingDoc(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sənəd adını redaktə et</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Sənədin adı"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingDoc(null)}>
              Ləğv et
            </Button>
            <Button onClick={handleEditSave}>Yadda saxla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
