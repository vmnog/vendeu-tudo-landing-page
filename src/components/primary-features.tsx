'use client'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import screenshotExpenses from '@/images/screenshots/expenses.png'
import screenshotPayroll from '@/images/screenshots/payroll.png'
import screenshotReporting from '@/images/screenshots/reporting.png'
import screenshotVatReturns from '@/images/screenshots/vat-returns.png'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { Container } from './container'

const features = [
  {
    title: 'Integração',
    description:
      "Sincronize automaticamente seus posts do Instagram com a loja virtual. Atualize seu catálogo sem esforço e mantenha seus produtos sempre em destaque.",
    image: screenshotPayroll,
  },
  {
    title: 'Catálogo',
    description:
      "Evite o trabalho manual de gerenciar seu catálogo. Nossa plataforma atualiza automaticamente os produtos conforme você publica no Instagram.",
    image: screenshotExpenses,
  },
  {
    title: 'Pedidos',
    description:
      "Gerencie todos os seus pedidos em um único lugar com atualizações automáticas de status. Economize tempo e aumente a eficiência.",
    image: screenshotVatReturns,
  },
  {
    title: 'Vendas',
    description: "Monitore o desempenho das suas vendas com dashboards interativos. Acompanhe métricas chave como receita, produtos mais vendidos e conversões em tempo real.",
    image: screenshotReporting,
  },
]

export function PrimaryFeatures() {
  const { setTheme } = useTheme()
  const pathname = usePathname()

  let [tabOrientation, setTabOrientation] = useState<'horizontal' | 'vertical'>(
    'horizontal',
  )

  useEffect(() => {
    if (pathname === '/') {
      setTheme('light')
    }
  }, [pathname, setTheme])

  useEffect(() => {
    let lgMediaQuery = window.matchMedia('(min-width: 1024px)')

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(lgMediaQuery)
    lgMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  return (
    <section
      id="features"
      aria-label="Funcionalidades da Vendeu Tudo"
      className="relative overflow-hidden bg-background pb-28 pt-20 sm:py-32"
    >
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Tudo que você precisa para gerenciar sua loja virtual.
          </h2>
          <p className="mt-6 text-lg tracking-tight text-muted-foreground dark:text-indigo-100">
            Se não se importar com uma interface minimalista que prioriza a eficiência, limitamos sua liberdade para otimizar sua produtividade.
          </p>
        </div>
        <TabGroup
          className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === 'vertical'}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                <TabList className="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                  {features.map((feature, featureIndex) => (
                    <div
                      key={feature.title}
                      className={clsx(
                        'group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6',
                        selectedIndex === featureIndex
                          ? 'bg-white lg:bg-primary/10 lg:ring-1 lg:ring-inset lg:ring-primary/10'
                          : 'hover:bg-white/10 lg:hover:bg-primary/5',
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            'font-display text-lg ui-not-focus-visible:outline-none',
                            selectedIndex === featureIndex
                              ? 'text-primary lg:text-primary'
                              : 'text-muted-foreground dark:text-indigo-100 hover:text-foreground',
                          )}
                        >
                          <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                          {feature.title}
                        </Tab>
                      </h3>
                      <p
                        className={clsx(
                          'mt-2 hidden text-sm lg:block',
                          selectedIndex === featureIndex
                            ? 'text-foreground'
                            : 'text-muted-foreground dark:text-indigo-100 group-hover:text-foreground',
                        )}
                      >
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </TabList>
              </div>
              <TabPanels className="lg:col-span-7">
                {features.map((feature) => (
                  <TabPanel key={feature.title} unmount={false}>
                    <div className="relative sm:px-6 lg:hidden">
                      <div className="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-primary/10 ring-1 ring-inset ring-primary/10 sm:inset-x-0 sm:rounded-t-xl" />
                      <p className="relative mx-auto max-w-2xl text-base text-muted-foreground lg:text-primary sm:text-center">
                        {feature.description}
                      </p>
                    </div>
                    <div className="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50ndigo-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                      <img
                        className="w-full"
                        src={feature.image.src}
                        alt=""
                        sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                      />
                    </div>
                  </TabPanel>
                ))}
              </TabPanels>
            </>
          )}
        </TabGroup>
      </Container>
    </section>
  )
}
