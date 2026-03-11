"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, Eye, ChevronRight, Clock } from "lucide-react"

// Sample news data
const news = [
  {
    id: 1,
    title: "Azərbaycan Elm Fondu 2024-cü il üçün yeni qrant proqramlarını elan etdi",
    excerpt:
      "Bu il elm sahəsində 15 yeni istiqamətdə qrant müsabiqələri keçiriləcək. Ümumi fond həcmi 5 milyon manat təşkil edir.",
    content:
      "Azərbaycan Elm Fondu 2024-cü il üçün elm və texnologiya sahəsində 15 yeni istiqamətdə qrant müsabiqələrinin keçiriləcəyini elan edib...",
    category: "Qrant elanları",
    date: "2024-01-15",
    author: "AEF Mətbuat Xidməti",
    views: 1250,
    featured: true,
  },
  {
    id: 2,
    title: "Süni intellekt sahəsində beynəlxalq əməkdaşlıq memorandumu imzalandı",
    excerpt:
      "Azərbaycan Elm Fondu Avropa İttifaqının Horizon Europe proqramı çərçivəsində əməkdaşlıq memorandumu imzalayıb.",
    content:
      "Bu gün Azərbaycan Elm Fondu və Avropa İttifaqının Horizon Europe proqramı arasında süni intellekt sahəsində əməkdaşlıq memorandumu imzalanıb...",
    category: "Beynəlxalq əməkdaşlıq",
    date: "2024-01-12",
    author: "Beynəlxalq Əlaqələr Şöbəsi",
    views: 890,
    featured: false,
  },
  {
    id: 3,
    title: "Gənc alimlərin layihələri üçün xüsusi dəstək proqramı başladı",
    excerpt:
      "35 yaşa qədər olan gənc tədqiqatçılar üçün nəzərdə tutulmuş xüsusi qrant proqramına müraciətlər qəbul edilir.",
    content: "Azərbaycan Elm Fondu gənc alimlərin elmi fəaliyyətini dəstəkləmək məqsədilə xüsusi proqram başladıb...",
    category: "Gənc alimlər",
    date: "2024-01-10",
    author: "Gənc Alimlər Şöbəsi",
    views: 675,
    featured: true,
  },
  {
    id: 4,
    title: "Biotexnologiya sahəsində uğurlu layihələrin nəticələri açıqlandı",
    excerpt:
      "2023-cü ildə biotexnologiya sahəsində həyata keçirilən 12 layihənin nəticələri elmi ictimaiyyətə təqdim edildi.",
    content: "Azərbaycan Elm Fondu tərəfindən maliyyələşdirilən biotexnologiya layihələrinin nəticələri...",
    category: "Layihə nəticələri",
    date: "2024-01-08",
    author: "Layihələr İdarəetmə Şöbəsi",
    views: 445,
    featured: false,
  },
  {
    id: 5,
    title: "Rəqəmsal transformasiya sahəsində yeni tədqiqat mərkəzi açıldı",
    excerpt:
      "Bakı Dövlət Universitetində Azərbaycan Elm Fondunun dəstəyi ilə Rəqəmsal Transformasiya Tədqiqat Mərkəzi fəaliyyətə başladı.",
    content:
      "Bu gün Bakı Dövlət Universitetində Azərbaycan Elm Fondunun maliyyə dəstəyi ilə Rəqəmsal Transformasiya Tədqiqat Mərkəzi açıldı...",
    category: "Tədqiqat mərkəzləri",
    date: "2024-01-05",
    author: "İnfrastruktur Şöbəsi",
    views: 720,
    featured: false,
  },
  {
    id: 6,
    title: "Elm sahəsində gender bərabərliyi üzrə milli strategiya hazırlanır",
    excerpt:
      "Azərbaycan Elm Fondu elm sahəsində qadın tədqiqatçıların iştirakını artırmaq üçün xüsusi strategiya hazırlayır.",
    content:
      "Elm sahəsində gender bərabərliyinin təmin edilməsi məqsədilə Azərbaycan Elm Fondu milli strategiya hazırlayır...",
    category: "Strategiya və siyasət",
    date: "2024-01-03",
    author: "Strategiya Şöbəsi",
    views: 380,
    featured: false,
  },
]

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  const categories = [
    "Qrant elanları",
    "Beynəlxalq əməkdaşlıq",
    "Gənc alimlər",
    "Layihə nəticələri",
    "Tədqiqat mərkəzləri",
    "Strategiya və siyasət",
  ]

  const filteredNews = news
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortBy === "views") {
        return b.views - a.views
      }
      return 0
    })

  const featuredNews = filteredNews.filter((item) => item.featured)
  const regularNews = filteredNews.filter((item) => !item.featured)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("az-AZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-muted">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <span>Ana səhifə</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-blue-600 font-medium">Xəbərlər</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Xəbərlər</h1>
          <p className="text-muted-foreground">Azərbaycan Elm Fondundan ən son xəbərlər və elanlar</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Axtarış və Filtrlər</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Xəbər axtarın..."
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
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sıralama" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Tarixə görə</SelectItem>
                  <SelectItem value="views">Baxış sayına görə</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setCategoryFilter("all")
                  setSortBy("date")
                }}
              >
                Təmizlə
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Seçilmiş Xəbərlər</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredNews.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-600">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">{item.category}</Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        Seçilmiş
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                    <CardDescription className="text-base">{item.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(item.date)}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {item.views}
                        </div>
                      </div>
                      <Button size="sm">Oxu</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular News */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Bütün Xəbərlər</h2>
          <div className="space-y-6">
            {regularNews.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">{item.category}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatDate(item.date)}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2 hover:text-blue-600 cursor-pointer">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{item.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{item.author}</span>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {item.views} baxış
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Ətraflı oxu
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {filteredNews.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Heç bir xəbər tapılmadı</h3>
              <p className="text-muted-foreground">Axtarış kriteriyalarınızı dəyişdirərək yenidən cəhd edin.</p>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  )
}
