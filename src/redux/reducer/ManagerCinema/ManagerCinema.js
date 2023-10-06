import { GET_THONG_TIN_PHIM } from "../../../types/configType";
import {
  GET_LICH_CHIEU,
  GET_LIST_CINEMA,
  GET_MA_LICH_CHIEU,
} from "../../actions/types/CinemaType";

const stateDefault = {
  heThongRapChieu: [],
  filmDetail: {},
  lichChieu: [],
};

export const ManagerCinema = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LIST_CINEMA: {
      return { ...state, heThongRapChieu: action.heThongRapChieu };
    }
    case GET_THONG_TIN_PHIM: {
      return { ...state, filmDetail: action.filmDetail };
    }
    case GET_LICH_CHIEU: {
      return { ...state, lichChieu: action.data };
    }

    default:
      return { ...state };
  }
};
