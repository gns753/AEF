"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, ChevronRight, Send, Building, Users, FileText } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate success/error
    if (Math.random() > 0.1) {
      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "",
        message: "",
      })
    } else {
      setSubmitStatus("error")
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-muted">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <span>Ana səhifə</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-blue-600 font-medium">Əlaqə</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Əlaqə</h1>
          <p className="text-muted-foreground">Bizimlə əlaqə saxlayın və suallarınızı verin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Main Office */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2 text-blue-600" />
                  Baş Ofis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Ünvan</p>
                    <p className="text-sm text-muted-foreground">
                      Bakı şəhəri, Nəsimi rayonu,
                      <br />
                      Azadlıq prospekti 33,
                      <br />
                      AZ1000
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Telefon</p>
                    <p className="text-sm text-muted-foreground">+994 12 123 45 67</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">E-mail</p>
                    <p className="text-sm text-muted-foreground">info@aef.gov.az</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">İş saatları</p>
                    <p className="text-sm text-muted-foreground">
                      Bazar ertəsi - Cümə
                      <br />
                      09:00 - 18:00
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Departments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  Şöbələr
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium text-sm">Qrant Müsabiqələri</p>
                  <p className="text-sm text-muted-foreground">grants@aef.gov.az</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Beynəlxalq Əlaqələr</p>
                  <p className="text-sm text-muted-foreground">international@aef.gov.az</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Mətbuat Xidməti</p>
                  <p className="text-sm text-muted-foreground">press@aef.gov.az</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Texniki Dəstək</p>
                  <p className="text-sm text-muted-foreground">support@aef.gov.az</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Faydalı Linklər
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                  <span className="text-sm">Tez-tez verilən suallar</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                  <span className="text-sm">Qrant müraciəti təlimatı</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                  <span className="text-sm">Sənədlər və formalar</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                  <span className="text-sm">Şikayət və təkliflər</span>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Bizə yazın</CardTitle>
                <CardDescription>
                  Suallarınızı və təkliflərinizi bizə göndərin. Ən qısa zamanda sizinlə əlaqə saxlayacağıq.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ad və Soyad *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Adınızı və soyadınızı daxil edin"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="E-mail ünvanınızı daxil edin"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+994 XX XXX XX XX"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Kateqoriya *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Müraciət kateqoriyasını seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="grant">Qrant müsabiqələri</SelectItem>
                          <SelectItem value="technical">Texniki dəstək</SelectItem>
                          <SelectItem value="partnership">Əməkdaşlıq</SelectItem>
                          <SelectItem value="media">Mətbuat sorğusu</SelectItem>
                          <SelectItem value="complaint">Şikayət</SelectItem>
                          <SelectItem value="other">Digər</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Mövzu *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Müraciətinizin mövzusunu qısaca yazın"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mesaj *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Müraciətinizi ətraflı yazın..."
                      rows={6}
                      required
                    />
                  </div>

                  {submitStatus === "success" && (
                    <Alert>
                      <AlertDescription>
                        Müraciətiniz uğurla göndərildi. Ən qısa zamanda sizinlə əlaqə saxlayacağıq.
                      </AlertDescription>
                    </Alert>
                  )}

                  {submitStatus === "error" && (
                    <Alert variant="destructive">
                      <AlertDescription>
                        Müraciət göndərilərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Göndərilir..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Göndər
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Xəritədə yerləşmə</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Xəritə yüklənir...</p>
                <p className="text-sm text-muted-foreground mt-1">Azadlıq prospekti 33, Bakı, Azərbaycan</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
