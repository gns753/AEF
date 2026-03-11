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
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Search, MoreVertical, Pencil, RefreshCw, Ban, Users } from "lucide-react"

interface UserRow {
  id: number
  firstName: string
  lastName: string
  email: string
  fin: string
  role: string
  status: "Aktiv" | "Deaktiv"
}

const initialUsers: UserRow[] = [
  { id: 1, firstName: "Əli", lastName: "Həsənov", email: "eli@mail.az", fin: "AA1234567", role: "İddiaçı", status: "Aktiv" },
  { id: 2, firstName: "Fuad", lastName: "Məmmədov", email: "fuad@mail.az", fin: "BB7654321", role: "Ekspert", status: "Aktiv" },
  { id: 3, firstName: "Sevinc", lastName: "Quliyeva", email: "sevinc@mail.az", fin: "CC9876543", role: "Fond İnzibatçısı", status: "Aktiv" },
  { id: 4, firstName: "Rauf", lastName: "Əliyev", email: "rauf@mail.az", fin: "DD1122334", role: "İddiaçı", status: "Deaktiv" },
  { id: 5, firstName: "Nigar", lastName: "Hüseynova", email: "nigar@mail.az", fin: "EE5566778", role: "Ekspert", status: "Aktiv" },
]

export default function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>(initialUsers)
  const [searchFirstName, setSearchFirstName] = useState("")
  const [searchLastName, setSearchLastName] = useState("")
  const [searchEmail, setSearchEmail] = useState("")
  const [searchFin, setSearchFin] = useState("")
  const [filterRole, setFilterRole] = useState("Hamısı")

  const [editOpen, setEditOpen] = useState(false)
  const [editUser, setEditUser] = useState<UserRow | null>(null)
  const [toast, setToast] = useState("")

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(""), 3000)
  }

  const filtered = users.filter((u) => {
    if (searchFirstName && !u.firstName.toLowerCase().includes(searchFirstName.toLowerCase())) return false
    if (searchLastName && !u.lastName.toLowerCase().includes(searchLastName.toLowerCase())) return false
    if (searchEmail && !u.email.toLowerCase().includes(searchEmail.toLowerCase())) return false
    if (searchFin && !u.fin.toLowerCase().includes(searchFin.toLowerCase())) return false
    if (filterRole !== "Hamısı" && u.role !== filterRole) return false
    return true
  })

  const handleEdit = (user: UserRow) => {
    setEditUser({ ...user })
    setEditOpen(true)
  }

  const handleSaveEdit = () => {
    if (!editUser) return
    setUsers((prev) => prev.map((u) => (u.id === editUser.id ? editUser : u)))
    setEditOpen(false)
    showToast("Uğurla yadda saxlanıldı")
  }

  const handleToggleStatus = (user: UserRow) => {
    const newStatus = user.status === "Aktiv" ? "Deaktiv" : "Aktiv"
    setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)))
    showToast(newStatus === "Deaktiv" ? "İstifadəçi deaktiv edildi" : "İstifadəçi aktiv edildi")
  }

  const handleChangeRole = (user: UserRow) => {
    setEditUser({ ...user })
    setEditOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium animate-in slide-in-from-top-2 fade-in duration-200">
          {toast}
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-red-50">
          <Users className="h-5 w-5 text-red-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">İstifadəçilər</h1>
          <p className="text-sm text-muted-foreground">Sistemdəki bütün istifadəçiləri idarə edin</p>
        </div>
      </div>

      {/* Search/Filter Panel */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
              <Input
                placeholder="Ad üzrə axtar"
                value={searchFirstName}
                onChange={(e) => setSearchFirstName(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>
            <Input
              placeholder="Soyad"
              value={searchLastName}
              onChange={(e) => setSearchLastName(e.target.value)}
              className="text-sm"
            />
            <Input
              placeholder="E-mail"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="text-sm"
            />
            <Input
              placeholder="FİN"
              value={searchFin}
              onChange={(e) => setSearchFin(e.target.value)}
              className="text-sm"
            />
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hamısı">Hamısı</SelectItem>
                <SelectItem value="İddiaçı">İddiaçı</SelectItem>
                <SelectItem value="Ekspert">Ekspert</SelectItem>
                <SelectItem value="Fond İnzibatçısı">Fond İnzibatçısı</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white text-sm"
              onClick={() => {
                setSearchFirstName("")
                setSearchLastName("")
                setSearchEmail("")
                setSearchFin("")
                setFilterRole("Hamısı")
              }}
            >
              Sıfırla
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            Nəticə: {filtered.length} istifadəçi
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ad</TableHead>
                  <TableHead>Soyad</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>FİN</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((u) => (
                  <TableRow key={u.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium">{u.firstName}</TableCell>
                    <TableCell>{u.lastName}</TableCell>
                    <TableCell className="text-muted-foreground">{u.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono text-xs">{u.fin}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          u.role === "İddiaçı"
                            ? "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100"
                            : u.role === "Ekspert"
                            ? "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100"
                            : "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                        }
                      >
                        {u.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <div className={`h-2 w-2 rounded-full ${u.status === "Aktiv" ? "bg-emerald-500" : "bg-red-500"}`} />
                        <span className={`text-sm ${u.status === "Aktiv" ? "text-emerald-700" : "text-red-600"}`}>
                          {u.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(u)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Məlumatları redaktə et
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleChangeRole(u)}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Rolu dəyiş
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleToggleStatus(u)}
                            className={u.status === "Aktiv" ? "text-red-600 focus:text-red-600" : "text-emerald-600 focus:text-emerald-600"}
                          >
                            <Ban className="h-4 w-4 mr-2" />
                            {u.status === "Aktiv" ? "Deaktiv et" : "Aktiv et"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {filtered.map((u) => (
              <div key={u.id} className="p-4 border rounded-lg space-y-2 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-foreground">{u.firstName} {u.lastName}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(u)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Redaktə et
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleStatus(u)} className={u.status === "Aktiv" ? "text-red-600" : "text-emerald-600"}>
                        <Ban className="h-4 w-4 mr-2" />
                        {u.status === "Aktiv" ? "Deaktiv et" : "Aktiv et"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="font-mono text-[10px]">{u.fin}</Badge>
                  <Badge className={
                    u.role === "İddiaçı"
                      ? "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100"
                      : u.role === "Ekspert"
                      ? "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100"
                      : "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                  }>
                    {u.role}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <div className={`h-2 w-2 rounded-full ${u.status === "Aktiv" ? "bg-emerald-500" : "bg-red-500"}`} />
                    <span className="text-xs">{u.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>İstifadəçini redaktə et</DialogTitle>
          </DialogHeader>
          {editUser && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Ad</Label>
                <Input value={editUser.firstName} onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Soyad</Label>
                <Input value={editUser.lastName} onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>E-mail</Label>
                <Input value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>FİN</Label>
                <Input value={editUser.fin} onChange={(e) => setEditUser({ ...editUser, fin: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Rol</Label>
                <Select value={editUser.role} onValueChange={(val) => setEditUser({ ...editUser, role: val })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="İddiaçı">İddiaçı</SelectItem>
                    <SelectItem value="Ekspert">Ekspert</SelectItem>
                    <SelectItem value="Fond İnzibatçısı">Fond İnzibatçısı</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={editUser.status} onValueChange={(val) => setEditUser({ ...editUser, status: val as "Aktiv" | "Deaktiv" })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aktiv">Aktiv</SelectItem>
                    <SelectItem value="Deaktiv">Deaktiv</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Ləğv et</Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleSaveEdit}>Yadda saxla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
