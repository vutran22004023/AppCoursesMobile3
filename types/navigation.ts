import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    Home: undefined;
    LoginScreens: undefined;
    RegisterScreens: undefined;
    VideoCourse: undefined;
    SettingScreen: undefined;
    BlogDetailScreen: { blogDetail: any };
    SearchScreen: {search: any};
  };
  
  export type NavigationProps<T extends keyof RootStackParamList> = {
    navigation: StackNavigationProp<RootStackParamList, T>;
  };