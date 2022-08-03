import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useCustomRouter from "../../Hooks/useCustomRouter";
import style from './SelectManu.module.css'

<<<<<<< HEAD
const SelectManu = ({ page, categoryId,sort }) => {
=======
const SelectManu = ({ page, categoryId,price }) => {
>>>>>>> 79a9a69eeca10882ab6e98b7a901247d0e6cdcb6
  const [manufacture, setManufacture] = useState([]);
  const {pushQuery} = useCustomRouter();

  useEffect(() => {
    const getManufacture = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/manufacture/category/${categoryId}`
        );
        setManufacture(data);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    getManufacture();
  }, []);
  const handleChange = (e) => {
    const { value } = e.target;
<<<<<<< HEAD
    pushQuery({page,manufacture:value,sort})
=======
    pushQuery({page,manufacture:value,price})
>>>>>>> 79a9a69eeca10882ab6e98b7a901247d0e6cdcb6
  };

  return (
    <div className={style.selectManu}>
      <select onChange={handleChange}>
        <option value="0">Select Manufacture</option>
        {manufacture.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectManu;
