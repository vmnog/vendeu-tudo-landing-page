import { StatCard } from "./stat-card";
import { Card } from "./ui/card";

export interface Stat {
  unit: string;
  name: string;
  value: string | number;
}

const stats: Stat[] = [
  { unit: 'BRL', name: 'Faturamento Total', value: 5000 },
  { unit: 'BRL', name: 'Valor Médio do Pedido', value: 33.33 },
  { unit: 'únicos', name: 'Número de Pedidos', value: '150' },
  { unit: 'únicos', name: 'Total de Produtos Vendidos', value: '1.200' },
] as const;
export const StatsCards = () => (

  <Card className="rounded-lg grid grid-cols-1 bg-card dark:bg-card sm:grid-cols-2">
    {stats.map((stat) => (
      <StatCard key={stat.name} stat={stat} />
    ))}
  </Card>
)
