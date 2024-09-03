import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextThemed from '../TextThemed'

const InfoBox = ({title, subtitle, containerStyles, titleStyles,lightColor,darkColor}: any) => {
  return (
    <View className={containerStyles}>
      <TextThemed className={`text-white text-center font-psemibold ${titleStyles}`}>{title}</TextThemed>
      <TextThemed className='text-center'>{subtitle}</TextThemed>
    </View>
  )
}

export default InfoBox

const styles = StyleSheet.create({})