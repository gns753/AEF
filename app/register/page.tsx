"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload, X, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

export default function RegisterPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("address")
  const [wantsExpertRole, setWantsExpertRole] = useState(false)

  // Address fields
  const [actualCountry] = useState("Azərbaycan")
  const [actualCity, setActualCity] = useState("")
  const [actualStreet, setActualStreet] = useState("")
  const [actualBuilding, setActualBuilding] = useState("")
  const [actualApartment, setActualApartment] = useState("")
  const [actualPostalCode, setActualPostalCode] = useState("")

  const [registrationCountry] = useState("Azərbaycan")
  const [registrationCity, setRegistrationCity] = useState("")
  const [registrationStreet, setRegistrationStreet] = useState("")
  const [registrationBuilding, setRegistrationBuilding] = useState("")
  const [registrationApartment, setRegistrationApartment] = useState("")
  const [registrationPostalCode, setRegistrationPostalCode] = useState("")

  // Work info fields
  const [organizationCategory, setOrganizationCategory] = useState("")
  const [organizationName, setOrganizationName] = useState("")
  const [structureCategory, setStructureCategory] = useState("")
  const [structureName, setStructureName] = useState("")
  const [position, setPosition] = useState("")

  // Contact fields
  const [personalEmail, setPersonalEmail] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [workEmail, setWorkEmail] = useState("")
  const [workPhone, setWorkPhone] = useState("")
  const [homePhone, setHomePhone] = useState("")
  const [website, setWebsite] = useState("")

  // Education fields
  const [universityName, setUniversityName] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [educationLevel, setEducationLevel] = useState("")
  const [admissionYear, setAdmissionYear] = useState("")
  const [graduationYear, setGraduationYear] = useState("")
  const [hasHonorsDiploma, setHasHonorsDiploma] = useState(false)
  const [educationDiploma, setEducationDiploma] = useState<File | null>(null)

  // Scientific degree
  const [degreeType, setDegreeType] = useState("")
  const [degreeSpecCode, setDegreeSpecCode] = useState("")
  const [degreeSpecName, setDegreeSpecName] = useState("")
  const [degreeSeries, setDegreeSeries] = useState("")
  const [degreeNumber, setDegreeNumber] = useState("")
  const [degreeIssuedBy, setDegreeIssuedBy] = useState("")
  const [degreeIssuedDate, setDegreeIssuedDate] = useState("")
  const [degreeDiploma, setDegreeDiploma] = useState<File | null>(null)

  // EIF classification
  const [scienceField, setScienceField] = useState("")
  const [scienceDirection, setScienceDirection] = useState("")
  const [scienceSpecialization, setScienceSpecialization] = useState("")

  // Scientific title
  const [titleType, setTitleType] = useState("")
  const [titleSpecCode, setTitleSpecCode] = useState("")
  const [titleSpecName, setTitleSpecName] = useState("")
  const [titleSeries, setTitleSeries] = useState("")
  const [titleNumber, setTitleNumber] = useState("")
  const [titleIssuedBy, setTitleIssuedBy] = useState("")
  const [titleIssuedDate, setTitleIssuedDate] = useState("")
  const [titleDiploma, setTitleDiploma] = useState<File | null>(null)

  // Scientific interests (can have multiple)
  const [scientificInterests, setScientificInterests] = useState([
    { field: "", direction: "", subdirection: "" },
  ])

  // Publications
  const [azPublications, setAzPublications] = useState("")
  const [azImpactPublications, setAzImpactPublications] = useState("")
  const [azConferencePublications, setAzConferencePublications] = useState("")
  const [foreignPublications, setForeignPublications] = useState("")
  const [foreignImpactPublications, setForeignImpactPublications] = useState("")
  const [foreignConferencePublications, setForeignConferencePublications] = useState("")
  const [hIndex, setHIndex] = useState("")

  // Other competitions
  const [otherCompetitions, setOtherCompetitions] = useState([
    {
      organization: "",
      category: "",
      scienceField: "",
      competitionName: "",
      projectName: "",
      grantCode: "",
      duration: "",
      rating: "",
      status: "",
      startDate: "",
      endDate: "",
    },
  ])

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      setter(file)
    }
  }

  const handleAddScientificInterest = () => {
    setScientificInterests([...scientificInterests, { field: "", direction: "", subdirection: "" }])
  }

  const handleRemoveScientificInterest = (index: number) => {
    setScientificInterests(scientificInterests.filter((_, i) => i !== index))
  }

  const handleAddCompetition = () => {
    setOtherCompetitions([
      ...otherCompetitions,
      {
        organization: "",
        category: "",
        scienceField: "",
        competitionName: "",
        projectName: "",
        grantCode: "",
        duration: "",
        rating: "",
        status: "",
        startDate: "",
        endDate: "",
      },
    ])
  }

  const handleRemoveCompetition = (index: number) => {
    setOtherCompetitions(otherCompetitions.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle registration logic here
    console.log("[v0] Registration submitted")
    // Redirect after successful registration
    router.replace("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-4">
      <Card className="w-full max-w-5xl shadow-2xl border-0">
        <div className="bg-gradient-to-r from-blue-50/80 to-emerald-50/50 p-6 text-gray-800">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/login" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Link>
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="AEF" width={48} height={48} className="rounded-lg" />
              <div>
                <h1 className="text-2xl font-bold text-blue-600">Profil məlumatlarının tamamlanması</h1>
                <p className="text-sm text-gray-600">Zəhmət olmasa, bütün vacib məlumatları doldurun</p>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-6 gap-2">
                <TabsTrigger value="address">Ünvan</TabsTrigger>
                <TabsTrigger value="work">İş yeri</TabsTrigger>
                <TabsTrigger value="contact">Əlaqə</TabsTrigger>
                <TabsTrigger value="education">Təhsil</TabsTrigger>
                <TabsTrigger value="science">Elmi məlumatlar</TabsTrigger>
                <TabsTrigger value="publications">Nəşrlər</TabsTrigger>
              </TabsList>

              {/* Address Tab */}
              <TabsContent value="address" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Faktiki yaşayış ünvanı</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="actualCountry">
                        Ölkə <span className="text-red-500">*</span>
                      </Label>
                      <Input id="actualCountry" value={actualCountry} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="actualCity">
                        Şəhər/Rayon/Qəsəbə <span className="text-red-500">*</span>
                      </Label>
                      <Select value={actualCity} onValueChange={setActualCity}>
                        <SelectTrigger id="actualCity">
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="baku">Bakı</SelectItem>
                          <SelectItem value="ganja">Gəncə</SelectItem>
                          <SelectItem value="sumqayit">Sumqayıt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="actualStreet">
                        Prospekt/Küçə/Dalan <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="actualStreet"
                        value={actualStreet}
                        onChange={(e) => setActualStreet(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="actualBuilding">
                        Ev/Bina <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="actualBuilding"
                        value={actualBuilding}
                        onChange={(e) => setActualBuilding(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="actualApartment">Mənzil</Label>
                      <Input
                        id="actualApartment"
                        value={actualApartment}
                        onChange={(e) => setActualApartment(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="actualPostalCode">Poçt indeksi</Label>
                      <Input
                        id="actualPostalCode"
                        value={actualPostalCode}
                        onChange={(e) => setActualPostalCode(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Qeydiyyat ünvanı</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="registrationCountry">
                        Ölkə <span className="text-red-500">*</span>
                      </Label>
                      <Input id="registrationCountry" value={registrationCountry} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registrationCity">
                        Şəhər/Rayon/Qəsəbə <span className="text-red-500">*</span>
                      </Label>
                      <Select value={registrationCity} onValueChange={setRegistrationCity}>
                        <SelectTrigger id="registrationCity">
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="baku">Bakı</SelectItem>
                          <SelectItem value="ganja">Gəncə</SelectItem>
                          <SelectItem value="sumqayit">Sumqayıt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registrationStreet">
                        Prospekt/Küçə/Dalan <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="registrationStreet"
                        value={registrationStreet}
                        onChange={(e) => setRegistrationStreet(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registrationBuilding">
                        Ev/Bina <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="registrationBuilding"
                        value={registrationBuilding}
                        onChange={(e) => setRegistrationBuilding(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registrationApartment">Mənzil</Label>
                      <Input
                        id="registrationApartment"
                        value={registrationApartment}
                        onChange={(e) => setRegistrationApartment(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registrationPostalCode">Poçt indeksi</Label>
                      <Input
                        id="registrationPostalCode"
                        value={registrationPostalCode}
                        onChange={(e) => setRegistrationPostalCode(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="button" onClick={() => setActiveTab("work")}>
                    Növbəti
                  </Button>
                </div>
              </TabsContent>

              {/* Work Tab */}
              <TabsContent value="work" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">İş yeri məlumatları</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="organizationCategory">Qurumun kateqoriyası</Label>
                      <Select value={organizationCategory} onValueChange={setOrganizationCategory}>
                        <SelectTrigger id="organizationCategory">
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="state">Dövlət</SelectItem>
                          <SelectItem value="private">Özəl</SelectItem>
                          <SelectItem value="ngo">QHT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organizationName">Qurumun adı</Label>
                      <Select value={organizationName} onValueChange={setOrganizationName}>
                        <SelectTrigger id="organizationName">
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bdu">Bakı Dövlət Universiteti</SelectItem>
                          <SelectItem value="adau">Azərbaycan Dövlət Aqrar Universiteti</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="structureCategory">Struktur vahidinin kateqoriyası</Label>
                      <Select value={structureCategory} onValueChange={setStructureCategory}>
                        <SelectTrigger id="structureCategory">
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="department">Departament</SelectItem>
                          <SelectItem value="faculty">Fakültə</SelectItem>
                          <SelectItem value="laboratory">Laboratoriya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="structureName">Struktur vahidinin adı</Label>
                      <Input
                        id="structureName"
                        value={structureName}
                        onChange={(e) => setStructureName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Tutduğu vəzifə</Label>
                      <Input id="position" value={position} onChange={(e) => setPosition(e.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("address")}>
                    Geri
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("contact")}>
                    Növbəti
                  </Button>
                </div>
              </TabsContent>

              {/* Contact Tab */}
              <TabsContent value="contact" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Əlaqə vasitələri</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="personalEmail">
                        Şəxsi elektron poçt ünvanı <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="personalEmail"
                        type="email"
                        value={personalEmail}
                        onChange={(e) => setPersonalEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobileNumber">
                        Mobil nömrə <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="mobileNumber"
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="workEmail">Xidməti elektron poçt ünvanı</Label>
                      <Input
                        id="workEmail"
                        type="email"
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="workPhone">İş telefon nömrəsi</Label>
                      <Input
                        id="workPhone"
                        type="tel"
                        value={workPhone}
                        onChange={(e) => setWorkPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="homePhone">Ev telefon nömrəsi</Label>
                      <Input
                        id="homePhone"
                        type="tel"
                        value={homePhone}
                        onChange={(e) => setHomePhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Şəxsi veb-sayt</Label>
                      <Input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("work")}>
                    Geri
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("education")}>
                    Növbəti
                  </Button>
                </div>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Təhsil</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="universityName">Ali təhsil müəssisəsinin adı</Label>
                      <Select value={universityName} onValueChange={setUniversityName}>
                        <SelectTrigger id="universityName">
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bdu">Bakı Dövlət Universiteti</SelectItem>
                          <SelectItem value="adau">Azərbaycan Dövlət Aqrar Universiteti</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">İxtisaslaşma və ya istiqamətin adı</Label>
                      <Input
                        id="specialization"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="educationLevel">Təhsil səviyyəsi</Label>
                      <Select value={educationLevel} onValueChange={setEducationLevel}>
                        <SelectTrigger id="educationLevel">
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bachelor">Bakalavr</SelectItem>
                          <SelectItem value="master">Magistr</SelectItem>
                          <SelectItem value="phd">Doktorantura</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admissionYear">Daxil olduğu il</Label>
                      <Input
                        id="admissionYear"
                        value={admissionYear}
                        onChange={(e) => setAdmissionYear(e.target.value)}
                        placeholder="2020"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="graduationYear">Bitirdiyi il</Label>
                      <Input
                        id="graduationYear"
                        value={graduationYear}
                        onChange={(e) => setGraduationYear(e.target.value)}
                        placeholder="2024"
                      />
                    </div>
                    <div className="space-y-2 flex items-center gap-2 pt-8">
                      <Checkbox
                        id="hasHonorsDiploma"
                        checked={hasHonorsDiploma}
                        onCheckedChange={(checked) => setHasHonorsDiploma(checked as boolean)}
                      />
                      <Label htmlFor="hasHonorsDiploma" className="cursor-pointer">
                        Fərqlənmə diplomu
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="educationDiploma">Ali təhsil diplomunun surəti (JPG formatı)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="educationDiploma"
                        type="file"
                        accept="image/jpeg"
                        onChange={(e) => handleFileUpload(e, setEducationDiploma)}
                        className="flex-1"
                      />
                      {educationDiploma && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => setEducationDiploma(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {educationDiploma && (
                      <p className="text-sm text-muted-foreground">Yüklənib: {educationDiploma.name}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("contact")}>
                    Geri
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("science")}>
                    Növbəti
                  </Button>
                </div>
              </TabsContent>

              {/* Science Tab */}
              <TabsContent value="science" className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                {/* Scientific Degree */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Elmi dərəcə</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="degreeType">Elmi dərəcənin növü</Label>
                      <Select value={degreeType} onValueChange={setDegreeType}>
                        <SelectTrigger id="degreeType">
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="phd">Fəlsəfə doktoru</SelectItem>
                          <SelectItem value="science">Elmlər doktoru</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="degreeSpecCode">İxtisas kodu</Label>
                      <Input
                        id="degreeSpecCode"
                        value={degreeSpecCode}
                        onChange={(e) => setDegreeSpecCode(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="degreeSpecName">İxtisas və ya istiqamətin adı</Label>
                      <Input
                        id="degreeSpecName"
                        value={degreeSpecName}
                        onChange={(e) => setDegreeSpecName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="degreeSeries">Diplomun seriyası</Label>
                      <Input
                        id="degreeSeries"
                        value={degreeSeries}
                        onChange={(e) => setDegreeSeries(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="degreeNumber">Diplomun nömrəsi</Label>
                      <Input
                        id="degreeNumber"
                        value={degreeNumber}
                        onChange={(e) => setDegreeNumber(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="degreeIssuedBy">Verən orqanın adı</Label>
                      <Input
                        id="degreeIssuedBy"
                        value={degreeIssuedBy}
                        onChange={(e) => setDegreeIssuedBy(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="degreeIssuedDate">Verilmə tarixi</Label>
                      <Input
                        id="degreeIssuedDate"
                        type="date"
                        value={degreeIssuedDate}
                        onChange={(e) => setDegreeIssuedDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="degreeDiploma">Elmi dərəcə diplomunun surəti (JPG formatı)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="degreeDiploma"
                        type="file"
                        accept="image/jpeg"
                        onChange={(e) => handleFileUpload(e, setDegreeDiploma)}
                        className="flex-1"
                      />
                      {degreeDiploma && (
                        <Button type="button" variant="outline" size="icon" onClick={() => setDegreeDiploma(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {degreeDiploma && <p className="text-sm text-muted-foreground">Yüklənib: {degreeDiploma.name}</p>}
                  </div>
                </div>

                {/* EIF Classification */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Elmin İnkişafı Fondunun Təsnifatına uyğun ixtisas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="scienceField">
                        Elm sahəsinin adı <span className="text-red-500">*</span>
                      </Label>
                      <Select value={scienceField} onValueChange={setScienceField}>
                        <SelectTrigger id="scienceField">
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="natural">Təbiət elmləri</SelectItem>
                          <SelectItem value="technical">Texniki elmlər</SelectItem>
                          <SelectItem value="social">Sosial elmlər</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scienceDirection">
                        Elmi istiqamətin adı <span className="text-red-500">*</span>
                      </Label>
                      <Select value={scienceDirection} onValueChange={setScienceDirection}>
                        <SelectTrigger id="scienceDirection">
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="physics">Fizika</SelectItem>
                          <SelectItem value="chemistry">Kimya</SelectItem>
                          <SelectItem value="biology">Biologiya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scienceSpecialization">
                        Elmi ixtisasın adı <span className="text-red-500">*</span>
                      </Label>
                      <Select value={scienceSpecialization} onValueChange={setScienceSpecialization}>
                        <SelectTrigger id="scienceSpecialization">
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quantum">Kvant fizikası</SelectItem>
                          <SelectItem value="organic">Üzvi kimya</SelectItem>
                          <SelectItem value="molecular">Molekulyar biologiya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Scientific Title */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Elmi ad</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="titleType">Elmi adın növü</Label>
                      <Select value={titleType} onValueChange={setTitleType}>
                        <SelectTrigger id="titleType">
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professor">Professor</SelectItem>
                          <SelectItem value="docent">Dosent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="titleSpecCode">İxtisas kodu</Label>
                      <Input
                        id="titleSpecCode"
                        value={titleSpecCode}
                        onChange={(e) => setTitleSpecCode(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="titleSpecName">İxtisas və ya istiqamətin adı</Label>
                      <Input
                        id="titleSpecName"
                        value={titleSpecName}
                        onChange={(e) => setTitleSpecName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="titleSeries">Diplomun seriyası</Label>
                      <Input id="titleSeries" value={titleSeries} onChange={(e) => setTitleSeries(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="titleNumber">Diplomun nömrəsi</Label>
                      <Input id="titleNumber" value={titleNumber} onChange={(e) => setTitleNumber(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="titleIssuedBy">Verən orqanın adı</Label>
                      <Input
                        id="titleIssuedBy"
                        value={titleIssuedBy}
                        onChange={(e) => setTitleIssuedBy(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="titleIssuedDate">Verilmə tarixi</Label>
                      <Input
                        id="titleIssuedDate"
                        type="date"
                        value={titleIssuedDate}
                        onChange={(e) => setTitleIssuedDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="titleDiploma">Diplomunun surəti (JPG formatı)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="titleDiploma"
                        type="file"
                        accept="image/jpeg"
                        onChange={(e) => handleFileUpload(e, setTitleDiploma)}
                        className="flex-1"
                      />
                      {titleDiploma && (
                        <Button type="button" variant="outline" size="icon" onClick={() => setTitleDiploma(null)}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {titleDiploma && <p className="text-sm text-muted-foreground">Yüklənib: {titleDiploma.name}</p>}
                  </div>
                </div>

                {/* Scientific Interests */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">
                      Elmi maraq dairələri <span className="text-red-500">*</span>
                    </h3>
                    <Button type="button" size="sm" onClick={handleAddScientificInterest}>
                      <Plus className="h-4 w-4 mr-1" />
                      Əlavə et
                    </Button>
                  </div>
                  {scientificInterests.map((interest, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Maraq dairəsi {index + 1}</span>
                        {scientificInterests.length > 1 && (
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveScientificInterest(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Elmi sahənin adı</Label>
                          <Select
                            value={interest.field}
                            onValueChange={(value) => {
                              const newInterests = [...scientificInterests]
                              newInterests[index].field = value
                              setScientificInterests(newInterests)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="natural">Təbiət elmləri</SelectItem>
                              <SelectItem value="technical">Texniki elmlər</SelectItem>
                              <SelectItem value="social">Sosial elmlər</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Elmi istiqamət</Label>
                          <Select
                            value={interest.direction}
                            onValueChange={(value) => {
                              const newInterests = [...scientificInterests]
                              newInterests[index].direction = value
                              setScientificInterests(newInterests)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="physics">Fizika</SelectItem>
                              <SelectItem value="chemistry">Kimya</SelectItem>
                              <SelectItem value="biology">Biologiya</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Alt istiqamət</Label>
                          <Select
                            value={interest.subdirection}
                            onValueChange={(value) => {
                              const newInterests = [...scientificInterests]
                              newInterests[index].subdirection = value
                              setScientificInterests(newInterests)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="quantum">Kvant fizikası</SelectItem>
                              <SelectItem value="organic">Üzvi kimya</SelectItem>
                              <SelectItem value="molecular">Molekulyar biologiya</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("education")}>
                    Geri
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("publications")}>
                    Növbəti
                  </Button>
                </div>
              </TabsContent>

              {/* Publications Tab */}
              <TabsContent value="publications" className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                {/* Publications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Nəşr olunmuş elmi əsərlərin sayı <span className="text-red-500">*</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="azPublications">Azərbaycanda nəşr olunmuş elmi əsərlərin sayı</Label>
                      <Input
                        id="azPublications"
                        type="number"
                        value={azPublications}
                        onChange={(e) => setAzPublications(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="azImpactPublications">İmpakt faktorlu nəşrlərdə elmi əsərlərin sayı</Label>
                      <Input
                        id="azImpactPublications"
                        type="number"
                        value={azImpactPublications}
                        onChange={(e) => setAzImpactPublications(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="azConferencePublications">
                        Konfrans materiallarında çap olunmuş elmi işlərin sayı
                      </Label>
                      <Input
                        id="azConferencePublications"
                        type="number"
                        value={azConferencePublications}
                        onChange={(e) => setAzConferencePublications(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="foreignPublications">Xaricdə nəşr olunmuş elmi əsərlərin sayı</Label>
                      <Input
                        id="foreignPublications"
                        type="number"
                        value={foreignPublications}
                        onChange={(e) => setForeignPublications(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="foreignImpactPublications">
                        İmpakt faktorlu nəşrlərdə elmi əsərlərin sayı (Xaricdə)
                      </Label>
                      <Input
                        id="foreignImpactPublications"
                        type="number"
                        value={foreignImpactPublications}
                        onChange={(e) => setForeignImpactPublications(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="foreignConferencePublications">
                        Konfrans materiallarında çap olunmuş elmi işlərin sayı (Xaricdə)
                      </Label>
                      <Input
                        id="foreignConferencePublications"
                        type="number"
                        value={foreignConferencePublications}
                        onChange={(e) => setForeignConferencePublications(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hIndex">
                        Müəllifin H-index-i <span className="text-red-500">*</span>
                      </Label>
                      <Input id="hIndex" type="number" value={hIndex} onChange={(e) => setHIndex(e.target.value)} />
                    </div>
                  </div>
                </div>

                {/* Other Competitions */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">İştirak olunmuş digər müsabiqələr</h3>
                    <Button type="button" size="sm" onClick={handleAddCompetition}>
                      <Plus className="h-4 w-4 mr-1" />
                      Əlavə et
                    </Button>
                  </div>
                  {otherCompetitions.map((competition, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Müsabiqə {index + 1}</span>
                        {otherCompetitions.length > 1 && (
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveCompetition(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Müsabiqəni keçirən təşkilatın adı</Label>
                          <Select
                            value={competition.organization}
                            onValueChange={(value) => {
                              const newCompetitions = [...otherCompetitions]
                              newCompetitions[index].organization = value
                              setOtherCompetitions(newCompetitions)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="eif">Elmin İnkişafı Fondu</SelectItem>
                              <SelectItem value="other">Digər</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Kateqoriya</Label>
                          <Select
                            value={competition.category}
                            onValueChange={(value) => {
                              const newCompetitions = [...otherCompetitions]
                              newCompetitions[index].category = value
                              setOtherCompetitions(newCompetitions)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="national">Milli</SelectItem>
                              <SelectItem value="international">Beynəlxalq</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Elm sahəsi</Label>
                          <Select
                            value={competition.scienceField}
                            onValueChange={(value) => {
                              const newCompetitions = [...otherCompetitions]
                              newCompetitions[index].scienceField = value
                              setOtherCompetitions(newCompetitions)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="natural">Təbiət elmləri</SelectItem>
                              <SelectItem value="technical">Texniki elmlər</SelectItem>
                              <SelectItem value="social">Sosial elmlər</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Müsabiqənin adı</Label>
                          <Input
                            value={competition.competitionName}
                            onChange={(e) => {
                              const newCompetitions = [...otherCompetitions]
                              newCompetitions[index].competitionName = e.target.value
                              setOtherCompetitions(newCompetitions)
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Layihənin adı</Label>
                          <Input
                            value={competition.projectName}
                            onChange={(e) => {
                              const newCompetitions = [...otherCompetitions]
                              newCompetitions[index].projectName = e.target.value
                              setOtherCompetitions(newCompetitions)
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Qrantın nömrəsi və ya kodu</Label>
                          <Input
                            value={competition.grantCode}
                            onChange={(e) => {
                              const newCompetitions = [...otherCompetitions]
                              newCompetitions[index].grantCode = e.target.value
                              setOtherCompetitions(newCompetitions)
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Yerinə yetirilmə müddəti</Label>
                          <Input
                            value={competition.duration}
                            onChange={(e) => {
                              const newCompetitions = [...otherCompetitions]
                              newCompetitions[index].duration = e.target.value
                              setOtherCompetitions(newCompetitions)
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Qiymətləndirmə dərəcəsi</Label>
                          <Select
                            value={competition.rating}
                            onValueChange={(value) => {
                              const newCompetitions = [...otherCompetitions]
                              newCompetitions[index].rating = value
                              setOtherCompetitions(newCompetitions)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="excellent">Əla</SelectItem>
                              <SelectItem value="good">Yaxşı</SelectItem>
                              <SelectItem value="satisfactory">Qənaətbəxş</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Cari statusu</Label>
                          <Select
                            value={competition.status}
                            onValueChange={(value) => {
                              const newCompetitions = [...otherCompetitions]
                              newCompetitions[index].status = value
                              setOtherCompetitions(newCompetitions)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Davam edir</SelectItem>
                              <SelectItem value="completed">Tamamlanıb</SelectItem>
                              <SelectItem value="cancelled">Ləğv olunub</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Başlama tarixi</Label>
                          <Input
                            type="date"
                            value={competition.startDate}
                            onChange={(e) => {
                              const newCompetitions = [...otherCompetitions]
                              newCompetitions[index].startDate = e.target.value
                              setOtherCompetitions(newCompetitions)
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Bitmə tarixi</Label>
                          <Input
                            type="date"
                            value={competition.endDate}
                            onChange={(e) => {
                              const newCompetitions = [...otherCompetitions]
                              newCompetitions[index].endDate = e.target.value
                              setOtherCompetitions(newCompetitions)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Expert Registration Option */}
                <div className="border-t pt-6">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="wantsExpertRole"
                      checked={wantsExpertRole}
                      onCheckedChange={(checked) => setWantsExpertRole(checked as boolean)}
                    />
                    <Label htmlFor="wantsExpertRole" className="cursor-pointer text-base">
                      Ekspert kimi qeydiyyatdan keçmək istəyirəm
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 ml-6">
                    Bu seçimi işarələdikdə, hesabınız ekspert kimi təsdiq gözləyəcək
                  </p>
                </div>

                <div className="flex justify-between pt-4 border-t">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("science")}>
                    Geri
                  </Button>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={() => router.push("/login")}>
                      İmtina et
                    </Button>
                    <Button type="submit">Təsdiq et</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
