import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    error: false,
    errorMessage: '',
    data: {},
}

export const sendMessage = createAsyncThunk(
    'sendMessage',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/user/contact`, value).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const sendMessageSlice = createSlice({
    name: 'sendMessage',
    initialState,
    reducers: {
        clearData: (state, action) => {
            state.data = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.data = action.payload
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
    }
})

export const {clearData} = sendMessageSlice.actions;
export default sendMessageSlice.reducer;
