import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import style from "./Category.module.css";

function CategoryProduct({categoryList}) {
  return (
    <div className={`l-10 ${style["header-menu"]}`}>
      <div className="row no-gutters">
        <div className={style.menu}>
          <div className={style["menu-left"]}>
            <i className="fas fa-bars"></i>
            Category
          </div>
          <div className={style["menu-nav"]}>
            <ul className={style["menu-list"]}>
              {categoryList.map((item, index) => {
                return (
                  <li className={style["menu-item"]} key={index}>
                    <img src={`./images/Icon/${index}.png`} alt="MTXT" />
                    <Link to="">{item}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryProduct;
