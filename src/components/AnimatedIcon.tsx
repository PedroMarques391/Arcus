import { ReactNode, useEffect, useRef } from "react";


import { Animated } from "react-native";



interface IAnimatedIconProps {
  focused: boolean;
  children: ReactNode
}
export function AnimatedIcon({ focused, children }: IAnimatedIconProps): React.JSX.Element {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: focused ? -5 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
};