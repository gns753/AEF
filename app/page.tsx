"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, Target, Lightbulb, ChevronRight } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { HeroCarousel } from "@/components/hero-carousel"
import { InstitutionalPartners } from "@/components/institutional-partners"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Institutional Partners */}
      <InstitutionalPartners />

      {/* Current Grants Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Cari Qrant Müsabiqələri</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hazırda müraciət üçün açıq olan qrant müsabiqələri ilə tanış olun
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="default">Aktiv</Badge>
                  <span className="text-sm text-muted-foreground">Son tarix: 15 Mar</span>
                </div>
                <CardTitle className="text-lg">Süni İntellekt və Maşın Öyrənməsi</CardTitle>
                <CardDescription>AI və ML sahələrində fundamental və tətbiqi tədqiqatlar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-emerald-600">50,000 AZN</span>
                  <Button size="sm">Ətraflı</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="default">Aktiv</Badge>
                  <span className="text-sm text-muted-foreground">Son tarix: 20 Mar</span>
                </div>
                <CardTitle className="text-lg">Bərpa Olunan Enerji</CardTitle>
                <CardDescription>Günəş və külək enerjisi sahəsində innovativ həllər</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-emerald-600">75,000 AZN</span>
                  <Button size="sm">Ətraflı</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">Gözləmədə</Badge>
                  <span className="text-sm text-muted-foreground">Son tarix: 25 Mar</span>
                </div>
                <CardTitle className="text-lg">Tibbi Biotexnologiya</CardTitle>
                <CardDescription>Gen terapiyası və personalizə edilmiş tibb</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-emerald-600">100,000 AZN</span>
                  <Button size="sm">Ətraflı</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/grants">
                Bütün Müsabiqələri Gör
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cari Qrant Müsabiqələri Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Aktiv Qrant Müsabiqələri</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hazırda davam edən qrant müsabiqələri ilə tanış olun
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="default">Aktiv</Badge>
                  <span className="text-sm text-muted-foreground">Son tarix: 15 Mar</span>
                </div>
                <CardTitle className="text-lg">Süni İntellekt və Maşın Öyrənməsi</CardTitle>
                <CardDescription>AI və ML sahələrində fundamental və tətbiqi tədqiqatlar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-emerald-600">50,000 AZN</span>
                  <Button size="sm">Ətraflı</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="default">Aktiv</Badge>
                  <span className="text-sm text-muted-foreground">Son tarix: 20 Mar</span>
                </div>
                <CardTitle className="text-lg">Bərpa Olunan Enerji</CardTitle>
                <CardDescription>Günəş və külək enerjisi sahəsində innovativ həllər</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-emerald-600">75,000 AZN</span>
                  <Button size="sm">Ətraflı</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">Gözləmədə</Badge>
                  <span className="text-sm text-muted-foreground">Son tarix: 25 Mar</span>
                </div>
                <CardTitle className="text-lg">Tibbi Biotexnologiya</CardTitle>
                <CardDescription>Gen terapiyası və personalizə edilmiş tibb</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-emerald-600">100,000 AZN</span>
                  <Button size="sm">Ətraflı</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/grants">
                Bütün Müsabiqələri Gör
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Elmi Layihənizi Həyata Keçirmək Üçün Hazırsınız?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Bizimlə birlikdə elmin gələcəyini qurun. Qrant müsabiqələrimizə müraciət edin və layihənizi reallaşdırın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">Qeydiyyatdan Keç</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
              asChild
            >
              <Link href="/contact">Bizimlə Əlaqə</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
