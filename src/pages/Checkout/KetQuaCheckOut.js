import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postThongTinNguoiDungAction } from "../../redux/actions/BookingTicketAction";
import moment from "moment";
import { ArrowLeftOutlined, CheckOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { DIS_LOADING, LOADING } from "../../redux/actions/types/LoadingType";
import { Tabs } from "antd";
import CountdownTime from "./CoundownTime";
import Profile from "../../templates/HomeTemplate/Layout/Profile/Profile";
import InfiniteScroll from "react-infinite-scroll-component";

const KetQuaCheckOut = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { thongTinNguoiDung } = useSelector(
    (state) => state.BookingTicketReducer
  );

  // const arrPick=_.map(thongTinNguoiDung.thongTinDatVe,(item)=>{
  //   _.pick(item,)
  // })
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  useEffect(() => {
    dispatch(postThongTinNguoiDungAction());
  }, []);
  const ticketFirst = (arr) => {
    return _.head(arr);
  };

  // console.log(thongTinNguoiDung);
  // LƯU THÔNG TIN ĐẶT VÉ

  const userLogin = useSelector((state) => state.AuthReducer.user);
  const { soDT } = useSelector((state) => state.AuthReducer);

  // const [sodt, setsoDt] = useState(soDT);
  // console.log(soDT);
  const arrTab = ["01.CHỌN GHẾ & THANH TOÁN", "02.KẾT QUẢ ĐẶT VÉ"];
  const {
    heThongPhongVe,
    danhSachVeDangDat,

    danhSachVeKHDangDat,
  } = useSelector((state) => state.BookingTicketReducer);

  // console.log("USER", userLogin);

  const { thongTinPhim, danhSachGhe } = heThongPhongVe;
  // console.log("HE THONG PHONG VE", heThongPhongVe);

  const cusTomer = (
    <>
      {!_.isEmpty(userLogin) ? (
        <div className="mr-2">
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
        className="header_checkout py-2 flex justify-between items-center text-white pt-2"
        style={{ backgroundColor: "#242333" }}
      >
        <div
          className="backHome"
          style={{ width: 160, height: 60, cursor: "pointer" }}
          onClick={() => {
            navigate("/");
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
        tabBarExtraContent={cusTomer}
        className="antsCheckout"
        tabPosition={"top"}
        activeKey="2"
        items={arrTab.map((item, index) => {
          const id = String(index + 1);
          let content = "";
          if (+index === 0) {
            // console.log("vao`");
            content = {
              label: (
                <div
                  onClick={() => {
                    dispatch({
                      type: LOADING,
                    });
                    navigate(-1);
                  }}
                >
                  {item}
                </div>
              ),
              key: id,
              children: <>{/* CHECKOUt */}</>,
            };
          } else if (+index === 1) {
            content = {
              label: <div>{item}</div>,
              key: id,
              children: (
                <>
                  {/* INFO USER  */}

                  <section
                    className="text-white body-font"
                    style={{ backgroundColor: "#242333" }}
                  >
                    <div className="container px-5 py-24 mx-auto">
                      <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-3xl text-3xl font-medium title-font mb-4 text-white">
                          Lịch sử đặt vé
                        </h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                          Chúc bạn xem phim vui vẻ
                        </p>
                      </div>
                      {thongTinNguoiDung?.thongTinDatVe?.length > 0 ? (
                        <>
                          <div
                            className="div-infoVe "
                            style={{ height: "100vh" }}
                          >
                            <InfiniteScroll
                              dataLength={
                                thongTinNguoiDung?.thongTinDatVe?.length
                              }
                              hasMore={true}
                              style={{
                                height: "600px",
                                width: "100%",
                                overflowX: "hidden",
                              }}
                            >
                              <div className="flex flex-wrap -m-2">
                                {thongTinNguoiDung.thongTinDatVe?.map(
                                  (ticket, index) => {
                                    console.log({ ticket });
                                    return (
                                      <div
                                        key={index}
                                        className="p-2 lg:w-1/3 md:w-1/2 w-full"
                                      >
                                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                                          <img
                                            alt="team"
                                            className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                                            src={ticket.hinhAnh}
                                          />
                                          <div className="flex-grow">
                                            <h2 className="text-white title-font font-medium">
                                              {ticket.tenPhim}
                                            </h2>
                                            <p className="ngayGio text-white font-bold">
                                              Ngày đặt :{" "}
                                              {moment(ticket.ngayDat).format(
                                                "DD-MM-YYYY"
                                              )}
                                              {" | "}
                                              Giờ đặt :{" "}
                                              {moment(ticket.ngayDat).format(
                                                "hh:mm A"
                                              )}
                                            </p>
                                            <p className="text-white font-bold">
                                              Giờ chiếu :{" "}
                                              {thongTinPhim.gioChieu} PM
                                            </p>
                                            <p className="text-white font-semibold">
                                              Địa điểm :{" "}
                                              {
                                                ticketFirst(ticket.danhSachGhe)
                                                  .tenHeThongRap
                                              }
                                            </p>
                                            <p className="text-white font-semibold">
                                              Rạp :{" "}
                                              {
                                                ticketFirst(ticket.danhSachGhe)
                                                  .tenRap
                                              }
                                            </p>
                                            <p className="font-semibold text-white">
                                              {" "}
                                              Ghế :{" "}
                                            </p>{" "}
                                            {ticket.danhSachGhe.map(
                                              (ghe, index) => {
                                                return (
                                                  <span
                                                    key={index}
                                                    className="mr-2 text-green-500 font-semibold"
                                                  >
                                                    {"["} {ghe.tenGhe} {"]"}
                                                    {(index + 1) % 5 === 0 ? (
                                                      <br />
                                                    ) : (
                                                      ""
                                                    )}
                                                  </span>
                                                );
                                              }
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </InfiniteScroll>
                          </div>
                        </>
                      ) : (
                        <div
                          className="text-center text-green-500 text-2xl font-bold"
                          style={{ height: "100vh" }}
                        >
                          Loading...
                        </div>
                      )}
                    </div>
                  </section>
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

export default KetQuaCheckOut;
