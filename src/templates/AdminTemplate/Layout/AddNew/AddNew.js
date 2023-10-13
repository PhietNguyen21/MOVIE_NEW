import { PlusOutlined } from "@ant-design/icons";

import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Spin,
  Switch,
} from "antd";
import { useState } from "react";
import { Formik, useFormik } from "formik";
import moment from "moment/moment";

import { useDispatch } from "react-redux";
import { GP00 } from "../../../../types/configType";
import { set } from "nprogress";
import { postThemFilm } from "../../../../services/MangerFilmServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postThemFilmAction } from "../../../../redux/actions/FilmAction";
import * as Yup from "yup";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const AddNew = () => {
  const [img, setIMG] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoadingAdd] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
      maNhom: GP00,
    },
    validationSchema: Yup.object().shape({
      tenPhim: Yup.string().required("Tên phim là bắt buộc"),
      trailer: Yup.string().required("Trailer là bắt buộc"),
      moTa: Yup.string()
        .required("Mô tả là bắt buộc")
        .min(100, "Mô tả phải có ít nhất 100 ký tự"),
      ngayKhoiChieu: Yup.string().required("Ngày khởi chiếu là bắt buộc"),
      danhGia: Yup.number()
        .min(1, "Đánh giá phải lớn hơn 0")
        .max(10, "Đánh giá phải bé hơn 10")
        .required("Vui lòng chọn đánh giá từ 1-10"),
      hinhAnh: Yup.mixed()
        .test("fileFormat", "Hình ảnh không hợp lệ", (value) => {
          if (!value) {
            return true; // No file is selected
          }
          const supportedFormats = ["image/jpeg", "image/png", "image/gif"];
          return value && supportedFormats.includes(value.type);
        })
        .required("Hình ảnh buộc phải có"),
    }),
    onSubmit: async (value, { resetForm }) => {
      setLoadingAdd(true);
      console.log(value);
      await dispatch(
        postThemFilmAction(
          value.tenPhim,
          value.trailer,
          value.moTa,
          moment(value.ngayKhoiChieu).format("DD/MM/YYYY"),
          value.sapChieu,
          value.dangChieu,
          value.hot,
          value.danhGia,
          value.hinhAnh,
          value.maNhom
        )
      );

      setLoadingAdd(false);
      formik.setFieldValue("ngayKhoiChieu", "");
      setIMG(null);
      resetForm();
    },
  });

  // const handelChaneDatePick = (value) => {
  //   const ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
  //   formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  // };

  const handleChangeIMG = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    //  khong co hinh tra ve preview IMG
    if (file === undefined) {
      setIMG(null);
    } else if (
      file?.type === "image/jpeg" ||
      file?.type === "image/jpg" ||
      file?.type === "image/gif" ||
      file?.type === "image/png"
    ) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setIMG(e.target.result);
        formik.setFieldValue("hinhAnh", file);
      };
    }
  };

  return (
    <div>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
        <Form.Item
          label="Tên Phim"
          validateStatus={
            formik.touched.trailer && formik.errors.tenPhim ? "error" : ""
          }
          help={
            formik.touched.trailer && formik.errors.tenPhim
              ? formik.errors.trailer
              : ""
          }
        >
          <Input
            onBlur={formik.handleBlur}
            name="tenPhim"
            value={formik.values.tenPhim}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Trailer"
          validateStatus={
            formik.touched.trailer && formik.errors.trailer ? "error" : ""
          }
          help={
            formik.touched.trailer && formik.errors.trailer
              ? formik.errors.trailer
              : ""
          }
        >
          <Input
            onBlur={formik.handleBlur}
            name="trailer"
            value={formik.values.trailer}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          validateStatus={
            formik.errors.moTa && formik.touched.moTa ? "error" : ""
          }
          help={
            formik.touched.moTa && formik.errors.moTa ? formik.errors.moTa : ""
          }
        >
          <TextArea
            onBlur={formik.handleBlur}
            name="moTa"
            value={formik.values.moTa}
            rows={4}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item
          validateStatus={
            formik.errors.ngayKhoiChieu && formik.touched.ngayKhoiChieu
              ? "error"
              : ""
          }
          help={
            formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu
              ? formik.errors.ngayKhoiChieu
              : ""
          }
          label="Ngày chiếu"
          style={{
            cursor: "pointer",
          }}
        >
          <DatePicker
            value={formik.values.ngayKhoiChieu}
            style={{
              cursor: "pointer",
            }}
            name="ngayKhoiChieu"
            format={"DD/MM/YYYY"}
            onChange={(date) => formik.setFieldValue("ngayKhoiChieu", date)}
          />
        </Form.Item>

        <Form.Item label="Đang chiếu">
          <Switch
            name="dangChieu"
            checked={formik.values.dangChieu}
            style={{ backgroundColor: "green" }}
            onChange={(value, e) => {
              formik.setFieldValue(e.target.name, value);
            }}
          />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch
            name="hot"
            checked={formik.values.hot}
            style={{ backgroundColor: "green" }}
            onChange={(value, e) => {
              formik.setFieldValue(e.target.name, value);
            }}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch
            checked={formik.values.sapChieu}
            name="sapChieu"
            style={{ backgroundColor: "green" }}
            onChange={(value, e) => {
              formik.setFieldValue(e.target.name, value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Đánh giá"
          validateStatus={
            formik.errors.danhGia && formik.touched.danhGia ? "error" : ""
          }
          help={
            formik.errors.danhGia && formik.touched.danhGia
              ? formik.errors.danhGia
              : ""
          }
        >
          <InputNumber
            onBlur={formik.handleBlur}
            value={formik.values.danhGia}
            name="danhGia"
            onChange={(value) => {
              formik.setFieldValue("danhGia", value);
            }}
            min={0}
            max={10}
          />
        </Form.Item>
        <Form.Item
          validateStatus={
            formik.touched.hinhAnh && formik.errors.hinhAnh ? "error" : ""
          }
          help={
            formik.touched.hinhAnh && formik.errors.hinhAnh
              ? formik.errors.hinhAnh
              : ""
          }
          label="Hình Ảnh"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <input
            name="hinhAnh"
            type="file"
            id="uploadIMG"
            onChange={handleChangeIMG}
            hidden
          />

          <label
            className="bg-blue-400 p-2 border-blue-400 rounded cursor-pointer"
            htmlFor="uploadIMG"
          >
            Upload IMG
          </label>
          {img !== null ? (
            <div
              className="border-dotted border-2 p-4 text-center flex justify-center items-center mt-2 border-gray-400 rounded "
              style={{ height: 150 }}
            >
              <img src={img} alt="s" style={{ width: "100px", height: 100 }} />
            </div>
          ) : (
            <div
              className=" border-dotted border-2 text-center flex justify-center items-center mt-2 border-gray-400 rounded "
              style={{ height: 100 }}
            >
              Preview IMG ...
            </div>
          )}
        </Form.Item>
        <Form.Item label="Button">
          {!loading ? (
            <Button onClick={formik.handleSubmit} type="submit">
              Add Film
            </Button>
          ) : (
            <Button
              disabled={loading}
              type="submit"
              className="flex items-center"
            >
              <Spin size="small" className="mr-2" /> <span>Add Film</span>
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddNew;
