import { createSlice } from "@reduxjs/toolkit";
import { InitialStates } from '../Types/projects';
import { getProjectTaskStatusEffect, getProjectsEffect } from "./projects.effect";

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
    selectedProjectTaskStatusList: null
}

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        selectProject: (state, action) => {
            state.selectedProject = action.payload;
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
    }
});

export default projectSlice.reducer;
export const { selectProject } = projectSlice.actions;