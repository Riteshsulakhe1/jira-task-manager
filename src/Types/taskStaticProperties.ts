export enum TaskType {
    TASK = 'task',
    BUG = 'bug',
    STORY = 'story',
    SUB_TASK = 'sub-task',
}

export enum TaskPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export interface EpicInitials {
    id: string;
    name: string;
}

export interface LabelInitials {
    id: string;
    name: string;
}

export enum LinkedIssueType {
    CLONES = 'clones',
    CLONED_BY = 'is cloned by',
    DUPLICATES = 'duplicates',
    DUPLICATED_BY = 'is duplicated by',
    BLOCKS = 'blocks',
    BLOCKED_BY = 'is blocked by',
}

export type TaskSelectItem = {
    label: TaskType;
    value: TaskType;
}

export interface TaskStaticProperties {
    taskType: Array<TaskSelectItem>;
    taskPriority: typeof TaskPriority;
    epicInitials: EpicInitials;
    labelInitials: LabelInitials;
    linkedIssueType: typeof LinkedIssueType;
}

export interface InitialStates {
    isLoading: boolean;
    error: any;
    data?: TaskStaticProperties;
}