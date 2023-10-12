import { Tabs } from "antd";
import { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import InfiniteScroll from "react-infinite-scroll-component";
import contentStyle from "./HomeMenu.css.module.css";
import "./HomeMenu.scss";
const HomeMenu = (props) => {
  const { heThongRapChieu } = props;
  const navigate = useNavigate();
  const daoChuoi = (chuoi) => {
    let mangChuoi = chuoi.split("-");

    let mangChuoiDaNguoc = mangChuoi.reverse();

    let ngayKhoiChieu = mangChuoiDaNguoc.join("-");
    return ngayKhoiChieu;

    // let tachChuoi = ngayKhoiChieu.split("");
    // let daoChuoi = tachChuoi.reverse();
    // return daoChuoi.split("-");
  };

  return (
    <>
      <Tabs
        className="TabNoRes"
        tabPosition={"left"}
        items={heThongRapChieu?.map((item, key) => {
          const id = String(key + 1);
          // const logo = item.logo;
          return {
            label: (
              <img
                src={item.logo}
                alt="img-ant"
                className="rounded-full"
                width={50}
              />
            ),
            key: id,
            children: (
              <Tabs
                tabPosition={"left"}
                items={item.lstCumRap?.map((item, key) => {
                  const id = String(key + 1);

                  return {
                    label: (
                      <div className="flex justify-center items-center">
                        <img src={item.hinhAnh} alt="img-ant" width={50} />
                        <div className="content-cine text-left ml-2">
                          <div className="tenCumRap">{item.tenCumRap}</div>
                          <div className="text-red-700">Chi tiết</div>
                        </div>
                      </div>
                    ),
                    key: id,
                    children: (
                      <>
                        {item.danhSachPhim && item.danhSachPhim.length > 0 ? (
                          <div
                            className={`${contentStyle["custom-scrollbar"]}`}
                          >
                            <InfiniteScroll
                              className="md:px-6"
                              style={{ height: "470px" }}
                              dataLength={item.danhSachPhim.length} //This is important field to render the next data
                              hasMore={true}
                              endMessage={
                                <p style={{ textAlign: "center" }}>
                                  <b>Yay! You have seen it all</b>
                                </p>
                              }
                              // below props only if you need pull down functionality
                              // refreshFunction={this.refresh}
                              // pullDownToRefresh
                              // pullDownToRefreshThreshold={50}
                              // pullDownToRefreshContent={
                              //   <h3 style={{ textAlign: "center" }}>
                              //     &#8595; Pull down to refresh
                              //   </h3>
                              // }
                              releaseToRefreshContent={
                                <h3 style={{ textAlign: "center" }}>
                                  &#8593; Release to refresh
                                </h3>
                              }
                            >
                              {item.danhSachPhim
                                ?.slice(0, 10)
                                .map((phim, index) => {
                                  // console.log("HOME MENU", phim);
                                  return (
                                    <Fragment key={index}>
                                      <div
                                        className={`${contentStyle["film-content"]} flex mt-2 `}
                                      >
                                        <div
                                          className={`${contentStyle["img"]}`}
                                        >
                                          <img
                                            className={`${contentStyle["img-res"]}`}
                                            style={{
                                              width: "75px",
                                              height: "75px",
                                              objectFit: "cover",
                                            }}
                                            src={phim.hinhAnh}
                                            alt={phim.tenPhim}
                                          />
                                        </div>
                                        <div className="ml-2">
                                          <h1 className="xl:text-2xl text-xl text-black font-semibold">
                                            {phim.tenPhim}
                                          </h1>
                                          <p className="mb-2 lg:text-base xl:text-xl text-xs">
                                            {item.diaChi}
                                          </p>
                                        </div>
                                      </div>
                                      <div
                                        className={`lstHour grid gap-3 grid-cols-3 lg:grid-cols-5 mt-2 ${
                                          index ===
                                          item.danhSachPhim.slice(0, 10)
                                            .length -
                                            1
                                            ? "SSS"
                                            : "border-b-2 pb-2 border-gray-700 "
                                        }`}
                                      >
                                        {phim.lstLichChieuTheoPhim
                                          ?.slice(0, 10)
                                          .map((lichChieu, index) => {
                                            // console.log(
                                            //   "LICH CHIEU",
                                            //   lichChieu
                                            // );
                                            // console.log(phim);
                                            return (
                                              <NavLink
                                                to={`/checkout/${lichChieu.maLichChieu}`}
                                                className={` rounded-lg item-hour ${contentStyle["item-hour"]} `}
                                                key={index}
                                              >
                                                <span
                                                  className={`${contentStyle["textHour"]}`}
                                                  style={{
                                                    textAlign: "center",
                                                    fontSize: ".9rem",
                                                  }}
                                                >
                                                  {" "}
                                                  {moment(
                                                    lichChieu.ngayChieuGioChieu
                                                  ).format("hh:mm A")}
                                                </span>
                                              </NavLink>
                                            );
                                          })}
                                      </div>
                                    </Fragment>
                                  );
                                })}
                            </InfiniteScroll>
                          </div>
                        ) : (
                          <div>Hiện không có phim nào...</div>
                        )}
                      </>
                    ),
                  };
                })}
              />
            ),
          };
        })}
      />

      <Tabs
        className="TabRes"
        tabPosition={"center"}
        items={heThongRapChieu?.map((item, key) => {
          const id = String(key + 1);
          // const logo = item.logo;
          return {
            label: (
              <img
                // className="imgRes"
                src={item.logo}
                alt="img-ant"
                className="imgLogoRes rounded-full"
                width={50}
              />
            ),
            key: id,
            children: (
              <Tabs
                tabPosition={"left"}
                items={item.lstCumRap?.map((item, key) => {
                  const id = String(key + 1);

                  return {
                    label: (
                      <div className="item-left flex justify-center items-center">
                        <img src={item.hinhAnh} alt="img-ant" width={50} />
                        <div className="content-cine text-left ml-2">
                          <div className="tenCumRap">{item.tenCumRap}</div>
                          <div className="tenCumRap tenCumRapRes hidden">
                            <p className="w-3">{item.tenCumRap}</p>
                          </div>

                          <div className="text-red-700">Chi tiết</div>
                        </div>
                      </div>
                    ),
                    key: id,
                    children: (
                      <>
                        {item.danhSachPhim && item.danhSachPhim.length > 0 ? (
                          <div
                            className={`${contentStyle["custom-scrollbar"]}`}
                          >
                            <InfiniteScroll
                              className="md:px-6 infiniteScrol"
                              style={{ height: "470px" }}
                              dataLength={item.danhSachPhim.length} //This is important field to render the next data
                              hasMore={true}
                              releaseToRefreshContent={
                                <h3 style={{ textAlign: "center" }}>
                                  &#8593; Release to refresh
                                </h3>
                              }
                            >
                              {item.danhSachPhim
                                ?.slice(0, 10)
                                .map((phim, index) => {
                                  // console.log("HOME MENU", phim);
                                  return (
                                    <Fragment key={index}>
                                      <div
                                        className={`${contentStyle["film-content"]} flex mt-2 `}
                                      >
                                        <div
                                          className={`${contentStyle["img"]}`}
                                        >
                                          <img
                                            className={`${contentStyle["img-res"]} IMG-RES`}
                                            style={{
                                              width: "75px",
                                              height: "150px",
                                              objectFit: "cover",
                                            }}
                                            src={phim.hinhAnh}
                                            alt={phim.tenPhim}
                                          />
                                        </div>
                                        <div className="ml-2">
                                          <h1 className="xl:text-2xl text-xl text-black font-semibold">
                                            {phim.tenPhim}
                                          </h1>

                                          <p className="mb-2 lg:text-base xl:text-xl text-xs">
                                            {item.diaChi}
                                          </p>
                                        </div>
                                      </div>
                                      <div
                                        className={`lstHour grid gap-3  sm:grid-cols-3 lg:grid-cols-5 mt-2 ${
                                          index ===
                                          item.danhSachPhim.slice(0, 10)
                                            .length -
                                            1
                                            ? "SSS"
                                            : "border-b-2 pb-2 border-gray-700 "
                                        }`}
                                      >
                                        {phim.lstLichChieuTheoPhim
                                          ?.slice(0, 10)
                                          .map((lichChieu, index) => {
                                            // console.log(
                                            //   "LICH CHIEU",
                                            //   lichChieu
                                            // );
                                            // console.log(phim);
                                            return (
                                              <NavLink
                                                to={`/checkout/${lichChieu.maLichChieu}`}
                                                className={` rounded-lg item-hour ${contentStyle["item-hour"]} `}
                                                key={index}
                                              >
                                                <span
                                                  className={`${contentStyle["textHour"]}`}
                                                  style={{
                                                    textAlign: "center",
                                                    fontSize: ".9rem",
                                                  }}
                                                >
                                                  {" "}
                                                  {moment(
                                                    lichChieu.ngayChieuGioChieu
                                                  ).format("hh:mm A")}
                                                </span>
                                              </NavLink>
                                            );
                                          })}
                                      </div>
                                    </Fragment>
                                  );
                                })}
                            </InfiniteScroll>
                          </div>
                        ) : (
                          <div>Hiện không có phim nào...</div>
                        )}
                      </>
                    ),
                  };
                })}
              />
            ),
          };
        })}
      />
    </>
  );
};
export default HomeMenu;
