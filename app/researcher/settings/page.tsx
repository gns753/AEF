"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Lock, Send, CheckCircle2 } from "lucide-react"

export default function SettingsPage() {
  const [currentEmail] = useState("aysel.mammadova@amea.az")
  const [newEmail, setNewEmail] = useState("")
  const [verifyCode, setVerifyCode] = useState("")
  const [codeSent, setCodeSent] = useState(false)
  const [emailSuccess, setEmailSuccess] = useState(false)

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  const handleSendCode = () => {
    if (newEmail) setCodeSent(true)
  }

  const handleEmailSave = () => {
    if (verifyCode === "123456") {
      setEmailSuccess(true)
      setTimeout(() => setEmailSuccess(false), 3000)
    }
  }

  const handlePasswordChange = () => {
    setPasswordError("")
    if (newPassword !== confirmPassword) {
      setPasswordError("Şifrələr uyğun gəlmir")
      return
    }
    if (newPassword.length < 6) {
      setPasswordError("Şifrə minimum 6 simvol olmalıdır")
      return
    }
    setPasswordSuccess(true)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setTimeout(() => setPasswordSuccess(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tənzimləmələr</h1>
        <p className="text-muted-foreground mt-1">E-mail və şifrənizi dəyişdirin</p>
      </div>

      {/* Email Change */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-base">E-mail dəyişikliyi</CardTitle>
          </div>
          <CardDescription>Yeni e-mail ünvanınıza təsdiq kodu göndəriləcək</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Cari e-mail</Label>
            <Input value={currentEmail} readOnly className="bg-muted" />
          </div>
          <div className="space-y-1.5">
            <Label>Yeni e-mail</Label>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="yeni@email.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <Button
                onClick={handleSendCode}
                disabled={!newEmail}
                variant="outline"
                className="shrink-0"
              >
                <Send className="h-3.5 w-3.5 mr-1.5" />
                Kod göndər
              </Button>
            </div>
          </div>

          {codeSent && (
            <div className="space-y-1.5">
              <Label>Təsdiq kodu</Label>
              <Input
                placeholder="6 rəqəmli kod"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                maxLength={6}
              />
              <p className="text-xs text-muted-foreground">Demo: 123456</p>
            </div>
          )}

          {emailSuccess && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                E-mail uğurla dəyişdirildi
              </AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleEmailSave}
            disabled={!codeSent || !verifyCode}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Yadda saxla
          </Button>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-base">Şifrə dəyişikliyi</CardTitle>
          </div>
          <CardDescription>Güclü şifrə istifadə etməyiniz tövsiyə olunur</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Cari şifrə</Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Cari şifrənizi daxil edin"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Yeni şifrə</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Yeni şifrəni daxil edin"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Yeni şifrənin təkrarı</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Yeni şifrəni təkrar daxil edin"
            />
          </div>

          {passwordError && (
            <Alert variant="destructive">
              <AlertDescription>{passwordError}</AlertDescription>
            </Alert>
          )}

          {passwordSuccess && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                Şifrə uğurla dəyişdirildi
              </AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handlePasswordChange}
            disabled={!currentPassword || !newPassword || !confirmPassword}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Şifrəni yenilə
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
