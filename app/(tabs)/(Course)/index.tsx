import {
    FlatList,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { icons, images } from '@/constants';
  import CircularProgress from '@/components/CircularProgress/circularProgressImage';
  import CustomButton from '@/components/Common/Button/button';
  import { ThemedView } from '@/components/Common/ViewThemed';
  import TextThemed from '@/components/Common/TextThemed';
const index = () => {
  return (
    <ThemedView>
    <ScrollView>
      <View className="my-6 mb-[24px]  mt-[24px] px-4">
        <View className="mb-6 flex-row items-start">
          <View>
            <TextThemed type="title">Lộ trình học</TextThemed>
            <TextThemed className='mt-2'>
              Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học. Ví dụ: Để đi
              làm với vị trí "Lập trình viên Front-end" bạn nên tập trung vào lộ trình
              "Front-end".
            </TextThemed>
          </View>
        </View>

        <View className="mx-2 mb-3 mt-4 rounded-md bg-black-100 p-5">
          <View className="flex-row justify-between">
            <View className="mb-4 w-[70%]">
              <Text className="font-pmedium text-xl text-white">Lộ trình học Font - End</Text>
              <Text className="text-sm text-white ">
                Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần này
                F8 sẽ chia sẻ cho bạn lộ trình để trở thành lập trình viên Front-end nhé.
              </Text>
            </View>
            <View className="w-[30%] items-center">
              <Image
                source={images.fontend}
                className="h-[100px] w-[100px]"
                resizeMode="contain"
              />
            </View>
          </View>
          <View className="mt-2 flex-row gap-4">
            <CircularProgress
              size={45}
              width={5}
              fill={images.html}
              tintColor="blue"
              backgroundColor="#e0e0e0"
            />
            <CircularProgress
              size={45}
              width={5}
              fill={images.js}
              tintColor="blue"
              backgroundColor="#e0e0e0"
            />
            <CircularProgress
              size={45}
              width={5}
              fill={images.react}
              tintColor="blue"
              backgroundColor="#e0e0e0"
            />
            <CircularProgress
              size={45}
              width={5}
              fill={images.responsive}
              tintColor="blue"
              backgroundColor="#e0e0e0"
            />
          </View>
          <View className="mt-5">
            <CustomButton title="Xem chi tiết" />
          </View>
        </View>

        <View className="mx-2 mb-3 mt-4 rounded-md bg-black-100 p-5">
          <View className="flex-row justify-between">
            <View className="mb-4 w-[70%]">
              <Text className="font-pmedium text-xl text-white">Lộ trình học Back - End</Text>
              <Text className="text-sm text-white ">
                Trái với Front-end thì lập trình viên Back-end là người làm việc với dữ liệu, công
                việc thường nặng tính logic hơn. Chúng ta sẽ cùng tìm hiểu thêm về lộ trình học
                Back-end nhé.
              </Text>
            </View>
            <View className="w-[30%] items-center">
              <Image
                source={images.backend}
                className="h-[100px] w-[100px]"
                resizeMode="contain"
              />
            </View>
          </View>
          <View className="mt-2 flex-row gap-4">
            <CircularProgress
              size={45}
              width={5}
              fill={images.react}
              tintColor="blue"
              backgroundColor="#e0e0e0"
            />
            <CircularProgress
              size={45}
              width={5}
              fill={images.react}
              tintColor="blue"
              backgroundColor="#e0e0e0"
            />
            <CircularProgress
              size={45}
              width={5}
              fill={images.react}
              tintColor="blue"
              backgroundColor="#e0e0e0"
            />
            <CircularProgress
              size={45}
              width={5}
              fill={images.react}
              tintColor="blue"
              backgroundColor="#e0e0e0"
            />
            <CircularProgress
              size={45}
              width={5}
              fill={images.react}
              tintColor="blue"
              backgroundColor="#e0e0e0"
            />
          </View>
          <View className="mt-5">
            <CustomButton title="Xem chi tiết" />
          </View>
        </View>

        <View className="mx-2 mb-3 mt-4 rounded-md bg-black-100 p-5">
          <View className="flex-row justify-between">
            <View className="mb-4 w-[70%]">
              <Text className="font-pmedium text-xl text-white">
                Tham gia cộng đồng học viên F8 trên Facebook
              </Text>
              <Text className="text-sm text-white ">
                Hàng nghìn người khác đang học lộ trình giống như bạn. Hãy tham gia hỏi đáp, chia
                sẻ và hỗ trợ nhau trong quá trình học nhé.
              </Text>
            </View>
            <View className="w-[30%] items-center">
              <Image
                source={images.fbgroup}
                className="h-[100px] w-[100px]"
                resizeMode="contain"
              />
            </View>
          </View>
          <View className="mt-5">
            <CustomButton title="Tham gia nhóm" />
          </View>
        </View>
      </View>
    </ScrollView>
  </ThemedView>
  )
}

export default index

const styles = StyleSheet.create({})