import { createAsyncThunk } from "@reduxjs/toolkit";
import { createTask, getTaskStaticProperties } from "../Apis/task";
import { TaskStaticProperties } from "../Types/taskStaticProperties";
import { CreateTaskReqBody } from "../Types/task";

export const getTaskStaticPropertiesEffect = createAsyncThunk(
    'get task static properties',
    async () => {
        const data: TaskStaticProperties = await getTaskStaticProperties();
        data.taskStatus = Object.entries(data.taskStatus).map((item: any) => ({
            label: item[1],
            value: item[1]
        }));
        data.taskType = Object.entries(data.taskType).map((item: any) => ({
            label: item[1],
            value: item[1]
        }));
        return data;
    }
);