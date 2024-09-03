import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButtonIcon from '@/components/Common/Button/buttonIcon'
import { icons } from '@/constants'
import { useNavigation } from '@react-navigation/native'
import TextThemed from '../TextThemed'

interface Props {
    name: string
}
const ComeBack = ({name}: Props) => {
    const navigation = useNavigation()
  return (
    <View className=' mt-[20px] '>
    <View className=' flex-row mb-6 px-4 gap-5 items-center'>
        <CustomButtonIcon icon={icons.left} handlePress={() => navigation.goBack()}/>
        <View className='mr-3'>
            <TextThemed type="subtitle">{name}</TextThemed>
        </View>
    </View>
    <View className='w-full h-[1px] bg-orange-400'></View>
</View>
  )
}

export default ComeBack

const styles = StyleSheet.create({})