import { AnimatedIcon } from '@/components/AnimatedIcon';
import Header from '@/components/Header';
import { MaterialCommunityIcons } from '@expo/vector-icons/';
import { Tabs } from "expo-router";
import { Platform } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function TabsLayout() {
  const theme = useTheme()


  return (
    <Tabs
      initialRouteName='index'
      screenOptions={{
        header: () => <Header />,
        headerStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarStyle: {
          backgroundColor: theme.colors.background,

          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          paddingBottom: Platform.OS === 'ios' ? 0 : 10
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
      }}>
      <Tabs.Screen
        name='streaks'
        options={{
          title: "Lista",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedIcon focused={focused}>
              <MaterialCommunityIcons name='chart-line' size={size} color={color} />
            </AnimatedIcon>
          )
        }} />
      <Tabs.Screen
        name="index"
        options={{
          title: "Hábitos de Hoje",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedIcon focused={focused}>
              <MaterialCommunityIcons name='calendar-today' size={size} color={color}
              />

            </AnimatedIcon>
          )
        }}
      />
      <Tabs.Screen
        name='addHabbit'
        options={{
          title: "Novo Hábito",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedIcon focused={focused}>
              <MaterialCommunityIcons name='plus-circle' size={size} color={color}
              />
            </AnimatedIcon>
          )
        }} />
    </Tabs>
  )
}
