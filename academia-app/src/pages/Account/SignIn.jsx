import "./SignIn.css";
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import httpApi from "../../api/domain/httpApi";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth.slice";
import { Col, Row } from "react-bootstrap";
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { user: authUser, login } = useContext(AuthContext);
  useEffect(() => {
    if (authUser.email) {
      navigate("");
    }
  }, [authUser.email, navigate]);

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      alert("Không được để trống");
      return;
    }
    try {
      const res = await httpApi.post("/Account/login", user);

      console.log({ res });
      login({
        email: user.email,
        authenticationToken: res.data.authenticationToken,
      });
      var decoded = jwt_decode(res.data.authenticationToken);
      dispatch(
        loginSuccess({
          email: user.email,
          authenticationToken: res.data.authenticationToken,
          ...decoded,
          ...res.data,
        })
      );
      // navigate("/");
    } catch (err) {
      alert("Không thể đăng nhập, vui lòng kiểm tra lại", err);
    }
  };
  return (
    <div className="bg1">
      <div className="login-wrapper1">
        <form action className="form1">
          <img src="img/avatar.png" alt="" />
          <h2>Đăng Nhập</h2>
          <div className="input-group1">
            <input
              type="text"
              name="loginUser"
              id="email"
              onChange={handleChange}
              style={{ width: "670px" }}
              autoComplete="new-password"
              required
            />
            <label htmlFor="loginUser">User Name</label>
          </div>
          <div className="input-group1">
            <input
              type="password"
              name="loginPassword"
              id="password"
              onChange={handleChange}
              style={{ width: "670px" }}
              autoComplete="new-password"
              required
            />
            <label htmlFor="loginPassword">Password</label>
          </div>
          <input
            type="submit"
            // defaultValue="Login"
            value={"Đăng Nhập"}
            className="submit-btn1"
            onClick={handleSubmit}
          />
          <div className="forgot-pw1">
            <Row style={{ width: 400 }}>
              <Col style={{ width: 100 }}>
                <Link to="/forgot" style={{ color: "white" }}>
                  Quên Mật Khẩu
                </Link>
              </Col>
              <Col sm={6}>
                <Link to="/signup" style={{ color: "white" }}>
                  Đăng ký ngay
                </Link>
              </Col>
            </Row>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
