import React from "react";
import "./News.scss";
import { Button } from "antd";
import Slider from "react-slick";
const News = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,

    autoplaySpeed: 2000,
  };
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const cusTomRender = () => {
    return arr.map((_, index) => {
      return (
        <div className=" rounded-xl" style={{ width: "100%" }} key={index}>
          <img
            className="img-App border-solid rounded-xl"
            style={{ width: "100%" }}
            src={`./image/slide${index + 1}.jpg`}
            alt=""
          />
        </div>
      );
    });
  };
  return (
    <div className="News pt-24" style={{ width: "100vw" }}>
      <div
        className="news-content"
        style={{
          background: ` url("./image/backapp.jpg")`,
          height: 600,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          className="new-container"
          style={{
            width: "50%",
            margin: "auto",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%,-50%)`,
          }}
        >
          <div className="grid grid-cols-2 z-10 gap-3">
            <div className="new-right text-white pt-6">
              <p className="text-2xl">Ứng dụng tiện lợi dành cho</p>
              <p className="text-2xl mb-2">người yêu điện ảnh</p>

              <p className="text-sm mb-2">
                Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp
                và đổi quà hấp dẫn.
              </p>
              <Button className="rounded mb-2" danger>
                Cài đặt Progressive App
              </Button>
              <p>
                Tix có hai phiên bản <a href="#">IOS</a> và{" "}
                <a href="#">Android</a>
              </p>
            </div>
            <div className="mobile" style={{ position: "relative" }}>
              <img src="./image/mobile.png" className="imgMb" alt="mobile" />

              <div
                className="rounded-xl"
                style={{
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "99%",
                  padding: "1.5% 29.1% 1.3% 29.3%",
                  position: "absolute",
                }}
              >
                <Slider {...settings}>{cusTomRender()}</Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
