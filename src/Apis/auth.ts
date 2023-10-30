import axiosInstance from "./axios";
import { LoginReqBody, GetLoggedInUserBody, LogoutRequest, UserDetailsBody } from '../Types/auth';
import { GenericAbortSignal } from "axios";

export const login = async (data: LoginReqBody) => {
    return axiosInstance.post('/auth/login', data).then(result => {
        return result.data;
    }).catch(err => {
        console.log('err', err);
        throw new Error(err.response.data.message);
    });
};

export const getLoggedInUserByRefreshToken = async (body: GetLoggedInUserBody, signal?: GenericAbortSignal) => {
    return axiosInstance.post('/auth/get-logged-in-user', body, { signal }).then(result => {
        return result.data;
    }).catch(err => {
        return err;
    });
};

export const createOrg = async (body: any) => {
    return axiosInstance.post('/org/create', body).then(result => {
        return result.data;
    }).catch(err => {
        return err;
    });
};

export const register = async (body: UserDetailsBody) => {
    return axiosInstance.post('/auth/register', body).then(result => {
        return result.data;
    }).catch(err => {
        console.log('err', err);
        throw new Error(err.response.data.message);
    });
};

export const logout = async (body: LogoutRequest) => {
    return axiosInstance.post('/auth/logout', body).then(result => {
        return result.data;
    }).catch(err => {
        console.log('err', err);
        return err.response.data;
    });
};