import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import { CursorArrowRaysIcon, CurrencyDollarIcon, UsersIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

import {
  Card,
  CardFooter,
} from "@/components/ui/card"

const stats = [
  { disabled: false, id: 1, name: 'Vendas Totais', stat: '71,897', icon: CurrencyDollarIcon, change: '122', changeType: 'increase' },
  { disabled: false, id: 2, name: 'Visualizações', stat: '58.16%', icon: UsersIcon, change: '5.4%', changeType: 'increase' },
  { disabled: false, id: 3, name: 'Cliques', stat: '24.57%', icon: CursorArrowRaysIcon, change: '3.2%', changeType: 'decrease' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function InsightCards() {
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <Card
            key={item.id}
            className={
              clsx(
                "relative overflow-hidden rounded-lg bg-card dark:bg-card px-4 pb-12 pt-5 sm:px-6 sm:pt-6",
                item.disabled && "blur-sm"
              )
            }
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 dark:bg-violet-700 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-muted-foreground">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-foreground">{item.stat}</p>
              <p
                className={classNames(
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                ) : (
                  <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                )}

                <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                {item.change}
              </p>
              <CardFooter className="absolute inset-x-0 bottom-0 bg-accent px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a href="#" className="font-medium text-primary dark:text-card-foreground hover:opacity-60">
                    Ver detalhes<span className="sr-only"> {item.name} stats</span>
                  </a>
                </div>
              </CardFooter>
            </dd>
          </Card>
        ))}
      </dl>
    </div>
  )
}
