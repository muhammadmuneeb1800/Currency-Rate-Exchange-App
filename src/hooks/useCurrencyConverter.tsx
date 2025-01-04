import { useState } from "react";
import { axiosInstance } from "../store/slices/countrySlice.tsx";

export const useCurrencyConverter = () => {
  const [selamount, setSelAmount] = useState<number | string>(0);
  const [selUpdatedAmount, setSelUpdatedAmount] = useState<number | string>(0);

  const convertHandler = async (
    from: string,
    to: string,
    amount: number | string
  ) => {
    if (!selamount) {
      return alert("Enter amount");
    }

    try {
      const endpoint = `/pair/${from}/${to}/${amount}`;
      const response = await axiosInstance.get(endpoint);
      const result = response?.data?.conversion_result || 0;
      setSelUpdatedAmount(result);
    } catch (error) {
      console.error("Error fetching conversion data:", error);
      alert("Failed to fetch conversion data. Please try again.");
    }
  };

  return {
    selamount,
    setSelAmount,
    selUpdatedAmount,
    setSelUpdatedAmount,
    convertHandler,
  };
};
