import { Dimensions, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";
import {formatTime} from '@/libs/utils'
interface YouTubeProps {
  src: string;
  isPlaying?: boolean;
  isMuting?: boolean;
  youtubeRef?: React.MutableRefObject<YoutubeIframeRef | null>;
  setTimeVideos: (time: any) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

const width = Dimensions.get("screen").width;

const extractVideoId = (url: string): string | null => {
  if (!url) return null;
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|youtube.com\/shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export const Youtube = ({
  src,
  isPlaying,
  isMuting,
  youtubeRef,
  setTimeVideos,
  setIsPlaying,
}: YouTubeProps) => {
  const videoId = extractVideoId(src);
  const isFirstPlayRef = useRef(false);
  const [_, forceUpdate] = useState({});
  const triggerUpdate = () => forceUpdate({});
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isFirstPlayRef.current) {
      const timer = setTimeout(() => {
        isFirstPlayRef.current = false;
        triggerUpdate();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isFirstPlayRef.current]);

  const onStateChange = async (event: string) => {
    if (event === 'playing') {
      if (!intervalId) {
        const id = setInterval(async () => {
          if (youtubeRef?.current) {
            const time = await youtubeRef.current.getCurrentTime();
            const formatTimeVideo = formatTime(time);
            setTimeVideos(formatTimeVideo);
            setIsPlaying(true)
          }
        }, 1000); 
        setIntervalId(id);
      }
    } else if (event === 'paused') {
      setIsPlaying(false)
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  };

  if (!videoId) {
    return <Text>Invalid YouTube URL</Text>;
  }

  return (
    <View style={{ width: width }}>
      <YoutubePlayer
        ref={youtubeRef}
        height={200}
        play={isFirstPlayRef.current || isPlaying}
        mute={true}
        videoId={videoId}
        onReady={() => {
          isFirstPlayRef.current = true;
          triggerUpdate();
        }}
        onChangeState={onStateChange}
      />
    </View>
  );
};
