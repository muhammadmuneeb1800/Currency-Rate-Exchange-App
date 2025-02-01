import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://v6.exchangerate-api.com/v6/5d841d1cfc907395ecdc68ce",
  timeout: 5000,
});
