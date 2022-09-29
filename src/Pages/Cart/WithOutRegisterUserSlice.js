import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    error: false,
    orderCart: false,
    orderStatus: false,
    errorMessage: '',
    productData: [],
    ordersData: [],
    message: '',
    deleteMessage: '',
    quantityChange: ''
}

export const WithOutRegisterUserOrder = createAsyncThunk(
    'WithOutRegisterUserOrder',
    async (values, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/user/cart`, values).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const WithOutRegisterUserOrderGet = createAsyncThunk(
    'WithOutRegisterUserOrderGet',
    async (hash, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${apiUrl}/user/cart/${hash}`).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const WithOutRegisterCartDelete = createAsyncThunk(
    'WithOutRegisterCartDelete',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${apiUrl}/user/cart/${value.id}`,
                {
                    data: {
                        hash: value.hash
                    }
                }
            ).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const WithOutRegisterChangecartCount = createAsyncThunk(
    'WithOutRegisterChangecartCount',
    async (value) => {
        const response = await axios.patch(`${apiUrl}/user/cart/${value.id}`,
            {
                hash: value.hash,
                quantity: value.quantity
            }
        );
        return response.data;
    }
)

export const WithOutRegisterOrder = createAsyncThunk(
    'WithOutRegisterOrder',
    async (values, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/user/order`, values).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const WithOutRegisterOrders = createAsyncThunk(
    'WithOutRegisterOrders',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${apiUrl}/user/orders1`, {
                headers: {'Authorization': 'Bearer ' + value}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const WithOutRegisterCartSlice = createSlice({
    name: 'WithOutRegisterCartSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(WithOutRegisterUserOrder.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(WithOutRegisterUserOrder.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.message = action.payload
            })
            .addCase(WithOutRegisterUserOrder.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(WithOutRegisterUserOrderGet.pending, (state) => {
                state.status = true
                state.orderStatus = false
                state.error = false
                state.errorMessage = ''
            })
            .addCase(WithOutRegisterUserOrderGet.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.productData = action.payload
            })
            .addCase(WithOutRegisterUserOrderGet.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(WithOutRegisterCartDelete.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(WithOutRegisterCartDelete.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.deleteMessage = action.payload
            })
            .addCase(WithOutRegisterCartDelete.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(WithOutRegisterChangecartCount.pending, (state) => {
                state.status = true
                state.error = false
                state.quantityChange = ''
            })
            .addCase(WithOutRegisterChangecartCount.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.quantityChange = action.payload.status
            })
            .addCase(WithOutRegisterChangecartCount.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.quantityChange = ''
            })
            .addCase(WithOutRegisterOrder.pending, (state) => {
                state.status = true
                state.error = false
                // state.orderStatus = true
                state.errorMessage = ''
            })
            .addCase(WithOutRegisterOrder.fulfilled, (state, action) => {
                state.status = false
                state.orderStatus = true
                state.error = false
                state.message = action.payload
            })
            .addCase(WithOutRegisterOrder.rejected, (state, action) => {
                state.status = false
                state.orderStatus = true
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(WithOutRegisterOrders.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(WithOutRegisterOrders.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.ordersData = action.payload
            })
            .addCase(WithOutRegisterOrders.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
    }
})

export default WithOutRegisterCartSlice.reducer;
