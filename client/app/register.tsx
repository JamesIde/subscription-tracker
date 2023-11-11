import { View, Text } from "react-native";
import SocialLogin from "./components/shared/SocialLogin";
export default function Register() {
  return (
    <View>
      <SocialLogin isLogin={false} />
    </View>
  );
}
