import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home Page' }} />
        <Stack.Screen name="login/index" options={{ title: 'Login Page' }} />

      </Stack>
    </>
  )
}
