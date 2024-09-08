import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { images } from '@/constants';
import { useColorScheme } from 'react-native';
const EmptyState = ({ title, subTilte }: any) => {
  const colorScheme = useColorScheme();
  return (
    <View className="mb-[24px] mt-[24px] items-center justify-center px-4">
      <Image
        source={colorScheme === 'dark' ? images.empty : require('@/assets/images/empty1.jpg')}
        className="h-[215px] w-[270px]"
        resizeMode="contain"
      />
      <Text className="mb-2 text-center font-psemibold text-2xl text-white">{subTilte}</Text>
      <Text className="font-pmedium text-sm text-gray-100">{title}</Text>
    </View>
  );
};

export default EmptyState;
