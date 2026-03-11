"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Tag, Plus, Pencil, Trash2 } from "lucide-react"

interface Role {
  id: number
  name: string
  description: string
  userCount: number
}

const initialRoles: Role[] = [
  { id: 1, name: "İddiaçı", description: "Qrant müsabiqəsinə müraciət edən şəxs", userCount: 2 },
  { id: 2, name: "Ekspert", description: "Layihələri qiymətləndirən mütəxəssis", userCount: 2 },
  { id: 3, name: "Fond İnzibatçısı", description: "Müsabiqə prosesini idarə edən şəxs", userCount: 1 },
  { id: 4, name: "Admin", description: "Sistem idarəçisi", userCount: 1 },
]

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editRole, setEditRole] = useState<Role | null>(null)
  const [formName, setFormName] = useState("")
  const [formDesc, setFormDesc] = useState("")
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteRole, setDeleteRole] = useState<Role | null>(null)
  const [toast, setToast] = useState("")

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(""), 3000)
  }

  const openAdd = () => {
    setEditRole(null)
    setFormName("")
    setFormDesc("")
    setDialogOpen(true)
  }

  const openEdit = (role: Role) => {
    setEditRole(role)
    setFormName(role.name)
    setFormDesc(role.description)
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (!formName.trim()) return
    if (editRole) {
      setRoles((prev) =>
        prev.map((r) =>
          r.id === editRole.id ? { ...r, name: formName, description: formDesc } : r
        )
      )
      showToast("Uğurla yadda saxlanıldı")
    } else {
      const newRole: Role = {
        id: Date.now(),
        name: formName,
        description: formDesc,
        userCount: 0,
      }
      setRoles((prev) => [...prev, newRole])
      showToast("Uğurla əlavə edildi")
    }
    setDialogOpen(false)
  }

  const handleDelete = () => {
    if (!deleteRole) return
    setRoles((prev) => prev.filter((r) => r.id !== deleteRole.id))
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
            <Tag className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Rollar</h1>
            <p className="text-sm text-muted-foreground">Sistem rollarını idarə edin</p>
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
          <CardTitle className="text-base">Cəmi: {roles.length} rol</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rolun adı</TableHead>
                  <TableHead>Açıqlama</TableHead>
                  <TableHead className="text-center">İstifadəçi sayı</TableHead>
                  <TableHead className="text-right">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((r) => (
                  <TableRow key={r.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell className="text-muted-foreground max-w-xs truncate">{r.description}</TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 text-sm font-medium text-slate-700">
                        {r.userCount}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(r)}>
                          <Pencil className="h-3.5 w-3.5 mr-1" />
                          Redaktə et
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => { setDeleteRole(r); setDeleteOpen(true) }}
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
            {roles.map((r) => (
              <div key={r.id} className="p-4 border rounded-lg space-y-2 hover:bg-slate-50">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{r.description}</p>
                  </div>
                  <span className="text-sm font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">{r.userCount}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => openEdit(r)}>
                    <Pencil className="h-3 w-3 mr-1" /> Redaktə et
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs text-red-600 border-red-200 hover:bg-red-50" onClick={() => { setDeleteRole(r); setDeleteOpen(true) }}>
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
            <DialogTitle>{editRole ? "Rolu redaktə et" : "Yeni rol əlavə et"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Rolun adı</Label>
              <Input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Rolun adını daxil edin" />
            </div>
            <div className="space-y-2">
              <Label>Açıqlama</Label>
              <Textarea value={formDesc} onChange={(e) => setFormDesc(e.target.value)} placeholder="Rolun açıqlaması" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Ləğv et</Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleSave}>
              {editRole ? "Yadda saxla" : "Əlavə et"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Rolu sil</DialogTitle>
            <DialogDescription>
              Bu rolu silmək istədiyinizdən əminsiniz?
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
