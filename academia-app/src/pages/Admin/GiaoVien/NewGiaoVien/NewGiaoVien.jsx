import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import httpApi from "../../../../api/domain/httpApi";

const NewGiaoVien = () => {
  const history = useNavigate();
  const [ten, setTen] = useState();
  const [date, setDate] = useState();
  const [sdt, setSdt] = useState();
  const [email, setEmail] = useState();
  const [diaChi, setDiaChi] = useState();
  const handleCreate = async (event) => {
    event.preventDefault();
    if (
      date !== "" &&
      ten !== "" &&
      diaChi !== "" &&
      sdt !== "" &&
      email !== "" &&
      date !== undefined &&
      ten !== undefined &&
      diaChi !== undefined &&
      sdt !== undefined &&
      email !== undefined
    ) {
      await httpApi.post("/Teams/PostGiaoVien", {
        //Đặt cùng tên với API
        TenGv: ten,
        Sdt: sdt,
        NgaySinh: date,
        Email: email,
        Diachi: diaChi,
      });
      alert("Thêm Thành Công");
      history("/Admin/LopHoc");
    } else {
      window.alert("Vui lòng không được bỏ trống");
    }
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Giáo Viên</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Tên Giáo Viên</label>
          <input
            type="text"
            placeholder="Vui lòng nhập tên"
            onChange={(e) => {
              setTen(e.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Số Điên Thoại</label>
          <input
            type="number"
            placeholder="Vui Lòng Nhập SĐT"
            onChange={(e) => {
              setSdt(e.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Ngày Sinh</label>
          <input
            type="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="text"
            placeholder="Vui lòng nhập mô tả"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Địa Chỉ</label>
          <input
            type="text"
            placeholder="........"
            onChange={(e) => {
              setDiaChi(e.target.value);
            }}
          />
        </div>

        <button className="newUserButton" onClick={(e) => handleCreate(e)}>
          Thêm Mới
        </button>
      </form>
    </div>
  );
};

export default NewGiaoVien;
