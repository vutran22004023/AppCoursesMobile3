import { Tabs } from 'expo-router';

import useHideTabBar from '@/hooks/useHideTabBar';
const TabsBottom = () => {
  const hideTabBar = useHideTabBar();
  return (
    <Tabs
      initialRouteName={'index'}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
      <Tabs.Screen
        name="(Setting)/index"
        options={{
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
    </Tabs>
  );
};

export default TabsBottom;
