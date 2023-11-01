import { CreateProjectBody } from "../Types/projects";
import axiosInstance from "./axios";


export const getProjects = () => {
    return axiosInstance.get('/project').then((res: any) => {
        return res.data.projects;
    }).catch((err) => {
        console.log('err in projects', err);
        return err;
    });
};

export const createProject = (body: CreateProjectBody) => {
    return axiosInstance.post('/project', body).then((res: any) => {
        return res.data;
    }).catch((err) => {
        throw new Error(err.response.data.message);
    });
}