import React from "react";
import Slider from "../../components/Slider/Slider";
import Apple from "../../components/Apple/Apple";
import style from './Home.module.css'
import CategoryLaptop from "../../components/Category/Category";


function Home() {
  return (
    <div className={style.container}>
      <Slider />
      <CategoryLaptop />
      <Apple />

    </div>
  );
}

export default Home;
