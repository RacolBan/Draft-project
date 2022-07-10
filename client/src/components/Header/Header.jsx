import React from "react";
import { Link } from "react-router-dom";
import style from "./Header.module.css";

function Header() {
  return (
    <div className={style.header}>
      <div className={style.logo}>
        <Link to="/">
          <img srcSet="./logo.png" alt="Logo" />
        </Link>
      </div>
      <div className={style.search}>
        <input
          type="text"
          placeholder="nhập tên sản phẩm, mã sản phẩm, từ khóa"
        />
        <span className={style["btn-search"]}>
          <i className="fas fa-search"></i>
        </span>
      </div>

      <ul className={style["header-right"]}>
        <li>
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
          <Link to="/cart">Giỏ hàng</Link>
        </li>
        <li>
          <Link to="/login">
            <i className="fa-solid fa-right-to-bracket"></i>
          </Link>
          <Link to="/login">Đăng Nhập</Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
