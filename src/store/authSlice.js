import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import $api from '../utils/axiosFetcher.js';

const initialState = {
    isAuthenticated: false,
    token: '',
    user: '',
    isResetingPassword: false,
    authError: '',
    refreshToken:''
}

export const signup = createAsyncThunk(
    'auth/signup',
    async (authData) => {
        return await $api.post(`/auth/signup`, authData)
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (authData) => {
        return await $api.post('/auth/login', authData)
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        const cookieValue = document.cookie
            .split('; ')
            .find((row) => row.startsWith('token='))?.split('=')[1];
        return await $api.post('/auth/logout', {refreshToken: cookieValue}, {withCredentials: true});
    }
);
export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (params) => {
        const {requestMethod, requestMode, authData} = params;
        return await $api[requestMethod](`/auth/${requestMode}`, authData)
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsResetingPassword(state){state.isResetingPassword = false},
        setAuthError(state, action){state.authError = action.payload},
        setLogout(state, action){
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            state.token = '';
        },
        // login(state, action) {
        //     if(action.payload.length > 0){
        //         state.token = action.payload;
        //         state.isAuthenticated = true;
        //     }
        //     },
    },
    extraReducers: builder => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                    localStorage.setItem('token', action.payload.data.accessToken);
                    document.cookie = `token=${action.payload.data.refreshToken}`;
                    state.user = action.payload.data.user;

            })
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload.data.accessToken;
                localStorage.setItem('token', state.token);
                document.cookie = `token=${action.payload.data.refreshToken}`;
                state.isAuthenticated = true;
                // const cookieValue = document.cookie.split('; ')
                //     .find(row => row.startsWith('refreshToken='))?.split('=')[1];
                // state.refreshToken = cookieValue;
            })
            .addCase(login.rejected, (state, action) => {
                state.authError = action.error;
                state.isAuthenticated = false;

            })
            .addCase(logout.fulfilled, (state, action) => {
                state.token = '';
                state.isAuthenticated = false;
                localStorage.removeItem('token')
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                })
            .addCase(resetPassword.fulfilled, state => {
                state.isResetingPassword = true;
            })

    }
});

export const {setIsResetingPassword, setAuthError, setLogout} = authSlice.actions;

export default authSlice.reducer;