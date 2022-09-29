import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    error: false,
    errorMessage: '',
    data: {},
    passwordData: {},
    changePassword: {}
}

export const userLoginAsync = createAsyncThunk(
    'login/userLoginAsync',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, {
                ...value
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const forgotPassword = createAsyncThunk(
    'login/forgotPassword',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/email-forgot-password`, value);
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const userChangePassword = createAsyncThunk(
    'login/fetchChangePass',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/forgot-password`, {
                ...value
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const userLoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        clearData: (state, action) => {
            state.changePassword = {}
        },
        clearLoginData: (state, action) => {
            state.data = {}
        },
        clearErrorMessage: (state, action) => {
            state.errorMessage = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLoginAsync.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
                state.data = {}
            })
            .addCase(userLoginAsync.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.data = action.payload
            })
            .addCase(userLoginAsync.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(forgotPassword.pending, (state) => {
                state.status = true
                state.errorMessage = ''
                state.error = false
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.status = false
                state.passwordData = action.payload
                state.error = false
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.status = false
                state.errorMessage = action.payload
                state.error = true
            })
            .addCase(userChangePassword.pending, (state) => {
                state.status = true
                state.error = false
            })
            .addCase(userChangePassword.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.changePassword = action.payload
            })
            .addCase(userChangePassword.rejected, (state, action) => {
                state.status = false
                state.error = true
            })
    },
})

export const {clearData, clearLoginData, clearErrorMessage} = userLoginSlice.actions;

export default userLoginSlice.reducer
