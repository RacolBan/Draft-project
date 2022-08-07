import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import style from "./DefaultLayout.module.css";
import { Link } from "react-router-dom";

export default function defaultLayout({ children, cartItems }) {
  return (
    <div>
      <Header />
      <div className={style.container}>
        {children}
        {cartItems?.length > 0 && (
          <div className={style["cart-fixed"]}>
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping"></i>
              <b>{cartItems?.length}</b>
            </Link>
          </div>
        )}
        <div className={style["message-fixed"]}>
          <a href="https://www.messenger.com/t/100791439412241" target="_blank" >
            <i className="fa-solid fa-comment"></i>
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
