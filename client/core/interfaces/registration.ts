// firstName: z.string(),
//   lastName: z.string(),
//   providerUid: z.string().optional(),
//   provider: z.nativeEnum(Providers),
//   photoURL: z.string().optional(),
//   email: z.string(),
//   emailVerified: z.boolean(),

import { Providers } from "../enum/provider.login";

export interface Registration {
  firstName: string;
  lastName: string;
  providerUid?: string;
  provider: Providers;
  photoURL?: string;
  email: string;
  emailVerified: boolean;
}
