import React, { Component, useEffect, useRef } from "react";
import Slider from "react-slick";
import styleContent from "./MutipleRow.module.css";
import Films from "../Films/Films";
import { useDispatch, useSelector } from "react-redux";
import {
  FILM_DANG_CHIEU,
  FILM_SAP_CHIEU,
} from "../../redux/actions/types/FilmType";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { getThongTinLichChieuAction } from "../../redux/actions/CinemaAction";
import { Cascader, Select } from "antd";
import _, { pick } from "lodash";
import { useState } from "react";
import {
  getThongTinHeThongRap,
  getThongTinLichChieu,
} from "../../services/ManagerCinemaService";
import { list } from "postcss";
import { GET_LICH_CHIEU } from "../../redux/actions/types/CinemaType";
import { useFormik } from "formik";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={`${className} ${styleContent["slick-next"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleContent["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const MultipleRows = (props) => {
  // state
  const [filmCurrent, setFilmCurrent] = useState("");
  const [htrCurrent, setHtrCurrent] = useState("");
  const [cumRapCurrent, setCumRapCurrent] = useState("");
  const [lichCurrent, setLichCurrent] = useState("");
  const [suatChieuCurrent, setSuatChieuCurrent] = useState("");

  // ref
  const refHtr = useRef(null);
  const refCumRap = useRef(null);
  const refLich = useRef(null);
  const refSuatChieu = useRef(null);

  // option
  const { Option } = Select;
  // HOOK ĐA NGÔN NGỮ
  const { t, i18n } = useTranslation();
  const nagivate = useNavigate();
  const dispatch = useDispatch();
  const { dangChieu, sapChieu } = useSelector(
    (state) => state.ManangerFilmReducer
  );

  // Lay lich chieu

  const { lichChieu } = useSelector((state) => state.ManagerCinema);
  // console.log({ lichChieu });

  // DAT STATE CUMRAP

  const settings = {
    className: "center slider  ",

    // centerMode: true,
    infinite: true,
    centerPadding: "60px",

    slidesToShow: 4,
    speed: 500,
    rows: 2,
    dots: false,
    slidesPerRow: 1,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const activeClassDC = dangChieu ? "active-btn" : "none-active-btn";
  const activeClassSC = sapChieu ? "active-btn" : "none-active-btn";

  const conversListFilm = () => {
    return props.listFilm?.map((film, index) => {
      return {
        value: film.maPhim,
        label: (
          <div key={index} className="w-36 mr-2">
            {film.tenPhim.length > 20
              ? film.tenPhim.slice(0, 20) + " ..."
              : film.tenPhim}
          </div>
        ),
        children: [
          {
            value: film.tenPhim,
            label: (
              <img
                key={`img-${index}`}
                style={{ width: 150, height: 150 }}
                src={film.hinhAnh}
                alt=""
              />
            ),
          },
        ],
      };
    });
  };

  const onChangeFilm = async (value) => {
    // Lay thong tin lich chieu

    setCumRapCurrent("");
    setHtrCurrent("");
    setLichCurrent("");
    setSuatChieuCurrent("");
    setFilmCurrent(value[0]);
    try {
      const res = await getThongTinLichChieu(value[0]);
      if (res && res.statusCode === 200) {
        // console.log(res);
        dispatch({
          type: GET_LICH_CHIEU,
          data: res.content,
        });
        // console.log("CUM RAP ", cumRap);
      } else {
        console.log("LOI", res.content);
      }
    } catch (err) {
      console.log("ERR", err);
    }
    //co lichChieu dung lodash pick ra cumRapChieu
    // const arrCumRapChieu = _.map(lichChieu?.heThongRapChieu, (item) =>
    //   _.map(item, "cumRapChieu")
    // );

    refHtr.current.blur();
  };
  // Phim CURRENT

  // HE THONG RAP
  const onChangeHeThongRap = (value) => {
    let item = lichChieu?.heThongRapChieu?.find(
      (rap) => rap.maHeThongRap === value
    );

    if (item !== undefined) {
      setHtrCurrent(item);
    }
  };

  const reverseHeThongRap = () => {
    return lichChieu?.heThongRapChieu?.map((rap, index) => {
      return {
        value: rap.maHeThongRap,
        label: <>{rap.tenHeThongRap}</>,
      };
    });
  };

  // CUM RAP
  const onChangeCumRap = (value) => {
    // console.log(value);

    let item = htrCurrent?.cumRapChieu?.find((item) => item.maCumRap === value);
    if (item !== undefined) {
      setCumRapCurrent(item);
      // console.log("CUM RAP", item);
    }
  };

  const reverseCumRap = () => {
    return htrCurrent?.cumRapChieu?.map((cumRap, index) => {
      return {
        value: cumRap.maCumRap,
        label: <>{cumRap.tenCumRap}</>,
      };
    });
  };

  const onchangeLichChieu = (value) => {
    // console.log(value);

    let item = cumRapCurrent?.lichChieuPhim?.find(
      (lich) => lich.maLichChieu === value
    );
    if (item !== undefined) {
      setLichCurrent(item);
      // console.log("LICH CURRENT", item);
    }
  };

  const reverseLichChieu = () => {
    return cumRapCurrent?.lichChieuPhim?.map((lich, index) => {
      return {
        value: lich.maLichChieu,
        label: <>{moment(lich.ngayChieuGioChieu).format("DD/MM/YYYY")}</>,
      };
    });
  };

  // SUAT CHIEU
  const onchangeSuatChieu = (value) => {
    // console.log(value);
    setSuatChieuCurrent(value);
    // console.log({ lichCurrent });
  };
  const reverseSuatChieu = () => {
    if (lichCurrent !== "") {
      return {
        value: lichCurrent?.maLichChieu,
        label: moment(lichCurrent?.ngayChieuGioChieu).format("hh:mm A"),
      };
    }
    return {
      label: <>NO DATA</>,
    };
  };
  return (
    <>
      <div className="flex justify-center mb-4">
        <Cascader
          defaultValue={<>Chose Film</>}
          allowClear={false}
          options={conversListFilm()}
          expandTrigger="hover"
          // displayRender={displayRender}
          onChange={onChangeFilm}
        />

        <Select
          onChange={onChangeHeThongRap}
          defaultValue={<>Chose he thong rap</>}
          ref={refHtr}
          style={{
            margin: "0 20px",
            width: 200,
          }}
          // value={}
          options={reverseHeThongRap()}
          optionLabelProp="label"
        />

        <Select
          onChange={onChangeCumRap}
          defaultValue={<>Chose Cum Rap</>}
          ref={refCumRap}
          style={{
            margin: "0 20px",
            width: 200,
          }}
          // value={}
          options={reverseCumRap()}
          optionLabelProp="label"
        />

        <Select
          onChange={onchangeLichChieu}
          defaultValue={<>Chose Lich Chieu</>}
          ref={refLich}
          style={{
            margin: "0 20px",
            width: 200,
          }}
          // value={}
          options={reverseLichChieu()}
          optionLabelProp="label"
        />

        <Select
          onChange={onchangeSuatChieu}
          defaultValue={<>Chose Suat Chieu</>}
          ref={refSuatChieu}
          style={{
            margin: "0 20px",
            width: 200,
          }}
          // value={}
          options={[reverseSuatChieu()]}
          optionLabelProp="label"
        />
        <button
          onClick={() => {
            nagivate(`/checkout/${lichCurrent?.maLichChieu}`);
          }}
          disabled={suatChieuCurrent === "" ? true : false}
          className={`${styleContent["btn-muaVe"]} ${styleContent["btn-muaVes"]}
            `}
        >
          Mua vé ngay
        </button>
      </div>
      <div className="listBtn text-center">
        <button
          type="button"
          className={`px-8 mr-2 py-3 font-semibold border rounded ${styleContent[activeClassDC]}`}
          onClick={() => {
            dispatch({
              type: FILM_DANG_CHIEU,
            });
          }}
        >
          {t("body.DangChieu")}
        </button>

        <button
          type="button"
          className={`px-8 py-3 font-semibold border rounded ${styleContent[activeClassSC]}`}
          onClick={() => {
            dispatch({
              type: FILM_SAP_CHIEU,
            });
          }}
        >
          {t("body.SapChieu")}
        </button>
      </div>
      <div>
        <Slider {...settings}>
          {props.listFilm.slice(0, 40).map((item, index) => {
            return (
              <div>
                <div
                  className={`${styleContent["item-width"]} sss text-right`}
                  key={index}
                >
                  <Films film={item} />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default MultipleRows;
