import { Task } from "../Types/common";
import { CreateTaskReqBody } from "../Types/task";
import axiosInstance from "./axios"

export const getTaskStaticProperties = () => {
    return axiosInstance.get('task/static/properties').then((res: any) => {
        return res.data;
    }).catch(err => {
        console.log('err in task statis props', err);
    });
};

export const createTask = (body: CreateTaskReqBody) => {
    return axiosInstance.post('/task', body).then((res: any) => {
        return res.data;
    }).catch(err => {
        console.log('err in create task', err);
    });
};

export const updateTaskById = (body: Partial<Task>) => {
    const url = `/task/${body.id}`;
    delete body.id;
    return axiosInstance.put(url, body).then((res: any) => {
        return res.data;
    }).catch(err => {
        console.log('err in update task', err);
    });
};