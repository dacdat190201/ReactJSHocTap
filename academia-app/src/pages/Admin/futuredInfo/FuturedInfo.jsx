import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Button,
  Col,
  Container,
  Row,
  Spinner,
  Toast,
  Table,
} from "react-bootstrap";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "./FuturedInfo.css";
import httpApi from "../../../api/domain/httpApi";
const FuturedInfo = () => {
  const [revanueDate, setRevanueDate] = useState([]);
  const [revanueMonth, setRevanueMonth] = useState([]);
  const [revanueYear, setRevanueYear] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    layDoanhThuNgay();
    layDoanhThuThang();
    layDoanhThuNam();
  }, []);

  const layDoanhThuNgay = async () => {
    await httpApi({
      method: "get",
      url: "/ThongKe/GetDoanhThuNgay",
    })
      .then((res) => setRevanueDate(res.data.data.sum))
      .catch((err) => console.log(err));
  };

  const layDoanhThuThang = async () => {
    await httpApi({
      method: "get",
      url: "/ThongKe/GetDoanhThuThang",
    })
      .then((res) => setRevanueMonth(res.data.data))
      .catch((err) => console.log(err));
  };

  const layDoanhThuNam = async () => {
    await httpApi({
      method: "get",
      url: "/ThongKe/GetDoanhThuNam",
    })
      .then((res) => {
        setRevanueYear(res.data.data);
        setLoading(true);
      })
      .catch((err) => console.log(err));
  };
  if (!loading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Doanh thu</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">₫ {revanueDate}</span>
          {/* <span className="featuredMoneyRate">
            -11.4 <ArrowDownwardIcon className="featuredIcon negative" />
          </span> */}
        </div>
        <span className="featuredSub">Theo ngày</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Tháng</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">₫ {revanueMonth}</span>
          {/* <span className="featuredMoneyRate">
            -1.4 <ArrowDownwardIcon className="featuredIcon negative" />
          </span> */}
        </div>
        <span className="featuredSub">Tháng</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Năm</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">₫ {revanueYear}</span>
          {/* <span className="featuredMoneyRate">
            +2.4 <ArrowUpwardIcon className="featuredIcon" />
          </span> */}
        </div>
        <span className="featuredSub">Doanh thu của năm</span>
      </div>
    </div>
  );
};

export default FuturedInfo;
