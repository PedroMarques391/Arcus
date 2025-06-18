import { LoadingScreen } from "@/components/LoadingScreen";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useAuth } from "@/hook/useAuth";
import { Stack, useRouter, useSegments } from "expo-router";
import { ReactNode, useEffect } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from "react-native-safe-area-context";

interface IRootInterface {
  children: ReactNode
}

function RouteGuard({ children }: IRootInterface) {
  const { user, isLoadingUser } = useAuth()
  const router = useRouter();
  const segments = useSegments()

  useEffect(() => {
    const inAuthGroup = segments[0] === 'auth'
    if (!user && !inAuthGroup && !isLoadingUser) {
      router.replace('/auth')

    }
    if (user && inAuthGroup && !isLoadingUser) {
      router.replace('/')

    }
  }, [segments, user, isLoadingUser])

  if (isLoadingUser) {
    return (
      <LoadingScreen />
    );
  }
  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ThemeProvider>
          <SafeAreaProvider>
            <StatusBar
              barStyle={"default"}
            />
            <RouteGuard >
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
              </Stack>
            </RouteGuard>
          </SafeAreaProvider>
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  )
}
