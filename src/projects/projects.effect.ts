import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProjects } from "../Apis/project";


export const getProjectsEffect = createAsyncThunk(
    'get project list',
    async () => await getProjects()
);