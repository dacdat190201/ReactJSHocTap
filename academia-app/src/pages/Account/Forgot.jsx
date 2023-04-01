import axios from "axios";
import React, { useState } from "react";
import httpApi from "../../api/domain/httpApi";
import "./Forgot.css";
const Forgot = () => {
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();

  const handleSubMit = async (event) => {
    event.preventDefault();
    if (!username || !email) {
      alert("Vui Lòng Không được để trống!!");
      return;
    }
    {
      await httpApi
        .get(`/Account/ForgotPass?EmailReal=${email}&username=${username}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.message == false) {
            alert(res.data.data);
          } else {
            alert(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="bg1">
      <div className="login-wrapper1">
        <form action className="form2">
          <img src="img/avatar.png" alt="" />
          <h2>Quên Mật Khẩu</h2>
          <div className="input-group2">
            <input
              type="text"
              name="loginUser"
              id="email"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              style={{ width: "670px" }}
              autoComplete="new-password"
              required
            />
            <label htmlFor="loginUser">User Name</label>
          </div>
          <div className="input-group2">
            <input
              type="text"
              name="phone"
              style={{ width: "670px" }}
              autoComplete="new-password"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="phone">Email</label>
          </div>
          <input
            type="submit"
            value={"Gửi Đi"}
            className="submit-btn2"
            onClick={handleSubMit}
          />
        </form>
      </div>
    </div>
  );
};

export default Forgot;
