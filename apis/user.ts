import axios,{AxiosResponse} from 'axios';
import axiosInstance from './index'

export const GetDetailUser = async (id:any) => {
    try {
      const response: AxiosResponse = await axiosInstance.get(
        `user/get-detail-user/${id}`,
      );
      return response.data;
    } catch {
      throw new Error('Error get users');
    }
};