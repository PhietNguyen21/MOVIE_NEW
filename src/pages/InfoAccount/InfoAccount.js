import { tab } from "@testing-library/user-event/dist/tab";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postThongTinTaiKhoanAction } from "../../redux/actions/AuthAction";
import {
  postCapNhapThongTinNguoiDung,
  putCapNhatThongTinNguoiDung,
} from "../../services/AuthServices";
import { GP00 } from "../../types/configType";
import { toast } from "react-toastify";
import { CAP_NHAT_THANH_CONG } from "../../redux/actions/types/AuthType";
import { NavLink, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment/moment";
import _ from "lodash";
import { getListFilm } from "../../services/MangerFilmServices";
import { getListCinema } from "../../services/ManagerCinemaService";
import InfiniteScroll from "react-infinite-scroll-component";
import "./InfoAccount.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DIS_LOADING, LOADING } from "../../redux/actions/types/LoadingType";
const InfoAccount = () => {
  const [activeClick, setActiveClick] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { thongTinTaiKhoan } = useSelector((state) => state.AuthReducer);
  console.log({ thongTinTaiKhoan });

  // Lay ra so lan thanh toan

  const { countThanhToan } = useSelector((state) => state.BookingTicketReducer);
  // console.log({ countThanhToan });
  // console.log(countThanhToan);
  const { thongTinDatVe } = thongTinTaiKhoan;

  console.log({ thongTinDatVe });

  const formik = useFormik({
    initialValues: {
      taiKhoan: thongTinTaiKhoan?.taiKhoan,
      matKhau: thongTinTaiKhoan?.matKhau,
      hoTen: thongTinTaiKhoan?.hoTen,
      email: thongTinTaiKhoan?.email,
      loaiNguoiDung:
        thongTinTaiKhoan?.loaiNguoiDung === "Khách hàng"
          ? "KhachHang"
          : "QuanTri",
      soDT: thongTinTaiKhoan?.soDT,
    },
    validationSchema: Yup.object().shape({
      matKhau: Yup.string()
        .required("Mật khẩu là bắt buộc")
        .min(5, "Mật khẩu phải có ít nhất 5 ký tự"),

      email: Yup.string().email("Email là không hợp lệ"),
      soDT: Yup.string().matches(
        /^(0)\d{7,9}$/,
        "Số điện thoại phải bắt đầu bằng 0 và có độ dài từ 8 đến 10 số"
      ),
      hoTen: Yup.string().matches(/^[^\d]+$/, "Họ tên không được chứa số"),
    }),
    onSubmit: async (val) => {
      try {
        const res = await putCapNhatThongTinNguoiDung(
          val.taiKhoan,
          val.matKhau,
          val.email,
          val.soDT,
          GP00,
          val.loaiNguoiDung,
          val.hoTen
        );
        if (res && res.statusCode === 200) {
          await dispatch({
            type: CAP_NHAT_THANH_CONG,
            userUpdate: res.content,
          });
          await toast.success(res.message);
        } else {
          toast.error(res.content);
        }
      } catch (error) {
        console.log("ERR", error);
      }
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(postThongTinTaiKhoanAction());
  }, []);

  useEffect(() => {
    formik.setFieldValue("taiKhoan", thongTinTaiKhoan?.taiKhoan);
    formik.setFieldValue("matKhau", thongTinTaiKhoan?.matKhau);
    formik.setFieldValue("hoTen", thongTinTaiKhoan?.hoTen);
    formik.setFieldValue("email", thongTinTaiKhoan?.email);
    formik.setFieldValue(
      "loaiNguoiDung",
      thongTinTaiKhoan?.loaiNguoiDung === "Khách hàng" ? "KhachHang" : "QuanTri"
    );
    formik.setFieldValue("soDT", thongTinTaiKhoan?.soDT);
  }, [thongTinTaiKhoan]);

  const tabData = [
    {
      label: <div className="titleThongTin">THÔNG TIN TÀI KHOẢN</div>,
      content: (
        <div className="">
          <Form
            onFinish={formik.handleSubmit}
            layout="vertical"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 8,
            }}
          >
            <Form.Item label="Loai Nguoi Dung">
              <Input
                disabled
                name="loaiNguoiDung"
                value={formik.values.loaiNguoiDung}
              />
            </Form.Item>
            <Form.Item label="Ten tai khoan">
              <Input disabled name="taiKhoan" value={formik.values.taiKhoan} />
            </Form.Item>
            <Form.Item
              label="Mat khau"
              validateStatus={
                formik.errors.matKhau && formik.touched.matKhau ? "error" : ""
              }
              help={
                formik.errors.matKhau && formik.touched.matKhau
                  ? formik.errors.matKhau
                  : ""
              }
            >
              <Input.Password
                name="matKhau"
                value={formik.values.matKhau}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
            <Form.Item
              label="Ho va ten"
              validateStatus={
                formik.errors.hoTen && formik.touched.hoTen ? "error" : ""
              }
              help={
                formik.errors.hoTen && formik.touched.hoTen
                  ? formik.errors.hoTen
                  : ""
              }
            >
              <Input
                name="hoTen"
                value={formik.values.hoTen}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
            <Form.Item
              label="So dien thoai"
              validateStatus={
                formik.errors.soDT && formik.touched.soDT ? "error" : ""
              }
              help={
                formik.errors.soDT && formik.touched.soDT
                  ? formik.errors.soDT
                  : ""
              }
            >
              <Input
                name="soDT"
                value={formik.values.soDT}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              validateStatus={
                formik.errors.email && formik.touched.email ? "error" : ""
              }
              help={
                formik.errors.email && formik.touched.email
                  ? formik.errors.email
                  : ""
              }
            >
              <Input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                style={{ color: "black" }}
              >
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      label: <div className="titleDatVe">LỊCH SỬ ĐẶT VÉ</div>,
      content: (
        <>
          <InfiniteScroll
            dataLength={thongTinDatVe?.length}
            hasMore={true}
            height={500}
            className="scrollDatVe"
          >
            {thongTinDatVe?.length > 0 ? (
              <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Latest Customers
                  </h5>
                </div>
                <div className="flow-root">
                  <ul
                    role="list"
                    className="divide-y divide-gray-200 dark:divide-gray-700"
                  >
                    {thongTinDatVe &&
                      thongTinDatVe?.map((item, index) => {
                        // console.log({ item });
                        return (
                          <li key={index} className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <img
                                  className="w-16 h-16 rounded-full"
                                  src={item.hinhAnh}
                                  alt={item.tenPhim}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate ">
                                  {item.tenPhim}
                                </p>
                                <div className="text-sm  truncate flex items-center flex-wrap">
                                  <span className="font-bold t">Ghế : </span>

                                  {item &&
                                    item.danhSachGhe?.length > 0 &&
                                    item.danhSachGhe.map((ghe, index) => {
                                      return (
                                        <span
                                          key={index}
                                          className="text-green-500 mx-1 text-lg"
                                        >
                                          {` [${ghe.tenGhe}]  `}{" "}
                                        </span>
                                      );
                                    })}
                                </div>

                                <div className="text-gray-700 font-semibold">
                                  <span className="">Tên rạp:</span>{" "}
                                  {item && item.danhSachGhe.length > 0
                                    ? `${item.danhSachGhe[[0]].tenHeThongRap} -
                              ${item.danhSachGhe[0].tenRap}`
                                    : ""}
                                </div>
                                <div>
                                  <span className="text-gray-700 font-semibold">
                                    Ngày đặt :
                                  </span>{" "}
                                  {moment(item.ngayDat).format(
                                    "DD/MM/YYYY hh:mm A"
                                  )}
                                </div>
                              </div>
                              <div className="inline-flex items-center text-base font-semibold ">
                                {item.danhSachGhe
                                  .reduce((total, ghe, index) => {
                                    let giaVe = 0;
                                    giaVe =
                                      parseInt(ghe.tenGhe) >= 35 &&
                                      parseInt(ghe.tenGhe) <= 122
                                        ? 90000
                                        : 75000;
                                    // setTongTien();
                                    return (total += giaVe);
                                  }, 0)

                                  .toLocaleString()}
                                VND
                              </div>
                            </div>
                            <div
                              onClick={async () => {
                                dispatch({
                                  type: LOADING,
                                });
                                try {
                                  const res = await getListCinema(
                                    item.danhSachGhe[0].maHeThongRap
                                  );
                                  console.log(res);
                                  if (res && res.statusCode === 200) {
                                    res.content[0].lstCumRap.forEach((rap) => {
                                      // console.log(1);

                                      // TIM TEN THEO TEN PHIM TRONG MANG HE THONG RAP
                                      const Phim = rap.danhSachPhim.find(
                                        (phim) => phim.tenPhim === item.tenPhim
                                      );
                                      // console.log({ Phim });

                                      if (Phim !== undefined) {
                                        // TIEP TUC TIM THEO MA RAP
                                        const index =
                                          Phim.lstLichChieuTheoPhim.findIndex(
                                            (lichChieu) =>
                                              parseInt(lichChieu.maRap) ===
                                              +item.danhSachGhe[0].maRap
                                          );
                                        // console.log("INDEX", index);
                                        if (index !== -1) {
                                          navigate(
                                            `/checkout/${Phim.lstLichChieuTheoPhim[index].maLichChieu}`
                                          );
                                        }
                                      }
                                    });
                                  } else {
                                    console.log("LOI", res);
                                  }
                                } catch (error) {
                                  console.log("ERR", error);
                                }
                                // setTimeout(() => {
                                //   dispatch({
                                //     type: DIS_LOADING,
                                //   });
                                // }, [1000]);
                              }}
                              className="cursor-pointer text-blue-700 font-bold underline text-right"
                            >
                              Tiếp tục đặt vé
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className=" font-bold text-xl">Chưa có vé nào</div>

                <NavLink to="/" className="text-blue-600 font-bold text-xl">
                  {" "}
                  Đặt vé ngay
                </NavLink>
              </div>
            )}
          </InfiniteScroll>
        </>
      ),
    },

    // {
    //   label: (
    //     <span
    //       onClick={() => {
    //         navigate("/admin");
    //       }}
    //     >
    //       <UserOutlined /> TRANG ADMIN
    //     </span>
    //   ),
    //   content: <div>ADMIN</div>,
    // },
  ];

  // LOC LOAI NGUOI DUNG QUAN TRI
  let tabNew = [];
  if (formik.values.loaiNguoiDung === "QuanTri") {
    tabNew = tabData;
  } else {
    tabNew = tabData?.slice(0, 2);
  }

  // NOI MANG CONCAT LODASH
  let arrConcat = [];
  thongTinDatVe?.forEach((item, index) => {
    arrConcat = _.concat(arrConcat, item.danhSachGhe);
  });

  const getTotalMoney = () => {
    return arrConcat
      .reduce((total, item, index) => {
        let value = 0;
        value =
          parseInt(item.tenGhe) >= 32 && parseInt(item.tenGhe) <= 122
            ? 90000
            : 75000;

        return (total += value);
      }, 0)
      .toLocaleString();
  };
  return (
    <>
      <div className="pt-48 grid grid-cols-12 px-4 pb-8 infoAccount">
        <div className="col-span-4 px-4">
          <div className="img   text-center flex justify-center w-full mb-2 ">
            <p
              className="font-bold rounded-full bg-green-800 text-2xl text-center uppercase"
              style={{ lineHeight: "150px", width: 150, height: 150 }} // style={{  }}
            >
              {formik.values.taiKhoan?.slice(0, 1)}
            </p>
          </div>
          {formik.values.loaiNguoiDung === "QuanTri" ? (
            <div className="text-2xl font-bold shadow-slate-800 mb-2">
              <button
                style={{
                  boxShadow: ` 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)`,
                  backgroundColor: "#3f51b5",
                }}
                className="btn btn-primary rounded-3xl w-full"
                onClick={() => {
                  navigate("/admin");
                }}
              >
                Tới trang quản trị
              </button>
            </div>
          ) : (
            ""
          )}
          <table className="border-collapse w-full">
            <thead>
              <tr>
                <th className="bg-green-500 text-white text-left py-3 px-4 font-semibold uppercase border border-green-600">
                  Hoạt động
                </th>
                <th className="bg-green-500 text-white text-center py-3 px-4 font-semibold uppercase border border-green-600">
                  Số lượng
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100">
                <td className="border border-green-500 py-3 px-4">Bình luận</td>
                <td className="border border-green-500 text-center py-3 px-4">
                  0
                </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="border border-green-500 py-3 px-4">
                  Bình luận được yêu thích
                </td>
                <td className="border border-green-500 text-center py-3 px-4">
                  0
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border border-green-500 py-3 px-4">
                  Số vé đã đặt
                </td>
                <td className="border border-green-500 text-center py-3 px-4">
                  {arrConcat.length > 0 ? arrConcat.length : 0}
                </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="border border-green-500 py-3 px-4">Tổng tiền</td>
                <td className="border border-green-500 text-center py-3 px-4">
                  {getTotalMoney()} VND
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-span-8">
          <ul className="listTab block text-center md:flex">
            {tabNew.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`cursor-pointer inline mx-2 text-2xl font-semibold ${
                    index === activeClick
                      ? "text-green-700 border-b-2 border-green-500"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveClick(index);
                    //   console.log(activeClick);
                  }}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
          <div className="mt-4">{tabData[activeClick].content}</div>
        </div>
      </div>
    </>
  );
};

export default InfoAccount;
