import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./Register.module.css";

function Register() {
  const nav = useNavigate()
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    username: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    firstname: "",
    lastname: "",
    username: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };
  const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "firstname":
          if (!value) {
            stateObj[name] = "Please enter Firstname.";
          } else if (value.length < 3) {
            stateObj[name] =
              "Firstname required number of characters must be between 3 to 10";
          } else if (value.length > 10) {
            stateObj[name] =
              "Firstname required number of characters must be between 3 to 10";
          }
          break;

        case "lastname":
          if (!value) {
            stateObj[name] = "Please enter Lastname.";
          } else if (value.length < 3) {
            stateObj[name] =
              "Lastname required number of characters must be between 3 to 10";
          } else if (value.length > 10) {
            stateObj[name] =
              "Lastname required number of characters must be between 3 to 10";
          }
          break;

        case "username":
          if (!value) {
            stateObj[name] = "Please enter Username.";
          } else if (value.length < 3) {
            stateObj[name] =
              "Username required number of characters must be between 3 to 20";
          } else if (value.length > 20) {
            stateObj[name] =
              "Username required number of characters must be between 3 to 20";
          }
          break;

        case "phone":
          if (!value) {
            stateObj[name] = "Please enter phone.";
          } else if (!regexPhone.test(value)) {
            stateObj[name] = "Phone required 10 digit numbers";
          }
          break;

        case "address":
          if (!value) {
            stateObj[name] = "Please enter Address.";
          } else if (value.length < 3) {
            stateObj[name] =
              "Address required number of characters must be between 3 to 50";
          } else if (value.length > 50) {
            stateObj[name] =
              "Address required number of characters must be between 3 to 50";
          }
          break;

        case "email":
          if (!value) {
            stateObj[name] = "Please enter Email.";
          } else if (!regexEmail.test(value)) {
            stateObj[name] = "Invalid Email";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (value.length < 6) {
            stateObj[name] = "Password required more than 6 letters";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };
  const user = {
    username: input.username,
    password: input.password,
    firstName: input.firstname,
    lastName: input.lastname,
    address: input.address,
    phone: input.phone,
    email: input.email,
  };
  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/user/accounts/creatProfile",
        {
          ...user,
        }
      );
      const login = {
        accesstoken: data.accesstoken,
        accountId: data.newAccount.id,
        username: data.newAccount.username,
        avatar: null
      };
      localStorage.clear()
      localStorage.setItem("login", JSON.stringify(login));
     
      toast.success("Register successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      return nav('/')
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className={style.container}>
      <form id={style.signup} onSubmit={registerSubmit}>
        <div className={style.header}>
          <h3>REGISTER</h3>
        </div>
        <div className={style.inputs}>
          <div className={style["input-item"]}>
            <input
              type="text"
              name="firstname"
              placeholder="Enter Firstname"
              value={input.firstname}
              onChange={onInputChange}
              onBlur={validateInput}
              spellCheck="false"
            ></input>
            {error.firstname && (
              <span className={style.error}>{error.firstname}</span>
            )}
          </div>
          <div className={style["input-item"]}>
            <input
              type="text"
              name="lastname"
              placeholder="Enter Lastname"
              value={input.lastname}
              onChange={onInputChange}
              onBlur={validateInput}
              spellCheck="false"
            ></input>
            {error.lastname && (
              <span className={style.error}>{error.lastname}</span>
            )}
          </div>
          <div className={style["input-item"]}>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={input.username}
              onChange={onInputChange}
              onBlur={validateInput}
              spellCheck="false"
            ></input>
            {error.username && (
              <span className={style.error}>{error.username}</span>
            )}
          </div>
          <div className={style["input-item"]}>
            <input
              type="text"
              name="address"
              placeholder="Enter Address"
              value={input.address}
              onChange={onInputChange}
              onBlur={validateInput}
              spellCheck="false"
            ></input>
            {error.address && (
              <span className={style.error}>{error.address}</span>
            )}
          </div>
          <div className={style["input-item"]}>
            <input
              type="text"
              name="phone"
              placeholder="Enter Phone"
              value={input.phone}
              onChange={onInputChange}
              onBlur={validateInput}
              spellCheck="false"
            ></input>
            {error.phone && <span className={style.error}>{error.phone}</span>}
          </div>
          <div className={style["input-item"]}>
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              value={input.email}
              onChange={onInputChange}
              onBlur={validateInput}
              spellCheck="false"
            ></input>
            {error.email && <span className={style.error}>{error.email}</span>}
          </div>
          <div className={style["input-item"]}>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={input.password}
              onChange={onInputChange}
              onBlur={validateInput}
              spellCheck="false"
            ></input>
            {error.password && (
              <span className={style.error}>{error.password}</span>
            )}
          </div>

          <div className={style["input-item"]}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Enter Confirm Password"
              value={input.confirmPassword}
              onChange={onInputChange}
              onBlur={validateInput}
              spellCheck="false"
            ></input>
            {error.confirmPassword && (
              <span className={style.error}>{error.confirmPassword}</span>
            )}
          </div>

          <div className={style.checkboxy}>
            <input name="check" id="checkbox" value="1" type="checkbox" />
            <label htmlFor="checkbox" className={style.terms}>
              I agree with the term of services
            </label>
          </div>

          <button id={style.submit}>Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
