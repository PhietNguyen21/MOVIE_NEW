import { Form, Input, Button, Checkbox, Typography, Space } from "antd";

import { NavLink, useNavigate } from "react-router-dom";
// import "./Register.scss";
import { useState } from "react";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import axios from "../../util/axiosCustomize";
import { REGISTER } from "../../redux/actions/types/AuthType";
import { postRegister } from "../../services/AuthServices";
const Register = () => {
  const [edit, setEdit] = useState({
    email: "",
    taiKhoan: "",
    matKhau: "",
    soDt: "",
    maNhom: "GP00",
    hoTen: "",
  });
  const dispatch = useDispatch();
  const nagivate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit({
      ...edit,
      [name]: name === "soDt" ? parseInt(value) : value,
    });
    // console.log(edit);
  };

  const onRegister = async (e) => {
    const res = await axios.post(
      "https://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangKy",
      {
        taiKhoan: edit.taiKhoan,
        email: edit.email,
        matKhau: edit.matKhau,
        soDt: parseInt(edit.soDt),
        maNhom: edit.maNhom,
        hoTen: edit.hoTen,
      }
    );
    // console.log(res);
    if (res.statusCode === 200) {
      console.log(res);
      toast.success("Đăng ký thành công");
      dispatch({
        type: REGISTER,
        dataUser: res.content,
      });
      nagivate("/user/login", {
        state: {
          isRegister: true,
        },
      });
    } else {
      console.log(res);
      toast.error(res.content);
    }
  };
  // const clickBackHome = () => {
  //   navigate("/");
  // };

  return (
    <>
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          <div className="cursor-pointer flex items-center">
            <div>
              <svg
                className="w-10 text-indigo-500"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 225 225"
                style={{ enableBackground: "new 0 0 225 225" }}
                xmlSpace="preserve"
              >
                <style
                  type="text/css"
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n                          .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                      ",
                  }}
                />
                <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                  <g>
                    <path
                      id="Layer0_0_1_STROKES"
                      className="st0"
                      d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
              MOVIE
            </div>
          </div>
        </div>
        <div className="mt-0 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
    xl:text-bold"
          >
            Đăng ký
          </h2>
          <div className="mt-6">
            <div>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Tên tài khoản
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  required
                  name="taiKhoan"
                  onChange={handleChange}
                  placeholder="Nhập tên tài khoản"
                />
              </div>
              <div className="mt-6">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Mật khẩu
                  </div>
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="password"
                  placeholder="Nhập vào mật khẩu"
                  required
                  name="matKhau"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-6">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Email
                  </div>
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  placeholder="Nhập vào email"
                  required
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-6">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Số điện thoại
                  </div>
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="tel"
                  placeholder="Nhập vào số điện thoại"
                  required
                  name="soDt"
                  onChange={handleChange}
                />
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Họ và tên
                  </div>
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  placeholder="Nhập vào Ho va ten"
                  required
                  name="hoTen"
                  value={edit.hoTen}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-10">
                <button
                  onClick={onRegister}
                  className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                shadow-lg"
                >
                  Đăng ký
                </button>
              </div>
            </div>
            <div className="mt-8 text-sm font-display font-semibold text-gray-700 text-center">
              Bạn đã có tài khoản rồi ?{" "}
              <NavLink
                to="/user/login"
                className="cursor-pointer text-indigo-600 hover:text-indigo-800"
              >
                Đăng nhập
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
