import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from "@/hook/useAuth";
import { Stack, useRouter, useSegments } from "expo-router";
import { ReactNode, useEffect } from "react";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
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
      return
    }
    if (user && inAuthGroup && !isLoadingUser) {
      router.replace('/')
      return
    }
  }, [user, segments])

  return <>{children}</>
}

export default function RootLayout() {
  const theme = {
    ...MD3LightTheme,
    myOwnProperty: true,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#5C6BF5',
      secondaryContainer: '#cacfff',

    },
  };
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <RouteGuard >
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
            </Stack>
          </RouteGuard>
        </SafeAreaProvider>
      </PaperProvider>
    </AuthProvider>
  )
}
