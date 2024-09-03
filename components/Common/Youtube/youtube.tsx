import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState, useRef } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useDispatch } from 'react-redux';
import { timeVideos } from '@/redux/Slide/timeVideoSide';

interface YouTubeComponentProps {
  src: string;
  style?: object;
}

const extractVideoId = (url: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|youtube.com\/shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const VideoYoutubeComponent: React.FC<YouTubeComponentProps> = ({ src, style }) => {
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const videoId = extractVideoId(src);
  const playerRef = useRef<any>(null);

  const onStateChange = useCallback(async (state: string) => {
    if (state === 'playing') {
      setIsPlaying(true);
      dispatch(timeVideos({ isPlaying: true }));
    }
    if (state === 'paused' || state === 'ended') {
      if (playerRef.current) {
        const time = await playerRef.current.getCurrentTime();
        setCurrentTime(time);
        dispatch(timeVideos({ time: formatTime(time), isPlaying: false }));
      }
      setIsPlaying(false);
      dispatch(timeVideos({ isPlaying: false }));
    }
  }, [dispatch]);

  if (!videoId) {
    return <Text>Invalid YouTube URL</Text>;
  }

  return (
    <View style={style}>
      <YoutubePlayer
        height={200}
        play={isPlaying}
        videoId={videoId}
        ref={playerRef}
        onChangeState={onStateChange}
      />
    </View>
  );
};

export default VideoYoutubeComponent;

const styles = StyleSheet.create({});
