import React, { useState } from "react";
import { useEffect } from "react";
import httpApi from "../../api/domain/httpApi";
import KhuyenMai from "./KhuyenMai";
import "./ListKhuyenMai.css";
const ListKhuyenMai = () => {
  const logo = require("../../assets/images/khuyenmai.jpg");
  const [khuyenmai, setKhuyenMai] = useState();
  useEffect(() => {
    const fetch = async () => {
      httpApi.get("/GioHang/GetMaGiamGia").then((res) => {
        setKhuyenMai(res.data.data);
      });
    };
    fetch();
  }, []);
  return (
    <div className="bg-khuyenmai">
      <img src={logo} width="100%" height={300} />
      <hr></hr>
      <div className="all-km">
        <h4>Khuyến Mãi Đang Có</h4>
      </div>
      <div className="khuyenmai">
        {khuyenmai &&
          khuyenmai.sale.map((item, key) => (
            <KhuyenMai key={item.maSale} item={item} />
          ))}
      </div>
    </div>
  );
};

export default ListKhuyenMai;
