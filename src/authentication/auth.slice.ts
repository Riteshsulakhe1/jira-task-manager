import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from '../Types/auth';
import { signin, whoIsLoggedIn, registerEffect } from './auth.effect';

const initialState: InitialState = {
    loading: false,
    userInfo: null, // for user object
    userToken: null, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
    refreshingAuth: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuthTokens: (state, action) => {
            state.userToken = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Login & Register user effect
        builder.addCase(signin.fulfilled || registerEffect.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.userInfo = action.payload.user;
            state.userToken = { ...action.payload.tokens };
        });
        builder.addCase(signin.pending || registerEffect.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(signin.rejected || registerEffect.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.userInfo = null;
            state.error = action.error
        })

        // Who is logged in effect
        builder.addCase(whoIsLoggedIn.pending, (state, action) => {
            state.refreshingAuth = true;
        })
        builder.addCase(whoIsLoggedIn.fulfilled, (state, action) => {
            state.refreshingAuth = false;
            state.userInfo = action.payload.user;
            state.userToken = action.payload.tokens;
            state.success = true;
            state.error = null;
        })
        builder.addCase(whoIsLoggedIn.rejected, (state, action) => {
            state.refreshingAuth = false;
            state.userInfo = null;
            state.userToken = null;
            state.success = true;
            state.error = action.error;
        })

        // Register effect
        builder.addCase(registerEffect.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.userInfo = action.payload.user;
            state.userToken = { ...action.payload.tokens };
        });
        builder.addCase(registerEffect.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(registerEffect.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.userInfo = null;
            state.error = action.error
        })
    },
})

export default authSlice.reducer;
export const { setAuthTokens } = authSlice.actions;