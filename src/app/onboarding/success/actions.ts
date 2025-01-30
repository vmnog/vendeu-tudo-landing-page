import { stripe } from "@/services/stripe";
import { z } from "@/utils/i18n-zod";
import Stripe from "stripe";

const schema = z.object({
  sessionId: z.string({
    message: 'Não foi possível reconhecer sua sessão de pagamento.',
  }),
})

export async function getSessionProductPlan(payload: z.infer<typeof schema>) {
  const validatedFields = schema.safeParse(payload)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  const session = await stripe.checkout.sessions.retrieve(validatedFields.data.sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  });

  const product = session.line_items!.data[0].price!.product as Stripe.Product
  const priceId = session.line_items!.data[0].price!.id;
  const price = await stripe.prices.retrieve(priceId);

  return { ...product, price };
}
