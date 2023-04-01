import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import httpApi from "../../../../api/domain/httpApi";

const NewKhuyenMai = () => {
  const history = useNavigate();
  const [maKM, setMaKM] = useState();
  const [date, setDate] = useState();
  const [nameKM, setNameKM] = useState();
  const [mota, setMoTa] = useState();
  const [sotiengiam, setSoTienGiam] = useState();
  const [dk, setDK] = useState();
  const [sl, setSL] = useState();
  const handleCreate = async (event) => {
    event.preventDefault();
    if (
      maKM !== "" &&
      date !== "" &&
      nameKM !== "" &&
      mota !== "" &&
      sotiengiam !== "" &&
      dk !== "" &&
      sl !== "" &&
      maKM !== undefined &&
      date !== undefined &&
      nameKM !== undefined &&
      mota !== undefined &&
      sotiengiam !== undefined &&
      dk !== undefined &&
      sl !== undefined
    ) {
      try {
        await httpApi
          .post("/GioHang/PostSale", {
            //Đặt cùng tên với API
            MaSale: maKM,
            TenSale: nameKM,
            MoTa: mota,
            DieuKien: dk,
            SoLuong: sl,
            NgayHetHan: date,
            SoTienGiam: sotiengiam,
          })
          .then((res) => {
            window.alert("Thêm Thành Công");
            history("/Admin/KhuyenMai");
          });
      } catch (err) {
        console.error(err);
      }
    } else {
      window.alert("Vui lòng không được bỏ trống");
    }
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Khuyến Mãi</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Mã Khuyến Mãi</label>
          <input
            type="text"
            placeholder="Vui lòng nhập mã"
            onChange={(e) => {
              setMaKM(e.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Tên Khuyến Mãi</label>
          <input
            type="text"
            placeholder="Vui Lòng Nhập Tên"
            onChange={(e) => {
              setNameKM(e.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Ngày Hết Hạn</label>
          <input
            type="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Mô Tả</label>
          <input
            type="text"
            placeholder="Vui lòng nhập mô tả"
            onChange={(e) => {
              setMoTa(e.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Số Tiền Giảm</label>
          <input
            type="number"
            placeholder="100.000VND"
            onChange={(e) => {
              setSoTienGiam(e.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Điều Kiện Được Giảm</label>
          <input
            type="number"
            placeholder="Tối thiểu....VND"
            onChange={(e) => {
              setDK(e.target.value);
            }}
          />
        </div>

        <div className="newUserItem">
          <label>Số Lượng</label>
          <input
            type="number"
            placeholder="Vui lòng nhập số lượng"
            onChange={(e) => {
              setSL(e.target.value);
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

export default NewKhuyenMai;
