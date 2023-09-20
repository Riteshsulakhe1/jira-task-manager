import axiosInstance from "./axios";

export const getBacklogPageSprints = (projectId: string) => {
    const url = `/sprint/getBacklog?projectId=${projectId}`;
    return axiosInstance.get(url).then(res => {
        console.log('backlog result', res);
        return res.data.sprints;
    }).catch(err => err);
}