import { CreateSprintResp } from "../Types/sprint";
import axiosInstance from "./axios";

export const createSprint = async (projectId: string): Promise<CreateSprintResp> => {
    return axiosInstance.post('/sprint', { projectId }).then(result => {
        return result.data;
    }).catch(err => {
        throw new Error(err.response.data.message);
    });
};