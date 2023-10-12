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
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment/moment";
import _ from "lodash";
import { getListFilm } from "../../services/MangerFilmServices";
import { getListCinema } from "../../services/ManagerCinemaService";

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

  const [edit, setEdit] = useState({
    taiKhoan: thongTinTaiKhoan?.taiKhoan,
    matKhau: thongTinTaiKhoan?.matKhau,
    hoTen: thongTinTaiKhoan?.hoTen,
    email: thongTinTaiKhoan?.email,
    loaiNguoiDung:
      thongTinTaiKhoan?.loaiNguoiDung === "Khách hàng"
        ? "KhachHang"
        : "QuanTri",
    soDT: thongTinTaiKhoan?.soDT,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(postThongTinTaiKhoanAction());
  }, []);

  useEffect(() => {
    setEdit({
      ...edit,
      taiKhoan: thongTinTaiKhoan?.taiKhoan,
      matKhau: thongTinTaiKhoan?.matKhau,
      hoTen: thongTinTaiKhoan?.hoTen,
      email: thongTinTaiKhoan?.email,
      loaiNguoiDung:
        thongTinTaiKhoan?.loaiNguoiDung === "Khách hàng"
          ? "KhachHang"
          : "QuanTri",
      soDT: thongTinTaiKhoan?.soDT,
    });
  }, [thongTinTaiKhoan]);
  const handleSubmit = async (e) => {
    try {
      const res = await putCapNhatThongTinNguoiDung(
        edit.taiKhoan,
        edit.matKhau,
        edit.email,
        edit.soDT,
        GP00,
        edit.loaiNguoiDung,
        edit.hoTen
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
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit({
      ...edit,
      [name]: value,
    });
  };

  const tabData = [
    {
      label: "THÔNG TIN TÀI KHOẢN",
      content: (
        <div className="">
          <Form
            onFinish={handleSubmit}
            layout="vertical"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 8,
            }}
          >
            <Form.Item label="Loai Nguoi Dung">
              <Input disabled name="loaiNguoiDung" value={edit.loaiNguoiDung} />
            </Form.Item>
            <Form.Item label="Ten tai khoan">
              <Input
                disabled
                name="taiKhoan"
                value={edit.taiKhoan}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Mat khau">
              <Input.Password
                name="matKhau"
                value={edit.matKhau}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Ho va ten">
              <Input name="hoTen" value={edit.hoTen} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="So dien thoai">
              <Input name="soDT" value={edit.soDT} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Email">
              <Input name="email" value={edit.email} onChange={handleChange} />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit">Cap nhat</Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      label: "LỊCH SỬ ĐẶT VÉ",
      content: (
        <>
          <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Latest Customers
              </h5>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                View all
              </a>
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
        </>
      ),
    },

    {
      label: (
        <span
          onClick={() => {
            navigate("/admin");
          }}
        >
          <UserOutlined /> TRANG ADMIN
        </span>
      ),
      content: <div>ADMIN</div>,
    },
  ];

  // LOC LOAI NGUOI DUNG QUAN TRI
  let tabNew = [];
  if (edit.loaiNguoiDung === "QuanTri") {
    tabNew = tabData;
  } else {
    tabNew = tabData.slice(0, 2);
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
      <div className="pt-48 grid grid-cols-12 px-4 pb-8">
        <div className="col-span-4 px-4">
          <div className="img" style={{ width: 150, height: 150 }}>
            <img
              className="rounded-full"
              src="/image/logoMovie.jpg"
              alt=""
              style={{ height: 150, width: 150 }}
            />
          </div>
          <div className="text-2xl font-bold">TEN</div>
          <table className="table-auto border-2 border-green-500 rounded-2xl w-full font-semibold ">
            <thead>
              <tr>
                <th>Hoạt động</th>
                <></>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bình luận </td>
                <td className="text-center">0</td>
              </tr>
              <tr>
                <td>Bình luận được yêu thích</td>
                <td className="text-center">0</td>
              </tr>
              <tr>
                <td>Só vé đã đặt</td>
                <td className="text-center">
                  {arrConcat.length > 0 ? arrConcat.length : 0}
                </td>
              </tr>
              <tr>
                <td>Tổng tiền</td>
                <td className="text-center ">{getTotalMoney()} VND</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-span-8">
          <ul className="listTab">
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
