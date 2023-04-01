import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const DashBoard = () => {
  return (
    <div className="bg">
      <Link to="/home">
        <i class="fa-regular fa-circle-arrow-left"></i>
      </Link>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div>Thông tin dsboard</div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
