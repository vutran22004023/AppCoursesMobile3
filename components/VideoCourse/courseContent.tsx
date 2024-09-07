import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Accordion from '../Accordion/accordion';
import { icons } from '@/constants';
import TextThemed from '../Common/TextThemed';
interface Props {
  mergedChapters: any;
  activeSlug: string | null;
  handleVideo: (slug: string) => void;
}
const CourseContent = ({ handleVideo, activeSlug, mergedChapters }: Props) => {
  return (
    <View>
      <TextThemed className="mb-2 text-xl font-black text-white">Nội dung khóa học</TextThemed>
      <SafeAreaView>
        <ScrollView>
          {mergedChapters?.map((chapter: any, index: number) => (
            <Accordion title={chapter.namechapter} key={chapter._id}>
              {chapter.videos.map((video: any, vidIndex: number) => (
                <TouchableOpacity
                  key={video._id}
                  className={`mb-2 flex-row rounded-md bg-gray-700 px-3 py-3
                ${video.slug === activeSlug ? 'bg-slate-600' : ''}
                ${video.status === 'not_started' ? 'cursor-not-allowed' : 'cursor-pointer'}
                ${video.status === 'not_started' ? '' : 'hover:bg-slate-300'}
                ${video.status === 'not_started' ? 'bg-slate-500' : ''}
                `}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (video.status !== 'not_started') {
                      handleVideo(video?.slug);
                    }
                  }}>
                  <View className="w-[90%]">
                    <Text className="text-ml font-medium text-white">{video.childname}</Text>
                    <Text className="text-ml font-medium text-white">{video.time}</Text>
                  </View>
                  <View className="w-[10%] items-center justify-center">
                    {video.status === 'not_started' ? (
                      <View className="mr-3 flex justify-between">
                        <View></View>
                        <Image
                          source={icons.lock}
                          className="h-10 w-10"
                          resizeMode="contain"
                          style={{ tintColor: '#fff' }}
                        />
                      </View>
                    ) : video.status === 'completed' ? (
                      <View className=" flex justify-between text-center">
                        <View></View>
                        <Image
                          source={icons.circle_Check}
                          className="h-10 w-10"
                          resizeMode="contain"
                          style={{ tintColor: '#3ea717' }}
                        />
                      </View>
                    ) : (
                      []
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </Accordion>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default CourseContent;

const styles = StyleSheet.create({});
