import { createSlice } from "@reduxjs/toolkit";
import { getBacklog } from "./backlog.effect";
import { InitialStates } from '../Types/backlog';

const initialState: InitialStates = {
    isLoading: false,
    data: [],
    error: null
};

const backlogSlice = createSlice({
    name: 'backlog',
    initialState,
    reducers: {
        addTaskInSprint: (state, action) => {
            // task: Task, sprintId: string
            const sprintIndex = state.data.findIndex(sprint => sprint._id === action.payload.sprintId);
            state.data[sprintIndex].tasks.push(action.payload.task);
        },
        updateTaskInSprint: (state, action) => {
            const sprintIndex = state.data.findIndex(sprint => sprint._id === action.payload.sprintId);
            const taskIndex = state.data[sprintIndex].tasks.findIndex(task => task.id === action.payload.taskId);
            state.data[sprintIndex].tasks[taskIndex] = {
                ...state.data[sprintIndex].tasks[taskIndex],
                ...action.payload.task
            };
        },
        addNewSprint: (state, action) => {
            state.data.splice(state.data.length - 1, 0, action.payload);
        }
    },
    extraReducers(builder) {

        builder.addCase(getBacklog.pending, (state, action) => {
            state.isLoading = true;
        })

        builder.addCase(getBacklog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        })
        builder.addCase(getBacklog.rejected, (state, action) => {
            state.isLoading = false;
            state.data = [];
            state.error = action.error;
        })
    },
});

export const { addTaskInSprint, updateTaskInSprint, addNewSprint } = backlogSlice.actions;
export default backlogSlice.reducer;