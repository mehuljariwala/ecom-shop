import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../types";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  variantColor: string;
  variantSize: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  loading: false,
  error: null,
};

// Helper function to find an item in the cart
const findCartItemIndex = (
  items: CartItem[],
  payload: {
    productId: string;
    variantColor: string;
    variantSize: string;
  }
) => {
  return items.findIndex(
    (item) =>
      item.productId === payload.productId &&
      item.variantColor === payload.variantColor &&
      item.variantSize === payload.variantSize
  );
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const index = findCartItemIndex(state.items, {
        productId: action.payload.productId,
        variantColor: action.payload.variantColor,
        variantSize: action.payload.variantSize,
      });

      if (index >= 0) {
        // Item exists, update quantity
        state.items[index].quantity += action.payload.quantity;
      } else {
        // Item doesn't exist, add to cart
        state.items.push(action.payload);
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{
        productId: string;
        variantColor: string;
        variantSize: string;
      }>
    ) => {
      const index = findCartItemIndex(state.items, action.payload);
      if (index >= 0) {
        state.items.splice(index, 1);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        variantColor: string;
        variantSize: string;
        quantity: number;
      }>
    ) => {
      const index = findCartItemIndex(state.items, action.payload);
      if (index >= 0) {
        state.items[index].quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setCartLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCartError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCartOpen,
  setCartLoading,
  setCartError,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + (item.salePrice || item.price) * item.quantity,
    0
  );
export const selectCartItemsCount = (state: RootState) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectIsCartOpen = (state: RootState) => state.cart.isOpen;
export const selectCartLoading = (state: RootState) => state.cart.loading;
export const selectCartError = (state: RootState) => state.cart.error;

export default cartSlice.reducer;
