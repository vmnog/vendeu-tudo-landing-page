import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HeaderInnerPages } from "@/components/header-inner-pages";
import { StoreSettingsForm } from "@/components/store-settings-form";
import { SyncStatusComponent } from "@/components/sync-status-component";
import { handleOnBoarding } from "@/app/onboarding/actions";

export default async function Settings() {
  await handleOnBoarding()

  return (
    <>
      <HeaderInnerPages
        title="Configurações da Loja"
        description="Personalize as configurações da sua loja, gerencie integrações e ajuste preferências para atender às suas necessidades."
      />
      <Button asChild>
        <Link href="/dashboard/settings/domains">
          Gerenciar Domínios
        </Link>
      </Button>
      <SyncStatusComponent />
      <StoreSettingsForm />
    </>
  )
}
