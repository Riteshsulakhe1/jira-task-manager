import axiosInstance from "./axios"


export const getTaskStaticProperties = () => {
    return axiosInstance.get('task/static/properties').then((res: any) => {
        return res.data;
    }).catch(err => {
        console.log('err in task statis props', err);
    });
}