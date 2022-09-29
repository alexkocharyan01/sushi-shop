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

export const userOrder = createAsyncThunk(
    'userOrder',
    async (values, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/user/cart-user`, values.value,
                {
                    headers: {'Authorization': 'Bearer ' + values.token}
                }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const userOrderGet = createAsyncThunk(
    'userOrderGet',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${apiUrl}/user/cart-user`, {
                headers: {'Authorization': 'Bearer ' + value}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const cartDelete = createAsyncThunk(
    'cartDelete',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${apiUrl}/user/cart-user/${value.id}`, {
                headers: {'Authorization': 'Bearer ' + value.token}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const changeCount = createAsyncThunk(
    'changecartCount',
    async (value) => {
        const response = await axios.patch(`${apiUrl}/user/cart-user/${value.id}`, {quantity: value.quantity}, {
            headers: {'Authorization': 'Bearer ' + value.token}
        });
        return response.data;
    }
)

export const order = createAsyncThunk(
    'order',
    async (values, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/user/order-user`, values.data,
                {
                    headers: {'Authorization': 'Bearer ' + values.token}
                }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const orders = createAsyncThunk(
    'orders',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${apiUrl}/user/orders`, {
                headers: {'Authorization': 'Bearer ' + value}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const CartSlice = createSlice({
    name: 'CartSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(userOrder.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(userOrder.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.message = action.payload
            })
            .addCase(userOrder.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(userOrderGet.pending, (state) => {
                state.status = true
                state.orderStatus = false
                state.error = false
                state.errorMessage = ''
            })
            .addCase(userOrderGet.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.productData = action.payload
            })
            .addCase(userOrderGet.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(cartDelete.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(cartDelete.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.deleteMessage = action.payload
            })
            .addCase(cartDelete.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(changeCount.pending, (state) => {
                state.status = true
                state.error = false
                state.quantityChange = ''
            })
            .addCase(changeCount.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.quantityChange = action.payload.status
            })
            .addCase(changeCount.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.quantityChange = ''
            })
            .addCase(order.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(order.fulfilled, (state, action) => {
                state.status = false
                state.orderStatus = true
                state.error = false
                state.message = action.payload
            })
            .addCase(order.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(orders.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(orders.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.ordersData = action.payload
            })
            .addCase(orders.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
    }
})

export default CartSlice.reducer;
