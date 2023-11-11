import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { SocialRegistration } from "../interfaces/registration";
import { Providers } from "../enum/provider.login";
import { SocialLogin } from "../interfaces/login";
import {
  User,
  UserAuthenticateSuccess,
} from "../interfaces/authenticate.success";

export class TransformUtils {
  static mapSocialUserRegister(
    user: FirebaseAuthTypes.UserCredential
  ): SocialRegistration {
    return {
      firstName: user.user.displayName?.split(" ")[0] || "",
      lastName: user.user.displayName?.split(" ")[1] || "",
      email: user.user.email || "",
      emailVerified: user.user.emailVerified,
      photoURL: user.user.photoURL || "",
      provider: user.additionalUserInfo?.providerId as Providers,
      providerUid: user.user.uid,
    };
  }

  static mapSocialUserLogin(
    user: FirebaseAuthTypes.UserCredential
  ): SocialLogin {
    return {
      email: user.user.email || "",
      provider: user.additionalUserInfo?.providerId as Providers,
      providerUid: user.user.uid,
    };
  }

  static mapUserAuthenticateWithoutToken(user: UserAuthenticateSuccess): User {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.photoUrl,
      contactInformation: user.contactInformation,
      providerInformation: user.providerInformation,
    };
  }
}
