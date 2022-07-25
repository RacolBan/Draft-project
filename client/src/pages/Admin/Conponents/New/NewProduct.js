import React, { useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import style from "./New.module.css";
import axios from "axios";

function NewProduct({ inputs, title, isFile }) {
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

              {inputs.map((input,index) => (
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
              <button type="submit" onClick={handleCreateProduct}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;
