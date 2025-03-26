import Footer from '@/components/shared/Footer/Footer'
import Navbar from '@/components/shared/Navbar/Navbar'
import React from 'react'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <Navbar />
        {children}
        <Footer />
    </div>
  )
}
