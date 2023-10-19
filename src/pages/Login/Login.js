import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { postLoginAction } from "../../redux/actions/AuthAction";
import { DANG_NHAP_THANH_CONG } from "../../redux/actions/types/AuthType";
import { toast } from "react-toastify";
import { postLogin } from "../../services/AuthServices";
import { DIS_LOADING, LOADING } from "../../redux/actions/types/LoadingType";
import { Eye, EyeSlash } from "iconsax-react";

const Login = () => {
  const [showPass, setShowPass] = useState(true);
  const [edit, setEdit] = useState({
    taiKhoan: "",
    matKhau: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const { user } = useSelector((state) => state.AuthReducer);

  const { isLoading } = useSelector((state) => state.LoadingReducer);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit({
      ...edit,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: LOADING,
    });
    const res = await postLogin(edit.taiKhoan, edit.matKhau);
    if (res.statusCode === 200) {
      dispatch({
        type: DANG_NHAP_THANH_CONG,
        userLogin: res.content,
        login: true,
      });

      if (location && location?.state?.isRegister) {
        navigate(-1);
        navigate(-1);
        if (isLoading === true) {
          toast.success("Đăng nhập thành công");
        }
      } else if (location?.state?.isRegister === false) {
        navigate(-1);
        navigate(-1);
      }

      navigate(-1);
    } else {
      toast.error(res.content);
    }
    setEdit({
      taiKhoan: "",
      matKhau: "",
    });
    setTimeout(() => {
      dispatch({
        type: DIS_LOADING,
      });
    }, [1000]);
  };
  return (
    <form onSubmit={handleSubmit} className="lg:w-1/2 xl:max-w-screen-sm">
      <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
        <div className="cursor-pointer flex items-center">
          <div>
            <svg
              className="w-10 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 225 225"
              style={{ enableBackground: "new 0 0 225 225" }}
              xmlSpace="preserve"
            >
              <style
                type="text/css"
                dangerouslySetInnerHTML={{
                  __html:
                    "\n                          .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                      ",
                }}
              />
              <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                <g>
                  <path
                    id="Layer0_0_1_STROKES"
                    className="st0"
                    d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div
            onClick={() => {
              navigate("/");
            }}
            className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold"
          >
            MOVIE
          </div>
        </div>
      </div>
      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
        <h2
          className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
    xl:text-bold"
        >
          Đăng nhập
        </h2>
        <div className="mt-12">
          <div>
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Tài khoản
              </div>
              <input
                onChange={handleChange}
                value={edit.taiKhoan}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                name="taiKhoan"
                placeholder="Nhập vào tài khoản"
              />
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Mật khẩu
                </div>
                <div>
                  <NavLink
                    to="/"
                    className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                        cursor-pointer"
                  >
                    Quên mật khẩu?
                  </NavLink>
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  onChange={handleChange}
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type={showPass ? "password" : "text"}
                  name="matKhau"
                  value={edit.matKhau}
                  placeholder="Nhập vào mật khẩu"
                />
                <span
                  onClick={() => {
                    setShowPass(!showPass);
                  }}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "50%",
                    right: "2%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {" "}
                  {!showPass ? (
                    <EyeSlash size="18" color="#555555" />
                  ) : (
                    <Eye size="18" color="#555555" />
                  )}
                </span>
              </div>
            </div>
            <div className="mt-10">
              <button
                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                shadow-lg"
              >
                Đăng nhập
              </button>
            </div>
          </div>
          <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
            Bạn chưa có tài khoản?
            <NavLink
              to="/user/register"
              className="cursor-pointer text-indigo-600 hover:text-indigo-800"
            >
              Đăng ký
            </NavLink>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
