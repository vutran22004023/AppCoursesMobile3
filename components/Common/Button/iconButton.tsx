import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  Image,
  StyleSheet,
} from "react-native";
import Svg from "react-native-svg";

interface ButtonProps extends TouchableOpacityProps {
  size?: number;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  Icon?: React.ElementType;
  color?: string;
  image?: ReturnType<typeof require> | string;
  SvgComponent?: React.ElementType;
}

export const IconButton: React.FC<ButtonProps> = ({
  size = 24,
  disabled = false,
  loading = false,
  onPress,
  style,
  Icon,
  color = "#76C824",
  image,
  SvgComponent,
}) => {
  const buttonStyles = [disabled && styles.disabled, style];
  
  return (
    <TouchableOpacity
      style={buttonStyles as ViewStyle}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : image ? (
        <Image
          source={typeof image === "string" ? { uri: image } : image}
          style={{ width: size, height: size, tintColor: color }}
        />
      ) : Icon ? (
        <Icon width={size} height={size} color={color} />
      ) : SvgComponent ? (
        <SvgComponent width={size} height={size} color={color} />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});
