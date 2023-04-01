import React from "react";
import Chart from "../chart/Chart";
import FuturedInfo from "../futuredInfo/FuturedInfo";
import WidgetLg from "../widget/widgetLg/WidgetLg";
import WidgetSm from "../widget/widgetSm/WidgetSm";
import "./HomeAdmin.css";

const HomeAdmin = () => {
  return (
    <div className="home-admin">
      <FuturedInfo />
      {/* <Chart/> */}
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
};

export default HomeAdmin;
