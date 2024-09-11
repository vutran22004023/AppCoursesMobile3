import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CardBlog from '@/components/Card/cardBlog';
import { blogPosts } from './data';
import TextThemed from '@/components/Common/TextThemed';
import {ThemedView} from '@/components/Common/ViewThemed'
import { useRouter } from 'expo-router';
const index = () => {
  const router = useRouter();
  const handleCardBlogPress = (item: any) => {
    router.push({
      pathname: `/blogDetail/${item}` as any,
    });
  };
  return (
    <ThemedView>
      <ScrollView>
        <FlatList
          data={blogPosts}
          keyExtractor={(item) => item?.id}
          renderItem={({ item, index }) => (
            <CardBlog blog={item} key={index} 
            onPress={() => handleCardBlogPress(item)}
             />
          )}
          ListHeaderComponent={() => (
            <View className="my-6 mb-[24px]  mt-[24px] px-4">
              <View className="mb-6 flex-row items-start">
                <View>
                  <TextThemed type="title">Bài viết nổi bật</TextThemed>
                  <TextThemed className='mt-2'>
                    Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ
                    thuật lập trình web.
                  </TextThemed>
                </View>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </ThemedView>
  )
}

export default index

const styles = StyleSheet.create({})