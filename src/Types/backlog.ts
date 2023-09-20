import { Task } from "./common";

export interface InitialStates {
    isLoading: boolean;
    data: Array<BacklogSprint>;
    error: any;
}

export interface BacklogSprint extends Sprint {
    tasks: Array<Task>;
}

export interface Sprint {
    _id: string;
    name: string;
    isDefault: boolean; // Define it's backlog sprint
    status: string;
    startDate: string;
    endDate: string;
    projectId: string;
    durationInWeeks?: number;
    completedAt?: string;
    createdAt?: string;
    updatedAt?: string;
}
