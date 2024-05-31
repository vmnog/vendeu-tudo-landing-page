import { type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Vendeu Tudo',
    default: 'Vendeu Tudo - Sincronize seu Instagram com sua Loja Virtual',
  },
  description:
    'Vendeu Tudo é a plataforma de e-commerce que permite sincronizar seus posts do Instagram com o catálogo da sua loja virtual. Crie uma loja online personalizada e automatizada com facilidade, e aumente suas vendas de forma sustentável e eficaz.',
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
      lang="pt-BR"
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable,
      )}
    >
      <body className="flex h-full flex-col">{children}</body>
    </html>
  )
}
