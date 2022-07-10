import React from "react";
import style from "./Login.module.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className={style.container}>
      <form id={style.login}>
        <div className={style.header}>
          <h3>ĐĂNG NHẬP</h3>
        </div>

        <div className={style.sep}></div>

        <div className={style.inputs}>
          <input
            type="username"
            placeholder="Tên đăng nhập"
            name="username"
            id="username"
            autoFocus
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            name="password"
            id="password"
          />

          <button id={style.submit}>Đăng Nhập</button>

          <div className={style.lastLogin}>
            <p>Nếu chưa có tài khoản?<Link to="/register">Đăng Ký</Link></p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
