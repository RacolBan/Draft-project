import axios from "axios";
import React, { useState } from "react";
import style from "./Register.module.css";

function Register() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = {
    username,
    password,
  };
  const profile = {
    firstName,
    lastName,
    address,
    phone,
    email,
  };
  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/account/register", {
        ...user,
      });
      const login = {
        accesstoken: res.data.accesstoken,
        accountId: res.data.id,
      };
      localStorage.setItem("login", JSON.stringify(login));
      await axios.post(
        `http://localhost:8000/user/${res.data.newAccount.id}/creatProfile`,
        {
          ...profile,
        }
      );

      // window.location.href = "/";
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className={style.container}>
      <form id={style.signup} onSubmit={registerSubmit}>
        <div className={style.header}>
          <h3>ĐĂNG KÝ</h3>
        </div>

        <div className={style.sep}></div>

        <div className={style.inputs}>
          <input
            type="firstName"
            placeholder="Họ"
            name="firstname"
            id="firstname"
            autoFocus
            value={firstName}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
          <input
            type="lastName"
            placeholder="Tên"
            name="lastname"
            id="lastname"
            autoFocus
            value={lastName}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
          <input
            type="username"
            placeholder="Tên đăng nhập"
            name="username"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="address"
            placeholder="Địa chỉ"
            name="address"
            id="address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <input
            type="phone"
            placeholder="Số điện thoại"
            name="phone"
            id="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />

          <input
            type="email"
            placeholder="e-mail"
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <div className={style.checkboxy}>
            <input name="check" id="checkbox" value="1" type="checkbox" />
            <label htmlFor="checkbox" className={style.terms}>
              Tôi chấp nhận điều khoản
            </label>
          </div>

          <button id={style.submit}>Đăng Ký</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
