import { HeaderInnerPages } from "@/components/header-inner-pages";
import { ProductsList } from "./products-list";

export default function SettingsPayment() {
  return (
    <>
      <HeaderInnerPages
        title="Meus Planos"
        description="Escolha o plano que mais se adequa ao momento da sua loja, configure seus métodos de pagamentos que serão utilizados para manter a gente vivo e trabalhando pra você."
      />

      <ProductsList isYearly={false} />
    </>
  )
}
