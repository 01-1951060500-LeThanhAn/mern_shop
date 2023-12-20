import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import cartSlice from "./slices/cartSlice";
// import storage from "redux-persist/lib/storage";
// import {
//   FLUSH,
//   PAUSE,
//   PURGE,
//   REGISTER,
//   REHYDRATE,
//   persistReducer,
//   persistStore,
// } from "redux-persist";
// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };
const rootRSlice = combineReducers({
  user: userSlice,
  cart: cartSlice,
});

// const persistSlice = persistReducer(persistConfig, rootRSlice);
export const store = configureStore({
  reducer: rootRSlice,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoreActions: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER],
  //     },
  //   }),
});

// export const persistor = persistStore(store);

export default store;
