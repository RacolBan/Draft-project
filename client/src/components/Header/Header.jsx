import React from "react";
import { Link } from "react-router-dom";
import style from "./Header.module.css";

function Header() {
  return (
    <div className={style.header}>
      <div className={style["header-container"]}>
        <div className={style.logo}>
          <Link to="/">
            <img srcSet="./images/Logo/logo.png" alt="Logo" />
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
      <div className={`l-10 ${style["header-menu"]}`} >
          <div className="row no-gutters">
            <div className={style.menu}>
              <div className={style["menu-left"]}>
                <i className="fas fa-bars"></i>
                DANH MỤC SẢN PHẨM
              </div>
              <div className={style["menu-nav"]}>
                <ul className={style["menu-list"]}>
                  <li className={style["menu-item"]}>
                    <img src="./images/Icon/MTXT.png" alt="MTXT" />
                    <a href="">Máy tính xách tay</a>
                    <div className={style["sub-menu"]}>
                        <ul className={style["sub-menu-list"]}>
                          <li className={style["sub-menu-list-item"]}>
                            <a href="">Máy tính Dell</a>
                          </li>
                          <li className={style["sub-menu-list-item"]}>
                            <a href="">Máy tính Asus</a>
                          </li>
                          <li className={style["sub-menu-list-item"]}>
                            <a href="">Máy tính Acer</a>
                          </li>
                          <li className={style["sub-menu-list-item"]}>
                            <a href="">Máy tính HP</a>
                          </li>
                          <li className={style["sub-menu-list-item"]}>
                            <a href="">Máy tính Lenovo</a>
                          </li>
                        </ul>
                    </div>
                  </li>
                  <li className={style["menu-item"]}>
                    <img src="./images/Icon/AppleCenter.png" alt="AppleCenter" />
                    <a href="">Apple Center</a>
                    <div className={style["sub-menu"]}>
                        <ul className={style["sub-menu-list"]}>
                          <li className={style["sub-menu-list-item"]}>
                            <a href="">Macbook Air</a>
                          </li>
                          <li className={style["sub-menu-list-item"]}>
                            <a href="">Macbook Pro</a>
                          </li>
                        </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
      </div>
    </div>
  );
}

export default Header;
