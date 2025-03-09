import axios from 'axios';
import { REFRESH_TOKENS_URL } from '../Types/auth';
import { RouteKeys } from '../navigation/routekeys';
import { refreshAuthentication } from './auth';

const DEV_URL = 'http://localhost:3001/v1';
// const PROD_URL = 'https://task-manager-nodejs-xhzl.onrender.com/v1';

const axiosInstance = axios.create({
    baseURL: DEV_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials: true
});
export default axiosInstance;

export const setAuthHeader = (token: string) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const resetAuthHeader = () => {
    axiosInstance.defaults.headers.common['Authorization'] = '';
};

// INTERCEPTOR =>Refresh auth on access token expire
(function registerAPIResponseInterceptor() {
    axiosInstance.interceptors.response.use((response) => (
        response
    ), async (error) => {
        const originalRequest = error.config;
        if (originalRequest.url !== REFRESH_TOKENS_URL) {
            const tokenString = localStorage.getItem('st') || '';
            const tokens = tokenString ? JSON.parse(tokenString) : {};
            if (tokens?.refresh) {
                const data = await refreshAuthentication({ refreshToken: tokens.refresh.token });
                localStorage.setItem('st', JSON.stringify(data));
                setAuthHeader(data.access.token);
                originalRequest.headers['Authorization'] = `Bearer ${data.access.token}`
                return axiosInstance(originalRequest);
            } else {
                window.location.href = RouteKeys.login;
            }
        } else {
            window.location.href = RouteKeys.login;
        }
    });
})();

