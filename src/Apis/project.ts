import axiosInstance from "./axios";


export const getProjects = () => {
    return axiosInstance.get('/project').then((res: any) => {
        return res.data.projects;
    }).catch((err) => {
        console.log('err in projects', err);
        return err;
    });
}