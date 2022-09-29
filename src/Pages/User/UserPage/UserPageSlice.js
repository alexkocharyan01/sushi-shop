import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    error: false,
    errorMessage: '',
    data: [],
    upData: ''
}

export const userInfo = createAsyncThunk(
    'userInfo',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${apiUrl}/user/data`, {
                headers: {'Authorization': 'Bearer ' + value}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const userInfoUpData = createAsyncThunk(
    'userInfoUpData',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.patch(`${apiUrl}/auth/change-data`, value.data,
                {
                    headers: {'Authorization': 'Bearer ' + value.token}
                }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        clearUpDataMessage: (state, action) => {
            state.upData = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userInfo.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(userInfo.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.data = action.payload
            })
            .addCase(userInfo.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(userInfoUpData.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(userInfoUpData.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.upData = action.payload.message
            })
            .addCase(userInfoUpData.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
    }
})

export const {clearUpDataMessage} = userInfoSlice.actions;

export default userInfoSlice.reducer;
