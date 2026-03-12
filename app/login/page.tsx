"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, User, Lock, Shield, Globe, KeyRound, ArrowLeft, X } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<"İddiaçı" | "Ekspert" | "Fond İnzibatçısı">("İddiaçı")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [loginMode, setLoginMode] = useState<"digital" | "credentials">("digital")

  // Fond Inzibatcisi selection modal state
  const [showFondSelection, setShowFondSelection] = useState(false)

  // Admin PIN state
  const [showPinScreen, setShowPinScreen] = useState(false)
  const [pin, setPin] = useState<string[]>(["", "", "", "", "", ""])
  const [pinError, setPinError] = useState("")
  const [pinAttempts, setPinAttempts] = useState(0)
  const [lockoutTimer, setLockoutTimer] = useState(0)
  const pinRefs = useRef<(HTMLInputElement | null)[]>([])

  const router = useRouter()

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutTimer <= 0) return
    const interval = setInterval(() => {
      setLockoutTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [lockoutTimer])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (userType === "İddiaçı") {
      if (email === "researcher@aef.gov.az" && password === "researcher123") {
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("userType", "İddiaçı")
        localStorage.setItem("userName", "Dr. Aysel Məmmədova")
        router.replace("/researcher/dashboard")
      } else {
        setError("Yanlış email və ya şifrə")
      }
    } else if (userType === "Ekspert") {
      if (email === "expert@aef.gov.az" && password === "expert123") {
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("userType", "Ekspert")
        localStorage.setItem("userName", "Fuad Məmmədov")
        router.replace("/expert/dashboard")
      } else {
        setError("Yanlış email və ya şifrə")
      }
    } else if (userType === "Fond İnzibatçısı") {
      if (email === "admin@aef.gov.az" && password === "admin123") {
        // Show selection modal instead of direct login
        setIsLoading(false)
        setShowFondSelection(true)
        return
      } else {
        setError("Yanlış email və ya şifrə")
      }
    }

    setIsLoading(false)
  }

  const handleDigitalLogin = async (method: "asan" | "egov") => {
    // If Fond İnzibatçısı, show selection modal instead of direct login
    if (userType === "Fond İnzibatçısı") {
      setShowFondSelection(true)
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userType", userType)
    const nameMap: Record<string, string> = {
      "İddiaçı": "Dr. Aysel Məmmədova",
      "Ekspert": "Fuad Məmmədov",
    }
    localStorage.setItem("userName", nameMap[userType] || "İstifadəçi")

    const routeMap: Record<string, string> = {
      "İddiaçı": "/researcher/dashboard",
      "Ekspert": "/expert/dashboard",
    }
    router.replace(routeMap[userType] || "/login")

    setIsLoading(false)
  }

  const handleFondInzibatciLogin = async () => {
    setShowFondSelection(false)
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userType", "Fond İnzibatçısı")
    localStorage.setItem("userName", "Sevinc Quliyeva")
    router.replace("/admin/dashboard")

    setIsLoading(false)
  }

  const handleAdminPinOpen = () => {
    setShowFondSelection(false)
    setShowPinScreen(true)
    setPin(["", "", "", "", "", ""])
    setPinError("")
    // Focus on first input after render
    setTimeout(() => pinRefs.current[0]?.focus(), 100)
  }

  const handlePinChange = useCallback(
    (index: number, value: string) => {
      if (lockoutTimer > 0) return
      if (!/^\d*$/.test(value)) return

      const newPin = [...pin]
      newPin[index] = value.slice(-1)
      setPin(newPin)
      setPinError("")

      if (value && index < 5) {
        pinRefs.current[index + 1]?.focus()
      }
    },
    [pin, lockoutTimer]
  )

  const handlePinKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !pin[index] && index > 0) {
        pinRefs.current[index - 1]?.focus()
      }
    },
    [pin]
  )

  const handlePinPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
      if (!pasted) return
      const newPin = [...pin]
      for (let i = 0; i < 6; i++) {
        newPin[i] = pasted[i] || ""
      }
      setPin(newPin)
      const focusIdx = Math.min(pasted.length, 5)
      pinRefs.current[focusIdx]?.focus()
    },
    [pin]
  )

  const handlePinSubmit = async () => {
    if (lockoutTimer > 0) return

    const enteredPin = pin.join("")
    if (enteredPin.length < 6) {
      setPinError("Bütün xanaları doldurun.")
      return
    }

    if (enteredPin === "123456") {
      // Correct PIN
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userType", "Admin")
      localStorage.setItem("userName", "Admin")
      router.replace("/superadmin/users")
    } else {
      const newAttempts = pinAttempts + 1
      setPinAttempts(newAttempts)

      if (newAttempts >= 3) {
        setPinError("Çox sayda yanlış cəhd. 30 saniyə gözləyin.")
        setLockoutTimer(30)
        setPinAttempts(0)
      } else {
        setPinError("Yanlış PİN. Yenidən cəhd edin.")
      }
      setPin(["", "", "", "", "", ""])
      pinRefs.current[0]?.focus()
    }
  }

  // If PIN screen is active, render it
  if (showPinScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0 overflow-hidden bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-red-600/20 flex items-center justify-center mb-4">
                  <Lock className="h-8 w-8 text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-white">Admin PİN-ini daxil edin</h2>
                <p className="text-sm text-slate-400 mt-2">
                  6 rəqəmli təhlükəsizlik kodunu daxil edin
                </p>
              </div>

              {/* PIN Inputs */}
              <div className="flex justify-center gap-3 mb-6">
                {pin.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      pinRefs.current[i] = el
                    }}
                    type="password"
                    maxLength={1}
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handlePinChange(i, e.target.value)}
                    onKeyDown={(e) => handlePinKeyDown(i, e)}
                    onPaste={i === 0 ? handlePinPaste : undefined}
                    disabled={lockoutTimer > 0}
                    className={`w-12 h-14 text-center text-2xl font-bold rounded-lg border-2 bg-slate-700/50 text-white outline-none transition-all
                      ${pinError ? "border-red-500 animate-shake" : "border-slate-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"}
                      ${lockoutTimer > 0 ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  />
                ))}
              </div>

              {/* Error message */}
              {pinError && (
                <div className="text-center mb-6">
                  <p className="text-sm text-red-400 font-medium">{pinError}</p>
                  {lockoutTimer > 0 && (
                    <p className="text-xs text-red-400/70 mt-1">
                      {lockoutTimer} saniyə qaldı...
                    </p>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white bg-transparent"
                  onClick={() => {
                    setShowPinScreen(false)
                    setShowFondSelection(true)
                    setPin(["", "", "", "", "", ""])
                    setPinError("")
                  }}
                >
                  Ləğv et
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  onClick={handlePinSubmit}
                  disabled={lockoutTimer > 0}
                >
                  {lockoutTimer > 0 ? `${lockoutTimer}s gözləyin` : "Təsdiqlə"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <p className="text-center mt-6 text-sm text-slate-500">
            <button
              onClick={() => {
                setShowPinScreen(false)
                setPin(["", "", "", "", "", ""])
                setPinError("")
              }}
              className="hover:text-slate-300 transition-colors"
            >
              Giriş ekranına qayıt
            </button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      {/* Fond İnzibatçısı Selection Modal */}
      {showFondSelection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <Card className="w-full max-w-lg shadow-2xl border-0 animate-in fade-in zoom-in-95 duration-200">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Giriş növünü seçin</h2>
                <button
                  onClick={() => setShowFondSelection(false)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Fond İnzibatçısı option */}
                <button
                  onClick={handleFondInzibatciLogin}
                  className="flex flex-col items-center gap-4 p-6 rounded-xl border-2 border-border hover:border-emerald-400 hover:bg-emerald-50/50 transition-all group text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                    <User className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Fond İnzibatçısı</p>
                    <p className="text-xs text-muted-foreground">Standart giriş</p>
                  </div>
                  <span className="text-sm font-medium text-emerald-600 border border-emerald-200 rounded-full px-4 py-1.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    Daxil ol
                  </span>
                </button>

                {/* Admin option */}
                <button
                  onClick={handleAdminPinOpen}
                  className="flex flex-col items-center gap-4 p-6 rounded-xl border-2 border-border hover:border-red-400 hover:bg-red-50/50 transition-all group text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                    <Lock className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Admin</p>
                    <p className="text-xs text-muted-foreground">{"İdarəetmə panelinə giriş"}</p>
                  </div>
                  <span className="text-sm font-medium text-red-600 border border-red-200 rounded-full px-4 py-1.5 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    Daxil ol
                  </span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.png"
              alt="Azərbaycan Elm Fondu"
              width={72}
              height={72}
              className="rounded-full"
            />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Azərbaycan Elm Fondu</h1>
          <p className="text-muted-foreground text-sm">Elektron Qrant İdarəetmə Sistemi</p>
        </div>

        <Card className="shadow-xl border-0 overflow-hidden">
          {/* User Type Toggle */}
          <div className="bg-muted border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-muted-foreground">İstifadəçi növü</Label>
              <div className="flex gap-1 bg-white rounded-lg p-1 border">
                <button
                  type="button"
                  onClick={() => setUserType("İddiaçı")}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    userType === "İddiaçı"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  İddiaçı
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("Ekspert")}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    userType === "Ekspert"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Ekspert
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("Fond İnzibatçısı")}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    userType === "Fond İnzibatçısı"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Fond İnzibatçısı
                </button>
              </div>
            </div>
          </div>

          <CardContent className="p-6">
            {loginMode === "digital" ? (
              /* Digital Login View */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Rəqəmsal giriş</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Dövlət platforması vasitəsilə təhlükəsiz giriş
                    </p>
                  </div>
                  <button
                    onClick={() => setLoginMode("credentials")}
                    className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 rounded-full px-3 py-1.5 transition-colors bg-blue-50/50 hover:bg-blue-50"
                  >
                    <KeyRound className="h-3 w-3" />
                    Şifrə ilə giriş
                  </button>
                </div>

                {/* ASAN Imza Button */}
                <button
                  onClick={() => handleDigitalLogin("asan")}
                  disabled={isLoading}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100/50 hover:border-blue-300 hover:from-blue-100 hover:to-blue-200/50 transition-all group disabled:opacity-50"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="block text-base font-semibold text-foreground">
                      ASAN İmza ilə daxil olun
                    </span>
                    <span className="block text-xs text-muted-foreground mt-0.5">
                      Mobil elektron imza vasitəsilə təhlükəsiz autentifikasiya
                    </span>
                  </div>
                </button>

                {/* e-Gov Button */}
                <button
                  onClick={() => handleDigitalLogin("egov")}
                  disabled={isLoading}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-emerald-100 bg-gradient-to-r from-emerald-50 to-emerald-100/50 hover:border-emerald-300 hover:from-emerald-100 hover:to-emerald-200/50 transition-all group disabled:opacity-50"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="block text-base font-semibold text-foreground">
                      e-Gov vasitəsilə daxil olun
                    </span>
                    <span className="block text-xs text-muted-foreground mt-0.5">
                      Elektron hökumət portalı ilə giriş
                    </span>
                  </div>
                </button>

                {isLoading && (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-2">
                    <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    Giriş edilir...
                  </div>
                )}

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-3 text-muted-foreground">və ya</span>
                  </div>
                </div>

                <p className="text-center text-xs text-muted-foreground">
                  Rəqəmsal giriş vasitəsilə şəxsiyyətiniz avtomatik olaraq təsdiqlənir
                </p>
              </div>
            ) : (
              /* Credentials Login View */
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setLoginMode("digital")
                        setError("")
                      }}
                      className="p-1 rounded-md hover:bg-muted transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">Hesab ilə giriş</h2>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        İstifadəçi adı və şifrənizlə daxil olun
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email ünvanınızı daxil edin"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Şifrə</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Şifrənizi daxil edin"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
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
                  </div>

                  {/* Error */}
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Submit */}
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                    {isLoading ? "Giriş edilir..." : "Daxil ol"}
                  </Button>

                  {/* Links */}
                  <div className="text-center space-y-2">
                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                      Şifrəni unutmusunuz?
                    </Link>
                    <div className="text-sm text-muted-foreground">
                      {"Hesabınız yoxdur? "}
                      <Link href="/register" className="text-blue-600 hover:underline">
                        Qeydiyyatdan keçin
                      </Link>
                    </div>
                  </div>
                </form>

                {/* Demo Credentials */}
                <div className="p-3 bg-muted rounded-lg border border-gray-100">
                  <h3 className="font-medium text-xs text-muted-foreground mb-2">Demo hesablar:</h3>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div>
                      <strong className="text-foreground">İddiaçı:</strong> researcher@aef.gov.az / researcher123
                    </div>
                    <div>
                      <strong className="text-foreground">Ekspert:</strong> expert@aef.gov.az / expert123
                    </div>
                    <div>
                      <strong className="text-foreground">Fond inzibatçısı:</strong> admin@aef.gov.az / admin123
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Back to home */}
        <p className="text-center mt-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-muted-foreground transition-colors">
            Ana səhifəyə qayıt
          </Link>
        </p>
      </div>
    </div>
  )
}
