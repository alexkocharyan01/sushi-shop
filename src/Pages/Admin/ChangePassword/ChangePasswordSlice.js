import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: [],
    error: false,
    data: '',
}

export const adminChangePassword = createAsyncThunk(
    'adminChangePassword',
    async (value) => {
        const response = await axios.patch(`${apiUrl}/admin-auth/changePassword`, {
            ...value.value
        }, {
            headers: {'Authorization': 'Bearer ' + value.token}
        });
        return response.data;
    }
)

export const adminChangePasswordSlice = createSlice({
    name: 'changePasswordSlice',
    initialState,
    reducers: {
        clearData: (state, action) => {
            state.data = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminChangePassword.pending, (state) => {
                state.status = true
                state.error = false
                state.data = ''
            })
            .addCase(adminChangePassword.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.data = action.payload
            })
            .addCase(adminChangePassword.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.data = ''
            })
    },
})

export const {clearData} = adminChangePasswordSlice.actions;

export default adminChangePasswordSlice.reducer
