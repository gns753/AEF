"use client"

import { useState, useMemo } from "react"
import { useRouter, useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, ArrowLeft, CheckCircle2, Eye, FileText, Star, AlertTriangle, ChevronRight, ChevronLeft } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const competitionNames: Record<string, string> = {
  "1": "Gənc alimlər üçün qrant müsabiqəsi",
  "2": "İnnovasiya layihələri müsabiqəsi",
  "3": "Beynəlxalq elmi əməkdaşlıq proqramı",
  "4": "Tibbi tədqiqatlar üzrə qrant müsabiqəsi",
}

interface ProjectDetails {
  id: number
  code: string
  name: string
  annotation: string
  field: string
  scientificDirection: string
  projectType: string
  applicantStatus: string
  category: string
  character: string
  duration: number
  estimatedCost: number
  participants: {
    total: number
    withDegree: number
    withTitle: number
    young: number
    female: number
  }
  objectives: string
  keywords: string
  scientificReview: string
  scientificIdea: string
  researchStructure: string
  expectedResults: string
  applicationAreas: string
  equipment: string
  budgetExplanation: string
  budgetBreakdown: {
    role: string
    amount: number
  }[]
}

const allProjects: ProjectDetails[] = [
  {
    id: 1,
    code: "EIF-2025-001",
    name: "Neyroşəbəkələrdə dərin öyrənmə alqoritmlərinin optimallaşdırılması",
    annotation:
      "Bu layihə müxtəlif neyroşəbəkə arxitekturalarında dərin öyrənmə alqoritmlərinin performansının artırılmasına yönəlib. Xüsusilə, böyük həcmli verilənlər üzərində emal sürətinin və dəqiqliyinin yaxşılaşdırılması nəzərdə tutulur.",
    field: "Kompüter elmləri",
    scientificDirection: "Süni intellekt və maşın öyrənməsi",
    projectType: "Fərdi",
    applicantStatus: "Müvəqqəti yaradıcı kollektiv",
    category: "Ölkədaxili",
    character: "Elm sahələrinin qovşağında",
    duration: 24,
    estimatedCost: 85000,
    participants: {
      total: 5,
      withDegree: 2,
      withTitle: 1,
      young: 3,
      female: 2,
    },
    objectives: "Layihənin əsas məqsədi neyroşəbəkələrdə dərin öyrənmə alqoritmlərinin performansını 30% artırmaq, emal vaxtını azaltmaq və enerji səmərəliliyini yaxşılaşdırmaqdır.",
    keywords: "neyroşəbəkə; dərin öyrənmə; optimallaşdırma; GPU; paralel hesablama; süni intellekt",
    scientificReview: "Son illərdə dərin öyrənmə sahəsində əhəmiyyətli irəliləyişlər əldə edilmişdir.",
    scientificIdea: "Layihənin elmi ideyası adaptiv öyrənmə sürəti və dinamik batch ölçüsü istifadə edərək gradient descent optimallaşdırmasını təkmilləşdirməkdir.",
    researchStructure: "Mərhələ 1: Mövcud alqoritmlərin analizi (6 ay)\nMərhələ 2: Yeni optimallaşdırma metodunun işlənməsi (8 ay)",
    expectedResults: "1. Ən azı 2 impakt faktorlu jurnalda elmi məqalə\n2. Açıq mənbəli proqram kitabxanası",
    applicationAreas: "Tibbi görüntü analizi, avtomatik sürücüsüz avtomobillər, maliyyə proqnozlaşdırması",
    equipment: "NVIDIA RTX 3090 GPU (2 ədəd), Intel Xeon server",
    budgetExplanation: "Büdcənin 45%-i avadanlıq alınmasına ayrılır.",
    budgetBreakdown: [
      { role: "Layihə rəhbəri", amount: 15000 },
      { role: "Baş tədqiqatçı", amount: 12000 },
    ],
  },
  {
    id: 2,
    code: "EIF-2025-002",
    name: "Azərbaycanın endemik bitki növlərinin genomik analizi",
    annotation:
      "Layihə çərçivəsində Azərbaycanın endemik bitki növlərinin tam genomik ardıcıllığı müəyyən ediləcək.",
    field: "Biologiya",
    scientificDirection: "Genomika və bioinformatika",
    projectType: "Qrup",
    applicantStatus: "Elmi-tədqiqat institutu",
    category: "Ölkədaxili",
    character: "Fundamental",
    duration: 36,
    estimatedCost: 120000,
    participants: {
      total: 8,
      withDegree: 4,
      withTitle: 2,
      young: 4,
      female: 5,
    },
    objectives: "Azərbaycanın 50+ endemik bitki növünün tam genom ardıcıllığını müəyyən etmək.",
    keywords: "endemik bitkilər; genomika; bioinformatika; biomüxtəliflik",
    scientificReview: "Azərbaycan florası 4500-dən çox bitki növünü əhatə edir.",
    scientificIdea: "İlk dəfə olaraq müasir sekvensləşdirmə texnologiyalarından istifadə ediləcək.",
    researchStructure: "Mərhələ 1: Nümunə toplama ekspedisiyaları (8 ay)",
    expectedResults: "1. 50+ növün tam genom ardıcıllığı\n2. Açıq genom verilənlər bazası",
    applicationAreas: "Kənd təsərrüfatı, dərman bitkiləri sənayesi",
    equipment: "Illumina MiSeq sekvenser",
    budgetExplanation: "Büdcənin 40%-i sekvensləşdirmə xərclərinə ayrılır.",
    budgetBreakdown: [
      { role: "Layihə rəhbəri", amount: 18000 },
      { role: "Baş tədqiqatçı", amount: 24000 },
    ],
  },
]

// Wizard step definitions
const WIZARD_STEPS = [
  { id: 1, title: "Layihənin qiymətləndirilməsi", subtitle: "Meyarlar üzrə ballar" },
  { id: 2, title: "Yekun qiymətləndirmə şkalası", subtitle: "6 seçim" },
  { id: 3, title: "Ekspertin yazılı rəyi", subtitle: "Mətn sahəsi" },
  { id: 4, title: "Şəxsi məlumatlar", subtitle: "Bank məlumatları" },
]

// Criteria definitions
const CRITERIA = {
  criterion1: {
    title: "Meyar 1. Layihənin elmi tədqiqatlara uyğunluq dərəcəsi",
    options: [
      { value: "5", label: "5 bal - Tam uyğun gəlir", description: "Layihə verilmiş elm sahəsi və istiqamətləri üzrə nəzərdə tutulmuş elmi tədqiqatlara tam uyğundur və yeni prinsipal elmi nailiyyətlərin və vacib nəticələrin alınmasına istiqamətləndirilmişdir." },
      { value: "3", label: "3 bal - Qismən uyğun gəlir", description: "Layihə tədqiqata uyğun elm sahəsinin vacib probleminin həllinə istiqamətləndirilmişdir" },
      { value: "0", label: "0 bal - Uyğun gəlmir", description: "Layihə səthi xarakterlidir və nəzərdə tutulan elmi tədqiqatların əsas xüsusiyyətlərini özündə əks etdirmir", warning: true },
    ],
  },
  criterion2: {
    title: "Meyar 2. Elmi ideyanın (hipotezin) yeniliyi, tədqiqatın orijinallığı",
    options: [
      { value: "7", label: "7 bal - Analoqu yoxdur", description: "Layihədə təqdim olunan problemin həlli yolu unikaldır" },
      { value: "5", label: "5 bal - Layihənin ideyası məlumdur və müəllif(lər)ə məxsusdur", description: "Elmi ideya patentləşdirilib və ya lisenziyalı elmi jurnalda və ya monoqrafiya şəklində çap olunub" },
      { value: "3", label: "3 bal - Yerli və xarici analoqlar haqqında məlumat var", description: "Təqdim olunmuş ideya az öyrənilmişdir və onun bu layihədə tədqiqini orijinal hesab etmək olar" },
      { value: "0", label: "0 bal - Elmi ideya yoxdur", description: "Layihənin elmi ideyası məlumdur və dəfələrlə həll olunan problemlər çərçivəsində reallaşdırılmışdır", warning: true },
    ],
  },
  criterion3: {
    title: "Meyar 3. Metodik yanaşmanın adekvatlığı",
    options: [
      { value: "5", label: "5 bal - Adekvatdır", description: "Layihədə qarşıya qoyulmuş elmi problem və məsələlərin düzgün həlli üsullarından istifadə olunur və bunlar qarşıya qoyulmuş məqsədin tam şəkildə reallaşmasına imkan verə bilər." },
      { value: "3", label: "3 bal - Adekvatlıq problemlidir", description: "Təqdim olunan yanaşma layihədə qarşıya qoyulmuş məsələlərin qismən həllinə imkan verə bilər" },
      { value: "0", label: "0 bal - Adekvat deyildir", description: "Təqdim olunan metodlar layihədə qarşıya qoyulmuş problemin həllinə imkan verə bilməz", warning: true },
    ],
  },
  criterion4: {
    title: "Meyar 4. Gözlənilən nəticələrin elmi əhəmiyyəti",
    options: [
      { value: "5", label: "5 bal - Yüksəkdir", description: "Gözlənilən nəticələr layihədə qarşıya qoyulan məsələlərin tam şəkildə həllini əks etdirməlidir. Onlar yenilik və orijinallığı ilə fərqlənməli və tədqiq olunan problemin həllinə çox böyük töhfə verməlidir" },
      { value: "3", label: "3 bal - Əhəmiyyətlidir", description: "Gözlənilən nəticələr layihədə qarşıya qoyulan məsələlərin müəyyən səviyyədə həllini əks etdirməlidir" },
      { value: "1", label: "1 bal - Yüksək deyil", description: "Gözlənilən nəticələr layihədə qarşıya qoyulan məsələlərin qismən həllini əks etdirməlidir" },
      { value: "0", label: "0 bal - Yoxdur", description: "Gözlənilən nəticələrin layihədə qarşıya qoyulan problemə aidiyyəti yoxdur" },
    ],
  },
  criterion5: {
    title: "Meyar 5. Gözlənilən nəticələrin praktiki əhəmiyyəti",
    options: [
      { value: "5", label: "5 bal - Yüksəkdir", description: "Gözlənilən nəticələr elmdə irəliyə atılmış çox mühüm addım xarakterli olmalı və müvafiq elm sahəsinin inkişafı üçün prinsipial əhəmiyyətli olmalıdır" },
      { value: "3", label: "3 bal - Əhəmiyyətlidir", description: "Gözlənilən nəticələr müvafiq elm sahəsi üçün əhəmiyyətli olmalı, praktikada özünün geniş tətbiqini tapmalıdır" },
      { value: "1", label: "1 bal - Yüksək deyil", description: "Gözlənilən nəticələr praktikada qismən (məhdud) tətbiqə malik olmalıdır" },
      { value: "0", label: "0 bal - Yoxdur", description: "Gözlənilən nəticələrin praktiki əhəmiyyəti yoxdur" },
    ],
  },
}

// Final evaluation scale
const FINAL_SCALE = [
  { value: "5", label: "5 bal - Layihə çox əhəmiyyətlidir", range: "26-27 bal" },
  { value: "4", label: "4 bal - Layihə dəstəklənə bilər", range: "21-25 bal" },
  { value: "3", label: "3 bal - Layihə müəyyən elmi maraq kəsb edir", range: "16-20 bal" },
  { value: "2", label: "2 bal - Layihə az əhəmiyyətlidir", range: "11-15 bal" },
  { value: "1", label: "1 bal - Layihədə ciddi dəyişikliklər tələb olunur", range: "6-10 bal" },
  { value: "0", label: "0 bal - Layihə dəstəklənməyə layiq deyildir", range: "0-5 bal" },
]

function getFieldBadge(field: string) {
  const colors: Record<string, string> = {
    "Kompüter elmləri": "bg-sky-100 text-sky-700 border-sky-200",
    "Biologiya": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "Mühəndislik": "bg-amber-100 text-amber-700 border-amber-200",
    "Filologiya": "bg-violet-100 text-violet-700 border-violet-200",
    "Tibb": "bg-rose-100 text-rose-700 border-rose-200",
  }
  return (
    <Badge className={`${colors[field] || "bg-muted text-muted-foreground"} hover:bg-opacity-80`}>
      {field}
    </Badge>
  )
}

function formatDate() {
  const now = new Date()
  const dd = String(now.getDate()).padStart(2, "0")
  const mm = String(now.getMonth() + 1).padStart(2, "0")
  const yyyy = now.getFullYear()
  return `${dd}.${mm}.${yyyy}`
}

export default function ProjectsSelectionPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const competitionName = competitionNames[id] || "Müsabiqə"

  const [search, setSearch] = useState("")
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [selectionDates, setSelectionDates] = useState<Record<number, string>>({})
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [expandedAnnotations, setExpandedAnnotations] = useState<Set<number>>(new Set())
  
  // Project detail dialog state
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  
  // Wizard state
  const [wizardOpen, setWizardOpen] = useState(false)
  const [wizardStep, setWizardStep] = useState(1)
  const [showZeroWarning, setShowZeroWarning] = useState(false)
  const [zeroJustification, setZeroJustification] = useState("")
  
  // Step 1: Criteria scores
  const [projectCode, setProjectCode] = useState("")
  const [evaluationDate, setEvaluationDate] = useState(formatDate())
  const [criterion1, setCriterion1] = useState("")
  const [criterion2, setCriterion2] = useState("")
  const [criterion3, setCriterion3] = useState("")
  const [criterion4, setCriterion4] = useState("")
  const [criterion5, setCriterion5] = useState("")
  
  // Step 2: Final scale
  const [finalScale, setFinalScale] = useState("")
  
  // Step 3: Written review
  const [writtenReview, setWrittenReview] = useState("")
  const [reviewDecision, setReviewDecision] = useState("")
  
  // Step 4: Personal info
  const [hasVoen, setHasVoen] = useState("")
  const [voenNumber, setVoenNumber] = useState("")
  const [bankName, setBankName] = useState("")
  const [bankVoen, setBankVoen] = useState("")
  const [mh, setMh] = useState("")
  const [hh, setHh] = useState("")
  const [bankCode, setBankCode] = useState("")
  const [swift, setSwift] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  
  // Signature dialog
  const [signatureDialogOpen, setSignatureDialogOpen] = useState(false)
  const [signatureMethod, setSignatureMethod] = useState("")

  // Calculate total score
  const totalScore = useMemo(() => {
    const c1 = parseInt(criterion1) || 0
    const c2 = parseInt(criterion2) || 0
    const c3 = parseInt(criterion3) || 0
    const c4 = parseInt(criterion4) || 0
    const c5 = parseInt(criterion5) || 0
    return c1 + c2 + c3 + c4 + c5
  }, [criterion1, criterion2, criterion3, criterion4, criterion5])

  const filtered = useMemo(() => {
    if (!search.trim()) return allProjects
    const q = search.toLowerCase()
    return allProjects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.annotation.toLowerCase().includes(q) ||
        p.field.toLowerCase().includes(q)
    )
  }, [search])

  const toggleSelect = (projectId: number) => {
    if (submitted) return
    const next = new Set(selectedIds)
    const nextDates = { ...selectionDates }
    if (next.has(projectId)) {
      next.delete(projectId)
      delete nextDates[projectId]
    } else {
      next.add(projectId)
      nextDates[projectId] = formatDate()
    }
    setSelectedIds(next)
    setSelectionDates(nextDates)
  }

  const toggleAnnotation = (projectId: number) => {
    const next = new Set(expandedAnnotations)
    if (next.has(projectId)) {
      next.delete(projectId)
    } else {
      next.add(projectId)
    }
    setExpandedAnnotations(next)
  }

  const openProjectDetails = (project: ProjectDetails) => {
    setSelectedProject(project)
    setDetailOpen(true)
  }

  const openWizard = () => {
    if (selectedProject) {
      setProjectCode(selectedProject.code)
      setEvaluationDate(formatDate())
    }
    setDetailOpen(false)
    setWizardOpen(true)
    setWizardStep(1)
  }

  const resetWizard = () => {
    setWizardStep(1)
    setCriterion1("")
    setCriterion2("")
    setCriterion3("")
    setCriterion4("")
    setCriterion5("")
    setFinalScale("")
    setWrittenReview("")
    setReviewDecision("")
    setHasVoen("")
    setVoenNumber("")
    setBankName("")
    setBankVoen("")
    setMh("")
    setHh("")
    setBankCode("")
    setSwift("")
    setCardNumber("")
    setZeroJustification("")
    setShowZeroWarning(false)
  }

  // Check if current step is valid for navigation
  const isStep1Valid = () => {
    return projectCode && evaluationDate && criterion1 && criterion2 && criterion3 && criterion4 && criterion5
  }

  const isStep2Valid = () => {
    return finalScale !== ""
  }

  const isStep3Valid = () => {
    return writtenReview.trim().length > 0 && reviewDecision !== ""
  }

  const isStep4Valid = () => {
    if (hasVoen === "yes") {
      return voenNumber.length === 10 && bankName && bankVoen.length === 10 && mh && hh && bankCode.length >= 4 && bankCode.length <= 6 && swift.length >= 8 && swift.length <= 11
    } else if (hasVoen === "no") {
      return bankName && bankVoen.length === 10 && mh && hh && bankCode.length >= 4 && bankCode.length <= 6 && swift.length >= 8 && swift.length <= 11 && cardNumber
    }
    return false
  }

  const handleCriterionChange = (criterion: string, value: string, setter: (val: string) => void) => {
    setter(value)
    if (value === "0") {
      setShowZeroWarning(true)
    }
  }

  const handleNextStep = () => {
    if (wizardStep < 4) {
      setWizardStep(wizardStep + 1)
    }
  }

  const handleFinish = () => {
    setWizardOpen(false)
    setSignatureDialogOpen(true)
  }

  const handleSignatureSubmit = () => {
    if (selectedProject) {
      const next = new Set(selectedIds)
      const nextDates = { ...selectionDates }
      next.add(selectedProject.id)
      nextDates[selectedProject.id] = formatDate()
      setSelectedIds(next)
      setSelectionDates(nextDates)
    }
    setSignatureDialogOpen(false)
    resetWizard()
  }

  const handleSubmit = () => {
    const existing = sessionStorage.getItem("completedCompetitions")
    const ids: number[] = existing ? JSON.parse(existing) : []
    if (!ids.includes(Number(id))) ids.push(Number(id))
    sessionStorage.setItem("completedCompetitions", JSON.stringify(ids))

    setSubmitted(true)
    setConfirmOpen(false)

    setTimeout(() => {
      router.push("/expert/dashboard")
    }, 2000)
  }

  // Render wizard step content
  const renderWizardContent = () => {
    switch (wizardStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Layihənin kodu *</Label>
                <Input
                  value={projectCode}
                  onChange={(e) => setProjectCode(e.target.value)}
                  placeholder="EIF-2025-001"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Tarix *</Label>
                <Input
                  value={evaluationDate}
                  onChange={(e) => setEvaluationDate(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Criteria */}
            <div className="space-y-6">
              {/* Criterion 1 */}
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">{CRITERIA.criterion1.title}</h4>
                <RadioGroup value={criterion1} onValueChange={(v) => handleCriterionChange("criterion1", v, setCriterion1)}>
                  {CRITERIA.criterion1.options.map((opt) => (
                    <div key={opt.value} className={cn("flex items-start space-x-3 p-3 rounded-lg border", opt.warning && criterion1 === opt.value ? "border-red-300 bg-red-50" : "border-transparent hover:bg-muted/50")}>
                      <RadioGroupItem value={opt.value} id={`c1-${opt.value}`} />
                      <div className="flex-1">
                        <Label htmlFor={`c1-${opt.value}`} className="font-medium cursor-pointer">{opt.label}</Label>
                        <p className="text-sm text-muted-foreground mt-1">{opt.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Criterion 2 */}
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">{CRITERIA.criterion2.title}</h4>
                <RadioGroup value={criterion2} onValueChange={(v) => handleCriterionChange("criterion2", v, setCriterion2)}>
                  {CRITERIA.criterion2.options.map((opt) => (
                    <div key={opt.value} className={cn("flex items-start space-x-3 p-3 rounded-lg border", opt.warning && criterion2 === opt.value ? "border-red-300 bg-red-50" : "border-transparent hover:bg-muted/50")}>
                      <RadioGroupItem value={opt.value} id={`c2-${opt.value}`} />
                      <div className="flex-1">
                        <Label htmlFor={`c2-${opt.value}`} className="font-medium cursor-pointer">{opt.label}</Label>
                        <p className="text-sm text-muted-foreground mt-1">{opt.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Criterion 3 */}
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">{CRITERIA.criterion3.title}</h4>
                <RadioGroup value={criterion3} onValueChange={(v) => handleCriterionChange("criterion3", v, setCriterion3)}>
                  {CRITERIA.criterion3.options.map((opt) => (
                    <div key={opt.value} className={cn("flex items-start space-x-3 p-3 rounded-lg border", opt.warning && criterion3 === opt.value ? "border-red-300 bg-red-50" : "border-transparent hover:bg-muted/50")}>
                      <RadioGroupItem value={opt.value} id={`c3-${opt.value}`} />
                      <div className="flex-1">
                        <Label htmlFor={`c3-${opt.value}`} className="font-medium cursor-pointer">{opt.label}</Label>
                        <p className="text-sm text-muted-foreground mt-1">{opt.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Criterion 4 */}
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">{CRITERIA.criterion4.title}</h4>
                <RadioGroup value={criterion4} onValueChange={(v) => setCriterion4(v)}>
                  {CRITERIA.criterion4.options.map((opt) => (
                    <div key={opt.value} className="flex items-start space-x-3 p-3 rounded-lg border border-transparent hover:bg-muted/50">
                      <RadioGroupItem value={opt.value} id={`c4-${opt.value}`} />
                      <div className="flex-1">
                        <Label htmlFor={`c4-${opt.value}`} className="font-medium cursor-pointer">{opt.label}</Label>
                        <p className="text-sm text-muted-foreground mt-1">{opt.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Criterion 5 */}
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">{CRITERIA.criterion5.title}</h4>
                <RadioGroup value={criterion5} onValueChange={(v) => setCriterion5(v)}>
                  {CRITERIA.criterion5.options.map((opt) => (
                    <div key={opt.value} className="flex items-start space-x-3 p-3 rounded-lg border border-transparent hover:bg-muted/50">
                      <RadioGroupItem value={opt.value} id={`c5-${opt.value}`} />
                      <div className="flex-1">
                        <Label htmlFor={`c5-${opt.value}`} className="font-medium cursor-pointer">{opt.label}</Label>
                        <p className="text-sm text-muted-foreground mt-1">{opt.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>

            {/* Total Score Display */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Cəmi bal:</span>
                <span className="text-2xl font-bold text-primary">{totalScore} / 27</span>
              </div>
            </div>

            {/* Zero Warning */}
            {showZeroWarning && (
              <Alert className="border-red-300 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Xəbərdarlıq:</strong> 0 bal seçdiyiniz halda ekspertiza dayandırılacaq. Zəhmət olmasa yazılı əsaslandırma təqdim edin.
                </AlertDescription>
              </Alert>
            )}
            {showZeroWarning && (
              <div>
                <Label className="text-sm font-medium">Yazılı əsaslandırma *</Label>
                <Textarea
                  value={zeroJustification}
                  onChange={(e) => setZeroJustification(e.target.value)}
                  placeholder="0 bal vermənizin səbəbini ətraflı izah edin..."
                  className="mt-1 min-h-[100px]"
                />
              </div>
            )}
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Layihənin yekun qiymətləndirilmə şkalası</h3>
              <p className="text-muted-foreground">Meyarlar üzrə cəmi bal: <strong>{totalScore}</strong></p>
            </div>

            <RadioGroup value={finalScale} onValueChange={setFinalScale} className="space-y-3">
              {FINAL_SCALE.map((item) => (
                <div key={item.value} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50">
                  <RadioGroupItem value={item.value} id={`scale-${item.value}`} />
                  <div className="flex-1">
                    <Label htmlFor={`scale-${item.value}`} className="font-medium cursor-pointer">{item.label}</Label>
                    <p className="text-sm text-muted-foreground">{item.range}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Ekspertin yazılı rəyi</h3>
            </div>

            <div>
              <Label className="text-sm font-medium">Yazılı rəy *</Label>
              <Textarea
                value={writtenReview}
                onChange={(e) => setWrittenReview(e.target.value)}
                placeholder="Rəyinizi buraya yazın..."
                className="mt-1 min-h-[200px] font-sans text-sm"
                style={{ fontFamily: "Arial", fontSize: "12pt", lineHeight: "1" }}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Yazılı rəy elmi üslubda, aydın tərzdə, obyektivlik və etik qaydalar gözlənilməklə tərtib olunmalıdır, 12 ölçülü, Arial şrifti ilə, 1 intervalla yazılmalıdır.
              </p>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-3">Qərar *</h4>
              <RadioGroup value={reviewDecision} onValueChange={setReviewDecision} className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-transparent hover:bg-muted/50">
                  <RadioGroupItem value="supported" id="decision-supported" />
                  <Label htmlFor="decision-supported" className="cursor-pointer">Layihə dəstəklənə bilər</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-transparent hover:bg-muted/50">
                  <RadioGroupItem value="not-supported" id="decision-not-supported" />
                  <Label htmlFor="decision-not-supported" className="cursor-pointer">Layihə dəstəklənməyə layiq deyildir</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Ekspertin şəxsi məlumatları</h3>
              <p className="text-sm text-muted-foreground">Bank məlumatlarınızı daxil edin</p>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-3">VÖEN statusu *</h4>
              <RadioGroup value={hasVoen} onValueChange={setHasVoen} className="space-y-3">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="yes" id="voen-yes" />
                  <Label htmlFor="voen-yes" className="cursor-pointer">VÖEN var</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="no" id="voen-no" />
                  <Label htmlFor="voen-no" className="cursor-pointer">VÖEN yoxdur</Label>
                </div>
              </RadioGroup>
            </div>

            {hasVoen && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hasVoen === "yes" && (
                  <div>
                    <Label className="text-sm font-medium">VÖEN nömrəsi *</Label>
                    <Input
                      value={voenNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 10)
                        setVoenNumber(val)
                      }}
                      placeholder="10 rəqəm"
                      className="mt-1"
                      maxLength={10}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Yalnız rəqəm, 10 simvol</p>
                  </div>
                )}
                <div>
                  <Label className="text-sm font-medium">Bankın adı *</Label>
                  <Input
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="Bank adı"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Bankın VÖEN-i *</Label>
                  <Input
                    value={bankVoen}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 10)
                      setBankVoen(val)
                    }}
                    placeholder="10 rəqəm"
                    className="mt-1"
                    maxLength={10}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">M/h *</Label>
                  <Input
                    value={mh}
                    onChange={(e) => setMh(e.target.value)}
                    placeholder="M/h"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">H/h *</Label>
                  <Input
                    value={hh}
                    onChange={(e) => setHh(e.target.value)}
                    placeholder="H/h"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Bankın kodu *</Label>
                  <Input
                    value={bankCode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 6)
                      setBankCode(val)
                    }}
                    placeholder="4-6 rəqəm"
                    className="mt-1"
                    maxLength={6}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">SWIFT *</Label>
                  <Input
                    value={swift}
                    onChange={(e) => {
                      const val = e.target.value.toUpperCase().slice(0, 11)
                      setSwift(val)
                    }}
                    placeholder="8-11 simvol"
                    className="mt-1"
                    maxLength={11}
                  />
                </div>
                {hasVoen === "no" && (
                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium">Kart hesab nömrəsi *</Label>
                    <Input
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Kart nömrəsi"
                      className="mt-1"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Back + Title */}
      <div className="flex items-start gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/expert/dashboard")}
          className="mt-1 p-1.5"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Layihələrin siyahısı</h1>
          <p className="text-muted-foreground mt-0.5">{competitionName}</p>
        </div>
      </div>

      {/* Success Alert */}
      {submitted && (
        <Alert className="bg-green-50 border-green-200 text-green-800">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="font-medium">
            Seçimləriniz uğurla göndərildi! Ana səhifəyə yönləndirilirsiniz...
          </AlertDescription>
        </Alert>
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Açar sözə görə axtarın..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Layihələr</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Seçim</TableHead>
                  <TableHead>Layihənin adı</TableHead>
                  <TableHead className="max-w-[300px]">Layihənin annotasiyası</TableHead>
                  <TableHead>Elm sahəsi</TableHead>
                  <TableHead>Seçim tarixi</TableHead>
                  <TableHead className="text-center">Əməliyyat</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((project) => {
                  const isSelected = selectedIds.has(project.id)
                  const isExpanded = expandedAnnotations.has(project.id)
                  return (
                    <TableRow key={project.id} className={isSelected ? "bg-primary/5" : undefined}>
                      <TableCell>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelect(project.id)}
                          disabled={submitted}
                        />
                      </TableCell>
                      <TableCell className="font-medium max-w-[250px]">
                        <span className="line-clamp-2">{project.name}</span>
                      </TableCell>
                      <TableCell className="max-w-[300px]">
                        <div>
                          <p className={isExpanded ? "" : "line-clamp-2"}>
                            {project.annotation}
                          </p>
                          {project.annotation.length > 100 && (
                            <button
                              onClick={() => toggleAnnotation(project.id)}
                              className="text-primary text-sm hover:underline mt-1"
                            >
                              {isExpanded ? "Gizlə" : "Daha çox"}
                            </button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getFieldBadge(project.field)}</TableCell>
                      <TableCell>
                        {selectionDates[project.id] || "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openProjectDetails(project)}
                          disabled={submitted}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Seçim edin
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      {selectedIds.size > 0 && !submitted && (
        <div className="flex justify-end">
          <Button onClick={() => setConfirmOpen(true)} className="bg-primary text-primary-foreground">
            Seçimləri təsdiqlə ({selectedIds.size} layihə)
          </Button>
        </div>
      )}

      {/* Project Details Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Qiymətləndiriləcək layihə</DialogTitle>
            <DialogDescription>Layihənin tam məlumatlarını nəzərdən keçirin</DialogDescription>
          </DialogHeader>
          {selectedProject && (
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="space-y-4">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium bg-muted/50 w-1/3">Layihənin adı</TableCell>
                      <TableCell>{selectedProject.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium bg-muted/50">Elm sahəsi</TableCell>
                      <TableCell>{selectedProject.field}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium bg-muted/50">Elmi istiqamət</TableCell>
                      <TableCell>{selectedProject.scientificDirection}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium bg-muted/50">Layihənin növü</TableCell>
                      <TableCell>{selectedProject.projectType}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium bg-muted/50">Ərizəçi statusu</TableCell>
                      <TableCell>{selectedProject.applicantStatus}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium bg-muted/50">Kateqoriya</TableCell>
                      <TableCell>{selectedProject.category}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium bg-muted/50">Xarakter</TableCell>
                      <TableCell>{selectedProject.character}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium bg-muted/50">İştirakçılar</TableCell>
                      <TableCell>
                        Ümumi: {selectedProject.participants.total} | 
                        Elmi dərəcəli: {selectedProject.participants.withDegree} | 
                        Elmi adlı: {selectedProject.participants.withTitle} | 
                        Gənc: {selectedProject.participants.young} | 
                        Qadın: {selectedProject.participants.female}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium bg-muted/50">İcra müddəti</TableCell>
                      <TableCell>{selectedProject.duration} ay</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium bg-muted/50">Smeta dəyəri</TableCell>
                      <TableCell>{selectedProject.estimatedCost.toLocaleString()} AZN</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium bg-muted/50">Annotasiya</TableCell>
                      <TableCell>{selectedProject.annotation}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium bg-muted/50">Məqsəd</TableCell>
                      <TableCell>{selectedProject.objectives}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium bg-muted/50">Açar sözlər</TableCell>
                      <TableCell>{selectedProject.keywords}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium bg-muted/50">Elmi icmal</TableCell>
                      <TableCell>{selectedProject.scientificReview}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium bg-muted/50">Elmi ideya</TableCell>
                      <TableCell>{selectedProject.scientificIdea}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium bg-muted/50">Tədqiqat strukturu</TableCell>
                      <TableCell className="whitespace-pre-line">{selectedProject.researchStructure}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium bg-muted/50">Gözlənilən nəticələr</TableCell>
                      <TableCell className="whitespace-pre-line">{selectedProject.expectedResults}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium bg-muted/50">Tətbiq sahələri</TableCell>
                      <TableCell>{selectedProject.applicationAreas}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium bg-muted/50">Avadanlıq</TableCell>
                      <TableCell>{selectedProject.equipment}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium bg-muted/50">Büdcə bölgüsü</TableCell>
                      <TableCell>
                        {selectedProject.budgetBreakdown.map((b, i) => (
                          <div key={i}>{b.role}: {b.amount.toLocaleString()} AZN</div>
                        ))}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailOpen(false)}>Bağla</Button>
            <Button onClick={openWizard} className="bg-primary text-primary-foreground">
              <Star className="h-4 w-4 mr-2" />
              Qiymətləndir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Evaluation Wizard Dialog */}
      <Dialog open={wizardOpen} onOpenChange={(open) => { if (!open) { setWizardOpen(false); resetWizard(); } }}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Ekspert rəyi - {WIZARD_STEPS[wizardStep - 1]?.title}</DialogTitle>
            <DialogDescription>{WIZARD_STEPS[wizardStep - 1]?.subtitle}</DialogDescription>
          </DialogHeader>

          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-6">
            {WIZARD_STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  wizardStep > step.id ? "bg-green-500 text-white" :
                  wizardStep === step.id ? "bg-primary text-primary-foreground" :
                  "bg-muted text-muted-foreground"
                )}>
                  {wizardStep > step.id ? <CheckCircle2 className="h-5 w-5" /> : step.id}
                </div>
                {index < WIZARD_STEPS.length - 1 && (
                  <div className={cn(
                    "w-12 md:w-24 h-1 mx-2",
                    wizardStep > step.id ? "bg-green-500" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>

          <ScrollArea className="max-h-[55vh] pr-4">
            {renderWizardContent()}
          </ScrollArea>

          <DialogFooter className="flex justify-between">
            <div>
              {wizardStep > 1 && (
                <Button variant="outline" disabled>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Geri qayıt
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => { setWizardOpen(false); resetWizard(); }}>Ləğv et</Button>
              {wizardStep < 4 ? (
                <Button 
                  onClick={handleNextStep}
                  disabled={
                    (wizardStep === 1 && !isStep1Valid()) ||
                    (wizardStep === 2 && !isStep2Valid()) ||
                    (wizardStep === 3 && !isStep3Valid())
                  }
                >
                  Davam et
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button 
                  onClick={handleFinish}
                  disabled={!isStep4Valid()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Tamamla
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Signature Dialog */}
      <Dialog open={signatureDialogOpen} onOpenChange={setSignatureDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ekspert rəyinin imzalanması</DialogTitle>
            <DialogDescription>
              Rəyi imzalamaq üçün üsul seçin
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <RadioGroup value={signatureMethod} onValueChange={setSignatureMethod} className="space-y-3">
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50">
                <RadioGroupItem value="sima" id="sig-sima" />
                <Label htmlFor="sig-sima" className="cursor-pointer font-medium">SİMA ilə imzala</Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50">
                <RadioGroupItem value="asan" id="sig-asan" />
                <Label htmlFor="sig-asan" className="cursor-pointer font-medium">ASAN imza ilə imzala</Label>
              </div>
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSignatureDialogOpen(false)}>Ləğv et</Button>
            <Button onClick={handleSignatureSubmit} disabled={!signatureMethod} className="bg-green-600 hover:bg-green-700">
              İmzala və göndər
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Submit Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Seçimləri təsdiqlə</DialogTitle>
            <DialogDescription>
              {selectedIds.size} layihə seçdiniz. Təsdiqləmək istədiyinizə əminsiniz?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Ləğv et</Button>
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">Təsdiqlə</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
