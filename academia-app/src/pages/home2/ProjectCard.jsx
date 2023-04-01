import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Project.css";
const ProjectCard = ({ props }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <Link to={`/chude/${props.maChuDe}`}>
        <div className="proj-imgbx">
          <img
            src={`${process.env.REACT_APP_URL_HINH}/images/${props.images}`}
            style={{ width: 518, height: 380 }}
          />
          <div className="proj-txtx">
            <h4>{props.tenChuDe}</h4>
            <span>Academia Best Online Education</span>
          </div>
        </div>
      </Link>
    </Col>
  );
};

export default ProjectCard;
