import { useRoute } from '@react-navigation/native';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images, icons } from '@/constants';
import EmptyState from '@/components/Common/EmptyState/emptyState';
import { useQuery } from '@tanstack/react-query';
import CardCourse from '@/components/Card/card';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import WebViewPlayer from '@/components/Common/Youtube/youtube';
import Accordion from '@/components/Accordion/accordion';
import { ScrollView } from 'react-native-gesture-handler';
import CircularProgress from '@/components/CircularProgress/circularProgress';
import { formatDate } from '@/libs/utils';
import StartCourseServices from '@/apis/userCourse';
import { useMutationHook } from '@/hooks';
// import { startPlayback, } from "@/redux/Slide/playbackSlice";
import { ThemedView } from '@/components/Common/ViewThemed';
interface VideoModalComponentProps {
  isVisible: boolean;
  onClose: () => void;
}
interface VideoCourseProps {
  course: any;
}
const VideoCourse = ({ course }: VideoCourseProps) => {
  const timeVideo = useSelector((state: RootState) => state.timesVideo);
  console.log(timeVideo);
  const user = useSelector((state: RootState) => state.user);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [dataVideo, setDataVideo] = useState();
  const dispatch = useDispatch();
  const playbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [playbackTime, setPlaybackTime] = useState<number>(0);
  const initialActiveVideoRef = useRef<any>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number | null>(null);
  const [disableNextLesson, setDisableNextLesson] = useState<any>();
  const [roundedPercentage, setRoundedPercentage] = useState<number>();
  const [totalVideo, setTotalVideo] = useState<number>();
  const [totalcompletedVideo, setTotalcompletedVideo] = useState<number>();
  const mutationUpdateCourse = useMutationHook(async (data) => {
    try {
      const res = await StartCourseServices.UpdateUserCourse(data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  });
  const { data: dataStateCourses, isLoading } = useQuery({
    queryKey: ['dataLUserCouse'],
    queryFn: async () => {
      try {
        const res = await StartCourseServices.StartCourse({
          userId: user.id,
          courseId: course?._id,
        });
        return res.data;
      } catch (err) {
        throw new Error('Không thể truy xuất dữ liệu');
      }
    },
    enabled: Boolean(user.id && course?._id),
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (dataStateCourses) {
      let total = 0;
      let completed = 0;
      dataStateCourses.chapters?.forEach((chapter: any) => {
        chapter.videos?.forEach((video: any) => {
          total += 1;
          if (video.status === 'completed') {
            completed += 1;
          }
        });
      });

      // Tính phần trăm hoàn thành
      const percentage = total > 0 ? (completed / total) * 100 : 0;
      const roundedPercentage = Math.round(percentage);
      setRoundedPercentage(roundedPercentage);
      setTotalVideo(total);
      setTotalcompletedVideo(completed);
    }
  }, [dataStateCourses]);

  const handleVideo = (slug: any) => {
    const video = course?.chapters
      ?.flatMap((chapter: any) => chapter.videos)
      .find((video: any) => video.slug === slug);
    setDataVideo(video);
    setActiveSlug(slug);
    if (playbackIntervalRef.current) {
      clearInterval(playbackIntervalRef.current);
      playbackIntervalRef.current = null;
    }
  };

  useEffect(() => {
    if (timeVideo.isPlaying === true) {
      // dispatch(startPlayback(dataVideo, user, course));
    } else {
      // dispatch(stopPlayback());
    }
  }, [timeVideo.isPlaying]);

  const mergedChapters =
    course?.chapters?.map((chapter: any) => {
      const userChapter = dataStateCourses?.chapters?.find((c: any) => {
        return c.chapterId === chapter._id;
      });
      if (userChapter) {
        return {
          ...chapter,
          videos: chapter.videos.map((video: any) => {
            const userVideo = userChapter.videos.find((v: any) => v.videoId === video._id);
            return {
              ...video,
              status: userVideo?.status,
            };
          }),
        };
      }
      return chapter;
    }) || [];

  useEffect(() => {
    if (mergedChapters && mergedChapters.length > 0 && !initialActiveVideoRef.current) {
      let inProgressVideo = null;
      let chapterIndex = null;

      // Loop through each chapter to find the in-progress video
      for (let i = 0; i < mergedChapters.length; i++) {
        const chapter = mergedChapters[i];
        if (chapter.videos) {
          inProgressVideo = chapter.videos.find((video: any) => video.status === 'in_progress');
          if (inProgressVideo) {
            chapterIndex = i;
            break; // Stop searching once the in-progress video is found
          }
        }
      }

      if (inProgressVideo) {
        initialActiveVideoRef.current = inProgressVideo; // Store the initially active video
        setDataVideo(inProgressVideo);
        setActiveSlug(inProgressVideo.slug);
        setActiveChapterIndex(chapterIndex); // Set the active chapter index
      }
    }
  }, [mergedChapters]);

  const handlePreviousLesson = () => {
    if (activeChapterIndex !== null && activeSlug !== null) {
      const currentChapter = mergedChapters[activeChapterIndex];
      const currentIndex = currentChapter.videos.findIndex(
        (video: any) => video.slug === activeSlug
      );

      if (currentIndex > 0) {
        const previousVideo = currentChapter.videos[currentIndex - 1];
        setActiveSlug(previousVideo.slug);
        setDataVideo(previousVideo);
        setDisableNextLesson(false);
      } else if (activeChapterIndex > 0) {
        const previousChapter = mergedChapters[activeChapterIndex - 1];
        const lastVideoOfPreviousChapter =
          previousChapter.videos[previousChapter.videos.length - 1];
        setActiveChapterIndex(activeChapterIndex - 1);
        setActiveSlug(lastVideoOfPreviousChapter.slug);
        setDataVideo(lastVideoOfPreviousChapter);
        setDisableNextLesson(false);
      }
    }
  };

  const handleNextLesson = () => {
    if (activeChapterIndex !== null && activeSlug !== null) {
      const currentChapter = mergedChapters[activeChapterIndex];
      const currentIndex = currentChapter.videos.findIndex(
        (video: any) => video.slug === activeSlug
      );

      // Find the next playable video
      let nextVideoIndex = currentIndex + 1;
      while (nextVideoIndex < currentChapter.videos.length) {
        const nextVideo = currentChapter.videos[nextVideoIndex];
        if (nextVideo.status !== 'not_started') {
          setActiveSlug(nextVideo.slug);
          setDataVideo(nextVideo);
          setDisableNextLesson(false); // Enable the button
          return; // Exit the function after setting the next playable video
        }
        nextVideoIndex++;
      }

      // If no playable video found in current chapter, move to next chapter
      if (activeChapterIndex < mergedChapters.length - 1) {
        let nextChapterIndex = activeChapterIndex + 1;
        while (nextChapterIndex < mergedChapters.length) {
          const nextChapter = mergedChapters[nextChapterIndex];
          const firstVideoOfNextChapter = nextChapter.videos[0];
          if (firstVideoOfNextChapter.status !== 'not_started') {
            setActiveChapterIndex(nextChapterIndex);
            setActiveSlug(firstVideoOfNextChapter.slug);
            setDataVideo(firstVideoOfNextChapter);
            setDisableNextLesson(false); // Enable the button
            return; // Exit the function after setting the first playable video of next chapter
          }
          nextChapterIndex++;
        }
      }

      // If all next videos are not started, disable the button
      setDisableNextLesson(true);
    }
  };
  return (
    <ThemedView>
      <FlatList
        // data={[{id: 1}, {id: 2},{id: 3}, {id: 4}]}
        // data={datasearchCourses}
        data={[]}
        keyExtractor={(item) => item?.id}
        renderItem={({ item, index }) => <></>}
        ListHeaderComponent={() => (
          <View className="my-6 mb-[24px] mt-[10px] ">
            <WebViewPlayer src={dataVideo?.video} />
            <View className="mx-1 flex-row justify-between">
              <View className=" mx-2 my-4 w-[70%]">
                <Text className="font-pmedium text-xl font-extrabold text-white">
                  {dataVideo?.childname}
                </Text>
                <View className="mt-2 flex-row gap-3">
                  <Text className="font-pmedium text-sm font-normal text-white ">
                    {course?.view} lượt xem
                  </Text>
                  <Text className="font-pmedium text-sm font-normal text-white ">
                    Cập nhập: {formatDate(course?.updatedAt)}
                  </Text>
                </View>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                <CircularProgress
                  size={45}
                  width={5}
                  fill={roundedPercentage}
                  tintColor="blue"
                  backgroundColor="#e0e0e0"
                />
                <Text className="mt-1 text-sm text-white">
                  {totalcompletedVideo}/{totalVideo} bài học
                </Text>
              </View>
            </View>
            <View className="mx-3 my-4 flex-row justify-between">
              <View></View>
              <View className="flex-row items-center justify-center gap-10">
                <TouchableOpacity activeOpacity={0.7} className="items-center justify-center">
                  <Image
                    source={icons.blog}
                    className="h-8 w-8"
                    resizeMode="contain"
                    style={{ tintColor: '#fff' }}
                  />
                  <Text className="mt-1 text-sm text-white">Thêm ghi chú</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} className="items-center justify-center">
                  <Image
                    source={icons.blogme}
                    className="h-8 w-8"
                    resizeMode="contain"
                    style={{ tintColor: '#fff' }}
                  />
                  <Text className="mt-1 text-sm text-white">Chú thích</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} className="items-center justify-center">
                  <Image
                    source={icons.bookmark}
                    className="h-8 w-8"
                    resizeMode="contain"
                    style={{ tintColor: '#fff' }}
                  />
                  <Text className="mt-1 text-sm text-white">Hướng dẫn</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text className="mb-2 text-xl font-black text-white">Nội dung khóa học</Text>
              <SafeAreaView>
                <ScrollView>
                  {mergedChapters?.map((chapter: any, index: number) => (
                    <Accordion title={chapter.namechapter}>
                      {chapter.videos.map((video: any, vidIndex: number) => (
                        <TouchableOpacity
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
                            <Text className="text-ml font-medium text-white">
                              {video.childname}
                            </Text>
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
          </View>
        )}
      />
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
    </ThemedView>
  );
};

export default VideoCourse;
