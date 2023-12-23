import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../types";

type CartState = {
  cartItems: IProduct[];
  totalQuantity: number;
  totalAmount: number;
};

const initialState: CartState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default cartSlice.reducer;
