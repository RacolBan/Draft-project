import React, { useEffect, useState } from "react";
import dataSlider from "./dataSlider";
import style from "./Slider.module.css";

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const slideLength = dataSlider.length;

  let slideInterval;
  let intervalTime = 3000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength ? 1 : currentSlide + 1);
  };


  useEffect(() => {
    slideInterval = setInterval(nextSlide, intervalTime)

    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <>
      <div className={style.container}>
        {dataSlider.map((obj, index) => {
          return (
            <div
              key={obj.id}
              className={`${currentSlide} === ${index} ? ${style.slide} ${
                style.active
              } : ${style.slide}`}
            >
              <img src={obj.image + (currentSlide) + ".jpg"} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Slider;
