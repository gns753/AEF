"use client"

import { useState, useEffect, use } from "react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ScienceField {
  id: string
  code: string
  name: string
}

export default function ApplyPage({ params }: { params: Promise<{ competitionId: string }> }) {
  const resolvedParams = use(params)
  const competitionId = resolvedParams.competitionId
  console.log("[v0] ApplyPage rendered, competitionId:", competitionId)
  const [showWarning, setShowWarning] = useState(true)
  const [scienceFields, setScienceFields] = useState<ScienceField[]>([])
  const [newField, setNewField] = useState({ code: "", name: "" })
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    applicantStatus: "",
    projectDuration: "",
    projectType: "",
    objectives: "",
    annotation: "",
    keywords: "",
    scientificDirection: "",
    scientificIdea: "",
    researchStructure: "",
    expectedResults: "",
    bibliography: "",
    budgetJustification: "",
    projectRelevance: "",
  })

  useEffect(() => {
    setShowWarning(true)
  }, [])

  const handleAddScienceField = () => {
    if (newField.code && newField.name) {
      setScienceFields([
        ...scienceFields,
        { id: Date.now().toString(), code: newField.code, name: newField.name },
      ])
      setNewField({ code: "", name: "" })
    }
  }

  const handleRemoveScienceField = (id: string) => {
    setScienceFields(scienceFields.filter((field) => field.id !== id))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const annotationCharCount = formData.annotation.length
  const isAnnotationValid = annotationCharCount >= 2400 && annotationCharCount <= 3500

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
                  Zəhmət olmasa bu məlumatları diqqətlə doldurün.
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
        <h1 className="text-3xl font-bold text-foreground">Qrant Müraciətini Təqdim edin</h1>
        <p className="text-muted-foreground mt-2">Layihə #QR-{competitionId}</p>
      </div>

      {/* Form Sections */}
      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Əsas Məlumatlar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Ad</label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Adınızı daxil edin"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Soyad</label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Soyadınızı daxil edin"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Science Fields */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Elm Sahələri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Kod</label>
                  <Input
                    value={newField.code}
                    onChange={(e) => setNewField({ ...newField, code: e.target.value })}
                    placeholder="Elm sahəsinin kodu"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Tam Adı</label>
                  <Input
                    value={newField.name}
                    onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                    placeholder="Elm sahəsinin tam adı"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={handleAddScienceField}
                    className="w-full"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Əlavə et
                  </Button>
                </div>
              </div>

              {/* Science Fields List */}
              {scienceFields.length > 0 && (
                <div className="space-y-2 mt-4">
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
            </div>
          </CardContent>
        </Card>

        {/* Project Details (Read-only from DB) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Layihə Məlumatları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Qrant ərizəçisinin statusu
                </label>
                <Select value={formData.applicantStatus} onValueChange={(value) => handleSelectChange("applicantStatus", value)}>
                  <SelectTrigger disabled>
                    <SelectValue placeholder="Bazadan gəlir" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phd">PhD</SelectItem>
                    <SelectItem value="master">Master</SelectItem>
                    <SelectItem value="bachelor">Bachelor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Layihənin icra müddəti
                </label>
                <Select value={formData.projectDuration} onValueChange={(value) => handleSelectChange("projectDuration", value)}>
                  <SelectTrigger disabled>
                    <SelectValue placeholder="Bazadan gəlir" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1year">1 il</SelectItem>
                    <SelectItem value="2years">2 il</SelectItem>
                    <SelectItem value="3years">3 il</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Layihənin tipi
                </label>
                <Select value={formData.projectType} onValueChange={(value) => handleSelectChange("projectType", value)}>
                  <SelectTrigger disabled>
                    <SelectValue placeholder="Bazadan gəlir" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="research">Tədqiqat</SelectItem>
                    <SelectItem value="development">İnkişaf</SelectItem>
                    <SelectItem value="pilot">Pilot</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Description */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Layihənin Məqsəd və Problemləri</CardTitle>
          </CardHeader>
          <CardContent>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Layihənin məqsədi, qarşıya qoyulan məsələləri, aktuallığı, multidissiplinar xarakterinin əsaslandırılması
            </label>
            <Textarea
              name="objectives"
              value={formData.objectives}
              onChange={handleInputChange}
              placeholder="Rich-text editor ilə təqdim olunur"
              rows={6}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground mt-2">Rich-text editor dəstəyi mövcuddur</p>
          </CardContent>
        </Card>

        {/* Annotation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Layihənin Annotasiyası</CardTitle>
          </CardHeader>
          <CardContent>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Layihənin annotasiyası (2400-3500 simvol)
            </label>
            <Textarea
              name="annotation"
              value={formData.annotation}
              onChange={handleInputChange}
              placeholder="Layihəni qısaca təsvir edin"
              rows={6}
              className="resize-none"
            />
            <div className="flex items-center justify-between mt-2">
              <p className={`text-xs ${isAnnotationValid ? "text-success" : "text-destructive"}`}>
                {annotationCharCount} / 2400-3500 simvol
              </p>
              {isAnnotationValid && <span className="text-xs text-success">✓ Düzgündür</span>}
            </div>
          </CardContent>
        </Card>

        {/* Keywords */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Açar Sözlər</CardTitle>
          </CardHeader>
          <CardContent>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Layihənin məzmununu tam əks etdirən açar sözlər və ya söz birləşmələri
            </label>
            <Textarea
              name="keywords"
              value={formData.keywords}
              onChange={handleInputChange}
              placeholder="Açar sözləri vergüllə ayırın"
              rows={4}
              className="resize-none"
            />
          </CardContent>
        </Card>

        {/* Scientific Direction */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Elmi İstiqamət</CardTitle>
          </CardHeader>
          <CardContent>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Layihənin elmi istiqaməti və qarşıya qoyulan problem üzrə qısa icmal
            </label>
            <Textarea
              name="scientificDirection"
              value={formData.scientificDirection}
              onChange={handleInputChange}
              placeholder="Elmi istiqaməti açıqlayın"
              rows={5}
              className="resize-none"
            />
          </CardContent>
        </Card>

        {/* Scientific Idea */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Elmi İdeyası</CardTitle>
          </CardHeader>
          <CardContent>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Layihənin elmi ideyası
            </label>
            <Textarea
              name="scientificIdea"
              value={formData.scientificIdea}
              onChange={handleInputChange}
              placeholder="Elmi ideyasını təsvir edin"
              rows={5}
              className="resize-none"
            />
          </CardContent>
        </Card>

        {/* Research Structure */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tədqiqatın Strukturu</CardTitle>
          </CardHeader>
          <CardContent>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Layihə üzrə tədqiqatın strukturu
            </label>
            <Textarea
              name="researchStructure"
              value={formData.researchStructure}
              onChange={handleInputChange}
              placeholder="Tədqiqatın strukturunu təsvir edin"
              rows={5}
              className="resize-none"
            />
          </CardContent>
        </Card>

        {/* Expected Results */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Gözlənilən Nəticələr</CardTitle>
          </CardHeader>
          <CardContent>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Layihədən gözlənilən nəticələr, onların elmi və təcrübi əhəmiyyəti
            </label>
            <Textarea
              name="expectedResults"
              value={formData.expectedResults}
              onChange={handleInputChange}
              placeholder="Gözlənilən nəticələri təsvir edin"
              rows={5}
              className="resize-none"
            />
          </CardContent>
        </Card>

        {/* Bibliography */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Biblioqrafiya</CardTitle>
          </CardHeader>
          <CardContent>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Layihə üzrə biblioqrafik sıra
            </label>
            <Textarea
              name="bibliography"
              value={formData.bibliography}
              onChange={handleInputChange}
              placeholder="Biblioqrafik mənbələri sıralayın"
              rows={4}
              className="resize-none"
            />
          </CardContent>
        </Card>

        {/* Budget Justification */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Büdcə Əsaslandırılması</CardTitle>
          </CardHeader>
          <CardContent>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Layihə büdcəsinin əsaslandırılması
            </label>
            <Textarea
              name="budgetJustification"
              value={formData.budgetJustification}
              onChange={handleInputChange}
              placeholder="Büdcə dəyərləndirməsini əsaslandırın"
              rows={4}
              className="resize-none"
            />
          </CardContent>
        </Card>

        {/* Project Relevance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Layihənin Aktuallığı</CardTitle>
          </CardHeader>
          <CardContent>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Layihənin cari sosial-iqtisadi ehtiyacla əlaqəsi
            </label>
            <Textarea
              name="projectRelevance"
              value={formData.projectRelevance}
              onChange={handleInputChange}
              placeholder="Layihənin aktuallığını əsaslandırın"
              rows={4}
              className="resize-none"
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <Button variant="outline" className="flex-1">
            Müsveddi olaraq saxla
          </Button>
          <Button className="flex-1 bg-primary hover:bg-primary/90">
            <FileText className="h-4 w-4 mr-2" />
            Təqdim et
          </Button>
        </div>
      </div>
    </div>
  )
}
