import React, { useEffect, useState } from "react";
import ModalDatLaiVe from "./ModalDatLaiVe";

function CountdownTime({ param }) {
  const [time, setTime] = useState(300);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        handleShow(); //Het gio hien modal
        clearInterval(interval); //Tắt đếm ngược
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  /* Chia lấy dư 255%60=15s 250%60=10s 249%60=09 */

  let second = Math.floor(time % 60);

  return (
    <>
      <div
        style={{ width: "60%" }}
        className="flex items-center text-2xl  md:text-3xl justify-start text-red-500 font-semibold ml-3"
      >
        <p className="text-white text-xl md:text-2xl mr-3">
          Thời gian giữ chỗ{" "}
        </p>
        {/* Chia lấy phần nguyên vd: 299/60 đc 4 giảm từ từ 3 2 1 */}
        <p>0{Math.floor(time / 60)}: </p>

        <p>{second >= 10 ? second : `0${second}`}</p>
      </div>
      <ModalDatLaiVe
        param={param}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </>
  );
}

export default CountdownTime;
