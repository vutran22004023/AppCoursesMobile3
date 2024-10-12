import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import { icons } from '@/constants';
import { IconButton } from '@/components/Common/Button/iconButton';
import TextThemed from '@/components/Common/TextThemed';
import { useThemeColor } from '@/hooks/useThemeColor';
const LIGHTCOLOR = '#000';
const DARKCOLOR = '#fff';
interface Props {
  handleModalCreateNote: any;
  setIsOpenCreateNote: (value: boolean) => void;
}
const index = ({handleModalCreateNote,setIsOpenCreateNote}: Props) => {
  const icon = useThemeColor({ light: LIGHTCOLOR, dark: DARKCOLOR }, 'icon');
  const handleCreateNote = () => {
    handleModalCreateNote();
    setIsOpenCreateNote(true);
  }

  return (
    <>
      <View className="mx-3 my-4 flex-row justify-between">
        <View></View>
        <View className="flex-row items-center justify-center gap-5">
          <TouchableOpacity activeOpacity={0.7} className="items-center justify-center" onPress={handleCreateNote}>
            <IconButton image={icons.blog} color={icon} size={20} onPress={handleCreateNote}/>
            <TextThemed style={{ fontSize: 10 }}>Thêm ghi chú</TextThemed>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} className="items-center justify-center">
            <IconButton image={icons.blogme} color={icon} size={20} />
            <TextThemed style={{ fontSize: 10 }} className="mt-1">
              Chú thích
            </TextThemed>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} className="items-center justify-center">
            <IconButton image={icons.bookmark} color={icon} size={20} />
            <TextThemed style={{ fontSize: 10 }} className="mt-1">
              Hướng dẫn
            </TextThemed>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default index;
