import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeaderInnerPages } from "@/components/header-inner-pages";
import { DomainAvailabilityForm } from "./domain-availability-form";
import { Suspense } from "react";
import { NextStepButton } from "../next-step-button";

export default function SettingsDomains() {
  return (
    <>
      <HeaderInnerPages
        title="Gerenciar Domínios"
        description="Confira os status dos domínios onde estão hospedados as suas lojas."
      />
      <Card>
        <CardHeader>
          <CardTitle>Disponibilidade</CardTitle>
          <CardDescription>
            Verifique se o seu domínio desejado está disponível.
          </CardDescription>
        </CardHeader>

        <DomainAvailabilityForm>
          <Suspense>
            <NextStepButton />
          </Suspense>
        </DomainAvailabilityForm>
      </Card>
    </>
  )
}
