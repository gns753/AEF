'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, FileText, CheckCircle, Users } from 'lucide-react'

export default function HesabatAdminDashboard() {
  const stats = [
    {
      title: 'Toplam Hesabatlar',
      value: '24',
      change: '+5 bu ay',
      icon: FileText,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Təsdiqlənmiş',
      value: '18',
      change: '+3 bu ay',
      icon: CheckCircle,
      color: 'bg-emerald-100 text-emerald-600',
    },
    {
      title: 'Gözlənilir',
      value: '4',
      change: '2 vaciqdən',
      icon: BarChart3,
      color: 'bg-amber-100 text-amber-600',
    },
    {
      title: 'Əmtəə Sahəsi',
      value: '12',
      change: 'Aktiv sahə',
      icon: Users,
      color: 'bg-violet-100 text-violet-600',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Elmi-texniki hesabat idarəetmə</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-lg ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground mb-2">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Reports */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="border-b px-6 py-4">
          <CardTitle className="text-base">Ən Yeni Hesabatlar</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-6 py-3 font-semibold">Başlıq</th>
                  <th className="text-left px-6 py-3 font-semibold">Müəllif</th>
                  <th className="text-left px-6 py-3 font-semibold">Tarix</th>
                  <th className="text-left px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { title: '2024 Maliyyə Hesabatı', author: 'Sevinc Q.', date: '2024-03-15', status: 'Təsdiqlənib' },
                  { title: 'Tədqiqat Fəaliyyətinin Xülasəsi', author: 'Rəşad Q.', date: '2024-03-10', status: 'Təsdiqlənib' },
                  { title: 'Layihə İcraatı Hesabatı', author: 'Günel Ə.', date: '2024-03-08', status: 'Gözlənilir' },
                  { title: 'Kadr Dəyişiklikləri Xülasəsi', author: 'Orxan H.', date: '2024-03-05', status: 'Gözlənilir' },
                ].map((report, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3">{report.title}</td>
                    <td className="px-6 py-3 text-muted-foreground">{report.author}</td>
                    <td className="px-6 py-3 text-muted-foreground">{report.date}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        report.status === 'Təsdiqlənib'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
