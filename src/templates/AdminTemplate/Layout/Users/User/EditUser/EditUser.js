import React, { useState } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { useFormik } from "formik";
import { values } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { postThemNguoiDungAction } from "../../../../../../redux/actions/AuthAction";
import { GP00 } from "../../../../../../types/configType";
import { postCapNhapThongTinNguoiDung } from "../../../../../../services/AuthServices";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useEffect } from "react";

const EditUser = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const { id } = param;
  const { userEdit } = useSelector((state) => state.AuthReducer);
  const [isEditMove, setIsEditMove] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: userEdit?.taiKhoan,
      matKhau: userEdit?.matKhau,
      email: userEdit?.email,
      soDt: userEdit?.soDt,
      maNhom: userEdit?.maNhom,
      maLoaiNguoiDung: userEdit?.maLoaiNguoiDung,
      hoTen: userEdit?.hoTen,
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string()
        .required("Taì khoản là bắt buộc")
        .matches(
          /^[a-zA-Z0-9 ]*$/,
          "Tên tài khoản không được chứa ký tự đặc biệt"
        )
        .min(5, "Tên tài khoản ít nhất phải có 5 ký tự"),
      matKhau: Yup.string()
        .required("Mật khẩu là bắt buộc")
        .min(5, "Mật khẩu ít nhất phải có 5 ký tự"),
      email: Yup.string()
        .required("Email là bắt buộc")
        .email("Email là không hợp lệ"),
      soDt: Yup.string().matches(
        /^(0)\d{7,9}$/,
        "Số điện thoại phải bắt đầu bằng 0 và có độ dài từ 8 đến 10 số"
      ),
      hoTen: Yup.string().matches(/^[^\d]+$/, "Họ tên không được chứa số"),
      maLoaiNguoiDung: Yup.string().required("Loại người dùng là bắt buộc"),
    }),
    onSubmit: async (value, { resetForm }) => {
      // console.log(value);
      // VILIdate
      setIsEditMove(true);
      try {
        const res = await postCapNhapThongTinNguoiDung(
          value.taiKhoan,
          value.matKhau,
          value.email,
          value.soDt,
          GP00,
          value.maLoaiNguoiDung,
          value.hoTen
        );
        if (res && res.statusCode === 200) {
          navigate("/admin/listUser", {
            state: {
              isEdit: isEditMove,
              currentPage: id,
            },
          });
          await toast.success("Cap nhat thanh cong");
        } else {
          toast.error(res.content);
        }
      } catch (error) {
        console.log("ERROR", error);
      }
    },
  });

  return (
    <>
      <h1 className="text-2xl font-bold text-center w-full mb-2">
        UPDATE USER
      </h1>

      <Form
        onFinish={formik.handleSubmit}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        layout="horizontal"
        // onValuesChange={onFormLayoutChange}

        style={{
          maxWidth: "80%",
        }}
      >
        <Form.Item label="Tài khoản">
          <Input
            onBlur={formik.handleBlur}
            name="taiKhoan"
            value={formik.values.taiKhoan}
            onChange={formik.handleChange}
            disabled
          />
        </Form.Item>
        <Form.Item
          validateStatus={
            formik.touched.matKhau && formik.errors.matKhau ? "error" : ""
          }
          help={formik.touched.matKhau && formik.errors.matKhau}
          label="Mật khẩu"
        >
          <Input.Password
            onBlur={formik.handleBlur}
            name="matKhau"
            value={formik.values.matKhau}
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          validateStatus={
            formik.touched.email && formik.errors.email ? "error" : ""
          }
          help={formik.touched.email && formik.errors.email}
        >
          <Input
            onBlur={formik.handleBlur}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item
          label="So dien thoai"
          validateStatus={
            formik.touched.soDt && formik.errors.soDt ? "error" : ""
          }
          help={formik.touched.soDt && formik.errors.soDt}
        >
          <Input
            onBlur={formik.handleBlur}
            name="soDt"
            value={formik.values.soDt}
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item
          label="LoaiKH"
          validateStatus={
            formik.touched.maLoaiNguoiDung && formik.errors.maLoaiNguoiDung
              ? "error"
              : ""
          }
          help={formik.touched.maLoaiNguoiDung && formik.errors.maLoaiNguoiDung}
        >
          <Select
            value={formik.values.maLoaiNguoiDung}
            style={{
              width: "80%",
            }}
            onChange={(value) => {
              formik.setFieldValue("maLoaiNguoiDung", value);
            }}
            onBlur={formik.handleBlur}
            options={[
              {
                value: "KhachHang",
                label: "KhachHang",
              },
              {
                value: "QuanTri",
                label: "QuanTri",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          validateStatus={
            formik.touched.hoTen && formik.errors.hoTen ? "error" : ""
          }
          help={formik.touched.hoTen && formik.errors.hoTen}
          placeholder="Ho ten"
          label="Ho Ten"
        >
          <Input
            name="hoTen"
            onChange={formik.handleChange}
            value={formik.values.hoTen}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item label="Chuc nang">
          <Button htmlType="submit">Update user</Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default EditUser;
