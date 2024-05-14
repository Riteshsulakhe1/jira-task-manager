import { Task } from "../Types/common";
import { CreateTaskReqBody, UpdateTaskStatusReqBody } from "../Types/task";
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
    const url = `/task/${body._id}`;
    delete body._id;
    return axiosInstance.put(url, body).then((res: any) => {
        return res.data;
    }).catch(err => {
        console.log('err in update task', err);
    });
};

export const updateTaskStatus = (body: UpdateTaskStatusReqBody) => {
    const data: any = { ...body };
    const url = `/task/${data.taskId}/updateStatus`;
    delete data.taskId;
    return axiosInstance.put(url, data).then((res: any) => {
        return res.data;
    }).catch(err => {
        console.log('err in update task status', err);
        throw new Error(err.response.data.message);
    });
}