import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import style from "./Reset.module.css";

function Reset() {
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTempToken, setIsTempToken] = useState(true);
  const param = useParams().tempToken;
  const tokenAccount = JSON.parse(localStorage.getItem("tempToken"));

  useEffect(() => {
    if (param !== tokenAccount.tempToken) {
      setIsTempToken(false);
    }
  }, []);

  const handlerSubmit = async () => {
    const newPwd = {
      newPassword : password
    };

    try {
      const {data} = await axios.put(
        `http://localhost:8000/account/reset_password/${tokenAccount.accountId}`,
        {
          ...newPwd,
        }
      );
      alert(data.message)
    } catch (error) {
      alert(error.response.message)
    }
  };

  return (
    <div>
      {isTempToken ? (
        <div className={style.reset}>
          <div className={style["reset-container"]}>
            <div className={style["reset-head"]}>
              <div className={style["reset-head-title"]}>
                <h3>Reset Password</h3>
              </div>
              <div className={style["reset-head-description"]}>
                <p>Enter a new password for BK shop</p>
              </div>
            </div>

            <div className={style["reset-body"]}>
              <div className={style["reset-body-input"]}>
                <input
                  value={password}
                  type="password"
                  placeholder="Enter your password"
                  spellCheck="false"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div className={style["reset-body"]}>
              <div className={style["reset-body-input"]}>
                <input
                  value={confirmPassword}
                  type="password"
                  placeholder="Confirm your password"
                  spellCheck="false"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className={style["reset-btn"]}>
              <button type="submit" onClick={handlerSubmit}>
                Reset Password
              </button>
            </div>
            <div className={style["reset-back-login"]}>
              <div className={style["reset-back-icon"]}>
                <Link to="/login">
                  <i className="fa-solid fa-arrow-left"></i>
                </Link>
              </div>
              <Link to="/login">Back to login</Link>
            </div>
          </div>
        </div>
      ) : (
        <ForgotPassword isTempToken={isTempToken} />
      )}
    </div>
  );
}
export default Reset;
