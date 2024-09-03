
import axios,{ AxiosResponse } from 'axios';
import axiosInstance from './index'
const GetAllCourses = async() => {
    try{
        const response: AxiosResponse = await axiosInstance.get(`course/all-courses`);
        return response.data;
    }catch {
        throw new Error('Error get all courses');
    }
}

const GetSearchCourses = async(search: string) => {
    try{
        const response: AxiosResponse = await axiosInstance.get(`course/all-courses?filter=name:${search}`);
        return response.data;
    }catch {
        throw new Error('Error get all courses');
    }
}

const GetDetailCourses = async(slug: any) => {
    try{
        const response: AxiosResponse = await axiosInstance.get(`course/detail-courses/${slug}`);
        return response.data;
    }catch {
        throw new Error('Error login detail course');
    }
  }

export  {
    GetAllCourses,
    GetDetailCourses,
    GetSearchCourses
}