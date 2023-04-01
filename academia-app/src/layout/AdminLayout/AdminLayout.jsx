import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/CommonAdmin/sidebar/Sidebar";
import TopBar from "../../components/CommonAdmin/topbar/TopBar";
import "./AdminLayout.css";
const AdminLayout = () => {
  return (
    <div className="bg">
      {/* <Admin/> */}
      <TopBar />
      <div className="container-admin">
        <Sidebar />
        <div className="orthers">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
