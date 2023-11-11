import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Registration } from "../core/interfaces/registration";
import { Providers } from "../core/enum/provider.login";

export class TransformUtils {
  static mapSocialUser(user: FirebaseAuthTypes.UserCredential): Registration {
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
}
