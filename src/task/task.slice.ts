import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { InitialStates } from "../Types/taskStaticProperties";
import { getTaskStaticPropertiesEffect } from "./task.effect";

const initialState: InitialStates = {
    isLoading: false,
    error: null
};


const TaskStaticSlice = createSlice({
    name: 'TaskStaticProperties',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getTaskStaticPropertiesEffect.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getTaskStaticPropertiesEffect.fulfilled, (state, action) => {
            state.isLoading = true;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(getTaskStaticPropertiesEffect.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export default TaskStaticSlice.reducer;