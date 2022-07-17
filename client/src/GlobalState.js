import React, { createContext } from "react";
import ProductsLaptop from "../src/API/ProductLaptop";
import ProductsApple from "./API/ProductApple";
import ProductAll from "./API/ProductAll";
export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const state = {
    ProductsLaptop: ProductsLaptop(),
    ProductsApple: ProductsApple(),
    ProductsAll: ProductAll(),
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
