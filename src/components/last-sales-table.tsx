import clsx from "clsx";
import { Card } from "./ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";

export const LastSalesTable = () => (
  <>
    <h2 className="text-2xl font-semibold leading-6 text-foreground">Últimas vendas</h2>

    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pedido</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead className="text-right">Vendido há</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lastSales.map((sale, index) => (
            <TableRow key={index}>
              <TableCell className="min-w-[200px] font-medium text-foreground">
                <div className="flex items-center gap-x-4">
                  <img width={200} height={200} src={sale.customer.imageUrl} alt={sale.customer.name} className="h-8 w-8 rounded-full bg-card dark:bg-card" />
                  <div>{sale.customer.name}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-x-3">
                  <div className="font-mono text-sm leading-6 text-muted-foreground">{sale.orderId}</div>
                  {sale.firstPurchase && (
                    <span
                      className="whitespace-nowrap rounded-full bg-green-500/20 text-green-500 px-2.5 py-0.5 text-center text-xs font-medium leading-5 ring-1 ring-inset ring-green-500"
                    >
                      {'Primeira compra'}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-x-2 sm:justify-start">
                  <div className={clsx(
                    sale.status === 'Recebido' && 'text-green-400 bg-green-400/10',
                    sale.status === 'Cancelado' && 'text-rose-400 bg-rose-400/10',
                    sale.status === 'Em andamento' && 'text-yellow-400 bg-yellow-400/10',
                    'flex-none rounded-full p-1'
                  )}>
                    <div className="h-1.5 w-1.5 rounded-full bg-current" />
                  </div>
                  <div className="hidden text-foreground sm:block">{sale.status}</div>
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap">{sale.amount}</TableCell>
              <TableCell className="text-right whitespace-nowrap">{sale.timeAgo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  </>
)


export interface Customer {
  name: string;
  imageUrl: string;
}

export interface SaleItem {
  customer: Customer;
  orderId: string;
  firstPurchase: boolean;
  status: string;
  amount: string;
  timeAgo: string;
  dateTime: string;
}

const lastSales: readonly SaleItem[] = [
  {
    customer: {
      name: 'Michael Foster',
      imageUrl: 'https://i.pravatar.cc/150?img=1',
    },
    orderId: '#1234',
    firstPurchase: true,
    status: 'Recebido',
    amount: 'R$ 100,00',
    timeAgo: '45 minutos atrás',
    dateTime: '2023-01-23T11:00',
  },
  {
    customer: {
      name: 'Jane Smith',
      imageUrl: 'https://i.pravatar.cc/150?img=2',
    },
    orderId: '#1235',
    firstPurchase: false,
    status: 'Em andamento',
    amount: 'R$ 150,00',
    timeAgo: '1 hora atrás',
    dateTime: '2023-01-23T10:30',
  },
  {
    customer: {
      name: 'Robert Brown',
      imageUrl: 'https://i.pravatar.cc/150?img=3',
    },
    orderId: '#1236',
    firstPurchase: false,
    status: 'Recebido',
    amount: 'R$ 300,00',
    timeAgo: '2 horas atrás',
    dateTime: '2023-01-23T09:45',
  },
  {
    customer: {
      name: 'Emily Davis',
      imageUrl: 'https://i.pravatar.cc/150?img=4',
    },
    orderId: '#1237',
    firstPurchase: false,
    status: 'Cancelado',
    amount: 'R$ 200,00',
    timeAgo: '3 horas atrás',
    dateTime: '2023-01-23T08:15',
  },
  {
    customer: {
      name: 'David Johnson',
      imageUrl: 'https://i.pravatar.cc/150?img=5',
    },
    orderId: '#1238',
    firstPurchase: true,
    status: 'Cancelado',
    amount: 'R$ 400,00',
    timeAgo: '4 horas atrás',
    dateTime: '2023-01-23T07:00',
  },
  {
    customer: {
      name: 'Sarah Lee',
      imageUrl: 'https://i.pravatar.cc/150?img=6',
    },
    orderId: '#1239',
    firstPurchase: false,
    status: 'Recebido',
    amount: 'R$ 250,00',
    timeAgo: '5 horas atrás',
    dateTime: '2023-01-23T06:30',
  },
  {
    customer: {
      name: 'James Wilson',
      imageUrl: 'https://i.pravatar.cc/150?img=7',
    },
    orderId: '#1240',
    firstPurchase: true,
    status: 'Em andamento',
    amount: 'R$ 180,00',
    timeAgo: '6 horas atrás',
    dateTime: '2023-01-23T05:45',
  },
]
