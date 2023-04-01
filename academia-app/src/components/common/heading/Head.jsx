import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import httpApi from "../../../api/domain/httpApi";
import { AuthContext } from "../../../context/AuthContext";

export const Head = () => {
  const { totalUniqueItems } = useCart();
  const { user: authUser } = useContext(AuthContext);
  const [gio, setGio] = useState();
  useEffect(() => {
    const fetchDetail = async () => {
      httpApi
        .get(`/GioHang/CountGioHang?email=${authUser.email}`)
        .then((res) => {
          if (res.data.message == "true") {
            setGio(res.data.data);
          }
        });
    };
    fetchDetail();
  }, []);
  return (
    <>
      <section className="head">
        <div className="container flexSB">
          <Link to="/home" style={{ color: "white" }}>
            <div className="logo">
              <h1>ACADEMIA</h1>
              <span>ONLINE EDUCATION & LEARNING</span>
            </div>
          </Link>

          <div className="social">
            {/* Link file Index */}
            <i className="fab fa-facebook-f icon"></i>
            <i className="fab fa-instagram icon"></i>
            <i className="fab fa-youtube icon"></i>
            <i className="fab fa-twitter icon"></i>
            <Link to="/products/cart">
              <i class="fa-solid fa-cart-shopping icon">({gio?.c})</i>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
