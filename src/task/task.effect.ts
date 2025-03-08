import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTaskStaticProperties } from "../Apis/task";
import { TaskStaticProperties } from "../Types/taskStaticProperties";

export const getTaskStaticPropertiesEffect = createAsyncThunk(
    'get task static properties',
    async () => {
        const data: TaskStaticProperties = await getTaskStaticProperties();
        data.taskType = Object.entries(data.taskType).map((item: any) => ({
            label: item[1],
            value: item[1]
        }));
        return data;
    }
);