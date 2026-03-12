"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Save,
  Edit3,
  X,
  CheckCircle2,
} from "lucide-react"

interface ExpertProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  organization: string
  position: string
  academicDegree: string
  specialization: string
  orcid: string
}

export default function ExpertCabinetPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [profile, setProfile] = useState<ExpertProfile>({
    firstName: "Fuad",
    lastName: "Məmmədov",
    email: "fuad.mammadov@example.com",
    phone: "+994 50 123 45 67",
    organization: "AMEA Riyaziyyat və Mexanika İnstitutu",
    position: "Aparıcı elmi işçi",
    academicDegree: "Elmlər doktoru",
    specialization: "Riyaziyyat, Diferensial tənliklər",
    orcid: "0000-0002-1234-5678",
  })

  const [editedProfile, setEditedProfile] = useState<ExpertProfile>(profile)

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const stats = {
    totalAssigned: 24,
    completed: 18,
    pending: 6,
    avgScore: 72.5,
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Şəxsi Kabinet</h1>
        <p className="text-muted-foreground">Profil məlumatlarınızı idarə edin</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="statistics">Statistika</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Şəxsi Məlumatlar
              </CardTitle>
              <div className="flex items-center gap-2">
                {isSaved && (
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Yadda saxlanıldı
                  </Badge>
                )}
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Redaktə et
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Ləğv et
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Yadda saxla
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Ad</Label>
                  {isEditing ? (
                    <Input
                      id="firstName"
                      value={editedProfile.firstName}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, firstName: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-foreground font-medium py-2">{profile.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Soyad</Label>
                  {isEditing ? (
                    <Input
                      id="lastName"
                      value={editedProfile.lastName}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, lastName: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-foreground font-medium py-2">{profile.lastName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    E-poçt
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, email: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-foreground font-medium py-2">{profile.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Telefon
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editedProfile.phone}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, phone: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-foreground font-medium py-2">{profile.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Təşkilat
                  </Label>
                  {isEditing ? (
                    <Input
                      id="organization"
                      value={editedProfile.organization}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, organization: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-foreground font-medium py-2">{profile.organization}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Vəzifə</Label>
                  {isEditing ? (
                    <Input
                      id="position"
                      value={editedProfile.position}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, position: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-foreground font-medium py-2">{profile.position}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="academicDegree" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Elmi dərəcə
                  </Label>
                  {isEditing ? (
                    <Input
                      id="academicDegree"
                      value={editedProfile.academicDegree}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, academicDegree: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-foreground font-medium py-2">{profile.academicDegree}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization">İxtisas</Label>
                  {isEditing ? (
                    <Input
                      id="specialization"
                      value={editedProfile.specialization}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, specialization: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-foreground font-medium py-2">{profile.specialization}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orcid">ORCID</Label>
                  {isEditing ? (
                    <Input
                      id="orcid"
                      value={editedProfile.orcid}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, orcid: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-foreground font-medium py-2">{profile.orcid}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-foreground">{stats.totalAssigned}</div>
                <p className="text-sm text-muted-foreground">Ümumi təyin edilmiş layihələr</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-emerald-600">{stats.completed}</div>
                <p className="text-sm text-muted-foreground">Tamamlanmış ekspertizalar</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
                <p className="text-sm text-muted-foreground">Gözləyən ekspertizalar</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-blue-600">{stats.avgScore}%</div>
                <p className="text-sm text-muted-foreground">Orta qiymətləndirmə balı</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
