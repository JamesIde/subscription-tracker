import { UserDto } from "../common/interfaces/UserDto";
import { UserResponse } from "../common/interfaces/UserResponse";

export class TransformUtils {
  static transformUser(user: UserDto, token: string): UserResponse {
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
        providerUid: user.providerUid,
      },
    };
  }
}
