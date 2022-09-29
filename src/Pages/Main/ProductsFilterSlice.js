import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    error: false,
    errorMessage: '',
    data: [],
    message: '',
    language: localStorage.getItem('i18nextLng') || 'arm',
    productType: 'maki',
}

export const filterProducts = createAsyncThunk(
    'filterProducts',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${apiUrl}/user/product?type=${value.type}&language=${value.language}`).then();
            return response.data.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const filterProductsSlice = createSlice({
    name: 'filterProducts',
    initialState,
    reducers: {
        productType: (state, action) => {
            state.productType = action.payload
        },
        pageLenguage: (state, action) => {
            state.language = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(filterProducts.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(filterProducts.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.data = action.payload
            })
            .addCase(filterProducts.rejected, (state, action) => {
                state.status = false
                state.error = true
            })
    }
})
export const {productType, pageLenguage} = filterProductsSlice.actions;
export default filterProductsSlice.reducer;
