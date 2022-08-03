import React from "react";
import useCustomRouter from "../../Hooks/useCustomRouter";
import style from './SelectPrice.module.css'

const SelectPrice = ({page,manufacture}) => {
  const {pushQuery} = useCustomRouter();

  const handleChange = (e) => {
    const { value } = e.target;
<<<<<<< HEAD
    pushQuery({page, manufacture,sort:value})
=======
    pushQuery({page, manufacture,price:value})
>>>>>>> 79a9a69eeca10882ab6e98b7a901247d0e6cdcb6
  };

  return (
    <div className={style.selectPrice}>
      <select onChange={handleChange}>
<<<<<<< HEAD
        <option value="">Sort by Price</option>
=======
        <option value="">Sort</option>
>>>>>>> 79a9a69eeca10882ab6e98b7a901247d0e6cdcb6
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SelectPrice;
