import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { icons } from '@/constants';
import TabIcon from '@/components/TabIcon/tabIcon';
import useHideTabBar from '@/hooks/useHideTabBar';
const TabsBottom = () => {
  const hideTabBar = useHideTabBar();
  return (
    <Tabs
      initialRouteName={'(Home)/index'}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: '#ffA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          minHeight: 60,
          display: hideTabBar ? 'none' : 'flex',
        },
      }}>
      <Tabs.Screen
        name="(Home)/index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              icon={icons.home}
              focused={focused}
              color={color}
              size={size}
              name="Trang chủ"
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="(Course)/index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              icon={icons.course}
              focused={focused}
              color={color}
              size={size}
              name="Khóa học"
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="(Blog)/index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              icon={icons.blog}
              focused={focused}
              color={color}
              size={size}
              name="Bài Viết"
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="(Profile)"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              icon={icons.profile}
              focused={focused}
              color={color}
              size={size}
              name="Cá nhân"
            />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tabs>
  );
};

export default TabsBottom;
