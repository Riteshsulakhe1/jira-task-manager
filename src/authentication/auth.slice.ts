import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from '../Types/auth';
import { signin, whoIsLoggedIn } from './auth.effect';

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
        // Login user effect
        builder.addCase(signin.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.userInfo = action.payload.user;
            state.userToken = { ...action.payload.tokens };
        });
        builder.addCase(signin.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(signin.rejected, (state, action) => {
            console.log('action =>', action);
            state.success = false;
            state.loading = false;
            state.userInfo = null;
            state.error = action.error.message
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
    },
})

export default authSlice.reducer;
export const { setAuthTokens } = authSlice.actions;