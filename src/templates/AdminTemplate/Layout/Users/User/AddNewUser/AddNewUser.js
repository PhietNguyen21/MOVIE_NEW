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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postThemNguoiDungAction } from "../../../../../../redux/actions/AuthAction";
import { GP00 } from "../../../../../../types/configType";
import { Option } from "antd/lib/mentions";
import { toast } from "react-toastify";
import * as Yup from "yup";

const AddNewUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: GP00,
      maLoaiNguoiDung: "",
      hoTen: "",
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

      await dispatch(
        postThemNguoiDungAction(
          value.taiKhoan,
          value.matKhau,
          value.email,
          value.soDt,
          value.maNhom,
          value.maLoaiNguoiDung,
          value.hoTen
        )
      );

      resetForm();
      console.log(value);
    },
  });

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        defaultValue={`+${84}`}
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
        <Option value="00">+00</Option>
      </Select>
    </Form.Item>
  );
  return (
    <>
      <div className="text-center text-2xl mb-2 font-bold">Thêm người dùng</div>
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
        <Form.Item
          label="Tài khoản"
          validateStatus={
            formik.touched.taiKhoan && formik.errors.taiKhoan ? "error" : ""
          }
          help={formik.touched.taiKhoan && formik.errors.taiKhoan}
        >
          <Input
            name="taiKhoan"
            value={formik.values.taiKhoan}
            onChange={(e) => {
              formik.setFieldValue("taiKhoan", e.target.value);
            }}
            onBlur={formik.handleBlur}
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
            name="matKhau"
            value={formik.values.matKhau}
            onChange={(e) => {
              formik.setFieldValue("matKhau", e.target.value);
            }}
            onBlur={formik.handleBlur}
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
            onChange={(e) => {
              formik.setFieldValue("email", e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          validateStatus={
            formik.touched.soDt && formik.errors.soDt ? "error" : ""
          }
          help={formik.touched.soDt && formik.errors.soDt}
        >
          <Input
            addonBefore={prefixSelector}
            name="soDt"
            value={formik.values.soDt}
            onChange={(e) => {
              formik.setFieldValue("soDt", e.target.value);
            }}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label="Loại khách hàng"
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
          label="Họ tên"
        >
          <Input
            name="hoTen"
            onChange={(e) => {
              formik.setFieldValue("hoTen", e.target.value);
            }}
            value={formik.values.hoTen}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item label="Chức năng">
          <Button htmlType="submit">Thêm</Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default AddNewUser;
