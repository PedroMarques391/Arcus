import { AuthProvider } from "@/context/AuthContext";
import { Stack, useRouter } from "expo-router";
import { ReactNode, useEffect } from "react";
import { MD3LightTheme, PaperProvider } from "react-native-paper";

interface IRootInterface {
  children: ReactNode
}

function RouteGuard({ children }: IRootInterface) {
  const router = useRouter();
  const isAuth = false;

  useEffect(() => {
    if (!isAuth) {
      return router.replace('/auth')
    }
  })

  return <>{children}</>
}

export default function RootLayout() {
  const theme = {
    ...MD3LightTheme,
    myOwnProperty: true,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#5C6BF5',
    },
  };
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <RouteGuard >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </RouteGuard>
      </AuthProvider>
    </PaperProvider>
  )
}
