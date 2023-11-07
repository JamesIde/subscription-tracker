import * as z from "zod";
import { Providers } from "../enum/providers";

export const RegistrationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  providerId: z.string().optional(),
  provider: z.nativeEnum(Providers),
  photoURL: z.string().optional(),
  email: z.string(),
  emailVerified: z.boolean(),
});

export type RegistrationSchema = z.infer<typeof RegistrationSchema>;
