import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { icons } from '@/constants'
interface Props {
    handlePreviousLesson: (value: any) => void;
    disableNextLesson: boolean;
    handleNextLesson: (value: any) => void;
}
const bottomBar = ({handlePreviousLesson,disableNextLesson,handleNextLesson}: Props) => {
  return (
    <View className="absolute bottom-0 left-0 right-0 h-[60px] flex-row items-center justify-around border-t-2 border-[#434343] bg-primary">
    <TouchableOpacity
      className="flex-row items-center justify-center gap-2"
      onPress={handlePreviousLesson}>
      <Image
        source={icons.leftArrow}
        className="h-4 w-4"
        resizeMode="contain"
        style={{ tintColor: '#fff' }}
      />
      <Text className="text-[16px] text-white">BÀI TRƯỚC</Text>
    </TouchableOpacity>
    <TouchableOpacity
      className={`flex-row items-center justify-center gap-2 ${disableNextLesson ? 'cursor-not-allowed opacity-50 ' : ''}`}
      onPress={handleNextLesson}>
      <Text className="text-[16px] text-white">BÀI TIẾP THEO</Text>
      <Image
        source={icons.rightArrow}
        className="h-4 w-4"
        resizeMode="contain"
        style={{ tintColor: '#fff' }}
      />
    </TouchableOpacity>
  </View>
  )
}

export default bottomBar

const styles = StyleSheet.create({})