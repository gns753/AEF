"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Eye, FileText, Users } from "lucide-react"

const competitionNames: Record<string, string> = {
  "1": "Gənc alimlər üçün qrant müsabiqəsi",
  "2": "İnnovasiya layihələri müsabiqəsi",
  "3": "Fundamental tədqiqatlar proqramı",
}

const applications = [
  {
    id: 1,
    leader: "Prof. Rauf Əliyev",
    project: "Süni intellekt vasitəsilə xərçəng diaqnostikası",
    signDate: "15.02.2025",
  },
  {
    id: 2,
    leader: "Dr. Nigar Hüseynova",
    project: "Yeni nəsil batareya texnologiyaları",
    signDate: "16.02.2025",
  },
  {
    id: 3,
    leader: "Dr. Elnur Babayev",
    project: "Kənd təsərrüfatında IoT tətbiqləri",
    signDate: "17.02.2025",
  },
]

// Documents mock data
const documentsData: Record<number, { name: string; signer: string; format: string; date: string }[]> = {
  1: [
    { name: "Layihə müqaviləsi", signer: "Rauf Əliyev", format: "PDF", date: "15.02.2025" },
    { name: "Smeta cədvəli", signer: "Sevinc Quliyeva", format: "XLSX", date: "16.02.2025" },
    { name: "Ərizə forması", signer: "Rauf Əliyev", format: "PDF", date: "14.02.2025" },
  ],
  2: [
    { name: "Layihə müqaviləsi", signer: "Nigar Hüseynova", format: "PDF", date: "16.02.2025" },
    { name: "Büdcə hesabatı", signer: "Sevinc Quliyeva", format: "XLSX", date: "17.02.2025" },
  ],
  3: [
    { name: "Layihə müqaviləsi", signer: "Elnur Babayev", format: "PDF", date: "17.02.2025" },
    { name: "Texniki tapşırıq", signer: "Elnur Babayev", format: "DOCX", date: "16.02.2025" },
  ],
}

// Participants mock data
const participantsData: Record<number, { surname: string; name: string; role: string }[]> = {
  1: [
    { surname: "Əliyev", name: "Rauf", role: "Layihə rəhbəri" },
    { surname: "Nəsirli", name: "Aytən", role: "Tədqiqatçı" },
    { surname: "Rüstəmov", name: "Kamran", role: "Laborant" },
  ],
  2: [
    { surname: "Hüseynova", name: "Nigar", role: "Layihə rəhbəri" },
    { surname: "Məmmədli", name: "Tural", role: "Tədqiqatçı" },
  ],
  3: [
    { surname: "Babayev", name: "Elnur", role: "Layihə rəhbəri" },
    { surname: "Qasımova", name: "Ləman", role: "Tədqiqatçı" },
    { surname: "İsmayılov", name: "Orxan", role: "Mühəndis" },
  ],
}

// Participant profile mock
const profileData: Record<string, {
  name: string; surname: string; fatherName: string; birthDate: string; gender: string;
  fin: string; citizenship: string; education: { institution: string; specialty: string; year: string }[];
  experience: { org: string; position: string; start: string; end: string }[];
  degree: string; title: string; works: number;
}> = {
  "Əliyev-Rauf": {
    name: "Rauf", surname: "Əliyev", fatherName: "Əli oğlu", birthDate: "15.05.1975",
    gender: "Kişi", fin: "AA1234567", citizenship: "Azərbaycan",
    education: [{ institution: "Bakı Dövlət Universiteti", specialty: "Biologiya", year: "1997" }],
    experience: [{ org: "AMEA", position: "Professor", start: "2010", end: "indiyə qədər" }],
    degree: "Biologiya üzrə elmlər doktoru", title: "Professor", works: 47,
  },
  "Nəsirli-Aytən": {
    name: "Aytən", surname: "Nəsirli", fatherName: "Faiq qızı", birthDate: "22.09.1990",
    gender: "Qadın", fin: "BB9876543", citizenship: "Azərbaycan",
    education: [{ institution: "Bakı Dövlət Universiteti", specialty: "Biokimya", year: "2012" }],
    experience: [{ org: "AMEA", position: "Tədqiqatçı", start: "2013", end: "indiyə qədər" }],
    degree: "Biologiya üzrə fəlsəfə doktoru", title: "Dosent", works: 18,
  },
  "Rüstəmov-Kamran": {
    name: "Kamran", surname: "Rüstəmov", fatherName: "Rüstəm oğlu", birthDate: "03.12.1995",
    gender: "Kişi", fin: "CC5551234", citizenship: "Azərbaycan",
    education: [{ institution: "Azərbaycan Texniki Universiteti", specialty: "Laboratoriya texnikası", year: "2017" }],
    experience: [{ org: "AMEA", position: "Laborant", start: "2018", end: "indiyə qədər" }],
    degree: "—", title: "—", works: 5,
  },
}

function getFormatBadge(format: string) {
  switch (format) {
    case "PDF":
      return <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100">{format}</Badge>
    case "XLSX":
      return <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">{format}</Badge>
    case "DOCX":
      return <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">{format}</Badge>
    default:
      return <Badge variant="secondary">{format}</Badge>
  }
}

export default function ApplicationsPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const competitionName = competitionNames[id] || "Müsabiqə"

  const [docsOpen, setDocsOpen] = useState(false)
  const [docsProjectId, setDocsProjectId] = useState<number>(0)
  const [participantsOpen, setParticipantsOpen] = useState(false)
  const [participantsProjectId, setParticipantsProjectId] = useState<number>(0)
  const [profileOpen, setProfileOpen] = useState(false)
  const [profileKey, setProfileKey] = useState("")
  const [profileTab, setProfileTab] = useState<"personal" | "education" | "experience" | "science">("personal")

  const openDocs = (projectId: number) => {
    setDocsProjectId(projectId)
    setDocsOpen(true)
  }

  const openParticipants = (projectId: number) => {
    setParticipantsProjectId(projectId)
    setParticipantsOpen(true)
  }

  const openProfile = (surname: string, name: string) => {
    setProfileKey(`${surname}-${name}`)
    setProfileTab("personal")
    setParticipantsOpen(false)
    setProfileOpen(true)
  }

  const backToParticipants = () => {
    setProfileOpen(false)
    setParticipantsOpen(true)
  }

  const profile = profileData[profileKey]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.push("/admin/dashboard")} className="mt-1 p-1.5">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <p className="text-sm text-muted-foreground">Müsabiqələrə qayıt</p>
          <h1 className="text-2xl font-bold text-foreground">Müraciətlər — {competitionName}</h1>
        </div>
      </div>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Müraciətlər</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Layihə rəhbərinin adı</TableHead>
                  <TableHead>Layihənin adı</TableHead>
                  <TableHead>İmzalama tarixi</TableHead>
                  <TableHead className="text-right">Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.leader}</TableCell>
                    <TableCell className="text-foreground">{app.project}</TableCell>
                    <TableCell className="text-muted-foreground">{app.signDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <a href={`/admin/competitions/${id}/project/${app.id}`}>
                            <Eye className="h-3.5 w-3.5 mr-1.5" />
                            Baxış
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => openDocs(app.id)}>
                          <FileText className="h-3.5 w-3.5 mr-1.5" />
                          Sənədlər
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => openParticipants(app.id)}>
                          <Users className="h-3.5 w-3.5 mr-1.5" />
                          İştirakçılar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="p-4 border rounded-lg space-y-3">
                <p className="font-medium text-sm">{app.leader}</p>
                <p className="text-sm text-foreground">{app.project}</p>
                <p className="text-xs text-muted-foreground">İmzalama: {app.signDate}</p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" className="text-xs" asChild>
                    <a href={`/admin/competitions/${id}/project/${app.id}`}>
                      <Eye className="h-3 w-3 mr-1" />Baxış
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs" onClick={() => openDocs(app.id)}>
                    <FileText className="h-3 w-3 mr-1" />Sənədlər
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs" onClick={() => openParticipants(app.id)}>
                    <Users className="h-3 w-3 mr-1" />İştirakçılar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documents Modal */}
      <Dialog open={docsOpen} onOpenChange={setDocsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Layihəyə aid sənədlər</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sənədin adı</TableHead>
                <TableHead>İmzalayan</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Tarix</TableHead>
                <TableHead className="text-right">Əməliyyat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(documentsData[docsProjectId] || []).map((doc, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell className="text-muted-foreground">{doc.signer}</TableCell>
                  <TableCell>{getFormatBadge(doc.format)}</TableCell>
                  <TableCell className="text-muted-foreground">{doc.date}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => alert(`Sənəd yüklənir: ${doc.name}`)}
                    >
                      Sənədə baxış
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end pt-2">
            <Button variant="outline" onClick={() => setDocsOpen(false)}>Bağla</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Participants Modal */}
      <Dialog open={participantsOpen} onOpenChange={setParticipantsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Layihə iştirakçıları</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Soyadı</TableHead>
                <TableHead>Adı</TableHead>
                <TableHead>Rolu</TableHead>
                <TableHead className="text-right">Əməliyyat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(participantsData[participantsProjectId] || []).map((p, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{p.surname}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">{p.role}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" onClick={() => openProfile(p.surname, p.name)}>
                      Baxış
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end pt-2">
            <Button variant="outline" onClick={() => setParticipantsOpen(false)}>Bağla</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Participant Profile Modal */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>İştirakçının məlumatları — {profile ? `${profile.name} ${profile.surname}` : ""}</DialogTitle>
              <Button size="sm" variant="outline" onClick={() => alert("Məlumatlar endirilir...")}>
                Məlumatları endir
              </Button>
            </div>
          </DialogHeader>

          {profile && (
            <div className="space-y-4">
              {/* Tabs */}
              <div className="flex gap-1 border-b">
                {[
                  { key: "personal", label: "Şəxsi məlumatlar" },
                  { key: "education", label: "Təhsil" },
                  { key: "experience", label: "İş təcrübəsi" },
                  { key: "science", label: "Elmi fəaliyyət" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setProfileTab(tab.key as typeof profileTab)}
                    className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
                      profileTab === tab.key
                        ? "border-emerald-600 text-emerald-700"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {profileTab === "personal" && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">Ad:</span> <span className="font-medium ml-2">{profile.name}</span></div>
                  <div><span className="text-muted-foreground">Soyad:</span> <span className="font-medium ml-2">{profile.surname}</span></div>
                  <div><span className="text-muted-foreground">Ata adı:</span> <span className="font-medium ml-2">{profile.fatherName}</span></div>
                  <div><span className="text-muted-foreground">Doğum tarixi:</span> <span className="font-medium ml-2">{profile.birthDate}</span></div>
                  <div><span className="text-muted-foreground">Cinsiyyət:</span> <span className="font-medium ml-2">{profile.gender}</span></div>
                  <div><span className="text-muted-foreground">FİN:</span> <span className="font-medium ml-2">{profile.fin}</span></div>
                  <div><span className="text-muted-foreground">Vətəndaşlıq:</span> <span className="font-medium ml-2">{profile.citizenship}</span></div>
                </div>
              )}

              {profileTab === "education" && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Təhsil müəssisəsi</TableHead>
                      <TableHead>İxtisas</TableHead>
                      <TableHead>İl</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profile.education.map((ed, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{ed.institution}</TableCell>
                        <TableCell>{ed.specialty}</TableCell>
                        <TableCell>{ed.year}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {profileTab === "experience" && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Təşkilat</TableHead>
                      <TableHead>Vəzifə</TableHead>
                      <TableHead>Başlama</TableHead>
                      <TableHead>Bitmə</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profile.experience.map((ex, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{ex.org}</TableCell>
                        <TableCell>{ex.position}</TableCell>
                        <TableCell>{ex.start}</TableCell>
                        <TableCell>{ex.end}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {profileTab === "science" && (
                <div className="space-y-3 text-sm">
                  <div><span className="text-muted-foreground">Elmi dərəcə:</span> <span className="font-medium ml-2">{profile.degree}</span></div>
                  <div><span className="text-muted-foreground">Elmi ad:</span> <span className="font-medium ml-2">{profile.title}</span></div>
                  <div><span className="text-muted-foreground">Əsərlərin sayı:</span> <span className="font-medium ml-2">{profile.works}</span></div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={backToParticipants}>
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              İştirakçılara qayıt
            </Button>
            <Button variant="outline" onClick={() => setProfileOpen(false)}>Bağla</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
