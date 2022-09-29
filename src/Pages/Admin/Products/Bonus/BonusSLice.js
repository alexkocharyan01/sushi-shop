import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
    error: false,
    message: '',
    errorMessage: '',
    data: [],
    upDateBonus: ''
}

export const bonus = createAsyncThunk(
    'bonus',
    async (value) => {
        const response = await axios.post(`${apiUrl}/admin/bonus`, value.value, {
            headers: {'Authorization': 'Bearer ' + value.token}
        });
        return response.data;
    }
)

export const AdminGetBonus = createAsyncThunk(
    'AdminGetBonus',
    async (value, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${apiUrl}/admin/bonus`, {
                headers: {'Authorization': 'Bearer ' + value}
            }).then();
            return response.data;
        } catch (e) {
            throw rejectWithValue(e.response.data.message);
        }
    }
)

export const changeBonusPint = createAsyncThunk(
    'changeBonusPint',
    async (value) => {
        const response = await axios.patch(`${apiUrl}/admin/bonus/${value.id}`, {
            ...value.value
        }, {
            headers: {'Authorization': 'Bearer ' + value.token}
        });
        return response.data;
    }
)

export const bonusSlice = createSlice({
    name: 'bonus',
    initialState,
    reducers: {
        clearData: (state, action) => {
            state.upDateBonus = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(bonus.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(bonus.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.message = action.payload
            })
            .addCase(bonus.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(AdminGetBonus.pending, (state) => {
                state.status = true
                state.error = false
                state.errorMessage = ''
            })
            .addCase(AdminGetBonus.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.data = action.payload
            })
            .addCase(AdminGetBonus.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.errorMessage = action.payload
            })
            .addCase(changeBonusPint.pending, (state) => {
                state.status = true
                state.error = false
                state.upDateBonus = ''
            })
            .addCase(changeBonusPint.fulfilled, (state, action) => {
                state.status = false
                state.error = false
                state.upDateBonus = action.payload
            })
            .addCase(changeBonusPint.rejected, (state, action) => {
                state.status = false
                state.error = true
                state.upDateBonus = ''
            })
    },
})

export const {clearData} = bonusSlice.actions;
export default bonusSlice.reducer
