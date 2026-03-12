"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowLeft, FlaskConical, Calendar, User2, Receipt } from "lucide-react"

const projectDetails: Record<string, {
  name: string; goal: string; annotation: string; field: string;
  duration: string; startDate: string; endDate: string; organization: string;
  leader: string; position: string; degree: string; leaderOrg: string; email: string;
  budget: { item: string; amount: number }[];
}> = {
  "1": {
    name: "Süni intellekt vasitəsilə xərçəng diaqnostikası",
    goal: "Xərçəngin erkən diaqnostikası üçün AI əsaslı sistem yaratmaq",
    annotation: "Bu layihə dərin öyrənmə metodlarından istifadə edərək xərçəng hüceyrələrinin erkən mərhələdə aşkarlanması üçün yüksək dəqiqlikli diaqnostik sistem yaratmağı hədəfləyir. Sistem tibbi şəkil analizi, genomik verilənlər və klinik hesabatların inteqrasiyasını nəzərdə tutur.",
    field: "Tibb",
    duration: "24 ay", startDate: "01.06.2025", endDate: "01.06.2027",
    organization: "AMEA Biologiya İnstitutu",
    leader: "Prof. Rauf Əliyev", position: "Professor",
    degree: "Biologiya üzrə elmlər doktoru", leaderOrg: "AMEA Biologiya İnstitutu",
    email: "rauf.aliyev@amea.az",
    budget: [
      { item: "Avadanlıq", amount: 35000 },
      { item: "Ezamiyyət xərcləri", amount: 12000 },
      { item: "Əməkhaqqı", amount: 25000 },
      { item: "Digər", amount: 13000 },
    ],
  },
  "2": {
    name: "Yeni nəsil batareya texnologiyaları",
    goal: "Yüksək tutumlu və uzunömürlü batareya texnologiyasının yaradılması",
    annotation: "Litium-ion batareyalarının alternativləri olan yeni nəsil enerji saxlama texnologiyalarının tədqiqi və inkişaf etdirilməsi. Layihə çərçivəsində nanomateriallar əsaslı elektrod texnologiyaları araşdırılacaq.",
    field: "Texnika",
    duration: "18 ay", startDate: "01.07.2025", endDate: "01.01.2027",
    organization: "Bakı Dövlət Universiteti",
    leader: "Dr. Nigar Hüseynova", position: "Dosent",
    degree: "Kimya üzrə fəlsəfə doktoru", leaderOrg: "Bakı Dövlət Universiteti",
    email: "nigar.huseynova@bsu.az",
    budget: [
      { item: "Avadanlıq", amount: 40000 },
      { item: "Reagentlər", amount: 15000 },
      { item: "Əməkhaqqı", amount: 30000 },
      { item: "Digər", amount: 10000 },
    ],
  },
  "3": {
    name: "Kənd təsərrüfatında IoT tətbiqləri",
    goal: "Kənd təsərrüfatı sahəsində IoT əsaslı ağıllı monitorinq sisteminin yaradılması",
    annotation: "Bu layihə IoT sensorları və süni intellekt texnologiyalarından istifadə edərək əkin sahələrinin real vaxt rejimində monitorinqini və avtomatik suvarma sistemlərinin idarəetməsini nəzərdə tutur.",
    field: "Texnika",
    duration: "12 ay", startDate: "01.09.2025", endDate: "01.09.2026",
    organization: "Azərbaycan Texnologiya Universiteti",
    leader: "Dr. Elnur Babayev", position: "Baş elmi işçi",
    degree: "Texnika üzrə fəlsəfə doktoru", leaderOrg: "Azərbaycan Texnologiya Universiteti",
    email: "elnur.babayev@aztu.az",
    budget: [
      { item: "IoT avadanlığı", amount: 20000 },
      { item: "Proqram təminatı", amount: 8000 },
      { item: "Əməkhaqqı", amount: 18000 },
      { item: "Digər", amount: 9000 },
    ],
  },
}

export default function ProjectDetailPage() {
  const { id, projectId } = useParams<{ id: string; projectId: string }>()
  const router = useRouter()

  const project = projectDetails[projectId]

  if (!project) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="p-1.5">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Geri qayıt
        </Button>
        <p className="text-muted-foreground">Layihə tapılmadı.</p>
      </div>
    )
  }

  const totalBudget = project.budget.reduce((sum, b) => sum + b.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mt-1 p-1.5">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <p className="text-sm text-muted-foreground">Geri qayıt</p>
          <h1 className="text-2xl font-bold text-foreground">Layihənin məlumatları</h1>
        </div>
      </div>

      {/* Card 1: Main Info */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-emerald-600" />
            <CardTitle className="text-lg">Əsas məlumatlar</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="md:col-span-2">
              <span className="text-muted-foreground">Layihənin adı:</span>
              <p className="font-medium mt-0.5">{project.name}</p>
            </div>
            <div className="md:col-span-2">
              <span className="text-muted-foreground">Məqsəd:</span>
              <p className="font-medium mt-0.5">{project.goal}</p>
            </div>
            <div className="md:col-span-2">
              <span className="text-muted-foreground">Annotasiya:</span>
              <p className="font-medium mt-0.5 text-foreground">{project.annotation}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Elm sahəsi:</span>
              <div className="mt-1">
                <Badge variant="secondary">{project.field}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Execution Info */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">İcra məlumatları</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">İcra müddəti:</span>
              <p className="font-medium mt-0.5">{project.duration}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Başlama tarixi:</span>
              <p className="font-medium mt-0.5">{project.startDate}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Bitmə tarixi:</span>
              <p className="font-medium mt-0.5">{project.endDate}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Təşkilat:</span>
              <p className="font-medium mt-0.5">{project.organization}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Leader Info */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <User2 className="h-5 w-5 text-amber-600" />
            <CardTitle className="text-lg">Rəhbər haqqında</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Layihə rəhbəri:</span>
              <p className="font-medium mt-0.5">{project.leader}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Vəzifəsi:</span>
              <p className="font-medium mt-0.5">{project.position}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Elmi dərəcəsi:</span>
              <p className="font-medium mt-0.5">{project.degree}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Təşkilat:</span>
              <p className="font-medium mt-0.5">{project.leaderOrg}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Əlaqə:</span>
              <p className="font-medium mt-0.5 text-emerald-700">{project.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 4: Budget */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-violet-600" />
            <CardTitle className="text-lg">Smeta cədvəli</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Xərc maddəsi</TableHead>
                <TableHead className="text-right">Məbləğ (AZN)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {project.budget.map((b, i) => (
                <TableRow key={i}>
                  <TableCell>{b.item}</TableCell>
                  <TableCell className="text-right font-medium">
                    {b.amount.toLocaleString("az-AZ")}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50 font-bold">
                <TableCell>Cəmi</TableCell>
                <TableCell className="text-right">
                  {totalBudget.toLocaleString("az-AZ")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
