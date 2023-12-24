import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../types";

export interface CartState {
  cartItems: IProduct[];
  totalAmount: number;
}

const initialState: CartState = {
  cartItems: [],
  totalAmount: 0,
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
  },
});

export const { addItemToCart, incrementQty, decrementQty } = cartSlice.actions;
export default cartSlice.reducer;
