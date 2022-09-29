import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    error: false,
    errorMessage: '',
    ordersData: [],
    orderMessage: ''
}

export const adminOrder = createAsyncThunk(
    'adminOrder',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${apiUrl}/admin/orders`, {
                headers: {'Authorization': 'Bearer ' + value}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const ChackOrder = createAsyncThunk(
    'ChackOrder',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.patch(`${apiUrl}/admin/status/${value.value.id}`, {status: value.value.status}, {
                headers: {'Authorization': 'Bearer ' + value.token}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const adminOrderSlice = createSlice({
    name: 'adminOrderSlice',
    initialState,
    reducers: {
        clearData: (state, action) => {
            state.orderMessage = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminOrder.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(adminOrder.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.ordersData = action.payload
            })
            .addCase(adminOrder.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(ChackOrder.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(ChackOrder.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.orderMessage = action.payload
            })
            .addCase(ChackOrder.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
    }
})
export const {clearData} = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
