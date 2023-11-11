export interface UserAuthenticateSuccess {
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

export interface User extends Omit<UserAuthenticateSuccess, "token"> {}
