"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { UserCircle, Mail, Phone, Calendar, Shield, Pencil, Save, X } from "lucide-react"

export default function EkspertizaCabinetPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    firstName: "Ekspertiza",
    lastName: "Admin",
    email: "ekspertiza.admin@aef.gov.az",
    phone: "+994 50 123 45 67",
    birthDate: "1985-05-15",
    position: "Ekspertiza üzrə admin",
    department: "Ekspertiza şöbəsi",
    joinDate: "2020-01-15",
  })

  const [editForm, setEditForm] = useState({ ...profile })

  const handleSave = () => {
    setProfile({ ...editForm })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm({ ...profile })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50">
            <UserCircle className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Şəxsi kabinet</h1>
            <p className="text-sm text-muted-foreground">Profil məlumatlarınızı idarə edin</p>
          </div>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
            <Pencil className="h-4 w-4 mr-2" />
            Redaktə et
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Ləğv et
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Yadda saxla
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="bg-blue-100 text-blue-700 text-2xl font-semibold">
                  EA
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-foreground">
                {profile.firstName} {profile.lastName}
              </h2>
              <Badge className="mt-2 bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">
                {profile.position}
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">{profile.department}</p>
              
              <div className="w-full mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{profile.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Qoşulma: {profile.joinDate}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Profil məlumatları
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Ad</label>
                {isEditing ? (
                  <Input
                    value={editForm.firstName}
                    onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                  />
                ) : (
                  <p className="text-foreground font-medium">{profile.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Soyad</label>
                {isEditing ? (
                  <Input
                    value={editForm.lastName}
                    onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                  />
                ) : (
                  <p className="text-foreground font-medium">{profile.lastName}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">E-mail</label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  />
                ) : (
                  <p className="text-foreground font-medium">{profile.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Telefon</label>
                {isEditing ? (
                  <Input
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  />
                ) : (
                  <p className="text-foreground font-medium">{profile.phone}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Doğum tarixi</label>
                {isEditing ? (
                  <Input
                    type="date"
                    value={editForm.birthDate}
                    onChange={(e) => setEditForm({ ...editForm, birthDate: e.target.value })}
                  />
                ) : (
                  <p className="text-foreground font-medium">{profile.birthDate}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Vəzifə</label>
                <p className="text-foreground font-medium">{profile.position}</p>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Şöbə</label>
                <p className="text-foreground font-medium">{profile.department}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
