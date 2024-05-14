export interface InitialStates {
    isLoading: boolean;
    success: boolean;
    error: any;
    data: Array<Project>;
    limit: number;
    page: number;
    totalPages: number;
    totalResults: number;
    selectedProject: Project | null;
    selectedProjectTaskStatusList: Array<ProjectTaskStatus> | null;
}

export interface Project {
    id: string;
    adminId: string;
    orgId: string;
    name: string;
    key: string;
    labels: Array<string>;
    epics: Array<string>;
}

export interface ProjectTaskStatus {
    id: string;
    name: string;
    index: number;
    isInitial: boolean;
}
export interface CreateProjectBody {
    name: string;
    key: string;
}
