import * as z from "zod";
import { Providers } from "../enum/providers";

export const LoginSchema = z.object({
  provider: z.nativeEnum(Providers),
  emailAddress: z.string(),
  providerId: z.string().optional(),
});
