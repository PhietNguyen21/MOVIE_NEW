import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);
  const scollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);
  return (
    <>
      {showButton && (
        <div
          onClick={() => {
            scollTop();
          }}
          className="backToTop "
          style={{
            cursor: "pointer",
            position: "fixed",
            bottom: "5%",
            right: "3%",
            transform: `rotate(180deg)`,
          }}
        >
          <img width={75} height={75} src="./image/logoTixLoading.png" alt="" />
        </div>
      )}
    </>
  );
};

export default BackToTop;
