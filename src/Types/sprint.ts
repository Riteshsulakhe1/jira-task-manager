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
export interface CreateSprintResp {
    message: string;
    sprint: Sprint;
}