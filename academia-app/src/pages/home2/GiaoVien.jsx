import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Project.css";
const GiaoVien = ({ props }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <Link to={`/teams/${props.maGv}`}>
        <div className="proj-imgbx">
          <img
            src={`${process.env.REACT_APP_URL_HINH}/giaovien/${props.hinhAnhGv}`}
            style={{ width: 518, height: 380 }}
            alt=""
          />
          <div className="proj-txtx">
            <h4>{props.tenGv}</h4>
            <span>Academia Best Online Education</span>
          </div>
        </div>
      </Link>
    </Col>
  );
};

export default GiaoVien;
