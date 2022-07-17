import React from "react";
import Slider from "../../components/Slider/Slider";
import Apple from "../../components/Apple/Apple";
import style from './Home.module.css'
import Category from "../../components/Category/Category";


function Home() {
  return (
    <div className={style.container}>
      <Slider />
      <Category />
      <Apple />

    </div>
  );
}

export default Home;
