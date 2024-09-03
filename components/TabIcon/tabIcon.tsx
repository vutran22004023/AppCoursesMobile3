import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const tabIcon = ({icon, color, name, focused}: any) => {
  return (
    <View className='items-center justify-center gap-2 w-14'>
      <Image
      source={icon}
      resizeMode='contain'
      tintColor={color}
      className='w-6 h-6'
      style={{width: 24, height: 24}}
      />
      <Text className={`${focused ? 'font-psemibold': 'font-pregular'} text-[9px]`} style={{color: color}}>{name}</Text>
    </View>
  )
}

export default tabIcon

const styles = StyleSheet.create({})