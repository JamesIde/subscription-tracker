import { Stack } from "expo-router";
export default function StackLayout() {
  // TODO here set up auth State listener
  return (
    <Stack
      screenOptions={{
        title: "Subscription Tracker",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
