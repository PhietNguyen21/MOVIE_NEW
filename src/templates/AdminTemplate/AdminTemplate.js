import { useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  DesktopOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useState } from "react";
import Profile from "../HomeTemplate/Layout/Profile/Profile";

const { Header, Sider, Content } = Layout;

const { SubMenu } = Menu;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const buttonColappsed = useRef(null);
  const userLogin = JSON.parse(localStorage.getItem("USER_LOGIN"));
  // console.log(userLogin.maLoaiNguoiDung === "KhachHang");

  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  // SCROLL khi navigate
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  // LOGIC XU LY DANG NHAP VAO ADMIN
  useEffect(() => {
    if (!localStorage.getItem("USER_LOGIN")) {
      toast.info("BAN CAN DANG NHAP");
      navigate("/");
      // NGUOI DUNG CHUA DANG NHAP
    } else {
      if (userLogin && userLogin?.maLoaiNguoiDung === "KhachHang") {
        console.log(1);
        toast.error("Bạn không có quyền truy cập");
        navigate("/");
      } else {
        // Da xac thuc la admin
        setAuth(true);
      }
    }
  }, [userLogin, navigate]);

  // Neu chua xac thuc khong hien thi
  if (!auth) {
    return null;
  }

  // SUBMENU

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem(
      <div
        onClick={() => {
          navigate("/admin");
        }}
      >
        Dash Board
      </div>,
      "1",
      <PieChartOutlined />
    ),

    getItem("Film", "sub1", <FileOutlined />, [
      getItem(
        <div
          onClick={() => {
            buttonColappsed.current.click();
            navigate("/admin/filmAdmin");
          }}
        >
          List Film
        </div>,
        "3"
      ),
      getItem(
        <div
          onClick={() => {
            navigate("/admin/addnew");
            buttonColappsed.current.click();
          }}
        >
          Add Film
        </div>,
        "4"
      ),
    ]),
    getItem("Customer", "sub2", <TeamOutlined />, [
      getItem(
        <div
          onClick={() => {
            navigate("/admin/listUser");
            buttonColappsed.current.click();
          }}
        >
          List User
        </div>,
        "listUsers"
      ),
      getItem(
        <div
          onClick={() => {
            navigate("/admin/addNewUser");
            buttonColappsed.current.click();
          }}
        >
          Add User
        </div>,
        "Add User"
      ),
    ]),
  ];

  return (
    <>
      <div
        style={{ backgroundColor: "#001529" }}
        className="flex justify-between items-center w-full p-3"
      >
        <div
          className="text-white text-2xl ml-2 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src="/image/logoTixLoading.png"
            style={{ width: 80, height: 60 }}
            alt="logo"
          />
        </div>
        <div className="text-white">
          <Profile />
        </div>
      </div>
      <Layout>
        <Sider
          collapsedWidth="0"
          breakpoint="sm"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Sider>
        <Header
          style={{
            padding: 0,
            background: "transparent",
          }}
        >
          <Button
            ref={buttonColappsed}
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,

            // background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </>
  );
};
export default App;
