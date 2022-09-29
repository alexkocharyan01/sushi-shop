import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    error: false,
    errorMessage: '',
    data: {},
    passwordData: {},
    changePassword: '',
    PassworderrorMessage: ''
}

export const AdminLoginAsync = createAsyncThunk(
    'login/fetchLogin',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/admin-auth/login/`, {
                ...value
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const AdminForgotPassAsync = createAsyncThunk(
    'forgotPass/fetchforgotPass',
    async (token, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/admin-auth/email-forgot-password`, {}).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const adminChangePassword = createAsyncThunk(
    'changePass/fetchChangePass',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/admin-auth/forgot-password?code=${value.code}`, {
                ...value.password
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const AdminLoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        clearData: (state, action) => {
            state.data = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(AdminLoginAsync.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
                state.data = {}
            })
            .addCase(AdminLoginAsync.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.data = action.payload
            })
            .addCase(AdminLoginAsync.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })

            .addCase(AdminForgotPassAsync.pending, (state) => {
                state.status = true
                state.PassworderrorMessage = ''
                state.passwordData = ''
                state.error = false
            })
            .addCase(AdminForgotPassAsync.fulfilled, (state, action) => {
                state.status = false
                state.passwordData = action.payload
                state.error = false
            })
            .addCase(AdminForgotPassAsync.rejected, (state, action) => {
                state.status = false
                state.PassworderrorMessage = action.payload
                state.error = true
            })
            .addCase(adminChangePassword.pending, (state) => {
                state.status = true
                state.error = false
                state.changePassword = ''
            })
            .addCase(adminChangePassword.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.changePassword = action.payload
            })
            .addCase(adminChangePassword.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.changePassword = ''
            })
    },
})

export const {clearData} = AdminLoginSlice.actions;
export default AdminLoginSlice.reducer
