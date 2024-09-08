import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Image, Text, Alert, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FormField from '@/components/Common/FormField/formField';
import { images } from '@/constants';
import ButtonComponent from '@/components/Common/Button/button';
import { LoginService } from '@/apis/loginRegister';
import { useMutationHook } from '@/hooks';
import { ILogin } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '@/redux/Slide/userSlide';
import { store, persistor, AppDispatch, RootState } from '@/redux/store';
// import { initializeUser } from '@/contexts/private';
import TextThemed from '@/components/Common/TextThemed';
// import useNavigation from '@/hooks/useNavigation';
import { ThemedView } from '@/components/Common/ViewThemed';
import { initializeUser } from '@/contexts/private';
import { useRouter, Link } from 'expo-router';
import useToast from '@/hooks/useToast';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';

type DataLogin = {
  status?: any;
  access_Token?: string;
  message?: string;
  id?: string;
};
const index = () => {
  const { Toast, showToast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useRouter();
  const [valueLogin, setValueLogin] = useState({
    email: '',
    password: '',
  });

  const handleOnchange = (text: string, fieldName: string) => {
    setValueLogin({
      ...valueLogin,
      [fieldName]: text,
    });
  };

  const mutationLogin = useMutationHook(async (data: ILogin) => {
    const res = await LoginService(data);
    return res;
  });

  const { data: dataLogin, isPending: isLoading, isError, error } = mutationLogin;

  useEffect(() => {
    const login = async () => {
      if (dataLogin?.status === 200) {
        setValueLogin({
          email: '',
          password: '',
        });
        dispatch(
          updateUser({
            _id: (dataLogin as DataLogin).id,
            access_Token: (dataLogin as DataLogin).access_Token,
          })
        );
        showToast({ type: 'success', text: 'Bạn đã đăng nhập thành công' });
        await initializeUser(dispatch, navigation);
      } else {
        showToast({ type: 'error', text: 'Bạn đã đăng nhập thất bại' });
      }
    };
    login();
  }, [dataLogin]);

  useEffect(() => {
    const checkAuth = async () => {
      await initializeUser(dispatch, navigation);
    };
    checkAuth();
  }, [dispatch, navigation]);
  const submit = () => {
    if (!valueLogin.email || !valueLogin.password) {
      showToast({ type: 'warning', text: 'Vui lòng điền đầy đủ thông tin' });
      return;
    }
    mutationLogin.mutate(valueLogin);
  };
  return (
    <ThemedView>
      <StatusBar style="light" />
      <ScrollView>
      <Image
        className="absolute h-[400] w-full"
        source={require('@/assets/images/Background.png')}
      />
      <View className="absolute h-[225] w-full flex-row justify-around">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
          className="h-[225] w-[90]"
          source={require('@/assets/images/Light.png')}
        />
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1000).springify().damping(3)}
          className="h-[160] w-[65]"
          source={require('@/assets/images/Light.png')}
        />
      </View>
      <View className='w-full' style={{ marginTop: 240 }}>
        <View className="w-full items-center justify-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-4xl font-bold tracking-wider text-white">
            Đăng nhập
          </Animated.Text>
        </View>
        <View className="my-6 min-h-[60vh] w-full justify-center px-4">
          <Animated.View entering={FadeInDown.duration(1000).springify()}>
            <FormField
              title="Email"
              value={valueLogin.email}
              name="email"
              handleChangeText={(text) => handleOnchange(text, 'email')}
              otherStyles={`mt-7`}
              keyboardType="email-address"
              placeholder=""
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(1000).springify()}>
            <FormField
              title="Mật khẩu"
              name="password"
              value={valueLogin.password}
              handleChangeText={(text) => handleOnchange(text, 'password')}
              otherStyles={`mt-7`}
              keyboardType="default"
              placeholder=""
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(1000).springify()}>
            <ButtonComponent
              title="Đăng nhập"
              handlePress={submit}
              containerStyles={`mt-7`}
              isLoading={isLoading}
            />
          </Animated.View>
          <Animated.View  entering={FadeInDown.duration(1500).springify()} className="flex-row justify-center gap-2 pt-5">
            <TextThemed type="subtitle" className="text-lg text-gray-100">Bạn chưa có tài khoản ?</TextThemed>
            <TouchableOpacity onPress={() => navigation.push('/(auth)/(register)')}>
              <Text className="font-pregular text-lg font-bold text-secondary">Đăng kí</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
      </ScrollView>
      {Toast}
    </ThemedView>
  );
};

export default index;
