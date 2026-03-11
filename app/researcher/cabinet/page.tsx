"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  User,
  Briefcase,
  MapPin,
  FileText,
  GraduationCap,
  Award,
  BookOpen,
  Trophy,
  Plus,
  Pencil,
  Trash2,
  Upload,
  Save,
  X,
} from "lucide-react"

// ============ TAB 1: Sexsi melumatlar ============
function PersonalInfoTab() {
  const [editing, setEditing] = useState(false)
  const [data, setData] = useState({
    ad: "Aysel",
    soyad: "Məmmədova",
    ataAdi: "Rəşid",
    dogumTarixi: "1988-05-12",
    cinsiyyet: "Qadın",
    vetandasliq: "Azərbaycan",
    fin: "5YKNM2A",
    voen: "1234567890",
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-base">Şəxsi məlumatlar</CardTitle>
        {!editing ? (
          <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
            <Pencil className="h-3.5 w-3.5 mr-1.5" />
            Redaktə et
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setEditing(false)} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="h-3.5 w-3.5 mr-1.5" />
              Yadda saxla
            </Button>
            <Button size="sm" variant="outline" onClick={() => setEditing(false)}>
              <X className="h-3.5 w-3.5 mr-1.5" />
              Ləğv et
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Ad", key: "ad" },
            { label: "Soyad", key: "soyad" },
            { label: "Ata adı", key: "ataAdi" },
            { label: "Doğum tarixi", key: "dogumTarixi", type: "date" },
            { label: "Cinsiyyət", key: "cinsiyyet" },
            { label: "Vətəndaşlıq", key: "vetandasliq" },
            { label: "FİN kod", key: "fin" },
            { label: "VÖEN", key: "voen" },
          ].map((field) => (
            <div key={field.key} className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">{field.label}</Label>
              <Input
                type={field.type || "text"}
                value={data[field.key as keyof typeof data]}
                onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                readOnly={!editing}
                className={!editing ? "bg-muted border-gray-200" : ""}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// ============ TAB 2: Is tecrubesi ============
function WorkExperienceTab() {
  const [items, setItems] = useState([
    { id: 1, org: "AMEA Fizika İnstitutu", position: "Baş elmi işçi", start: "2018", end: "Davam edir" },
    { id: 2, org: "Bakı Dövlət Universiteti", position: "Dosent", start: "2014", end: "2018" },
  ])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editItem, setEditItem] = useState<typeof items[0] | null>(null)
  const [form, setForm] = useState({ org: "", position: "", start: "", end: "" })

  const openAdd = () => {
    setEditItem(null)
    setForm({ org: "", position: "", start: "", end: "" })
    setDialogOpen(true)
  }

  const openEdit = (item: typeof items[0]) => {
    setEditItem(item)
    setForm({ org: item.org, position: item.position, start: item.start, end: item.end })
    setDialogOpen(true)
  }

  const handleSave = () => {
    if (editItem) {
      setItems(items.map((i) => (i.id === editItem.id ? { ...i, ...form } : i)))
    } else {
      setItems([...items, { id: Date.now(), ...form }])
    }
    setDialogOpen(false)
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-base">İş təcrübəsi</CardTitle>
          <Button size="sm" onClick={openAdd} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Yeni əlavə et
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Təşkilat</TableHead>
                <TableHead>Vəzifə</TableHead>
                <TableHead>Başlama</TableHead>
                <TableHead>Bitmə</TableHead>
                <TableHead className="text-right pr-6">Əməliyyatlar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="pl-6 font-medium">{item.org}</TableCell>
                  <TableCell>{item.position}</TableCell>
                  <TableCell>{item.start}</TableCell>
                  <TableCell>
                    {item.end === "Davam edir" ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Davam edir</Badge>
                    ) : (
                      item.end
                    )}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end gap-1">
                      <Button size="sm" variant="ghost" onClick={() => openEdit(item)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => setItems(items.filter((i) => i.id !== item.id))}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editItem ? "İş təcrübəsini redaktə et" : "Yeni iş təcrübəsi"}</DialogTitle>
            <DialogDescription>İş təcrübəsi məlumatlarını daxil edin</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Təşkilat</Label>
              <Input value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Vəzifə</Label>
              <Input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Başlama tarixi</Label>
                <Input value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} placeholder="2020" />
              </div>
              <div className="space-y-1.5">
                <Label>Bitmə tarixi</Label>
                <Input value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} placeholder="Davam edir" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Ləğv et</Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">Yadda saxla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// ============ TAB 3: Unvan ve elaqe ============
function AddressContactTab() {
  const [addresses, setAddresses] = useState([
    { id: 1, type: "Qeydiyyat", country: "Azərbaycan", city: "Bakı", street: "Nizami küç. 45" },
  ])
  const [contacts, setContacts] = useState([
    { id: 1, type: "Telefon", value: "+994 50 123 45 67" },
    { id: 2, type: "Email", value: "aysel.mammadova@amea.az" },
  ])
  const [addrDialog, setAddrDialog] = useState(false)
  const [contDialog, setContDialog] = useState(false)
  const [addrForm, setAddrForm] = useState({ type: "", country: "", city: "", street: "" })
  const [contForm, setContForm] = useState({ type: "", value: "" })

  return (
    <>
      <div className="space-y-6">
        {/* Addresses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base">Ünvanlar</CardTitle>
            <Button size="sm" onClick={() => { setAddrForm({ type: "", country: "", city: "", street: "" }); setAddrDialog(true) }} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Əlavə et
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Ünvan növü</TableHead>
                  <TableHead>Ölkə</TableHead>
                  <TableHead>Şəhər</TableHead>
                  <TableHead>Küçə</TableHead>
                  <TableHead className="text-right pr-6">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {addresses.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="pl-6">
                      <Badge variant="outline">{a.type}</Badge>
                    </TableCell>
                    <TableCell>{a.country}</TableCell>
                    <TableCell>{a.city}</TableCell>
                    <TableCell>{a.street}</TableCell>
                    <TableCell className="text-right pr-6">
                      <Button size="sm" variant="ghost" className="text-red-500" onClick={() => setAddresses(addresses.filter((x) => x.id !== a.id))}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Contacts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base">Əlaqə vasitələri</CardTitle>
            <Button size="sm" onClick={() => { setContForm({ type: "", value: "" }); setContDialog(true) }} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Əlavə et
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Növ</TableHead>
                  <TableHead>Dəyər</TableHead>
                  <TableHead className="text-right pr-6">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="pl-6">
                      <Badge variant="outline">{c.type}</Badge>
                    </TableCell>
                    <TableCell>{c.value}</TableCell>
                    <TableCell className="text-right pr-6">
                      <Button size="sm" variant="ghost" className="text-red-500" onClick={() => setContacts(contacts.filter((x) => x.id !== c.id))}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Address Dialog */}
      <Dialog open={addrDialog} onOpenChange={setAddrDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yeni ünvan</DialogTitle>
            <DialogDescription>Ünvan məlumatlarını daxil edin</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Ünvan növü</Label>
              <Select value={addrForm.type} onValueChange={(v) => setAddrForm({ ...addrForm, type: v })}>
                <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Qeydiyyat">Qeydiyyat</SelectItem>
                  <SelectItem value="Yaşayış">Yaşayış</SelectItem>
                  <SelectItem value="İş">İş</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Ölkə</Label>
                <Input value={addrForm.country} onChange={(e) => setAddrForm({ ...addrForm, country: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Şəhər</Label>
                <Input value={addrForm.city} onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Küçə</Label>
              <Input value={addrForm.street} onChange={(e) => setAddrForm({ ...addrForm, street: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddrDialog(false)}>Ləğv et</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => {
              setAddresses([...addresses, { id: Date.now(), ...addrForm }])
              setAddrDialog(false)
            }}>Yadda saxla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={contDialog} onOpenChange={setContDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yeni əlaqə vasitəsi</DialogTitle>
            <DialogDescription>Əlaqə məlumatlarını daxil edin</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Növ</Label>
              <Select value={contForm.type} onValueChange={(v) => setContForm({ ...contForm, type: v })}>
                <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Telefon">Telefon</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Faks">Faks</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Dəyər</Label>
              <Input value={contForm.value} onChange={(e) => setContForm({ ...contForm, value: e.target.value })} placeholder="+994 XX XXX XX XX" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setContDialog(false)}>Ləğv et</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => {
              setContacts([...contacts, { id: Date.now(), ...contForm }])
              setContDialog(false)
            }}>Yadda saxla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// ============ TAB 4: Senedler ============
function DocumentsTab() {
  const [docs, setDocs] = useState([
    { id: 1, type: "Şəxsiyyət vəsiqəsi", serial: "AZE12345678", expiry: "2030-05-15", file: "sexsiyyet.pdf" },
    { id: 2, type: "Pasport", serial: "AZ1234567", expiry: "2028-11-20", file: null },
  ])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState({ type: "", serial: "", expiry: "", file: "" })

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-base">Sənədlər</CardTitle>
          <Button size="sm" onClick={() => { setForm({ type: "", serial: "", expiry: "", file: "" }); setDialogOpen(true) }} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Sənəd əlavə et
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Sənəd növü</TableHead>
                <TableHead>Seriya/Nömrə</TableHead>
                <TableHead>Etibarlılıq tarixi</TableHead>
                <TableHead>Skan surəti</TableHead>
                <TableHead className="text-right pr-6">Əməliyyatlar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {docs.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="pl-6 font-medium">{d.type}</TableCell>
                  <TableCell className="font-mono text-sm">{d.serial}</TableCell>
                  <TableCell>{d.expiry}</TableCell>
                  <TableCell>
                    {d.file ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Yüklənib</Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">Yoxdur</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button size="sm" variant="ghost" className="text-red-500" onClick={() => setDocs(docs.filter((x) => x.id !== d.id))}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yeni sənəd</DialogTitle>
            <DialogDescription>Sənəd məlumatlarını daxil edin</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Sənəd növü</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Şəxsiyyət vəsiqəsi">Şəxsiyyət vəsiqəsi</SelectItem>
                  <SelectItem value="Pasport">Pasport</SelectItem>
                  <SelectItem value="Sürücülük vəsiqəsi">Sürücülük vəsiqəsi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Seriya/Nömrə</Label>
                <Input value={form.serial} onChange={(e) => setForm({ ...form, serial: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Etibarlılıq tarixi</Label>
                <Input type="date" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Skan surəti</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-300 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Faylı buraya sürükləyin və ya klikləyin</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (maks. 5MB)</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Ləğv et</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => {
              setDocs([...docs, { id: Date.now(), type: form.type, serial: form.serial, expiry: form.expiry, file: null }])
              setDialogOpen(false)
            }}>Yadda saxla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// ============ TAB 5: Tehsil ============
function EducationTab() {
  const [items, setItems] = useState([
    { id: 1, institution: "Bakı Dövlət Universiteti", speciality: "Fizika", level: "Ali təhsil", start: "2006", end: "2010", diploma: "diploma_bdu.pdf" },
    { id: 2, institution: "AMEA Fizika İnstitutu", speciality: "Nəzəri fizika", level: "Doktorantura", start: "2010", end: "2014", diploma: null },
  ])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState({ institution: "", speciality: "", level: "", start: "", end: "" })

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-base">Təhsil</CardTitle>
          <Button size="sm" onClick={() => { setForm({ institution: "", speciality: "", level: "", start: "", end: "" }); setDialogOpen(true) }} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Yeni təhsil əlavə et
          </Button>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          {items.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 hover:border-blue-200 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{item.institution}</h4>
                  <p className="text-sm text-gray-600 mt-0.5">{item.speciality}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">{item.level}</Badge>
                    <span className="text-xs text-muted-foreground">{item.start} - {item.end}</span>
                  </div>
                  {item.diploma && (
                    <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100">
                      <FileText className="h-3 w-3 mr-1" />
                      Diplom yüklənib
                    </Badge>
                  )}
                </div>
                <Button size="sm" variant="ghost" className="text-red-500" onClick={() => setItems(items.filter((i) => i.id !== item.id))}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yeni təhsil</DialogTitle>
            <DialogDescription>Təhsil məlumatlarını daxil edin</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Təhsil müəssisəsi</Label>
              <Input value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>İxtisas</Label>
              <Input value={form.speciality} onChange={(e) => setForm({ ...form, speciality: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Təhsil səviyyəsi</Label>
              <Select value={form.level} onValueChange={(v) => setForm({ ...form, level: v })}>
                <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ali təhsil">Ali təhsil</SelectItem>
                  <SelectItem value="Magistratura">Magistratura</SelectItem>
                  <SelectItem value="Doktorantura">Doktorantura</SelectItem>
                  <SelectItem value="Orta ixtisas">Orta ixtisas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Başlama ili</Label>
                <Input value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} placeholder="2020" />
              </div>
              <div className="space-y-1.5">
                <Label>Bitmə ili</Label>
                <Input value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} placeholder="2024" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Diplom</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-blue-300 transition-colors cursor-pointer">
                <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-1" />
                <p className="text-xs text-muted-foreground">PDF, JPG (maks. 5MB)</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Ləğv et</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => {
              setItems([...items, { id: Date.now(), ...form, diploma: null }])
              setDialogOpen(false)
            }}>Yadda saxla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// ============ TAB 6: Elmi derece ve adlar ============
function AcademicDegreesTab() {
  const [degrees, setDegrees] = useState([
    { id: 1, title: "Fizika üzrə fəlsəfə doktoru (PhD)", year: "2014", org: "AMEA" },
  ])
  const [titles, setTitles] = useState([
    { id: 1, title: "Dosent", year: "2018", org: "AAK" },
  ])
  const [honors, setHonors] = useState<{ id: number; title: string; year: string }[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<"degree" | "title" | "honor">("degree")
  const [form, setForm] = useState({ title: "", year: "", org: "" })

  const openDialog = (type: typeof dialogType) => {
    setDialogType(type)
    setForm({ title: "", year: "", org: "" })
    setDialogOpen(true)
  }

  const handleSave = () => {
    const newItem = { id: Date.now(), ...form }
    if (dialogType === "degree") setDegrees([...degrees, newItem])
    else if (dialogType === "title") setTitles([...titles, newItem])
    else setHonors([...honors, { id: Date.now(), title: form.title, year: form.year }])
    setDialogOpen(false)
  }

  const SectionCard = ({ label, items, type, onRemove }: { label: string; items: { id: number; title: string; year: string; org?: string }[]; type: typeof dialogType; onRemove: (id: number) => void }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-base">{label}</CardTitle>
        <Button size="sm" onClick={() => openDialog(type)} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-3.5 w-3.5 mr-1.5" />
          Əlavə et
        </Button>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">Məlumat yoxdur</p>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between border rounded-lg px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.year}{item.org ? ` — ${item.org}` : ""}</p>
                </div>
                <Button size="sm" variant="ghost" className="text-red-500" onClick={() => onRemove(item.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <>
      <div className="space-y-6">
        <SectionCard label="Elmi dərəcə" items={degrees} type="degree" onRemove={(id) => setDegrees(degrees.filter((d) => d.id !== id))} />
        <SectionCard label="Elmi ad" items={titles} type="title" onRemove={(id) => setTitles(titles.filter((t) => t.id !== id))} />
        <SectionCard label="Fəxri adlar" items={honors} type="honor" onRemove={(id) => setHonors(honors.filter((h) => h.id !== id))} />
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === "degree" ? "Elmi dərəcə" : dialogType === "title" ? "Elmi ad" : "Fəxri ad"} əlavə et
            </DialogTitle>
            <DialogDescription>Məlumatları daxil edin</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Ad</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>İl</Label>
                <Input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="2024" />
              </div>
              {dialogType !== "honor" && (
                <div className="space-y-1.5">
                  <Label>Təşkilat</Label>
                  <Input value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Ləğv et</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSave}>Yadda saxla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// ============ TAB 7: Elmi fealiyyet ============
function ScientificActivityTab() {
  const [summary, setSummary] = useState("Kvant fizikası və nanostrukturlar sahəsində 15 ildən artıq tədqiqat təcrübəm var. Əsas tədqiqat istiqamətlərim kvant nöqtələri, nanoborular və onların optik xassələrinin öyrənilməsidir.")
  const [works, setWorks] = useState([
    { id: 1, title: "Quantum Dot Solar Cells: Recent Advances", year: "2024", journal: "Nature Nanotechnology", doi: "10.1038/s41565-024-1234" },
    { id: 2, title: "Nanostructured Materials for Energy Applications", year: "2023", journal: "ACS Nano", doi: "10.1021/acsnano.2023" },
  ])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState({ title: "", year: "", journal: "", doi: "" })

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Elmi fəaliyyətin qısa icmalı</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="h-3.5 w-3.5 mr-1.5" />
              Yadda saxla
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base">Elmi əsərlər</CardTitle>
            <Button size="sm" onClick={() => { setForm({ title: "", year: "", journal: "", doi: "" }); setDialogOpen(true) }} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Əsər əlavə et
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Əsərin adı</TableHead>
                  <TableHead>Nəşr ili</TableHead>
                  <TableHead>Jurnal/Konfrans</TableHead>
                  <TableHead>DOI/Link</TableHead>
                  <TableHead className="text-right pr-6">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {works.map((w) => (
                  <TableRow key={w.id}>
                    <TableCell className="pl-6 font-medium max-w-[250px] truncate">{w.title}</TableCell>
                    <TableCell>{w.year}</TableCell>
                    <TableCell>{w.journal}</TableCell>
                    <TableCell className="font-mono text-xs text-blue-600">{w.doi}</TableCell>
                    <TableCell className="text-right pr-6">
                      <Button size="sm" variant="ghost" className="text-red-500" onClick={() => setWorks(works.filter((x) => x.id !== w.id))}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yeni elmi əsər</DialogTitle>
            <DialogDescription>Əsər məlumatlarını daxil edin</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Əsərin adı</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Nəşr ili</Label>
                <Input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="2024" />
              </div>
              <div className="space-y-1.5">
                <Label>Jurnal/Konfrans</Label>
                <Input value={form.journal} onChange={(e) => setForm({ ...form, journal: e.target.value })} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>DOI/Link</Label>
              <Input value={form.doi} onChange={(e) => setForm({ ...form, doi: e.target.value })} placeholder="10.1000/xyz123" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Ləğv et</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => {
              setWorks([...works, { id: Date.now(), ...form }])
              setDialogOpen(false)
            }}>Yadda saxla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// ============ TAB 8: Diger musabiqeler ============
function OtherCompetitionsTab() {
  const [items, setItems] = useState([
    { id: 1, name: "TUBITAK-AMEA Birgə Layihə", year: "2022", org: "TUBITAK", result: "Qazanılıb" },
    { id: 2, name: "Horizon 2020 Individual Fellowship", year: "2021", org: "Avropa Komissiyası", result: "Rədd edilib" },
  ])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState({ name: "", year: "", org: "", result: "" })

  const resultColors: Record<string, string> = {
    Qazanılıb: "bg-green-100 text-green-700 hover:bg-green-100",
    "Rədd edilib": "bg-red-100 text-red-700 hover:bg-red-100",
    Gözləmədə: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-base">Digər müsabiqələr</CardTitle>
          <Button size="sm" onClick={() => { setForm({ name: "", year: "", org: "", result: "" }); setDialogOpen(true) }} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Müsabiqə əlavə et
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Müsabiqənin adı</TableHead>
                <TableHead>İl</TableHead>
                <TableHead>Təşkilat</TableHead>
                <TableHead>Nəticə</TableHead>
                <TableHead className="text-right pr-6">Əməliyyatlar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="pl-6 font-medium">{item.name}</TableCell>
                  <TableCell>{item.year}</TableCell>
                  <TableCell>{item.org}</TableCell>
                  <TableCell>
                    <Badge className={resultColors[item.result] || ""}>{item.result}</Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button size="sm" variant="ghost" className="text-red-500" onClick={() => setItems(items.filter((i) => i.id !== item.id))}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yeni müsabiqə</DialogTitle>
            <DialogDescription>Müsabiqə məlumatlarını daxil edin</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Müsabiqənin adı</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>İl</Label>
                <Input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="2024" />
              </div>
              <div className="space-y-1.5">
                <Label>Təşkilat</Label>
                <Input value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Nəticə</Label>
              <Select value={form.result} onValueChange={(v) => setForm({ ...form, result: v })}>
                <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Qazanılıb">Qazanılıb</SelectItem>
                  <SelectItem value="Rədd edilib">Rədd edilib</SelectItem>
                  <SelectItem value="Gözləmədə">Gözləmədə</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Ləğv et</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => {
              setItems([...items, { id: Date.now(), ...form }])
              setDialogOpen(false)
            }}>Yadda saxla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// ============ MAIN PAGE ============
const tabs = [
  { value: "personal", label: "Şəxsi məlumatlar", icon: User },
  { value: "work", label: "İş təcrübəsi", icon: Briefcase },
  { value: "address", label: "Ünvan və əlaqə", icon: MapPin },
  { value: "documents", label: "Sənədlər", icon: FileText },
  { value: "education", label: "Təhsil", icon: GraduationCap },
  { value: "degrees", label: "Elmi dərəcə", icon: Award },
  { value: "activity", label: "Elmi fəaliyyət", icon: BookOpen },
  { value: "competitions", label: "Digər müsabiqələr", icon: Trophy },
]

export default function CabinetPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Şəxsi kabinet</h1>
        <p className="text-muted-foreground mt-1">Şəxsi və peşəkar məlumatlarınızı idarə edin</p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="inline-flex h-auto p-1 bg-muted">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-1.5 px-3 py-2 text-xs whitespace-nowrap">
                <tab.icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="personal"><PersonalInfoTab /></TabsContent>
        <TabsContent value="work"><WorkExperienceTab /></TabsContent>
        <TabsContent value="address"><AddressContactTab /></TabsContent>
        <TabsContent value="documents"><DocumentsTab /></TabsContent>
        <TabsContent value="education"><EducationTab /></TabsContent>
        <TabsContent value="degrees"><AcademicDegreesTab /></TabsContent>
        <TabsContent value="activity"><ScientificActivityTab /></TabsContent>
        <TabsContent value="competitions"><OtherCompetitionsTab /></TabsContent>
      </Tabs>
    </div>
  )
}
