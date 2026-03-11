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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Pencil, Eye, EyeOff, X } from "lucide-react"

interface ContentBlock {
  id: string
  name: string
  location: string
  az: string
  en: string
  visible: boolean
  lastUpdated: string
  type: "short" | "long"
}

const initialContent: ContentBlock[] = [
  {
    id: "mainTitle",
    name: "Bas basliq",
    location: "Login sehifesi - yuxari",
    az: "Azerbaycan Respublikasi Elm Fondu",
    en: "Science Foundation of Azerbaijan Republic",
    visible: true,
    lastUpdated: "01.03.2025",
    type: "short",
  },
  {
    id: "subTitle",
    name: "Alt basliq / tesvir",
    location: "Login sehifesi - orta",
    az: "Elektron Qrant Idareetme Sistemi",
    en: "Electronic Grant Management System",
    visible: true,
    lastUpdated: "28.02.2025",
    type: "short",
  },
  {
    id: "announcement",
    name: "Elan banneri",
    location: "Login sehifesi - asagi",
    az: "2025-ci il ucun yeni qrant musabiqesi elan edilmisdir. Son muraciet tarixi: 30 aprel 2025",
    en: "A new grant competition has been announced for 2025. Application deadline: April 30, 2025",
    visible: true,
    lastUpdated: "15.02.2025",
    type: "long",
  },
  {
    id: "contact",
    name: "Elaqe melumatlari",
    location: "Login sehifesi - footer",
    az: "Elaqe: info@aef.gov.az | Tel: +994 12 492 74 00 | Unvan: Baki, Istiqlaliyyet kuc. 10",
    en: "Contact: info@aef.gov.az | Phone: +994 12 492 74 00 | Address: 10 Istiglaliyyat str., Baku",
    visible: true,
    lastUpdated: "01.01.2025",
    type: "long",
  },
]

export default function PageContentPage() {
  const [content, setContent] = useState<ContentBlock[]>(initialContent)
  const [editingBlock, setEditingBlock] = useState<ContentBlock | null>(null)
  const [formAz, setFormAz] = useState("")
  const [formEn, setFormEn] = useState("")
  const [formVisible, setFormVisible] = useState(true)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const showToast = useCallback((message: string, type: "success" | "error") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  const openEditModal = (block: ContentBlock) => {
    setEditingBlock(block)
    setFormAz(block.az)
    setFormEn(block.en)
    setFormVisible(block.visible)
  }

  const handleSave = () => {
    if (!editingBlock) return
    const now = new Date()
    const dateStr = `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()}`

    setContent((prev) =>
      prev.map((c) =>
        c.id === editingBlock.id
          ? { ...c, az: formAz, en: formEn, visible: formVisible, lastUpdated: dateStr }
          : c
      )
    )
    setEditingBlock(null)
    showToast("Ugurla yadda saxlanildi", "success")
  }

  const toggleVisibility = (id: string) => {
    setContent((prev) =>
      prev.map((c) => (c.id === id ? { ...c, visible: !c.visible } : c))
    )
    const block = content.find((c) => c.id === id)
    if (block) {
      showToast(block.visible ? "Mezmun gizledildi" : "Mezmun gorunur edildi", "success")
    }
  }

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
      <div>
        <h1 className="text-2xl font-bold text-foreground">Sehife Mezmununun Idareetmesi</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Login sehifesinde gorunen statik mezmunlari idare edin
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Blok adi</TableHead>
              <TableHead className="hidden md:table-cell">Yer</TableHead>
              <TableHead className="hidden lg:table-cell">Mezmun (AZ)</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="hidden sm:table-cell w-[130px]">Son yenileme</TableHead>
              <TableHead className="w-[180px] text-right">Emeliyyatlar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {content.map((block) => (
              <TableRow key={block.id} className="group">
                <TableCell>
                  <span className="text-sm font-medium text-foreground">{block.name}</span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="text-sm text-muted-foreground">{block.location}</span>
                </TableCell>
                <TableCell className="hidden lg:table-cell max-w-[250px]">
                  <span className="text-sm text-muted-foreground line-clamp-1">{block.az}</span>
                </TableCell>
                <TableCell>
                  {block.visible ? (
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 text-xs">
                      Gorunur
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-muted-foreground border-gray-200 hover:bg-gray-100 text-xs">
                      Gizli
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span className="text-sm text-muted-foreground">{block.lastUpdated}</span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModal(block)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 px-2"
                    >
                      <Pencil className="h-3.5 w-3.5 mr-1" />
                      <span className="text-xs">Redakte et</span>
                    </Button>
                    {(block.id === "announcement" || block.id === "contact") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleVisibility(block.id)}
                        className={`h-8 px-2 ${
                          block.visible
                            ? "text-muted-foreground hover:text-gray-700 hover:bg-muted/50"
                            : "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                        }`}
                      >
                        {block.visible ? (
                          <>
                            <EyeOff className="h-3.5 w-3.5 mr-1" />
                            <span className="text-xs">Gizlet</span>
                          </>
                        ) : (
                          <>
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            <span className="text-xs">Goster</span>
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Modal */}
      <Dialog open={editingBlock !== null} onOpenChange={(open) => !open && setEditingBlock(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {"Mezmunu redakte et"} {editingBlock ? `- ${editingBlock.name}` : ""}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Azerbaycan dilinde</Label>
              {editingBlock?.type === "long" ? (
                <Textarea
                  value={formAz}
                  onChange={(e) => setFormAz(e.target.value)}
                  rows={4}
                  placeholder="Azerbaycanca mezmun"
                />
              ) : (
                <Input
                  value={formAz}
                  onChange={(e) => setFormAz(e.target.value)}
                  placeholder="Azerbaycanca mezmun"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label>Ingilis dilinde</Label>
              {editingBlock?.type === "long" ? (
                <Textarea
                  value={formEn}
                  onChange={(e) => setFormEn(e.target.value)}
                  rows={4}
                  placeholder="English content"
                />
              ) : (
                <Input
                  value={formEn}
                  onChange={(e) => setFormEn(e.target.value)}
                  placeholder="English content"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label>Gorunus</Label>
              <RadioGroup
                value={formVisible ? "visible" : "hidden"}
                onValueChange={(v) => setFormVisible(v === "visible")}
                className="flex gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="visible" id="radio-visible" />
                  <Label htmlFor="radio-visible" className="font-normal cursor-pointer">
                    Gorunur
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="hidden" id="radio-hidden" />
                  <Label htmlFor="radio-hidden" className="font-normal cursor-pointer">
                    Gizli
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingBlock(null)}>
              Legv et
            </Button>
            <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700 text-white">
              Yadda saxla
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
