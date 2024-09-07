import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { formatDate } from '@/libs/utils';
import CircularProgress from '../CircularProgress/circularProgress';
import TextThemed from '../Common/TextThemed';
interface Props {
  childname?: string;
  view?: number;
  updatedAt?: string;
  roundedPercentage?: number;
  totalcompletedVideo?: number;
  totalVideo?: number;
}

const InformationVideo = ({
  childname,
  view,
  updatedAt,
  roundedPercentage,
  totalcompletedVideo,
  totalVideo,
}: Props) => {
  return (
    <View className="mx-1 flex-row justify-between">
      <View className=" mx-2 my-4 w-[70%]">
        <TextThemed type="subtitleDefault">{childname}</TextThemed>
        <View className="mt-2 flex-row gap-3">
          <TextThemed>{view} lượt xem</TextThemed>
          <TextThemed className="font-pmedium text-sm font-normal text-white">
            Cập nhập: {formatDate(updatedAt as string)}
          </TextThemed>
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
        <TextThemed style={{ marginTop: 5 }}>
          {totalcompletedVideo}/{totalVideo} bài học
        </TextThemed>
      </View>
    </View>
  );
};

export default InformationVideo;
