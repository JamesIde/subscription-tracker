import { UserDto } from "../common/interfaces/UserDTO";

export class TransformUtils {
  static transformUser(user: UserDto, token: string) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.photoURL,
      token: token,
      contactInformation: {
        emailAddress: user.emailAddress,
        emailVerified: user.emailVerified,
      },
      providerInformation: {
        provider: user.provider,
        providerId: user.providerId,
      },
    };
  }
}
