import React from "react";
import { Link } from "react-router-dom";
import "./SidebarAdmin.css";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import BarChartIcon from "@mui/icons-material/BarChart";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ReportIcon from "@mui/icons-material/Report";
const Sidebar = () => {
  return (
    <div className="sidebar-admin">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/Admin/Home" className="link">
              <li className="sidebarListItem active">
                <LineStyleIcon className="sidebarIcon" />
                Trang Chủ
              </li>
            </Link>
            <Link to="/Admin/ThongKe" className="link">
              <li className="sidebarListItem">
                <TimelineIcon className="sidebarIcon" />
                Doanh Thu
              </li>
            </Link>

            {/* <li className="sidebarListItem">
              <TrendingUpIcon className="sidebarIcon" />
              Sales
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/Admin/ListUser" className="link">
              <li className="sidebarListItem">
                <PermIdentityIcon className="sidebarIcon" />
                Người Dùng
              </li>
            </Link>
            <Link to="/Admin/ListProduct" className="link">
              <li className="sidebarListItem">
                <StorefrontIcon className="sidebarIcon" />
                Khóa Học
              </li>
            </Link>
            <Link to="/Admin/LopHoc" className="link">
              <li className="sidebarListItem">
                <WorkOutlineIcon className="sidebarIcon" />
                Lớp Học
              </li>
            </Link>

            <Link to="/Admin/ChuDe" className="link">
              <li className="sidebarListItem">
                <DynamicFeedIcon className="sidebarIcon" />
                Chủ Đề
              </li>
            </Link>

            <Link to="/Admin/KhuyenMai" className="link">
              <li className="sidebarListItem">
                <AttachMoneyIcon className="sidebarIcon" />
                Khuyến Mãi
              </li>
            </Link>
            <Link to="/Admin/HoaDon" className="link">
              <li className="sidebarListItem">
                <BarChartIcon className="sidebarIcon" />
                Hóa Đơn
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <Link to="/Admin/NganHangBaiHoc" className="link">
              <li className="sidebarListItem">
                <ChatBubbleOutlineIcon className="sidebarIcon" />
                Xây Dựng Bài Học
              </li>
            </Link>
            <Link to="/Admin/NganHang" className="link">
              <li className="sidebarListItem">
                <MailOutlineIcon className="sidebarIcon" />
                Ngân Hàng Câu Hỏi
              </li>
            </Link>
            <Link to="/Admin/ThemDeThi" className="link">
              <li className="sidebarListItem">
                <DynamicFeedIcon className="sidebarIcon" />
                Đề Thi
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <Link to="/Admin/QuanLy" className="link">
              <li className="sidebarListItem">
                <WorkOutlineIcon className="sidebarIcon" />
                Quản Lý
              </li>
            </Link>

            <li className="sidebarListItem">
              <ReportIcon className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
