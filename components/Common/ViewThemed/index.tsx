import { View, type ViewProps, Dimensions } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SafeAreaView } from 'react-native-safe-area-context';
export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const height = Dimensions.get('window').height;
  return <SafeAreaView style={[{ backgroundColor }, style, {flex: 1, height: height }]} {...otherProps}/>;
}
