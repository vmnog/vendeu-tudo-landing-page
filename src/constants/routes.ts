// TODO: include all routes here, its uncompleted
export const publicRoutes = [
  { id: 'pb-features', title: 'Funcionalidades', href: '#features' },
  { id: 'pb-pricing', title: 'Preços', href: '#pricing' },
]

// TODO: include all routes here, its uncompleted
export const privateRoutes = [
  { id: 'pr-home', title: '', href: '/dashboard' },
]

export const ONBOARDING_STEPS = {
  0: '/onboarding/import',
  1: '/onboarding/domain',
  2: '/onboarding/payment',
  3: '/onboarding/success',
} as const;
