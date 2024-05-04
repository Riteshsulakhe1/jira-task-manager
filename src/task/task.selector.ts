import { createSelector } from "@reduxjs/toolkit";
import { RootState } from '../store';

const taskPropertiesSelector = (state: RootState) => state.taskStaticProperties;
export const getTaskTypes = createSelector(taskPropertiesSelector, taskProps => taskProps.data?.taskType);