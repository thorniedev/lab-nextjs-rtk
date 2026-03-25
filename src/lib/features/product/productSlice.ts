import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { productType } from "@/types/productType";

type ProductState = {
  selectedProduct: productType | null;
  quantity: number;
  totalPrice: number;
};

const initialState: ProductState = {
  selectedProduct: null,
  quantity: 1,
  totalPrice: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<productType>) => {
      state.selectedProduct = action.payload;
      state.quantity = 1;
      state.totalPrice = action.payload.price;
    },
    incrementQuantity: (state) => {
      if (!state.selectedProduct) return;
      state.quantity += 1;
      state.totalPrice = state.selectedProduct.price * state.quantity;
    },
    decrementQuantity: (state) => {
      if (!state.selectedProduct || state.quantity === 1) return;
      state.quantity -= 1;
      state.totalPrice = state.selectedProduct.price * state.quantity;
    },
  },
});

export const {
  setSelectedProduct,
  incrementQuantity,
  decrementQuantity,
} = productSlice.actions;

export default productSlice.reducer;
