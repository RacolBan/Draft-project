import React from "react";
import useCustomRouter from "../../Hooks/useCustomRouter";

const SelectPrice = ({page,manufacture}) => {
  const {pushQuery} = useCustomRouter();

  const handleChange = (e) => {
    const { value } = e.target;
    pushQuery({page, manufacture,price:value})
  };

  return (
    <div>
      <select onChange={handleChange}>
        <option value="">Sort</option>
        <option value="asc">ASCENDING</option>
        <option value="desc">DESCENDING</option>
      </select>
    </div>
  );
};

export default SelectPrice;
