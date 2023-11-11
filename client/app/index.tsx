import { View, Text, Button } from "react-native";
import { Link, useRouter } from "expo-router";
import SocialLogin from "./components/shared/SocialLogin";
import { Providers } from "../core/enum/provider.login";
import { useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AppConstants } from "../config/config";
export default function Home() {
  return (
    <View>
      <Text>Main Page Pog</Text>
      {/* <Button title="test" onPress={() => router.push("register")} />
      <Link href={"/register"}>Click Me</Link>
      <Link href={"/(tabs)/one"} replace>
        Click Tab 1
      </Link>
      <Link href={"/(tabs)/two"}>Click Tab 2</Link> */}

      <SocialLogin isLogin={true} />
    </View>
  );
}
