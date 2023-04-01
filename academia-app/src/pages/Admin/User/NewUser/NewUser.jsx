import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import httpApi from "../../../../api/domain/httpApi";
import "./NewUser.css";
const NewUser = () => {
  const history = useNavigate();
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [diaChi, setDiaChi] = useState();
  const [hoTen, setHoTen] = useState();
  const [pass, setPass] = useState();
  const [confPass, setConfPass] = useState();
  const handleCreate = async (event) => {
    event.preventDefault();
    if (username !== "" && hoTen !== "" && pass !== "" && pass === confPass) {
      try {
        await httpApi.post("/Account/Register", {
          //Đặt cùng tên với API
          username: username,
          password: pass,
          HoTen: hoTen,
          sdt: phone,
          EmailReal: email,
          DiaChi: diaChi,
        });
        window.alert("Đăng Ký Thành Công");
        history("/Admin/ListUser");
      } catch (err) {
        console.error(err);
      }
    } else {
      window.alert(
        "Sai thông tin tài khoản, Mật khẩu không đúng định dạng hoặc không khớp !!!"
      );
    }
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Đăng Ký Người Dùng</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="john"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Họ Tên</label>
          <input
            type="text"
            placeholder="John Smith"
            value={hoTen}
            onChange={(e) => {
              setHoTen(e.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="john@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Số Điện Thoại</label>
          <input
            type="number"
            placeholder="+1 123 456 78"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Password2</label>
          <input
            type="password"
            placeholder="password2"
            value={confPass}
            onChange={(e) => {
              setConfPass(e.target.value);
            }}
          />
        </div>
        <div className="newUserItem">
          <label>Địa Chỉ</label>
          <input
            type="text"
            placeholder="New York | USA"
            value={diaChi}
            onChange={(e) => {
              setDiaChi(e.target.value);
            }}
          />
        </div>

        <button className="newUserButton" onClick={handleCreate}>
          Thêm Mới
        </button>
      </form>
    </div>
  );
};

export default NewUser;
