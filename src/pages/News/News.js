import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./News.css";
import FilmNews from "./News/FilmNews/FilmNews";
import { Fragment } from "react";
import Review from "./News/Review/Review";
import Discount from "./News/Discount/Discount";
import { useState } from "react";
const News = () => {
  const [active, setActive] = useState(0);
  const data = [
    {
      label: <div>ĐIỆN ẢNH 24H</div>,
      value: <FilmNews />,
    },
    {
      label: <div>REVIEW</div>,
      value: <Review />,
    },
    {
      label: <div>KHUYẾN MÃI</div>,
      value: <Discount />,
    },
  ];
  return (
    <div id="news" className="grid grid-cols-12 mt-16 mb-10">
      <div className="col-start-3 col-span-8">
        <div className="flex justify-center gap-4 items-center">
          {data.map((item, index) => {
            return (
              <div key={index}>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setActive(index);
                  }}
                  className={`mobie-phone font-bold ${
                    index === active ? "active" : ""
                  }`}
                >
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>

        {data.map((item, index) => {
          return index === active ? (
            <div className="text-center">{item.value}</div>
          ) : (
            ""
          );
        })}
      </div>
    </div>
  );
};

export default News;
