import { Metadata } from "next"
import { HeaderInnerPages } from "@/components/header-inner-pages"
import { handleOnBoarding } from "../onboarding/actions"

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function Dashboard() {
  await handleOnBoarding()

  return (
    <>
      <HeaderInnerPages
        title="Dashboard"
        description="Acompanhe suas últimas vendas, obtenha insights e gerencie seu estoque."
      />
      {/* <SyncStatusComponent /> */}
      {/* <InsightCards /> */}
      {/* <StatsCards /> */}
      {/* <LastSalesTable /> */}
    </>
  )
}
