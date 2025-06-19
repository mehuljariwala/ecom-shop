import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../types";

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

const initialState: UiState = {
  showMobileMenu: false,
  showSearchOverlay: false,
  showNewsletterModal: false,
  activeSortOption: "popularity",
  activeFilters: {
    categories: [],
    sizes: [],
    colors: [],
    priceRange: null,
    brands: [],
  },
  toast: {
    show: false,
    message: "",
    type: "info",
  },
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileMenu: (state, action: PayloadAction<boolean | undefined>) => {
      state.showMobileMenu =
        action.payload !== undefined ? action.payload : !state.showMobileMenu;
    },
    toggleSearchOverlay: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      state.showSearchOverlay =
        action.payload !== undefined
          ? action.payload
          : !state.showSearchOverlay;
    },
    toggleNewsletterModal: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      state.showNewsletterModal =
        action.payload !== undefined
          ? action.payload
          : !state.showNewsletterModal;
    },
    setSortOption: (state, action: PayloadAction<string>) => {
      state.activeSortOption = action.payload;
    },
    toggleCategoryFilter: (state, action: PayloadAction<string>) => {
      const categoryIndex = state.activeFilters.categories.indexOf(
        action.payload
      );
      if (categoryIndex >= 0) {
        state.activeFilters.categories.splice(categoryIndex, 1);
      } else {
        state.activeFilters.categories.push(action.payload);
      }
    },
    toggleSizeFilter: (state, action: PayloadAction<string>) => {
      const sizeIndex = state.activeFilters.sizes.indexOf(action.payload);
      if (sizeIndex >= 0) {
        state.activeFilters.sizes.splice(sizeIndex, 1);
      } else {
        state.activeFilters.sizes.push(action.payload);
      }
    },
    toggleColorFilter: (state, action: PayloadAction<string>) => {
      const colorIndex = state.activeFilters.colors.indexOf(action.payload);
      if (colorIndex >= 0) {
        state.activeFilters.colors.splice(colorIndex, 1);
      } else {
        state.activeFilters.colors.push(action.payload);
      }
    },
    setPriceRangeFilter: (
      state,
      action: PayloadAction<[number, number] | null>
    ) => {
      state.activeFilters.priceRange = action.payload;
    },
    toggleBrandFilter: (state, action: PayloadAction<string>) => {
      const brandIndex = state.activeFilters.brands.indexOf(action.payload);
      if (brandIndex >= 0) {
        state.activeFilters.brands.splice(brandIndex, 1);
      } else {
        state.activeFilters.brands.push(action.payload);
      }
    },
    clearAllFilters: (state) => {
      state.activeFilters = {
        categories: [],
        sizes: [],
        colors: [],
        priceRange: null,
        brands: [],
      };
    },
    showToast: (
      state,
      action: PayloadAction<{
        message: string;
        type: "success" | "error" | "info" | "warning";
      }>
    ) => {
      state.toast = {
        show: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    hideToast: (state) => {
      state.toast.show = false;
    },
  },
});

export const {
  toggleMobileMenu,
  toggleSearchOverlay,
  toggleNewsletterModal,
  setSortOption,
  toggleCategoryFilter,
  toggleSizeFilter,
  toggleColorFilter,
  setPriceRangeFilter,
  toggleBrandFilter,
  clearAllFilters,
  showToast,
  hideToast,
} = uiSlice.actions;

// Selectors
export const selectMobileMenuState = (state: RootState) =>
  state.ui.showMobileMenu;
export const selectSearchOverlayState = (state: RootState) =>
  state.ui.showSearchOverlay;
export const selectNewsletterModalState = (state: RootState) =>
  state.ui.showNewsletterModal;
export const selectActiveSortOption = (state: RootState) =>
  state.ui.activeSortOption;
export const selectActiveFilters = (state: RootState) => state.ui.activeFilters;
export const selectToast = (state: RootState) => state.ui.toast;

export default uiSlice.reducer;
