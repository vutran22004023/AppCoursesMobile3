import { View, ScrollView, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Youtube } from '@/components/Common/Youtube/youtube';
import StartCourseServices from '@/apis/userCourse';
import { useMutationHook } from '@/hooks';
import { ThemedView } from '@/components/Common/ViewThemed';
import { Course } from '@/types/index';
import BottomBar from './bottomBar';
import CourseContent from './courseContent';
import { YoutubeIframeRef } from 'react-native-youtube-iframe';
import { timeStringToSeconds } from '@/libs/utils';
import InformationVideo from './informationVideo';
import OrderFeatures from './OtherFeatures';
import { useScreenDimensions } from '@/hooks/useScreenDimensions';
import { GetDetailCourses } from '@/apis/course';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomBottomSheet from '../Common/CustomBottomSheet';
import CreateNote from './OtherFeatures/createNote'
interface VideoCourseProps {
  course: Course;
}
export interface DataVideo {
  childname: string;
  createdAt: string;
  slug: string;
  status: string;
  time: string;
  updatedAt: string;
  video: string;
  _id: string;
}
const VideoCourse = ({ course }: VideoCourseProps) => {
  const { height } = useScreenDimensions();
  const [isPlaying, setIsPlaying] = useState(false);
  const youtubeRef = useRef<YoutubeIframeRef | null>(null);
  const [timeVideos, setTimeVideos] = useState<string>('');
  const user = useSelector((state: RootState) => state.user);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [dataVideo, setDataVideo] = useState<DataVideo>();
  const playbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [playbackTime, setPlaybackTime] = useState<number>(0);
  const initialActiveVideoRef = useRef<any>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number | null>(null);
  const [disableNextLesson, setDisableNextLesson] = useState<boolean>(false);
  const [roundedPercentage, setRoundedPercentage] = useState<number>(0);
  const [totalVideo, setTotalVideo] = useState<number>();
  const [totalcompletedVideo, setTotalcompletedVideo] = useState<number>();
  const [dataCourseDetail, setDataCourseDetail] = useState<any>();
  const bottomRefCreateNote = useRef<BottomSheet>(null);
  const handleModalCreateNote = () => bottomRefCreateNote.current?.expand();
  const [isOpenCreateNote, setIsOpenCreateNote] = useState(false);

  const mutationGetDetailCourse = useMutationHook(async (slug: any) => {
    try {
      const res = await GetDetailCourses(slug);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    mutationGetDetailCourse.mutate(course.slug, {
      onSuccess: (data) => {
        setDataCourseDetail(data);
      },
    });
  }, [course]);

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
          courseId: dataCourseDetail?._id,
        });
        return res.data;
      } catch (err) {
        throw new Error('Không thể truy xuất dữ liệu');
      }
    },
    enabled: Boolean(user.id && dataCourseDetail?._id),
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

  const handleVideo = (slug: string) => {
    const video = dataCourseDetail?.chapters
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
    if (dataVideo?.time && isPlaying) {
      const videoDurationInSeconds = timeStringToSeconds(dataVideo?.time);
      const halfDuration = videoDurationInSeconds / 2;
      const incrementPlaybackTime = () => {
        setPlaybackTime((prevTime) => {
          const newTime = prevTime + 1;
          if (Math.abs(newTime - halfDuration) <= 1) {
            console.log('Thành công khóa học');
            mutationUpdateCourse.mutate({
              userId: user.id,
              courseId: dataCourseDetail?._id,
              videoId: dataVideo?._id,
            });
          }
          return newTime;
        });
      };
      playbackIntervalRef.current = setInterval(incrementPlaybackTime, 1000);

      return () => {
        if (playbackIntervalRef.current) {
          clearInterval(playbackIntervalRef.current);
        }
      };
    } else {
      if (playbackIntervalRef.current) {
        clearInterval(playbackIntervalRef.current);
        playbackIntervalRef.current = null;
      }
    }
  }, [isPlaying]);

  const mergedChapters =
    dataCourseDetail?.chapters?.map((chapter: any) => {
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

  useEffect(() => {
    if(isOpenCreateNote) {
      setIsPlaying(false);
    }else {
      setIsPlaying(true);
    }
  },[isOpenCreateNote]);
  return (
    <ThemedView>
      <View className=" mb-[24px]">
        <Youtube
          youtubeRef={youtubeRef}
          isPlaying={isPlaying}
          src={dataVideo?.video as string}
          setTimeVideos={setTimeVideos}
          setIsPlaying={setIsPlaying}
        />
        <View style={{ height: height - 270 }}>
          <InformationVideo
            childname={dataVideo?.childname}
            view={dataCourseDetail?.view}
            updatedAt={dataCourseDetail?.updatedAt}
            roundedPercentage={roundedPercentage}
            totalcompletedVideo={totalcompletedVideo}
            totalVideo={totalVideo}
          />
          <OrderFeatures
            handleModalCreateNote={handleModalCreateNote}
            setIsOpenCreateNote={setIsOpenCreateNote}
          />
          <CourseContent
            mergedChapters={mergedChapters}
            activeSlug={activeSlug}
            handleVideo={handleVideo}
          />
        </View>
      </View>
      <BottomBar
        handlePreviousLesson={handlePreviousLesson}
        disableNextLesson={disableNextLesson}
        handleNextLesson={handleNextLesson}
      />
      <CustomBottomSheet
        ref={bottomRefCreateNote}
        isVisible={isOpenCreateNote}
        onClose={() => setIsOpenCreateNote(false)}>
        <CreateNote timeVideos={timeVideos}/>
      </CustomBottomSheet>
    </ThemedView>
  );
};

export default VideoCourse;
