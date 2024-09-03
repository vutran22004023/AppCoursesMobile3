import {
    FlatList,
    Image,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
  } from 'react-native';
  import React, { useState } from 'react';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import CustomButtonIcon from '@/components/Common/Button/buttonIcon';
  import { useNavigation } from '@react-navigation/native';
  import { icons } from '@/constants';
  import ComeBack from '@/components/Common/Comback/comeBack';
  import ModalComponent from '@/components/Common/Modal/modal';
  import FormField from '@/components/Common/FormField/formField';
  import ButtonComponent from '@/components/Common/Button/button';
  import { ThemedView } from '@/components/Common/ViewThemed';
const index = () => {
    const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <ThemedView>
      <ComeBack name="Cài đặt" />
      <ScrollView>
        <View className="mx-2">
          <View>
            <Text className="font-pmedium text-2xl text-white">Thông tin cá nhân</Text>
            <Text className="text-sm text-white ">Quản lý thông tin của bạn</Text>
          </View>

          <View className="mx-2 mb-3 mt-4 rounded-md bg-black-100 p-2">
            <View className="mb-4">
              <Text className="font-pmedium text-xl text-white">Thông tin cơ bản</Text>
              <Text className="text-sm text-white ">
                Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn
              </Text>
            </View>

            <View>
              <TouchableOpacity
                className="mb-2 w-full flex-row items-center justify-between rounded-md bg-slate-600 p-3 px-4"
                activeOpacity={0.7}
                onPress={toggleModal}>
                <View>
                  <Text className="text-xl text-white">Họ và tên</Text>
                  <Text className="text-white">Trần Lê Vũ</Text>
                </View>
                <View>
                  <Image
                    source={icons.rightArrow}
                    style={{ tintColor: 'fff' }}
                    className="h- w-5"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className="mb-2 w-full flex-row items-center justify-between rounded-md bg-slate-600 p-3 px-4"
                activeOpacity={0.7}>
                <View>
                  <Text className="text-xl text-white">Tên người dùng</Text>
                  <Text className="text-white">nhattandn204</Text>
                </View>
                <View>
                  <Image
                    source={icons.rightArrow}
                    style={{ tintColor: 'fff' }}
                    className="h- w-5"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className="mb-2 w-full flex-row items-center justify-between rounded-md bg-slate-600 p-3 px-4"
                activeOpacity={0.7}>
                <View>
                  <Text className="text-xl text-white">Giới thiệu</Text>
                  <Text className="text-white">Chưa cập nhập</Text>
                </View>
                <View>
                  <Image
                    source={icons.rightArrow}
                    style={{ tintColor: 'fff' }}
                    className="h- w-5"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mx-2 mb-3 mt-4 rounded-md bg-black-100 p-5">
            <View className="mb-4">
              <Text className="font-pmedium text-xl text-white">Thông tin mạng xã hội</Text>
              <Text className="text-sm text-white ">
                Quản lý liên kết tới các trang mạng xã hội của bạn
              </Text>
            </View>

            <View>
              <TouchableOpacity
                className="mb-2 w-full flex-row items-center justify-between rounded-md bg-slate-600 p-3 px-4"
                activeOpacity={0.7}>
                <View>
                  <Text className="text-xl text-white">GitHub</Text>
                  <Text className="text-white">Trần Lê Vũ</Text>
                </View>
                <View>
                  <Image
                    source={icons.rightArrow}
                    style={{ tintColor: 'fff' }}
                    className="h- w-5"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className="mb-2 w-full flex-row items-center justify-between rounded-md bg-slate-600 p-3 px-4"
                activeOpacity={0.7}>
                <View>
                  <Text className="text-xl text-white">Họ và tên</Text>
                  <Text className="text-white">Trần Lê Vũ</Text>
                </View>
                <View>
                  <Image
                    source={icons.rightArrow}
                    style={{ tintColor: 'fff' }}
                    className="h- w-5"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className="mb-2 w-full flex-row items-center justify-between rounded-md bg-slate-600 p-3 px-4"
                activeOpacity={0.7}>
                <View>
                  <Text className="text-xl text-white">Họ và tên</Text>
                  <Text className="text-white">Trần Lê Vũ</Text>
                </View>
                <View>
                  <Image
                    source={icons.rightArrow}
                    style={{ tintColor: 'fff' }}
                    className="h- w-5"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Modal */}
      <ModalComponent
        isVisible={isModalVisible}
        onClose={toggleModal}
        title="Cập nhật tên của bạn"
        titleSmail="Tên sẽ được hiển thị trên trang cá nhân, trong các bình luận và bài viết của bạn">
        {/* <FormField
            title="Email"
            // value={valueLogin.email}
            name="email"
            // handleChangeText={(text) => handleOnchange(text, 'email')}
            otherStyles={`mb-3`}
            keyboardType="email-address"
            placeholder=""
          />
          <FormField
            title="Email"
            // value={valueLogin.email}
            name="email"
            // handleChangeText={(text) => handleOnchange(text, 'email')}
            otherStyles={`mb-2`}
            keyboardType="email-address"
            placeholder=""
          /> */}
        <View>
          <ButtonComponent
            title="Submit"
            // handlePress={submit}
            containerStyles={`mt-2`}
            // isLoading={isLoading || isButtonDisabled}
          />
        </View>
      </ModalComponent>
    </ThemedView>
  )
}

export default index

const styles = StyleSheet.create({})