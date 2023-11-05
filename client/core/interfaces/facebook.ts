export interface FaceookLogin {
  additionalUserInfo: AdditionalUserInfo;
  user: User;
}

export interface AdditionalUserInfo {
  providerId: string;
  profile: Profile;
  isNewUser: boolean;
}

export interface Profile {
  email: string;
  last_name: string;
  name: string;
  id: string;
  first_name: string;
  picture: Picture;
}

export interface Picture {
  data: Data;
}

export interface Data {
  width: number;
  is_silhouette: boolean;
  url: string;
  height: number;
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
