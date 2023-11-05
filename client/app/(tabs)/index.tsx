import { Button, StyleSheet, View, Text } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { Link } from "expo-router";

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
      .then((user) => {
        console.log(user);
      });
  }

  return (
    <View>
      <Button
        title="Google Sign-In"
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log("Signed in with Google!")
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({});
