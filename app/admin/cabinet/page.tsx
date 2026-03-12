"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Briefcase, MapPin, Phone, Mail, Plus, Pencil, Trash2, GraduationCap, Calendar } from "lucide-react"

interface WorkExperience {
  id: string
  organization: string
  position: string
  startDate: string
  endDate: string
  current: boolean
}

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startYear: string
  endYear: string
}

export default function AdminCabinetPage() {
  const [activeTab, setActiveTab] = useState("personal")
  
  // Personal Info
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Səbuhi",
    lastName: "Qurbanov",
    fatherName: "Əli",
    birthDate: "1985-03-15",
    gender: "Kişi",
    fin: "5XH7K9L",
    phone: "+994501234567",
    email: "s.qurbanov@aef.gov.az",
    address: "Bakı şəhəri, Nəsimi rayonu",
  })
  const [editPersonalOpen, setEditPersonalOpen] = useState(false)
  const [editPersonalData, setEditPersonalData] = useState(personalInfo)

  // Work Experience
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([
    {
      id: "1",
      organization: "Azərbaycan Elm Fondu",
      position: "Fond İnzibatçısı",
      startDate: "2020-01",
      endDate: "",
      current: true,
    },
    {
      id: "2",
      organization: "AMEA Riyaziyyat və Mexanika İnstitutu",
      position: "Böyük elmi işçi",
      startDate: "2015-06",
      endDate: "2020-01",
      current: false,
    },
  ])
  const [workDialogOpen, setWorkDialogOpen] = useState(false)
  const [editingWork, setEditingWork] = useState<WorkExperience | null>(null)
  const [workForm, setWorkForm] = useState<WorkExperience>({
    id: "",
    organization: "",
    position: "",
    startDate: "",
    endDate: "",
    current: false,
  })

  // Education
  const [educations, setEducations] = useState<Education[]>([
    {
      id: "1",
      institution: "Bakı Dövlət Universiteti",
      degree: "Doktorantura",
      field: "Riyaziyyat",
      startYear: "2010",
      endYear: "2014",
    },
    {
      id: "2",
      institution: "Bakı Dövlət Universiteti",
      degree: "Magistratura",
      field: "Tətbiqi Riyaziyyat",
      startYear: "2008",
      endYear: "2010",
    },
  ])
  const [eduDialogOpen, setEduDialogOpen] = useState(false)
  const [editingEdu, setEditingEdu] = useState<Education | null>(null)
  const [eduForm, setEduForm] = useState<Education>({
    id: "",
    institution: "",
    degree: "",
    field: "",
    startYear: "",
    endYear: "",
  })

  // Personal Info Save
  const handleSavePersonal = () => {
    setPersonalInfo(editPersonalData)
    setEditPersonalOpen(false)
  }

  // Work Experience CRUD
  const openAddWork = () => {
    setEditingWork(null)
    setWorkForm({ id: "", organization: "", position: "", startDate: "", endDate: "", current: false })
    setWorkDialogOpen(true)
  }
  const openEditWork = (work: WorkExperience) => {
    setEditingWork(work)
    setWorkForm(work)
    setWorkDialogOpen(true)
  }
  const handleSaveWork = () => {
    if (editingWork) {
      setWorkExperiences(workExperiences.map(w => w.id === editingWork.id ? { ...workForm, id: editingWork.id } : w))
    } else {
      setWorkExperiences([...workExperiences, { ...workForm, id: Date.now().toString() }])
    }
    setWorkDialogOpen(false)
  }
  const handleDeleteWork = (id: string) => {
    setWorkExperiences(workExperiences.filter(w => w.id !== id))
  }

  // Education CRUD
  const openAddEdu = () => {
    setEditingEdu(null)
    setEduForm({ id: "", institution: "", degree: "", field: "", startYear: "", endYear: "" })
    setEduDialogOpen(true)
  }
  const openEditEdu = (edu: Education) => {
    setEditingEdu(edu)
    setEduForm(edu)
    setEduDialogOpen(true)
  }
  const handleSaveEdu = () => {
    if (editingEdu) {
      setEducations(educations.map(e => e.id === editingEdu.id ? { ...eduForm, id: editingEdu.id } : e))
    } else {
      setEducations([...educations, { ...eduForm, id: Date.now().toString() }])
    }
    setEduDialogOpen(false)
  }
  const handleDeleteEdu = (id: string) => {
    setEducations(educations.filter(e => e.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Şəxsi kabinet</h1>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-emerald-100 text-emerald-700 text-2xl font-semibold">
                {personalInfo.firstName[0]}{personalInfo.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground">
                {personalInfo.lastName} {personalInfo.firstName} {personalInfo.fatherName}
              </h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                  Fond İnzibatçısı
                </Badge>
                <Badge variant="outline">Ekspertiza üzrə admin</Badge>
                <Badge variant="outline">Elmi-texniki hesabat üzrə admin</Badge>
              </div>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {personalInfo.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {personalInfo.phone}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Şəxsi məlumatlar</span>
          </TabsTrigger>
          <TabsTrigger value="work" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">İş təcrübəsi</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">Təhsil</span>
          </TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Şəxsi məlumatlar</CardTitle>
              <Button variant="outline" size="sm" onClick={() => { setEditPersonalData(personalInfo); setEditPersonalOpen(true); }}>
                <Pencil className="h-4 w-4 mr-2" />
                Redaktə et
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Ad</p>
                  <p className="font-medium">{personalInfo.firstName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Soyad</p>
                  <p className="font-medium">{personalInfo.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ata adı</p>
                  <p className="font-medium">{personalInfo.fatherName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Doğum tarixi</p>
                  <p className="font-medium">{personalInfo.birthDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cins</p>
                  <p className="font-medium">{personalInfo.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">FİN</p>
                  <p className="font-medium">{personalInfo.fin}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefon</p>
                  <p className="font-medium">{personalInfo.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">E-poçt</p>
                  <p className="font-medium">{personalInfo.email}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">Ünvan</p>
                  <p className="font-medium">{personalInfo.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Work Experience Tab */}
        <TabsContent value="work" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>İş təcrübəsi</CardTitle>
              <Button size="sm" onClick={openAddWork}>
                <Plus className="h-4 w-4 mr-2" />
                Əlavə et
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workExperiences.map((work) => (
                  <div key={work.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-muted rounded-lg">
                        <Briefcase className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{work.position}</p>
                        <p className="text-sm text-muted-foreground">{work.organization}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {work.startDate} - {work.current ? "Hazırda" : work.endDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditWork(work)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteWork(work.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Təhsil</CardTitle>
              <Button size="sm" onClick={openAddEdu}>
                <Plus className="h-4 w-4 mr-2" />
                Əlavə et
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {educations.map((edu) => (
                  <div key={edu.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-muted rounded-lg">
                        <GraduationCap className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{edu.degree}</p>
                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.field}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {edu.startYear} - {edu.endYear}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditEdu(edu)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteEdu(edu.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Personal Info Dialog */}
      <Dialog open={editPersonalOpen} onOpenChange={setEditPersonalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Şəxsi məlumatları redaktə et</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Ad</label>
              <Input
                value={editPersonalData.firstName}
                onChange={(e) => setEditPersonalData({ ...editPersonalData, firstName: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Soyad</label>
              <Input
                value={editPersonalData.lastName}
                onChange={(e) => setEditPersonalData({ ...editPersonalData, lastName: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Ata adı</label>
              <Input
                value={editPersonalData.fatherName}
                onChange={(e) => setEditPersonalData({ ...editPersonalData, fatherName: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Doğum tarixi</label>
              <Input
                type="date"
                value={editPersonalData.birthDate}
                onChange={(e) => setEditPersonalData({ ...editPersonalData, birthDate: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Telefon</label>
              <Input
                value={editPersonalData.phone}
                onChange={(e) => setEditPersonalData({ ...editPersonalData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">E-poçt</label>
              <Input
                value={editPersonalData.email}
                onChange={(e) => setEditPersonalData({ ...editPersonalData, email: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium">Ünvan</label>
              <Input
                value={editPersonalData.address}
                onChange={(e) => setEditPersonalData({ ...editPersonalData, address: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditPersonalOpen(false)}>İmtina</Button>
            <Button onClick={handleSavePersonal}>Yadda saxla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Work Experience Dialog */}
      <Dialog open={workDialogOpen} onOpenChange={setWorkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingWork ? "İş təcrübəsini redaktə et" : "Yeni iş təcrübəsi əlavə et"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Təşkilat</label>
              <Input
                value={workForm.organization}
                onChange={(e) => setWorkForm({ ...workForm, organization: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Vəzifə</label>
              <Input
                value={workForm.position}
                onChange={(e) => setWorkForm({ ...workForm, position: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Başlama tarixi</label>
                <Input
                  type="month"
                  value={workForm.startDate}
                  onChange={(e) => setWorkForm({ ...workForm, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Bitmə tarixi</label>
                <Input
                  type="month"
                  value={workForm.endDate}
                  onChange={(e) => setWorkForm({ ...workForm, endDate: e.target.value })}
                  disabled={workForm.current}
                />
              </div>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={workForm.current}
                onChange={(e) => setWorkForm({ ...workForm, current: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm">Hazırda burada işləyirəm</span>
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWorkDialogOpen(false)}>İmtina</Button>
            <Button onClick={handleSaveWork}>Yadda saxla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Education Dialog */}
      <Dialog open={eduDialogOpen} onOpenChange={setEduDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingEdu ? "Təhsili redaktə et" : "Yeni təhsil əlavə et"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Təhsil müəssisəsi</label>
              <Input
                value={eduForm.institution}
                onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Dərəcə</label>
              <Select value={eduForm.degree} onValueChange={(value) => setEduForm({ ...eduForm, degree: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bakalavr">Bakalavr</SelectItem>
                  <SelectItem value="Magistratura">Magistratura</SelectItem>
                  <SelectItem value="Doktorantura">Doktorantura</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">İxtisas</label>
              <Input
                value={eduForm.field}
                onChange={(e) => setEduForm({ ...eduForm, field: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Başlama ili</label>
                <Input
                  type="number"
                  value={eduForm.startYear}
                  onChange={(e) => setEduForm({ ...eduForm, startYear: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Bitmə ili</label>
                <Input
                  type="number"
                  value={eduForm.endYear}
                  onChange={(e) => setEduForm({ ...eduForm, endYear: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEduDialogOpen(false)}>İmtina</Button>
            <Button onClick={handleSaveEdu}>Yadda saxla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
