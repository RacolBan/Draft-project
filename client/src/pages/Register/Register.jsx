import React from "react";
import style from "./Register.module.css";

function Register() {
  return (
    <div className={style.container}>
      <form id={style.signup}>
        <div className={style.header}>
          <h3>ĐĂNG KÝ</h3>
        </div>

        <div className={style.sep}></div>

        <div className={style.inputs}>
          <input
            type="fullname"
            placeholder="Họ tên"
            name="fullname"
            id="fullname"
            autoFocus
          />
          <input
            type="username"
            placeholder="Tên đăng nhập"
            name="username"
            id="username"
          />
          <input
            type="address"
            placeholder="Địa chỉ"
            name="address"
            id="address"
          />
          <input
            type="phone"
            placeholder="Số điện thoại"
            name="phone"
            id="phone"
          />

          <input type="email" placeholder="e-mail" name="email" id="email" />

          <input
            type="password"
            placeholder="Mật khẩu"
            name="password"
            id="password"
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
