"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Key, Plus, Pencil, Trash2 } from "lucide-react"

interface Permission {
  id: number
  name: string
  code: string
  module: string
  description: string
}

const modules = ["Layihələr", "İstifadəçilər", "Ekspertiza", "Müsabiqələr", "Hesabatlar"]

const initialPermissions: Permission[] = [
  { id: 1, name: "Layihəyə baxış", code: "project.view", module: "Layihələr", description: "Layihələrə baxış icazəsi" },
  { id: 2, name: "Layihəni redaktə et", code: "project.edit", module: "Layihələr", description: "Layihəni redaktə etmək icazəsi" },
  { id: 3, name: "İstifadəçiləri idarə et", code: "user.manage", module: "İstifadəçilər", description: "İstifadəçi idarəetmə icazəsi" },
  { id: 4, name: "Ekspertiza aparmaq", code: "expert.evaluate", module: "Ekspertiza", description: "Ekspertiza aparmaq icazəsi" },
  { id: 5, name: "Müsabiqə yaratmaq", code: "competition.create", module: "Müsabiqələr", description: "Yeni müsabiqə yaratmaq icazəsi" },
  { id: 6, name: "Hesabatlara baxış", code: "report.view", module: "Hesabatlar", description: "Hesabatlara baxış icazəsi" },
]

const moduleBadgeColors: Record<string, string> = {
  "Layihələr": "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100",
  "İstifadəçilər": "bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-100",
  "Ekspertiza": "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100",
  "Müsabiqələr": "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
  "Hesabatlar": "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-100",
}

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>(initialPermissions)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editPerm, setEditPerm] = useState<Permission | null>(null)
  const [formName, setFormName] = useState("")
  const [formCode, setFormCode] = useState("")
  const [formModule, setFormModule] = useState("")
  const [formDesc, setFormDesc] = useState("")
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deletePerm, setDeletePerm] = useState<Permission | null>(null)
  const [toast, setToast] = useState("")

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(""), 3000)
  }

  const openAdd = () => {
    setEditPerm(null)
    setFormName("")
    setFormCode("")
    setFormModule("")
    setFormDesc("")
    setDialogOpen(true)
  }

  const openEdit = (p: Permission) => {
    setEditPerm(p)
    setFormName(p.name)
    setFormCode(p.code)
    setFormModule(p.module)
    setFormDesc(p.description)
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (!formName.trim() || !formCode.trim() || !formModule) return
    if (editPerm) {
      setPermissions((prev) =>
        prev.map((p) =>
          p.id === editPerm.id ? { ...p, name: formName, code: formCode, module: formModule, description: formDesc } : p
        )
      )
      showToast("Uğurla yadda saxlanıldı")
    } else {
      const newPerm: Permission = {
        id: Date.now(),
        name: formName,
        code: formCode,
        module: formModule,
        description: formDesc,
      }
      setPermissions((prev) => [...prev, newPerm])
      showToast("Uğurla əlavə edildi")
    }
    setDialogOpen(false)
  }

  const handleDelete = () => {
    if (!deletePerm) return
    setPermissions((prev) => prev.filter((p) => p.id !== deletePerm.id))
    setDeleteOpen(false)
    showToast("Uğurla silindi")
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium animate-in slide-in-from-top-2 fade-in duration-200">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-50">
            <Key className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Səlahiyyətlər</h1>
            <p className="text-sm text-muted-foreground">Sistem səlahiyyətlərini idarə edin</p>
          </div>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={openAdd}>
          <Plus className="h-4 w-4 mr-1.5" />
          Əlavə et
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Cəmi: {permissions.length} səlahiyyət</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Səlahiyyətin adı</TableHead>
                  <TableHead>Kod</TableHead>
                  <TableHead>Modul</TableHead>
                  <TableHead className="text-right">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {permissions.map((p) => (
                  <TableRow key={p.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono text-xs">{p.code}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={moduleBadgeColors[p.module] || "bg-muted text-foreground"}>
                        {p.module}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(p)}>
                          <Pencil className="h-3.5 w-3.5 mr-1" />
                          Redaktə et
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => { setDeletePerm(p); setDeleteOpen(true) }}
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" />
                          Sil
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {permissions.map((p) => (
              <div key={p.id} className="p-4 border rounded-lg space-y-2 hover:bg-slate-50">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-foreground">{p.name}</p>
                    <Badge variant="outline" className="font-mono text-[10px] mt-1">{p.code}</Badge>
                  </div>
                  <Badge className={moduleBadgeColors[p.module] || "bg-muted text-foreground"}>
                    {p.module}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => openEdit(p)}>
                    <Pencil className="h-3 w-3 mr-1" /> Redaktə et
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs text-red-600 border-red-200 hover:bg-red-50" onClick={() => { setDeletePerm(p); setDeleteOpen(true) }}>
                    <Trash2 className="h-3 w-3 mr-1" /> Sil
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editPerm ? "Səlahiyyəti redaktə et" : "Yeni səlahiyyət əlavə et"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Səlahiyyətin adı</Label>
              <Input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Səlahiyyətin adını daxil edin" />
            </div>
            <div className="space-y-2">
              <Label>Kod</Label>
              <Input value={formCode} onChange={(e) => setFormCode(e.target.value)} placeholder="Məs: project.view" className="font-mono" />
            </div>
            <div className="space-y-2">
              <Label>Modul</Label>
              <Select value={formModule} onValueChange={setFormModule}>
                <SelectTrigger>
                  <SelectValue placeholder="Seçin..." />
                </SelectTrigger>
                <SelectContent>
                  {modules.map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Açıqlama</Label>
              <Textarea value={formDesc} onChange={(e) => setFormDesc(e.target.value)} placeholder="Açıqlama" rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Ləğv et</Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleSave}>
              {editPerm ? "Yadda saxla" : "Əlavə et"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Səlahiyyəti sil</DialogTitle>
            <DialogDescription>
              Bu səlahiyyəti silmək istədiyinizdən əminsiniz?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>Xeyr</Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDelete}>Bəli, sil</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
