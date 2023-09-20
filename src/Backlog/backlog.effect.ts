import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBacklogPageSprints } from '../Apis/backlog';

export const getBacklog = createAsyncThunk(
    'get backlog page details',
    async (projectId: string) => await getBacklogPageSprints(projectId)
);
