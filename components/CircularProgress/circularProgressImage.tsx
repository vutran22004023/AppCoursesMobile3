import React from 'react';
import { View, Text, Image} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const CircularProgressImage  = ({ size, width, fill, tintColorAnimated,tintColor , backgroundColor, children }:any) => {
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
        <Image source={fill} className='w-7 h-7' resizeMode='contain'/>
      )}
    </AnimatedCircularProgress>
  </View>
  )
}

export default CircularProgressImage 