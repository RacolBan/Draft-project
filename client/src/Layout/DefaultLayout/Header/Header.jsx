import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import style from "./Header.module.css";

function Header() {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.UserAPI.isLogged;
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/account/logout");
      localStorage.clear();
      setIsLogged(false);
      window.location.href = "/";
    } catch (error) {
      alert(error.response.massage);
    }
  };
  return (
    <div className={style.header}>
      <div className={style["header-container"]}>
        <div className={style.logo}>
          <Link to="/">
            <img src="./images/Logo/logo.png" alt="Logo" />
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
          {isLogged ? (
            <li>
              <Link to="/">
                <i className="fa-solid fa-right-to-bracket"></i>
              </Link>
              <span
                type="submit"
                className={style["btn-logout"]}
                onClick={handleLogout}
              >
                Đăng Xuất
              </span>
            </li>
          ) : (
            <li>
              <Link to="/login">
                <i className="fa-solid fa-right-to-bracket"></i>
              </Link>
              <Link to="/login">Đăng Nhập</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
