// Not sure if this should be labelled as a DTO
// But basically I need an object that maps to the user in the database so it can be manipulated in controllers

export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  emailVerified: boolean;
  photoURL: string;
  provider: string;
  providerId?: string | null;
}
