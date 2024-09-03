import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {images} from '@/constants'
import CustomButton from '../Button/button'
const EmptyState = ({title, subTilte}: any) => {
  return (
    <View className='justify-center items-center px-4 mt-[24px] mb-[24px]'>
      <Image source={images.empty} className='w-[270px] h-[215px]' resizeMode='contain'/>
        <Text className='text-2xl font-psemibold text-white text-center mb-2'>{subTilte}</Text>
        <Text className='font-pmedium text-sm text-gray-100'>{title}</Text>
    </View>
  )
}

export default EmptyState