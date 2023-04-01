import React, { useContext, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import Sidebar from "../Sidebar/Sidebar";
import UserProd from "./UserProd";
import httpApi from "../../../api/domain/httpApi";
import "./UserProduct.css";
import Navbar from "../Navbar/Navbar";

const UserProduct = () => {
  const [userPro, setUserPro] = useState([]);
  const [loading, setLoading] = useState([]);
  const { user: authUser } = useContext(AuthContext);

  useEffect(() => {
    const fetch = async () => {
      httpApi.get(`/User/MonHocByUser?email=${authUser.email}`).then((res) => {
        setUserPro(res.data.data.result);
        console.log(res.data.data.result);
        setLoading(false);
      });
    };
    fetch();
  }, []);
  if (loading === true) {
    return <div>loading....</div>;
  }
  return (
    <div className="bg">
      <Link to="/home">
        <i class="fa-solid fa-arrow-left"></i>
      </Link>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <Row style={{ width: 1100 }}>
            <h5>
              <p>Khóa học của bạn</p>
            </h5>
          </Row>
          <Row style={{ width: 1110 }}>
            <div>
              {userPro &&
                userPro.hoadon?.map((item, key) => {
                  return (
                    <div className="User-Product" style={{ width: 1100 }}>
                      {userPro &&
                        userPro.hoadon[key].cthoadon.map((value, k) => {
                          return (
                            // <div>{value.maMhNavigation.tenMH}</div>
                            <UserProd props={value} />
                          );
                        })}
                    </div>
                  );
                })}
            </div>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default UserProduct;
