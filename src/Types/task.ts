import { TaskPriority, TaskType } from "./taskStaticProperties";

export interface CreateTaskReqBody {
    title: string;
    type: TaskType;
    sprintId: string;
    projectId: string;
    status?: string;
    description?: string;
    priority?: TaskPriority;
}

export interface UpdateTaskStatusReqBody {
    taskId: string;
    fromStatus: string;
    toStatus: string;
}

export interface CreateTaskModalReqBody extends CreateTaskReqBody {
    description: string;
    status: string;
    priority: TaskPriority;
    label?: string;
    linkedIssue?: string;
}