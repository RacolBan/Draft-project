import React, { useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import style from "./New.module.css";
import axios from "axios";

function New({ inputs, title, isFile }) {
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
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    let newProduct = new FormData();

    newProduct.append("file", file, file.name);
    newProduct.append("name", info.name);
    newProduct.append("price", info.Price);
    newProduct.append("description", info.Description);
    newProduct.append("nameManufacture", info.Manufacture);
    newProduct.append("nameCategory", info.Category);
    try {
      await axios.post(`http://localhost:8000/api/products`, newProduct, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${newProduct._boundary}`,
          accept: "application/json",
          "access-token":
            "Bearer " + JSON.parse(localStorage.getItem("login")).accesstoken,
        },
      });
    } catch (error) {
      alert(error.response.message);
    }
  };
  const handleCreateManufacture = async (e) => {
    e.preventDefault();
    const newManufacture = {
      name:info.name
    }
    try {
      await axios.post(
        `http://localhost:8000/api/manufacture`,
        newManufacture,
        {
          headers: {
            "Content-Type": "application/json",
            "access-token":
              "Bearer " + JSON.parse(localStorage.getItem("login")).accesstoken,
          },
        }
      );
    } catch (error) {
      alert(error.response.message);
    }
  };
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    const newCategory = {
      name:info.name
    }
    try {
      await axios.post(
        `http://localhost:8000/api/category`,
        newCategory,
        {
          headers: {
            "Content-Type": "application/json",
            "access-token":
              "Bearer " + JSON.parse(localStorage.getItem("login")).accesstoken,
          },
        }
      );
    } catch (error) {
      alert(error.response.message);
    }
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

              {inputs.map((input) => (
                <div className={style.formInput} key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.name}
                    onChange={handleOnChange}
                  />
                </div>
              ))}
              <button type="submit" onClick={handleCreateCategory}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
