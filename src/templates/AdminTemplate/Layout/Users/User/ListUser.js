import React from "react";
import { Button, Pagination, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getDanhSachNguoiDungAction,
  getTimKiemNguoiDungAction,
} from "../../../../../redux/actions/AuthAction";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { USER_CURRENT } from "../../../../../redux/actions/types/AuthType";
import Search from "antd/lib/input/Search";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
const ListUser = () => {
  const { lstUser } = useSelector((state) => state.AuthReducer);
  //Phân trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getDanhSachNguoiDungAction());
  }, []);

  useEffect(() => {
    setCurrentPage(parseInt(location?.state?.currentPage));
  }, [navigate]);

  const columns = [
    {
      title: "User",
      dataIndex: "taiKhoan",

      sorter: (a, b) => {
        const nameA = a.taiKhoan.toLowerCase();
        const nameB = b.taiKhoan.toLowerCase();
        if (nameA - nameB > 0) {
          return -1;
        }
        return 1;
      },
      width: 80,
      fixed: "left",
    },
    {
      title: "Name",
      dataIndex: "hoTen",

      sorter: (a, b) => {
        const nameA = a.hoTen.toLowerCase().trim();
        const nameB = b.hoTen.toLowerCase().trim();
        if (nameA - nameB > 0) {
          return -1;
        }
        return 1;
      },
      width: 120,
    },
    {
      title: "Email",
      dataIndex: "email",
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        const nameA = a.email.toLowerCase().trim();
        const nameB = b.email.toLowerCase().trim();
        if (nameA - nameB > 0) {
          return -1;
        }
        return 1;
      },
      width: 200,
    },
    {
      title: "Phone",
      dataIndex: "soDt",
      width: 120,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 100,
      render: (value, user, index) => {
        // console.log("value", value);
        // console.log("user", user);
        return (
          <div className="flex" key={index}>
            <button
              onClick={async () => {
                await dispatch({
                  type: USER_CURRENT,
                  userEdit: user,
                });
                await navigate(`/admin/editUser/${currentPage}`);
              }}
              className="btn btn-primary "
            >
              EDIT
            </button>
            <button
              onClick={async () => {
                await dispatch({
                  type: USER_CURRENT,
                  userEdit: user,
                });
                await navigate("/admin/deleteUser");
              }}
              className="btn btn-danger mx-2"
            >
              DELETE
            </button>
          </div>
        );
      },
    },
  ];
  const data = lstUser;

  const handlePagination = (page) => {
    console.log(page);
    setCurrentPage(page);
    console.log(currentPage);
    // Perform any other action here
  };

  const customPagination = {
    showSizeChanger: false,
    current: currentPage,
    pageSize: 10, // set the page size as per your requirement
    total: data.length, // set the total count of your data
    onChange: handlePagination, // handle page change event
  };
  const onSearch = async (value) => {
    await dispatch(getTimKiemNguoiDungAction(value));
  };
  return (
    <Fragment>
      <div className="text-center mb-2">
        <h1 className="mb-2 font-bold text-2xl text-center ">DANH SÁCH USER</h1>
        <Search
          className="mb-2"
          placeholder="input search text"
          onSearch={onSearch}
          enterButton={<SearchOutlined style={{ color: "red" }} />}
        />
        <Button
          onClick={() => {
            navigate("/admin/addNewUser");
          }}
          className="text-black border-blue-500"
        >
          Add user
        </Button>
      </div>
      <Table
        className="tableUser"
        scroll={{
          x: 1000,
          y: 600,
        }}
        columns={columns}
        dataSource={data}
        pagination={customPagination}
      />
    </Fragment>
  );
};
export default ListUser;
