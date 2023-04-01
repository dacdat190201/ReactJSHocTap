import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import "./Sidebar.css";
const Sidebar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo1">TÀI KHOẢN</span>
      </div>
      <hr className="hr"></hr>
      <div className="center">
        <ul>
          <p className="title">Main</p>
          <li>
            <i class="fa-brands fa-windows icon1"></i>
            <span className="span1">
              <Link to={`/user/${user.email}/product`}>Khóa Học</Link>
            </span>
          </li>
          <p className="title">List</p>
          <li>
            <i class="fa-regular fa-user icon1"></i>
            <span className="span1">
              <Link to={`/user/${user.email}/profile`}>
                Thông tin tài khoản
              </Link>
            </span>
          </li>

          <li>
            <i class="fa-regular fa-credit-card icon1"></i>
            <span className="span1">
              <Link to={`/user/${user.email}/donhang`}>Lịch sử đơn hàng</Link>
            </span>
          </li>
          {/* <li>
            <i class="fa-brands fa-pied-piper icon1"></i>
            <span className="span1">Logs</span>
          </li> */}
          <li>
            <i class="fa-solid fa-ranking-star icon1"></i>
            <span className="span1">
              <Link to={"/xephang"}>Xếp Hạng</Link>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
