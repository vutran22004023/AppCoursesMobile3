import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Image, Text, Alert, TouchableOpacity } from 'react-native';
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
import { useRouter,Link } from 'expo-router';
import useToast from '@/hooks/useToast';

type DataLogin = {
  status?: any;
  access_Token?: string;
  message?: string;
  id?: string;
};
const index = () => {
  const { Toast,showToast } = useToast();
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
        showToast({ type: 'success', text: 'Bạn đã đăng nhập thành công' })
        await initializeUser(dispatch, navigation);
      }else {
        showToast({ type: 'error', text: 'Bạn đã đăng nhập thất bại' })
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
      showToast({ type: 'warning', text: 'Vui lòng điền đầy đủ thông tin' })
      return;
    }
    mutationLogin.mutate(valueLogin);
  };
  return (
    <ThemedView>
      <ScrollView>
        <View className="my-6 min-h-[85vh] w-full justify-center px-4">
          <Image source={images.logo} resizeMode="contain" className="h-[84px] w-[130px]" />
          <TextThemed type="title"> Đăng nhập</TextThemed>

          <FormField
            title="Email"
            value={valueLogin.email}
            name="email"
            handleChangeText={(text) => handleOnchange(text, 'email')}
            otherStyles={`mt-7`}
            keyboardType="email-address"
            placeholder=""
          />

          <FormField
            title="Mật khẩu"
            name="password"
            value={valueLogin.password}
            handleChangeText={(text) => handleOnchange(text, 'password')}
            otherStyles={`mt-7`}
            keyboardType="default"
            placeholder=""
          />

          <ButtonComponent
            title="Đăng nhập"
            handlePress={submit}
            containerStyles={`mt-7`}
            isLoading={isLoading}
          />

          <View className="flex-row justify-center gap-2 pt-5">
            <TextThemed className="text-lg text-gray-100">Bạn chưa có tài khoản ?</TextThemed>
            <TouchableOpacity onPress={() => navigation.push('/(auth)/(register)')}>
              <Text className="text-secondary text-lg font-bold font-pregular">
                Đăng kí
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
        {Toast}
    </ThemedView>
  )
}

export default index
