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
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Trophy, Plus, Search, Pencil } from "lucide-react"

interface Participant {
  id: number
  firstName: string
  lastName: string
  fin: string
  email: string
  competition: string
  role: string
  status: "Aktiv" | "Deaktiv"
}

const competitions = [
  "Gənc alimlər üçün qrant müsabiqəsi",
  "İnnovasiya layihələri müsabiqəsi",
  "Fundamental tədqiqatlar proqramı",
]

const roles = ["Layihə rəhbəri", "Tədqiqatçı", "Laborant", "Məsləhətçi"]

const initialParticipants: Participant[] = [
  { id: 1, firstName: "Rauf", lastName: "Əliyev", fin: "AA1234567", email: "rauf@mail.az", competition: "Gənc alimlər üçün qrant müsabiqəsi", role: "Layihə rəhbəri", status: "Aktiv" },
  { id: 2, firstName: "Aytən", lastName: "Nəsirli", fin: "BB7654321", email: "ayten@mail.az", competition: "Gənc alimlər üçün qrant müsabiqəsi", role: "Tədqiqatçı", status: "Aktiv" },
  { id: 3, firstName: "Nigar", lastName: "Hüseynova", fin: "CC9876543", email: "nigar@mail.az", competition: "İnnovasiya layihələri müsabiqəsi", role: "Layihə rəhbəri", status: "Aktiv" },
  { id: 4, firstName: "Kamran", lastName: "Rüstəmov", fin: "DD1122334", email: "kamran@mail.az", competition: "Gənc alimlər üçün qrant müsabiqəsi", role: "Laborant", status: "Deaktiv" },
]

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants)
  const [searchFirstName, setSearchFirstName] = useState("")
  const [searchLastName, setSearchLastName] = useState("")
  const [searchFin, setSearchFin] = useState("")

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editParticipant, setEditParticipant] = useState<Participant | null>(null)
  const [formFirstName, setFormFirstName] = useState("")
  const [formLastName, setFormLastName] = useState("")
  const [formFin, setFormFin] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formCompetition, setFormCompetition] = useState("")
  const [formRole, setFormRole] = useState("")
  const [toast, setToast] = useState("")

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(""), 3000)
  }

  const filtered = participants.filter((p) => {
    if (searchFirstName && !p.firstName.toLowerCase().includes(searchFirstName.toLowerCase())) return false
    if (searchLastName && !p.lastName.toLowerCase().includes(searchLastName.toLowerCase())) return false
    if (searchFin && !p.fin.toLowerCase().includes(searchFin.toLowerCase())) return false
    return true
  })

  const openAdd = () => {
    setEditParticipant(null)
    setFormFirstName("")
    setFormLastName("")
    setFormFin("")
    setFormEmail("")
    setFormCompetition("")
    setFormRole("")
    setDialogOpen(true)
  }

  const openEdit = (p: Participant) => {
    setEditParticipant(p)
    setFormFirstName(p.firstName)
    setFormLastName(p.lastName)
    setFormFin(p.fin)
    setFormEmail(p.email)
    setFormCompetition(p.competition)
    setFormRole(p.role)
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (!formFirstName.trim() || !formLastName.trim()) return
    if (editParticipant) {
      setParticipants((prev) =>
        prev.map((p) =>
          p.id === editParticipant.id
            ? { ...p, firstName: formFirstName, lastName: formLastName, fin: formFin, email: formEmail, competition: formCompetition, role: formRole }
            : p
        )
      )
      showToast("Uğurla yadda saxlanıldı")
    } else {
      const newP: Participant = {
        id: Date.now(),
        firstName: formFirstName,
        lastName: formLastName,
        fin: formFin,
        email: formEmail,
        competition: formCompetition,
        role: formRole,
        status: "Aktiv",
      }
      setParticipants((prev) => [...prev, newP])
      showToast("Uğurla əlavə edildi")
    }
    setDialogOpen(false)
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
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-50">
            <Trophy className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Müsabiqələrin iştirakçıları</h1>
            <p className="text-sm text-muted-foreground">İştirakçıları idarə edin</p>
          </div>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={openAdd}>
          <Plus className="h-4 w-4 mr-1.5" />
          Yeni iştirakçı əlavə edin
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
              <Input
                placeholder="Ad üzrə axtar"
                value={searchFirstName}
                onChange={(e) => setSearchFirstName(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>
            <Input placeholder="Soyad" value={searchLastName} onChange={(e) => setSearchLastName(e.target.value)} className="text-sm" />
            <Input placeholder="FİN" value={searchFin} onChange={(e) => setSearchFin(e.target.value)} className="text-sm" />
            <Button
              variant="outline"
              onClick={() => { setSearchFirstName(""); setSearchLastName(""); setSearchFin("") }}
              className="text-sm"
            >
              Sıfırla
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Nəticə: {filtered.length} iştirakçı</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="hidden lg:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ad</TableHead>
                  <TableHead>Soyad</TableHead>
                  <TableHead>FİN</TableHead>
                  <TableHead>Müsabiqə</TableHead>
                  <TableHead>Rolu</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow key={p.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium">{p.firstName}</TableCell>
                    <TableCell>{p.lastName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono text-xs">{p.fin}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px] truncate">{p.competition}</TableCell>
                    <TableCell>
                      <Badge className="bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-100">
                        {p.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <div className={`h-2 w-2 rounded-full ${p.status === "Aktiv" ? "bg-emerald-500" : "bg-red-500"}`} />
                        <span className={`text-sm ${p.status === "Aktiv" ? "text-emerald-700" : "text-red-600"}`}>
                          {p.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(p)}>
                        <Pencil className="h-3.5 w-3.5 mr-1" />
                        Redaktə edin
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-3">
            {filtered.map((p) => (
              <div key={p.id} className="p-4 border rounded-lg space-y-2 hover:bg-slate-50">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-foreground">{p.firstName} {p.lastName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.competition}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={`h-2 w-2 rounded-full ${p.status === "Aktiv" ? "bg-emerald-500" : "bg-red-500"}`} />
                    <span className="text-xs">{p.status}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="font-mono text-[10px]">{p.fin}</Badge>
                  <Badge className="bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-100 text-xs">{p.role}</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => openEdit(p)}>
                  <Pencil className="h-3 w-3 mr-1" /> Redaktə edin
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editParticipant ? "İştirakçını redaktə et" : "Yeni iştirakçı əlavə et"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Ad</Label>
                <Input value={formFirstName} onChange={(e) => setFormFirstName(e.target.value)} placeholder="Ad" />
              </div>
              <div className="space-y-2">
                <Label>Soyad</Label>
                <Input value={formLastName} onChange={(e) => setFormLastName(e.target.value)} placeholder="Soyad" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>FİN</Label>
                <Input value={formFin} onChange={(e) => setFormFin(e.target.value)} placeholder="FİN" />
              </div>
              <div className="space-y-2">
                <Label>E-mail</Label>
                <Input value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder="E-mail" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Müsabiqə</Label>
              <Select value={formCompetition} onValueChange={setFormCompetition}>
                <SelectTrigger>
                  <SelectValue placeholder="Seçin..." />
                </SelectTrigger>
                <SelectContent>
                  {competitions.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Rolu</Label>
              <Select value={formRole} onValueChange={setFormRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Seçin..." />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Ləğv et</Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleSave}>
              {editParticipant ? "Yadda saxla" : "Əlavə et"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
