import { AntDesign } from "@expo/vector-icons";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Providers } from "../../../core/enum/provider.login";
export default function FacebookButton({
  label,
  onFacebookClick,
}: {
  label: string;
  onFacebookClick: (provider: Providers) => void;
}) {
  return (
    <View>
      <Pressable
        style={styles.facebook}
        android_ripple={{
          color: "transparent",
        }}
        aria-label="login with facebook"
        onPress={() => onFacebookClick(Providers.FACEBOOK)}
      >
        <View style={styles.socialIconWrap}>
          <AntDesign
            name="facebook-square"
            size={24}
            color="#4261A5"
            style={{
              paddingRight: 10,
            }}
          />
          <Text
            style={{
              color: "#4261A5",
              fontWeight: "bold",
            }}
          >
            {label} with Facebook
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  facebook: {
    backgroundColor: "#E6EAF4",
    padding: 10,
    margin: 10,
    alignItems: "center",
    borderColor: "#4261A5",
    borderWidth: 0.2,
    borderRadius: 2,
  },
  socialIconWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
});
