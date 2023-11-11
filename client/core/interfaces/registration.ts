import { Providers } from "../enum/provider.login";

export interface SocialRegistration {
  firstName: string;
  lastName: string;
  providerUid?: string;
  provider: Providers;
  photoURL?: string;
  email: string;
  emailVerified: boolean;
}
