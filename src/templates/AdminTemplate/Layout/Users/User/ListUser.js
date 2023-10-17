import React from "react";
import { Button, Pagination, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getDanhSachNguoiDungAction,
  getTimKiemNguoiDungAction,
  getTimKiemNguoiDungPhanTrangAction,
} from "../../../../../redux/actions/AuthAction";
import { Fragment } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  CURRENT_PAGE_SEARCH,
  USER_CURRENT,
} from "../../../../../redux/actions/types/AuthType";
import Search from "antd/lib/input/Search";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { GP00 } from "../../../../../types/configType";
import { getTimKiemNguoiDungPhanTrang } from "../../../../../services/AuthServices";
const ListUser = () => {
  const { lstUser } = useSelector((state) => state.AuthReducer);
  //Phân trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);
  // const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDanhSachNguoiDungAction());
  }, []);

  const current = useSelector((state) => state.AuthReducer.currentPaginate);

  useEffect(() => {
    setCurrentPage(parseInt(current));
  }, [current]);
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
                navigate(`/admin/editUser/${currentPage}`);
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

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const onSearch = async (value) => {
    console.log(value);
    await dispatch(getTimKiemNguoiDungAction(value));
    const res = await getTimKiemNguoiDungPhanTrang(GP00, value, 1, 10);

    if (res && res.statusCode === 200) {
      setCurrentPage(res.content.currentPage);
    } else {
      console.log("Loi", res);
    }
  };
  return (
    <Fragment>
      <div className="text-center mb-2">
        <h1 className="mb-2 font-bold text-2xl text-center ">DANH SÁCH USER</h1>

        <Button
          onClick={() => {
            navigate("/admin/addNewUser");
          }}
          className="text-black mb-2 border-blue-500"
        >
          Add user
        </Button>
        <Search
          className="mb-2"
          placeholder="input search text"
          onSearch={onSearch}
          enterButton={<SearchOutlined style={{ color: "red" }} />}
        />
      </div>
      <Table
        className="tableUser"
        scroll={{
          x: 1000,
          y: 600,
        }}
        columns={columns}
        dataSource={lstUser}
        pagination={{
          onChange: handlePagination,
          total: lstUser.length,
          showSizeChanger: false,
          pageSize: 10,
          current: currentPage,
        }}
      />
    </Fragment>
  );
};
export default ListUser;
