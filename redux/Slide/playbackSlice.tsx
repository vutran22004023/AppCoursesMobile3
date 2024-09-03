// playbackSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import StartCourseServices from '@/apis/userCourse';

interface PlaybackState {
  playbackTime: number;
  intervalId: NodeJS.Timeout | null;
}

const initialState: PlaybackState = {
  playbackTime: 0,
  intervalId: null,
};

const playbackSlice = createSlice({
  name: 'playback',
  initialState,
  reducers: {
    setPlaybackTime: (state, action: PayloadAction<number>) => {
      state.playbackTime = action.payload;
    },
    setIntervalId: (state, action: PayloadAction<NodeJS.Timeout | null>) => {
      state.intervalId = action.payload;
    },
    resetPlaybackTime: (state) => {
      state.playbackTime = 0;
    },
  },
});

export const { setPlaybackTime, setIntervalId, resetPlaybackTime } = playbackSlice.actions;

export const startPlayback = (dataVideo: any, user: any, course: any): AppThunk => (dispatch, getState) => {
  const timeStringToSeconds = (timeString: string) => {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  if (dataVideo?.time) {
    const videoDurationInSeconds = timeStringToSeconds(dataVideo.time);
    const halfDuration = videoDurationInSeconds / 2;
    const incrementPlaybackTime = () => {
      dispatch(setPlaybackTime(getState().playback.playbackTime + 1));
      const newTime = getState().playback.playbackTime + 1; // Increment the playback time
      if (Math.abs(newTime - halfDuration) <= 1) {
        console.log('Thành công khóa học');
        -+
        StartCourseServices.UpdateUserCourse({
          userId: user.id,
          courseId: course?._id,
          videoId: dataVideo?._id,
        });
      }
    };

    const intervalId = setInterval(incrementPlaybackTime, 1000);
    dispatch(setIntervalId(intervalId));
  }
};

// export const stopPlayback = (): AppThunk => (dispatch, getState) => {
//   const intervalId = getState().playback.intervalId;
//   if (intervalId) {
//     clearInterval(intervalId);
//     dispatch(setIntervalId(null));
//     dispatch(resetPlaybackTime());
//   }
// };

export default playbackSlice.reducer;
