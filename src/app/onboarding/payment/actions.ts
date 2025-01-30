'use server'

import { stripe } from '@/services/stripe'
import { z } from '@/utils/i18n-zod'
import { cookies } from 'next/headers'

const schema = z.object({
  productId: z.string({ message: 'Não foi possível identificar este plano.' }),
})

export async function subscribeToPlanPromise(subscriptionPayload: z.infer<typeof schema>) {
  const validatedFields = schema.safeParse(subscriptionPayload)

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const prices = await stripe.prices.list({
    product: validatedFields.data.productId
  })

  if (stripe && prices) {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: prices.data[0].id,
            quantity: 1
          }
        ],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding/payment?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding/payment?canceled=true`,
        locale: 'pt-BR',
      })

      cookies().set('ONBOARDING_STRIPE_SESSION_ID', session.id)

      return { redirectUrl: session.url }
    } catch (err) {
      console.error('signPlan Error on Stripe Checkout')
    }
  }
}

interface PurchaseDomainPromiseRequest {
  domain: string
  price: number
}

interface PurchaseDomainPromiseResponse {
  domain: {
    created: number
    ns: any[]
    pending: boolean
    uid: string
    verified: boolean
  }
}

export async function purchaseDomainPromise({
  domain, price
}: PurchaseDomainPromiseRequest
): Promise<PurchaseDomainPromiseResponse> {
  const searchParams = [
    `&slug=${process.env.NEXT_PUBLIC_PROJECT_ID_VERCEL}`,
    `&teamId=${process.env.NEXT_PUBLIC_TEAM_ID_VERCEL}`,
  ].join('')

  const result = await fetch(`https://api.vercel.com/v4/domains/buy?${searchParams}`, {
    body: JSON.stringify({
      name: domain,
      expectedPrice: price,
      renew: true
    }),
    headers: {
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_AUTH_BEARER_TOKEN}`,
      "Content-Type": "application/json"
    },
    method: "POST"
  });
  const data = await result.json() as PurchaseDomainPromiseResponse;
  return data
}
