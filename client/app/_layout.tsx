import { Stack } from "expo-router";
export default function StackLayout() {
  // TODO here set up auth State listener
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Login",
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
