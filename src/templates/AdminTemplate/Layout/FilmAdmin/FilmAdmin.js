import React from "react";
import { Button, Table } from "antd";
import { Input, Space } from "antd";
import { AudioOutlined, SearchOutlined } from "@ant-design/icons";
import styleContent from "./FlimAdmin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getListFilmAction } from "../../../../redux/actions/FilmAction";
import { NavLink, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./FilmAdmin.scss";
import { useState } from "react";
import { LOADING } from "../../../../redux/actions/types/LoadingType";

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);

const FilmAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { currentPageFilm } = useSelector((state) => state.AuthReducer);
  const onChange = (pagination) => {
    setCurrentPage(pagination);
  };
  const { arrFilmDefault } = useSelector((state) => state.ManangerFilmReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getListFilmAction());
  }, []);
  useEffect(() => {
    setCurrentPage(parseInt(currentPageFilm));
  }, [currentPageFilm]);
  // console.log("ARRFILM", arrFilmDefault);

  const onSearch = async (value) => {
    // console.log(value);
    dispatch({
      type: LOADING,
    });
    // GOI API LAY DANH SACH PHIM
    await dispatch(getListFilmAction(value));
    setTimeout(() => {
      dispatch({
        type: LOADING,
      });
    }, [1000]);
  };

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      //   onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend"],
      width: 30,
      fixed: "left",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (value, film, index) => {
        return (
          <Fragment key={index}>
            <img
              style={{ width: 50, height: 50 }}
              src={value}
              alt={film.tenPhim}
            />
          </Fragment>
        );
      },
      width: 30,
      fixed: "left",
    },
    {
      title: "Ten Phim",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend"],
      width: 120,
    },
    {
      title: "Mo ta",
      dataIndex: "moTa",
      render: (value, film, index) => {
        // console.log("VALUE", value);
        return (
          <Fragment key={index}>
            {value.length > 50 ? value.slice(0, 50) + " ..." : value}
          </Fragment>
        );
      },
      width: 180,
    },
    {
      title: "Action",
      // fixed: "right",
      width: 180,
      render: (value, film, index) => {
        return (
          <Fragment key={index}>
            <div className="flex">
              <button
                onClick={() => {
                  navigate(`/admin/editFilm/${film.maPhim}`, {
                    state: { currentPage },
                  });
                }}
                className="btn btn-primary "
              >
                EDIT
              </button>
              <button
                onClick={() => {
                  navigate(`/admin/delete/${film.maPhim}`);
                }}
                className="btn btn-danger mx-2"
              >
                DELETE
              </button>
              <button
                className="btn btn-success"
                onClick={() => {
                  navigate(`/admin/showtime/${film.maPhim}/${film.tenPhim}`);
                  localStorage.setItem("FilmParam", JSON.stringify(film));
                }}
              >
                Add Show Time
              </button>
            </div>
          </Fragment>
        );
      },
    },
  ];
  const data = arrFilmDefault;
  return (
    <div>
      <div className="text-center">
        <h3 className="text-4xl mb-2">Manager Film</h3>
        <Button
          className="  text-black mb-2 border-blue-500"
          onClick={() => {
            navigate("/admin/addnew");
          }}
        >
          Add movie
        </Button>

        <Search
          className={styleContent.inputSearch}
          placeholder="input search text"
          onSearch={onSearch}
          enterButton={<SearchOutlined style={{ color: "red" }} />}
        />
      </div>

      <Table
        scroll={{
          x: 1100,
          y: 700,
        }}
        size="small"
        className="mt-2"
        columns={columns}
        dataSource={data}
        pagination={{
          onChange: onChange,
          total: data.length,
          pageSize: 10,
          showSizeChanger: false,
          current: currentPage,
          defaultCurrent: 1,
        }}
        rowKey="maPhim"
      />
    </div>
  );
};
export default FilmAdmin;
