import { AntDesign } from "@expo/vector-icons";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Providers } from "../../../core/enum/provider.login";
export default function GoogleButton({
  label,
  onGoogleClick,
}: {
  label: string;
  onGoogleClick: (provider: Providers) => void;
}) {
  return (
    <View>
      <Pressable
        style={styles.google}
        android_ripple={{
          color: "transparent",
        }}
        aria-label="login with facebook"
        onPress={() => onGoogleClick(Providers.GOOGLE)}
      >
        <View style={styles.socialIconWrap}>
          <AntDesign
            name="google"
            size={24}
            color="#DA3021"
            style={{
              paddingRight: 10,
            }}
          />
          <Text
            style={{
              color: "#DA3021",
              fontWeight: "bold",
            }}
          >
            {label} with Google
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  socialIconWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  google: {
    backgroundColor: "#F5E7EA",
    padding: 10,
    margin: 10,
    alignItems: "center",
    borderColor: "#DA3021",
    borderWidth: 0.2,
    borderRadius: 2,
  },
});
