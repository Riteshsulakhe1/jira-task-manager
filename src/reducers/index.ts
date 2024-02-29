import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../authentication/auth.slice';
import projectReducer from '../projects/projects.slice';
import backlogReducer from '../Backlog/backlog.slice';
import taskStaticPropertiesReducer from '../task/task.slice';
import boardReducer from '../board/board.slice';

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    backlog: backlogReducer,
    taskStaticProperties: taskStaticPropertiesReducer,
    board: boardReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;