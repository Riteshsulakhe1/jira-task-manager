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
    reducers: {},
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

export default backlogSlice.reducer;