import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import productSlice from "./slices/productSlice";

const rootRSlice = combineReducers({
  user: userSlice,
  products: productSlice,
});

export const store = configureStore({
  reducer: rootRSlice,
});

export default store;
