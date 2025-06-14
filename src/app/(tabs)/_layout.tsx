import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from "expo-router";
import { useTheme } from 'react-native-paper';

export default function TabsLayout() {
  const theme = useTheme()
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: theme.colors.primary,
      headerShown: false
    }}>
      <Tabs.Screen name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => {
            return focused
              ? <FontAwesome5 name='home' size={24} color={color} />
              : <AntDesign name='home' size={24} color={color} />
          }
        }}

      />
      <Tabs.Screen name="login" options={{ title: 'Login' }} />
    </Tabs>
  )
}
