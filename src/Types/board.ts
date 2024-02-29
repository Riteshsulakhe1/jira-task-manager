import { Task } from "./common";
import { Sprint } from "./sprint";

export interface BoardItem {
    _id: string;
    tasks: Array<Task>;
}

export interface BoardSprint extends Sprint {
    board: Array<BoardItem>;
}

export interface InitialBoardStates {
    isLoading: boolean;
    data: BoardSprint | null;
    err: any;
}