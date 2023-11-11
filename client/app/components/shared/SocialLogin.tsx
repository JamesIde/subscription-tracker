import FacebookButton from "./FacebookButton";
import GoogleButton from "./GoogleButton";
import OrDivider from "./OrDivider";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Providers } from "../../../core/enum/provider.login";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { AppConstants } from "../../../core/config/config";
import { StyleSheet } from "react-native";
import { ErrorAlert } from "../error/error";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { TransformUtils } from "../../../core/utils/TransformUtils";

import { UserAuthenticateSuccess } from "../../../core/interfaces/authenticate.success";
import { SecureStoreKey } from "../../../core/enum/secure.store";
import { AxiosError } from "axios";

import * as SecureStore from "expo-secure-store";
import { axiosClient, ApiEndpoints } from "../../../api/api";
import useToken from "../../hooks/useToken";

export default function SocialLogin({ isLogin }: { isLogin: boolean }) {
  const router = useRouter();
  const label = isLogin ? "Login" : "Register";

  function handleSocial(provider: Providers) {
    switch (provider) {
      case Providers.FACEBOOK:
        continueWithFacebook();
        break;
      case Providers.GOOGLE:
        continueWithGoogle();
        break;
    }
  }

  async function continueWithFacebook() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(
      AppConstants.SOCIAL_LOGIN.FACEBOOK.SCOPES
    );
    if (result.isCancelled) {
      // TODO: handle cancel
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw ErrorAlert("Could not get access token");
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken
    );

    try {
      const user = await auth().signInWithCredential(facebookCredential);
      await loginOrRegisterUser(user);
    } catch (error) {
      throw ErrorAlert(error);
    }
  }

  async function continueWithGoogle() {
    GoogleSignin.configure({
      webClientId:
        "833857504592-pf8qc56ofaflj2509hv804l4v0ciru4k.apps.googleusercontent.com",
    });
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    try {
      const user = await auth().signInWithCredential(googleCredential);
      await loginOrRegisterUser(user);
    } catch (error) {
      throw ErrorAlert(error);
    }
  }

  async function loginOrRegisterUser(user: FirebaseAuthTypes.UserCredential) {
    if (isLogin) {
      // login api
      try {
        const login = TransformUtils.mapSocialUserLogin(user);
        const res = await axiosClient.post<UserAuthenticateSuccess>(
          ApiEndpoints.LOGIN,
          login
        );
        await handleLoginOrRegisterSuccess(res.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(`axios err`, error);
        }
      }
    } else {
      try {
        const reg = TransformUtils.mapSocialUserRegister(user);
        const res = await axiosClient.post<UserAuthenticateSuccess>(
          ApiEndpoints.REGISTRATION,
          reg
        );
        await handleLoginOrRegisterSuccess(res.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(`axios err`, error);
        }
        auth()
          .currentUser?.delete()
          .then(() => console.log(`current user deleted`));
      }
    }
  }

  const showRegisterOrLoginAlt = () => {
    return isLogin
      ? "Don't have an account? Register"
      : "Already have an account? Login";
  };

  const handleLoginOrRegisterSuccess = async (
    userSuccess: UserAuthenticateSuccess
  ) => {
    await SecureStore.setItemAsync(
      SecureStoreKey.TOKEN,
      userSuccess.token
    ).then(() => {
      router.replace("/(tabs)/one");
    });

    const user = TransformUtils.mapUserAuthenticateWithoutToken(userSuccess);
  };

  return (
    <>
      <View>
        <View>
          <Text
            style={styles.showLoginOrRegister}
            onPress={() => {
              isLogin ? router.replace("/register") : router.replace("/");
            }}
          >
            {showRegisterOrLoginAlt()}
          </Text>
        </View>
      </View>
      <OrDivider />
      <FacebookButton label={label} onFacebookClick={handleSocial} />
      <GoogleButton label={label} onGoogleClick={handleSocial} />
    </>
  );
}

const styles = StyleSheet.create({
  showLoginOrRegister: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    color: "#4261A5",
  },
});
