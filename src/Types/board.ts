import { Task } from "./common";
import { Sprint } from "./sprint";

export interface ColumnItem {
    _id: string;
    tasks: Array<Task>;
}

export interface BoardSprint extends Sprint {
    board: Array<ColumnItem>;
}

export interface InitialBoardStates {
    isLoading: boolean;
    data: BoardSprint | null;
    err: any;
}