import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./DetailProduct.module.css";

function DetailProduct() {
  const params = useParams();

  const [productDetail, setProductDetail] = useState([]);

  const getOneProduct = async () => {
    const res = await axios.get(
      `https://fakestoreapi.com/products/${params.id}`
    );

    setProductDetail(res.data);
  };

  useEffect(() => {
    if (params) {
      getOneProduct();
    }
  }, [params]);

  return (
    <div className={style.container}>
      <div className={style["container-left"]}>
        <img src={productDetail.image} alt="image-product" />
      </div>
      <div className={style["container-right"]}>
        <h3 className={style["container-right-title"]}>
          {productDetail.title}
        </h3>
        <p className={style["container-right-description"]}>
          {productDetail.description}
        </p>
        <p className={style["container-right-price"]}>
          Giá Bán: {`$${productDetail.price}`}
        </p>
        <button>Mua Ngay</button>
      </div>
    </div>
  );
}

export default DetailProduct;
