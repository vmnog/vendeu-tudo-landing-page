'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CheckCircle2 } from "lucide-react"
import { ChooseSubscriptionButton } from "./payment-form"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { OnBoardingChoosenPlan } from "../success/onboarding-choosen-plan"
import Link from "next/link"
import { NextStepButton } from "../next-step-button"
import { cookies } from "next/headers"

const plans = [
  {
    title: "Instagram Shop",
    // stripeProductId: process.env.NODE_ENV === 'development' ? "prod_QIeKTmQUkq4ArQ" : "prod_QKrfXe1yRyGB0R",
    stripeProductId: "prod_QIeKTmQUkq4ArQ",
    monthlyPrice: 379,
    yearlyPrice: 4169,
    description: "O essencial para lançar seu site sem dor de cabeça.",
    features: [
      { id: 1, title: "Domínio + SSL + Host" },
      { id: 2, title: "Importação ilimitada" },
      { id: 3, title: "Conectar 1 conta Instagram" },
      { id: 4, title: "Personalização de Loja básica" },
      { id: 5, title: "Suporte via chat" },
    ],
    actionLabel: "Escolher Plano",
  },
  {
    title: "Business Store",
    // stripeProductId: process.env.NODE_ENV === 'development' ? "prod_QIeOsbMWlbqaZv" : "prod_QKrdijuYq2fleG",
    stripeProductId: "prod_QIeOsbMWlbqaZv",
    monthlyPrice: 899,
    yearlyPrice: 9889,
    description: "Comece utilizando o máximo da nossa tecnologia sem limites.",
    features: [
      { id: 5, title: "Domínio + SSL + Host" },
      { id: 6, title: "Importação ilimitada" },
      { id: 7, title: "Conectar contas ilimitadas" },
      { id: 8, title: "Layout exclusivo personalizado" },
      { id: 9, title: "Suporte prioritário 24/7" },
      { id: 10, title: "Integração com IA" },
    ],
    actionLabel: "Escolher Plano",
    exclusive: true,
    popular: true,
  },
]

export function ProductsList({ isYearly = false }: { isYearly: boolean }) {
  const [isPlanActive, setIsPlanActive] = useState(false)
  const search = useSearchParams()

  useEffect(() => {
    if (search.get("success") === 'true' && search.get("session_id")) {
      // TODO: check if session_id is valid using stripe
      // TODO: if session is valid then purchase domain
      setIsPlanActive(true)
    }
  }, [search])

  return (
    <>
      <section className="flex flex-col sm:flex-row sm:flex-wrap gap-8">
        {!isPlanActive && plans.map((plan) =>
          <PlanPricingCard key={plan.stripeProductId} {...plan} isYearly={isYearly} />
        )}


        {isPlanActive && (
          <Suspense>
            <div className="grid gap-8">
              {/* TODO: get session_id from url or get current plan from database */}
              <OnBoardingChoosenPlan sessionId={search.get("session_id") || 'not-found'} />
              <NextStepButton />
            </div>
          </Suspense>
        )}
      </section>
      {!isPlanActive && <p className="text-muted-foreground text-sm">*Consulte as diferenças em detalhes em <Link className="transition hover:text-foreground" href="https://www.vendeutudo.com.br/#pricing">nosso site na seção de preços</Link>.</p>}
    </>
  )
}

type PricingCardProps = {
  isYearly?: boolean
  title: string
  monthlyPrice?: number
  yearlyPrice?: number
  description: string
  features: { id: number, title: string }[]
  actionLabel: string
  popular?: boolean
  exclusive?: boolean
  stripeProductId: string
}

const PlanPricingCard = ({ stripeProductId, isYearly, title, monthlyPrice, yearlyPrice, description, features, popular, exclusive }: PricingCardProps) => (
  <Card
    className={cn(`w-full sm:w-72 flex flex-col justify-between py-1 ${popular ? "border-primary border-2" : "border-border"} mx-auto sm:mx-0`, {
      "animate-background-shine bg-background dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors":
        exclusive,
    })}>
    <div>
      <CardHeader className="pb-8 pt-4">
        {isYearly && yearlyPrice && monthlyPrice ? (
          <div className="flex justify-between">
            <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">{title}</CardTitle>
            <div
              className={cn("px-2.5 rounded-xl h-fit text-sm py-1 bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white", {
                "bg-gradient-to-r from-indigo-600 to-violet-700 dark:text-black": popular,
              })}>
              Economize R${monthlyPrice * 12 - yearlyPrice}
            </div>
          </div>
        ) : (
          <CardTitle className="text-primary dark:text-zinc-300 text-lg font-bold">{title}</CardTitle>
        )}
        <div className="flex gap-0.5">
          <h3 className="text-3xl font-bold">{yearlyPrice && isYearly ? "$" + yearlyPrice : monthlyPrice ? "R$" + monthlyPrice : "Grátis"}</h3>
          <span className="flex flex-col justify-end text-sm mb-1">{yearlyPrice && isYearly ? "/ano" : monthlyPrice ? "/mês" : null}</span>
        </div>
        <CardDescription className="pt-1.5 h-12">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {features.map((feature) => (
          <CheckItem key={feature.id} text={feature.title} />
        ))}
      </CardContent>
    </div>
    <CardFooter className="grid gap-4 mt-2">
      <ChooseSubscriptionButton stripeProductId={stripeProductId} />
    </CardFooter>
  </Card>
)

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <CheckCircle2 size={18} className="my-auto text-green-400" />
    <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">{text}</p>
  </div>
)
