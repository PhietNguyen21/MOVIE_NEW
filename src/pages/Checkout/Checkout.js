import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Checkout.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  getListPhongVeAction,
  postDatVeAction,
  postThongTinNguoiDungAction,
} from "../../redux/actions/BookingTicketAction";
import {
  CloseOutlined,
  UserOutlined,
  CheckOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import {
  CHON_VE,
  CLEAR_VE_DANG_DAT,
  DAT_VE,
} from "../../redux/actions/types/TicketType";
import _ from "lodash";
import moment from "moment/moment";
import { Tabs } from "antd";
import KetQuaCheckOut from "./KetQuaCheckOut";
import { useState } from "react";
import CountdownTime from "./CoundownTime";
import Profile from "../../templates/HomeTemplate/Layout/Profile/Profile";
import { DIS_LOADING, LOADING } from "../../redux/actions/types/LoadingType";
const Checkout = () => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.AuthReducer.user);
  const { soDT } = useSelector((state) => state.AuthReducer);

  // const [sodt, setsoDt] = useState(soDT);
  // console.log(soDT);
  const arrTab = ["01.CHỌN GHẾ & THANH TOÁN", "02.KẾT QUẢ ĐẶT VÉ"];
  const {
    heThongPhongVe,
    danhSachVeDangDat,
    thongTinNguoiDung,
    danhSachVeKHDangDat,
  } = useSelector((state) => state.BookingTicketReducer);

  // console.log("USER", userLogin);
  const param = useParams();
  const dispatch = useDispatch();
  const { id } = param;
  useEffect(() => {
    dispatch(getListPhongVeAction(id));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { thongTinPhim, danhSachGhe } = heThongPhongVe;
  // console.log("HE THONG PHONG VE", heThongPhongVe);
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  console.log({ thongTinPhim });
  // console.log("DANG CHON", danhSachVeDangDat);

  // LICH SU DAT VE thongTinNguoiDung
  // console.log("param.id", id);

  // const cusTomize = (
  //   <>
  //     {!_.isEmpty(userLogin) ? (
  //       <div className="s">
  //         <Profile />
  //       </div>
  //     ) : (
  //       ""
  //     )}
  //   </>
  // );
  const cusTomer = (
    <>
      {!_.isEmpty(userLogin) ? (
        <div className="text-white">
          <Profile />
        </div>
      ) : (
        ""
      )}
    </>
  );
  return (
    <>
      <div
        className="header_checkout flex justify-between items-center text-white pt-2"
        style={{ backgroundColor: "#242333" }}
      >
        <div
          className="backHome"
          style={{ width: 160, height: 60, cursor: "pointer" }}
          onClick={() => {
            dispatch({
              type: LOADING,
            });
            navigate("/");
            setTimeout(() => {
              dispatch({
                type: DIS_LOADING,
              });
            }, [2000]);
          }}
        >
          <img
            className="object-cover ml-2"
            src="/image/logoTixLoading.png"
            alt=""
            style={{ width: 80, height: 60 }}
          />
        </div>
      </div>
      <Tabs
        className="antsCheckout"
        tabPosition={"top"}
        activeKey="1"
        items={arrTab.map((item, index) => {
          const id = String(index + 1);
          let content = "";
          if (+index === 0) {
            // console.log("vao`");
            content = {
              label: <p className="">{item}</p>,
              key: id,
              children: (
                <>
                  {/* CHECKOUt */}
                  <div className="Checkout w-screen">
                    <div className="checkout-header flex justify-start">
                      <CountdownTime param={param.id} />
                      {cusTomer}
                    </div>
                    <div className="Checkout-content grid grid-cols-12">
                      <div className="datGhe col-span-8">
                        <div className="container1">
                          <div className="screen"></div>
                          <div className="text-screen text-gray-400">
                            MÀN HÌNH
                          </div>
                          <div className="danhSachGhe ">
                            {danhSachGhe.map((ghe, index) => {
                              let flag = false;
                              const styleGheVip =
                                ghe.loaiGhe === "Vip" ? "seat-vip" : "seat";
                              const styleGheDaDat =
                                ghe.daDat === true ? "seat-disable" : "";
                              const indexx = danhSachVeDangDat?.findIndex(
                                (item) => item.maGhe === ghe.maGhe
                              );
                              let styleGheDangDat = "";
                              if (indexx !== -1) {
                                styleGheDangDat = "gheDangDat";
                                flag = true;
                              }

                              let styleGheMinhDat = "";
                              if (
                                userLogin?.taiKhoan === ghe.taiKhoanNguoiDat
                              ) {
                                styleGheMinhDat = "gheMinhDat";
                              }

                              const indexRealTime =
                                danhSachVeKHDangDat.findIndex(
                                  (gheKH) => gheKH.maGhe === ghe.maGhe
                                );

                              let styleGheKH = "";
                              if (indexRealTime !== -1) {
                                styleGheKH = "gheKH";
                                flag = true;
                                ghe.daDat = true;
                              }
                              return (
                                <Fragment key={index}>
                                  <button
                                    onClick={() => {
                                      dispatch({
                                        type: CHON_VE,
                                        Ghe: ghe,
                                      });
                                    }}
                                    disabled={ghe.daDat}
                                    className={`${styleGheVip} ${styleGheDaDat} ${styleGheDangDat} ${styleGheMinhDat} ${styleGheKH} mb-2 ml-2 mr-3`}
                                  >
                                    {ghe.daDat || flag ? (
                                      <UserOutlined />
                                    ) : (
                                      ghe.stt
                                    )}
                                  </button>
                                  <span className="hidden lg:inline">
                                    {(index + 1) % 16 === 0 ? <br /> : ""}
                                  </span>
                                </Fragment>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="muaVe col-span-4  border-solid border-3 border-sky-500">
                        <div className="info-Ve ">
                          <p className="total border-b-2 text-green-500 text-center text-2xl border-gray-400 py-3">
                            {danhSachVeDangDat
                              ?.reduce((total, item) => {
                                return (total += item.giaVe);
                              }, 0)
                              .toLocaleString()}
                            {"  "}
                            VNĐ
                          </p>
                          <div className="info-content border-b-2 border-gray-400 py-3">
                            <b className="tenPhim">{thongTinPhim.tenPhim}</b>
                            <p className="diaChi">
                              Địa chỉ : {thongTinPhim.diaChi}
                            </p>
                            <p className="ngayChieu">
                              Lịch chiếu : {thongTinPhim.ngayChieu}
                            </p>
                            <p className="gioChieu">
                              Giờ chiếu : {thongTinPhim.gioChieu} PM
                            </p>
                          </div>
                          <div className="flex justify-between border-b-2 border-gray-400 py-3">
                            <div className=" text-red-600 w-3/4 flex flex-wrap items-center ">
                              <p className="text-white">Ghế :</p>
                              {_.sortBy(danhSachVeDangDat, ["stt"])?.map(
                                (veDD, index) => {
                                  // console.log(veDD);
                                  return (
                                    <Fragment key={index}>
                                      <span
                                        className="px-2 text-xl font-bold"
                                        key={index}
                                      >
                                        {veDD.stt}
                                      </span>
                                      {(index + 1) % 4 ? <br /> : ""}
                                    </Fragment>
                                  );
                                }
                              )}
                            </div>
                            <p className="tienGhe mr-5 text-green-600 w-1/4">
                              {danhSachVeDangDat
                                ?.reduce((total, item) => {
                                  return (total += item.giaVe);
                                }, 0)
                                .toLocaleString()}
                              {"  "}
                              VNĐ
                            </p>
                          </div>
                          <div className="email-customer border-b-2 border-gray-400 py-3">
                            <p className="text-white">E-mail</p>
                            <p className="text-white">{userLogin?.email}</p>
                          </div>
                          <div className="phone-customer border-b-2 border-gray-400 py-3">
                            <p className="text-white">Phone</p>
                            <p className="text-white">{userLogin?.soDT}</p>
                          </div>
                        </div>
                        <div className="btn-CheckOut">
                          <button
                            onClick={() => {
                              dispatch(
                                postDatVeAction({
                                  maLichChieu: thongTinPhim.maLichChieu,
                                  danhSachVe: danhSachVeDangDat,
                                })
                              );
                              dispatch({
                                type: CLEAR_VE_DANG_DAT,
                              });
                              if (!isLoading && danhSachVeDangDat.length > 0) {
                                navigate("/checkout/result");
                              }
                            }}
                            className="btnCheckOut "
                          >
                            ĐẶT VÉ
                          </button>
                        </div>
                      </div>
                      <div className="table-seat">
                        <table className="table-fix">
                          <thead>
                            <tr>
                              <th>Ghế thường</th>
                              <th>Ghế vip</th>
                              <th>Ghế đang đặt</th>
                              <th>Ghế đã đươc đặt</th>
                              <th>Ghế bạn đặt</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <p className="seatTable flex items-center justify-center">
                                  <CheckOutlined />
                                </p>
                              </td>
                              <td>
                                <p className="seatVipTable flex items-center justify-center ">
                                  <CheckOutlined />
                                </p>
                              </td>
                              <td>
                                <p className="seatDangDatTable flex items-center justify-center">
                                  <CheckOutlined />
                                </p>
                              </td>
                              <td>
                                <p className="seatTable seat-disable flex items-center justify-center">
                                  <CheckOutlined />
                                </p>
                              </td>
                              <td>
                                <p className="seatTable gheMinhDat flex items-center justify-center">
                                  <CheckOutlined />
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              ),
            };
          } else if (+index === 1) {
            content = {
              label: (
                <div
                  onClick={() => {
                    navigate("/checkout/result");
                  }}
                >
                  {item}
                </div>
              ),
              key: id,
              children: (
                <>
                  {/* INFO USER  */}

                  <KetQuaCheckOut thongTinPhim={thongTinPhim} />
                </>
              ),
            };
          }
          return content;
        })}
      />
    </>
  );
};

// const ketQuaCheckOut=()=>{

// }

export default Checkout;
