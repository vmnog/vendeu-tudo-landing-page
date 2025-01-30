import { Container } from '@/components/container'
import { NavLink } from '@/components/nav-link'
import { publicRoutes } from '@/constants/routes'
import { Button } from './ui/button'
import Link from 'next/link'
import { Logo } from './svg/logo'

interface HeaderProps {
  hideNavLinks?: boolean
}

export function Header({ hideNavLinks }: HeaderProps) {
  return (
    <header className="py-4">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/">
              <Logo className='size-20' />
            </Link>
            {!hideNavLinks && (
              <div className="hidden md:flex md:gap-x-6">
                {publicRoutes.map(route => (
                  <NavLink key={route.id} href={route.href}>{route.title}</NavLink>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <NavLink href="/auth/sign-in">Entrar</NavLink>
            <Button variant="home" asChild>
              <Link href="/auth/sign-in" className="inline">Criar minha loja</Link>
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  )
}
