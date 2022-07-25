import React, { useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import style from "./New.module.css";
import axios from "axios";

function NewUser({ inputs, title, isFile }) {
  const [info, setInfo] = useState({});
  const [file, setFile] = useState(null);

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInfo((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleCreateUser = async (e) => {
    e.preventDefault();
    let newUser = new FormData();
    if (info) {
      newUser.append("file", file);
      newUser.append("firstName", info.firstName);
      newUser.append("lastName", info.lastName);
      newUser.append("email", info.email);
      newUser.append("address", info.address);
      newUser.append("phone", info.phone);
      newUser.append("username", info.username);
      newUser.append("password", info.password);
    }

    try {
      await axios({
        method: "post",
        url: "http://localhost:8000/user/accounts/createProfile/admin",
        data: newUser,
        headers: {
          "Content-Type": "multipart/form-data",
          "access-token":
            "Bearer " + JSON.parse(localStorage.getItem("login")).accesstoken,
        },
      });
    } catch (error) {
      alert(error.response.message);
    }

    // try {
    //   await axios.post(
    //     `http://localhost:8000/user/accounts/creatProfile`,
    //     newUser,
    //     {
    //       headers: {
    //         "Content-Type": `multipart/form-data; boundary=${newUser._boundary}`,
    //         accept: "application/json",
    //         "access-token":
    //           "Bearer " + JSON.parse(localStorage.getItem("login")).accesstoken,
    //       },
    //     }
    //   );
    // } catch (error) {
    //   alert(error.response.message);
    // }
  };
  return (
    <div className={style.new}>
      <div className={style.newContainer}>
        <div className={style.top}>
          <h1>{title}</h1>
        </div>
        <div className={style.bottom}>
          {isFile && (
            <div className={style.left}>
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="image"
              />
            </div>
          )}
          <div className={style.right}>
            <form>
              {isFile && (
                <div className={style.formInput}>
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
              )}

              {inputs.map((input, index) => (
                <div className={style.formInput} key={index}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.name}
                    onChange={handleOnChange}
                  />
                </div>
              ))}
              <button type="submit" onClick={handleCreateUser}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewUser;
