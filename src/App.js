import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import UngDung from "./pages/UngDung/UngDung";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Details from "./Details/Details";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserTemplate from "./templates/UserTemplate/UserTemplate";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import Checkout from "./pages/Checkout/Checkout";
import KetQuaCheckOut from "./pages/Checkout/KetQuaCheckOut";
import Loading from "./pages/Loading/Loading";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import FilmAdmin from "./templates/AdminTemplate/Layout/FilmAdmin/FilmAdmin";
import ShowTime from "./templates/AdminTemplate/Layout/ShowTime/ShowTime";
import DashBoard from "./templates/AdminTemplate/Layout/DashBoard/DashBoard";
import AddNew from "./templates/AdminTemplate/Layout/AddNew/AddNew";
import EditFilm from "./templates/AdminTemplate/Layout/EditFilm/EditFilm";
import DeleteFilm from "./templates/AdminTemplate/Layout/DeleteFilm/DeleteFilm";
import AddShowTime from "./templates/AdminTemplate/Layout/AddShowTime/AddShowTime";

import ListUser from "./templates/AdminTemplate/Layout/Users/User/ListUser";
import AddNewUser from "./templates/AdminTemplate/Layout/Users/User/AddNewUser/AddNewUser";
import EditUser from "./templates/AdminTemplate/Layout/Users/User/EditUser/EditUser";
import DeleteUser from "./templates/AdminTemplate/Layout/Users/DeleteUser/DeleteUser";
import InfoAccount from "./pages/InfoAccount/InfoAccount";
import FilmNews from "./pages/News/News/FilmNews/FilmNews";
import Review from "./pages/News/News/Review/Review";
import Discount from "./pages/News/News/Discount/Discount";

function App() {
  return (
    <div className="App">
      <Loading />
      <Routes>
        <Route path="/" element={<HomeTemplate />}>
          <Route index element={<Home />} />
          {/* <Route path="News" element={<News />} /> */}

          <Route path="/detail/:id" element={<Details />} />
          <Route path="/taikhoan" element={<InfoAccount />} />
        </Route>
        <Route path="/user" element={<UserTemplate />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/News" element={<News />}>
          <Route element={<FilmNews />} index />
          <Route path="review" element={<Review />} />
          <Route path="discount" element={<Discount />} />
        </Route>
        <Route path="/checkout" element={<CheckoutTemplate />}>
          <Route path=":id" element={<Checkout />} />
          <Route path="result" element={<KetQuaCheckOut />} />
        </Route>

        <Route path="/admin" element={<AdminTemplate />}>
          <Route index element={<DashBoard />} />
          <Route path="filmAdmin" element={<FilmAdmin />} />
          <Route path="showtime" element={<ShowTime />} />

          <Route path="addnew" element={<AddNew />} />
          <Route path="editFilm/:id" element={<EditFilm />} />
          <Route path="delete/:maPhim" element={<DeleteFilm />} />
          <Route path="showtime/:maPhim/:tenPhim" element={<AddShowTime />} />
          <Route path="listUser" element={<ListUser />} />
          <Route path="AddNewUser" element={<AddNewUser />} />
          <Route path="editUser/:id" element={<EditUser />} />
          <Route path="deleteUser" element={<DeleteUser />} />
        </Route>

        <Route path="*" element={<h1>404 NOT FOUND</h1>} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
