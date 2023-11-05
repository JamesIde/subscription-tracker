export interface GoogleLogin {
  additionalUserInfo: AdditionalUserInfo;
  user: User;
}

export interface AdditionalUserInfo {
  providerId: string;
  profile: Profile;
  isNewUser: boolean;
}

export interface Profile {
  email_verified: boolean;
  picture: string;
  name: string;
  sub: string;
  iss: string;
  email: string;
  iat: number;
  exp: number;
  azp: string;
  aud: string;
  family_name: string;
  locale: string;
  given_name: string;
}

export interface User {
  multiFactor: MultiFactor;
  metadata: Metadata;
  photoURL: string;
  phoneNumber: any;
  tenantId: any;
  displayName: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  uid: string;
  email: string;
  providerData: ProviderDaum[];
  providerId: string;
}

export interface MultiFactor {
  enrolledFactors: any[];
}

export interface Metadata {
  lastSignInTime: number;
  creationTime: number;
}

export interface ProviderDaum {
  email: string;
  providerId: string;
  photoURL: string;
  phoneNumber: any;
  displayName: string;
  uid: string;
}
