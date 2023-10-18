import React, { useEffect } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
import { useDispatch, useSelector } from "react-redux";
import { getListFilmAction } from "../../redux/actions/FilmAction";
import MultipleRows from "../../component/MutipleRow/MutipleRow";
import { getListCinemaActions } from "../../redux/actions/CinemaAction";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";
import UngDung from "../UngDung/UngDung";
import News from "../News/News";

const Home = () => {
  const listFilm = useSelector((state) => state.ManangerFilmReducer.listFilm);
  const dispatch = useDispatch();
  const { heThongRapChieu } = useSelector((state) => state.ManagerCinema);
  useEffect(() => {
    dispatch(getListFilmAction());
    dispatch(getListCinemaActions());
  }, []);
  // console.log(heThongRapChieu);

  return (
    <>
      <HomeCarousel />
      <div className="container p-0">
        <section className="text-gray-600 body-font list-Film">
          <div
            className="lstMutiple container px-5 py-8 mx-auto"
            style={{ position: "relative" }}
          >
            <MultipleRows listFilm={listFilm} />
          </div>
        </section>

        <div className="lg:mx-36 m-0">
          <HomeMenu heThongRapChieu={heThongRapChieu} />
        </div>

        <News />

        <div className="divUngDung">
          <UngDung />
        </div>
      </div>
    </>
  );
};

export default Home;
