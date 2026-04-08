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
import { Search, ArrowLeft, CheckCircle2, Eye, FileText, Star } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const competitionNames: Record<string, string> = {
  "1": "Gənc alimlər üçün qrant müsabiqəsi",
  "2": "İnnovasiya layihələri müsabiqəsi",
  "3": "Beynəlxalq elmi əməkdaşlıq proqramı",
  "4": "Tibbi tədqiqatlar üzrə qrant müsabiqəsi",
}

interface ProjectDetails {
  id: number
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
    objectives: "Layihənin əsas məqsədi neyroşəbəkələrdə dərin öyrənmə alqoritmlərinin performansını 30% artırmaq, emal vaxtını azaltmaq və enerji səmərəliliyini yaxşılaşdırmaqdır. Tədqiqat müasir GPU arxitekturalarında paralel hesablama imkanlarından istifadə edərək optimallaşdırma metodlarını araşdıracaq.",
    keywords: "neyroşəbəkə; dərin öyrənmə; optimallaşdırma; GPU; paralel hesablama; süni intellekt",
    scientificReview: "Son illərdə dərin öyrənmə sahəsində əhəmiyyətli irəliləyişlər əldə edilmişdir. Transformer arxitekturaları, böyük dil modelləri və diffuziya modelləri kimi yeniliklər sahəni inqilab etmişdir. Lakin bu modellərin hesablama tələbləri eksponensial olaraq artır.",
    scientificIdea: "Layihənin elmi ideyası adaptiv öyrənmə sürəti və dinamik batch ölçüsü istifadə edərək gradient descent optimallaşdırmasını təkmilləşdirməkdir. Bu yanaşma mövcud metodlardan fərqli olaraq real-vaxt rejimində hiperparametr tənzimləməsini təmin edəcək.",
    researchStructure: "Mərhələ 1: Mövcud alqoritmlərin analizi (6 ay)\nMərhələ 2: Yeni optimallaşdırma metodunun işlənməsi (8 ay)\nMərhələ 3: Eksperimental sınaqlar və validasiya (6 ay)\nMərhələ 4: Nəticələrin ümumiləşdirilməsi və yayılması (4 ay)",
    expectedResults: "1. Ən azı 2 impakt faktorlu jurnalda elmi məqalə\n2. Açıq mənbəli proqram kitabxanası\n3. 1 patent ərizəsi\n4. 2 beynəlxalq konfransda məruzə",
    applicationAreas: "Tədqiqat nəticələri tibbi görüntü analizi, avtomatik sürücüsüz avtomobillər, maliyyə proqnozlaşdırması və təbii dil emalı sahələrində tətbiq oluna bilər.",
    equipment: "Mövcud: NVIDIA RTX 3090 GPU (2 ədəd), Intel Xeon server\nLazım olan: NVIDIA A100 GPU (2 ədəd) - böyük miqyaslı eksperimentlər üçün zəruridir",
    budgetExplanation: "Büdcənin 45%-i avadanlıq alınmasına, 35%-i işçi heyətinin əmək haqqına, 15%-i ezamiyyət və konfrans xərclərinə, 5%-i nəşr və patent xərclərinə ayrılır.",
    budgetBreakdown: [
      { role: "Layihə rəhbəri", amount: 15000 },
      { role: "Baş tədqiqatçı", amount: 12000 },
      { role: "Tədqiqatçı (2 nəfər)", amount: 18000 },
      { role: "Doktorant", amount: 8000 },
    ],
  },
  {
    id: 2,
    name: "Azərbaycanın endemik bitki növlərinin genomik analizi",
    annotation:
      "Layihə çərçivəsində Azərbaycanın endemik bitki növlərinin tam genomik ardıcıllığı müəyyən ediləcək və biomüxtəlifliyin qorunması üçün genetik verilənlər bazası yaradılacaq.",
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
    objectives: "Azərbaycanın 50+ endemik bitki növünün tam genom ardıcıllığını müəyyən etmək, filogenetik analizlər aparmaq və mühafizə strategiyaları üçün elmi əsas yaratmaq.",
    keywords: "endemik bitkilər; genomika; bioinformatika; biomüxtəliflik; Azərbaycan florası; mühafizə",
    scientificReview: "Azərbaycan florası 4500-dən çox bitki növünü əhatə edir ki, bunların 240-dan çoxu endemikdir. Bu növlərin genetik müxtəlifliyi və evolyusion tarixi hələ tam öyrənilməyib.",
    scientificIdea: "İlk dəfə olaraq müasir sekvensləşdirmə texnologiyalarından istifadə edərək Azərbaycan endemiklərinin tam genom ardıcıllığı əldə ediləcək və beynəlxalq genom verilənlər bazalarına inteqrasiya ediləcək.",
    researchStructure: "Mərhələ 1: Nümunə toplama ekspedisiyaları (8 ay)\nMərhələ 2: DNT ekstrakti və sekvensləşdirmə (12 ay)\nMərhələ 3: Bioinformatik analiz (10 ay)\nMərhələ 4: Verilənlər bazasının yaradılması (6 ay)",
    expectedResults: "1. 50+ növün tam genom ardıcıllığı\n2. Açıq genom verilənlər bazası\n3. 5 impakt faktorlu məqalə\n4. Mühafizə tövsiyələri sənədi",
    applicationAreas: "Kənd təsərrüfatı, dərman bitkiləri sənayesi, ekoloji mühafizə və turizm sektorunda tətbiq imkanları.",
    equipment: "Mövcud: Illumina MiSeq sekvenser, standart laboratoriya avadanlığı\nLazım olan: Oxford Nanopore sekvenser, yüksək performanslı hesablama serverləri",
    budgetExplanation: "Büdcənin 40%-i sekvensləşdirmə xərclərinə, 25%-i işçi heyətinə, 20%-i avadanlıq və reaktivlərə, 15%-i ekspedisiya və nəşr xərclərinə ayrılır.",
    budgetBreakdown: [
      { role: "Layihə rəhbəri", amount: 18000 },
      { role: "Baş tədqiqatçı (2 nəfər)", amount: 24000 },
      { role: "Tədqiqatçı (3 nəfər)", amount: 27000 },
      { role: "Laborant (2 nəfər)", amount: 12000 },
    ],
  },
  {
    id: 3,
    name: "Şəhər mühitində hava keyfiyyətinin monitorinqi üçün IoT sistemi",
    annotation:
      "Bu tədqiqat layihəsi Bakı şəhərində IoT sensorları vasitəsilə real vaxt rejimində hava keyfiyyətinin monitorinqi və proqnozlaşdırılması üçün ağıllı sistem yaratmağı hədəfləyir.",
    field: "Mühəndislik",
    scientificDirection: "IoT və ətraf mühit monitorinqi",
    projectType: "Fərdi",
    applicantStatus: "Universitet",
    category: "Ölkədaxili",
    character: "Tətbiqi",
    duration: 18,
    estimatedCost: 65000,
    participants: {
      total: 4,
      withDegree: 1,
      withTitle: 1,
      young: 2,
      female: 1,
    },
    objectives: "Bakı şəhərinin 10 nöqtəsində IoT sensor şəbəkəsi qurmaq, real-vaxt verilənlər toplamaq və süni intellekt əsaslı proqnozlaşdırma sistemi yaratmaq.",
    keywords: "IoT; hava keyfiyyəti; sensor şəbəkəsi; süni intellekt; proqnozlaşdırma; smart city",
    scientificReview: "Şəhər hava çirklənməsi qlobal səhiyyə problemidir. IoT texnologiyaları bu sahədə inqilabi dəyişikliklər vəd edir.",
    scientificIdea: "Aşağı qiymətli, yüksək dəqiqlikli sensor şəbəkəsi ilə maşın öyrənməsi alqoritmlərinin inteqrasiyası vasitəsilə hava keyfiyyətinin 24-48 saat əvvəlcədən proqnozlaşdırılması.",
    researchStructure: "Mərhələ 1: Sensor seçimi və kalibrasiyası (4 ay)\nMərhələ 2: Şəbəkə qurulması (6 ay)\nMərhələ 3: Verilənlər toplama (4 ay)\nMərhələ 4: ML model inkişafı (4 ay)",
    expectedResults: "1. 10 nöqtəli sensor şəbəkəsi\n2. Real-vaxt izləmə platforması\n3. Proqnozlaşdırma modeli (85%+ dəqiqlik)\n4. 3 elmi məqalə",
    applicationAreas: "Bələdiyyə xidmətləri, səhiyyə, şəhər planlaşdırması və vətəndaş məlumatlandırılması.",
    equipment: "Mövcud: Prototip sensorlar, server infrastrukturu\nLazım olan: 30 ədəd PM2.5/PM10 sensoru, bulud hosting xərcləri",
    budgetExplanation: "Büdcənin 50%-i avadanlıq və sensorlara, 30%-i işçi heyətinə, 15%-i bulud xərclərinə, 5%-i nəşrlərə ayrılır.",
    budgetBreakdown: [
      { role: "Layihə rəhbəri", amount: 10000 },
      { role: "Mühəndis (2 nəfər)", amount: 14000 },
      { role: "Tələbə köməkçi", amount: 4000 },
    ],
  },
  {
    id: 4,
    name: "Orta əsr Azərbaycan ədəbiyyatında sufi motivlərinin tədqiqi",
    annotation:
      "XII-XVI əsrlər Azərbaycan ədəbiyyatında sufi düşüncəsinin poetik ifadəsini, rəmzləri və obrazlar sistemini araşdırmaq, müqayisəli ədəbiyyatşünaslıq metodları ilə təhlil etmək.",
    field: "Filologiya",
    scientificDirection: "Orta əsr ədəbiyyatı və sufi estetikası",
    projectType: "Fərdi",
    applicantStatus: "Universitet",
    category: "Ölkədaxili",
    character: "Fundamental",
    duration: 24,
    estimatedCost: 45000,
    participants: {
      total: 3,
      withDegree: 2,
      withTitle: 1,
      young: 1,
      female: 2,
    },
    objectives: "Nizami, Nəsimi, Füzuli kimi klassiklərin əsərlərində sufi rəmzlərini sistemləşdirmək, müqayisəli analiz aparmaq və müasir oxucu üçün şərhlər hazırlamaq.",
    keywords: "sufi ədəbiyyatı; orta əsrlər; Nizami; Nəsimi; Füzuli; poetik rəmzlər; müqayisəli ədəbiyyatşünaslıq",
    scientificReview: "Azərbaycan klassik ədəbiyyatı sufi düşüncəsinin zəngin ifadəsi ilə seçilir. Lakin bu mirasın sistemli tədqiqi hələ tamamlanmayıb.",
    scientificIdea: "Kompüter linqvistikası metodlarından istifadə edərək klassik mətnlərdə sufi terminologiyasının statistik analizini aparmaq və rəqəmsal annotasiya sistemi yaratmaq.",
    researchStructure: "Mərhələ 1: Mətnlərin rəqəmsallaşdırılması (6 ay)\nMərhələ 2: Terminoloji analiz (8 ay)\nMərhələ 3: Müqayisəli tədqiqat (6 ay)\nMərhələ 4: Monoqrafiya hazırlanması (4 ay)",
    expectedResults: "1. Sufi terminologiyası lüğəti\n2. Annotasiya edilmiş mətnlər bazası\n3. Monoqrafiya\n4. 4 elmi məqalə",
    applicationAreas: "Ədəbiyyat tədrisi, mədəniyyətşünaslıq, turizm və mədəni irs mühafizəsi.",
    equipment: "Mövcud: Kompüter avadanlığı, kitabxana resurları\nLazım olan: Rəqəmsallaşdırma avadanlığı, xarici mənbələrə çıxış",
    budgetExplanation: "Büdcənin 40%-i işçi heyətinə, 25%-i ezamiyyət və arxiv işinə, 20%-i nəşr xərclərinə, 15%-i avadanlıq və materiallara ayrılır.",
    budgetBreakdown: [
      { role: "Layihə rəhbəri", amount: 12000 },
      { role: "Baş tədqiqatçı", amount: 10000 },
      { role: "Doktorant", amount: 6000 },
    ],
  },
  {
    id: 5,
    name: "Ürək-damar xəstəliklərinin erkən diaqnostikası üçün biomarkerlər",
    annotation:
      "Layihə ürək-damar xəstəliklərinin erkən mərhələdə aşkarlanması üçün yeni biomarkerlərin identifikasiyasını, validasiyasını və klinik tətbiq imkanlarının araşdırılmasını nəzərdə tutur.",
    field: "Tibb",
    scientificDirection: "Kardiovaskulyar biomarkerlər",
    projectType: "Qrup",
    applicantStatus: "Tibb universiteti",
    category: "Ölkədaxili",
    character: "Tətbiqi",
    duration: 36,
    estimatedCost: 150000,
    participants: {
      total: 10,
      withDegree: 5,
      withTitle: 3,
      young: 4,
      female: 6,
    },
    objectives: "500+ xəstədə qan nümunəsi analizi aparmaq, potensial biomarkerləri identifikasiya etmək və klinik validasiya protokolu hazırlamaq.",
    keywords: "biomarker; ürək-damar xəstəlikləri; erkən diaqnostika; proteomika; klinik tədqiqat",
    scientificReview: "Ürək-damar xəstəlikləri Azərbaycanda ölüm səbəbləri arasında birinci yerdədir. Erkən diaqnostika xəstəliyin proqnozunu əhəmiyyətli dərəcədə yaxşılaşdıra bilər.",
    scientificIdea: "Proteomik və metabolomik yanaşmaların kombinasiyası ilə yüksək spesifiklik və həssaslığa malik biomarker panelinin yaradılması.",
    researchStructure: "Mərhələ 1: Xəstə qruplarının formalaşdırılması (6 ay)\nMərhələ 2: Nümunə toplama və analiz (12 ay)\nMərhələ 3: Biomarker identifikasiyası (10 ay)\nMərhələ 4: Klinik validasiya (8 ay)",
    expectedResults: "1. Yeni biomarker paneli\n2. Diaqnostik protokol\n3. 6 impakt faktorlu məqalə\n4. Patent ərizəsi",
    applicationAreas: "Klinik laboratoriyalar, ailə həkimliyi, profilaktik tibb və sığorta sektoru.",
    equipment: "Mövcud: Standart laboratoriya avadanlığı\nLazım olan: Mass-spektrometr, ELISA oxuyucu, kriogenik saxlama sistemi",
    budgetExplanation: "Büdcənin 35%-i avadanlıq və reaktivlərə, 30%-i işçi heyətinə, 20%-i xəstə kompensasiyasına, 15%-i nəşr və patent xərclərinə ayrılır.",
    budgetBreakdown: [
      { role: "Layihə rəhbəri (həkim-tədqiqatçı)", amount: 20000 },
      { role: "Baş tədqiqatçı (2 nəfər)", amount: 24000 },
      { role: "Tədqiqatçı (4 nəfər)", amount: 32000 },
      { role: "Laborant (3 nəfər)", amount: 18000 },
    ],
  },
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
  
  // Evaluation dialog state
  const [evaluationOpen, setEvaluationOpen] = useState(false)
  const [evaluationData, setEvaluationData] = useState({
    scientificValue: "",
    methodology: "",
    teamQualification: "",
    budgetAdequacy: "",
    overallScore: "",
    recommendation: "",
    comments: "",
  })

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

  const openEvaluation = () => {
    setDetailOpen(false)
    setEvaluationOpen(true)
  }

  const handleEvaluationSubmit = () => {
    // Mark project as evaluated
    if (selectedProject) {
      const next = new Set(selectedIds)
      const nextDates = { ...selectionDates }
      next.add(selectedProject.id)
      nextDates[selectedProject.id] = formatDate()
      setSelectedIds(next)
      setSelectionDates(nextDates)
    }
    setEvaluationOpen(false)
    setEvaluationData({
      scientificValue: "",
      methodology: "",
      teamQualification: "",
      budgetAdequacy: "",
      overallScore: "",
      recommendation: "",
      comments: "",
    })
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
          {/* Desktop Table */}
          <div className="hidden lg:block">
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
                  const annotationShort =
                    project.annotation.length > 120
                      ? project.annotation.slice(0, 120) + "..."
                      : project.annotation

                  return (
                    <TableRow
                      key={project.id}
                      className={`transition-colors ${
                        isSelected ? "bg-blue-50/60" : "hover:bg-muted/50"
                      }`}
                    >
                      <TableCell>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleSelect(project.id)}
                          disabled={submitted}
                        />
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {project.name}
                      </TableCell>
                      <TableCell className="max-w-[300px]">
                        <div className="text-sm text-muted-foreground">
                          {isExpanded ? project.annotation : annotationShort}
                        </div>
                        {project.annotation.length > 120 && (
                          <button
                            onClick={() => toggleAnnotation(project.id)}
                            className="text-xs text-blue-600 hover:underline mt-1"
                          >
                            {isExpanded ? "Gizlə" : "Ətraflı"}
                          </button>
                        )}
                      </TableCell>
                      <TableCell>{getFieldBadge(project.field)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {isSelected ? selectionDates[project.id] : "—"}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openProjectDetails(project)}
                          className="gap-1"
                        >
                          <Eye className="h-4 w-4" />
                          Seçim edin
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-3">
            {filtered.map((project) => {
              const isSelected = selectedIds.has(project.id)
              const isExpanded = expandedAnnotations.has(project.id)
              const annotationShort =
                project.annotation.length > 100
                  ? project.annotation.slice(0, 100) + "..."
                  : project.annotation

              return (
                <div
                  key={project.id}
                  className={`p-4 border rounded-lg space-y-3 transition-colors ${
                    isSelected ? "bg-blue-50/60 border-blue-200" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSelect(project.id)}
                      disabled={submitted}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <p className="font-medium text-sm text-foreground">{project.name}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {getFieldBadge(project.field)}
                        {isSelected && (
                          <span className="text-xs text-muted-foreground">
                            Seçim: {selectionDates[project.id]}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {isExpanded ? project.annotation : annotationShort}
                      </p>
                      {project.annotation.length > 100 && (
                        <button
                          onClick={() => toggleAnnotation(project.id)}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          {isExpanded ? "Gizlə" : "Ətraflı"}
                        </button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openProjectDetails(project)}
                        className="w-full mt-2 gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        Seçim edin
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nəticə tapılmadı.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white border rounded-lg">
        <p className="text-sm text-muted-foreground">
          Seçilmiş layihələr:{" "}
          <span className="font-bold text-foreground">{selectedIds.size}</span>
        </p>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => router.push("/expert/dashboard")}
            disabled={submitted}
          >
            Ləğv et
          </Button>
          <Button
            onClick={() => setConfirmOpen(true)}
            disabled={selectedIds.size === 0 || submitted}
          >
            {submitted ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Göndərildi
              </span>
            ) : (
              "Rəyi göndər"
            )}
          </Button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Seçimlərinizi təsdiqləyirsiniz?</DialogTitle>
            <DialogDescription>
              Siz{" "}
              <span className="font-semibold text-foreground">{selectedIds.size}</span>{" "}
              layihə seçmisiniz. Bu seçimlər Fond İnzibatçısına göndəriləcək.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Xeyr, qayıt
            </Button>
            <Button onClick={handleSubmit}>Bəli, göndər</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Project Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl">Qiymətləndiriləcək layihə</DialogTitle>
            <DialogDescription>
              Layihə məlumatları aşağıda əks olunur
            </DialogDescription>
          </DialogHeader>
          
          {selectedProject && (
            <ScrollArea className="max-h-[calc(90vh-180px)] px-6">
              <div className="space-y-6 pb-6">
                {/* Basic Info Table */}
                <div className="border rounded-lg overflow-hidden">
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
                        <TableCell className="font-medium bg-muted/50">Qrant ərizəçisinin statusu</TableCell>
                        <TableCell>{selectedProject.applicantStatus}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium bg-muted/50">Layihənin kateqoriyası</TableCell>
                        <TableCell>{selectedProject.category}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium bg-muted/50">Layihənin xarakteri</TableCell>
                        <TableCell>{selectedProject.character}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Participants Info */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 px-4 py-2 font-medium border-b">
                    Layihədə iştirak edən şəxslər
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-700">{selectedProject.participants.total}</div>
                        <div className="text-xs text-muted-foreground">Ümumi say</div>
                      </div>
                      <div className="text-center p-3 bg-emerald-50 rounded-lg">
                        <div className="text-2xl font-bold text-emerald-700">{selectedProject.participants.withDegree}</div>
                        <div className="text-xs text-muted-foreground">Elmi dərəcəsi olanlar</div>
                      </div>
                      <div className="text-center p-3 bg-violet-50 rounded-lg">
                        <div className="text-2xl font-bold text-violet-700">{selectedProject.participants.withTitle}</div>
                        <div className="text-xs text-muted-foreground">Elmi adı olanlar</div>
                      </div>
                      <div className="text-center p-3 bg-amber-50 rounded-lg">
                        <div className="text-2xl font-bold text-amber-700">{selectedProject.participants.young}</div>
                        <div className="text-xs text-muted-foreground">Gənc iştirakçılar</div>
                      </div>
                      <div className="text-center p-3 bg-rose-50 rounded-lg">
                        <div className="text-2xl font-bold text-rose-700">{selectedProject.participants.female}</div>
                        <div className="text-xs text-muted-foreground">Qadın iştirakçılar</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Duration and Cost */}
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium bg-muted/50 w-1/3">Layihənin icra müddəti</TableCell>
                        <TableCell>{selectedProject.duration} ay</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium bg-muted/50">Smeta dəyəri</TableCell>
                        <TableCell className="font-semibold">{selectedProject.estimatedCost.toLocaleString()} AZN</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Detailed Sections */}
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted/50 px-4 py-2 font-medium border-b">
                      Layihənin məqsədi, qarşıya qoyulan məsələləri, aktuallığı
                    </div>
                    <div className="p-4 text-sm text-muted-foreground whitespace-pre-line">
                      {selectedProject.objectives}
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted/50 px-4 py-2 font-medium border-b">
                      Layihənin annotasiyası
                    </div>
                    <div className="p-4 text-sm text-muted-foreground">
                      {selectedProject.annotation}
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted/50 px-4 py-2 font-medium border-b">
                      Açar sözlər
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.keywords.split(";").map((keyword, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {keyword.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted/50 px-4 py-2 font-medium border-b">
                      Layihənin elmi istiqaməti və qısa icmal
                    </div>
                    <div className="p-4 text-sm text-muted-foreground whitespace-pre-line">
                      {selectedProject.scientificReview}
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted/50 px-4 py-2 font-medium border-b">
                      Layihənin elmi ideyası
                    </div>
                    <div className="p-4 text-sm text-muted-foreground whitespace-pre-line">
                      {selectedProject.scientificIdea}
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted/50 px-4 py-2 font-medium border-b">
                      Layihə üzrə tədqiqatın strukturu
                    </div>
                    <div className="p-4 text-sm text-muted-foreground whitespace-pre-line">
                      {selectedProject.researchStructure}
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted/50 px-4 py-2 font-medium border-b">
                      Gözlənilən nəticələr
                    </div>
                    <div className="p-4 text-sm text-muted-foreground whitespace-pre-line">
                      {selectedProject.expectedResults}
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted/50 px-4 py-2 font-medium border-b">
                      Nəticələrin istifadəsi və tətbiqi sahələri
                    </div>
                    <div className="p-4 text-sm text-muted-foreground whitespace-pre-line">
                      {selectedProject.applicationAreas}
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted/50 px-4 py-2 font-medium border-b">
                      Avadanlıq, cihaz və qurğular haqqında məlumat
                    </div>
                    <div className="p-4 text-sm text-muted-foreground whitespace-pre-line">
                      {selectedProject.equipment}
                    </div>
                  </div>

                  {/* Budget Breakdown */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted/50 px-4 py-2 font-medium border-b">
                      Smeta xərclərinin açıqlaması
                    </div>
                    <div className="p-4 space-y-4">
                      <p className="text-sm text-muted-foreground">{selectedProject.budgetExplanation}</p>
                      <Separator />
                      <div className="text-sm font-medium mb-2">Əmək haqqı bölgüsü (adlar gizli):</div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Rol</TableHead>
                            <TableHead className="text-right">Məbləğ (AZN)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedProject.budgetBreakdown.map((item, idx) => (
                            <TableRow key={idx}>
                              <TableCell>{item.role}</TableCell>
                              <TableCell className="text-right font-medium">{item.amount.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow className="bg-muted/30">
                            <TableCell className="font-semibold">Cəmi</TableCell>
                            <TableCell className="text-right font-bold">
                              {selectedProject.budgetBreakdown.reduce((sum, item) => sum + item.amount, 0).toLocaleString()} AZN
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}

          <div className="p-6 pt-0 border-t bg-muted/30">
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDetailOpen(false)}>
                Bağla
              </Button>
              <Button onClick={openEvaluation} className="gap-2">
                <Star className="h-4 w-4" />
                Qiymətləndir
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Evaluation Dialog */}
      <Dialog open={evaluationOpen} onOpenChange={setEvaluationOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl">Ekspert rəyi</DialogTitle>
            <DialogDescription>
              {selectedProject?.name}
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[calc(90vh-180px)] px-6">
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>Elmi dəyər (1-10)</Label>
                <Select
                  value={evaluationData.scientificValue}
                  onValueChange={(val) => setEvaluationData({ ...evaluationData, scientificValue: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Bal seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Metodologiya (1-10)</Label>
                <Select
                  value={evaluationData.methodology}
                  onValueChange={(val) => setEvaluationData({ ...evaluationData, methodology: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Bal seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Komanda ixtisası (1-10)</Label>
                <Select
                  value={evaluationData.teamQualification}
                  onValueChange={(val) => setEvaluationData({ ...evaluationData, teamQualification: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Bal seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Büdcə adekvatlığı (1-10)</Label>
                <Select
                  value={evaluationData.budgetAdequacy}
                  onValueChange={(val) => setEvaluationData({ ...evaluationData, budgetAdequacy: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Bal seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Ümumi bal (1-100)</Label>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={evaluationData.overallScore}
                  onChange={(e) => setEvaluationData({ ...evaluationData, overallScore: e.target.value })}
                  placeholder="Ümumi balı daxil edin"
                />
              </div>

              <div className="space-y-2">
                <Label>Tövsiyə</Label>
                <Select
                  value={evaluationData.recommendation}
                  onValueChange={(val) => setEvaluationData({ ...evaluationData, recommendation: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tövsiyə seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approve">Maliyyələşdirilməsi tövsiyə olunur</SelectItem>
                    <SelectItem value="revise">Düzəlişlərlə maliyyələşdirilə bilər</SelectItem>
                    <SelectItem value="reject">Maliyyələşdirilməsi tövsiyə olunmur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Əlavə şərhlər</Label>
                <Textarea
                  value={evaluationData.comments}
                  onChange={(e) => setEvaluationData({ ...evaluationData, comments: e.target.value })}
                  placeholder="Layihə haqqında əlavə rəylərinizi yazın..."
                  rows={5}
                />
              </div>
            </div>
          </ScrollArea>

          <div className="p-6 pt-0 border-t bg-muted/30">
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setEvaluationOpen(false)}>
                Ləğv et
              </Button>
              <Button 
                onClick={handleEvaluationSubmit}
                disabled={!evaluationData.overallScore || !evaluationData.recommendation}
              >
                Rəyi göndər
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
