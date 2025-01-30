'use client'

import { Button } from "@/components/ui/button"
import { subscribeToPlanPromise } from "./actions"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ErrorMessage } from "@/components/error-message"

interface Props {
  stripeProductId: string
}

export function ChooseSubscriptionButton({ stripeProductId }: Props) {
  const [error, setError] = useState('')
  const router = useRouter()

  return (
    <>
      <Button
        onClick={async () => {
          const subscription = await subscribeToPlanPromise({ productId: stripeProductId })
          if (subscription?.redirectUrl) router.push(subscription?.redirectUrl)
          if (subscription?.errors?.productId) setError(subscription.errors.productId[0])
        }}
      >
        Escolher Plano
      </Button>
      <ErrorMessage message={error} />
    </>
  )
}
