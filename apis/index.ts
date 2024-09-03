import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getTokenFrom } from '@/Utils/tokenUtils';
const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://192.168.1.6:3002/api/',
    timeout: 5000
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const tokenCookies = await getTokenFrom();
      if (tokenCookies) {
        config.headers.token = `Bearer ${tokenCookies}`;
      }else {
        console.log('Token không có')
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
