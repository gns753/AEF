"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Pencil, Filter, Calendar } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface User {
  id: string
  lastName: string
  firstName: string
  fatherName: string
  birthDate: string
  registrationDate: string
  email: string
  fin: string
  asanNumber: string
  isExpert: boolean
  expertApproved: boolean
  roles: string[]
  active: boolean
}

const allRoles = [
  "İddiaçı (layihə rəhbəri)",
  "İddiaçı (iştirakçı)",
  "Ekspert",
  "Fond inzibatçısı",
  "Ekspertiza üzrə admin",
  "Elmi-texniki hesabat üzrə admin",
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      lastName: "Məmmədov",
      firstName: "Elşən",
      fatherName: "Rəşid",
      birthDate: "1990-05-15",
      registrationDate: "2024-01-10",
      email: "e.mammadov@mail.az",
      fin: "5XH7K9L",
      asanNumber: "1234567",
      isExpert: true,
      expertApproved: true,
      roles: ["İddiaçı (layihə rəhbəri)", "Ekspert"],
      active: true,
    },
    {
      id: "2",
      lastName: "Əliyeva",
      firstName: "Günel",
      fatherName: "Əli",
      birthDate: "1985-08-20",
      registrationDate: "2024-02-05",
      email: "g.aliyeva@mail.az",
      fin: "7AB3D2K",
      asanNumber: "2345678",
      isExpert: true,
      expertApproved: false,
      roles: ["İddiaçı (iştirakçı)"],
      active: true,
    },
    {
      id: "3",
      lastName: "Həsənov",
      firstName: "Orxan",
      fatherName: "Fəxrəddin",
      birthDate: "1988-12-03",
      registrationDate: "2024-03-15",
      email: "o.hasanov@mail.az",
      fin: "3CD9E5F",
      asanNumber: "3456789",
      isExpert: false,
      expertApproved: false,
      roles: ["İddiaçı (layihə rəhbəri)"],
      active: true,
    },
    {
      id: "4",
      lastName: "Quliyev",
      firstName: "Rəşad",
      fatherName: "Zakir",
      birthDate: "1992-04-25",
      registrationDate: "2024-01-20",
      email: "r.quliyev@mail.az",
      fin: "9GH1J4K",
      asanNumber: "4567890",
      isExpert: true,
      expertApproved: true,
      roles: ["Ekspert", "Fond inzibatçısı"],
      active: true,
    },
    {
      id: "5",
      lastName: "Hüseynova",
      firstName: "Ləman",
      fatherName: "Natiq",
      birthDate: "1995-07-10",
      registrationDate: "2024-04-01",
      email: "l.huseynova@mail.az",
      fin: "2LM6N8P",
      asanNumber: "5678901",
      isExpert: false,
      expertApproved: false,
      roles: ["İddiaçı (iştirakçı)"],
      active: false,
    },
  ])

  // Search & Filter States
  const [searchName, setSearchName] = useState("")
  const [searchBirthDate, setSearchBirthDate] = useState("")
  const [searchEmail, setSearchEmail] = useState("")
  const [searchFin, setSearchFin] = useState("")
  const [filterRole, setFilterRole] = useState<string>("all")
  const [filterExpertStatus, setFilterExpertStatus] = useState<string>("all")
  const [rowsPerPage, setRowsPerPage] = useState<string>("10")

  // Edit Dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [editForm, setEditForm] = useState<{ active: boolean; roles: string[] }>({ active: true, roles: [] })

  const openEditUser = (user: User) => {
    setEditingUser(user)
    setEditForm({ active: user.active, roles: [...user.roles] })
    setEditDialogOpen(true)
  }

  const handleRoleChange = (role: string, checked: boolean) => {
    if (checked) {
      setEditForm({ ...editForm, roles: [...editForm.roles, role] })
    } else {
      setEditForm({ ...editForm, roles: editForm.roles.filter(r => r !== role) })
    }
  }

  const saveUser = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, active: editForm.active, roles: editForm.roles } : u))
    }
    setEditDialogOpen(false)
  }

  // Filter users
  const filteredUsers = users.filter(user => {
    const nameMatch = `${user.lastName} ${user.firstName} ${user.fatherName}`.toLowerCase().includes(searchName.toLowerCase())
    const birthMatch = searchBirthDate ? user.birthDate === searchBirthDate : true
    const emailMatch = user.email.toLowerCase().includes(searchEmail.toLowerCase())
    const finMatch = user.fin.toLowerCase().includes(searchFin.toLowerCase())
    const roleMatch = filterRole === "all" || user.roles.includes(filterRole)
    const expertMatch = filterExpertStatus === "all" ||
      (filterExpertStatus === "approved" && user.expertApproved) ||
      (filterExpertStatus === "pending" && user.isExpert && !user.expertApproved)
    
    return nameMatch && birthMatch && emailMatch && finMatch && roleMatch && expertMatch
  }).slice(0, parseInt(rowsPerPage))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">İstifadəçilər</h1>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Axtarış və filtrlər
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Soyad / Ad / Ata adı</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Axtar..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Doğum tarixi</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={searchBirthDate}
                  onChange={(e) => setSearchBirthDate(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">E-mail</label>
              <Input
                placeholder="E-mail..."
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">FİN (5-7 simvol)</label>
              <Input
                placeholder="FİN..."
                value={searchFin}
                onChange={(e) => setSearchFin(e.target.value.slice(0, 7))}
                minLength={5}
                maxLength={7}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Rola görə filtr</label>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Hamısı" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Hamısı</SelectItem>
                  {allRoles.map((role) => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Ekspert statusu</label>
              <Select value={filterExpertStatus} onValueChange={setFilterExpertStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Hamısı" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Hamısı</SelectItem>
                  <SelectItem value="approved">Təsdiqlənmiş</SelectItem>
                  <SelectItem value="pending">Təsdiqlənməmiş</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Bir səhifədə sətir sayı</label>
              <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full" onClick={() => {}}>
                <Search className="h-4 w-4 mr-2" />
                Axtar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>İstifadəçi siyahısı ({filteredUsers.length} nəticə)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Soyad</TableHead>
                  <TableHead>Ad</TableHead>
                  <TableHead>Ata adı</TableHead>
                  <TableHead>Doğum tarixi</TableHead>
                  <TableHead>Qeydiyyat tarixi</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>FİN</TableHead>
                  <TableHead>ASAN nömrə</TableHead>
                  <TableHead>Ekspert fəaliyyəti</TableHead>
                  <TableHead>Rollar</TableHead>
                  <TableHead className="text-right">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.lastName}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.fatherName}</TableCell>
                    <TableCell>{user.birthDate}</TableCell>
                    <TableCell>{user.registrationDate}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.fin}</TableCell>
                    <TableCell>{user.asanNumber}</TableCell>
                    <TableCell>
                      {user.isExpert ? (
                        <Badge variant={user.expertApproved ? "default" : "secondary"}>
                          {user.expertApproved ? "Təsdiqlənmiş" : "Gözləmədə"}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.roles.map((role) => (
                          <Badge key={role} variant="outline" className="text-xs">
                            {role.length > 15 ? role.slice(0, 15) + "..." : role}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openEditUser(user)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>İstifadəçini redaktə et</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-6">
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-medium">{editingUser.lastName} {editingUser.firstName} {editingUser.fatherName}</p>
                <p className="text-sm text-muted-foreground">{editingUser.email}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">İstifadəçinin statusu</label>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={editForm.active}
                    onCheckedChange={(checked) => setEditForm({ ...editForm, active: !!checked })}
                  />
                  <span className="text-sm">Aktiv</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Rollar siyahısı</label>
                <div className="space-y-2 p-4 border rounded-lg">
                  {allRoles.map((role) => (
                    <div key={role} className="flex items-center gap-2">
                      <Checkbox
                        checked={editForm.roles.includes(role)}
                        onCheckedChange={(checked) => handleRoleChange(role, !!checked)}
                      />
                      <span className="text-sm">{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>İmtina et</Button>
            <Button onClick={saveUser}>Təsdiq et</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
