import React, { useState } from "react";
import "./KhuyenMai.css";
const KhuyenMai = ({ item }) => {
  const [bttnText, setBttnText] = useState("COPY CODE");
  const copyCode = () => {
    navigator.clipboard
      .writeText(item.maSale)
      .then(() => {
        setBttnText("COPIED");
        setTimeout(function () {
          setBttnText("COPYCODE");
        }, 3000);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="contai">
      <div className="coupon-card">
        <h3>{item.tenSale}</h3>
        <h5>Điều Kiện: {item.moTa}.</h5>
        <div className="coupon-row">
          <span id="cpnCode">{item.maSale}</span>
          <span id="cpnBtn" onClick={copyCode}>
            {bttnText}
          </span>
        </div>
        <p>Ngày Hết Hạn: {item.ngayHetHan}</p>
        <p>Số Lượng: {item.soLuong}</p>
        <div className="circle1"></div>
        <div className="circle2"></div>
      </div>
    </div>
  );
};

export default KhuyenMai;
