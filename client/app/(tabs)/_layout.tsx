import { Tabs } from "expo-router";
import { View, Text } from "react-native";
export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="one" options={{ title: "Tab One" }} />
      <Tabs.Screen name="two" options={{ title: "Tab Two" }} />
    </Tabs>
  );
}
