import React from "react";
import Slider from "../../components/Slider/Slider";

import style from './Home.module.css'

import Apple from "../../components/Category/Apple/Apple";
import Laptop from "../../components/Category/Laptop";


function Home() {
  return (
    <div className={style.container}>
      <Slider />
      <Laptop />
      <Apple />

    </div>
  );
}

export default Home;
