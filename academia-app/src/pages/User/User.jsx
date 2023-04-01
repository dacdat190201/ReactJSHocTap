import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./User.css";
const User = () => {
  return (
    <div className="bg">
      <Link to="/home">
        <i class="fa-regular fa-circle-arrow-left"></i>
      </Link>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">abc</div>
      </div>
    </div>
  );
};

export default User;
