'use client'

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import {
  Bars3Icon,
  Cog6ToothIcon,
  FolderIcon,
  HomeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { sideBarOpenAtom } from '@/states/sidebar'
import { Logo } from './svg/logo'

const sideBarNavigationRoutes = [
  { notifications: 9, name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: false },
  // { notifications: 0, name: 'Produtos', href: '/dashboard/products', icon: FolderIcon, current: false },
  // { notifications: 0, name: 'Configurações', href: '/dashboard/settings', icon: Cog6ToothIcon, current: false },
  // { notifications: 0, name: 'Vendas', href: '/app/sales', icon: BanknotesIcon, current: false },
  // { notifications: 0, name: 'Insights', href: '/app/insights', icon: ChartPieIcon, current: false },
]
const teams = [
  { notifications: 3, id: 1, name: 'Sua Loja', href: '#', initial: 'S', current: true },
  // { notifications: 0, id: 2, name: 'Loja Segunda', href: '#', initial: 'T', current: false },
  // { notifications: 0, id: 3, name: 'Loja Terceira', href: '#', initial: 'W', current: false },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const setCurrentRoute = (routes: typeof sideBarNavigationRoutes, pathname: string) => {

  return routes.map(route => {
    const isChildrenRoute = pathname.split('/').length > 2

    if (!isChildrenRoute) {
      return {
        ...route,
        current: pathname.startsWith(route.href),
      }
    }

    return {
      ...route,
      current: pathname.split('/')[2].startsWith(route.href.split('/')[2]),
    }
  });
}

function SidebarContent() {
  const setSidebarOpen = useSetAtom(sideBarOpenAtom)
  const pathname = usePathname();
  const [routes, setRoutes] = useState(() =>
    setCurrentRoute(sideBarNavigationRoutes, pathname)
  );

  useEffect(() => {
    setRoutes(prevRoutes => setCurrentRoute(prevRoutes, pathname));
  }, [pathname]);


  return (
    <div className="h-full bg-background w-full xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
      <div className="h-full flex grow flex-col gap-y-5 overflow-y-auto px-6 ring-1 ring-white/5">
        <Logo className='h-20 w-20' />
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {routes.map((item) => (
                  <li key={item.name}>
                    <Link
                      onClick={() => setSidebarOpen(false)}
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-card dark:bg-card/30 text-primary dark:text-accent-foreground'
                          : 'text-muted-foreground hover:text-primary dark:hover:text-accent-foreground hover:bg-card',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current ? 'text-primary dark:text-accent-foreground' : 'text-muted-foreground group-hover:text-accent-foreground',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                      {item.notifications > 0 && (
                        <span
                          className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-primary/20 text-primary px-2.5 py-0.5 text-center text-xs font-medium leading-5 ring-1 ring-inset ring-primary"
                          aria-hidden="true"
                        >
                          {item.notifications}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <div className="text-xs font-semibold leading-6 text-muted-foreground">Suas lojas</div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {teams.map((team) => (
                  <li key={team.name}>
                    <Link
                      href={team.href}
                      className={classNames(
                        team.current
                          ? 'bg-card dark:bg-card/30 text-primary dark:text-foreground'
                          : 'text-muted-foreground hover:bg-card',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:text-primary dark:hover:text-foreground'
                      )}
                    >
                      <span
                        className={classNames(
                          team.current
                            ? 'text-primary border-primary dark:border-foreground dark:text-foreground'
                            : 'text-muted-foreground border-accent group-hover:border-primary group-hover:text-primary dark:group-hover:border-foreground dark:group-hover:text-foreground',
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-background'
                        )}
                      >
                        {team.initial}
                      </span>
                      <span className="truncate">{team.name}</span>

                      {team.notifications > 0 && (
                        <span
                          className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-primary/20 text-primary px-2.5 py-0.5 text-center text-xs font-medium leading-5 ring-1 ring-inset ring-primary"
                          aria-hidden="true"
                        >
                          {team.notifications}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useAtom(sideBarOpenAtom)

  return (
    <>
      <Transition show={sidebarOpen}>
        <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <TransitionChild
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-background/80" />
          </TransitionChild>

          <div className="fixed inset-0 flex">
            <TransitionChild
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                <TransitionChild
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-foreground" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>

                {/* Sidebar for mobile */}
                <SidebarContent />
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <SidebarContent />
      </div>
    </>
  )
}

export function ToggleSidebarMobileButton() {
  const [, setSidebarOpen] = useAtom(sideBarOpenAtom)

  return (
    <button type="button" className="-m-2.5 p-2.5 text-muted lg:hidden" onClick={() => setSidebarOpen(true)}>
      <span className="sr-only">Open sidebar</span>
      <Bars3Icon className="h-6 w-6 text-foreground" aria-hidden="true" />
    </button>
  )
}
