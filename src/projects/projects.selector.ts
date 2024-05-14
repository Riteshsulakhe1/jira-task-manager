import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../reducers";

const projectSelector = (state: RootState) => state.project;

export const taskStatusListSelector = createSelector(projectSelector, state => state.selectedProjectTaskStatusList);