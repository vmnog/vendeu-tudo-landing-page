import { type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'
import StorePrivacyNotice from '@/components/store/store-privacy-notice'

export const metadata: Metadata = {
  title: {
    template: '%s | Sua Loja',
    default: 'Sua Loja - Slogan da Sua Loja',
  },
  description:
    'Descrição da sua Loja',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      suppressHydrationWarning
      lang="pt-BR"
      className={clsx(
        'h-full scroll-smooth antialiased bg-gray-50',
        inter.variable,
        lexend.variable,
      )}
    >
      <body className="h-full">
        {children}
        <StorePrivacyNotice />
      </body>
    </html>
  )
}
