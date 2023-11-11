import { Providers } from "../enum/provider.login";

export interface SocialLogin {
  email: string;
  provider: Providers;
  providerUid?: string;
}
