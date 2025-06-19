import { AnyAction } from "@reduxjs/toolkit";
import { ThunkDispatch } from "@reduxjs/toolkit";

// Define the shapes of our state without importing from slices
export interface CartState {
  items: Array<{
    productId: string;
    name: string;
    price: number;
    salePrice?: number;
    image: string;
    variantColor: string;
    variantSize: string;
    quantity: number;
  }>;
  isOpen: boolean;
  loading: boolean;
  error: string | null;
}

export interface AuthState {
  user: {
    id: string;
    email: string;
    name: string;
    image?: string;
    role: "user" | "admin" | "seller";
  } | null;
  token: string | null;
  addresses: Array<{
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
  }>;
  loading: boolean;
  error: string | null;
}

export interface UiState {
  showMobileMenu: boolean;
  showSearchOverlay: boolean;
  showNewsletterModal: boolean;
  activeSortOption: string;
  activeFilters: {
    categories: string[];
    sizes: string[];
    colors: string[];
    priceRange: [number, number] | null;
    brands: string[];
  };
  toast: {
    show: boolean;
    message: string;
    type: "success" | "error" | "info" | "warning";
  };
}

export interface RootState {
  cart: CartState;
  auth: AuthState;
  ui: UiState;
  api: Record<string, unknown>; // Type for the API slice to avoid circular imports
}

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
