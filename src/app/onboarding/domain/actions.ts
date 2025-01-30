import { schema } from "./schema";

export type CheckDomainFormState = {
  available: boolean
  price: number
  message?: string
  issues?: string[]
};

export async function checkDomainAvailability(
  formData: FormData
): Promise<CheckDomainFormState> {
  const formDataObj = Object.fromEntries(formData);
  const parsed = schema.safeParse(formDataObj);

  if (!parsed.success) {
    return {
      available: false,
      price: 0,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  const domain = formData.get("domain") as string;
  const formattedDomain = `${domain}.com`;
  const { available } = await checkDomainAvailabilityPromise(formattedDomain)
  const { price } = await checkDomainPricePromise(formattedDomain)
  return { available, price };
}

interface CheckDomainAvailabilityResponse {
  available: boolean
}

async function checkDomainAvailabilityPromise(domain: string): Promise<CheckDomainAvailabilityResponse> {
  const searchParams = [
    `name=${domain}`,
    `&slug=${process.env.NEXT_PUBLIC_PROJECT_ID_VERCEL}`,
    `&teamId=${process.env.NEXT_PUBLIC_TEAM_ID_VERCEL}`
  ].join('')

  const result = await fetch(
    `https://api.vercel.com/v4/domains/status?${searchParams}`, {
    headers: {
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_AUTH_BEARER_TOKEN}`,
    },
    method: "get"
  }
  );
  const data = await result.json() as CheckDomainAvailabilityResponse;
  return data
}

interface CheckDomainPriceResponse {
  period: number
  price: number
}

async function checkDomainPricePromise(domain: string): Promise<CheckDomainPriceResponse> {
  const searchParams = [
    `name=${domain}`,
    `&slug=${process.env.NEXT_PUBLIC_PROJECT_ID_VERCEL}`,
    `&teamId=${process.env.NEXT_PUBLIC_TEAM_ID_VERCEL}`,
    `&type=new`,
  ].join('')

  const result = await fetch(
    `https://api.vercel.com/v4/domains/price?${searchParams}`, {
    headers: {
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_AUTH_BEARER_TOKEN}`,
    },
    method: "get"
  }
  );
  const data = await result.json() as CheckDomainPriceResponse;
  return data
}
