import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  id: '',
  name: "",
  email: "",
  avatar: "",
  isAdmin: false,
  status: false,
  password: '',
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, { payload }) => {
      const { name, email, access_Token, avatar, _id, isAdmin, status } = payload;
      state.name = name || "";
      state.email = email || "";
      state.avatar = avatar || "";
      state.id = _id || '';
      state.isAdmin = isAdmin || false;
      state.status = status || false;
      state.password = 'not password';

      if (access_Token) {
        setToken(access_Token);
      }
    },
    resetUser: (state) => {
      Object.assign(state, initialState);
      removeToken(); 
    },
  },
});

const setToken = async(token: string) => {
  await AsyncStorage.setItem('accessToken', token);
};

const removeToken = async () => {
  await AsyncStorage.removeItem('accessToken');
};

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;