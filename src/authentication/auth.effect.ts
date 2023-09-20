import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, getLoggedInUserByRefreshToken } from '../Apis/auth';
import { GetLoggedInUserBody, LoginReqBody } from '../Types/auth';

export const signin = createAsyncThunk(
    'user login',
    async (data: LoginReqBody) => await login(data)
);

export const whoIsLoggedIn = createAsyncThunk(
    'get logged in user by refresh token',
    async (data: GetLoggedInUserBody) => await getLoggedInUserByRefreshToken(data)
);