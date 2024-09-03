import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const CircularProgress  = ({ size, width, fill, tintColorAnimated,tintColor , backgroundColor, children }:any) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    <AnimatedCircularProgress
      size={size}
      width={width}
      fill={fill}
      tintColor={tintColor}
      backgroundColor={backgroundColor}
    >
      {() => (
        <Text className={`text-[13px] text-secondary `}>
          {fill}%
        </Text>
      )}
    </AnimatedCircularProgress>
  </View>
  )
}

export default CircularProgress 