import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: false,
  },
  reducers: {
    addProductStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    addProductSuccess: (state, action) => {
      state.products.push(action.payload);
      state.loading = false;
      state.error = false;
    },
    addProductError: (state) => {
      state.error = true;
    },
    getProductStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = false;
    },
    getProductError: (state) => {
      state.error = true;
    },
    deleteProductStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      const index = state.products.findIndex(
        (item) => item._id === action.payload
      );
      state.products.splice(index, 1);
      state.loading = false;
    },
    deleteProductError: (state) => {
      state.error = true;
    },
    updateProductStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      const index = state.products.findIndex(
        (item) => item._id === action.payload.id
      );
      state.products[index] = action.payload;
      state.loading = false;
    },
    updateProductError: (state) => {
      state.error = true;
    },
  },
});

export const {
  getProductStart,
  deleteProductError,
  deleteProductStart,
  deleteProductSuccess,
  getProductSuccess,
  getProductError,
  updateProductStart,
  updateProductSuccess,
  updateProductError,
  addProductError,
  addProductStart,
  addProductSuccess,
} = productSlice.actions;

export default productSlice.reducer;
