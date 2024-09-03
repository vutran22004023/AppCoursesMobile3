import { Image, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {icons} from '@/constants'
import { useThemeColor } from '@/hooks/useThemeColor';
interface Prop {
    lightColor?:string;
    darkColor?: string;
}
const CardCourse = ({course: {name, image, slug,price,totalVideos,totalTime,view},onPress,lightColor,darkColor}: any ) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  return (
    <TouchableOpacity className='flex-col items-center px-4 mb-14' onPress={onPress} activeOpacity={0.7}>
    <View className='flex-row gap-3 items-start'>
        <View className='flex-1 rounded-2xl border border-secondary overflow-hidden'>
            <View className='w-full h-[150px] justify-center items-center'>
                <Image source={{ uri: image }} className='w-full h-full' resizeMode='cover' />
            </View>
            <View className='p-5 bg-black-200 w-full'>
                <Text className='text-white font-psemibold text-ml mb-1'>{name}</Text>
                <Text className='text-white font-psemibold text-sm'>{price === 'free' ? 'Miễn Phí': 'Trả phí'}</Text>
                <View className='flex-row gap-4 items-start mt-2 '>
                    <View className='justify-center items-center flex-row gap-1'>
                        <Image source={icons.users} className='w-7 h-7 ' resizeMode='contain' style={{ tintColor: '#FFA500' }} />
                        <Text className='text-white'>{view}</Text>
                    </View>
                    <View className='justify-center items-center flex-row gap-1'>
                        <Image source={icons.play} className='w-7 h-7 ' resizeMode='contain' style={{ tintColor: '#FFA500' }} />
                        <Text className='text-white'>{totalVideos}</Text>
                    </View>
                    <View className='justify-center items-center flex-row gap-1'>
                        <Image source={icons.clock} className='w-7 h-7 ' resizeMode='contain' style={{ tintColor: '#FFA500' }} />
                        <Text className='text-white'>{totalTime}</Text>
                    </View>
                </View>
            </View>
        </View>
    </View>
</TouchableOpacity>
  )
}

export default CardCourse

const styles = StyleSheet.create({})