import { Login } from "iconsax-react";
import { USER_LOGIN } from "../../../types/configType";
import {
  DANG_NHAP_THANH_CONG,
  DANG_NHAP_THAT_BAI,
  DANG_XUAT,
  LOGIN,
  REGISTER,
} from "../../actions/types/AuthType";

let userDangNhap = {};
if (localStorage.getItem(USER_LOGIN)) {
  userDangNhap = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const stateDefault = {
  user: userDangNhap,
  soDT: null,
};

export const AuthReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        soDT: action.dataUser.soDt,
      };
    case DANG_NHAP_THANH_CONG:
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
    default:
      return { ...state };
  }
};
