'use client'
import {
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { SignOutButton } from "./sign-out-button"
import Link from 'next/link'
import clsx from 'clsx'
import { privateRoutes, publicRoutes } from '@/constants/routes'

function MobileNavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <PopoverButton as={Link} href={href} className="block w-full p-2">
      {children}
    </PopoverButton>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0',
        )}
      />
    </svg>
  )
}


export function MobileNavigation() {
  const isUserAuthenticated = true

  return (
    <Popover>
      <PopoverButton
        className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </PopoverButton>
      <Transition>
        <TransitionChild
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <PopoverOverlay className="fixed inset-0 bg-slate-300/50" />
        </TransitionChild>
        <TransitionChild
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <PopoverPanel className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900ring-1 ring-slate-900/5">

            {!isUserAuthenticated && publicRoutes.map(route => (
              <MobileNavLink key={route.href} href={route.href}>{route.title}</MobileNavLink>
            ))}
            {isUserAuthenticated && privateRoutes.map(route => (
              <MobileNavLink key={route.href} href={route.href}>{route.title}</MobileNavLink>
            ))}
            <hr className="m-2 border-slate-300/40" />
            {isUserAuthenticated ? (
              <SignOutButton />
            ) : (
              <MobileNavLink href="/auth/sign-in">Entrar</MobileNavLink>
            )}
          </PopoverPanel>
        </TransitionChild>
      </Transition>
    </Popover >
  )
}

