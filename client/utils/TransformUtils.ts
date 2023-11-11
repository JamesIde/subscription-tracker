import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { SocialRegistration } from "../core/interfaces/registration";
import { Providers } from "../core/enum/provider.login";
import { SocialLogin } from "../core/interfaces/login";

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

  static mapSocialuserLogin(
    user: FirebaseAuthTypes.UserCredential
  ): SocialLogin {
    return {
      email: user.user.email || "",
      provider: user.additionalUserInfo?.providerId as Providers,
      providerUid: user.user.uid,
    };
  }
}
