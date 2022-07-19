import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = {
    username: username,
    password: password,
  };
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/account/login", {
        ...user,
      });
      const login = {
        accesstoken: res.data.accesstoken,
        accountId: res.data.id,
      };
      localStorage.setItem("login", JSON.stringify(login));
      window.location.href = "/";
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div className={style.container}>
      <form id={style.login} onSubmit={loginSubmit}>
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
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            name="password"
            id="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button id={style.submit}>Đăng Nhập</button>
          <Link to="/forgot" className={style["forgot-password"]}>
            Quên Mật Khẩu
          </Link>

          <div className={style.lastLogin}>
            <p>
              Nếu chưa có tài khoản?<Link to="/register">Đăng Ký</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
