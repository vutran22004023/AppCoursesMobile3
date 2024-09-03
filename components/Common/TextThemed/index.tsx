import { Text, type TextProps, StyleSheet, ViewStyle, TextStyle, } from 'react-native';
import React from 'react'
import { useThemeColor } from '@/hooks/useThemeColor';
interface Prop {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "header"
    | "subtitleDefault";
  className?: string;
  children?: React.ReactNode;
  style?: TextStyle | TextStyle[]; 
}
const TextThemed = ({
  type = "default",
  children,
  className,
  lightColor,
  darkColor,
  style,
  ...rest
}: Prop) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const baseClass = "font-pregular";
  const typeClasses = {
    default: "text-sm font-pregular text-gray-100",
    defaultSemiBold: "text-base font-bold leading-6",
    title: "text-2xl font-bold leading-8",
    subtitle: "text-lg font-bold",
    subtitleDefault: "text-xl font-bold",
    header: "text-3xl font-bold",
    headerDefault: "text-3xl font-psemibold",
  };
  const finalClassName = `${baseClass} ${typeClasses[type]} ${className || ""}`;
  return (
    <Text className={finalClassName.trim()} {...rest} style={[{color},style]}>
      {children}
    </Text>
  )
}

export default TextThemed
