import * as z from "zod";
import { Providers } from "../enum/providers";

export const RegistrationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  provider: z.nativeEnum(Providers),
  photoURL: z.string().optional(),
  email: z.string(),
  emailVerified: z.boolean(),
});

export const IdpSchema = RegistrationSchema.extend({
  providerUid: z.string(),
});

export type RegistrationSchema = z.infer<typeof RegistrationSchema>;
export type IdpSchema = z.infer<typeof IdpSchema>;
