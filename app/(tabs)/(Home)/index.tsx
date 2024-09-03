import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import SearchInput from '@/components/SearchInput/searchInput';
import Trending from '@/components/Trending/trending';
import EmptyState from '@/components/Common/EmptyState/emptyState';
import { GetAllCourses } from '@/apis/course';
import { useQuery } from '@tanstack/react-query';
import CardCourse from '@/components/Card/card';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import VideoCourse from '@/components/VideoCourse';
import { ThemedView } from '@/components/Common/ViewThemed';
import TextThemed from '@/components/Common/TextThemed';
const index = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const onRefresh = async () => {
    setRefreshing(true);
    refreshAllCourse();
    setRefreshing(false);
  };
  const refreshAllCourse = async () => {
    try {
      const res = await GetAllCourses();
      return res?.data;
    } catch (e) {
      console.log(e);
    }
  };

  const { data: dataAllCourses, isPending: __isPendingState } = useQuery({
    queryKey: ['dataCouse'],
    queryFn: refreshAllCourse,
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onGestureEvent = ({ nativeEvent }: any) => {
    if (nativeEvent.translationY > 100) {
      setModalVisible(false);
    }
  };

  const onHandlerStateChange = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END && nativeEvent.translationY > 100) {
      setModalVisible(false);
    }
  };

  const handleCardPress = (course: any) => {
    setSelectedCourse(course);
    toggleModal();
  };

  return (
    <ThemedView>
      <FlatList
        data={dataAllCourses}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item, index }) => (
            <CardCourse course={item} onPress={() => handleCardPress(item)} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 mb-[24px] mt-[24px]">
            <View className="mx-4">
              <View className="mb-6 flex-row items-start justify-between">
                <View>
                  <TextThemed>Chào mừng bạn !!</TextThemed>
                  <TextThemed type="title" className="font-psemibol">
                    {user.name}
                  </TextThemed>
                </View>
                <View className="mt-1.5">
                  <Image source={images.logoSmall} className="h-10 w-9" resizeMode="contain" />
                </View>
              </View>
              <SearchInput />
            </View>
            <View className=" pb-8 pt-5">
              <Trending />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="Không có khóa học" subTilte="Hiện tại ko có khóa học này" />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      <Modal
        isVisible={isModalVisible}
        swipeDirection={['down']}
        onSwipeComplete={toggleModal}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        propagateSwipe>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}>
          <View style={{ height: '100%' }}>
            {selectedCourse && <VideoCourse course={selectedCourse} />}
          </View>
        </PanGestureHandler>
      </Modal>
    </ThemedView>
  );
};

export default index;

const styles = StyleSheet.create({});
