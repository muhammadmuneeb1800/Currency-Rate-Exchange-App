import React, { createContext, useState } from "react";

export const StateContext = createContext("");

export default function StatesProvider({ children }) {
  const [amount, setAmount] = useState(0);
  const [selamount, setSelAmount] = useState(0);
  const [updatedAmount, setUpdatedAmount] = useState(0);
  const [selUpdatedAmount, setSelUpdatedAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [iconVisible, setIconVisible] = useState(false);
  const [toGoCurrency, setToGoCurrency] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  return (
    <StateContext.Provider
      value={{
        selUpdatedAmount,
        setSelUpdatedAmount,
        fromCurrency,
        setFromCurrency,
        selamount,
        setSelAmount,
        setUpdatedAmount,
        updatedAmount,
        amount,
        setAmount,
        toCurrency,
        setToCurrency,
        iconVisible,
        setIconVisible,
        toGoCurrency,
        setToGoCurrency,
        selectedCurrency,
        setSelectedCurrency,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
