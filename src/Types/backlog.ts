import { Task } from "./common";
import { Sprint } from "./sprint";

export interface InitialStates {
    isLoading: boolean;
    data: Array<BacklogSprint>;
    error: any;
}

export interface BacklogSprint extends Sprint {
    tasks: Array<Task>;
}