import React from "react";
import dataLaptop from "./data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Laptop() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="wrapper">
      <div className="head">
        <h3>Máy tính xách tay</h3>
        <a href="#">
          Xem tất cả
          <i className="fa fa-angle-double-right"></i>
        </a>
      </div>
      <Slider {...settings}>
        {dataLaptop.map((item, index) => (
          <div className="item" key={index}>
            <a href="#" className="item-image">
              <img src={item.imageProduct} alt="laptop" />
            </a>
            <span className="item-manufactory">
              <img src={item.imageManufactory} alt="" />
            </span>
            <h4 className="item-name">{item.name}</h4>
            <span className="item-price">{item.price}</span>
            <span className="btn-addCart">{item.btn}</span>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Laptop;
