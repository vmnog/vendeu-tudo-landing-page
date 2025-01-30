'use client'

import { ReactNode, useState, useEffect } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon, ArrowUpIcon, ArrowDownIcon, FunnelIcon, HeartIcon, StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'
import { StarIcon, ChevronDownIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { cn } from '@/lib/utils'
import { StoreHeader } from '../../_components/store-header'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { StoreFooter } from '../../_components/store-footer'

type SortOption = {
  name: string
  value: string
  current: boolean
  icon?: ReactNode
}

type FilterOption = {
  value: string
  label: string
  checked: boolean
}

type FilterSection = {
  id: string
  name: string
  options: FilterOption[]
}

type Product = {
  id: number
  name: string
  href: string
  price: string
  category: string
  brand: string
  color: string
  size: string
  availability: string
  imageSrc: string
  imageAlt: string
  rating: number
  reviewCount: number
}

type FooterNavigation = {
  account: { name: string; href: string }[]
  service: { name: string; href: string }[]
  company: { name: string; href: string }[]
  connect: { name: string; href: string }[]
}

const sortOptions: SortOption[] = [
  { name: 'Popularidade', value: 'popular', current: true, icon: <HeartIcon className='size-4' /> },
  { name: 'Avaliação', value: 'rating', current: false, icon: <StarOutlineIcon className='size-4' /> },
  { name: 'Menor Preço', value: 'low-to-high', current: false, icon: <ArrowUpIcon className='size-4' /> },
  { name: 'Maior Preço', value: 'high-to-low', current: false, icon: <ArrowDownIcon className='size-4' /> },
]

const filters: FilterSection[] = [
  {
    id: 'category',
    name: 'Categoria',
    options: [
      { value: 'totes', label: 'Bolsas', checked: false },
      { value: 'backpacks', label: 'Mochilas', checked: false },
      { value: 'travel', label: 'Viagens', checked: false },
      { value: 'hip-bags', label: 'Bolsas de Cintura', checked: false },
    ],
  },
  {
    id: 'color',
    name: 'Cor',
    options: [
      { value: 'white', label: 'Branco', checked: false },
      { value: 'gray', label: 'Cinza', checked: false },
      { value: 'blue', label: 'Azul', checked: false },
      { value: 'black', label: 'Preto', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Tamanho',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
  {
    id: 'brand',
    name: 'Marca',
    options: [
      { value: 'brand-a', label: 'Marca A', checked: false },
      { value: 'brand-b', label: 'Marca B', checked: false },
      { value: 'brand-c', label: 'Marca C', checked: false },
      { value: 'brand-d', label: 'Marca D', checked: false },
    ],
  },
  {
    id: 'price',
    name: 'Preço',
    options: [
      { value: 'under-50', label: 'Menos de R$50', checked: false },
      { value: '50-100', label: 'R$50 a R$100', checked: false },
      { value: '100-200', label: 'R$100 a R$200', checked: false },
      { value: '200-500', label: 'R$200 a R$500', checked: false },
      { value: 'over-500', label: 'Mais de R$500', checked: false },
    ],
  },
]

const products: Product[] = [
  {
    id: 1,
    name: 'Estojo Nomad',
    href: '#nomad-pouch',
    price: 'R$50',
    category: 'travel',
    brand: 'brand-b',
    color: 'white',
    size: '2l',
    rating: 4,
    reviewCount: 12,
    availability: 'Branco e Preto',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-07-product-01.jpg',
    imageAlt: 'Estojo de tecido branco com zíper branco, puxador preto e alça elástica preta.',
  },
  {
    id: 2,
    name: 'Cesta Tote com Zíper',
    href: '#zip-tote-basket',
    price: 'R$140',
    category: 'totes',
    brand: 'brand-a',
    color: 'black',
    size: '6l',
    rating: 5,
    reviewCount: 34,
    availability: 'Preto Lavado',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-07-product-04.jpg',
    imageAlt: 'Frente da bolsa tote com corpo de lona preta lavada, alças pretas e detalhes em couro tan.',
  },
  {
    id: 3,
    name: 'Mochila de Viagem',
    href: '#travel-backpack',
    price: 'R$200',
    category: 'backpacks',
    brand: 'brand-c',
    color: 'gray',
    size: '18l',
    rating: 3,
    reviewCount: 21,
    availability: 'Cinza',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-07-product-02.jpg',
    imageAlt: 'Mochila de viagem cinza com vários compartimentos e alças.',
  },
  {
    id: 4,
    name: 'Bolsa de Cintura',
    href: '#hip-bag',
    price: 'R$60',
    category: 'hip-bags',
    brand: 'brand-b',
    color: 'blue',
    size: '4l',
    rating: 4,
    reviewCount: 18,
    availability: 'Azul e Branco',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-07-product-03.jpg',
    imageAlt: 'Bolsa de cintura azul e branca com alça ajustável.',
  },
]

const footerNavigation: FooterNavigation = {
  account: [
    { name: 'Gerenciar Conta', href: '#manage-account' },
    { name: 'Itens Salvos', href: '#saved-items' },
    { name: 'Pedidos', href: '#orders' },
    { name: 'Resgatar Vale-presente', href: '#redeem-gift-card' },
  ],
  service: [
    { name: 'Envio e Devoluções', href: '#shipping-returns' },
    { name: 'Garantia', href: '#warranty' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Encontrar uma loja', href: '#find-store' },
    { name: 'Entre em contato', href: '#get-in-touch' },
  ],
  company: [
    { name: 'Quem somos', href: '#who-we-are' },
    { name: 'Imprensa', href: '#press' },
    { name: 'Carreiras', href: '#careers' },
    { name: 'Termos e Condições', href: '#terms-conditions' },
    { name: 'Privacidade', href: '#privacy' },
  ],
  connect: [
    { name: 'Facebook', href: '#facebook' },
    { name: 'Instagram', href: '#instagram' },
    { name: 'Pinterest', href: '# pinterest' },
  ],
}

export default function Categoria() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false)
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({
    category: [],
    brand: [],
    price: [],
    color: [],
    size: [],
  })
  const [sortOptionsState, setSortOptionsState] = useState<SortOption[]>(sortOptions)
  const router = useRouter()
  const pathname = usePathname()

  const updateURLParams = (filters: { [key: string]: string[] }, sort: string) => {
    const params = new URLSearchParams()
    Object.keys(filters).forEach((key) => {
      if (filters[key].length > 0) {
        params.set(key, filters[key].join(' '))
      }
    })
    params.set('sort', sort)
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters }
      if (updatedFilters[filterType].includes(value)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter((item) => item !== value)
      } else {
        updatedFilters[filterType].push(value)
      }
      return updatedFilters
    })
  }

  const handleSortChange = (value: string) => {
    setSortOptionsState((prevSortOptions) => {
      const updatedSortOptions = prevSortOptions.map((option) => ({
        ...option,
        current: option.value === value,
      }))
      return updatedSortOptions
    })
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const filters: { [key: string]: string[] } = {
      category: params.get('category')?.split(' ') || [],
      brand: params.get('brand')?.split(' ') || [],
      price: params.get('price')?.split(' ') || [],
      color: params.get('color')?.split(' ') || [],
      size: params.get('size')?.split(' ') || [],
    }
    const sort = params.get('sort') || 'popular'
    setSelectedFilters(filters)
    setSortOptionsState((prevSortOptions) => prevSortOptions.map((option) => ({
      ...option,
      current: option.value === sort,
    })))
  }, [])

  useEffect(() => {
    updateURLParams(selectedFilters, sortOptionsState.find(option => option.current)?.value || 'popular')
  }, [selectedFilters, sortOptionsState])

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedFilters.category.length
      ? selectedFilters.category.includes(product.category)
      : true
    const matchesBrand = selectedFilters.brand.length
      ? selectedFilters.brand.includes(product.brand)
      : true
    const matchesPrice = selectedFilters.price.length
      ? selectedFilters.price.some((price) => {
        if (price === 'under-50') return parseFloat(product.price.replace('R$', '')) < 50
        if (price === '50-100') return parseFloat(product.price.replace('R$', '')) >= 50 && parseFloat(product.price.replace('R$', '')) <= 100
        if (price === '100-200') return parseFloat(product.price.replace('R$', '')) >= 100 && parseFloat(product.price.replace('R$', '')) <= 200
        if (price === '200-500') return parseFloat(product.price.replace('R$', '')) >= 200 && parseFloat(product.price.replace('R$', '')) <= 500
        if (price === 'over-500') return parseFloat(product.price.replace('R$', '')) > 500
        return false
      })
      : true
    const matchesColor = selectedFilters.color.length
      ? selectedFilters.color.includes(product.color)
      : true
    const matchesSize = selectedFilters.size.length
      ? selectedFilters.size.includes(product.size)
      : true
    return matchesCategory && matchesBrand && matchesPrice && matchesColor && matchesSize
  })

  const sortedProducts = filteredProducts.sort((a, b) => {
    const sortOption = sortOptionsState.find(option => option.current)?.value || 'popular'
    if (sortOption === 'low-to-high') {
      return parseFloat(a.price.replace('R$', '')) - parseFloat(b.price.replace('R$', ''))
    }
    if (sortOption === 'high-to-low') {
      return parseFloat(b.price.replace('R$', '')) - parseFloat(a.price.replace('R$', ''))
    }
    if (sortOption === 'rating') {
      return b.rating - a.rating
    }
    return 0
  })

  return (
    <div className="bg-white">
      <StoreHeader />

      <div>
        {/* Mobile filter dialog */}
        <Dialog className="relative z-40 lg:hidden" open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)}>
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filtros</h2>
                <button
                  type="button"
                  className="relative -mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Fechar menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  value={option.value}
                                  type="checkbox"
                                  checked={selectedFilters[section.id]?.includes(option.value)}
                                  onChange={() => handleFilterChange(section.id, option.value)}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Novidades</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Ordenar
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptionsState.map((option) =>

                    (
                      <MenuItem key={option.value}>
                        {({ focus }) => (
                          <button
                            onClick={() => handleSortChange(option.value)}
                            className={cn(
                              option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                              focus ? 'bg-gray-100' : '',
                              'flex items-center justify-between gap-2 px-4 py-2 text-sm w-full'
                            )}
                          >
                            {option.name}
                            {option.icon}
                          </button>
                        )}
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filtros</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Produtos
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categorias</h3>
                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  value={option.value}
                                  type="checkbox"
                                  checked={selectedFilters[section.id]?.includes(option.value)}
                                  onChange={() => handleFilterChange(section.id, option.value)}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8">
                {sortedProducts.map((product) => (
                  <a key={product.id} href={product.href} className="group text-sm">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="mt-4 font-medium text-gray-900">{product.name}</h3>
                    <p className="italic text-gray-500">{product.availability}</p>
                    <p className="mt-2 font-medium text-gray-900">{product.price}</p>
                    <div className="mt-3 flex flex-col items-center">
                      <p className="sr-only">{product.rating} de 5 estrelas</p>
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={cn(
                              product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                              'h-5 w-5 flex-shrink-0',
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{product.reviewCount} avaliações</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>

        <StoreFooter />
      </div>
    </div>
  )
}
