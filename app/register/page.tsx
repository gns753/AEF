"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, User, Mail, Phone, Building, FileText } from "lucide-react"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState<"researcher" | "institution">("researcher")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    institution: "",
    position: "",
    degree: "",
    researchArea: "",
    orcid: "",
    agreeTerms: false,
    agreePrivacy: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "Ad tələb olunur"
    if (!formData.lastName.trim()) newErrors.lastName = "Soyad tələb olunur"
    if (!formData.email.trim()) newErrors.email = "E-mail tələb olunur"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Düzgün e-mail daxil edin"
    if (!formData.password) newErrors.password = "Şifrə tələb olunur"
    else if (formData.password.length < 8) newErrors.password = "Şifrə ən azı 8 simvol olmalıdır"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Şifrələr uyğun gəlmir"
    if (!formData.institution.trim()) newErrors.institution = "Qurum tələb olunur"
    if (!formData.agreeTerms) newErrors.agreeTerms = "İstifadə şərtlərini qəbul etməlisiniz"
    if (!formData.agreePrivacy) newErrors.agreePrivacy = "Məxfilik siyasətini qəbul etməlisiniz"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate registration
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate success - in real app, handle response
    alert("Qeydiyyat uğurla tamamlandı! E-mail ünvanınıza təsdiq linki göndərildi.")

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/placeholder.svg?height=80&width=80&text=AZ"
              alt="Azərbaycan Gerbi"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Azərbaycan Elm Fondu</h1>
          <p className="text-muted-foreground">Yeni hesab yaradın</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Qeydiyyat</CardTitle>
            <CardDescription className="text-center">
              Qrant müsabiqələrinə müraciət etmək üçün hesab yaradın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* User Type Selection */}
              <div className="space-y-2">
                <Label>Hesab növü</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={userType === "researcher" ? "default" : "outline"}
                    onClick={() => setUserType("researcher")}
                    className="w-full"
                  >
                    Tədqiqatçı
                  </Button>
                  <Button
                    type="button"
                    variant={userType === "institution" ? "default" : "outline"}
                    onClick={() => setUserType("institution")}
                    className="w-full"
                  >
                    Qurum
                  </Button>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Ad *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="pl-10"
                      placeholder="Adınızı daxil edin"
                    />
                  </div>
                  {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Soyad *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Soyadınızı daxil edin"
                  />
                  {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10"
                      placeholder="E-mail ünvanınızı daxil edin"
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="pl-10"
                      placeholder="+994 XX XXX XX XX"
                    />
                  </div>
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Şifrə *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pr-10"
                      placeholder="Şifrənizi daxil edin"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Şifrəni təsdiq edin *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="pr-10"
                      placeholder="Şifrənizi yenidən daxil edin"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="institution">Qurum/Təşkilat *</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="institution"
                      value={formData.institution}
                      onChange={(e) => handleInputChange("institution", e.target.value)}
                      className="pl-10"
                      placeholder="İş yeri və ya təhsil müəssisəsi"
                    />
                  </div>
                  {errors.institution && <p className="text-sm text-red-600">{errors.institution}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position">Vəzifə</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => handleInputChange("position", e.target.value)}
                      placeholder="Vəzifənizi daxil edin"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="degree">Elmi dərəcə</Label>
                    <Select value={formData.degree} onValueChange={(value) => handleInputChange("degree", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Elmi dərəcənizi seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bachelor">Bakalavr</SelectItem>
                        <SelectItem value="master">Magistr</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                        <SelectItem value="professor">Professor</SelectItem>
                        <SelectItem value="associate">Dosent</SelectItem>
                        <SelectItem value="other">Digər</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="researchArea">Tədqiqat sahəsi</Label>
                  <Input
                    id="researchArea"
                    value={formData.researchArea}
                    onChange={(e) => handleInputChange("researchArea", e.target.value)}
                    placeholder="Əsas tədqiqat sahənizi qeyd edin"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orcid">ORCID ID</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="orcid"
                      value={formData.orcid}
                      onChange={(e) => handleInputChange("orcid", e.target.value)}
                      className="pl-10"
                      placeholder="0000-0000-0000-0000"
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                  />
                  <Label htmlFor="agreeTerms" className="text-sm">
                    <Link href="/terms" className="text-blue-600 hover:underline">
                      İstifadə şərtləri
                    </Link>
                    ni oxudum və qəbul edirəm *
                  </Label>
                </div>
                {errors.agreeTerms && <p className="text-sm text-red-600">{errors.agreeTerms}</p>}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreePrivacy"
                    checked={formData.agreePrivacy}
                    onCheckedChange={(checked) => handleInputChange("agreePrivacy", checked as boolean)}
                  />
                  <Label htmlFor="agreePrivacy" className="text-sm">
                    <Link href="/privacy" className="text-blue-600 hover:underline">
                      Məxfilik siyasəti
                    </Link>
                    ni oxudum və qəbul edirəm *
                  </Label>
                </div>
                {errors.agreePrivacy && <p className="text-sm text-red-600">{errors.agreePrivacy}</p>}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Qeydiyyat edilir..." : "Qeydiyyatdan keç"}
              </Button>

              {/* Login Link */}
              <div className="text-center">
                <span className="text-sm text-muted-foreground">
                  Artıq hesabınız var?{" "}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Daxil olun
                  </Link>
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
