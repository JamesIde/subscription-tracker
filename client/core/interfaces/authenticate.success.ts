export interface User {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  token: string;
  contactInformation: {
    emailAddress: string;
    emailVerified: boolean;
  };
  providerInformation: {
    provider: string;
    providerId: string;
  };
}
