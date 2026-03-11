"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Düzgün e-mail ünvanı daxil edin")
      setIsLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsLoading(false)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
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
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl">E-mail göndərildi</CardTitle>
              <CardDescription>Şifrə bərpası üçün təlimatlar {email} ünvanına göndərildi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  E-mail gəlməyibsə, spam qovluğunu yoxlayın və ya bir neçə dəqiqə sonra yenidən cəhd edin.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Button asChild className="w-full">
                  <Link href="/login">Giriş səhifəsinə qayıt</Link>
                </Button>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setIsSubmitted(false)
                    setEmail("")
                  }}
                >
                  Başqa e-mail ilə cəhd et
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
          <p className="text-muted-foreground">Şifrəni bərpa edin</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Şifrəni unutmusunuz?</CardTitle>
            <CardDescription className="text-center">
              E-mail ünvanınızı daxil edin və şifrə bərpası üçün link göndərəcəyik
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail ünvanı</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="E-mail ünvanınızı daxil edin"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Göndərilir..." : "Bərpa linki göndər"}
              </Button>

              <div className="text-center">
                <Button variant="ghost" asChild className="text-sm">
                  <Link href="/login" className="flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Giriş səhifəsinə qayıt
                  </Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
