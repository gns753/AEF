"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { AlertCircle, Plus, Trash2, FileText } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface ScienceField {
  id: string
  code: string
  name: string
}

interface FormData {
  firstName: string
  lastName: string
  objectives: string
  annotation: string
  keywords: string
  scientificDirection: string
  expectedResults: string
  bibliography: string
  budgetJustification: string
  projectRelevance: string
}

type FormErrors = Partial<Record<keyof FormData | "scienceFields", string>>

export default function ApplyPage() {
  const params = useParams()
  const competitionId = params.competitionId as string

  const [showWarning, setShowWarning] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [scienceFields, setScienceFields] = useState<ScienceField[]>([])
  const [newField, setNewField] = useState({ code: "", name: "" })
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    objectives: "",
    annotation: "",
    keywords: "",
    scientificDirection: "",
    expectedResults: "",
    bibliography: "",
    budgetJustification: "",
    projectRelevance: "",
  })

  const handleAddScienceField = () => {
    if (newField.code && newField.name) {
      setScienceFields([
        ...scienceFields,
        { id: Date.now().toString(), code: newField.code, name: newField.name },
      ])
      setNewField({ code: "", name: "" })
      setErrors((prev) => ({ ...prev, scienceFields: undefined }))
    }
  }

  const handleRemoveScienceField = (id: string) => {
    setScienceFields(scienceFields.filter((field) => field.id !== id))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const annotationCharCount = formData.annotation.length
  const isAnnotationValid = annotationCharCount >= 2400 && annotationCharCount <= 3500

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = "Ad məcburidir"
    if (!formData.lastName.trim()) newErrors.lastName = "Soyad məcburidir"
    if (scienceFields.length === 0) newErrors.scienceFields = "Ən azı bir elm sahəsi əlavə edin"
    if (!formData.objectives.trim()) newErrors.objectives = "Bu sahə məcburidir"
    if (!formData.annotation.trim()) {
      newErrors.annotation = "Annotasiya məcburidir"
    } else if (!isAnnotationValid) {
      newErrors.annotation = "Annotasiya 2400-3500 simvol arasında olmalıdır"
    }
    if (!formData.keywords.trim()) newErrors.keywords = "Açar sözlər məcburidir"
    if (!formData.scientificDirection.trim()) newErrors.scientificDirection = "Bu sahə məcburidir"
    if (!formData.expectedResults.trim()) newErrors.expectedResults = "Bu sahə məcburidir"
    if (!formData.bibliography.trim()) newErrors.bibliography = "Bu sahə məcburidir"
    if (!formData.budgetJustification.trim()) newErrors.budgetJustification = "Bu sahə məcburidir"
    if (!formData.projectRelevance.trim()) newErrors.projectRelevance = "Bu sahə məcburidir"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    setSubmitted(true)
    if (validate()) {
      // TODO: submit to backend
      alert("Müraciət uğurla təqdim edildi!")
    }
  }

  const handleSaveDraft = () => {
    // TODO: save draft to backend
    alert("Müsvəddə saxlanıldı!")
  }

  const fieldClass = (fieldName: keyof FormData | "scienceFields") =>
    submitted && errors[fieldName] ? "border-destructive" : ""

  return (
    <div className="space-y-6 pb-8">
      {/* Warning Dialog */}
      <Dialog open={showWarning} onOpenChange={setShowWarning}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex gap-3">
              <AlertCircle className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
              <div>
                <DialogTitle>Diqqət</DialogTitle>
                <DialogDescription className="mt-3">
                  Məlumatları doldurarkən ad, soyad qeyd olunduğu halda layihəyə xitam veriləcəkdir.
                  Zəhmət olmasa bu məlumatları diqqətlə doldurun.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="flex gap-3 justify-end mt-4">
            <Button variant="outline" onClick={() => setShowWarning(false)}>
              Bağla
            </Button>
            <Button onClick={() => setShowWarning(false)}>
              Davam et
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Qrant Müraciətini Təqdim edin</h1>
        <p className="text-muted-foreground mt-1">Layihə #QR-{competitionId}</p>
      </div>

      <div className="space-y-6">

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Əsas Məlumatlar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Ad <span className="text-destructive">*</span>
                </label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Adınızı daxil edin"
                  className={fieldClass("firstName")}
                />
                {submitted && errors.firstName && (
                  <p className="text-xs text-destructive">{errors.firstName}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Soyad <span className="text-destructive">*</span>
                </label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Soyadınızı daxil edin"
                  className={fieldClass("lastName")}
                />
                {submitted && errors.lastName && (
                  <p className="text-xs text-destructive">{errors.lastName}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Science Fields */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Elm Sahələri <span className="text-destructive">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Kod</label>
                <Input
                  value={newField.code}
                  onChange={(e) => setNewField({ ...newField, code: e.target.value })}
                  placeholder="Elm sahəsinin kodu"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Tam Adı</label>
                <Input
                  value={newField.name}
                  onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                  placeholder="Elm sahəsinin tam adı"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleAddScienceField} variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Əlavə et
                </Button>
              </div>
            </div>
            {submitted && errors.scienceFields && (
              <p className="text-xs text-destructive">{errors.scienceFields}</p>
            )}
            {scienceFields.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Əlavə edilmiş elm sahələri:</p>
                <div className="space-y-2">
                  {scienceFields.map((field) => (
                    <div
                      key={field.id}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{field.name}</p>
                        <p className="text-xs text-muted-foreground">Kod: {field.code}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveScienceField(field.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Project Details (read-only from DB) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Layihə Məlumatları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Qrant ərizəçisinin statusu</label>
                <Input disabled placeholder="Bazadan gəlir" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Layihənin icra müddəti</label>
                <Input disabled placeholder="Bazadan gəlir" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Layihənin tipi</label>
                <Input disabled placeholder="Bazadan gəlir" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Objectives */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Layihənin Məqsəd və Problemləri <span className="text-destructive">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <label className="text-sm text-muted-foreground">
              Layihənin məqsədi, qarşıya qoyulan məsələlər, aktuallığı
            </label>
            <Textarea
              name="objectives"
              value={formData.objectives}
              onChange={handleInputChange}
              placeholder="Layihənin məqsədini ətraflı izah edin"
              rows={6}
              className={`resize-none ${fieldClass("objectives")}`}
            />
            {submitted && errors.objectives && (
              <p className="text-xs text-destructive">{errors.objectives}</p>
            )}
          </CardContent>
        </Card>

        {/* Annotation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Layihənin Annotasiyası <span className="text-destructive">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <label className="text-sm text-muted-foreground">
              Layihənin annotasiyası (2400–3500 simvol)
            </label>
            <Textarea
              name="annotation"
              value={formData.annotation}
              onChange={handleInputChange}
              placeholder="Layihəni qısaca təsvir edin"
              rows={6}
              className={`resize-none ${fieldClass("annotation")}`}
            />
            <div className="flex items-center justify-between">
              <p className={`text-xs ${isAnnotationValid ? "text-emerald-600" : "text-muted-foreground"}`}>
                {annotationCharCount} simvol (2400–3500 tələb olunur)
              </p>
            </div>
            {submitted && errors.annotation && (
              <p className="text-xs text-destructive">{errors.annotation}</p>
            )}
          </CardContent>
        </Card>

        {/* Keywords */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Açar Sözlər <span className="text-destructive">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <label className="text-sm text-muted-foreground">
              Layihənin məzmununu tam əks etdirən açar sözlər
            </label>
            <Textarea
              name="keywords"
              value={formData.keywords}
              onChange={handleInputChange}
              placeholder="Açar sözləri vergüllə ayırın"
              rows={3}
              className={`resize-none ${fieldClass("keywords")}`}
            />
            {submitted && errors.keywords && (
              <p className="text-xs text-destructive">{errors.keywords}</p>
            )}
          </CardContent>
        </Card>

        {/* Scientific Direction */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Elmi İstiqamət <span className="text-destructive">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <label className="text-sm text-muted-foreground">
              Layihənin elmi istiqaməti və qarşıya qoyulan problem üzrə qısa icmal
            </label>
            <Textarea
              name="scientificDirection"
              value={formData.scientificDirection}
              onChange={handleInputChange}
              placeholder="Elmi istiqaməti izah edin"
              rows={5}
              className={`resize-none ${fieldClass("scientificDirection")}`}
            />
            {submitted && errors.scientificDirection && (
              <p className="text-xs text-destructive">{errors.scientificDirection}</p>
            )}
          </CardContent>
        </Card>

        {/* Expected Results */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Gözlənilən Nəticələr <span className="text-destructive">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <label className="text-sm text-muted-foreground">
              Layihədən gözlənilən nəticələr, onların elmi və təcrübi əhəmiyyəti
            </label>
            <Textarea
              name="expectedResults"
              value={formData.expectedResults}
              onChange={handleInputChange}
              placeholder="Gözlənilən nəticələri təsvir edin"
              rows={5}
              className={`resize-none ${fieldClass("expectedResults")}`}
            />
            {submitted && errors.expectedResults && (
              <p className="text-xs text-destructive">{errors.expectedResults}</p>
            )}
          </CardContent>
        </Card>

        {/* Bibliography */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Biblioqrafiya <span className="text-destructive">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <label className="text-sm text-muted-foreground">
              Layihə üzrə biblioqrafik sıra
            </label>
            <Textarea
              name="bibliography"
              value={formData.bibliography}
              onChange={handleInputChange}
              placeholder="Biblioqrafik mənbələri sıralayın"
              rows={4}
              className={`resize-none ${fieldClass("bibliography")}`}
            />
            {submitted && errors.bibliography && (
              <p className="text-xs text-destructive">{errors.bibliography}</p>
            )}
          </CardContent>
        </Card>

        {/* Budget Justification */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Büdcə Əsaslandırılması <span className="text-destructive">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <label className="text-sm text-muted-foreground">
              Layihə büdcəsinin əsaslandırılması
            </label>
            <Textarea
              name="budgetJustification"
              value={formData.budgetJustification}
              onChange={handleInputChange}
              placeholder="Büdcə qiymətləndirməsini əsaslandırın"
              rows={4}
              className={`resize-none ${fieldClass("budgetJustification")}`}
            />
            {submitted && errors.budgetJustification && (
              <p className="text-xs text-destructive">{errors.budgetJustification}</p>
            )}
          </CardContent>
        </Card>

        {/* Project Relevance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Layihənin Aktuallığı <span className="text-destructive">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <label className="text-sm text-muted-foreground">
              Layihənin cari sosial-iqtisadi ehtiyacla əlaqəsi
            </label>
            <Textarea
              name="projectRelevance"
              value={formData.projectRelevance}
              onChange={handleInputChange}
              placeholder="Layihənin aktualllığını əsaslandırın"
              rows={4}
              className={`resize-none ${fieldClass("projectRelevance")}`}
            />
            {submitted && errors.projectRelevance && (
              <p className="text-xs text-destructive">{errors.projectRelevance}</p>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <Button variant="outline" className="flex-1" onClick={handleSaveDraft}>
            Müsvəddə saxla
          </Button>
          <Button className="flex-1" onClick={handleSubmit}>
            <FileText className="h-4 w-4 mr-2" />
            Təqdim et
          </Button>
        </div>

      </div>
    </div>
  )
}
