import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import httpApi from "../../api/domain/httpApi";
import "./SignUp.css";
export const SignUp = () => {
  const history = useNavigate();
  const [username, setUserName] = useState();
  const [phone, setPhone] = useState();
  const [hoTen, setHoTen] = useState();
  const [pass, setPass] = useState();
  const [confPass, setConfPass] = useState();
  const [email, setEmail] = useState();
  const handleCreate = async (event) => {
    event.preventDefault();
    if (username !== "" && hoTen !== "" && pass !== "" && pass === confPass) {
      await httpApi
        .post("/Account/Register", {
          //Đặt cùng tên với API
          username: username,
          password: pass,
          HoTen: hoTen,
          sdt: phone,
          EmailReal: email,
        })
        .then((res) => {
          if (res.data.message == false) {
            alert(res.data.data);
          } else {
            alert("Đăng ký thành công");
            history("/SignIn");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.alert(
        "Sai thông tin tài khoản, Mật khẩu không đúng định dạng hoặc không khớp !!!"
      );
    }
  };
  // const handleCreate = async (event) => {
  //   event.preventDefault();
  //   if (username !== "" && hoTen !== "" && pass !== "" && pass === confPass) {
  //     try {
  //       await httpApi.post("/Account/Register", {
  //         //Đặt cùng tên với API
  //         username: username,
  //         password: pass,
  //         HoTen: hoTen,
  //         sdt: phone,
  //       });
  //       window.alert("Đăng Ký Thành Công");
  //       history("/SignIn");
  //     } catch (err) {
  //       window.alert("Đăng ký thất bại");
  //     }
  //   } else {
  //     window.alert(
  //       "Sai thông tin tài khoản, Mật khẩu không đúng định dạng hoặc không khớp !!!"
  //     );
  //   }
  // };
  return (
    <div className="bg1">
      <div className="login-wrapper1">
        <form action className="form1">
          <img src="img/avatar.png" alt="" />
          <h2>Đăng Ký</h2>
          <div className="input-group1">
            <input
              type="text"
              name="loginUser"
              style={{ width: "670px" }}
              autoComplete="new-password"
              required
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <label htmlFor="loginUser">User Name</label>
          </div>
          <div className="input-group1">
            <input
              type="password"
              name="loginPassword"
              style={{ width: "670px" }}
              autoComplete="new-password"
              required
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
            <label htmlFor="loginPassword">Password (A@123)</label>
          </div>
          <div className="input-group1">
            <input
              type="password"
              name="loginPassword"
              style={{ width: "670px" }}
              autoComplete="new-password"
              required
              onChange={(e) => {
                setConfPass(e.target.value);
              }}
            />
            <label htmlFor="loginPassword">Xác Nhận Password</label>
          </div>
          <div className="input-group1">
            <input
              type="text"
              name="phone"
              style={{ width: "670px" }}
              autoComplete="new-password"
              required
              onChange={(e) => {
                setHoTen(e.target.value);
              }}
            />
            <label htmlFor="phone">Họ Tên</label>
          </div>
          <div className="input-group1">
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
          <div className="input-group1">
            <input
              type="number"
              name="phone"
              style={{ width: "670px" }}
              autoComplete="new-password"
              required
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <label htmlFor="phone">Phone Number</label>
          </div>
          <input
            type="submit"
            // defaultValue="Login"
            value={"Đăng Ký"}
            className="submit-btn1"
            onClick={handleCreate}
          />
        </form>
      </div>
    </div>
  );
};
