import { type Metadata } from 'next'

import '@/styles/tailwind.css'
import { HeaderAuthenticatedLayout } from '@/components/header-authenticated-layout'
import { Sidebar } from '@/components/sidebar'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: {
    template: '%s | Vendeu Tudo',
    default: 'Dashboard',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div suppressHydrationWarning className="flex h-full flex-col bg-background text-foreground">
        <Sidebar />
        <div className="h-full bg-background lg:pl-72">
          <HeaderAuthenticatedLayout />
          <main className="bg-background p-4 sm:p-8 py-8 space-y-10 max-w-[1200px]">
            <Suspense fallback="Carregando...">
              {children}
            </Suspense>
          </main>
        </div>
      </div>
    </>
  )
}
