import { FlatList, Image, RefreshControl, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { images } from '@/constants';
import SearchInput from '@/components/SearchInput/searchInput';
import Trending from '@/components/Trending/trending';
import EmptyState from '@/components/Common/EmptyState/emptyState';
import { GetAllCourses, GetDetailCoursesNotLogin } from '@/apis/course';
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
import { CircleChevronRight, BadgeCheck, Play } from 'lucide-react-native';
import { data, blogPosts } from './data';
import { useScreenDimensions } from '@/hooks/useScreenDimensions';
import { CheckPaidCourse } from '@/apis/pay';
import { Course } from '@/types';
import ModalPay from '@/components/ModalPay';

const index = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { height: HEIGHT_SCREEN } = useScreenDimensions();
  const refreshAllCourse = async () => {
    try {
      const res = await GetAllCourses();
      return res?.data;
    } catch (e) {
      console.log(e);
    }
  };

  const { data: dataAllCourses, isPending: __isPendingState } = useQuery({
    queryKey: ['dataAllCourses'],
    queryFn: refreshAllCourse,
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModalPay = () => {
    setIsOpenModal(!isOpenModal);
  };

  const onGestureEvent = ({ nativeEvent }: any) => {
    if (nativeEvent.translationY > 100) {
      setModalVisible(false);
      setIsOpenModal(false);
    }
  };

  const onHandlerStateChange = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END && nativeEvent.translationY > 100) {
      setModalVisible(false);
      setIsOpenModal(false);
    }
  };

  const handleCardPress = (course: any) => {
    setSelectedCourse(course);
    toggleModal();
  };

  const dataCourseFree = dataAllCourses?.filter((course: any) => course.price === 'free') || [];

  const dataCoursePaid = dataAllCourses?.filter((course: any) => course.price === 'paid') || [];

  const handleIsModal = async (course: Course) => {
    try {
      const res = await CheckPaidCourse(course._id);
      if (res) {
        handleCardPress(course);
      }
    } catch (error) {
      try {
        const res = await GetDetailCoursesNotLogin(course.slug);
        setSelectedCourse(res.data);
        setIsOpenModal(true);
      } catch (err) {
        console.error('Error fetching course details:', err);
      }
    }
  };

  useEffect(() => {
    if (isOpenModal === false) {
      setSelectedCourse(null);
    }
  }, [isOpenModal]);

  return (
    <ThemedView>
      <ScrollView>
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
                <Image
                  source={require('@/assets/logo/brain.png')}
                  style={{ width: 50, height: 50 }}
                  resizeMode="stretch"
                />
              </View>
            </View>
            <SearchInput />
          </View>
          <View className=" pb-1 pt-5">
            <Trending />
          </View>
        </View>

        <View>
          <View className=" mx-5 mb-3 flex-row items-center gap-3">
            <TextThemed type="title">Tiếp tục xem khóa học</TextThemed>
            <CircleChevronRight color="#F78A3F" size={24} />
          </View>
          <FlatList
            data={dataAllCourses}
            keyExtractor={(item) => item?._id?.toString()}
            renderItem={({ item, index }) => (
              <View key={index}>
                <CardCourse course={item} onPress={() => handleCardPress(item)} />
              </View>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View>
          <View className=" mx-5 mb-3 flex-row items-center gap-3">
            <TextThemed type="title">khóa học free</TextThemed>
            <CircleChevronRight color="#F78A3F" size={24} />
          </View>
          <FlatList
            data={dataCourseFree}
            keyExtractor={(item) => item?._id?.toString()}
            renderItem={({ item, index }) => (
              <View key={index}>
                <CardCourse course={item} onPress={() => handleCardPress(item)} />
              </View>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          <View className=" mx-5 mb-3 flex-row items-center gap-3">
            <TextThemed type="title">khóa học pro</TextThemed>
            <CircleChevronRight color="#F78A3F" size={24} />
          </View>
          <FlatList
            data={dataCoursePaid}
            keyExtractor={(item) => item?._id?.toString()}
            renderItem={({ item, index }) => (
              <View key={index}>
                <CardCourse course={item} onPress={() => handleIsModal(item)} />
              </View>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View className="mb-5">
          <View className=" mx-5 mb-3 flex-row items-center gap-3">
            <TextThemed type="title">Tác giả</TextThemed>
            <CircleChevronRight color="#F78A3F" size={24} />
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item?.id?.toString()}
            renderItem={({ item, index }) => (
              <View key={index} style={{ marginRight: 10, alignItems: 'center' }}>
                <Image
                  source={item.avatar}
                  style={{ width: 75, height: 75, borderRadius: 1000 }}
                  resizeMode="cover"
                />
                <TextThemed className="mt-2">{item.name}</TextThemed>
              </View>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View className="mb-5">
          <View className=" mx-5 mb-3 flex-row items-center gap-3">
            <TextThemed type="title">Bài viết đáng chú ý</TextThemed>
            <CircleChevronRight color="#F78A3F" size={24} />
          </View>
          {blogPosts.map((items, index) => (
            <View key={index} className="mb-3 flex-row gap-3">
              <Image
                source={images.logoSmall}
                style={{ width: 120, height: 120, borderRadius: 10 }}
                resizeMode="cover"
              />
              <View style={{ flex: 1 }}>
                <TextThemed type="subtitle">{items.title}</TextThemed>
                <TextThemed>
                  {items.content.length > 70 ? `${items.content.slice(0, 50)}...` : items.content}
                </TextThemed>
                <View className="mr-2x flex-row items-center justify-between">
                  <View className="mt-2 flex-row items-center gap-2">
                    <BadgeCheck color="#F78A3F" size={24} />
                    <TextThemed>Hôm nay</TextThemed>
                    <View className="h-2 w-2 rounded-full bg-white" />
                    <TextThemed>23 min</TextThemed>
                  </View>
                  <Play color="#F78A3F" size={24} />
                </View>
              </View>
            </View>
          ))}
        </View>

        <Modal
          isVisible={isModalVisible}
          swipeDirection={['down', 'left', 'right']}
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

        <Modal
          isVisible={isOpenModal}
          swipeDirection={['down', 'left', 'right']}
          onSwipeComplete={toggleModalPay}
          style={{ justifyContent: 'flex-end', margin: 0 }}>
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}>
            <View style={{ height: '100%' }}>
              {selectedCourse && <ModalPay course={selectedCourse} setIsOpenModal={setIsOpenModal} />}
            </View>
          </PanGestureHandler>
        </Modal>
      </ScrollView>
    </ThemedView>
  );
};

export default index;
