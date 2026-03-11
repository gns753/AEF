"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Download, Calendar } from "lucide-react"

const documents = [
  {
    id: 1,
    title: "Qrant müsabiqəsinin keçirilməsi qaydaları",
    type: "Qaydalar",
    date: "15 Yanvar 2026",
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "Müraciət formasının doldurulması üzrə təlimat",
    type: "Təlimat",
    date: "10 Yanvar 2026",
    size: "1.8 MB",
  },
  {
    id: 3,
    title: "Layihə büdcəsinin hazırlanması qaydaları",
    type: "Qaydalar",
    date: "05 Yanvar 2026",
    size: "3.1 MB",
  },
  {
    id: 4,
    title: "Elmi hesabatın təqdim edilməsi forması",
    type: "Forma",
    date: "01 Dekabr 2025",
    size: "890 KB",
  },
  {
    id: 5,
    title: "Etik qaydalar və plagiat siyasəti",
    type: "Siyasət",
    date: "15 Noyabr 2025",
    size: "1.2 MB",
  },
  {
    id: 6,
    title: "Maliyyə hesabatının hazırlanması üzrə göstərişlər",
    type: "Göstəriş",
    date: "01 Noyabr 2025",
    size: "2.7 MB",
  },
]

const typeColors: Record<string, string> = {
  Qaydalar: "bg-blue-100 text-blue-700",
  Təlimat: "bg-emerald-100 text-emerald-700",
  Forma: "bg-amber-100 text-amber-700",
  Siyasət: "bg-red-100 text-red-700",
  Göstəriş: "bg-gray-100 text-gray-700",
}

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Normativ sənədlər</h1>
        <p className="text-muted-foreground mt-1">
          Qrant müsabiqələri ilə bağlı normativ sənədlər və təlimatlar
        </p>
      </div>

      <div className="space-y-3">
        {documents.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-between p-4 gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-sm text-foreground truncate">{doc.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <Badge className={`text-[10px] ${typeColors[doc.type] || ""}`}>
                      {doc.type}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {doc.date}
                    </span>
                    <span className="text-xs text-muted-foreground">{doc.size}</span>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline" className="shrink-0">
                <Download className="h-3.5 w-3.5 mr-1.5" />
                Yüklə
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
