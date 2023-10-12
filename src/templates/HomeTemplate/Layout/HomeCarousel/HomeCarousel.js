// import { Carousel } from "antd";

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getBannerAction } from "../../../../redux/actions/CarouselAction";
// import "./HomeCarousel.scss";

// import AwesomeSlider from "react-awesome-slider";

// import "react-awesome-slider/dist/styles.css"; // Import CSS
// // import "react-awesome-slider/dist/custom-animations/cube-animation.css";

// const HomeCarousel = (prop) => {
//   const { arrIMG } = useSelector((state) => state.CarouselReducer);
//   const dispatch = useDispatch();
//   // console.log(arrIMG);

//   useEffect(() => {
//     dispatch(getBannerAction());
//   }, []);
//   const arrHinh = [];
//   // return (
//   //   <Carousel effect="fade">
//   //     {arrIMG &&
//   //       arrIMG?.map((item, index) => {
//   //         return (
//   //           <div key={`banner-${index}`}>
//   //             <div
//   //               className="object-fill"
//   //               style={{
//   //                 ...contentStyle,
//   //                 background: `url(${item.hinhAnh})`,
//   //               }}
//   //             >
//   //               <img src={item.hinhAnh} className="w-full opacity-0" alt="" />
//   //             </div>
//   //           </div>
//   //         );
//   //       })}
//   //   </Carousel>

//   // );
//   const renderIMG = () => {
//     return arrIMG?.map((item, index) => {
//       return arrHinh.push(item.hinhAnh);
//     });
//   };

//   useEffect(() => {
//     renderIMG();
//   }, []);

//   return (
//     <AwesomeSlider className="custom-slider">
//       <div
//         className="item-slider"
//         style={{
//           backgroundImage: "url(./image/south-park-1.jpg)",
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//           backgroundPosition: "100% 100%",
//         }}
//         // data-src="./image/south-park-1.jpg"
//       />
//       <div
//         className="item-slider"
//         style={{
//           backgroundImage: "url(./image/south-park-3.jpg)",
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//           backgroundPosition: "100% 100%",
//         }}
//         // data-src="./image/south-park-3.jpg"
//       />
//       <div
//         className="item-slider"
//         style={{
//           backgroundImage: "url(./image/south-park-4.jpg)",
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//           backgroundPosition: "100% 100%",
//         }}
//         // data-src="./image/south-park-4.jpg"
//       />
//     </AwesomeSlider>
//   );
// };
// export default HomeCarousel;

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
    <div className="homeCarousel" style={{ paddingTop: "100px" }}>
      <Slider {...settings}>{renderIMG()}</Slider>
    </div>
  );
};

export default HomeCarousel;
