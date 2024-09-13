import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButtonIcon from '@/components/Common/Button/buttonIcon';
import { useNavigation } from '@react-navigation/native';
import { icons } from '@/constants';
import ComeBack from '@/components/Common/Comback/comeBack';
import ModalComponent from '@/components/Common/Modal/modal';
import FormField from '@/components/Common/FormField/formField';
import ButtonComponent from '@/components/Common/Button/button';
import { ThemedView } from '@/components/Common/ViewThemed';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; // Đảm bảo đường dẫn chính xác
import { UpdateUser } from '@/apis/user';

const UserProfile = () => {
  const userFromStore = useSelector((state: RootState) => state.user);
  const [user, setUser] = useState(userFromStore); // Initialize state with user from store
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setUser(userFromStore); // Sync state with Redux store on mount
  }, [userFromStore]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleUpdateUser = async (userData) => {
    try {
      await UpdateUser(user._id, userData); // Gọi API cập nhật user
      Alert.alert('Success', 'Cập nhật thành công!');
      setModalVisible(false); // Đóng modal sau khi cập nhật thành công
      // Cập nhật thông tin người dùng sau khi cập nhật thành công
    } catch (error) {
      console.error('Error updating user:', error);
      Alert.alert('Success', 'Cập nhật thành công.');
    }
  };

  return (
    <ThemedView>
      <ComeBack name="Cài đặt" />
      <ScrollView>
        <View className="mx-2 my-3">
          <View>
            <Text className="font-pmedium text-2xl text-white">Thông tin cá nhân</Text>
            <Text className="text-sm text-white">Quản lý thông tin của bạn</Text>
          </View>

          <View className="mx-2 mb-3 mt-4 rounded-md bg-black-100 p-2">
            <View className="mb-4">
              <Text className="font-pmedium text-xl text-white">Thông tin cơ bản</Text>
              <Text className="text-sm text-white">Quản lý tên hiển thị, tên người dùng và avatar của bạn</Text>
            </View>

            <View>
              {user && (
                <TouchableOpacity
                  className="mb-2 w-full flex-row items-center justify-between rounded-md bg-slate-600 p-3 px-4"
                  onPress={toggleModal} // Mở modal để chỉnh sửa thông tin user
                >
                  <View>
                    <Text className="text-xl text-white">Username</Text>
                    <Text className="text-white">{user.name}</Text>
</View>
                  <View>
                    <Image
                      source={icons.rightArrow}
                      style={{ tintColor: 'white' }}
                      className="w-5 h-5"
                    />
                  </View>
                </TouchableOpacity>
              )}
              {user && (
                <TouchableOpacity
                  className="mb-2 w-full flex-row items-center justify-between rounded-md bg-slate-600 p-3 px-4"
                  activeOpacity={0.7}
                >
                  <View>
                    <Text className="text-xl text-white">Email</Text>
                    <Text className="text-white">{user.email}</Text>
                  </View>
                  <View>
                    <Image
                      source={icons.rightArrow}
                      style={{ tintColor: 'white' }}
                      className="w-5 h-5"
                    />
                  </View>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                className="mb-2 w-full flex-row items-center justify-between rounded-md bg-slate-600 p-3 px-4"
                activeOpacity={0.7}
              >
                <View>
                  <Text className="text-xl text-white">Giới thiệu</Text>
                  <Text className="text-white">Chưa cập nhập</Text>
                </View>
                <View>
                  <Image
                    source={icons.rightArrow}
                    style={{ tintColor: 'white' }}
                    className="w-5 h-5"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mx-2 mb-3 mt-4 rounded-md bg-black-100 p-5">
            <View className="mb-4">
              <Text className="font-pmedium text-xl text-white">Thông tin mạng xã hội</Text>
              <Text className="text-sm text-white">Quản lý liên kết tới các trang mạng xã hội của bạn</Text>
            </View>

            <View>
              <TouchableOpacity
                className="mb-2 w-full flex-row items-center justify-between rounded-md bg-slate-600 p-3 px-4"
                activeOpacity={0.7}
              >
                <View>
                  <Text className="text-xl text-white">GitHub</Text>
                  <Text className="text-white">aaa</Text>
                </View>
                <View>
                  <Image
                    source={icons.rightArrow}
                    style={{ tintColor: 'white' }}
                    className="w-5 h-5"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className="mb-2 w-full flex-row items-center justify-between rounded-md bg-slate-600 p-3 px-4"
                activeOpacity={0.7}
              >
                <View>
<Text className="text-xl text-white">Họ và tên</Text>
                  <Text className="text-white">aaa</Text>
                </View>
                <View>
                  <Image
                    source={icons.rightArrow}
                    style={{ tintColor: 'white' }}
                    className="w-5 h-5"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className="mb-2 w-full flex-row items-center justify-between rounded-md bg-slate-600 p-3 px-4"
                activeOpacity={0.7}
              >
                <View>
                  <Text className="text-xl text-white">Họ và tên</Text>
                  <Text className="text-white">ccc</Text>
                </View>
                <View>
                  <Image
                    source={icons.rightArrow}
                    style={{ tintColor: 'white' }}
                    className="w-5 h-5"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {user && (
        <ModalComponent
          isVisible={isModalVisible}
          onClose={toggleModal}
          title="Cập nhật thông tin cá nhân"
          titleSmail="Cập nhật tên và email của bạn"
        >
          <FormField
            title="Họ và tên"
            name="name"
            value={user.name}
            handleChangeText={(text) => setUser({ ...user, name: text })} // Cập nhật state khi người dùng chỉnh sửa
            otherStyles="mb-3"
            placeholder="Nhập tên người dùng"
          />
          <FormField
            title="Email"
            name="email"
            value={user.email}
            handleChangeText={(text) => setUser({ ...user, email: text })} // Cập nhật state khi người dùng chỉnh sửa
            otherStyles="mb-2"
            keyboardType="email-address"
            placeholder="Nhập email"
          />
          <ButtonComponent
            title="Lưu thay đổi"
            handlePress={() => handleUpdateUser(user)} // Gọi hàm update user
            containerStyles="mt-2"
          />
        </ModalComponent>
      )}
    </ThemedView>
  );
};

export default UserProfile;