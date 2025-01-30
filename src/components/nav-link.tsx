import Link from 'next/link'
import { Button } from './ui/button'

export function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Button asChild variant="link_home">
      <Link href={href}>
        {children}
      </Link>
    </Button>
  )
}
