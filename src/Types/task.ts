export interface CreateTaskReqBody {
    title: string;
    type: string;
    sprintId: string;
    projectId: string;
}

export interface UpdateTaskStatusReqBody {
    taskId: string;
    fromStatus: string;
    toStatus: string;
}