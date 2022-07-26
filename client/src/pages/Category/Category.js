import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./Category.module.css";

function Category() {
  const params = useParams();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params.id) {
      const getProducts = async () => {
        const { data } = await axios.get(
          `https://fakestoreapi.com/products/category/jewelery`
        );

        setCategory(data);
      };
      getProducts();
    }
  }, [params.id]);
  return (
    <div className={style.category}>
      <div className={style["category-head"]}>
        <div className="category-head-select">
          <select id="mySelect">
            <option value="">Manufacture</option>
            <option value="BMW">Dell</option>
            <option value="Mercedes">Asus</option>
            <option value="Volvo">Lenovo</option>
          </select>
        </div>
      </div>
      <div className={style["category-container"]}>
        {category.map((product, index) => (
          <div className={style.item} key={index}>
            <Link to={`/detail/${product.id}`} className={style["item-image"]}>
              <img src={product.image} alt="Apple" />
            </Link>
            <span className={style["item-manufactory"]}>
              <img src="./images/Manufactory/apple.png" alt="" />
            </span>
            <h4 className={style["item-name"]}>{product.title}</h4>
            <span className={style["item-price"]}>{product.price}</span>
            <span className={style["btn-addCart"]}>Add To Cart</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
