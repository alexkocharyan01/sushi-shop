import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    error: false,
    errorMessage: '',
    message: '',
    data: {},
    getData: [],
}

export const addProducts = createAsyncThunk(
    'addProducts',
    async (values, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/admin/products`, values.formData,
                {
                    headers: {'Authorization': 'Bearer ' + values.token}
                }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const getProducts = createAsyncThunk(
    'getProducts',
    async (token, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${apiUrl}/admin/products`,
                {
                    headers: {'Authorization': 'Bearer ' + token}
                }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)


export const productDelete = createAsyncThunk(
    'productDelete',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${apiUrl}/admin/products/${value.id}`, {
                headers: {'Authorization': 'Bearer ' + value.token}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const upDateProduct = createAsyncThunk(
    'upDateProduct',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.patch(`${apiUrl}/admin/products/${value.id}`, value.value,
                {
                    headers: {'Authorization': 'Bearer ' + value.token}
                }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const upDateProductImage = createAsyncThunk(
    'upDateProductImage',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.patch(`${apiUrl}/admin/products/image/${value.id}`, value.formData,
                {
                    headers: {'Authorization': 'Bearer ' + value.token}
                }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const createProductsSlice = createSlice({
    name: 'addProducts',
    initialState,
    reducers: {
        clearData: (state, action) => {
            state.data = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProducts.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(addProducts.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.data = action.payload
            })
            .addCase(addProducts.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(getProducts.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.getData = action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(productDelete.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(productDelete.fulfilled, (state, action) => {
                state.status = false
                state.error = false
            })
            .addCase(productDelete.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(upDateProduct.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(upDateProduct.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.message = action.payload
            })
            .addCase(upDateProduct.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(upDateProductImage.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(upDateProductImage.fulfilled, (state, action) => {
                state.status = false
                state.error = false
            })
            .addCase(upDateProductImage.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
    }
})

export const {clearData} = createProductsSlice.actions;
export default createProductsSlice.reducer;
