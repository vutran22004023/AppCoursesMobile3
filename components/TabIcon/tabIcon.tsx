import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SvgNarbar } from '@/constants/svg';
import { useThemeColor } from '@/hooks/useThemeColor';
import Animated, { useAnimatedStyle, withTiming, useDerivedValue, useSharedValue, withSpring, interpolate } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
interface Props {
  lightColor?: string;
  darkColor?: string;
  icon: any;
  color: string;
  name: string;
  focused: boolean;
  size: number;
}
const tabIcon = ({ icon, color, name, focused, lightColor, darkColor, size }: Props) => {
  const bg = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const bgActive = useThemeColor({ light: lightColor, dark: darkColor }, 'backgroundActive');
  const tabPositionX = useSharedValue(focused ? 0 : -100);
  useEffect(() => {
    tabPositionX.value = withSpring(focused ? 0 : -100, {
      damping: 8,
      stiffness: 150,
    });
  }, [focused]);

  const svgAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withTiming(focused ? 1.01 : 1, { duration: 300 }) },
        { translateY: withTiming(focused ? -6 : 0, { duration: 300 }) },
      ],
      opacity: withTiming(focused ? 1 : 0.8, { duration: 300 }),
    };
  }, [focused]);


  return (
    <>
      {focused && (
        <Animated.View style={[svgAnimatedStyle]}>
          <SvgNarbar color={bg} />
        </Animated.View>
      )}
      <Animated.View
        className="absolute items-center justify-center gap-2 w-[60px] h-[60px]"
        style={[
          animatedStyles,
          {
            borderRadius: 9999,
            backgroundColor: bgActive,
            bottom: withTiming(focused ? 10 : 0, { duration: 300 }),
          }
        ]}>
        <Image
          source={icon}
          resizeMode="contain"
          tintColor={color}
          style={{ width: 20, height: 20 }}
        />
        <Text
          className={`${focused ? 'font-psemibold' : 'font-pregular'} text-[7px]`}
          style={{ color: color }}>
          {name}
        </Text>
      </Animated.View>
    </>
  );
};

export default tabIcon;

const styles = StyleSheet.create({});
