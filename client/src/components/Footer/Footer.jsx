import React from "react";
import { Link } from "react-router-dom";
import style from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={style.footer}>
      <div className={style["footer-col"]}>
        <h3 className={style["f-title"]}>Thông tin chung</h3>
        <ul className={style["f-list"]}>
          <li>
            <Link to="#">Giới thiệu về BK Tenology</Link>
          </li>
          <li>
            <Link to="#">Tin tuyển dụng</Link>
          </li>
          <li>
            <Link to="#">Tin tức</Link>
          </li>
          <li>
            <Link to="#">Tin khuyến mãi</Link>
          </li>
        </ul>
      </div>
      <div className={style["footer-col"]}>
        <h3 className={style["f-title"]}>Hổ trợ khách hàng</h3>
        <ul className={style["f-list"]}>
          <li>
            <Link to="#">Tìm hiểu về mua trả góp</Link>
          </li>
          <li>
            <Link to="#">Chính sách vận chuyển</Link>
          </li>
          <li>
            <Link to="#">Chính sách bảo hành</Link>
          </li>
          <li>
            <Link to="#">Chính sách đổi hàng</Link>
          </li>
        </ul>
      </div>
      <div className={style["footer-col"]}>
        <h3 className={style["f-title"]}>BK Đà Nẵng</h3>
        <div className="f-info">
          <div className={style["f-info-item"]}>
            <strong>Thời gian làm việc: </strong><span>07h30 - 20h30</span>
          </div>
          <div className={style["f-info-item"]}>
            <strong>Showroom: </strong>
            <span>152 Hàm Nghi, Quận Thanh Khuê, Đà Nẵng</span>
          </div>
          <div className={style["f-info-item"]}>
            <strong>Tell: </strong>
            <span>(0236) 3 888 000</span>
          </div>
          <div className={style["f-info-item"]}>
            <strong>Email: </strong>
            <span>danang@bk.com.vn</span>
          </div>
        </div>
      </div>
      <div className={style["footer-col"]}>
        <h3 className={style["f-title"]}>Chăm sóc khách hàng</h3>
        <div className="f-info">
          <div className={style["f-info-item"]}>
            <strong>Trung tâm Bảo Hành và Sửa chữa: </strong><span>Tầng 3 - 152 Hàm Nghi, Đà Nẵng </span>
          </div>
          <div className={style["f-info-item"]}>
            <strong>Gọi sửa chữa: </strong>
            <span>(0236)3 655 000</span>
          </div>
          <div className={style["f-info-item"]}>
            <strong>Tell: </strong>
            <span>(0236) 3 888 000</span>
          </div>
          <div className={style["f-info-item"]}>
            <strong>Gọi kỹ thuật: </strong>
            <span>(0236)3 872 000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
