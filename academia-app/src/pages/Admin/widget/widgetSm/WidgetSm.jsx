import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./WidgetSm.css";
import { Link } from "react-router-dom";
import httpApi from "../../../../api/domain/httpApi";

const WidgetSm = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchDetail = async () => {
      httpApi.get("/Admin/AdminGet5User").then((res) => {
        setUser(res.data.data.dsUser);
      });
    };
    fetchDetail();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Người Dùng Mới</span>
      <ul className="widgetSmList">
        {user &&
          user.map((item) => {
            return (
              <li className="widgetSmListItem">
                <img
                  src={`${process.env.REACT_APP_URL_HINH}/Images/${item.imagesUser}`}
                  alt=""
                  className="widgetSmImg"
                />
                <div className="widgetSmUser">
                  <span className="widgetSmUsername">{item.hoTen}</span>
                  <span className="widgetSmUserTitle">Người dùng mới</span>
                </div>
                <button className="widgetSmButton">
                  <VisibilityIcon className="widgetSmIcon" />
                  <Link
                    to={`/Admin/ListUser/User/${item.maSinhVien}`}
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

export default WidgetSm;
