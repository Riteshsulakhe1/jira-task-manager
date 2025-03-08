import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, getLoggedInUserByRefreshToken, register } from '../Apis/auth';
import { GetLoggedInUserBody, LoginReqBody, UserDetailsBody } from '../Types/auth';

export const signin = createAsyncThunk(
    'user login',
    async (data: LoginReqBody) => await login(data),
);

export const whoIsLoggedIn = createAsyncThunk(
    'get logged in user by refresh token',
    async (data: GetLoggedInUserBody) => await getLoggedInUserByRefreshToken(data)
);

export const registerEffect = createAsyncThunk(
    'register user',
    async (data: UserDetailsBody) => await register(data)
);