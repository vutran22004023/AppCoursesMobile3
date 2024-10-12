import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Course } from '@/types';
import { ThemedView } from '../Common/ViewThemed';
import { YoutubeIframeRef } from 'react-native-youtube-iframe';
import { Youtube } from '../Common/Youtube/youtube';
import TextThemed from '../Common/TextThemed';
import { X } from 'lucide-react-native';
import { IconButton } from '@/components/Common/Button/iconButton';
import { formatCurrencyVND, formatTime, formatTimes, timeStringToSeconds } from '@/libs/utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import Accordion from '../Accordion/accordion';
import { useMutationHook } from '@/hooks';
import { CreateLinkPayOs, PaymentZalopay } from '@/apis/pay';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useLinking } from '@/hooks/useLinking';
import * as Linking from 'expo-linking';
interface Props {
  course: Course;
}

const ModalPay = ({ course }: Props) => {
  const { parseLink } = useLinking();
  const youtubeRef = useRef<YoutubeIframeRef | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeVideos, setTimeVideos] = useState<string>('');
  const user = useSelector((state: RootState) => state.user);

  const totalVideos =
    course?.chapters?.reduce((total: number, chapter: any) => {
      return total + chapter.videos.length;
    }, 0) || 0;

  const totalTime =
    course?.chapters?.reduce((total: number, chapter: any) => {
      return (
        total +
        chapter.videos.reduce((chapterTotal: number, video: any) => {
          return chapterTotal + timeStringToSeconds(video.time);
        }, 0)
      );
    }, 0) || 0;
  const formattedTime = formatTimes(totalTime);

  const mutationLinkOs = useMutationHook(async (data) => {
    try {
      const res = await CreateLinkPayOs(data);
      return res;
    } catch (err) {
      console.log('Failed to create link');
    }
  });

  const mutationLinkZaloPay = useMutationHook(async (data) => {
    try {
      const res = await PaymentZalopay(data);
      return res;
    } catch (err) {
      console.log('Failed to create link');
    }
  });

  const handPayOs = () => {
    mutationLinkOs.mutate({
      fullName: user.name,
      totalPrice: course?.priceAmount,
      buyerEmail: user.email,
    });
  };

  const handZaloPay = () => {
    mutationLinkZaloPay.mutate({
      fullName: user.name,
      totalPrice: course?.priceAmount,
      orderItem: {
        productId: course._id,
      },
    });
  };

  const { data: dataPayOs, isPending: isLoading } = mutationLinkOs;
  const { data: dataZaloPay, isPending: isLoadingZalo } = mutationLinkZaloPay;

  useEffect(() => {
    if (dataPayOs) {
        Linking.openURL(dataPayOs?.checkoutUrl);
    }
  }, [dataPayOs]);

  useEffect(() => {
    if (dataZaloPay?.return_code === 1) {
      Linking.openURL(dataZaloPay?.order_url);
    }
  }, [dataZaloPay]);
  return (
    <ScrollView>
      <ThemedView>
        <View className="my-6 mb-[24px] mt-[10px]">
          <View className="mx-2 mb-4 flex-row justify-between">
            <TextThemed type="title">Mở khóa toàn bộ khóa học</TextThemed>
            <IconButton Icon={X} onPress={() => setIsOpenModal(false)} />
          </View>
          <Youtube
            youtubeRef={youtubeRef}
            isPlaying={isPlaying}
            src={course?.video as string}
            setTimeVideos={setTimeVideos}
            setIsPlaying={setIsPlaying}
          />

          <View className="mt-3">
            <TextThemed type="subtitle">{course?.name}</TextThemed>
            <TextThemed className="mt-2 flex-row text-[#a2adbd]">
              Giá bán:
              <TextThemed className=" font-bold ">
                {formatCurrencyVND(course?.priceAmount)}
              </TextThemed>
            </TextThemed>
            <View className="mt-3 items-center">
              <TouchableOpacity
                className="mx-4 mb-3 h-[40px] w-[96%] items-center justify-center rounded-xl bg-[#F78A3F]"
                onPress={handZaloPay}>
                <Text className="text-base text-white">THANH TOÁN VỚI ZALOPAY</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="mx-4 h-[40px] w-[96%] items-center justify-center rounded-xl bg-[#F78A3F]"
                onPress={handPayOs}>
                <Text className="text-base text-white">THANH TOÁN VỚI QR</Text>
              </TouchableOpacity>
            </View>
            <View className="mx-3 mt-3">
              <View className="flex-row justify-between">
                <TextThemed type="defaultSemiBold">Nội dung bài học</TextThemed>
                <TextThemed type="defaultSemiBold">Mở rộng tất cả</TextThemed>
              </View>
              <TextThemed className="mb-3">
                {course?.chapters?.length} chương - {totalVideos} bài học - Thời lượng{' '}
                {formattedTime}
              </TextThemed>
              <SafeAreaView>
                <ScrollView>
                  {course?.chapters?.map((chapter: any, index: number) => (
                    <Accordion title={chapter.namechapter} key={chapter._id}>
                      {chapter.videos.map((video: any, vidIndex: number) => (
                        <TouchableOpacity
                          key={video._id}
                          activeOpacity={0.7}
                          className={`mb-2 flex-row rounded-md bg-gray-700 px-3 py-3`}>
                          <View className="w-[90%]">
                            <Text className="text-ml font-medium text-white">
                              {video.childname}
                            </Text>
                            <Text className="text-ml font-medium text-white">{video.time}</Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </Accordion>
                  ))}
                </ScrollView>
              </SafeAreaView>
            </View>
          </View>
        </View>
      </ThemedView>
    </ScrollView>
  );
};

export default ModalPay;

const styles = StyleSheet.create({});
