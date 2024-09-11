import React, { forwardRef } from 'react';
import { View, type ViewProps, Dimensions } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export const ThemedView = forwardRef<View, ThemedViewProps>(
  ({ style, lightColor, darkColor, ...otherProps }, ref) => {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
    const height = Dimensions.get('window').height;
    
    return (
      <SafeAreaView 
        ref={ref}
        style={[{ backgroundColor }, style, { flex: 1, height }]} 
        {...otherProps} 
      />
    );
  }
);
