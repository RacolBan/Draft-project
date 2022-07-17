import axios from "axios";
import { useEffect, useState } from "react";

function ProductAll() {
  const [productsAll, setProductsAll] = useState([]);
  const getProducts = async () => {
    const res = await axios.get('https://fakestoreapi.com/products')
    setProductsAll(res.data)
  };
  useEffect(()=>{
    getProducts()
  },[])
  return {
    productsAll : productsAll
  }
}

export default ProductAll;
