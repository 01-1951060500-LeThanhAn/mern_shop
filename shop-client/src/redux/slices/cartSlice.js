import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products:
      localStorage.getItem("cart") !== null
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addCart: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
      localStorage.setItem(
        "cart",
        JSON.stringify([...state.products, action.payload])
      );
    },

    removeCart: (state, action) => {
      const colorToRemove = action.payload;
      const productToRemove = state.products.find(
        (product) => product.color === colorToRemove
      );
      if (productToRemove) {
        state.products = state.products.filter(
          (product) => product.color !== colorToRemove
        );
        state.quantity -= productToRemove.quantity;
        state.total -= productToRemove.price * productToRemove.quantity;
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },
    cleanCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      localStorage.setItem("cart", JSON.stringify([]));
    },
  },
});

const cartFromLocalStorage = localStorage.getItem("cart");
if (cartFromLocalStorage) {
  try {
    const parsedCart = JSON.parse(cartFromLocalStorage);
    cartSlice.initialState.products = parsedCart;
  } catch (error) {
    console.error("Invalid JSON in localStorage:", error);
  }
}

export const { addCart, removeCart, cleanCart } = cartSlice.actions;
export default cartSlice.reducer;
