import { Stack, useRouter } from "expo-router";
import { ReactNode, useEffect } from "react";

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
  return (
    <RouteGuard >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </RouteGuard>
  )
}
