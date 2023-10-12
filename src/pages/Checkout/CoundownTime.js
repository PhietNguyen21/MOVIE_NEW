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
        <p>0{Math.floor(time / 60)}: </p>
        <p>{second >= 10 ? second : `0${second}`}</p>
        {/* <button onClick={() => setTimerOn(true)}>Start</button>
      <button onClick={() => setTimerOn(false)}>Stop</button> */}
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
