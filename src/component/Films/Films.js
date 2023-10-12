import React, { useState } from "react";
import "./Film.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ModalTrailer from "./ModalTrailer";
const Films = (props) => {
  const nagivate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { film } = props;
  // console.log("film", film);
  const styleContent = {
    height: "400px",

    backgroundPosition: "center",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  };
  const daoChuoi = (chuoi) => {
    let mangChuoi = chuoi.split("-");

    let mangChuoiDaNguoc = mangChuoi.reverse();

    let ngayKhoiChieu = mangChuoiDaNguoc.join("-");
    return ngayKhoiChieu;

    // let tachChuoi = ngayKhoiChieu.split("");
    // let daoChuoi = tachChuoi.reverse();
    // return daoChuoi.split("-");
  };

  return (
    <div
      className="card"
      style={{
        width: "18rem",
        marginTop: 10,
        boxShadow: `rgb(38, 57, 77) 0px 20px 30px -10px`,
      }}
    >
      <div
        className="img"
        style={{
          ...styleContent,
          backgroundImage: `url(${film.hinhAnh})`,
        }}
      >
        <img
          className="card-img-top opacity-0"
          src={film.hinhAnh}
          alt={film.tenPhim}
        />
        <div className="list-Btn">
          <button
            onClick={() => {
              nagivate(`/detail/${film.maPhim}`);
            }}
            className="btn-datVe mb-2"
          >
            Chi tiết
          </button>
          <ModalTrailer film={film} />
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title text-center font-bold h-8">{film.tenPhim}</h5>

        <p className="card-text text-center">
          {film.moTa.length > 0 ? `${film.moTa.slice(0, 100)} ...` : film.moTa}
        </p>

        <div className="time mt-2 border-t-2 border-gray text-center">
          <span className="font-semibold">
            Ngày khởi chiếu : {daoChuoi(film.ngayKhoiChieu.slice(0, 10))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Films;
