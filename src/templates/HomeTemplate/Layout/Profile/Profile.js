import React from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DANG_XUAT } from "../../../../redux/actions/types/AuthType";
import {
  DIS_LOADING,
  LOADING,
} from "../../../../redux/actions/types/LoadingType";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const Profile = ({ onClose }) => {
  const userLogin = useSelector((state) => state.AuthReducer.user);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      label: (
        <p
          onClick={() => {
            dispatch({
              type: LOADING,
            });

            navigate("/taikhoan");
            setTimeout(() => {
              dispatch({
                type: DIS_LOADING,
              });
            }, [1500]);
          }}
        >
          {t("thongTinTk")}
        </p>
      ),
    },

    {
      key: "2",
      label: (
        <p
          onClick={async () => {
            dispatch({
              type: LOADING,
            });
            navigate("/");
            await dispatch({
              type: DANG_XUAT,
            });
            setTimeout(() => {
              dispatch({
                type: DIS_LOADING,
              });
            }, [1000]);
          }}
        >
          {t("Dangxuat")}
        </p>
      ),
    },
  ];
  return (
    <div className="profile flex items-center mr-2">
      <div
        className="cursor-pointer avatart rounded-full "
        onClick={() => {
          dispatch({
            type: LOADING,
          });
          navigate("/taiKhoan");

          onClose && onClose();

          setTimeout(() => {
            dispatch({
              type: DIS_LOADING,
            });
          }, [1500]);
        }}
        style={{
          position: "relative",
          backgroundColor: "green",
          lineHeight: "48px",
          width: 50,
          height: 50,
        }}
      >
        <span
          className="font-bold"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(${-50}%,${-50}%)`,
          }}
        >
          {userLogin?.hoTen.slice(0, 1)}
        </span>
      </div>
      <Dropdown
        placement="bottomRight"
        menu={{
          items,
        }}
        arrow={{
          pointAtCenter: true,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default Profile;
