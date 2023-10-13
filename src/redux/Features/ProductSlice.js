import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import URL from '../../Constants/url.js'



const initialState = {
    products: [],
    loading: false,
    err: ''
}


const getProducts = createAsyncThunk('products/getProducts', async () => {
    const respose = await axios.get(`${URL}/products`)
    return respose.data
})
const ProductSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
            state.err = ' '
        })
        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = false
            state.products = []
            state.err = action.error

        })
    }

})

export default ProductSlice.reducer
export { getProducts }