import { GP00 } from "../types/configType";
import axios from "../util/axiosCustomize";

export const postRegister = (taiKhoan, matKhau, email, soDt, maNhom, hoTen) => {
  return axios.post(
    "https://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangKy",
    {
      taiKhoan,
      matKhau,
      email,
      soDt,
      maNhom,
      hoTen,
    }
  );
};

export const postLogin = (taiKhoan, matKhau) => {
  return axios.post(
    "https://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangNhap",
    {
      taiKhoan,
      matKhau,
    }
  );
};

export const getDanhSachNguoiDung = () => {
  return axios.get(
    `https://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GP00}`
  );
};

export const postThemNguoiDung = (
  taiKhoan,
  matKhau,
  email,
  soDt,
  maNhom,
  maLoaiNguoiDung,
  hoTen
) => {
  return axios.post(
    `https://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/ThemNguoiDung`,
    {
      taiKhoan,
      matKhau,
      email,
      soDt,
      maNhom,
      maLoaiNguoiDung,
      hoTen,
    }
  );
};

export const postCapNhapThongTinNguoiDung = (
  taiKhoan,
  matKhau,
  email,
  soDt,
  maNhom,
  maLoaiNguoiDung,
  hoTen
) => {
  return axios.post(
    "https://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
    {
      taiKhoan,
      matKhau,
      email,
      soDt,
      maNhom,
      maLoaiNguoiDung,
      hoTen,
    }
  );
};

export const deleteXoaNguoiDung = (taiKhoan) => {
  return axios.delete(
    `https://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
  );
};

export const getTimKiemNguoiDung = (tuKhoa) => {
  let url = "";
  if (tuKhoa !== "") {
    url = `&tuKhoa=${tuKhoa}`;
  } else {
    url = "";
  }
  return axios.get(
    `https://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP00` +
      url
  );
};

export const postThongTinTaiKhoan = () => {
  return axios.post(
    "https://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan"
  );
};

export const putCapNhatThongTinNguoiDung = (
  taiKhoan,
  matKhau,
  email,
  soDt,
  maNhom,
  maLoaiNguoiDung,
  hoTen
) => {
  return axios.put(
    "https://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
    {
      taiKhoan,
      matKhau,
      email,
      soDt,
      maNhom,
      maLoaiNguoiDung,
      hoTen,
    }
  );
};
