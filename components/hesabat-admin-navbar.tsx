'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X, LogOut, BarChart3, FileText, Settings } from 'lucide-react'

export default function HesabatAdminNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const navLinks = [
    { href: '/hesabat-admin/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/hesabat-admin/reports', label: 'Hesabatlar', icon: FileText },
    { href: '/hesabat-admin/settings', label: 'Tənzimləmələr', icon: Settings },
  ]

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userType')
    localStorage.removeItem('userName')
    router.replace('/login')
  }

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative top-0 left-0 h-screen w-64 bg-card border-r border-border
        transform lg:transform-none transition-transform duration-200 z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <h1 className="text-lg font-bold text-foreground">Elmi-Texniki</h1>
            <p className="text-xs text-muted-foreground">Hesabat Admin</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navLinks.map((link) => {
              const Icon = link.icon
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                    ${active
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-border space-y-3">
            <div className="px-3 py-2 rounded-lg bg-muted">
              <p className="text-xs text-muted-foreground">Cari istifadəçi</p>
              <p className="text-sm font-semibold text-foreground truncate">
                {typeof window !== 'undefined' && localStorage.getItem('userName') ? localStorage.getItem('userName') : 'Hesabat Admin'}
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start gap-2"
              size="sm"
            >
              <LogOut className="h-4 w-4" />
              Çıxış
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
