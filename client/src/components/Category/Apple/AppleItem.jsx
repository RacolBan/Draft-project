import React from 'react'
import style from './Apple.module.css'


function AppleItem() {
  return (
    <div className={style.item}>
      <a href="#" className={style["item-image"]}>
        <img src="./Images/Laptop/apple.png" alt="laptop" />
      </a>
      <span className={style["item-manufactory"]}>
        <img src="./Images/Manufactory/apple.png" alt="apple" />
      </span>
      <h4 className={style["item-name"]}>
        Laptop MSI Modern 14 B5M 202VN (AMD Ryzen 5-5500U, Ram 8GB, SSD 512GB,
        màn hình 14inch FHD, Win 11)
      </h4>
      <span className={style["item-price"]}>13.790.000 đ</span>
      <span className={style["btn-addCart"]}>Mua Ngay</span>
    </div>
  )
}

export default AppleItem