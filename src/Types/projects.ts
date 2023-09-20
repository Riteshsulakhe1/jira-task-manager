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