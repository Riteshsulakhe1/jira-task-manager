import axiosInstance from "./axios";

export const getBoardByProjectId = (projectId: string) => {
    return axiosInstance.get(`/sprint/getBoard?projectId=${projectId}`).then(result => {
        return result.data;
    }).catch(err => {
        throw new Error(err.response.data.message);
    });
};