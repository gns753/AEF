'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Settings, Save, RotateCcw } from 'lucide-react'

export default function HesabatAdminSettings() {
  const [settings, setSettings] = useState({
    organizationName: 'Elmi Tədqiqatlar Fondu',
    emailNotifications: true,
    reportDeadline: '30',
    defaultApprovers: 'admin@example.com',
    archiveAfterMonths: '12',
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    localStorage.setItem('hesabatSettings', JSON.stringify(settings))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleReset = () => {
    setSettings({
      organizationName: 'Elmi Tədqiqatlar Fondu',
      emailNotifications: true,
      reportDeadline: '30',
      defaultApprovers: 'admin@example.com',
      archiveAfterMonths: '12',
    })
    setSaved(false)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tənzimləmələr</h1>
        <p className="text-sm text-muted-foreground mt-1">Sistem tənzimləmələrini idarə edin</p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm font-medium">
          ✓ Tənzimləmələr uğurla saxlanıldı
        </div>
      )}

      {/* Organization Settings */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="border-b px-6 py-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Təşkilat Məlumatları
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div>
            <Label htmlFor="org-name" className="text-sm font-medium">Təşkilatın Adı</Label>
            <Input
              id="org-name"
              value={settings.organizationName}
              onChange={(e) => handleChange('organizationName', e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="approvers" className="text-sm font-medium">Əsas Təsdiqləyici E-mail</Label>
            <Input
              id="approvers"
              type="email"
              value={settings.defaultApprovers}
              onChange={(e) => handleChange('defaultApprovers', e.target.value)}
              className="mt-1.5"
            />
          </div>
        </CardContent>
      </Card>

      {/* Report Settings */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="border-b px-6 py-4">
          <CardTitle className="text-base">Hesabat Tənzimləmələri</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div>
            <Label htmlFor="deadline" className="text-sm font-medium">Hesabat Təhvil Müddəti (gün)</Label>
            <Input
              id="deadline"
              type="number"
              value={settings.reportDeadline}
              onChange={(e) => handleChange('reportDeadline', e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="archive" className="text-sm font-medium">Avadanlıq Arxivləşdirmə Müddəti (ay)</Label>
            <Input
              id="archive"
              type="number"
              value={settings.archiveAfterMonths}
              onChange={(e) => handleChange('archiveAfterMonths', e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <input
              type="checkbox"
              id="email-notify"
              checked={settings.emailNotifications}
              onChange={(e) => handleChange('emailNotifications', e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="email-notify" className="text-sm font-medium cursor-pointer">
              E-mail bildirişlərini aktivləşdir
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={handleSave}
          className="bg-amber-600 hover:bg-amber-700 text-white gap-2"
        >
          <Save className="h-4 w-4" />
          Saxla
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Sıfırla
        </Button>
      </div>
    </div>
  )
}
