import React from "react";
import { Link } from "react-router-dom";
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

const SidebarTeam = () => {
  return (
    <div className="sidebar-admin">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Teams</h3>
          <ul className="sidebarList"></ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/Giaovien/ListProduct" className="link">
              <li className="sidebarListItem">
                <StorefrontIcon className="sidebarIcon" />
                Khóa Học
              </li>
            </Link>
            <Link to="/Giaovien/LopHoc" className="link">
              <li className="sidebarListItem">
                <WorkOutlineIcon className="sidebarIcon" />
                Lớp Học
              </li>
            </Link>

            <Link to="/Giaovien/ChuDe" className="link">
              <li className="sidebarListItem">
                <DynamicFeedIcon className="sidebarIcon" />
                Chủ Đề
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <Link to="/Giaovien/NganHangBaiHoc" className="link">
              <li className="sidebarListItem">
                <ChatBubbleOutlineIcon className="sidebarIcon" />
                Xây Dựng Bài Học
              </li>
            </Link>
            <Link to="/Giaovien/NganHang" className="link">
              <li className="sidebarListItem">
                <MailOutlineIcon className="sidebarIcon" />
                Ngân Hàng Câu Hỏi
              </li>
            </Link>
            <Link to="/Giaovien/ThemDeThi" className="link">
              <li className="sidebarListItem">
                <DynamicFeedIcon className="sidebarIcon" />
                Đề Thi
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarTeam;
