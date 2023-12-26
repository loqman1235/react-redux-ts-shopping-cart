import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../types";

export interface CartState {
  cartItems: IProduct[];
  totalAmount: number;
}

const getStoredCartItems: IProduct[] = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems")!)
  : [];

const getTotalAmount = getStoredCartItems.reduce((acc, product) => {
  if (product.qty) {
    return acc + product.price * product.qty;
  }

  return acc;
}, 0);

const initialState: CartState = {
  cartItems: getStoredCartItems,
  totalAmount: getTotalAmount,
};

const updateTotalAmount = (state: CartState) => {
  state.totalAmount = state.cartItems.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<IProduct>) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.qty = (existingItem.qty || 0) + 1;
      } else {
        state.cartItems.push({ ...action.payload, qty: 1 });
      }

      updateTotalAmount(state);
    },
    incrementQty: (state, action: PayloadAction<{ id: number }>) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.qty = (existingItem.qty || 0) + 1;
        updateTotalAmount(state);
      }
    },
    decrementQty: (state, action: PayloadAction<{ id: number }>) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem && existingItem.qty && existingItem.qty > 1) {
        existingItem.qty -= 1;
        updateTotalAmount(state);
      }
    },
    deleteProduct: (state, action: PayloadAction<{ id: number }>) => {
      const existingItem = state.cartItems.find(
        (product) => product.id === action.payload.id
      );

      if (existingItem && existingItem.qty) {
        state.cartItems = state.cartItems.filter(
          (product) => product.id !== existingItem.id
        );
        const itemsPrice = existingItem.price * existingItem.qty;
        state.totalAmount = state.totalAmount - itemsPrice;
      }
    },
    resetCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
    },
  },
});

export const {
  addItemToCart,
  incrementQty,
  decrementQty,
  deleteProduct,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
