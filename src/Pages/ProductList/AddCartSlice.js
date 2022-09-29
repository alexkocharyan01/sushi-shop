import {createSlice} from "@reduxjs/toolkit";


export const productAddCartSlice = createSlice({
    name: 'cartItems',
    initialState: {
        cartItems: [],
    },
    reducers: {
        addData: (state, action) => {
            state.cartItems.push(action.payload)
        },
        addToCart: (state, action) => {

        },
        removeProduct(state, action) {
            state.cartItems = action.payload
        }
    }
})

export const {addData, addToCart, removeProduct} = productAddCartSlice.actions;

export default productAddCartSlice.reducer
