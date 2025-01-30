import { Stat } from "./stats-cards";

export const StatCard = ({ stat }: { stat: Stat }) => (
  <div className="rounded-lg border-t border-foreground/5 py-6 px-4 sm:px-6 lg:px-8">
    <p className="text-sm font-medium leading-6 text-muted-foreground">{stat.name}</p>
    <p className="mt-2 flex items-baseline gap-x-2">
      <span className="text-4xl font-semibold tracking-tight text-foreground">
        {
          typeof stat.value === 'number' ?
            Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 }).format(stat.value) :
            stat.value
        }
      </span>
      {stat.unit ? <span className="text-sm text-muted-foreground">{stat.unit}</span> : null}
    </p>
  </div>
);
