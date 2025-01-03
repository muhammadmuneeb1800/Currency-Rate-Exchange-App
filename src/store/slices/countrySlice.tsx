import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TypeOfArray } from "../../types/type";
import axios from "axios";
import { dataData } from "../../constants/data.tsx";

export const axiosInstance = axios.create({
  baseURL: "https://v6.exchangerate-api.com/v6/602339e67573287ccc7bae40",
  timeout: 5000,
});

export const fetchCountry = createAsyncThunk("country/fetch", async () => {
  const response = await axiosInstance.get("/latest/USD");
  const ratesArray = Object.keys(response.data.conversion_rates);
  const nameArray = Object.values(response.data.conversion_rates);
  return { nameArray, ratesArray };
});

const initialState: TypeOfArray = {
  names: [],
  rates: [],
  dataData: dataData,
};

const countries = createSlice({
  name: "country",
  initialState,
  reducers: {
    CountryNames: (state, action) => {
      state.names = action.payload || [];
    },
    Rates: (state, action) => {
      state.rates = action.payload || [];
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

export default countries.reducer;
