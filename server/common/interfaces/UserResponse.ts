export interface UserResponse {
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
    providerUid?: string | null;
  };
}
