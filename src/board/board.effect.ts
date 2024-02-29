import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBoardByProjectId } from "../Apis/board";

export const getBoardEffect = createAsyncThunk(
    'Get board by projectId',
    async (projectId: string) => {
        const data = await getBoardByProjectId(projectId);
        return data.length ? data[0] : {};
    }
);