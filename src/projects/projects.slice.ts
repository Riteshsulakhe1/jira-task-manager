import { createSlice } from "@reduxjs/toolkit";
import { InitialStates } from '../Types/projects';
import { getProjectSprintListEffect, getProjectTaskStatusEffect, getProjectsEffect } from "./projects.effect";

const initialState: InitialStates = {
    isLoading: false,
    success: false,
    error: null,
    data: [],
    limit: 10,
    page: 1,
    totalPages: 1,
    totalResults: 0,
    selectedProject: null,
    selectedProjectTaskStatusList: null,
    selectedProjectSprints: []
}

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        selectProject: (state, action) => {
            state.selectedProject = action.payload;
            // Clear task status list
            state.selectedProjectTaskStatusList = null;
            // Clear sprint list
            state.selectedProjectSprints = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProjectsEffect.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getProjectsEffect.fulfilled, (state, action) => {
            state.isLoading = false;
            state.limit = action.payload.limit;
            state.page = action.payload.page;
            state.totalPages = action.payload.totalPages;
            state.totalResults = action.payload.totalResults;
            state.data = action.payload.results;
            state.success = true;
            state.error = null;
        })
        builder.addCase(getProjectsEffect.rejected, (state, action) => {
            state.isLoading = false;
            state.limit = 0;
            state.page = 0;
            state.totalPages = 1;
            state.totalResults = 0;
            state.data = [];
            state.success = false;
            state.error = action.error;
        })

        // Selected project task status list
        builder.addCase(getProjectTaskStatusEffect.fulfilled, (state, action) => {
            state.selectedProjectTaskStatusList = action.payload.taskStatusList;
        });
        builder.addCase(getProjectTaskStatusEffect.rejected, (state, action) => {
            state.selectedProjectTaskStatusList = null;
        });

        // Selected project sprint list
        builder.addCase(getProjectSprintListEffect.fulfilled, (state, action) => {
            state.selectedProjectSprints = action.payload.sprintList;
        });
        builder.addCase(getProjectSprintListEffect.rejected, (state, action) => {
            state.selectedProjectSprints = [];
        });
    }
});

export default projectSlice.reducer;
export const { selectProject } = projectSlice.actions;