import Link from 'next/link'

import { SlimLayout } from '@/components/slim-layout'
import { Button } from '@/components/ui/button'
import { LogoLightTheme } from '@/components/svg/logo-light-theme'
// import { handleOnBoarding } from './onboarding/actions'

export default function NotFound() {
  // await handleOnBoarding()

  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <LogoLightTheme className='size-40' />
        </Link>
      </div>
      <p className="mt-20 text-sm font-medium text-gray-700">404</p>
      <h1 className="mt-3 text-lg font-semibold text-gray-900">
        Página não encontrada
      </h1>
      <p className="mt-3 text-sm text-gray-700">
        Lamentamos, mas não conseguimos encontrar essa página.
        Desculpe, não foi possível encontrar a página que você procura.
      </p>
      <Button variant="home" asChild className="mt-10">
        <Link href="/">
          Voltar
        </Link>
      </Button>
    </SlimLayout>
  )
}
