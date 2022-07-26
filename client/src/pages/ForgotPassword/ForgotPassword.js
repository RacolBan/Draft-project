import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./ForgotPassword.module.css";
import axios from "axios";

function ForgotPassword({ isTempToken }) {
  const [email, setEmail] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const handlerSubmit = async () => {
    const dataSend = {
      email: email,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:8000/account/forgot_password",
        dataSend
      );
      const tempToken = {
        tempToken:data.tempToken,
        accountId:data.accountId
      }
      localStorage.setItem("tempToken", JSON.stringify(tempToken));
      setIsSubmit(true);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className={style.forgot}>
      <div className={style["forgot-container"]}>
        <div className={style["forgot-head"]}>
          <div className={style["forgot-head-title"]}>
            <h3>Forgot Password</h3>
          </div>
          {isTempToken === false && (
            <div className={style.token}>
              <i className="fa-solid fa-triangle-exclamation"></i>
              <p>Your password reset link has expired or not exist</p>
            </div>
          )}
          {isSubmit && (
            <div className={style["forgot-head-send"]}>
              <p>An email with a link to reset your password has just been send to the email address registered with us</p>
            </div>
          )}
          {!isSubmit && (
            <div className={style["forgot-head-description"]}>
              <p>No worries. We'll send you a link to reset you password</p>
            </div>
          )}
        </div>

        <div className={style["forgot-body"]}>
          <div className={style["forgot-body-input"]}>
            <input
              value={email}
              type="text"
              placeholder="Enter your email"
              spellCheck="false"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className={style["forgot-btn"]}>
          <button type="submit" onClick={handlerSubmit}>
            Reset Password
          </button>
        </div>
        <div className={style["forgot-back-login"]}>
          <div className={style["forgot-back-icon"]}>
            <Link to="/login">
              <i className="fa-solid fa-arrow-left"></i>
            </Link>
          </div>
          <Link to="/login">Back to login</Link>
        </div>
      </div>
    </div>
  );
}
export default ForgotPassword;
