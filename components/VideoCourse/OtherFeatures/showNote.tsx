import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import PickerSelect from '@/components/Common/CustomSelect';
import { Trash2 } from 'lucide-react-native';
import { IconButton } from '@/components/Common/Button/iconButton';
import { useMutationHook } from '@/hooks';
import { AllNote } from '@/apis/userCourse';

interface Props {
  dataVideo: any;
  dataCourseDetail: any;
  isOpenShowNote: boolean;
}
const items = [
  { label: 'Mới nhất', value: 'newest' },
  { label: 'Cũ nhất', value: 'oldest' },
];
const items1 = [
  { label: 'Chương hiện tại', value: 'current' },
  { label: 'Chương sau', value: 'next' },
];
const ShowNote = ({ dataVideo, dataCourseDetail, isOpenShowNote }: Props) => {
  const [selectedChapter, setSelectedChapter] = useState<string>('current');
  const [selectedSortOrder, setSelectedSortOrder] = useState<string>('newest');
  const [dataNote, setDataNote] = useState<any>();
  console.log(dataNote);
  const mutationAllNote = useMutationHook(async (data) => {
    try {
      const res = await AllNote(data);
      return res;
    } catch (err) {
      console.error(err);
    }
  });

  useEffect(() => {
    if (isOpenShowNote && dataCourseDetail && dataVideo) {
      mutationAllNote.mutate(
        {
          courseId: dataCourseDetail?._id,
          videoId: dataVideo?._id,
          currentChapter: selectedChapter === 'current' ? 0 : 1,
          nextChapter: selectedChapter === 'current' ? 1 : 2,
          sortOrder: selectedSortOrder,
          page: 1,
          limit: 10,
        },
        {
          onSuccess: (data) => {
            setDataNote(data);
          },
        }
      );
    }
  }, [isOpenShowNote, dataCourseDetail, dataVideo, selectedSortOrder, selectedChapter]);
  return (
    <View className="mx-2 flex-1">
      <View className="w-full flex-row items-center justify-between">
        <Text className="font-plight text-[16px] font-bold">Ghi Chú của tôi</Text>
        <View className="flex-row gap-2">
          <PickerSelect
            items={items1}
            defaultValue="current"
            onValueChange={(value) => setSelectedChapter(value)}
          />
          <PickerSelect
            items={items}
            defaultValue="newest"
            onValueChange={(value) => setSelectedSortOrder(value)}
          />
        </View>
      </View>
      <View className="mt-2 flex-1">
        <FlatList
          data={dataNote?.data}
          keyExtractor={(item) => item?._id}
          renderItem={({ item, index }) => (
            <View
              className="mb-2 w-full flex-row items-center justify-between rounded-xl border-2 border-[#fb923c] p-3"
              key={item._id}>
              <View>
                <Text className="font-pextralight text-[16px] font-extrabold text-black">
                  {item?.title}
                </Text>
                <View className="w-[80px] items-center rounded-xl bg-[#FA0303] p-3">
                  <Text className="text-white">{item?.time}</Text>
                </View>
              </View>
              <IconButton Icon={Trash2} color="#FA0303" size={20} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ShowNote;
