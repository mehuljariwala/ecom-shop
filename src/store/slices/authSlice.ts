import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../types";

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  role: "user" | "admin" | "seller";
}

export interface Address {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  addresses: Address[];
  loading: boolean;
  error: string | null;
}

// Initialize from localStorage if available (client-side only)
const initialState: AuthState = {
  user: null,
  token: null,
  addresses: [],
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      // If the new address is default, remove default from others
      if (action.payload.isDefault) {
        state.addresses = state.addresses.map((address) => ({
          ...address,
          isDefault: false,
        }));
      }
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action: PayloadAction<Address>) => {
      const index = state.addresses.findIndex(
        (addr) => addr.id === action.payload.id
      );
      if (index !== -1) {
        // If the updated address is default, remove default from others
        if (action.payload.isDefault) {
          state.addresses = state.addresses.map((address) => ({
            ...address,
            isDefault: false,
          }));
        }
        state.addresses[index] = action.payload;
      }
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter(
        (address) => address.id !== action.payload
      );
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.addresses = [];
    },
  },
});

export const {
  setCredentials,
  updateUser,
  setAddresses,
  addAddress,
  updateAddress,
  removeAddress,
  setAuthLoading,
  setAuthError,
  logout,
} = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectAddresses = (state: RootState) => state.auth.addresses;
export const selectDefaultAddress = (state: RootState) =>
  state.auth.addresses.find((address) => address.isDefault) || null;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.token;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
