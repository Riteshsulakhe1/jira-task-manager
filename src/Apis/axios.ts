import axios from 'axios';

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