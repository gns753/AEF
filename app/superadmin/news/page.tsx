"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Plus, Pencil, Trash2, GripVertical, ImageIcon, X } from "lucide-react"

interface NewsItem {
  id: number
  titleAz: string
  titleEn: string
  textAz: string
  textEn: string
  fullTextAz: string
  fullTextEn: string
  image: string | null
  link: string
  status: "aktiv" | "deaktiv"
  order: number
  date: string
}

const initialNews: NewsItem[] = [
  {
    id: 1,
    titleAz: "Yeni qrant musabiqesi elan edildi",
    titleEn: "New grant competition announced",
    textAz: "2025-ci il ucun yeni qrant musabiqesi elan edilmisdir.",
    textEn: "A new grant competition has been announced for 2025.",
    fullTextAz: "Azerbaycan Elm Fondu 2025-ci il ucun yeni qrant musabiqesi elan edir. Butun elm sahelerinde muracietler qebul olunur.",
    fullTextEn: "The Science Foundation of Azerbaijan announces a new grant competition for 2025. Applications are accepted in all fields of science.",
    image: "/hero-ai.jpg",
    link: "",
    status: "aktiv",
    order: 1,
    date: "01.03.2025",
  },
  {
    id: 2,
    titleAz: "Fond hesabati derc edildi",
    titleEn: "Foundation report published",
    textAz: "Illik hesabat derc edilmisdir.",
    textEn: "Annual report has been published.",
    fullTextAz: "Azerbaycan Elm Fondunun 2024-cu il uzre illik hesabati derc edilmisdir.",
    fullTextEn: "The annual report of the Science Foundation of Azerbaijan for 2024 has been published.",
    image: null,
    link: "",
    status: "deaktiv",
    order: 2,
    date: "15.02.2025",
  },
  {
    id: 3,
    titleAz: "Musabiqe neticeleri aciqlaandi",
    titleEn: "Competition results announced",
    textAz: "Qalibler elan edildi.",
    textEn: "Winners have been announced.",
    fullTextAz: "2024-cu il qrant musabiqesinin neticeleri aciqlanmisdir. Qalibler AEF-in resmi saytinda elan edilecek.",
    fullTextEn: "The results of the 2024 grant competition have been announced. Winners will be listed on the AEF official website.",
    image: "/hero-energy.jpg",
    link: "",
    status: "aktiv",
    order: 3,
    date: "10.02.2025",
  },
]

const emptyForm: Omit<NewsItem, "id"> = {
  titleAz: "",
  titleEn: "",
  textAz: "",
  textEn: "",
  fullTextAz: "",
  fullTextEn: "",
  image: null,
  link: "",
  status: "aktiv",
  order: 0,
  date: new Date().toLocaleDateString("az-AZ", { day: "2-digit", month: "2-digit", year: "numeric" }),
}

export default function NewsManagementPage() {
  const [news, setNews] = useState<NewsItem[]>(initialNews)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null)
  const [form, setForm] = useState<Omit<NewsItem, "id">>(emptyForm)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [dragOverId, setDragOverId] = useState<number | null>(null)
  const [draggingId, setDraggingId] = useState<number | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const showToast = useCallback((message: string, type: "success" | "error") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  const openAddModal = () => {
    setEditingItem(null)
    setForm({ ...emptyForm, order: news.length + 1 })
    setImagePreview(null)
    setIsModalOpen(true)
  }

  const openEditModal = (item: NewsItem) => {
    setEditingItem(item)
    setForm({
      titleAz: item.titleAz,
      titleEn: item.titleEn,
      textAz: item.textAz,
      textEn: item.textEn,
      fullTextAz: item.fullTextAz,
      fullTextEn: item.fullTextEn,
      image: item.image,
      link: item.link,
      status: item.status,
      order: item.order,
      date: item.date,
    })
    setImagePreview(item.image)
    setIsModalOpen(true)
  }

  const handleSave = () => {
    if (!form.titleAz.trim()) return

    if (editingItem) {
      setNews((prev) =>
        prev.map((n) => (n.id === editingItem.id ? { ...n, ...form, image: imagePreview } : n))
      )
      showToast("Ugurla yadda saxlanildi", "success")
    } else {
      const newId = Math.max(...news.map((n) => n.id), 0) + 1
      setNews((prev) => [...prev, { id: newId, ...form, image: imagePreview }])
      showToast("Xeber ugurla elave edildi", "success")
    }
    setIsModalOpen(false)
  }

  const handleDelete = () => {
    if (deleteId === null) return
    setNews((prev) => {
      const filtered = prev.filter((n) => n.id !== deleteId)
      return filtered.map((n, i) => ({ ...n, order: i + 1 }))
    })
    setDeleteId(null)
    showToast("Ugurla silindi", "error")
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  // Drag and drop handlers
  const handleDragStart = (id: number) => {
    setDraggingId(id)
  }

  const handleDragOver = (e: React.DragEvent, id: number) => {
    e.preventDefault()
    setDragOverId(id)
  }

  const handleDrop = (targetId: number) => {
    if (draggingId === null || draggingId === targetId) {
      setDraggingId(null)
      setDragOverId(null)
      return
    }
    setNews((prev) => {
      const items = [...prev]
      const dragIndex = items.findIndex((n) => n.id === draggingId)
      const dropIndex = items.findIndex((n) => n.id === targetId)
      const [removed] = items.splice(dragIndex, 1)
      items.splice(dropIndex, 0, removed)
      return items.map((n, i) => ({ ...n, order: i + 1 }))
    })
    setDraggingId(null)
    setDragOverId(null)
    showToast("Siralama yenilendi", "success")
  }

  const sortedNews = [...news].sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200 ${
            toast.type === "success" ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          {toast.message}
          <button onClick={() => setToast(null)}>
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Xeberler ve Bannerler Idareetmesi</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Login sehifesindeki slider/banner mezmunlarini idare edin
          </p>
        </div>
        <Button onClick={openAddModal} className="bg-red-600 hover:bg-red-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Yeni xeber elave et
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[50px]">Sira</TableHead>
              <TableHead>Basliq</TableHead>
              <TableHead className="hidden md:table-cell">Qisa metn</TableHead>
              <TableHead className="w-[80px]">Sekil</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="hidden sm:table-cell w-[110px]">Tarix</TableHead>
              <TableHead className="w-[140px] text-right">Emeliyyatlar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedNews.map((item) => (
              <TableRow
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item.id)}
                onDragOver={(e) => handleDragOver(e, item.id)}
                onDrop={() => handleDrop(item.id)}
                onDragEnd={() => { setDraggingId(null); setDragOverId(null) }}
                className={`group transition-colors ${
                  dragOverId === item.id ? "bg-red-50" : ""
                } ${draggingId === item.id ? "opacity-50" : ""}`}
              >
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <GripVertical className="h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground cursor-grab active:cursor-grabbing transition-colors" />
                    <span className="text-sm font-medium text-muted-foreground">{item.order}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium text-foreground line-clamp-1">{item.titleAz}</span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="text-sm text-muted-foreground line-clamp-1">{item.textAz}</span>
                </TableCell>
                <TableCell>
                  {item.image ? (
                    <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 text-xs">
                      var
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground/70 border-gray-200 text-xs">
                      yox
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {item.status === "aktiv" ? (
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 text-xs">
                      Aktiv
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100 text-xs">
                      Deaktiv
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModal(item)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 px-2"
                    >
                      <Pencil className="h-3.5 w-3.5 mr-1" />
                      <span className="hidden lg:inline text-xs">Redakte et</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteId(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 px-2"
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" />
                      <span className="hidden lg:inline text-xs">Sil</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {sortedNews.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground/70">
                  Hec bir xeber tapilmadi
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Xeberi redakte et" : "Xeber elave et"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Basliq (AZ)</Label>
                <Input
                  value={form.titleAz}
                  onChange={(e) => setForm((f) => ({ ...f, titleAz: e.target.value }))}
                  placeholder="Azerbaycanca basliq"
                />
              </div>
              <div className="space-y-2">
                <Label>Basliq (EN)</Label>
                <Input
                  value={form.titleEn}
                  onChange={(e) => setForm((f) => ({ ...f, titleEn: e.target.value }))}
                  placeholder="English title"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Qisa metn (AZ)</Label>
                <Input
                  value={form.textAz}
                  onChange={(e) => setForm((f) => ({ ...f, textAz: e.target.value }))}
                  placeholder="Azerbaycanca qisa metn"
                />
              </div>
              <div className="space-y-2">
                <Label>Qisa metn (EN)</Label>
                <Input
                  value={form.textEn}
                  onChange={(e) => setForm((f) => ({ ...f, textEn: e.target.value }))}
                  placeholder="English short text"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tam metn (AZ)</Label>
                <Textarea
                  value={form.fullTextAz}
                  onChange={(e) => setForm((f) => ({ ...f, fullTextAz: e.target.value }))}
                  placeholder="Azerbaycanca tam metn"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>Tam metn (EN)</Label>
                <Textarea
                  value={form.fullTextEn}
                  onChange={(e) => setForm((f) => ({ ...f, fullTextEn: e.target.value }))}
                  placeholder="English full text"
                  rows={4}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Sekil yukle</Label>
              <div className="flex items-start gap-4">
                <label className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:border-red-300 hover:bg-red-50/50 transition-colors text-sm text-muted-foreground">
                  <ImageIcon className="h-4 w-4" />
                  Fayl secin
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
                {imagePreview && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border bg-muted/50">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setImagePreview(null)}
                      className="absolute top-0.5 right-0.5 p-0.5 bg-black/50 rounded-full"
                    >
                      <X className="h-3 w-3 text-white" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Link (eger varsa)</Label>
                <Input
                  value={form.link}
                  onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) => setForm((f) => ({ ...f, status: v as "aktiv" | "deaktiv" }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aktiv">Aktiv</SelectItem>
                    <SelectItem value="deaktiv">Deaktiv</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Yayim tarixi</Label>
                <Input
                  type="date"
                  value={form.date.split(".").reverse().join("-")}
                  onChange={(e) => {
                    const d = e.target.value.split("-")
                    setForm((f) => ({ ...f, date: `${d[2]}.${d[1]}.${d[0]}` }))
                  }}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Legv et
            </Button>
            <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700 text-white">
              Yadda saxla
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bu xeberi silmek isteyinizden eminsiniz?</AlertDialogTitle>
            <AlertDialogDescription>
              Bu emeliyyat geri qaytarila bilmez. Xeber butun dillerden silinecek.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Xeyr</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Beli, sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
