import React from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, ViewStyle, StyleSheet } from 'react-native';

interface CustomButtonProps {
  icon?: any;  // icon can be an image or an SVG
  handlePress?: () => void;
  containerStyles?: ViewStyle | ViewStyle[];  // Style object for container
  textStyles?: ViewStyle | ViewStyle[];  // Style object for text
  isLoading?: boolean;
  disabled?: boolean;
  image?: ReturnType<typeof require> | string;  // String or image for the icon
  size?: number;  // Size for the icon
  SvgComponent?: React.ElementType;  // Optional SVG component
  color?: string;  // Icon tint color
}

const CustomButtonIcon: React.FC<CustomButtonProps> = ({
  icon,
  handlePress,
  containerStyles,
  textStyles,
  isLoading = false,
  disabled = false,
  image,
  size = 24,
  SvgComponent,
  color = "#fff"
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, containerStyles, disabled || isLoading ? styles.disabled : null]} 
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : image ? (
        <Image
          source={typeof image === "string" ? { uri: image } : image}
          style={{ width: size, height: size, tintColor: color }}
          resizeMode="contain"
        />
      ) : SvgComponent ? (
        <SvgComponent width={size} height={size} color={color} />
      ) : icon ? (
        <Image
          source={icon}
          style={{ width: size, height: size, tintColor: color }}
          resizeMode="contain"
        />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F78A3F',
    height: 40,
    width: 60,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CustomButtonIcon;
