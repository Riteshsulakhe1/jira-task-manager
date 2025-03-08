import { createSlice } from "@reduxjs/toolkit";
import { InitialBoardStates } from "../Types/board";
import { getBoardEffect } from "./board.effect";

const initialBoardState: InitialBoardStates = {
    isLoading: true,
    data: null,
    err: null
};

const boardSlice = createSlice({
    name: 'board',
    initialState: initialBoardState,
    reducers: {},
    extraReducers: (builder) => {

        // Get board by project Id case
        builder.addCase(getBoardEffect.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getBoardEffect.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.err = null;
        });
        builder.addCase(getBoardEffect.rejected, (state, action) => {
            state.isLoading = false;
            state.data = null;
            state.err = action.error;
        });
    }
});

export default boardSlice.reducer;