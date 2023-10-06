import { GP00 } from "../types/configType";
import axios from "../util/axiosCustomize";
export const getListCinema = (maHeThongRap = "") => {
  if (maHeThongRap === "") {
    return axios.get(
      `https://movieapi.cyberlearn.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GP00}`
    );
  }
  return axios.get(
    `https://movieapi.cyberlearn.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP00`
  );
};

export const getThongTinPhim = (id) => {
  return axios.get(
    `https://movieapi.cyberlearn.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`
  );
};

export const getThongTinHeThongRap = () => {
  return axios.get(
    "https://movieapi.cyberlearn.vn/api/QuanLyRap/LayThongTinHeThongRap"
  );
};

export const getThongTinCumRap = (maHeThongRap) => {
  return axios.get(
    `https://movieapi.cyberlearn.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
  );
};

export const getThongTinLichChieu = (maPhim) => {
  return axios.get(
    `https://movieapi.cyberlearn.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
  );
};
