import { InsightCards } from "@/components/dashboard-insight-cards";
import { HeaderInnerPages } from "@/components/header-inner-pages";
import { StatsCards } from "@/components/stats-cards";

export default function Insights() {
  return (
    <>
      <HeaderInnerPages
        title="Análise de Insights"
        description="Acesse dados detalhados e relatórios para entender o comportamento do cliente e otimizar suas estratégias."
      />
      <InsightCards />
      <StatsCards />
    </>
  )
}
