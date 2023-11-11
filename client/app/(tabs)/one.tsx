import { Link } from "expo-router";
import { View, Text, Button } from "react-native";
export default function TabOne() {
  return (
    <View>
      <Text>one</Text>
      <Link href={"/"} replace asChild>
        <Button title="back to login" />
      </Link>
    </View>
  );
}
