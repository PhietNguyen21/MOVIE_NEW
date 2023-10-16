import React from "react";
import "./News.scss";
import { Button } from "antd";
import Slider from "react-slick";
const News = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,

    autoplaySpeed: 1000,
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
    <div className="News pt-24">
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
          <div className="grid grid-cols-2 z-10 gap-3 news-list">
            <div className="new-left text-white pt-6">
              <p className="text-2xl">Ứng dụng tiện lợi dành cho</p>
              <p className="text-2xl mb-3">người yêu điện ảnh</p>

              <p className="text-sm mb-3">
                Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp
                và đổi quà hấp dẫn.
              </p>
              <button className="btn btn-danger mb-3" danger>
                Cài đặt Progressive App
              </button>
              <p>
                Tix có hai phiên bản{" "}
                <a
                  style={{ textDecoration: "underline" }}
                  className="font-bold text-white"
                  href="https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197"
                >
                  IOS
                </a>{" "}
                và{" "}
                <a
                  style={{ textDecoration: "underline" }}
                  className="font-bold"
                  href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123&pli=1"
                >
                  Android
                </a>
              </p>
            </div>
            <div className="mobile" style={{ position: "relative" }}>
              <img src="./image/mobile.png" className="imgMb" alt="mobile" />

              <div
                className="rounded-xl mobile"
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
