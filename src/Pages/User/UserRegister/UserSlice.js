import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    error: false,
    errorMessage: '',
    message: '',
    data: {},
}

export const userRegisterAsync = createAsyncThunk(
    'userRegisterAsync/fetchRegister',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, {
                ...value
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const userRegisterSlice = createSlice({
    name: 'userRegister',
    initialState,
    reducers: {
        clearData: (state, action) => {
            state.data = {}
        },
        clearErrorMessage: (state, action) => {
            state.errorMessage = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRegisterAsync.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(userRegisterAsync.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.data = action.payload
            })
            .addCase(userRegisterAsync.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
    },
})

export const {clearData, clearErrorMessage} = userRegisterSlice.actions;
export default userRegisterSlice.reducer
