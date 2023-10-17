import React, { Component } from "react";
import Slider from "react-slick";
import "./HomeCarousel.scss";
const HomeCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  // const styleBG={

  // }
  const renderIMG = () => {
    const arr = [1, 2, 3];

    return arr.map((_, index) => {
      // console.log(index);
      return (
        <div key={index} className="divImg">
          <img
            src={`./image/imgLotte${index + 1}.jpg`}
            className="w-full"
            style={{
              height: "450px",
              width: "100%",
              objectFit: "cover",
            }}
            alt=""
          />
        </div>
      );
    });
  };
  return (
    <div className="homeCarousel" style={{ paddingTop: "60px" }}>
      <Slider {...settings}>{renderIMG()}</Slider>
    </div>
  );
};

export default HomeCarousel;
