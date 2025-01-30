import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"
import Link from "next/link"
import { HeaderInnerPages } from "@/components/header-inner-pages"
import { ProductsTable } from "@/components/products-table"
import { handleOnBoarding } from "@/app/onboarding/actions"

export const metadata: Metadata = {
  title: 'Produtos',
}

export default async function Products() {
  await handleOnBoarding()

  return (
    <>
      <HeaderInnerPages
        title="Catálogo de Produtos"
        description="Adicione, edite e organize seus produtos para manter sua loja sempre atualizada e atrativa."
      />
      <Button asChild>
        <Link href="/app/products/add">
          <Plus size={18} />
          <span>Adicionar produto</span>
        </Link>
      </Button>
      <ProductsTable />
    </>
  )
}
