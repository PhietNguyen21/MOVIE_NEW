import { toast } from "react-toastify";
import {
  getListPhongVe,
  postDatVe,
  postTaoLichChieu,
  postThongTinNguoiDung,
} from "../../services/BookingService";
import {
  DAT_VE,
  GET_LIST_PHONG_VE,
  THONG_TIN_DAT_VE,
} from "./types/TicketType";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { DIS_LOADING, LOADING } from "./types/LoadingType";
import { type } from "@testing-library/user-event/dist/type";

export const getListPhongVeAction = (maPhongVe) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: LOADING,
      });
      const res = await getListPhongVe(maPhongVe);
      if (res.statusCode === 200 && res) {
        dispatch({
          type: GET_LIST_PHONG_VE,
          heThongPhongVe: res.content,
        });
      } else {
        console.log(res.content);
      }
      dispatch({
        type: DIS_LOADING,
      });
      // setTimeout(() => {

      // }, [1200]);
    } catch (error) {
      dispatch({
        type: DIS_LOADING,
      });
      console.log("ERR", error);
    }
  };
};

export const postDatVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
  return async (dispatch, getState) => {
    try {
      // NEU CO THONG TIN DAT VE MOI LOAD
      if (thongTinDatVe.danhSachVe?.length > 0) {
        dispatch({
          type: LOADING,
        });
      }
      const res = await postDatVe(thongTinDatVe);
      // console.log(res);
      // NEU CO THONG TIN DAT VE MOI CHAY
      if (
        thongTinDatVe.danhSachVe?.length > 0 &&
        res &&
        res.statusCode === 200
      ) {
        await dispatch({
          type: DAT_VE,
          thongTinDatVe: thongTinDatVe,
        });
        if (thongTinDatVe.danhSachVe?.length > 0) {
          dispatch(postThongTinNguoiDungAction());
          setTimeout(() => {
            dispatch({
              type: DIS_LOADING,
            });
          }, [3000]);

          await toast.success(res.content);
        }
      } else {
        // dispatch(DIS_LOADING);
        toast.error("Bạn chưa chọn chỗ");
      }

      // NEU CO THONG TIN DAT VE MOI LOAD
    } catch (error) {
      dispatch({
        type: DIS_LOADING,
      });
    }
  };
};

export const postThongTinNguoiDungAction = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: LOADING,
      });

      const res = await postThongTinNguoiDung();

      if (res.statusCode === 200) {
        setTimeout(() => {
          dispatch({
            type: THONG_TIN_DAT_VE,
            data: res.content,
          });
        }, [500]);
      }
      dispatch({
        type: DIS_LOADING,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const postTaoLichChieuAction = (
  maPhim,
  ngayChieuGioChieu,
  maRap,
  giaVe
) => {
  return async (dispatch) => {
    try {
      const res = await postTaoLichChieu(
        maPhim,
        ngayChieuGioChieu,
        maRap,
        giaVe
      );
      if (res && res.statusCode === 200) {
        console.log(res);
        toast.success(res.message);
      } else {
        console.log(res);
        toast.error(res.content);
      }
    } catch (error) {
      console.log("ERR", error);
    }
  };
};
