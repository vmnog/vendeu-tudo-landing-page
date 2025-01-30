import { z } from "@/utils/i18n-zod";

export const schema = z.object({
  domain: z.string().min(3)
});
