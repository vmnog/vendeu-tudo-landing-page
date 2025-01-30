import clsx from "clsx";
import { Card } from "./ui/card";

export interface Shop {
  name: string;
  description: string;
  status: 'Sincronizada' | 'Desativado'
}

const shops: Shop[] = [
  { status: 'Sincronizada', name: 'Sua Loja', description: 'Um novo produto será importado ao seu catálogo automaticamente quando houverem novos posts.' },
  // { status: 'Sincronizada', name: 'Loja Segunda', description: 'Um novo produto será importado ao seu catálogo automaticamente quando houverem novos posts.' },
  // { status: 'Desativado', name: 'Loja Terceira', description: 'A sincronização automática está desativada, não serão importados novos produtos ao seu catálogo.' },
] as const;

export const SyncStatusComponent = () =>
(
  shops.map((shop: Shop) => (
    <Card key={shop.name} className="rounded-lg flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-card dark:bg-card  px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
      <div>
        <div className="flex items-center gap-x-3">
          <div className={clsx(
            shop.status === 'Sincronizada' && 'text-green-400 bg-green-400/10',
            shop.status === 'Desativado' && 'text-rose-400 bg-rose-400/10',
            'flex-none rounded-full p-1'
          )}>
            <div className="h-1.5 w-1.5 rounded-full bg-current" />
          </div>
          <h1 className="flex gap-x-3 text-base leading-7">
            <span className="font-semibold text-foreground">{shop.name}</span>
            <span className="text-muted-foreground">/</span>
            <span className="font-semibold text-foreground">Sincronização</span>
          </h1>
        </div>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{shop.description}</p>
      </div>
      <span className={clsx(
        shop.status === 'Sincronizada' && 'text-green-400 bg-green-400/10 ring-green-500/50',
        shop.status === 'Desativado' && 'text-rose-400 bg-rose-400/10 ring-rose-500/50',
        'order-first flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset sm:order-none'
      )}>
        {shop.status}
      </span>
    </Card>
  )
  )
)
