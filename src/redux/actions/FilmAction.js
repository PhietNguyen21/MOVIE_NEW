import axios from "axios";
import {
  deletePhim,
  getListFilm,
  postCapNhatPhim,
  postThemFilm,
} from "../../services/MangerFilmServices";
import {
  ACTION_ERROR,
  ACTION_SUCCESS,
  GET_LIST_FILM,
  LAY_THONG_TIN_PHIM,
} from "./types/FilmType";
import { DIS_LOADING, LOADING } from "./types/LoadingType";
import { toast } from "react-toastify";
import { getThongTinPhim } from "../../services/ManagerCinemaService";
import { useNavigate } from "react-router-dom";

export const getListFilmAction = (tenPhim) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: LOADING,
      });
      const res = await getListFilm(tenPhim);
      if (res && res.statusCode === 200) {
        dispatch({
          type: GET_LIST_FILM,
          listFilm: res.content,
        });
      }

      setTimeout(() => {
        dispatch({
          type: DIS_LOADING,
        });
      }, []);
    } catch (error) {
      console.log("err", error);
    }
  };
};

export const postThemFilmAction = (
  tenPhim,
  trailer,
  moTa,
  ngayKhoiChieu,
  sapChieu,
  dangChieu,
  hot,
  danhGia,
  hinhAnh,
  maNhom
) => {
  return async (dispatch) => {
    try {
      const res = await postThemFilm(
        tenPhim,
        trailer,
        moTa,
        ngayKhoiChieu,
        sapChieu,
        dangChieu,
        hot,
        danhGia,
        hinhAnh,
        maNhom
      );
      console.log(res);
      if (res && res.statusCode === 200) {
        toast.success("Thêm thành công");
        console.log(res);
      } else {
        toast.error(res.content);
      }
    } catch (error) {
      console.log("ERR", error);
    }
  };
};

export const getLayThongTinPhimAcion = (maPhim) => {
  return async (dispatch) => {
    try {
      const res = await getThongTinPhim(maPhim);
      if (res && res.statusCode === 200) {
        // console.log(res);
        dispatch({
          type: LAY_THONG_TIN_PHIM,
          thongTinPhim: res.content,
        });
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const postCapNhatFilmAction = (
  maPhim,
  tenPhim,
  trailer,
  moTa,
  ngayKhoiChieu,
  sapChieu,
  dangChieu,
  hot,
  danhGia,
  hinhAnh,
  maNhom
) => {
  // const navigate = useNavigate();
  return async (dispatch) => {
    try {
      const res = await postCapNhatPhim(
        maPhim,
        tenPhim,
        trailer,
        moTa,
        ngayKhoiChieu,
        sapChieu,
        dangChieu,
        hot,
        danhGia,
        hinhAnh,
        maNhom
      );
      console.log(res);
      if (res && res.statusCode === 200) {
        toast.success("Cập nhật thành công");
      } else {
        console.log(res);

        toast.error(res.content);
      }
    } catch (error) {
      console.log("ERR", error);
    }
  };
};

export const deletePhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const res = await deletePhim(maPhim);
      if (res && res.statusCode === 200) {
        console.log(res);
        toast.success(res.message);
      } else {
        console.log(res);
        toast.error(res.message);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
};
