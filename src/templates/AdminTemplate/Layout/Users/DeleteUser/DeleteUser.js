import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteXoaNguoiDung } from "../../../../../services/AuthServices";
import { toast } from "react-toastify";
import { LOADING } from "../../../../../redux/actions/types/LoadingType";

const DeleteUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userEdit } = useSelector((state) => state.AuthReducer);
  const [taiKhoan, setTaiKhoan] = useState(userEdit?.taiKhoan);
  const [email, setEmail] = useState(userEdit?.email);
  const [hoTen, setHoTen] = useState(userEdit?.hoTen);
  const handleChange = (e) => {
    setTaiKhoan(e.target.value);
  };
  useEffect(() => {
    setTaiKhoan(userEdit?.taiKhoan);
    setEmail(userEdit?.email);
    setHoTen(userEdit?.hoTen);
  }, [userEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(taiKhoan);
    try {
      const res = await deleteXoaNguoiDung(taiKhoan);
      if (res && res.statusCode === 200) {
        await navigate("/admin/listUser");
        await toast.success(res.content);
      } else {
        toast.error(res.content);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  return (
    <>
      <div className="text-center text-2xl font-bold mb-2">
        Bạn có chắc muốn xoá user này?
      </div>
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        layout="horizontal"
        style={{ width: "80%", margin: "auto" }}
      >
        <Form.Item label="Tai Khoan">
          <Input
            disabled
            className="mb-2"
            value={taiKhoan}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Ho ten">
          <Input
            disabled
            name="hoTen"
            className="mb-2"
            value={hoTen}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Email">
          <Input
            disabled
            className="mb-2"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit}>Delete</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default DeleteUser;
