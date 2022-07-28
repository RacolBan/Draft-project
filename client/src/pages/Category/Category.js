import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./Category.module.css";

function Category() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [manufacture, setManufacture] = useState([]);
  const [limit,setLimit]= useState(5)
  const [page,setPage]= useState(1)
  const [totalPages,setToTalPages] = useState(0)


  // useEffect(()=>{
  //   if(data?.count){
  //     console.log(data.count);
  //   }
  // },[data?.count])

  useEffect(()=>{
    const getProducts = async () => {
      
      try {
        const { data } = await axios.get(
          `http://localhost:8000/product/pagination?limit=${limit}&page=${page}`
        );
        const total = Math.ceil(data.count / limit)
        setToTalPages(total);
        setProducts(data.rows);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    getProducts();
  },[])

  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `http://localhost:8000/product/category/${params.id}`
  //       );

  //       setProducts(data);
  //     } catch (error) {
  //       toast.error(error.response.data.message, {
  //         position: toast.POSITION.TOP_CENTER,
  //       });
  //     }
  //   };
  //   getProducts();
  // }, []);
  useEffect(() => {
    const getManufacture = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/manufacture/category/${params.id}`
        );
        setManufacture(data);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    getManufacture();
  }, []);
  const handleChange = async (e) => {
    if (e.target.value == 0) {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/product/category/${params.id}`
        );

        setProducts(data);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } else {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/product/manufacture/${e.target.value}`
        );
        setProducts(data);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  return (
    <div className={style.category}>
      <div className={style["category-head"]}>
        <div className={style["category-head-select"]}>
          <select onChange={handleChange}>
            <option value="0">Select Manufacture</option>
            {manufacture.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={`${style["category-container"]} row .grid.wide`}>
        {products.map((product, index) => (
          <div className={`${style.item} col l-3`} key={index}>
            <Link to={`/detail/${product.id}`} className={style["item-image"]}>
              <img src={`http://localhost:8000/${product.image}`} alt="Apple" />
            </Link>
            <span className={style["item-manufactory"]}>
              <img src="./images/Manufactory/apple.png" alt="" />
            </span>
            <h4 className={style["item-name"]}>{product.name}</h4>
            <span className={style["item-price"]}>{product.price}</span>
            <span className={style["btn-addCart"]}>Add To Cart</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
