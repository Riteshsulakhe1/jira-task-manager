import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProjects, getSprintListByProjectId, getTaskStatusList } from "../Apis/project";


export const getProjectsEffect = createAsyncThunk(
    'get project list',
    async () => await getProjects()
);

export const getProjectTaskStatusEffect = createAsyncThunk(
    'get selected project task status list',
    async (projectId: string) => getTaskStatusList(projectId)
);

export const getProjectSprintListEffect = createAsyncThunk(
    'get selected project sprint list',
    async (projectId: string) => getSprintListByProjectId(projectId)
);