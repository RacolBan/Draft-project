import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import style from "./Profile.module.css";
import FormData from "form-data";

function Profile() {
  const state = useContext(GlobalState);
  const user = state.UserAPI.user[0];

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (user.username) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setAddress(user.address);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [user]);
  const newUser = {
    firstName: firstname,
    lastName: lastname,
    address,
    email,
    phone,
  };
  const updateSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8000/user/${user.accountId}/updateInfor`,
        newUser,
        { headers: { "access-token": "Bearer " + user.accesstoken } }
      );
      alert("Update successfully");
      setTimeout(() => {
        window.location.href = "/profile";
      }, 200);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const uploadImage = () => {
    document.getElementById("update-img").click();
  };

  const changeImage = async (e) => {
    setFile(e.target.files[0]);
  };
  
  useEffect(() => {
    if (file) {
      const updateAvatar = async () => {
        let newAvatar = new FormData();
    
        newAvatar.append("file", file);
        try {
          const { data } = await axios.put(
            `http://localhost:8000/user/upload/${user.userId}`,
            newAvatar,
            {
              headers: {
                "Content-Type": `multipart/form-data; boundary=${newAvatar._boundary}`,
                accept: "application/json",
              },
            }
          );
          alert("Update successfully");
          const local = JSON.parse(localStorage.getItem("login"));
          local.avatar = data;
          localStorage.setItem("login", JSON.stringify(local));
          setTimeout(() => {
            window.location.href = "/profile";
          }, 200);
        } catch (error) {
          alert(error.response.data.message);
        }
      };
      updateAvatar();
    }
  }, [file,user.userId]);
  return (
    <div className={style.container}>
      <div className={style.profile}>
        <div className={style["profile-left"]}>
          <div className={style["profile-left-header"]}>
            <div className={style["profile-left-avatar"]}>
              <img
                src={
                  user.avatar === null
                    ? "../../../../images/Avatar/avatar.jpg"
                    : `http://localhost:8000/${user.avatar}`
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
              <Link to="/changepass">Change Password</Link>
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
                      disabled
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
                      disabled
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
                <input
                  type="file"
                  id="update-img"
                  accept=".jpg,.jpeg,.png"
                  name="file"
                  onChange={changeImage}
                />
                <img
                  src={
                    user.avatar === null
                      ? "../../../../images/Avatar/avatar.jpg"
                      : `http://localhost:8000/${user.avatar}`
                  }
                  alt="avatar"
                />
                <button
                  className={style["select-img"]}
                  type="button"
                  onClick={uploadImage}
                >
                  Select Image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
