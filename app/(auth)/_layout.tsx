import { Tabs } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { useSegments } from 'expo-router';
import useHideTabBar from '@/hooks/useHideTabBar';
const TabsBottom = () => {
  const hideTabBar = useHideTabBar();
  return (
    <Tabs screenOptions={{ headerShown: false ,tabBarStyle: { width: '100%', backgroundColor: 'transparent' }}}>
      <Tabs.Screen
        name="(login)/index"
        options={{
          tabBarStyle: {
            display: hideTabBar ? "none" : "flex",
          },
        }}
      />
      <Tabs.Screen
        name="(register)/index"
        options={{
          tabBarStyle: {
            display: hideTabBar ? "none" : "flex",
          },
        }}
      />
    </Tabs>
  );
};

export default TabsBottom;
