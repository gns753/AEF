"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react"

// ── Helpers ─────────────────────────────────────────────────────────────────

function SectionHeader({
  title,
  open,
  onToggle,
}: {
  title: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between px-5 py-4 bg-blue-50 hover:bg-blue-100 transition-colors rounded-t-xl text-left"
    >
      <span className="font-semibold text-blue-900 text-base">{title}</span>
      {open ? (
        <ChevronUp className="h-5 w-5 text-blue-600 shrink-0" />
      ) : (
        <ChevronDown className="h-5 w-5 text-blue-600 shrink-0" />
      )}
    </button>
  )
}

function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
}

function FormField({
  label,
  required,
  children,
  error,
  full,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
  error?: string
  full?: boolean
}) {
  return (
    <div className={`space-y-1.5 ${full ? "md:col-span-2" : ""}`}>
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

function FileUpload({
  id,
  value,
  onChange,
  label,
}: {
  id: string
  value: File | null
  onChange: (file: File | null) => void
  label: string
}) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div className="space-y-1.5 md:col-span-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <div
        onClick={() => ref.current?.click()}
        className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-blue-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors"
      >
        <Upload className="h-5 w-5 text-blue-500 shrink-0" />
        <span className="text-sm text-muted-foreground">
          {value ? value.name : "JPG formatında faylı seçin..."}
        </span>
      </div>
      <input
        ref={ref}
        id={id}
        type="file"
        accept="image/jpeg,image/jpg"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </div>
  )
}

// ── Mock dropdown data ───────────────────────────────────────────────────────

const CITIES = ["Bakı", "Gəncə", "Sumqayıt", "Mingəçevir", "Naxçıvan", "Lənkəran", "Şirvan"]
const ORG_CATEGORIES = ["Dövlət qurumu", "Ali təhsil müəssisəsi", "Elmi-tədqiqat institutu", "Özəl sektor", "Beynəlxalq təşkilat"]
const ORG_NAMES = ["AMEA", "Bakı Dövlət Universiteti", "ADA Universiteti", "Azərbaycan Texniki Universiteti"]
const UNIT_CATEGORIES = ["Fakültə", "Kafedra", "Şöbə", "Laboratoriya", "Sektor"]
const UNIVERSITIES = ["Bakı Dövlət Universiteti", "ADA Universiteti", "ADNSU", "Azərbaycan Texniki Universiteti", "AMEA"]
const EDU_LEVELS = ["Bakalavr", "Magistr", "Doktorantura (PhD)", "Doktorantura (Elmlər doktoru)"]
const SCI_DEGREE_TYPES = ["Fəlsəfə doktoru (PhD)", "Elmlər doktoru"]
const SCI_TITLE_TYPES = ["Dosent", "Professor"]
const SCIENCE_FIELDS = ["Riyaziyyat", "Fizika", "Kimya", "Biologiya", "Tibb", "Texnika", "Humanitar elmlər"]
const SCIENCE_DIRECTIONS = ["Fundamental tədqiqatlar", "Tətbiqi tədqiqatlar", "İnnovasiya"]
const SCIENCE_SPECIALTIES = ["Algebra", "Nəzəri fizika", "Üzvi kimya", "Molekulyar biologiya"]
const SUB_DIRECTIONS = ["Alt istiqamət 1", "Alt istiqamət 2", "Alt istiqamət 3"]
const COMPETITION_ORGS = ["Azərbaycan Elm Fondu", "SOCAR", "BP", "Dünya Bankı"]
const COMPETITION_CATEGORIES = ["Əsas müsabiqə", "Gənc alim müsabiqəsi", "Beynəlxalq müsabiqə"]
const RATING_DEGREES = ["Birinci dərəcə", "İkinci dərəcə", "Üçüncü dərəcə", "Fəxri fərman"]
const CURRENT_STATUSES = ["Davam edir", "Tamamlandı", "Ləğv edildi"]

// ── Types ────────────────────────────────────────────────────────────────────

interface AddressFields {
  country: string
  city: string
  street: string
  building: string
  apartment: string
  postCode: string
}

interface WorkplaceFields {
  orgCategory: string
  orgName: string
  unitCategory: string
  unitName: string
  position: string
}

interface ContactFields {
  personalEmail: string
  mobilePhone: string
  workEmail: string
  workPhone: string
  homePhone: string
  website: string
}

interface EducationFields {
  university: string
  specialization: string
  eduLevel: string
  enrollYear: string
  graduateYear: string
  distinction: boolean
  diplomaCopy: File | null
}

interface SciDegreeFields {
  degreeType: string
  specCode: string
  specName: string
  diplomaSeries: string
  diplomaNumber: string
  issuingOrg: string
  issueDate: string
  diplomaCopy: File | null
}

interface EIFClassification {
  scienceField: string
  scienceDirection: string
  scienceSpecialty: string
}

interface SciTitleFields {
  titleType: string
  specCode: string
  specName: string
  diplomaSeries: string
  diplomaNumber: string
  issuingOrg: string
  issueDate: string
  diplomaCopy: File | null
}

interface ScientificInterest {
  scienceField: string
  scienceDirection: string
  subDirection: string
}

interface PublicationCounts {
  azPublications: string
  azImpactPublications: string
  azConferenceWorks: string
  foreignPublications: string
  foreignImpactPublications: string
  foreignConferenceWorks: string
  hIndex: string
}

interface CompetitionEntry {
  org: string
  category: string
  scienceField: string
  competitionName: string
  projectName: string
  grantNumber: string
  duration: string
  ratingDegree: string
  currentStatus: string
  startDate: string
  endDate: string
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function CompleteProfilePage() {
  const router = useRouter()

  // Section open/close state
  const [sections, setSections] = useState({
    actualAddress: true,
    registrationAddress: false,
    workplace: false,
    contact: false,
    education: false,
    sciDegree: false,
    eifClassification: false,
    sciTitle: false,
    sciInterests: false,
    publications: false,
    competitions: false,
  })

  const toggleSection = (key: keyof typeof sections) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // ── Form state ──────────────────────────────────────────────────────────────

  const [actualAddress, setActualAddress] = useState<AddressFields>({
    country: "Azərbaycan",
    city: "",
    street: "",
    building: "",
    apartment: "",
    postCode: "",
  })

  const [regAddress, setRegAddress] = useState<AddressFields>({
    country: "Azərbaycan",
    city: "",
    street: "",
    building: "",
    apartment: "",
    postCode: "",
  })

  const [workplace, setWorkplace] = useState<WorkplaceFields>({
    orgCategory: "",
    orgName: "",
    unitCategory: "",
    unitName: "",
    position: "",
  })

  const [contact, setContact] = useState<ContactFields>({
    personalEmail: "",
    mobilePhone: "",
    workEmail: "",
    workPhone: "",
    homePhone: "",
    website: "",
  })

  const [education, setEducation] = useState<EducationFields>({
    university: "",
    specialization: "",
    eduLevel: "",
    enrollYear: "",
    graduateYear: "",
    distinction: false,
    diplomaCopy: null,
  })

  const [sciDegree, setSciDegree] = useState<SciDegreeFields>({
    degreeType: "",
    specCode: "",
    specName: "",
    diplomaSeries: "",
    diplomaNumber: "",
    issuingOrg: "",
    issueDate: "",
    diplomaCopy: null,
  })

  const [eifClassification, setEifClassification] = useState<EIFClassification>({
    scienceField: "",
    scienceDirection: "",
    scienceSpecialty: "",
  })

  const [sciTitle, setSciTitle] = useState<SciTitleFields>({
    titleType: "",
    specCode: "",
    specName: "",
    diplomaSeries: "",
    diplomaNumber: "",
    issuingOrg: "",
    issueDate: "",
    diplomaCopy: null,
  })

  const [sciInterests, setSciInterests] = useState<ScientificInterest[]>([
    { scienceField: "", scienceDirection: "", subDirection: "" },
  ])

  const [publications, setPublications] = useState<PublicationCounts>({
    azPublications: "",
    azImpactPublications: "",
    azConferenceWorks: "",
    foreignPublications: "",
    foreignImpactPublications: "",
    foreignConferenceWorks: "",
    hIndex: "",
  })

  const [competitions, setCompetitions] = useState<CompetitionEntry[]>([])

  const [registerAsExpert, setRegisterAsExpert] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const updateAddress = (setter: React.Dispatch<React.SetStateAction<AddressFields>>, field: keyof AddressFields, value: string) => {
    setter((prev) => ({ ...prev, [field]: value }))
  }

  const addCompetition = () => {
    setCompetitions((prev) => [
      ...prev,
      {
        org: "", category: "", scienceField: "", competitionName: "",
        projectName: "", grantNumber: "", duration: "", ratingDegree: "",
        currentStatus: "", startDate: "", endDate: "",
      },
    ])
  }

  const removeCompetition = (index: number) => {
    setCompetitions((prev) => prev.filter((_, i) => i !== index))
  }

  const updateCompetition = (index: number, field: keyof CompetitionEntry, value: string) => {
    setCompetitions((prev) => prev.map((c, i) => i === index ? { ...c, [field]: value } : c))
  }

  const addInterest = () => {
    setSciInterests((prev) => [...prev, { scienceField: "", scienceDirection: "", subDirection: "" }])
  }

  const removeInterest = (index: number) => {
    setSciInterests((prev) => prev.filter((_, i) => i !== index))
  }

  const updateInterest = (index: number, field: keyof ScientificInterest, value: string) => {
    setSciInterests((prev) => prev.map((c, i) => i === index ? { ...c, [field]: value } : c))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!contact.personalEmail.trim()) newErrors.personalEmail = "Şəxsi e-poçt tələb olunur"
    else if (!/\S+@\S+\.\S+/.test(contact.personalEmail)) newErrors.personalEmail = "Düzgün e-poçt daxil edin"
    if (!contact.mobilePhone.trim()) newErrors.mobilePhone = "Mobil nömrə tələb olunur"
    else if (!/^\d{10}$/.test(contact.mobilePhone)) newErrors.mobilePhone = "Yalnız 10 rəqəm olmalıdır"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    router.replace("/researcher/dashboard")
    setIsLoading(false)
  }

  // ── Address block (reusable) ─────────────────────────────────────────────────

  const AddressBlock = ({
    values,
    setter,
    prefix,
  }: {
    values: AddressFields
    setter: React.Dispatch<React.SetStateAction<AddressFields>>
    prefix: string
  }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-5 pb-5">
      <FormField label="Ölkə">
        <Input value={values.country} readOnly className="bg-muted cursor-not-allowed" />
      </FormField>
      <FormField label="Şəhər/Rayon/Qəsəbə" required>
        <Select value={values.city} onValueChange={(v) => updateAddress(setter, "city", v)}>
          <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
          <SelectContent>{CITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
        </Select>
      </FormField>
      <FormField label="Prospekt/Küçə/Dalan" required>
        <Input
          value={values.street}
          onChange={(e) => updateAddress(setter, "street", e.target.value)}
          placeholder="Küçənin adını daxil edin"
        />
      </FormField>
      <FormField label="Ev/Bina" required>
        <Input
          value={values.building}
          onChange={(e) => updateAddress(setter, "building", e.target.value)}
          placeholder="Ev/Bina nömrəsi"
        />
      </FormField>
      <FormField label="Mənzil">
        <Input
          value={values.apartment}
          onChange={(e) => updateAddress(setter, "apartment", e.target.value)}
          placeholder="Mənzil nömrəsi"
        />
      </FormField>
      <FormField label="Poçt indeksi">
        <Input
          value={values.postCode}
          onChange={(e) => updateAddress(setter, "postCode", e.target.value)}
          placeholder="Poçt indeksi"
        />
      </FormField>
    </div>
  )

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="w-full max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image src="/logo.png" alt="Azərbaycan Elm Fondu" width={64} height={64} className="rounded-full" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Azərbaycan Elm Fondu</h1>
          <p className="text-muted-foreground text-sm">Profil məlumatlarının tamamlanması</p>
        </div>

        {/* Info notice */}
        <div className="mb-6 px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
          MyGov-dan inteqrasiya olunan məlumatlar sistem tərəfindən avtomatik doldurulmuşdur. Aşağıdakı məlumatları tamamlayın.
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* 1. Faktiki yaşayış ünvanı */}
          <Card className="border-0 shadow-md overflow-hidden">
            <SectionHeader title="Faktiki yaşayış ünvanı" open={sections.actualAddress} onToggle={() => toggleSection("actualAddress")} />
            {sections.actualAddress && (
              <CardContent className="p-0">
                <AddressBlock values={actualAddress} setter={setActualAddress} prefix="actual" />
              </CardContent>
            )}
          </Card>

          {/* 2. Qeydiyyat ünvanı */}
          <Card className="border-0 shadow-md overflow-hidden">
            <SectionHeader title="Qeydiyyat ünvanı" open={sections.registrationAddress} onToggle={() => toggleSection("registrationAddress")} />
            {sections.registrationAddress && (
              <CardContent className="p-0">
                <AddressBlock values={regAddress} setter={setRegAddress} prefix="reg" />
              </CardContent>
            )}
          </Card>

          {/* 3. İş yeri məlumatları */}
          <Card className="border-0 shadow-md overflow-hidden">
            <SectionHeader title="İş yeri məlumatları" open={sections.workplace} onToggle={() => toggleSection("workplace")} />
            {sections.workplace && (
              <CardContent className="p-5">
                <FieldGroup>
                  <FormField label="Qurumun kateqoriyası">
                    <Select value={workplace.orgCategory} onValueChange={(v) => setWorkplace((p) => ({ ...p, orgCategory: v }))}>
                      <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>{ORG_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Qurumun adı">
                    <Select value={workplace.orgName} onValueChange={(v) => setWorkplace((p) => ({ ...p, orgName: v }))}>
                      <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>{ORG_NAMES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Struktur vahidinin kateqoriyası">
                    <Select value={workplace.unitCategory} onValueChange={(v) => setWorkplace((p) => ({ ...p, unitCategory: v }))}>
                      <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>{UNIT_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Struktur vahidinin adı">
                    <Input value={workplace.unitName} onChange={(e) => setWorkplace((p) => ({ ...p, unitName: e.target.value }))} placeholder="Vahidin adını daxil edin" />
                  </FormField>
                  <FormField label="Tutduğu vəzifə">
                    <Input value={workplace.position} onChange={(e) => setWorkplace((p) => ({ ...p, position: e.target.value }))} placeholder="Vəzifənizi daxil edin" />
                  </FormField>
                </FieldGroup>
              </CardContent>
            )}
          </Card>

          {/* 4. Əlaqə vasitələri */}
          <Card className="border-0 shadow-md overflow-hidden">
            <SectionHeader title="Əlaqə vasitələri" open={sections.contact} onToggle={() => toggleSection("contact")} />
            {sections.contact && (
              <CardContent className="p-5">
                <FieldGroup>
                  <FormField label="Şəxsi elektron poçt ünvanı" required error={errors.personalEmail}>
                    <Input
                      type="email"
                      maxLength={254}
                      value={contact.personalEmail}
                      onChange={(e) => setContact((p) => ({ ...p, personalEmail: e.target.value }))}
                      placeholder="example@mail.com"
                    />
                  </FormField>
                  <FormField label="Mobil nömrə" required error={errors.mobilePhone}>
                    <Input
                      inputMode="numeric"
                      maxLength={10}
                      value={contact.mobilePhone}
                      onChange={(e) => setContact((p) => ({ ...p, mobilePhone: e.target.value.replace(/\D/g, "") }))}
                      placeholder="0501234567"
                    />
                  </FormField>
                  <FormField label="Xidməti elektron poçt ünvanı">
                    <Input
                      type="email"
                      maxLength={254}
                      value={contact.workEmail}
                      onChange={(e) => setContact((p) => ({ ...p, workEmail: e.target.value }))}
                      placeholder="work@institution.az"
                    />
                  </FormField>
                  <FormField label="İş telefon nömrəsi">
                    <Input
                      inputMode="numeric"
                      maxLength={10}
                      value={contact.workPhone}
                      onChange={(e) => setContact((p) => ({ ...p, workPhone: e.target.value.replace(/\D/g, "") }))}
                      placeholder="0121234567"
                    />
                  </FormField>
                  <FormField label="Ev telefon nömrəsi">
                    <Input
                      inputMode="numeric"
                      maxLength={10}
                      value={contact.homePhone}
                      onChange={(e) => setContact((p) => ({ ...p, homePhone: e.target.value.replace(/\D/g, "") }))}
                      placeholder="0121234567"
                    />
                  </FormField>
                  <FormField label="Şəxsi veb-sayt">
                    <Input
                      value={contact.website}
                      onChange={(e) => setContact((p) => ({ ...p, website: e.target.value }))}
                      placeholder="https://example.com"
                    />
                  </FormField>
                </FieldGroup>
              </CardContent>
            )}
          </Card>

          {/* 5. Təhsil */}
          <Card className="border-0 shadow-md overflow-hidden">
            <SectionHeader title="Təhsil" open={sections.education} onToggle={() => toggleSection("education")} />
            {sections.education && (
              <CardContent className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Ali təhsil müəssisəsinin adı">
                    <Select value={education.university} onValueChange={(v) => setEducation((p) => ({ ...p, university: v }))}>
                      <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>{UNIVERSITIES.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="İxtisaslaşma və ya istiqamətin adı (diplom üzrə)">
                    <Input value={education.specialization} onChange={(e) => setEducation((p) => ({ ...p, specialization: e.target.value }))} placeholder="İxtisasın adını daxil edin" />
                  </FormField>
                  <FormField label="Təhsil səviyyəsi">
                    <Select value={education.eduLevel} onValueChange={(v) => setEducation((p) => ({ ...p, eduLevel: v }))}>
                      <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>{EDU_LEVELS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Daxil olduğu il">
                    <Input
                      maxLength={4}
                      inputMode="numeric"
                      value={education.enrollYear}
                      onChange={(e) => setEducation((p) => ({ ...p, enrollYear: e.target.value.replace(/\D/g, "") }))}
                      placeholder="yyyy"
                    />
                  </FormField>
                  <FormField label="Bitirdiyi il">
                    <Input
                      maxLength={4}
                      inputMode="numeric"
                      value={education.graduateYear}
                      onChange={(e) => setEducation((p) => ({ ...p, graduateYear: e.target.value.replace(/\D/g, "") }))}
                      placeholder="yyyy"
                    />
                  </FormField>
                  <div className="flex items-center gap-2 pt-6">
                    <Checkbox
                      id="distinction"
                      checked={education.distinction}
                      onCheckedChange={(v) => setEducation((p) => ({ ...p, distinction: v as boolean }))}
                    />
                    <Label htmlFor="distinction" className="text-sm">Fərqlənmə diplomu</Label>
                  </div>
                  <FileUpload
                    id="edu-diploma"
                    label="Ali təhsil diplomunun surəti (JPG)"
                    value={education.diplomaCopy}
                    onChange={(f) => setEducation((p) => ({ ...p, diplomaCopy: f }))}
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* 6. Elmi dərəcə */}
          <Card className="border-0 shadow-md overflow-hidden">
            <SectionHeader title="Elmi dərəcə" open={sections.sciDegree} onToggle={() => toggleSection("sciDegree")} />
            {sections.sciDegree && (
              <CardContent className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Elmi dərəcənin növü">
                    <Select value={sciDegree.degreeType} onValueChange={(v) => setSciDegree((p) => ({ ...p, degreeType: v }))}>
                      <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>{SCI_DEGREE_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="İxtisas kodu">
                    <Input value={sciDegree.specCode} onChange={(e) => setSciDegree((p) => ({ ...p, specCode: e.target.value }))} placeholder="İxtisas kodu" />
                  </FormField>
                  <FormField label="İxtisas və ya istiqamətin adı">
                    <Input value={sciDegree.specName} onChange={(e) => setSciDegree((p) => ({ ...p, specName: e.target.value }))} placeholder="İxtisasın adı" />
                  </FormField>
                  <FormField label="Diplomun seriyası">
                    <Input value={sciDegree.diplomaSeries} onChange={(e) => setSciDegree((p) => ({ ...p, diplomaSeries: e.target.value }))} placeholder="Seriya" />
                  </FormField>
                  <FormField label="Diplomun nömrəsi">
                    <Input value={sciDegree.diplomaNumber} onChange={(e) => setSciDegree((p) => ({ ...p, diplomaNumber: e.target.value }))} placeholder="Nömrə" />
                  </FormField>
                  <FormField label="Verən orqanın adı">
                    <Input value={sciDegree.issuingOrg} onChange={(e) => setSciDegree((p) => ({ ...p, issuingOrg: e.target.value }))} placeholder="Orqanın adı" />
                  </FormField>
                  <FormField label="Verilmə tarixi">
                    <Input type="date" value={sciDegree.issueDate} onChange={(e) => setSciDegree((p) => ({ ...p, issueDate: e.target.value }))} />
                  </FormField>
                  <FileUpload
                    id="sci-degree-diploma"
                    label="Elmi dərəcə diplomunun surəti (JPG)"
                    value={sciDegree.diplomaCopy}
                    onChange={(f) => setSciDegree((p) => ({ ...p, diplomaCopy: f }))}
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* 7. EİF Təsnifatı */}
          <Card className="border-0 shadow-md overflow-hidden">
            <SectionHeader
              title="Elmin İnkişafı Fondunun Təsnifatına uyğun gələn ixtisas"
              open={sections.eifClassification}
              onToggle={() => toggleSection("eifClassification")}
            />
            {sections.eifClassification && (
              <CardContent className="p-5">
                <FieldGroup>
                  <FormField label="Elm sahəsinin adı" required>
                    <Select value={eifClassification.scienceField} onValueChange={(v) => setEifClassification((p) => ({ ...p, scienceField: v }))}>
                      <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>{SCIENCE_FIELDS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Elmi istiqamətin adı" required>
                    <Select value={eifClassification.scienceDirection} onValueChange={(v) => setEifClassification((p) => ({ ...p, scienceDirection: v }))}>
                      <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>{SCIENCE_DIRECTIONS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Elmi ixtisasın adı" required>
                    <Select value={eifClassification.scienceSpecialty} onValueChange={(v) => setEifClassification((p) => ({ ...p, scienceSpecialty: v }))}>
                      <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>{SCIENCE_SPECIALTIES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                    </Select>
                  </FormField>
                </FieldGroup>
              </CardContent>
            )}
          </Card>

          {/* 8. Elmi ad */}
          <Card className="border-0 shadow-md overflow-hidden">
            <SectionHeader title="Elmi ad" open={sections.sciTitle} onToggle={() => toggleSection("sciTitle")} />
            {sections.sciTitle && (
              <CardContent className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Elmi adın növü">
                    <Select value={sciTitle.titleType} onValueChange={(v) => setSciTitle((p) => ({ ...p, titleType: v }))}>
                      <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>{SCI_TITLE_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="İxtisas kodu">
                    <Input value={sciTitle.specCode} onChange={(e) => setSciTitle((p) => ({ ...p, specCode: e.target.value }))} placeholder="İxtisas kodu" />
                  </FormField>
                  <FormField label="İxtisas və ya istiqamətin adı">
                    <Input value={sciTitle.specName} onChange={(e) => setSciTitle((p) => ({ ...p, specName: e.target.value }))} placeholder="İxtisasın adı" />
                  </FormField>
                  <FormField label="Diplomun seriyası">
                    <Input value={sciTitle.diplomaSeries} onChange={(e) => setSciTitle((p) => ({ ...p, diplomaSeries: e.target.value }))} placeholder="Seriya" />
                  </FormField>
                  <FormField label="Diplomun nömrəsi">
                    <Input value={sciTitle.diplomaNumber} onChange={(e) => setSciTitle((p) => ({ ...p, diplomaNumber: e.target.value }))} placeholder="Nömrə" />
                  </FormField>
                  <FormField label="Verən orqanın adı">
                    <Input value={sciTitle.issuingOrg} onChange={(e) => setSciTitle((p) => ({ ...p, issuingOrg: e.target.value }))} placeholder="Orqanın adı" />
                  </FormField>
                  <FormField label="Verilmə tarixi">
                    <Input type="date" value={sciTitle.issueDate} onChange={(e) => setSciTitle((p) => ({ ...p, issueDate: e.target.value }))} />
                  </FormField>
                  <FileUpload
                    id="sci-title-diploma"
                    label="Diplomunun surəti (JPG)"
                    value={sciTitle.diplomaCopy}
                    onChange={(f) => setSciTitle((p) => ({ ...p, diplomaCopy: f }))}
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* 9. Elmi maraq dairələri */}
          <Card className="border-0 shadow-md overflow-hidden">
            <SectionHeader title="Elmi maraq dairələri" open={sections.sciInterests} onToggle={() => toggleSection("sciInterests")} />
            {sections.sciInterests && (
              <CardContent className="p-5 space-y-4">
                {sciInterests.map((interest, idx) => (
                  <div key={idx} className="p-4 border border-blue-100 rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Maraq #{idx + 1}</span>
                      {sciInterests.length > 1 && (
                        <button type="button" onClick={() => removeInterest(idx)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <FieldGroup>
                      <FormField label="Elmi sahənin adı" required>
                        <Select value={interest.scienceField} onValueChange={(v) => updateInterest(idx, "scienceField", v)}>
                          <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                          <SelectContent>{SCIENCE_FIELDS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                        </Select>
                      </FormField>
                      <FormField label="Elmi istiqamət" required>
                        <Select value={interest.scienceDirection} onValueChange={(v) => updateInterest(idx, "scienceDirection", v)}>
                          <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                          <SelectContent>{SCIENCE_DIRECTIONS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                        </Select>
                      </FormField>
                      <FormField label="Alt istiqamət" required>
                        <Select value={interest.subDirection} onValueChange={(v) => updateInterest(idx, "subDirection", v)}>
                          <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                          <SelectContent>{SUB_DIRECTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                        </Select>
                      </FormField>
                    </FieldGroup>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addInterest} className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50">
                  <Plus className="h-4 w-4" />
                  Maraq əlavə et
                </Button>
              </CardContent>
            )}
          </Card>

          {/* 10. Nəşrlər */}
          <Card className="border-0 shadow-md overflow-hidden">
            <SectionHeader title="Nəşr olunmuş elmi əsərlərin sayı" open={sections.publications} onToggle={() => toggleSection("publications")} />
            {sections.publications && (
              <CardContent className="p-5">
                <div className="space-y-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Azərbaycanda nəşr olunanlar</p>
                  <FieldGroup>
                    <FormField label="Elmi əsərlərin sayı" required>
                      <Input inputMode="numeric" value={publications.azPublications} onChange={(e) => setPublications((p) => ({ ...p, azPublications: e.target.value.replace(/\D/g, "") }))} placeholder="0" />
                    </FormField>
                    <FormField label="İmpakt faktorlu nəşrlərdə elmi əsərlərin sayı" required>
                      <Input inputMode="numeric" value={publications.azImpactPublications} onChange={(e) => setPublications((p) => ({ ...p, azImpactPublications: e.target.value.replace(/\D/g, "") }))} placeholder="0" />
                    </FormField>
                    <FormField label="Konfrans materiallarında çap olunmuş işlərin sayı" required>
                      <Input inputMode="numeric" value={publications.azConferenceWorks} onChange={(e) => setPublications((p) => ({ ...p, azConferenceWorks: e.target.value.replace(/\D/g, "") }))} placeholder="0" />
                    </FormField>
                  </FieldGroup>

                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide pt-2">Xaricdə nəşr olunanlar</p>
                  <FieldGroup>
                    <FormField label="Elmi əsərlərin sayı" required>
                      <Input inputMode="numeric" value={publications.foreignPublications} onChange={(e) => setPublications((p) => ({ ...p, foreignPublications: e.target.value.replace(/\D/g, "") }))} placeholder="0" />
                    </FormField>
                    <FormField label="İmpakt faktorlu nəşrlərdə elmi əsərlərin sayı" required>
                      <Input inputMode="numeric" value={publications.foreignImpactPublications} onChange={(e) => setPublications((p) => ({ ...p, foreignImpactPublications: e.target.value.replace(/\D/g, "") }))} placeholder="0" />
                    </FormField>
                    <FormField label="Konfrans materiallarında çap olunmuş işlərin sayı" required>
                      <Input inputMode="numeric" value={publications.foreignConferenceWorks} onChange={(e) => setPublications((p) => ({ ...p, foreignConferenceWorks: e.target.value.replace(/\D/g, "") }))} placeholder="0" />
                    </FormField>
                  </FieldGroup>

                  <FieldGroup>
                    <FormField label="Müəllifin H-index-i" required>
                      <Input inputMode="numeric" value={publications.hIndex} onChange={(e) => setPublications((p) => ({ ...p, hIndex: e.target.value.replace(/\D/g, "") }))} placeholder="0" />
                    </FormField>
                  </FieldGroup>
                </div>
              </CardContent>
            )}
          </Card>

          {/* 11. Müsabiqələr */}
          <Card className="border-0 shadow-md overflow-hidden">
            <SectionHeader title="İştirak olunmuş digər müsabiqələr" open={sections.competitions} onToggle={() => toggleSection("competitions")} />
            {sections.competitions && (
              <CardContent className="p-5 space-y-4">
                {competitions.map((comp, idx) => (
                  <div key={idx} className="p-4 border border-blue-100 rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Müsabiqə #{idx + 1}</span>
                      <button type="button" onClick={() => removeCompetition(idx)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField label="Müsabiqəni keçirən təşkilatın adı">
                        <Select value={comp.org} onValueChange={(v) => updateCompetition(idx, "org", v)}>
                          <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                          <SelectContent>{COMPETITION_ORGS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                      </FormField>
                      <FormField label="Kateqoriya">
                        <Select value={comp.category} onValueChange={(v) => updateCompetition(idx, "category", v)}>
                          <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                          <SelectContent>{COMPETITION_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                        </Select>
                      </FormField>
                      <FormField label="Elm sahəsi">
                        <Select value={comp.scienceField} onValueChange={(v) => updateCompetition(idx, "scienceField", v)}>
                          <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                          <SelectContent>{SCIENCE_FIELDS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                        </Select>
                      </FormField>
                      <FormField label="Müsabiqənin adı">
                        <Input value={comp.competitionName} onChange={(e) => updateCompetition(idx, "competitionName", e.target.value)} placeholder="Müsabiqənin adı" />
                      </FormField>
                      <FormField label="Layihənin adı">
                        <Input value={comp.projectName} onChange={(e) => updateCompetition(idx, "projectName", e.target.value)} placeholder="Layihənin adı" />
                      </FormField>
                      <FormField label="Qrantın nömrəsi və ya kodu">
                        <Input value={comp.grantNumber} onChange={(e) => updateCompetition(idx, "grantNumber", e.target.value)} placeholder="QR-xxx" />
                      </FormField>
                      <FormField label="Yerinə yetirilmə müddəti">
                        <Input value={comp.duration} onChange={(e) => updateCompetition(idx, "duration", e.target.value)} placeholder="məs. 2 il" />
                      </FormField>
                      <FormField label="Qiymətləndirmə dərəcəsi">
                        <Select value={comp.ratingDegree} onValueChange={(v) => updateCompetition(idx, "ratingDegree", v)}>
                          <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                          <SelectContent>{RATING_DEGREES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                        </Select>
                      </FormField>
                      <FormField label="Cari statusu">
                        <Select value={comp.currentStatus} onValueChange={(v) => updateCompetition(idx, "currentStatus", v)}>
                          <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                          <SelectContent>{CURRENT_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                        </Select>
                      </FormField>
                      <FormField label="Başlama tarixi">
                        <Input type="date" value={comp.startDate} onChange={(e) => updateCompetition(idx, "startDate", e.target.value)} />
                      </FormField>
                      <FormField label="Bitmə tarixi">
                        <Input type="date" value={comp.endDate} onChange={(e) => updateCompetition(idx, "endDate", e.target.value)} />
                      </FormField>
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addCompetition} className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50">
                  <Plus className="h-4 w-4" />
                  Müsabiqə əlavə et
                </Button>
              </CardContent>
            )}
          </Card>

          {/* Expert checkbox */}
          <div className="flex items-center gap-3 px-1">
            <Checkbox
              id="registerAsExpert"
              checked={registerAsExpert}
              onCheckedChange={(v) => setRegisterAsExpert(v as boolean)}
            />
            <Label htmlFor="registerAsExpert" className="text-sm font-medium cursor-pointer">
              Ekspert kimi qeydiyyatdan keçmək istəyirəm
            </Label>
          </div>

          {/* Submit / Cancel */}
          <div className="flex gap-3 pt-2 pb-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.replace("/login")}
              disabled={isLoading}
            >
              İmtina et
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Göndərilir..." : "Təsdiq et"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
