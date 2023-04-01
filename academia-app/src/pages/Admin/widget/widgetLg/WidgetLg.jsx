import React, { useEffect, useState } from "react";
import "./WidgetLg.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import httpApi from "../../../../api/domain/httpApi";
import { Link } from "react-router-dom";
const WidgetLg = () => {
  const [news1, SetNews1] = useState([]);
  useEffect(() => {
    const callApi = async () => {
      httpApi.get("/GioHang/HoaDonHoNay").then((res) => {
        SetNews1(res.data.data.data);
      });
    };
    callApi();
  }, []);
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Danh sách hóa đơn hôm nay </h3>
      <ul className="widgetSmList">
        {news1 &&
          news1?.map((item) => {
            return (
              <li className="widgetSmListItem">
                <img
                  src={`${process.env.REACT_APP_URL_HINH}/Images/${item.idNavigation.imagesUser}`}
                  alt=""
                  className="widgetSmImg"
                />
                <div className="widgetSmUser">
                  <span className="widgetSmUsername">
                    {item.idNavigation.hoTen}
                  </span>
                  <span className="widgetSmUserTitle">
                    Mã hóa đơn mua: {item.maDh}
                  </span>
                </div>
                <button className="widgetSmButton">
                  <VisibilityIcon className="widgetSmIcon" />
                  <Link
                    to={`/Admin/HoaDon/Edit/${item.maDh}`}
                    style={{ color: "black" }}
                  >
                    Xem
                  </Link>
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default WidgetLg;
