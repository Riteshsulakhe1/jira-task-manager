export type Severity = 'success' | 'error' | undefined;

export interface SnackbarInfo {
    message: string;
    severity?: Severity;
}

export interface Task {
    id: string;
    title: string;
    status: string;
    type: string;
    flag: boolean;
    assignedTo: string;
    description?: string;
    assignedBy?: string;
    priority?: string;
    startDate?: string;
    endDate?: string;
    estimationInDays?: number;
    projectId?: string;
    parentId?: string;
    attachments?: any[];
    linkedIssues?: any[];
    reportedBy?: string;
    createdAt?: string;
    updatedAt?: string;
    sprintId?: string;
}