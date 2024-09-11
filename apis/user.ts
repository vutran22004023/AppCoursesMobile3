import axios,{AxiosResponse} from 'axios';
import axiosInstance from './index'
import {
  User,
  ResetPassProps,
  StatusAuthProps,
} from "@/types/user";

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

export const ResetPass = async (
  data: ResetPassProps
): Promise<ResetPassProps> => {
  try {
    const response: AxiosResponse<ResetPassProps> = await axiosInstance.post(
      `/api/reset-password`,
      data
    );
    return response.data;
  } catch {
    throw new Error("Error login");
  }
};

export const StatusAuth = async (
  data: StatusAuthProps
): Promise<StatusAuthProps> => {
  try {
    const response: AxiosResponse<ResetPassProps> = await axiosInstance.post(
      `/api/authenticate-user`,
      data
    );
    return response.data;
  } catch {
    throw new Error("Error login");
  }
};

export const GetAllUsers = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      `/api/user/get-all-users`
    );
    return response.data;
  } catch {
    throw new Error("Error get users");
  }
};