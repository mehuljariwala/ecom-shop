import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../types";

// Define the base URL for our API
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Get the token from auth state
      const token = (getState() as RootState).auth.token;

      // If we have a token, include it in the headers
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Products", "Orders", "User", "Cart", "Wishlist"],
  endpoints: () => ({}),
});
