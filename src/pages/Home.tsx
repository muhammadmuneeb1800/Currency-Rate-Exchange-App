import React, { useContext, useEffect } from "react";
import axios from "axios";
import Button from "../components/button/Button.tsx";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { StateContext } from "../hooks/states.tsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountry } from "../store/slices/countrySlice.tsx";

export default function Home() {
  const {
    amount,
    setAmount,
    updatedAmount,
    setUpdatedAmount,
    toCurrency,
    setToCurrency,
    fromCurrency,
    setFromCurrency,
    iconVisible,
    setIconVisible,
    toGoCurrency,
    setToGoCurrency,
    selectedCurrency,
    setSelectedCurrency,
  } = useContext(StateContext);

  const ConNames = useSelector((store) => store.countrySlice.rates);
  const ConRates = useSelector((store) => store.countrySlice.names);
  const dispatch = useDispatch();

  useEffect(() => {
    setToGoCurrency(ConNames);
  }, [ConNames, setToGoCurrency]);

  const nameIndex = ConNames.indexOf(fromCurrency);
  const rateIndex = ConNames.indexOf(toCurrency);

  useEffect(() => {
    dispatch<any>(fetchCountry());
  }, [dispatch]);

  const handleAmountChange = () => {
    setAmount(updatedAmount);
    setUpdatedAmount(amount);
  };

  const showInfo = () => {
    setIconVisible(!iconVisible);
  };

  const convertHandle = async () => {
    if (!amount) {
      return alert("Enter amount");
    }

    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/473bc8271599bb7ad98f1f3f/pair/${fromCurrency}/${toCurrency}/${amount}`
      );
      const result = await response.data.conversion_result;
      setUpdatedAmount(result);
      console.log(setUpdatedAmount(result));
    } catch (error) {
      console.error("Error fetching conversion data:", error);
      alert("Failed to fetch conversion data. Please try again.");
    }
  };

  return (
    <>
      <div className="bg-[#F0F5FF] text-center mt-20 py-10 max-h-[550px]">
        <h1 className="lg:text-5xl font-bold text-center text-3xl md:text-4xl">
          Currency Converter
        </h1>
        <p className="text-center mt-7 px-10 md:px-5">
          Need to make an international business payment? Take a look at our
          live foreign exchange rates.
        </p>

        <div className="px-5 md:px-0">
          <div className="bg-white py-9 md:w-[750px] lg:w-[850px] md:mx-auto md:mt-16 mt-8 rounded-md shadow-md hover:shadow-lg">
            <h1 className="lg:text-3xl text-xl md:text-2xl font-bold text-center max-w-[540px] mx-auto">
              Make fast and affordable international business payments
            </h1>
            <p className="text-center mt-7 px-4 md:px-5">
              Send secure international business payments in{" "}
              <span className="font-bold">XX</span> currencies, all at
              competitive rates with no hidden fees.
            </p>
            <div className="mt-8 px-11 md:px-8 flex flex-col space-y-2 md:flex md:flex-row justify-between items-center">
              <div className="flex flex-row">
                <div className="flex flex-col w-32 md:w-48 lg:w-56 text-start border space-y-1 border-[#C6C6C6] px-4 py-1">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="text"
                    className="outline-none focus:border focus:border-none bg-none font-bold text-xl md:text-2xl"
                    name="amount"
                    id="amount"
                    placeholder="0"
                    value={amount ? amount : ""}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="flex flex-col text-start border space-y-1 w-32 h-20 border-[#C6C6C6] ">
                  <select
                    name="selectCurrency"
                    id=""
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="border-none focus:border focus:border-none mt-7 px-5 focus-within:outline-none font-bold text-xl md:text-2xl"
                  >
                    {ConNames.map((con, i) => {
                      return (
                        <option key={i} value={con}>
                          {con}
                        </option>
                      );
                    })}
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
                    className="outline-none focus:border focus:border-none font-bold text-xl md:text-2xl"
                    name="fromCurrency"
                    id="fromCurrency"
                    readOnly
                    value={updatedAmount ? updatedAmount : ""}
                    onChange={(e) => setUpdatedAmount(e.target.value)}
                  />
                </div>
                <div className="flex flex-col text-start border space-y-1 w-32 h-20 border-[#C6C6C6] ">
                  <select
                    name="selectCurrency"
                    id=""
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="border-none focus:border focus:border-none mt-7 px-5 focus-within:outline-none font-bold text-xl md:text-2xl"
                  >
                    {ConNames.map((con, i) => {
                      return (
                        <option key={i} value={con}>
                          {con}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="text-start pl-12 mt-5">
              {updatedAmount ? (
                <>
                  <div className="flex items-center gap-2">
                    <p className="text-md font-medium">
                      {ConRates[nameIndex]} {"  "} {fromCurrency} ={"  "}
                      {ConRates[rateIndex]}
                      {"  "} {toCurrency}
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
                              Live rates vary minute to minute. The <br />{" "}
                              quotes you receive here will differ to <br /> your
                              final trade amount.
                              <br />
                              <p className="mt-[20px]">
                                Lorem ipsum dolor sit amet <br /> consectetur
                                adipiscing elit mod duo sed <br /> eiusmod lorem
                                ipsum dolor sit amet
                                <br /> consectetur adipiscing elit mod duo.
                              </p>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
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

      <div className="mt-96 md:mt-72 md:ml-32 mx-5">
        <h1 className="lg:text-3xl text-xl md:text-2xl font-bold">
          Let's save you some time
        </h1>
        <p className="md:w-[550px] mt-7">
          If you've got a target exchange rate in mind but haven't got time to
          keep tabs on market movement, then a firm order could be perfect for
          you. When your chosen rate is reached, we'll act immediately, leaving
          you free to concentrate on your business.
        </p>
        <div className="mt-6">
          <Button link="/individual-currency" text="Find out more" />
        </div>
      </div>

      <div className="bg-[#F0F5FF] mt-64">
        <div className="bg-image p-20">
          <h1 className="lg:text-3xl text-xl md:text-2xl font-bold text-center">
            Popular currencies
          </h1>
          <div className="md:flex md:flex-row flex flex-col justify-center gap-0 items-center mt-10">
            <div>
              <select
                name="currency"
                className="md:w-80 w-60 md:-ml-0 mx-auto py-3 px-3 md:mr-12 border border-[#C6C6C6] rounded-md focus-within:outline focus-within:outline-none focus:ring-2 focus:ring-red-600"
                id="currency"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
              >
                {toGoCurrency.map((con, i) => (
                  <>
                    <option key={i} value={con}>
                      {con}
                    </option>
                  </>
                ))}
              </select>
            </div>
            <div className="mt-7 md:mt-0">
              <Button
                link={`convert?currency=${
                  selectedCurrency ? selectedCurrency : "USD"
                }`}
                text="Go"
                pad="24"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
