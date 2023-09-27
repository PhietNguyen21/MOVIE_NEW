import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
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

function App() {
  return (
    <div className="App">
      <Loading />
      <Routes>
        <Route path="/" element={<HomeTemplate />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="news" element={<News />} />
          <Route path="/detail/:id" element={<Details />} />
        </Route>
        <Route path="/user" element={<UserTemplate />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/checkout" element={<CheckoutTemplate />}>
          <Route path=":id" element={<Checkout />} />
          <Route path="result" element={<KetQuaCheckOut />} />
        </Route>

        <Route path="/admin" element={<AdminTemplate />}>
          <Route path="filmAdmin" element={<FilmAdmin />} />
          <Route path="showtime" element={<ShowTime />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="addnew" element={<AddNew />} />
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
