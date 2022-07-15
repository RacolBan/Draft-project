import axios from "axios";
import React, { useEffect, useState } from "react";

function ProductAPI() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const res = await axios.get('https://fakestoreapi.com/products')
    console.log(res)
  };
  useEffect(()=>{
    getProducts()
  },[])
  return {
    products:[products,setProducts]
  }
}

export default ProductAPI;
