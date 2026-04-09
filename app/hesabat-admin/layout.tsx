'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import HesabatAdminNavbar from '@/components/hesabat-admin-navbar'

export default function HesabatAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const userType = localStorage.getItem('userType')
    
    if (!isLoggedIn || userType !== 'Elmi-texniki hesabat üzrə admin') {
      redirect('/login')
    }
  }, [])

  return (
    <div className="flex h-screen bg-background">
      <HesabatAdminNavbar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
