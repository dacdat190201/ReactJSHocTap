import React, { useEffect, useState } from "react";
import "./HoaDonDateTime.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import httpApi from "../../../../api/domain/httpApi";

const HoaDonInDateTime = () => {
  const [news, SetNews] = useState([]);
  useEffect(() => {
    const callApi = async () => {
      httpApi.get("/GioHang/HoaDon1Ngay").then((res) => {
        SetNews(res.data.data);
      });
    };
    callApi();
  }, []);
  return (
    <div>
      {" "}
      <div className="featured">
        <div className="featuredItem">
          <span className="featuredTitle">Số Lượng Hôm Nay</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{news.soluong}</span>
            <span className="featuredMoneyRate">
              -11.4 <ArrowDownwardIcon className="featuredIcon negative" />
            </span>
          </div>
          <span className="featuredSub">Số lượng đã bán: {news.soluong}</span>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Thu Nhập Hôm Nay</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">${news.tongtien}</span>
            <span className="featuredMoneyRate">
              -1.4 <ArrowDownwardIcon className="featuredIcon negative" />
            </span>
          </div>
          <span className="featuredSub">Tổng Tiền: {news.tongtien}</span>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Tổng Đơn Hàng Đã Bán</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">${news.tongtien1}</span>
            <span className="featuredMoneyRate">
              +2.4 <ArrowUpwardIcon className="featuredIcon" />
            </span>
          </div>
          <span className="featuredSub">Số Lượng Đã Bán: {news.soluong1}</span>
        </div>
      </div>
    </div>
  );
};

export default HoaDonInDateTime;
