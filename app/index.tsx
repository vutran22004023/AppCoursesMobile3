import { StyleSheet, Text, View, ScrollView, Image, StatusBar } from 'react-native';
import React from 'react';
import { images } from '@/constants';
import ButtonComponment from '@/components/Common/Button/button';
// import { useNavigation } from '@react-navigation/native';
import TextThemed from '@/components/Common/TextThemed';
import { ThemedView } from '@/components/Common/ViewThemed';
import { useRouter } from 'expo-router';
const index = () => {
  const router = useRouter();
  return (
    <ThemedView style={{ alignItems: 'center' }}>
      <ScrollView>
        <View className="h-full w-full items-center justify-center px-4">
          <Image source={images.logo} className="h-[84px] w-[130px]" resizeMode="contain" />
          <Image
            source={images.cards}
            className="h-[300px] w-full max-w-[380px]"
            resizeMode="contain"
          />
          <View>
            <TextThemed type="header" className="text-center">
              Discover Endless Possibilities with <Text className="text-[#eec10c]">Aora</Text>
            </TextThemed>
          </View>

          <TextThemed className="text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with
            Aora
          </TextThemed>

          <ButtonComponment
            title="Continue with Email"
            handlePress={() => router.push('/(auth)/(login)')}
            textStyles=""
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
    </ThemedView>
  )
}

export default index

const styles = StyleSheet.create({})