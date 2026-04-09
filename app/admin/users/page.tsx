"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
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
import { Textarea } from "@/components/ui/textarea"
import { Search, Pencil, Filter, Calendar, Plus, Trash2, Tag, Key, Trophy, Users, UserPlus, CheckCircle, XCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

// ============== TYPES ==============
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

interface Role {
  id: number
  name: string
  description: string
  userCount: number
}

interface Permission {
  id: number
  name: string
  code: string
  module: string
  description: string
}

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

interface ExpertApplication {
  id: string
  lastName: string
  firstName: string
  email: string
  currentRole: string
  applicationStatus: "Gözlənilir" | "Təsdiqlənib" | "İnkar edilib"
  fin: string
  applicationDate: string
}

// ============== DATA ==============
const allRoles = [
  "İddiaçı",
  "Ekspert",
  "Fond inzibatçısı",
  "Ekspertiza üzrə admin",
  "Elmi-texniki hesabat üzrə admin",
]

const modules = ["Layihələr", "İstifadəçilər", "Ekspertiza", "Müsabiqələr", "Hesabatlar"]

const competitions = [
  "Gənc alimlər üçün qrant müsabiqəsi",
  "İnnovasiya layihələri müsabiqəsi",
  "Fundamental tədqiqatlar proqramı",
]

const participantRoles = ["Layihə rəhbəri", "Tədqiqatçı", "Laborant", "Məsləhətçi"]

const moduleBadgeColors: Record<string, string> = {
  "Layihələr": "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100",
  "İstifadəçilər": "bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-100",
  "Ekspertiza": "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100",
  "Müsabiqələr": "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
  "Hesabatlar": "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-100",
}

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState("users")
  const [toast, setToast] = useState("")

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(""), 3000)
  }

  // ============== USERS STATE ==============
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
      roles: ["İddiaçı", "Ekspert"],
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
      roles: ["İddiaçı"],
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
      roles: ["İddiaçı"],
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
      roles: ["İddiaçı"],
      active: false,
    },
  ])

  const [searchName, setSearchName] = useState("")
  const [searchBirthDate, setSearchBirthDate] = useState("")
  const [searchEmail, setSearchEmail] = useState("")
  const [searchFin, setSearchFin] = useState("")
  const [filterRole, setFilterRole] = useState<string>("all")
  const [filterExpertStatus, setFilterExpertStatus] = useState<string>("all")
  const [rowsPerPage, setRowsPerPage] = useState<string>("10")
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
      showToast("İstifadəçi yeniləndi")
    }
    setEditDialogOpen(false)
  }

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

  // ============== ROLES STATE ==============
  const [roles, setRoles] = useState<Role[]>([
    { id: 1, name: "İddiaçı", description: "Qrant müsabiqəsinə müraciət edən şəxs", userCount: 2 },
    { id: 2, name: "Ekspert", description: "Layihələri qiymətləndirən mütəxəssis", userCount: 2 },
    { id: 3, name: "Fond İnzibatçısı", description: "Müsabiqə prosesini idarə edən şəxs", userCount: 1 },
    { id: 4, name: "Ekspertiza üzrə admin", description: "Ekspertiza prosesini idarə edən admin", userCount: 1 },
    { id: 5, name: "Elmi-texniki hesabat üzrə admin", description: "Hesabat idarəsi", userCount: 1 },
  ])
  const [roleDialogOpen, setRoleDialogOpen] = useState(false)
  const [editRole, setEditRole] = useState<Role | null>(null)
  const [roleFormName, setRoleFormName] = useState("")
  const [roleFormDesc, setRoleFormDesc] = useState("")
  const [deleteRoleOpen, setDeleteRoleOpen] = useState(false)
  const [deleteRole, setDeleteRole] = useState<Role | null>(null)

  const openAddRole = () => {
    setEditRole(null)
    setRoleFormName("")
    setRoleFormDesc("")
    setRoleDialogOpen(true)
  }

  const openEditRole = (role: Role) => {
    setEditRole(role)
    setRoleFormName(role.name)
    setRoleFormDesc(role.description)
    setRoleDialogOpen(true)
  }

  const handleSaveRole = () => {
    if (!roleFormName.trim()) return
    if (editRole) {
      setRoles(roles.map(r => r.id === editRole.id ? { ...r, name: roleFormName, description: roleFormDesc } : r))
      showToast("Rol yeniləndi")
    } else {
      setRoles([...roles, { id: Date.now(), name: roleFormName, description: roleFormDesc, userCount: 0 }])
      showToast("Rol əlavə edildi")
    }
    setRoleDialogOpen(false)
  }

  const handleDeleteRole = () => {
    if (!deleteRole) return
    setRoles(roles.filter(r => r.id !== deleteRole.id))
    setDeleteRoleOpen(false)
    showToast("Rol silindi")
  }

  // ============== PERMISSIONS STATE ==============
  const [permissions, setPermissions] = useState<Permission[]>([
    { id: 1, name: "Layihəyə baxış", code: "project.view", module: "Layihələr", description: "Layihələrə baxış icazəsi" },
    { id: 2, name: "Layihəni redaktə et", code: "project.edit", module: "Layihələr", description: "Layihəni redaktə etmək icazəsi" },
    { id: 3, name: "İstifadəçiləri idarə et", code: "user.manage", module: "İstifadəçilər", description: "İstifadəçi idarəetmə icazəsi" },
    { id: 4, name: "Ekspertiza aparmaq", code: "expert.evaluate", module: "Ekspertiza", description: "Ekspertiza aparmaq icazəsi" },
    { id: 5, name: "Müsabiqə yaratmaq", code: "competition.create", module: "Müsabiqələr", description: "Yeni müsabiqə yaratmaq icazəsi" },
    { id: 6, name: "Hesabatlara baxış", code: "report.view", module: "Hesabatlar", description: "Hesabatlara baxış icazəsi" },
  ])
  const [permDialogOpen, setPermDialogOpen] = useState(false)
  const [editPerm, setEditPerm] = useState<Permission | null>(null)
  const [permFormName, setPermFormName] = useState("")
  const [permFormCode, setPermFormCode] = useState("")
  const [permFormModule, setPermFormModule] = useState("")
  const [permFormDesc, setPermFormDesc] = useState("")
  const [deletePermOpen, setDeletePermOpen] = useState(false)
  const [deletePerm, setDeletePerm] = useState<Permission | null>(null)

  const openAddPerm = () => {
    setEditPerm(null)
    setPermFormName("")
    setPermFormCode("")
    setPermFormModule("")
    setPermFormDesc("")
    setPermDialogOpen(true)
  }

  const openEditPerm = (p: Permission) => {
    setEditPerm(p)
    setPermFormName(p.name)
    setPermFormCode(p.code)
    setPermFormModule(p.module)
    setPermFormDesc(p.description)
    setPermDialogOpen(true)
  }

  const handleSavePerm = () => {
    if (!permFormName.trim() || !permFormCode.trim() || !permFormModule) return
    if (editPerm) {
      setPermissions(permissions.map(p => p.id === editPerm.id ? { ...p, name: permFormName, code: permFormCode, module: permFormModule, description: permFormDesc } : p))
      showToast("Səlahiyyət yeniləndi")
    } else {
      setPermissions([...permissions, { id: Date.now(), name: permFormName, code: permFormCode, module: permFormModule, description: permFormDesc }])
      showToast("Səlahiyyət əlavə edildi")
    }
    setPermDialogOpen(false)
  }

  const handleDeletePerm = () => {
    if (!deletePerm) return
    setPermissions(permissions.filter(p => p.id !== deletePerm.id))
    setDeletePermOpen(false)
    showToast("Səlahiyyət silindi")
  }

  // ============== PARTICIPANTS STATE ==============
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 1, firstName: "Rauf", lastName: "Əliyev", fin: "AA1234567", email: "rauf@mail.az", competition: "Gənc alimlər üçün qrant müsabiqəsi", role: "Layihə rəhbəri", status: "Aktiv" },
    { id: 2, firstName: "Aytən", lastName: "Nəsirli", fin: "BB7654321", email: "ayten@mail.az", competition: "Gənc alimlər üçün qrant müsabiqəsi", role: "Tədqiqatçı", status: "Aktiv" },
    { id: 3, firstName: "Nigar", lastName: "Hüseynova", fin: "CC9876543", email: "nigar@mail.az", competition: "İnnovasiya layihələri müsabiqəsi", role: "Layihə rəhbəri", status: "Aktiv" },
    { id: 4, firstName: "Kamran", lastName: "Rüstəmov", fin: "DD1122334", email: "kamran@mail.az", competition: "Gənc alimlər üçün qrant müsabiqəsi", role: "Laborant", status: "Deaktiv" },
  ])
  const [searchParticipantFirstName, setSearchParticipantFirstName] = useState("")
  const [searchParticipantLastName, setSearchParticipantLastName] = useState("")
  const [searchParticipantFin, setSearchParticipantFin] = useState("")
  const [participantDialogOpen, setParticipantDialogOpen] = useState(false)
  const [editParticipant, setEditParticipant] = useState<Participant | null>(null)
  const [participantFormFirstName, setParticipantFormFirstName] = useState("")
  const [participantFormLastName, setParticipantFormLastName] = useState("")
  const [participantFormFin, setParticipantFormFin] = useState("")
  const [participantFormEmail, setParticipantFormEmail] = useState("")
  const [participantFormCompetition, setParticipantFormCompetition] = useState("")
  const [participantFormRole, setParticipantFormRole] = useState("")

  const filteredParticipants = participants.filter((p) => {
    if (searchParticipantFirstName && !p.firstName.toLowerCase().includes(searchParticipantFirstName.toLowerCase())) return false
    if (searchParticipantLastName && !p.lastName.toLowerCase().includes(searchParticipantLastName.toLowerCase())) return false
    if (searchParticipantFin && !p.fin.toLowerCase().includes(searchParticipantFin.toLowerCase())) return false
    return true
  })

  const openAddParticipant = () => {
    setEditParticipant(null)
    setParticipantFormFirstName("")
    setParticipantFormLastName("")
    setParticipantFormFin("")
    setParticipantFormEmail("")
    setParticipantFormCompetition("")
    setParticipantFormRole("")
    setParticipantDialogOpen(true)
  }

  const openEditParticipant = (p: Participant) => {
    setEditParticipant(p)
    setParticipantFormFirstName(p.firstName)
    setParticipantFormLastName(p.lastName)
    setParticipantFormFin(p.fin)
    setParticipantFormEmail(p.email)
    setParticipantFormCompetition(p.competition)
    setParticipantFormRole(p.role)
    setParticipantDialogOpen(true)
  }

  const handleSaveParticipant = () => {
    if (!participantFormFirstName.trim() || !participantFormLastName.trim()) return
    if (editParticipant) {
      setParticipants(participants.map(p => p.id === editParticipant.id ? { ...p, firstName: participantFormFirstName, lastName: participantFormLastName, fin: participantFormFin, email: participantFormEmail, competition: participantFormCompetition, role: participantFormRole } : p))
      showToast("İştirakçı yeniləndi")
    } else {
      setParticipants([...participants, { id: Date.now(), firstName: participantFormFirstName, lastName: participantFormLastName, fin: participantFormFin, email: participantFormEmail, competition: participantFormCompetition, role: participantFormRole, status: "Aktiv" }])
      showToast("İştirakçı əlavə edildi")
    }
    setParticipantDialogOpen(false)
  }

  // ============== EXPERT APPLICATIONS STATE ==============
  const [expertApplications, setExpertApplications] = useState<ExpertApplication[]>([
    { id: "1", lastName: "Əliyeva", firstName: "Günel", email: "g.aliyeva@mail.az", currentRole: "İddiaçı", applicationStatus: "Gözlənilir", fin: "7AB3D2K", applicationDate: "2024-03-01" },
    { id: "2", lastName: "Nəsibov", firstName: "Tural", email: "t.nasibov@mail.az", currentRole: "İddiaçı", applicationStatus: "Gözlənilir", fin: "8HJ5K3M", applicationDate: "2024-03-05" },
    { id: "3", lastName: "Rəhimova", firstName: "Səbinə", email: "s.rahimova@mail.az", currentRole: "İddiaçı", applicationStatus: "Təsdiqlənib", fin: "4NP2L7Q", applicationDate: "2024-02-20" },
    { id: "4", lastName: "Kərimov", firstName: "Cavid", email: "c.karimov@mail.az", currentRole: "İddiaçı", applicationStatus: "İnkar edilib", fin: "6RS9T1U", applicationDate: "2024-02-15" },
  ])

  const [selectedApplication, setSelectedApplication] = useState<ExpertApplication | null>(null)
  const [applicationDetailOpen, setApplicationDetailOpen] = useState(false)

  const openApplicationDetail = (app: ExpertApplication) => {
    setSelectedApplication(app)
    setApplicationDetailOpen(true)
  }

  const handleApproveExpert = (app: ExpertApplication) => {
    setExpertApplications(expertApplications.map(a => 
      a.id === app.id ? { ...a, applicationStatus: "Təsdiqlənib" as const } : a
    ))
    // Also update user role
    setUsers(users.map(u => u.fin === app.fin ? { ...u, roles: [...u.roles, "Ekspert"], isExpert: true, expertApproved: true } : u))
    showToast("Ekspert müraciəti təsdiqləndi")
  }

  const handleRejectExpert = (app: ExpertApplication) => {
    setExpertApplications(expertApplications.map(a => 
      a.id === app.id ? { ...a, applicationStatus: "İnkar edilib" as const } : a
    ))
    showToast("Ekspert müraciəti inkar edildi")
  }

  const pendingApplicationsCount = expertApplications.filter(a => a.applicationStatus === "Gözlənilir").length

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium animate-in slide-in-from-top-2 fade-in duration-200">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">İstifadəçilər</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 max-w-4xl">
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            <span className="hidden sm:inline">Rollar</span>
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span className="hidden sm:inline">Səlahiyyətlər</span>
          </TabsTrigger>
          <TabsTrigger value="participants" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span className="hidden sm:inline">İştirakçılar</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">İstifadəçilər</span>
          </TabsTrigger>
          <TabsTrigger value="expert-applications" className="flex items-center gap-2 relative">
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Ekspert müraciətləri</span>
            {pendingApplicationsCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {pendingApplicationsCount}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* ============== ROLES TAB ============== */}
        <TabsContent value="roles" className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50">
                <Tag className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Rollar</h2>
                <p className="text-sm text-muted-foreground">Sistem rollarını idarə edin</p>
              </div>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={openAddRole}>
              <Plus className="h-4 w-4 mr-1.5" />
              Əlavə et
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Cəmi: {roles.length} rol</CardTitle>
            </CardHeader>
            <CardContent>
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
                          <Button variant="ghost" size="sm" onClick={() => openEditRole(r)}>
                            <Pencil className="h-3.5 w-3.5 mr-1" />
                            Redaktə et
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => { setDeleteRole(r); setDeleteRoleOpen(true) }}>
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            Sil
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ============== PERMISSIONS TAB ============== */}
        <TabsContent value="permissions" className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50">
                <Key className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Səlahiyyətlər</h2>
                <p className="text-sm text-muted-foreground">Sistem səlahiyyətlərini idarə edin</p>
              </div>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={openAddPerm}>
              <Plus className="h-4 w-4 mr-1.5" />
              Əlavə et
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Cəmi: {permissions.length} səlahiyyət</CardTitle>
            </CardHeader>
            <CardContent>
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
                          <Button variant="ghost" size="sm" onClick={() => openEditPerm(p)}>
                            <Pencil className="h-3.5 w-3.5 mr-1" />
                            Redaktə et
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => { setDeletePerm(p); setDeletePermOpen(true) }}>
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            Sil
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ============== PARTICIPANTS TAB ============== */}
        <TabsContent value="participants" className="mt-6 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50">
                <Trophy className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Müsabiqələrin iştirakçıları</h2>
                <p className="text-sm text-muted-foreground">İştirakçıları idarə edin</p>
              </div>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={openAddParticipant}>
              <Plus className="h-4 w-4 mr-1.5" />
              Yeni iştirakçı
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
                  <Input placeholder="Ad üzrə axtar" value={searchParticipantFirstName} onChange={(e) => setSearchParticipantFirstName(e.target.value)} className="pl-9 text-sm" />
                </div>
                <Input placeholder="Soyad" value={searchParticipantLastName} onChange={(e) => setSearchParticipantLastName(e.target.value)} className="text-sm" />
                <Input placeholder="FİN" value={searchParticipantFin} onChange={(e) => setSearchParticipantFin(e.target.value)} className="text-sm" />
                <Button variant="outline" onClick={() => { setSearchParticipantFirstName(""); setSearchParticipantLastName(""); setSearchParticipantFin("") }} className="text-sm">
                  Sıfırla
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Nəticə: {filteredParticipants.length} iştirakçı</CardTitle>
            </CardHeader>
            <CardContent>
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
                  {filteredParticipants.map((p) => (
                    <TableRow key={p.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium">{p.firstName}</TableCell>
                      <TableCell>{p.lastName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono text-xs">{p.fin}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground max-w-[200px] truncate">{p.competition}</TableCell>
                      <TableCell>
                        <Badge className="bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-100">{p.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <div className={`h-2 w-2 rounded-full ${p.status === "Aktiv" ? "bg-emerald-500" : "bg-red-500"}`} />
                          <span className={`text-sm ${p.status === "Aktiv" ? "text-emerald-700" : "text-red-600"}`}>{p.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openEditParticipant(p)}>
                          <Pencil className="h-3.5 w-3.5 mr-1" />
                          Redaktə
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ============== USERS TAB ============== */}
        <TabsContent value="users" className="mt-6 space-y-6">
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
                    <Input placeholder="Axtar..." value={searchName} onChange={(e) => setSearchName(e.target.value)} className="pl-9" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Doğum tarixi</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="date" value={searchBirthDate} onChange={(e) => setSearchBirthDate(e.target.value)} className="pl-9" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">E-mail</label>
                  <Input placeholder="E-mail..." value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">FİN (5-7 simvol)</label>
                  <Input placeholder="FİN..." value={searchFin} onChange={(e) => setSearchFin(e.target.value.slice(0, 7))} minLength={5} maxLength={7} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Rola görə filtr</label>
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger><SelectValue placeholder="Hamısı" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Hamısı</SelectItem>
                      {allRoles.map((role) => (<SelectItem key={role} value={role}>{role}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Ekspert statusu</label>
                  <Select value={filterExpertStatus} onValueChange={setFilterExpertStatus}>
                    <SelectTrigger><SelectValue placeholder="Hamısı" /></SelectTrigger>
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
                    <SelectTrigger><SelectValue /></SelectTrigger>
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
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => {}}>
                    <Search className="h-4 w-4 mr-2" />
                    Axtar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

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
        </TabsContent>

        {/* ============== EXPERT APPLICATIONS TAB ============== */}
        <TabsContent value="expert-applications" className="mt-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50">
              <UserPlus className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Ekspert müraciətləri</h2>
              <p className="text-sm text-muted-foreground">Ekspert kimi qeydiyyatdan keçmək istəyən istifadəçilərin siyahısı</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Gözləmədə</p>
                    <p className="text-2xl font-bold">{expertApplications.filter(a => a.applicationStatus === "Gözlənilir").length}</p>
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
                    <p className="text-2xl font-bold">{expertApplications.filter(a => a.applicationStatus === "Təsdiqlənib").length}</p>
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
                    <p className="text-2xl font-bold">{expertApplications.filter(a => a.applicationStatus === "İnkar edilib").length}</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-full">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Müraciətlər siyahısı</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Soyad</TableHead>
                      <TableHead>Ad</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Müraciət statusu</TableHead>
                      <TableHead>FİN</TableHead>
                      <TableHead className="text-right">Əməliyyatlar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expertApplications.map((app) => (
                      <TableRow key={app.id} className="cursor-pointer hover:bg-muted/50" onClick={() => openApplicationDetail(app)}>
                        <TableCell className="font-medium">{app.lastName}</TableCell>
                        <TableCell>{app.firstName}</TableCell>
                        <TableCell>{app.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{app.currentRole}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            app.applicationStatus === "Təsdiqlənib" ? "default" :
                            app.applicationStatus === "İnkar edilib" ? "destructive" : "secondary"
                          }>
                            {app.applicationStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{app.fin}</TableCell>
                        <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                          {app.applicationStatus === "Gözlənilir" && (
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="outline" size="sm" className="text-emerald-600 hover:text-emerald-700" onClick={(e) => { e.stopPropagation(); handleApproveExpert(app); }}>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Təsdiq et
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={(e) => { e.stopPropagation(); handleRejectExpert(app); }}>
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
        </TabsContent>
      </Tabs>

      {/* ============== DIALOGS ============== */}
      
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
                  <Checkbox checked={editForm.active} onCheckedChange={(checked) => setEditForm({ ...editForm, active: !!checked })} />
                  <span className="text-sm">Aktiv</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Rollar siyahısı</label>
                <div className="space-y-2 p-4 border rounded-lg">
                  {allRoles.map((role) => (
                    <div key={role} className="flex items-center gap-2">
                      <Checkbox checked={editForm.roles.includes(role)} onCheckedChange={(checked) => handleRoleChange(role, !!checked)} />
                      <span className="text-sm">{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>İmtina et</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={saveUser}>Təsdiq et</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Role Dialog */}
      <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editRole ? "Rolu redaktə et" : "Yeni rol əlavə et"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Rolun adı</Label>
              <Input value={roleFormName} onChange={(e) => setRoleFormName(e.target.value)} placeholder="Rolun adını daxil edin" />
            </div>
            <div className="space-y-2">
              <Label>Açıqlama</Label>
              <Textarea value={roleFormDesc} onChange={(e) => setRoleFormDesc(e.target.value)} placeholder="Rolun açıqlaması" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRoleDialogOpen(false)}>Ləğv et</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleSaveRole}>
              {editRole ? "Yadda saxla" : "Əlavə et"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Role Confirmation */}
      <Dialog open={deleteRoleOpen} onOpenChange={setDeleteRoleOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Rolu sil</DialogTitle>
            <DialogDescription>Bu rolu silmək istədiyinizdən əminsiniz?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteRoleOpen(false)}>Xeyr</Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDeleteRole}>Bəli, sil</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Permission Dialog */}
      <Dialog open={permDialogOpen} onOpenChange={setPermDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editPerm ? "Səlahiyyəti redaktə et" : "Yeni səlahiyyət əlavə et"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Səlahiyyətin adı</Label>
              <Input value={permFormName} onChange={(e) => setPermFormName(e.target.value)} placeholder="Səlahiyyətin adını daxil edin" />
            </div>
            <div className="space-y-2">
              <Label>Kod</Label>
              <Input value={permFormCode} onChange={(e) => setPermFormCode(e.target.value)} placeholder="Məs: project.view" className="font-mono" />
            </div>
            <div className="space-y-2">
              <Label>Modul</Label>
              <Select value={permFormModule} onValueChange={setPermFormModule}>
                <SelectTrigger><SelectValue placeholder="Seçin..." /></SelectTrigger>
                <SelectContent>
                  {modules.map((m) => (<SelectItem key={m} value={m}>{m}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Açıqlama</Label>
              <Textarea value={permFormDesc} onChange={(e) => setPermFormDesc(e.target.value)} placeholder="Açıqlama" rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPermDialogOpen(false)}>Ləğv et</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleSavePerm}>
              {editPerm ? "Yadda saxla" : "Əlavə et"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Permission Confirmation */}
      <Dialog open={deletePermOpen} onOpenChange={setDeletePermOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Səlahiyyəti sil</DialogTitle>
            <DialogDescription>Bu səlahiyyəti silmək istədiyinizdən əminsiniz?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletePermOpen(false)}>Xeyr</Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDeletePerm}>Bəli, sil</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Participant Dialog */}
      <Dialog open={participantDialogOpen} onOpenChange={setParticipantDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editParticipant ? "İştirakçını redaktə et" : "Yeni iştirakçı əlavə et"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Ad</Label>
                <Input value={participantFormFirstName} onChange={(e) => setParticipantFormFirstName(e.target.value)} placeholder="Ad" />
              </div>
              <div className="space-y-2">
                <Label>Soyad</Label>
                <Input value={participantFormLastName} onChange={(e) => setParticipantFormLastName(e.target.value)} placeholder="Soyad" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>FİN</Label>
                <Input value={participantFormFin} onChange={(e) => setParticipantFormFin(e.target.value)} placeholder="FİN" />
              </div>
              <div className="space-y-2">
                <Label>E-mail</Label>
                <Input value={participantFormEmail} onChange={(e) => setParticipantFormEmail(e.target.value)} placeholder="E-mail" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Müsabiqə</Label>
              <Select value={participantFormCompetition} onValueChange={setParticipantFormCompetition}>
                <SelectTrigger><SelectValue placeholder="Seçin..." /></SelectTrigger>
                <SelectContent>
                  {competitions.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Rolu</Label>
              <Select value={participantFormRole} onValueChange={setParticipantFormRole}>
                <SelectTrigger><SelectValue placeholder="Seçin..." /></SelectTrigger>
                <SelectContent>
                  {participantRoles.map((r) => (<SelectItem key={r} value={r}>{r}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setParticipantDialogOpen(false)}>Ləğv et</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleSaveParticipant}>
              {editParticipant ? "Yadda saxla" : "Əlavə et"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Expert Application Detail Dialog */}
      <Dialog open={applicationDetailOpen} onOpenChange={setApplicationDetailOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-emerald-600" />
              Müraciətçi haqqında məlumat
            </DialogTitle>
            <DialogDescription>Ekspert müraciəti haqqında ətraflı məlumat</DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4 py-2">
              {/* Status Badge */}
              <div className="flex justify-center">
                <Badge 
                  variant={
                    selectedApplication.applicationStatus === "Təsdiqlənib" ? "default" :
                    selectedApplication.applicationStatus === "İnkar edilib" ? "destructive" : "secondary"
                  }
                  className="text-sm px-4 py-1"
                >
                  {selectedApplication.applicationStatus}
                </Badge>
              </div>

              {/* Personal Info */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Şəxsi məlumatlar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Ad</p>
                      <p className="font-medium">{selectedApplication.firstName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Soyad</p>
                      <p className="font-medium">{selectedApplication.lastName}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">FİN</p>
                      <p className="font-medium font-mono">{selectedApplication.fin}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">E-mail</p>
                      <p className="font-medium text-sm break-all">{selectedApplication.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Role Info */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Rol məlumatları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Cari rol</p>
                      <Badge variant="outline" className="mt-1">{selectedApplication.currentRole}</Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Müraciət etdiyi rol</p>
                      <Badge className="mt-1 bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">Ekspert</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Müraciət tarixi</p>
                    <p className="font-medium">{selectedApplication.applicationDate}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              {selectedApplication.applicationStatus === "Gözlənilir" && (
                <div className="flex gap-3 pt-2">
                  <Button 
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white" 
                    onClick={() => { 
                      handleApproveExpert(selectedApplication); 
                      setApplicationDetailOpen(false); 
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Təsdiq et
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300" 
                    onClick={() => { 
                      handleRejectExpert(selectedApplication); 
                      setApplicationDetailOpen(false); 
                    }}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    İnkar et
                  </Button>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setApplicationDetailOpen(false)}>Bağla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
