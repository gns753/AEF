"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChevronRight,
  Users,
  Target,
  Globe,
  Award,
  BookOpen,
  Building,
  Calendar,
  FileText,
  ExternalLink,
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-muted">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <span>Ana səhifə</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-blue-600 font-medium">Fond Haqqında</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Azərbaycan Elm Fondu</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Azərbaycan Prezidenti yanında Elm Fondu ölkəmizdə elmi tədqiqatların maliyyələşdirilməsi və dəstəklənməsi
              sahəsində aparıcı qurumdur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">500+</h3>
                <p className="text-muted-foreground">Maliyyələşdirilən layihə</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">1000+</h3>
                <p className="text-muted-foreground">Dəstəklənən tədqiqatçı</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">50+</h3>
                <p className="text-muted-foreground">Beynəlxalq əməkdaşlıq</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-6 w-6 mr-2 text-blue-600" />
                Missiyamız
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Azərbaycan Elm Fondu ölkəmizdə elmi tədqiqatların keyfiyyətinin artırılması, innovativ layihələrin
                dəstəklənməsi və beynəlxalq elmi əməkdaşlığın inkişafı məqsədilə fəaliyyət göstərir. Fondun əsas
                missiyası elm sahəsində milli potensialın gücləndirilməsi və dünya elmi ictimaiyyəti ilə inteqrasiyanın
                təmin edilməsidir.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
                Vizyonumuz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Azərbaycanın elm sahəsində regional lider ölkə kimi tanınması və dünya elmi ictimaiyyətində layiqli
                yerinin tutması üçün şərait yaratmaq. Gənc alimlərin inkişafını dəstəkləmək və ölkəmizdə innovativ elmi
                mühitin formalaşmasına töhfə vermək.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* History */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-blue-600" />
              Yaranma Tarixi və İnkişaf
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6">
                <div className="flex items-center mb-2">
                  <Badge variant="outline" className="mr-2">
                    2009
                  </Badge>
                  <h3 className="font-semibold">Fondun yaradılması</h3>
                </div>
                <p className="text-muted-foreground">
                  Azərbaycan Prezidentinin fərmanı ilə Azərbaycan Elm Fondu yaradıldı və elm sahəsində dövlət dəstəyinin
                  sistemli şəkildə həyata keçirilməsi başladı.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <div className="flex items-center mb-2">
                  <Badge variant="outline" className="mr-2">
                    2010-2015
                  </Badge>
                  <h3 className="font-semibold">İlk qrant proqramları</h3>
                </div>
                <p className="text-muted-foreground">
                  Fondun ilk qrant müsabiqələri keçirildi və 200-dən çox elmi layihə maliyyələşdirildi. Gənc alimlərin
                  dəstəklənməsi proqramı başladı.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <div className="flex items-center mb-2">
                  <Badge variant="outline" className="mr-2">
                    2016-2020
                  </Badge>
                  <h3 className="font-semibold">Beynəlxalq əməkdaşlıq</h3>
                </div>
                <p className="text-muted-foreground">
                  Avropa İttifaqı, ABŞ və digər ölkələrin elmi fondları ilə əməkdaşlıq memorandumları imzalandı. Birgə
                  beynəlxalq layihələr başladı.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <div className="flex items-center mb-2">
                  <Badge variant="outline" className="mr-2">
                    2021-2024
                  </Badge>
                  <h3 className="font-semibold">Rəqəmsal transformasiya</h3>
                </div>
                <p className="text-muted-foreground">
                  Onlayn müraciət sistemi tətbiq edildi, süni intellekt və biotexnologiya sahələrində xüsusi proqramlar
                  başladı.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Structure */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-6 w-6 mr-2 text-blue-600" />
              Fondun Strukturu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Himayədarlar Şurası</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Şura sədri</li>
                  <li>• Şura üzvləri (15 nəfər)</li>
                  <li>• Elmi komitələr</li>
                  <li>• Ekspert qrupları</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">İcraçı Direksiya</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• İcraçı direktor</li>
                  <li>• Qrant proqramları şöbəsi</li>
                  <li>• Beynəlxalq əlaqələr şöbəsi</li>
                  <li>• Maliyyə və mühasibat şöbəsi</li>
                  <li>• Hüquq və kadr şöbəsi</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Activities */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-6 w-6 mr-2 text-blue-600" />
              Əsas Fəaliyyət İstiqamətləri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Fundamental Tədqiqatlar</h3>
                <p className="text-sm text-muted-foreground">
                  Riyaziyyat, fizika, kimya, biologiya və digər fundamental elm sahələrində tədqiqatların dəstəklənməsi
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Tətbiqi Tədqiqatlar</h3>
                <p className="text-sm text-muted-foreground">
                  İnnovasiya və texnologiya sahələrində praktiki əhəmiyyət daşıyan layihələrin maliyyələşdirilməsi
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Gənc Alimlər</h3>
                <p className="text-sm text-muted-foreground">
                  35 yaşa qədər olan gənc tədqiqatçıların elmi fəaliyyətinin dəstəklənməsi və inkişafı
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Beynəlxalq Əməkdaşlıq</h3>
                <p className="text-sm text-muted-foreground">
                  Xarici elmi mərkəzlərlə birgə layihələrin həyata keçirilməsi və elmi mübadiləni təşkil etmək
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Elmi İnfrastruktur</h3>
                <p className="text-sm text-muted-foreground">
                  Laboratoriyalar, tədqiqat mərkəzləri və elmi avadanlıqların yaradılması və təkmilləşdirilməsi
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Elmin Təbliği</h3>
                <p className="text-sm text-muted-foreground">
                  Elmi nailiyyətlərin ictimaiyyətə çatdırılması və elm sahəsində maarifləndirmə fəaliyyəti
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-6 w-6 mr-2 text-blue-600" />
              Rəsmi Sənədlər
            </CardTitle>
            <CardDescription>Fondun fəaliyyətini tənzimləyən əsas sənədlər</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-between h-auto p-4 bg-transparent">
                <div className="text-left">
                  <div className="font-medium">Fondun Nizamnaməsi</div>
                  <div className="text-sm text-muted-foreground">PDF, 2.1 MB</div>
                </div>
                <ExternalLink className="h-4 w-4" />
              </Button>

              <Button variant="outline" className="justify-between h-auto p-4 bg-transparent">
                <div className="text-left">
                  <div className="font-medium">Qrant Qaydaları</div>
                  <div className="text-sm text-muted-foreground">PDF, 1.8 MB</div>
                </div>
                <ExternalLink className="h-4 w-4" />
              </Button>

              <Button variant="outline" className="justify-between h-auto p-4 bg-transparent">
                <div className="text-left">
                  <div className="font-medium">Maliyyə Hesabatı 2023</div>
                  <div className="text-sm text-muted-foreground">PDF, 3.2 MB</div>
                </div>
                <ExternalLink className="h-4 w-4" />
              </Button>

              <Button variant="outline" className="justify-between h-auto p-4 bg-transparent">
                <div className="text-left">
                  <div className="font-medium">Elmi Hesabat 2023</div>
                  <div className="text-sm text-muted-foreground">PDF, 4.5 MB</div>
                </div>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
