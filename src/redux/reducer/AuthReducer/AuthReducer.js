import { Login } from "iconsax-react";
import { GP00, USER_LOGIN, USER_REGISTER } from "../../../types/configType";
import {
  CAP_NHAT_THANH_CONG,
  CURRENT_PAGE,
  CURRENT_PAGE_FILM,
  DANG_NHAP_THANH_CONG,
  DANG_NHAP_THAT_BAI,
  DANG_XUAT,
  LAY_DANH_SACH_USER,
  LAY_THONG_TIN_TAI_KHOAN,
  LOGIN,
  REGISTER,
  TIM_KIEM_NGUOI_DUNG,
  UP_COMMENT,
  USER_CURRENT,
} from "../../actions/types/AuthType";
import { ThongTinUser } from "../../../_core/models/ThongTinUser";
import data from "../../../assets/dataRate.json";
import { LAY_THONG_TIN_PHIM } from "../../actions/types/FilmType";
import { useDispatch } from "react-redux";
import { DIS_LOADING, LOADING } from "../../actions/types/LoadingType";

let userDangNhap = {};
if (localStorage.getItem(USER_LOGIN)) {
  userDangNhap = JSON.parse(localStorage.getItem(USER_LOGIN));
}

// let access = "";
// if (localStorage.getItem("accessToken")) {
//   access = JSON.parse(localStorage.getItem("accessToken"));
// }
const stateDefault = {
  user: userDangNhap,
  soDT: null,
  lstUser: [],
  userEdit: {},
  lstUserDefault: [],
  dataComment: data.dataRate,
  thongTinTaiKhoan: {},
  currentPaginate: 1,
  currentPageFilm: 1,
};

export const AuthReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        soDT: action.dataUser.soDt,
      };

    case DANG_NHAP_THANH_CONG:
      // console.log(state.soDT);

      localStorage.setItem(USER_LOGIN, JSON.stringify(action.userLogin));

      localStorage.setItem(
        "accessToken",
        JSON.stringify(action.userLogin.accessToken)
      );

      return {
        ...state,
        user: action.userLogin,
      };
    case DANG_XUAT:
      localStorage.removeItem("USER_LOGIN");
      localStorage.removeItem("accessToken");

      return {
        ...state,
        user: {},
      };
    case LAY_DANH_SACH_USER: {
      return {
        ...state,
        lstUser: action.lstUser,
        lstUserDefault: action.lstUser,
      };
    }
    case USER_CURRENT: {
      // console.log(action);
      return { ...state, userEdit: action.userEdit };
    }
    case TIM_KIEM_NGUOI_DUNG: {
      return { ...state, lstUser: action.dataUser };
    }
    case UP_COMMENT: {
      let dataNew = [...state.dataComment];
      // console.log({ dataNew });
      // console.log(action.userCurrent.email === "lee123@gmail.com");
      let findIndex = dataNew.findIndex((item) => {
        // console.log("EMAIL", action.userCurrent);

        return item.email === action.userCurrent.email;
      });
      // console.log("FIND", findIndex);
      if (findIndex === -1) {
        dataNew.unshift(action.userCurrent);
      } else {
        dataNew[findIndex] = action.userCurrent;
      }
      return { ...state, dataComment: dataNew };
    }
    case LAY_THONG_TIN_TAI_KHOAN: {
      return { ...state, thongTinTaiKhoan: action.thongTinTaiKhoan };
    }

    case CAP_NHAT_THANH_CONG: {
      let userDN = { ...state.user };

      // GIU LAI ACCESS TOKEN
      userDN = {
        ...userDN,
        taiKhoan: action.userUpdate.taiKhoan,
        matKhau: action.userUpdate.matKhau,
        email: action.userUpdate.email,
        hoTen: action.userUpdate.hoTen,
        soDT: action.userUpdate.soDT,
        maNhom: GP00,
        loaiNguoiDung:
          action.userUpdate.loaiNguoiDung === "QuanTri"
            ? "Quản trị"
            : "Khách hàng",
      };
      localStorage.removeItem("USER_LOGIN");
      localStorage.setItem(USER_LOGIN, JSON.stringify(userDN));
      return { ...state, user: userDN };
    }
    case CURRENT_PAGE: {
      // console.log(action);
      return { ...state, currentPaginate: action.currentPage };
    }
    case CURRENT_PAGE_FILM: {
      return { ...state, currentPageFilm: action.currentPage };
    }
    default:
      return { ...state };
  }
};
