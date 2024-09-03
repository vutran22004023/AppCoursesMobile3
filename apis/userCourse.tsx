import axios, { AxiosResponse } from 'axios';
import axiosInstance from './index'

const StartCourse = async(data: any) => {
    try{
        const response: AxiosResponse = await axiosInstance.post(`user-course/start-course`, data);
        return response.data;
    }catch {
        throw new Error('Error get all courses');
    }
}

const UpdateUserCourse = async(data: any) => {
    try{
        const response: AxiosResponse = await axiosInstance.post(`user-course/update-progress`, data);
        return response.data;
    }catch {
        throw new Error('Error get all courses');
    }
}
 
export default {
    StartCourse,
    UpdateUserCourse
}