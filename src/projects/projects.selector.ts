import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../reducers";

const projectSelector = (state: RootState) => state.project;

// Task status list selector
export const taskStatusListSelector = createSelector(projectSelector, state => state.selectedProjectTaskStatusList);
export const initialTaskStatusSelector = createSelector(projectSelector, state => (
    state.selectedProjectTaskStatusList?.find(status => status.index === 0)?.id
));

// Selected project selector
export const selectedProjectSelector = createSelector(projectSelector, state => state.selectedProject);

// Selected project ID selector
export const selectedProjectIdSelector = createSelector(projectSelector, state => state.selectedProject?.id || '');

// Select project sprint list selector
export const selectProjectSprintListSelector = createSelector(projectSelector, state => state.selectedProjectSprints);