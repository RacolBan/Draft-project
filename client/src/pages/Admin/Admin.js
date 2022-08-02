import React, { useContext } from "react";
import Chart from "./Conponents/Chart/Chart";
import style from './Admin.module.css'
import { GlobalState } from "../../GlobalState";

function Admin() {
  const state = useContext(GlobalState)
  const user= state.UserAPI.user[0];
  console.log(user);

  return (
    <div className={style.admin}>
      <div className={style.left}>
        <h1 className={style.title}>Information</h1>
        <div className={style.item}>
          <img
            src={`http://localhost:8000/${user.avatar}`}
            alt=""
            className={style.itemImg}
          />
          <div className={style.details}>
            <h1 className={style.itemTitle}>{`${user.firstname} ${user.lastname}`}</h1>
            <div className={style.detailItem}>
              <span className={style.itemKey}>Email:</span>
              <span className={style.itemValue}>{user.email}</span>
            </div>
            <div className={style.detailItem}>
              <span className={style.itemKey}>Phone:</span>
              <span className={style.itemValue}>{user.phone}</span>
            </div>
            <div className={style.detailItem}>
              <span className={style.itemKey}>Address:</span>
              <span className={style.itemValue}>
                {user.address}
              </span>
            </div>
            <div className={style.detailItem}>
              <span className={style.itemKey}>Country:</span>
              <span className={style.itemValue}>Viet Nam</span>
            </div>
          </div>
        </div>
      </div>
       <div className={style.right}>
        <Chart aspect={3/ 1} title="User Spending ( Last 6 Months)" />
      </div>
    </div>
  );
}

export default Admin;
