'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Briefcase, Calendar } from "lucide-react"

export default function HesabatAdminCabinet() {
  const adminInfo = {
    name: "Hesabat Admin",
    email: "hesabat@aef.az",
    phone: "+994 12 497 26 26",
    address: "Bakı, Azərbaycan",
    position: "Elmi-texniki Hesabat Adminitratoru",
    department: "Elmi Yönetim Birimi",
    joinDate: "2023-01-15",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Şəxsi Kabinet</h1>
        <p className="text-sm text-muted-foreground mt-1">Profil məlumatları və ayarlar</p>
      </div>

      {/* Profile Card */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24 bg-amber-100 text-amber-700 text-2xl font-bold">
              <AvatarFallback>HA</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-foreground">{adminInfo.name}</h2>
                <Badge className="mt-2 bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
                  {adminInfo.position}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{adminInfo.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{adminInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{adminInfo.address}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span>{adminInfo.department}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Düzəliş et</Button>
              <Button variant="outline">Şifrə dəyiş</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Vəzifə</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-foreground">{adminInfo.position}</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Bölmə</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-foreground">{adminInfo.department}</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Giriş Tarixi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-foreground">{adminInfo.joinDate}</p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Stats */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Fəaliyyət Xülasəsi</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-amber-600">24</p>
            <p className="text-sm text-muted-foreground mt-1">Emal olunmuş Hesabat</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-600">18</p>
            <p className="text-sm text-muted-foreground mt-1">Təsdiqlənmiş</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-amber-600">4</p>
            <p className="text-sm text-muted-foreground mt-1">Gözlənilir</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-600">2</p>
            <p className="text-sm text-muted-foreground mt-1">İnkar edilib</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
