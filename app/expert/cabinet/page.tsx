"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
} from "lucide-react"

// ============ TAB 1: Şəxsi məlumatlar ============
function PersonalInfoTab() {
  const [editing, setEditing] = useState(false)
  const [data, setData] = useState({
    ad: "Fuad",
    soyad: "Məmmədov",
    ataAdi: "Rəfiq",
    dogumTarixi: "1978-03-15",
    cinsiyyet: "Kişi",
    vetandasliq: "Azərbaycan",
    fin: "7HPKL5B",
    voen: "9876543210",
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
            <Button size="sm" onClick={() => setEditing(false)} className="bg-primary hover:bg-primary/90 text-white">
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
                className={!editing ? "bg-muted border-border" : ""}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// ============ TAB 2: İş təcrübəsi ============
function WorkExperienceTab() {
  const [items, setItems] = useState([
    { id: 1, org: "AMEA Riyaziyyat və Mexanika İnstitutu", position: "Aparıcı elmi işçi", start: "2015", end: "Davam edir" },
    { id: 2, org: "Bakı Dövlət Universiteti", position: "Profesor", start: "2010", end: "2015" },
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
          <Button size="sm" onClick={openAdd} className="bg-primary hover:bg-primary/90 text-white">
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
                      <Badge className="bg-success/20 text-success hover:bg-success/30">Davam edir</Badge>
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
                        className="text-destructive hover:text-destructive"
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
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white">Yadda saxla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// ============ TAB 3: Ünvan və əlaqə ============
function AddressContactTab() {
  const [addresses, setAddresses] = useState([
    { id: 1, type: "Qeydiyyat", country: "Azərbaycan", city: "Bakı", street: "Akademik Aziz Mirəcov küç. 32" },
  ])
  const [contacts, setContacts] = useState([
    { id: 1, type: "Telefon", value: "+994 12 539 74 50" },
    { id: 2, type: "Email", value: "fuad.mammadov@amea.az" },
    { id: 3, type: "ORCID", value: "0000-0002-1234-5678" },
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
            <Button size="sm" onClick={() => { setAddrForm({ type: "", country: "", city: "", street: "" }); setAddrDialog(true) }} className="bg-primary hover:bg-primary/90 text-white">
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
                      <Button size="sm" variant="ghost" className="text-destructive" onClick={() => setAddresses(addresses.filter((x) => x.id !== a.id))}>
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
            <Button size="sm" onClick={() => { setContForm({ type: "", value: "" }); setContDialog(true) }} className="bg-primary hover:bg-primary/90 text-white">
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
                      <Button size="sm" variant="ghost" className="text-destructive" onClick={() => setContacts(contacts.filter((x) => x.id !== c.id))}>
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
            <Button className="bg-primary hover:bg-primary/90 text-white" onClick={() => {
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
                  <SelectItem value="ORCID">ORCID</SelectItem>
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
            <Button className="bg-primary hover:bg-primary/90 text-white" onClick={() => {
              setContacts([...contacts, { id: Date.now(), ...contForm }])
              setContDialog(false)
            }}>Yadda saxla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// ============ Main Component ============
export default function ExpertCabinetPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Şəxsi Kabinet</h1>
        <p className="text-muted-foreground mt-2">Ekspert profil məlumatlarınızı idarə edin</p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">Şəxsi məlumatlar</TabsTrigger>
          <TabsTrigger value="work">İş təcrübəsi</TabsTrigger>
          <TabsTrigger value="address">Ünvan və əlaqə</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfoTab />
        </TabsContent>

        <TabsContent value="work">
          <WorkExperienceTab />
        </TabsContent>

        <TabsContent value="address">
          <AddressContactTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
