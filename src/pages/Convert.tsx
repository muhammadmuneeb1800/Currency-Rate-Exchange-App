import React, { useContext, useEffect } from "react";
import { LiaExchangeAltSolid } from "react-icons/lia";
import Button from "../components/button/Button.tsx";
import { StateContext } from "../hooks/states.tsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountry,
  selectCountryNames,
  selectRates,
} from "../store/slices/countrySlice.tsx";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Convert() {
  const {
    selUpdatedAmount,
    setSelUpdatedAmount,
    selamount,
    setSelAmount,
    toCurrency,
    setToCurrency,
    setSelectedCurrency,
    iconVisible,
    setIconVisible,
    selectedCurrency,
  } = useContext(StateContext);

  const ConNames =
    useSelector((store: string[]) => store.countrySlice.rates) || [];
  const ConRates =
    useSelector((store: string[]) => store.countrySlice.names) || [];
  const dispatch = useDispatch();

  const nameIndex = ConNames.indexOf(selectedCurrency);
  const rateIndex = ConNames.indexOf(toCurrency);

  useEffect(() => {
    dispatch<any>(fetchCountry());
  }, [dispatch]);

  const handleAmountChange = () => {
    setSelAmount(selUpdatedAmount);
    setSelUpdatedAmount(selamount);
  };

  const showInfo = () => {
    setIconVisible(!iconVisible);
  };

  const location = useLocation();
  const getQueryParam = (name: string) => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get(name);
  };

  useEffect(() => {
    const to = getQueryParam("to");
    const from = getQueryParam("from");
    if (to) setToCurrency(to);
    if (from) setSelectedCurrency(from);
  }, [location.search, setToCurrency, setSelectedCurrency]);

  const convertHandle = async () => {
    if (!selamount) {
      return alert("Enter amount");
    }

    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/602339e67573287ccc7bae40/pair/${selectedCurrency}/${toCurrency}/${selamount}`
      );
      const result = response.data.conversion_result;
      setSelUpdatedAmount(result);
    } catch (error) {
      console.error("Error fetching conversion data:", error);
      alert("Failed to fetch conversion data. Please try again.");
    }
  };

  return (
    <div className="bg-[#F0F5FF] md:px-14 px-4 items-center mt-16 py-16 max-h-[450px]">
      <div className="md:max-w-[350px] mx-auto lg:max-w-[590px]">
        <h1 className="lg:text-5xl font-bold text-center text-3xl md:text-4xl">
          Convert {selectedCurrency || "USD"} to {toCurrency || "GBP"}
        </h1>
      </div>

      <div className="px-5 md:px-0">
        <div className="bg-white py-9 md:w-[750px] lg:w-[850px] md:mx-auto md:mt-16 mt-8 rounded-md shadow-md hover:shadow-lg">
          <h1 className="lg:text-3xl text-xl md:text-2xl font-bold text-center max-w-[540px] mx-auto">
            Make fast and affordable international business payments
          </h1>
          <p className="text-center mt-7 px-4 md:px-5">
            Send secure international business payments in{" "}
            <span className="font-bold">XX</span> currencies, all at competitive
            rates with no hidden fees.
          </p>

          <div className="mt-8 px-11 md:px-8 flex flex-col space-y-2 md:flex-row justify-between items-center">
            <div className="flex flex-row">
              <div className="flex flex-col w-32 md:w-48 lg:w-56 text-start border space-y-1 border-[#C6C6C6] px-4 py-1">
                <label htmlFor="selamount">Amount</label>
                <input
                  type="text"
                  className="outline-none focus:border-none bg-none font-bold text-xl md:text-2xl"
                  name="selamount"
                  id="selamount"
                  placeholder="0"
                  value={selamount || ""}
                  onChange={(e) => setSelAmount(e.target.value)}
                />
              </div>
              <div className="flex flex-col text-start border space-y-1 w-32 h-20 border-[#C6C6C6]">
                <select
                  name="selectCurrency"
                  value={selectedCurrency || ""}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="border-none focus:border focus:border-none mt-7 px-5 focus-within:outline-none font-bold text-xl md:text-2xl"
                >
                  {ConNames.map((con) => (
                    <option key={con} value={con}>
                      {con}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button onClick={handleAmountChange} className="text-3xl mt-2">
              <LiaExchangeAltSolid />
            </button>
            <div className="flex flex-row">
              <div className="flex flex-col w-32 md:w-48 lg:w-56 text-start border space-y-1 border-[#C6C6C6] px-4 py-1">
                <label htmlFor="fromCurrency">Converted to</label>
                <input
                  type="text"
                  className="outline-none focus:border-none font-bold text-xl md:text-2xl"
                  name="fromCurrency"
                  readOnly
                  value={selUpdatedAmount || ""}
                />
              </div>
              <div className="flex flex-col text-start border space-y-1 w-32 h-20 border-[#C6C6C6]">
                <select
                  name="toCurrency"
                  value={toCurrency || ""}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="border-none focus:border focus:border-none mt-7 px-5 focus-within:outline-none font-bold text-xl md:text-2xl"
                >
                  {ConNames.map((con) => (
                    <option key={con} value={con}>
                      {con}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="text-start pl-12 mt-5">
            {selUpdatedAmount ? (
              <div className="flex items-center gap-2">
                <p className="text-md font-medium">
                  {ConRates[nameIndex]} {selectedCurrency} ={" "}
                  {ConRates[rateIndex]} {toCurrency}
                </p>
                <div className="relative">
                  <p
                    onClick={showInfo}
                    className="bg-[#3D55DD] text-white rounded-full w-5 h-5 font-bold cursor-pointer text-center"
                  >
                    i
                  </p>
                  {iconVisible && (
                    <div className="fixed -ml-40 -mt-14 inset-0 bg-opacity- z-10 flex items-center justify-center">
                      <div className="bg-[#F0F5FF] text-[#3D55DD] p-[20px] rounded-md shadow-lg">
                        <p className="text-xl font-bold text-[#3D55DD]">
                          Exchange rate at 14:00 GMT.
                        </p>
                        <p className="mt-[25px]">
                          Live rates vary minute to minute. The quotes you
                          receive here will differ to your final trade amount.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div onClick={convertHandle} className="md:pr-14 md:text-end mt-9">
            <Button text="Convert" pad="24" />
          </div>
        </div>
      </div>
    </div>
  );
}
