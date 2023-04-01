import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import "./UserProd.css";
const UserProd = ({ props }) => {
  const { user } = useContext(AuthContext);
  return (
    <div style={{ marginRight: 30 }} className="bg-userpod">
      <Card style={{ width: "18rem", height: "450px" }}>
        <Card.Img
          variant="top"
          src={`${process.env.REACT_APP_URL_HINH}/images/${props.maMhNavigation.hinhAnh}`}
          style={{ width: "286x", height: "230px" }}
        />
        <Card.Body>
          <Card.Title>{props.maMhNavigation.tenMH}</Card.Title>
          <Card.Text>
            Cùng nhau cố gắng hoàn thành {props.maMhNavigation.tenMH}
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <Button style={{ backgroundColor: "InfoBackground" }}>
            <Link to={`/user/${user.email}/product/${props.maMh}`}>
              Học ngay
            </Link>
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserProd;
