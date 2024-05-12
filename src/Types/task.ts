import { TaskStatus } from "./taskStaticProperties";

export interface CreateTaskReqBody {
    title: string;
    type: string;
    sprintId: string;
    projectId: string;
}

export interface UpdateTaskStatusReqBody {
    taskId: string;
    fromStatus: TaskStatus;
    toStatus: TaskStatus;
}