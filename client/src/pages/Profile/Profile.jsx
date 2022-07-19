import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import style from "./Profile.module.css";

function Profile() {
  const state = useContext(GlobalState);
  const user = state.UserAPI.user[0];

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    if (user.username) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setAddress(user.address);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [user]);
  console.log(user);
  const newUser = {
    firstName:firstname,
    lastName:lastname,
    address,
    email,
    phone,
  };
  const updateSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8000/user/${user.accountId}/updateInfor`,
        newUser
      );

      alert("Update successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.profile}>
        <div className={style["profile-left"]}>
          <div className={style["profile-left-header"]}>
            <div className={style["profile-left-avatar"]}>
              <img
                src={
                  user.avatar === null
                    ? "./images/Avatar/avatar.jpg"
                    : user.avatar
                }
                alt="avatar"
              />
            </div>
            <div className={style["profile-left-username"]}>
              {user.username}
            </div>
          </div>
          <div className={style["profile-left-body"]}>
            <div className={style["profile-left-body-info"]}>
              <i className="fa-solid fa-user"></i>
              <span>My account</span>
            </div>
            <div className={style["profile-left-body-changePass"]}>
              Change Password
            </div>
          </div>
        </div>
        <div className={style["profile-right"]}>
          <div className={style["profile-right-header"]}>
            <h3>My profile</h3>
            <span>Manage profile information for account security</span>
          </div>
          <div className={style["profile-right-body"]}>
            <div className={style["profile-right-body-left"]}>
              <form onSubmit={updateSubmit}>
                <div className={style["profile-right-body-infomation"]}>
                  <div className={style["profile-right-body-name"]}>
                    Username:
                  </div>
                  <div className={style["profile-right-body-info"]}>
                    {user.username}
                  </div>
                </div>
                <div className={style["profile-right-body-infomation"]}>
                  <div className={style["profile-right-body-name"]}>
                    Firstname:
                  </div>
                  <div className={style["profile-right-body-info"]}>
                    <input
                      type="text"
                      spellCheck="false"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>
                </div>
                <div className={style["profile-right-body-infomation"]}>
                  <div className={style["profile-right-body-name"]}>
                    Lastname:
                  </div>
                  <div className={style["profile-right-body-info"]}>
                    <input
                      type="text"
                      spellCheck="false"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                </div>
                <div className={style["profile-right-body-infomation"]}>
                  <div className={style["profile-right-body-name"]}>
                    Address:
                  </div>
                  <div className={style["profile-right-body-info"]}>
                    <input
                      type="text"
                      spellCheck="false"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className={style["profile-right-body-infomation"]}>
                  <div className={style["profile-right-body-name"]}>Email:</div>
                  <div className={style["profile-right-body-info"]}>
                    <input
                      type="text"
                      spellCheck="false"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className={style["profile-right-body-infomation"]}>
                  <div className={style["profile-right-body-name"]}>Phone:</div>
                  <div className={style["profile-right-body-info"]}>
                    <input
                      type="text"
                      spellCheck="false"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className={style.btn}>
                  <button type="submit" className={style["btn-save"]}>
                    Save
                  </button>
                </div>
              </form>
            </div>

            <div className={style["profile-right-body-right"]}>
              <div className={style["profile-right-body-file"]}>
                <input type="file" name="" id="" />
                <img
                  src={
                    user.avatar === null
                      ? "./images/Avatar/avatar.jpg"
                      : user.avatar
                  }
                  alt="avatar"
                />
                <button className={style["select-img"]}>Select Image</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
