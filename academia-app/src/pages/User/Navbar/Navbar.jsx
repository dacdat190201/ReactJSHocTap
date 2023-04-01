import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import { AuthContext } from "../../../context/AuthContext";
import httpApi from "../../../api/domain/httpApi";
const Navbar = () => {
  const { user: authUser } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      httpApi.get(`/User/ProfileUser?email=${authUser.email}`).then((res) => {
        setUserProfile(res.data.data);
      });
    };
    fetch();
  }, []);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo-admin"></span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNoneIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <LanguageIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <SettingsIcon />
          </div>
          <img
            src={`${process.env.REACT_APP_URL_HINH}/Images/${userProfile.imagesUser}`}
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
