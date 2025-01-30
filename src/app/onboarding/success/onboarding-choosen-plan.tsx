import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getSessionProductPlan } from "./actions"
import { ErrorMessage } from "@/components/error-message"

interface Props {
  sessionId: string
}

export async function OnBoardingChoosenPlan({ sessionId }: Props) {
  const product = await getSessionProductPlan({ sessionId })

  if (product.errors) return <ErrorMessage message={product.errors?.sessionId?.[0]} />

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price.unit_amount! / 100)


  return (
    <>
      <Card>
        <CardContent className="p-6 gap-4 flex sm:flex-col-reverse 2xl:flex-row  justify-between">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <img width={1000} height={1000} src={product.images[0]} alt={product.name} className="min-size-40 size-40 bg-gradient-to-b from-indigo-500 to-violet-700 mb-4 rounded-lg" />
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold">{formattedPrice}/mês</h2>
              <CardTitle className="text-wrap">{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </div>
          </div>
          <div>
            <Badge variant="success">Plano atual</Badge>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
