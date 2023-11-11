import * as z from "zod";
import { Providers } from "../enum/providers";

export const LoginSchema = z.object({
  provider: z.nativeEnum(Providers),
  email: z.string(),
  providerUid: z.string().optional(),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
