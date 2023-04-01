import React from "react";
import HoaDonInDateTime from "./HoaDonInDateTime";
import ListHoaDon from "./ListHoaDon";

const HoaDonAdmin = () => {
  return (
    <div className="home-hoadon">
      <HoaDonInDateTime />
      <div className="hoadon-bg">
        <ListHoaDon />
      </div>
    </div>
  );
};

export default HoaDonAdmin;
