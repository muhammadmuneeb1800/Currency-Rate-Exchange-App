import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance.ts";

export function useConverterHome() {
  const [amount, setAmount] = useState(0);
  const [updatedAmount, setUpdatedAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const handleAmountChange = () => {
    setAmount(updatedAmount);
    setUpdatedAmount(amount);
  };

  const convertHandle = async () => {
    if (!amount) {
      return alert("Enter amount");
    }
    try {
      const response = await axiosInstance.get(
        `pair/${fromCurrency}/${toCurrency}/${amount}`
      );
      setUpdatedAmount(response.data.conversion_result);
    } catch (error) {
      console.error("Error fetching conversion data:", error);
      alert("Failed to fetch conversion data. Please try again.");
    }
  };

  return {
    amount,
    updatedAmount,
    setUpdatedAmount,
    fromCurrency,
    toCurrency,
    setAmount,
    setFromCurrency,
    setToCurrency,
    convertHandle,
    handleAmountChange,
  };
}
