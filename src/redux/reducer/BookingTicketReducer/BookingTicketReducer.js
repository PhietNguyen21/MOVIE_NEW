import { ThongTinPhongVe } from "../../../_core/models/ThongTinPhongVe";
import {
  CHON_VE,
  CLEAR_VE_DANG_DAT,
  DAT_VE,
  GET_LIST_PHONG_VE,
  THONG_TIN_DAT_VE,
} from "../../actions/types/TicketType";

const stateDefault = {
  heThongPhongVe: new ThongTinPhongVe(),
  danhSachVeDangDat: [],
  thongTinDatve: {},
  thongTinNguoiDung: {},
  danhSachVeKHDangDat: [{ maGhe: 48857 }, { maGhe: 48858 }],
  countThanhToan: 0,
  gioChieu: "",
};
export const BookingTicketReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LIST_PHONG_VE:
      return { ...state, heThongPhongVe: action.heThongPhongVe };
    case CHON_VE: {
      const danhSachGheCapNhat = [...state.danhSachVeDangDat];

      const index = danhSachGheCapNhat.findIndex(
        (item) => item.maGhe === action.Ghe.maGhe
      );
      if (index !== -1) {
        danhSachGheCapNhat.splice(index, 1);
      } else {
        danhSachGheCapNhat.push(action.Ghe);
      }
      return { ...state, danhSachVeDangDat: danhSachGheCapNhat };
    }
    case DAT_VE: {
      return {
        ...state,
        thongTinDatve: action.thongTinDatve,
      };
    }
    case THONG_TIN_DAT_VE: {
      return { ...state, thongTinNguoiDung: action.data };
    }
    case CLEAR_VE_DANG_DAT: {
      return { ...state, danhSachVeDangDat: [] };
    }

    case "LAY_GIO_CHIEU": {
      return { ...state, gioChieu: action.gioChieu };
    }
    default:
      return { ...state };
  }
};
