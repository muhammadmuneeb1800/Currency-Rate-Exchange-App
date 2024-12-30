import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface TypeOfArray {
  names: string[];
  rates: string[];
}
export const fetchCountry = createAsyncThunk("country/fetch", async () => {
  const axiosInstance = axios.create({
    baseURL: "https://v6.exchangerate-api.com/v6/602339e67573287ccc7bae40",
    timeout: 5000,
  });
  const response = await axiosInstance.get("/latest/USD");
  const ratesArray = Object.keys(response.data.conversion_rates);
  const nameArray = Object.values(response.data.conversion_rates);
  return { nameArray, ratesArray };
});

const initialState: TypeOfArray = {
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
      state.names = action.payload.nameArray || [];
      state.rates = action.payload.ratesArray || [];
    });
  },
});

export const { CountryNames, Rates } = countries.actions;

export const selectCountryNames = (state: { country: TypeOfArray }) =>
  state.country.names;
export const selectRates = (state: { country: TypeOfArray }) =>
  state.country.rates;

export default countries.reducer;
