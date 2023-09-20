import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../authentication/auth.slice';
import projectReducer from '../projects/projects.slice';
import backlogReducer from '../Backlog/backlog.slice';

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    backlog: backlogReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;