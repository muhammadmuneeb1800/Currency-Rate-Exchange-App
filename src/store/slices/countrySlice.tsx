import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCountry = createAsyncThunk("country/fetch", async () => {
  const response = await axios.get(
    "https://v6.exchangerate-api.com/v6/473bc8271599bb7ad98f1f3f/latest/USD"
  );
  const ratesArray = Object.keys(response.data.conversion_rates);
  const nameArray = Object.values(response.data.conversion_rates);
  return { nameArray, ratesArray };
});

const initialState = {
  names: [],
  rates: [],
};

const countries = createSlice({
  name: "country",
  initialState,
  reducers: {
    CountryNames: (state, action) => {
      state.names = action.payload;
    },
    Rates: (state, action) => {
      state.rates = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCountry.fulfilled, (state, action) => {
      state.names = action.payload.nameArray;
      state.rates = action.payload.ratesArray;
    });
  },
});

export const { CountryNames, Rates } = countries.actions;
export default countries.reducer;
