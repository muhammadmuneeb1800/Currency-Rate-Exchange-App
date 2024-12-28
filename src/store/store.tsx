import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slices/countrySlice.tsx";

export const store = configureStore({
  reducer: {
    countrySlice: reducer,
  },
});
