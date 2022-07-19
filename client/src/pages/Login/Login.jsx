import React, { useState } from "react";
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
      const { data } = await axios.post("http://localhost:8000/account/login", {
        ...user,
      });
      const login = {
        accesstoken: data.accesstoken,
        accountId: data.id,
        username: data.username,
        role: data.role,
      };
      localStorage.setItem("login", JSON.stringify(login));
      alert("Login successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className={style.container}>
      <form id={style.login} onSubmit={loginSubmit}>
        <div className={style.header}>
          <h3>Login</h3>
        </div>

        <div className={style.inputs}>
          <input
            type="username"
            placeholder="Username"
            name="username"
            id="username"
            autoFocus
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            spellCheck="false"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            spellCheck="false"
          />

          <button type="submit" id={style.submit}>Login</button>
          <Link to="/forgot" className={style["forgot-password"]}>
            Forgot Password
          </Link>

          <div className={style.lastLogin}>
            <p>
              Not yet member?<Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
