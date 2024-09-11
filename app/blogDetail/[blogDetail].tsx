import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import ComeBack from '@/components/Common/Comback/comeBack';
import { ThemedView } from '@/components/Common/ViewThemed';
import { useLocalSearchParams, useRouter } from 'expo-router';
const BlogDetailScreen = () => {
  const route = useRoute();
  const { blogDetail } = useLocalSearchParams();
  console.log(blogDetail)
  return (
    <ThemedView>
      <ComeBack name="Bài viết" />
    </ThemedView>
  );
};

export default BlogDetailScreen;

const styles = StyleSheet.create({});
