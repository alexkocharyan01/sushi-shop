import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    status: false,
    error: false,
    errorMessage: '',
    data: {},
    getData: [],
    upDataSLider: []
}

export const addSliderInfo = createAsyncThunk(
    'sliderInfo',
    async (values, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${apiUrl}/admin/slide`, values.formData,
                {
                    headers: {'Authorization': 'Bearer ' + values.token}
                }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const getSliderInfo = createAsyncThunk(
    'getProducts',
    async (token, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${apiUrl}/admin/slide`).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const SliderInfoDelete = createAsyncThunk(
    'productDelete',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${apiUrl}/admin/slide/${value.id}`, {
                headers: {'Authorization': 'Bearer ' + value.token}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const upDateSlider = createAsyncThunk(
    'upDateProduct',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.patch(`${apiUrl}/admin/slide/${value.id}`, value.value,
                {
                    headers: {'Authorization': 'Bearer ' + value.token}
                }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const upDateSliderImage = createAsyncThunk(
    'upDateProductImage',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.patch(`${apiUrl}/admin/slide/image/${value.id}`, value.formData,
                {
                    headers: {'Authorization': 'Bearer ' + value.token}
                }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const createSliderInfoSlice = createSlice({
    name: 'sliderInfo',
    initialState,
    reducers: {
        clearData: (state, action) => {
            state.data = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addSliderInfo.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(addSliderInfo.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.data = action.payload
            })
            .addCase(addSliderInfo.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(getSliderInfo.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(getSliderInfo.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.getData = action.payload
            })
            .addCase(getSliderInfo.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(SliderInfoDelete.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(SliderInfoDelete.fulfilled, (state, action) => {
                state.status = false
                state.error = false
            })
            .addCase(SliderInfoDelete.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(upDateSlider.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(upDateSlider.fulfilled, (state, action) => {
                state.status = false
                state.error = false
            })
            .addCase(upDateSlider.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(upDateSliderImage.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(upDateSliderImage.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.upDataSLider = action.payload
            })
            .addCase(upDateSliderImage.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
    }
})

export const {clearData} = createSliderInfoSlice.actions;
export default createSliderInfoSlice.reducer;
