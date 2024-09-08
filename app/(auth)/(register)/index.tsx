import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Image, Text, Alert, TouchableOpacity } from 'react-native';
import FormField from '@/components/Common/FormField/formField';
import { images } from '@/constants';
import ButtonComponent from '@/components/Common/Button/button';
import { useMutationHook } from '@/hooks';
import { IRegister } from '@/types';
import { RegisterService } from '@/apis/loginRegister';
import { ThemedView } from '@/components/Common/ViewThemed';
import { useRouter } from 'expo-router';
import TextThemed from '@/components/Common/TextThemed';
import useToast from '@/hooks/useToast';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut,createAnimatedPropAdapter  } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
const index = () => {
  const { Toast, showToast } = useToast();
  const navigation = useRouter();
  const [valueRegister, setValueRegister] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleOnchange = (text: string, fieldName: string) => {
    setValueRegister({
      ...valueRegister,
      [fieldName]: text,
    });
  };

  // Function to check if the input is a valid email format
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Function to check if password meets the criteria
  const isValidPassword = (password: string): boolean => {
    // Password must be at least 6 characters, contain special character, and have at least one uppercase letter
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  // Function to check if password matches confirmPassword
  const passwordsMatch = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
  };

  const mutationRegister = useMutationHook(async (data: IRegister) => {
    const res = await RegisterService(data);
    return res;
  });

  const { data: dataRegister, isPending: isLoading, isError, error } = mutationRegister;

  useEffect(() => {
    if (dataRegister?.status === 200) {
      setValueRegister({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  }, [dataRegister]);

  const submit = () => {
    if (
      !valueRegister.name ||
      !valueRegister.email ||
      !valueRegister.password ||
      !valueRegister.confirmPassword
    ) {
      showToast({ type: 'warning', text: 'Vui lòng điền đầy đủ thông tin' });
      return;
    }

    if (!isValidEmail(valueRegister.email)) {
      showToast({ type: 'warning', text: 'Email không hợp lệ' });
      return;
    }

    if (!isValidPassword(valueRegister.password)) {
      showToast({
        type: 'warning',
        text: 'Mật khẩu không hợp lệ. Mật khẩu phải có ít nhất 6 ký tự, bao gồm ít nhất một ký tự đặc biệt và một ký tự viết hoa.',
      });
      return;
    }

    if (!passwordsMatch(valueRegister.password, valueRegister.confirmPassword)) {
      showToast({ type: 'warning', text: 'Mật khẩu và xác nhận mật khẩu không khớp.' });
      return;
    }
    mutationRegister.mutate(valueRegister);
  };
  return (
    <ThemedView>
      {/* <StatusBar style="light" /> */}
      <ScrollView>
        <Image
          className="absolute h-[300] w-full"
          source={require('@/assets/images/Background.png')}
        />
        <View className="absolute  w-full flex-row justify-around top-[-20px]">
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
        <View className="w-full" style={{ marginTop: 320 }}>
          <View className="w-full items-center justify-center">
            <Animated.View
              entering={FadeInUp.duration(1000).springify()}
              >
              <TextThemed type='header' className="tracking-wider">Đăng ký</TextThemed>
            </Animated.View>
          </View>
          <View className="my-6 min-h-[60vh] w-full justify-center px-4">
            <Animated.View entering={FadeInDown.duration(1000).springify()}>
              <FormField
                title="Họ và tên"
                value={valueRegister.name}
                name="name"
                handleChangeText={(text) => handleOnchange(text, 'name')}
                otherStyles={`mt-7`}
                keyboardType="name-address"
                placeholder=""
              />
            </Animated.View>
            <Animated.View entering={FadeInDown.duration(1000).springify()}>
              <FormField
                title="Email"
                value={valueRegister.email}
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
                value={valueRegister.password}
                handleChangeText={(text) => handleOnchange(text, 'password')}
                otherStyles={`mt-7`}
                keyboardType="password-address"
                placeholder=""
              />
            </Animated.View>
            <Animated.View entering={FadeInDown.duration(1000).springify()}>
              <FormField
                title="Xác nhận mật khẩu"
                name="confirmPassword"
                value={valueRegister.confirmPassword}
                handleChangeText={(text) => handleOnchange(text, 'confirmPassword')}
                otherStyles={`mt-7`}
                keyboardType="confirmPassword-address"
                placeholder=""
              />
            </Animated.View>
            <Animated.View entering={FadeInDown.duration(1000).springify()}>
              <ButtonComponent
                title="Đăng kí"
                handlePress={submit}
                containerStyles={`mt-7`}
                isLoading={isLoading}
              />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.duration(1500).springify()}
              className="flex-row justify-center gap-2 pt-5">
              <TextThemed type="subtitle">Bạn đã có tài khoản ?</TextThemed>
              <TouchableOpacity onPress={() => navigation.push('/(auth)/(login)')}>
                <Text className="text-lg font-semibold text-secondary">Đăng nhập</Text>
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
