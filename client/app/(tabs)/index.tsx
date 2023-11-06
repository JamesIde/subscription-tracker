import { StyleSheet, View, Text } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { Link } from "expo-router";
import { Button } from "react-native-paper";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";

export default function TabOneScreen() {
  GoogleSignin.configure({
    webClientId:
      "833857504592-pf8qc56ofaflj2509hv804l4v0ciru4k.apps.googleusercontent.com",
  });

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(googleCredential)
      .then(async (user) => {
        console.log(JSON.stringify(user));
      });
  }

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ]);
    console.log(result);
    if (result.isCancelled) {
      throw "User cancelled the login process";
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw "Something went wrong obtaining access token";
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken
    );

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(facebookCredential)
      .then((user) => {
        console.log(JSON.stringify(user));
      });
  }

  return (
    <View>
      <Text className="text-nord-0">Here</Text>
      <Button
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log("Signed in with Google!")
          )
        }
        mode="contained"
      >
        Google{" "}
      </Button>
      <Button
        onPress={() =>
          onFacebookButtonPress().then(() =>
            console.log("Signed in with Facebook!")
          )
        }
      >
        Facebook{" "}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});
