import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    error: false,
    errorMessage: '',
    data: {},
    changePassword: ''
}

export const userChangePassword = createAsyncThunk(
    'login/fetchChangePass',
    async (value) => {
        const response = await axios.patch(`${apiUrl}/auth/changeUserPassword`, {
            ...value.pass
        }, {
            headers: {'Authorization': 'Bearer ' + value.token}
        });
        return response.data;
    }
)

export const userChangePasswordSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        clearData: (state, action) => {
            state.changePassword = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userChangePassword.pending, (state) => {
                state.status = true
                state.error = false
                state.changePassword = ''
            })
            .addCase(userChangePassword.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.changePassword = action.payload
            })
            .addCase(userChangePassword.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.changePassword = ''
            })
    },
})

export const {clearData} = userChangePasswordSlice.actions;

export default userChangePasswordSlice.reducer
