import React from "react";
import { Outlet } from "react-router-dom";
import SidebarTeam from "../../components/CommonAdmin/sidebarTeam/SidebarTeam";
import TopBar from "../../components/CommonAdmin/topbar/TopBar";

const AdminTeamLayout = () => {
  return (
    <div className="bg">
      {/* <Admin/> */}
      <TopBar />
      <div className="container-admin">
        <SidebarTeam />
        <div className="orthers">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminTeamLayout;
