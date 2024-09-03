import '@/global.css';
import 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { useColorScheme,StyleSheet } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, persistor, AppDispatch, RootState } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initializeUser } from '@/contexts/private';
import { useRouter } from 'expo-router';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      initializeUser(dispatch, navigation); // Make sure you call the function
    };
    checkAuth();
  }, [dispatch]);

  return <>{children}</>;
};

export default function Layout() {
  const queryClient = new QueryClient();
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
  });
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
    async function unlockOrientation() {
      await ScreenOrientation.unlockAsync();
    }
    unlockOrientation();
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <AuthProvider>
                <Stack initialRouteName="index">
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                  <Stack.Screen name="+not-found" />
                </Stack>
              </AuthProvider>
            </ThemeProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});
