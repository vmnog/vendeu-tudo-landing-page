import { HeaderInnerPages } from "@/components/header-inner-pages"
import { SalesTable } from "@/components/sales-table"

export type Venda = {
  id: string
  total: number
  status: "pendente" | "processando" | "concluída" | "falhou"
  cliente: string
  data: string
  itens: number
}


export default function Sales() {
  return (
    <>
      <HeaderInnerPages
        title="Gestão de Vendas"
        description="Monitore suas vendas em tempo real, analise desempenho e gerencie pedidos de forma eficiente."
      />
      <SalesTable />
    </>
  )
}
