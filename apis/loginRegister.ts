
import axios from 'axios';
import { ILogin, IRegister } from '@/types';
import axiosInstance from './index'
const LoginService = async(data : ILogin)=> {
    try {
        const res = await axiosInstance.post(`login-in`, data)
        return res?.data
    }catch (e) {
        console.log(e);
    }
}

const RegisterService = async(data: IRegister) => {
    try {
        const res= await axiosInstance.post(`register`, data)
        return res?.data
    }catch (err) {
        console.log(err);
    }
}

export  {
    LoginService,
    RegisterService
}