"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, Users, Award, ChevronRight, ExternalLink } from "lucide-react"

// Sample grants data
const grants = [
  {
    id: "AEF-2024-001",
    title: "Süni intellekt və maşın öyrənməsi sahəsində fundamental tədqiqatlar",
    description:
      "Bu qrant proqramı süni intellekt, maşın öyrənməsi və dərin öyrənmə sahələrində aparılan fundamental və tətbiqi tədqiqatları dəstəkləyir.",
    category: "İnformasiya texnologiyaları",
    amount: "50,000 AZN",
    deadline: "2024-03-15",
    duration: "24 ay",
    status: "Aktiv",
    applicants: 45,
  },
  {
    id: "AEF-2024-002",
    title: "Bərpa olunan enerji mənbələrinin effektivliyinin artırılması",
    description:
      "Günəş, külək və digər bərpa olunan enerji mənbələrinin effektivliyinin artırılması üzrə tədqiqat layihələri.",
    category: "Enerji",
    amount: "75,000 AZN",
    deadline: "2024-03-20",
    duration: "36 ay",
    status: "Aktiv",
    applicants: 32,
  },
  {
    id: "AEF-2024-003",
    title: "Tibbi biotexnologiya və gen terapiyası üzrə innovativ həllər",
    description: "Xərçəng, genetik xəstəliklər və digər ciddi xəstəliklərin müalicəsində gen terapiyasının tətbiqi.",
    category: "Tibb və biotexnologiya",
    amount: "100,000 AZN",
    deadline: "2024-03-25",
    duration: "48 ay",
    status: "Gözləmədə",
    applicants: 28,
  },
  {
    id: "AEF-2024-004",
    title: "Kənd təsərrüfatında ağıllı texnologiyaların tətbiqi",
    description: "Precision agriculture, IoT sensorları və süni intellekt əsaslı kənd təsərrüfatı həlləri.",
    category: "Kənd təsərrüfatı",
    amount: "40,000 AZN",
    deadline: "2024-04-01",
    duration: "30 ay",
    status: "Aktiv",
    applicants: 19,
  },
  {
    id: "AEF-2024-005",
    title: "Mühit mühafizəsi və iqlim dəyişikliyi tədqiqatları",
    description: "İqlim dəyişikliyinin təsirlərinin öyrənilməsi və mühit mühafizəsi sahəsində innovativ həllər.",
    category: "Ekoloji və mühit",
    amount: "60,000 AZN",
    deadline: "2024-04-10",
    duration: "42 ay",
    status: "Yeni",
    applicants: 37,
  },
]

export default function GrantsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    const variants = {
      Aktiv: "default",
      Gözləmədə: "secondary",
      Yeni: "outline",
    } as const

    return <Badge variant={variants[status as keyof typeof variants] || "default"}>{status}</Badge>
  }

  const filteredGrants = grants.filter((grant) => {
    const matchesSearch =
      grant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grant.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || grant.category === categoryFilter
    const matchesStatus = statusFilter === "all" || grant.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="min-h-screen bg-muted">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <span>Ana səhifə</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-blue-600 font-medium">Qrant Müsabiqələri</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Qrant Müsabiqələri</h1>
          <p className="text-muted-foreground">Azərbaycan Elm Fondu tərəfindən elan edilmiş aktiv qrant müsabiqələri</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktiv Müsabiqələr</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Müraciət üçün açıq</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ümumi Fond</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">325,000</div>
              <p className="text-xs text-muted-foreground">AZN</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Müraciətlər</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">161</div>
              <p className="text-xs text-muted-foreground">Ümumi müraciət sayı</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orta Müddət</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">36</div>
              <p className="text-xs text-muted-foreground">Ay</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Axtarış və Filtrlər</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Qrant axtarın..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Kateqoriya" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Bütün kateqoriyalar</SelectItem>
                  <SelectItem value="İnformasiya texnologiyaları">İnformasiya texnologiyaları</SelectItem>
                  <SelectItem value="Enerji">Enerji</SelectItem>
                  <SelectItem value="Tibb və biotexnologiya">Tibb və biotexnologiya</SelectItem>
                  <SelectItem value="Kənd təsərrüfatı">Kənd təsərrüfatı</SelectItem>
                  <SelectItem value="Ekoloji və mühit">Ekoloji və mühit</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Bütün statuslar</SelectItem>
                  <SelectItem value="Aktiv">Aktiv</SelectItem>
                  <SelectItem value="Gözləmədə">Gözləmədə</SelectItem>
                  <SelectItem value="Yeni">Yeni</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setCategoryFilter("all")
                  setStatusFilter("all")
                }}
              >
                Təmizlə
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Grants Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredGrants.map((grant) => (
            <Card key={grant.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{grant.title}</CardTitle>
                    <p className="text-sm text-muted-foreground font-mono">{grant.id}</p>
                  </div>
                  {getStatusBadge(grant.status)}
                </div>
                <CardDescription className="text-sm">{grant.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Kateqoriya:</span>
                      <p className="font-medium">{grant.category}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Məbləğ:</span>
                      <p className="font-medium text-emerald-600">{grant.amount}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Son tarix:</span>
                      <p className="font-medium">{grant.deadline}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Müddət:</span>
                      <p className="font-medium">{grant.duration}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      {grant.applicants} müraciət
                    </div>
                    <Button size="sm" className="flex items-center">
                      Ətraflı
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGrants.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Heç bir qrant tapılmadı</h3>
              <p className="text-muted-foreground">Axtarış kriteriyalarınızı dəyişdirərək yenidən cəhd edin.</p>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  )
}
