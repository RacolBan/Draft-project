import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalState } from "../GlobalState";

function ProductsAll() {
  const state = useContext(GlobalState);
  const [isAdmin, setIsAdmin] = state.UserAPI.isAdmin;
  const login = JSON.parse(localStorage.getItem("login")) || null;
  const [productsAll, setProductsAll] = useState([]);
  const getProducts = async () => {
    const { data } = await axios.get("http://localhost:8000/product/getAll", {
      headers: { "access-token": "Bearer " + login.accesstoken },
    });
    setProductsAll(data);
  };
  useEffect(() => {
    if (isAdmin) {
      getProducts();
    }
  }, [isAdmin]);
  return {
    productsAll: [productsAll, setProductsAll]
  };
}

export default ProductsAll;
