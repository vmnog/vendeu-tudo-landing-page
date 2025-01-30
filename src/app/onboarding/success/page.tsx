import { Confetti } from "@/components/confetti";
import { HeaderInnerPages } from "@/components/header-inner-pages";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";
import { OnBoardingChoosenPlan } from "./onboarding-choosen-plan";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { OnBoarding } from "../actions";
import { IllustrationFinishOnboarding } from "@/components/svg/illustration-finish-onboarding";
import { FinishOnboardingButton } from "./finish-onboarding-button";

const functionalities = [
  {
    title: "Sincronização de Produtos",
    description: "Sincronize seus produtos do Instagram automaticamente com a sua loja online.",
    link: "/functionalities/sync-products",
  },
  {
    title: "Gestão de Estoque",
    description: "Gerencie o estoque da sua loja de forma eficiente e mantenha seus produtos atualizados.",
    link: "/functionalities/stock-management",
  },
  {
    title: "Relatórios de Vendas",
    description: "Acompanhe as vendas da sua loja com relatórios detalhados e insights de desempenho.",
    link: "/functionalities/sales-reports",
  },
  {
    title: "Personalização de Loja",
    description: "Personalize a aparência da sua loja com layouts exclusivos e atraentes.",
    link: "/functionalities/store-customization",
  },
  {
    title: "Suporte Prioritário",
    description: "Obtenha suporte prioritário 24/7 para resolver rapidamente qualquer problema.",
    link: "/functionalities/priority-support",
  },
];

export default function OnBoardingSuccess() {
  const isOnboarding: OnBoarding = JSON.parse(cookies().get('IS_ONBOARDING')!.value);
  const sessionIdCookie = cookies().get('ONBOARDING_STRIPE_SESSION_ID')
  if (!sessionIdCookie) redirect('/onboarding/payment')

  return (
    <>
      <HeaderInnerPages
        title="Bem-vindo ao clube Vendeu Tudo!"
        description="O crescimento da sua marca começa agora. Explore as funcionalidades da nossa plataforma, qualquer dúvida entre em contato conosco."
      />
      <Confetti />
      <Dialog defaultOpen={isOnboarding.onboarding}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bem-vindo, tudo pronto pra começar!</DialogTitle>
            <DialogDescription>
              Estamos com tudo pronto para começar a vender, recomendamos que você verifique os produtos
              que foram cadastrados e verifique nossas opções de personalização.
            </DialogDescription>
          </DialogHeader>
          <div className="grid items-center justify-center">
            <IllustrationFinishOnboarding />
          </div>
          <DialogFooter className="items-end">
            <FinishOnboardingButton />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid xl:grid-cols-2 gap-6">
        <div className="grid gap-6 h-fit">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex flex-col gap-4">
                  <CardTitle className="text-wrap flex items-center gap-2">
                    <Globe />
                    Seu site

                    <Badge className="sm:hidden" variant="success">Ativo</Badge>
                  </CardTitle>
                  <CardDescription>Este é o status da do seu site em produção.</CardDescription>
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold">www.sualoja.com.br</h2>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-12">
                  <Badge className="hidden sm:block" variant="success">Ativo</Badge>
                  <Button asChild>
                    <a href="https://www.vendeutudo.com.br" target="_blank">Visitar Site</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Suspense>
            <OnBoardingChoosenPlan sessionId={sessionIdCookie.value} />
          </Suspense>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {functionalities.map((func) => (
            <Card key={func.title}>
              <CardHeader>
                <CardTitle>{func.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{func.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={func.link}>Ver Mais</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

