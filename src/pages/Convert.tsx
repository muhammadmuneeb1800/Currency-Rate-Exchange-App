import React, { useState, useEffect } from "react";
import { LiaExchangeAltSolid } from "react-icons/lia";
import Button from "../components/button/Button.tsx";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance, fetchCountry } from "../store/slices/countrySlice.tsx";
import { useLocation } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

export default function Convert() {
  const [selamount, setSelAmount] = useState<number | string>(0);
  const [selUpdatedAmount, setSelUpdatedAmount] = useState<number | string>(0);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [iconVisible, setIconVisible] = useState<boolean>(false);
  const [isOpenDrop, setIsOpenDrop] = useState<boolean>(false);
  const [selected, setSelected] = useState<number | string>("EUR");
  const [inputValue, setInputValue] = useState<string>("");

  const ConNames = useSelector((store: any) => store.countrySlice.rates) || [];
  const ConRates = useSelector((store: any) => store.countrySlice.names) || [];
  const dataData =
    useSelector((store: any) => store.countrySlice.dataData) || [];

  const nameIndex = ConNames.indexOf(selectedCurrency) || [];
  const rateIndex = ConNames.indexOf(selected) || [];
  const dispatch = useDispatch();

  const location = useLocation();
  const getQueryParam = (name: string): string | null => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get(name);
  };

  useEffect(() => {
    dispatch<any>(fetchCountry());

    const currency = getQueryParam("currency") || "";
    const to = getQueryParam("to") || "";
    const from = getQueryParam("from") || "";

    if (currency) setSelectedCurrency(currency);
    if (from) setSelectedCurrency(from);
    if (to) setSelected(to);
  }, [dispatch, location.search]);

  const handleAmountChange = () => {
    setSelAmount(selUpdatedAmount);
    setSelUpdatedAmount(selamount);
  };

  const showInfo = () => {
    setIconVisible(!iconVisible);
  };

  const convertHandle = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!selamount) {
      return alert("Enter amount");
    }

    try {
      const endpoint = `/pair/${selectedCurrency}/${selected}/${selamount}`;
      const response = await axiosInstance.get(endpoint);
      const result = response?.data?.conversion_result || 0;
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
          Convert {selectedCurrency || "USD"} to {selected || "GBP"}
        </h1>
      </div>

      <div className="px-5 md:px-0">
        <div className="bg-white mb-20 py-9 md:w-[750px] lg:w-[850px] md:mx-auto md:mt-16 mt-8 rounded-md shadow-md hover:shadow-lg">
          <h1 className="lg:text-3xl text-xl md:text-2xl font-bold text-center max-w-[540px] mx-auto">
            Make fast and affordable international business payments
          </h1>
          <p className="text-center mt-7 px-4 md:px-5">
            Send secure international business payments in{" "}
            <span className="font-bold">{dataData.length}</span> currencies, all
            at competitive rates with no hidden fees.
          </p>

          <div className="mt-8 px-11 md:px-8 flex flex-col space-y-2 md:flex md:flex-row justify-between items-center">
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
                  value={selectedCurrency || "USD"}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="border-none focus:border-none mt-7 px-5 focus-within:outline-none font-bold text-xl md:text-2xl"
                >
                  {ConNames?.map((con) => (
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
                  value={selUpdatedAmount}
                />
              </div>
              <div className="flex select-none flex-col text-start border space-y-1 w-32 h-20 border-[#C6C6C6]">
                <div
                  onClick={() => setIsOpenDrop(!isOpenDrop)}
                  className="text-xl flex select-none mb-4 justify-between items-center md:text-2xl font-bold text-center mt-7"
                >
                  <span className="ml-5">{selected}</span>
                  <BiChevronDown size={20} className="mt-1 mr-1" />
                </div>
                {isOpenDrop && (
                  <div className="w-[350px] z-50 -ml-56 shadow-lg">
                    <ul className="bg-white px-3 rounded-lg shadow-md overflow-y-auto max-h-60 transition-all">
                      <div className="flex items-center bg-white py-2 px-3 sticky top-0 z-10 border-b border-gray-200">
                        <AiOutlineSearch size={25} className="text-gray-500" />
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) =>
                            setInputValue(e.target.value.toLowerCase())
                          }
                          placeholder="Search"
                          className="w-full p-2 outline-none placeholder:text-gray-400 text-sm"
                        />
                      </div>
                      <hr className="border border-gray-300" />
                      {dataData.length > 0
                        ? dataData
                            .filter((country) =>
                              country?.name?.toLowerCase().includes(inputValue)
                            )
                            .map((country, i) => (
                              <li
                                key={i}
                                className={`p-2 hover:bg-gray-100 text-xl font-bold hover:text-black cursor-pointer ${
                                  country?.currency?.toLowerCase() ===
                                  selected.toLowerCase()
                                    ? "bg-gray-200 text-black"
                                    : ""
                                }`}
                                onClick={() => {
                                  setSelected(country?.currency);
                                  setIsOpenDrop(false);
                                  setInputValue("");
                                }}
                              >
                                {country?.currency}{" "}
                                <span className="ml-3 text-sm">
                                  {country?.name}
                                </span>
                              </li>
                            ))
                        : ""}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="text-start pl-12 mt-5">
            {selUpdatedAmount ? (
              <div className="flex items-center gap-2">
                <p className="text-md font-medium">
                  {ConRates[nameIndex]} {selectedCurrency} ={" "}
                  {ConRates[rateIndex]} {selected}
                </p>
                <div className="relative">
                  <p
                    onClick={showInfo}
                    className="bg-[#3D55DD] text-white rounded-full w-5 h-5 font-bold cursor-pointer text-center"
                  >
                    i
                  </p>
                  {iconVisible && (
                    <div className="fixed -ml-40 mt-28 inset-0 bg-opacity- z-10 flex items-center justify-center">
                      <div className="bg-[#F0F5FF] text-[#3D55DD] p-[20px] rounded-md shadow-lg">
                        <p className="text-xl font-bold text-[#3D55DD]">
                          Exchange rate at 14:00 GMT.
                        </p>
                        <p className="mt-[25px]">
                          Live rates vary minute to minute. The <br /> quotes
                          you receive here will differ to <br /> your final
                          trade amount.
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
            ) : (
              ""
            )}
          </div>

          <div
            onClick={convertHandle}
            className="md:pr-14 text-center md:text-end mt-9"
          >
            <Button text="Convert" pad="24" />
          </div>
        </div>
      </div>
    </div>
  );
}
