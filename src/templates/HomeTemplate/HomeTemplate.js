import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Layout/Header/Header";

import Footer from "../HomeTemplate/Layout/Footer/Footer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import BackToTop from "../../component/BackToTop/BackToTop";

const HomeTemplate = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  // const { isLoading } = useSelector((state) => state.LoadingReducer);
  // console.log(isLoading);
  // const loading = isLoading;

  return (
    <>
      <Header />

      <div>
        <Outlet />
      </div>
      <Footer />
      <BackToTop />
    </>
  );
};

export default HomeTemplate;
