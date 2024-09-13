
import { AppDispatch, store } from '@/redux/store';
import { resetUser, updateUser } from '@/redux/Slide/userSlide';
import { GetDetailUser } from '@/apis/user';
import {getTokenFrom,setToken , removeToken,isTokenExpired} from '@/Utils/tokenUtils'

export const initializeUser = async (dispatch: AppDispatch,navigation: any) => {
  const token = await getTokenFrom();  // Await the token retrieval

  const state = store.getState();
  const id = state.user.id;
  if (token) {
    if (isTokenExpired(token)) {
      dispatch(resetUser());
      await removeToken();  // Remove expired token
      navigation.replace('/(auth)')
    } else {
      try {
        const response = await GetDetailUser(id);
        if (response.status === 200) {
          dispatch(
            updateUser({
              name: response.data.name || '',
              email: response.data.email || '',
              avatar: response.data.avatar || '',
              _id: response.data._id || '',
              isAdmin: response.data.isAdmin || false,
              status: response.data.status || false,
            })
          );
          navigation.replace('/(tabs)/(Home)');
        }
      } catch (error) {
        console.error('Failed to authenticate user', error);
      }
    }
  } else {
    dispatch(resetUser()); 
    navigation.replace('/(auth)')
  }
};
