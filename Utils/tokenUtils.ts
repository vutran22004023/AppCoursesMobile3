// src/services/tokenUtils.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

export const getTokenFrom = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return token;
  } catch (error) {
    console.error('Error getting token from storage:', error);
    return null;
  }
};

export const setToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('accessToken', token);
  } catch (error) {
    console.error('Error setting token:', error);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken: { exp?: number } = jwtDecode(token);
    if (!decodedToken.exp) {
      return true;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  } catch (e) {
    console.error('Failed to decode token', e);
    return true;
  }
};
