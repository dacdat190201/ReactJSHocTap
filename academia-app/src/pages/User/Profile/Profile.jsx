import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./Profile.css";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import PublishIcon from "@mui/icons-material/Publish";
import { AuthContext } from "../../../context/AuthContext";
import httpApi from "../../../api/domain/httpApi";
const Profile = () => {
  /////////////////////////////////
  const [nhapUser, setNhapUser] = useState();
  const [nhapPassCu, setPassCu] = useState();
  const [nhapPassMoi, setPassMoi] = useState();
  const [XNPassMoi, setXNPassMoi] = useState();
  /////////////////////////////////
  const [hoTen, setHoTen] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [diaChi, setDiaChi] = useState();
  /////////////////////////////////////
  const [image, setImage] = useState();

  //////////////////////////////////
  const [render, setRender] = useState(false);
  const [renderPass, setRenderPass] = useState(false);
  const [loading, setLoading] = useState([]);
  const { user: authUser } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      httpApi.get(`/User/ProfileUser?email=${authUser.email}`).then((res) => {
        setUserProfile(res.data.data);
        setLoading(false);
      });
    };
    fetch();
  }, []);
  ////////////////////////////////////////////////////////
  const editUser = async (e) => {
    await httpApi
      .put(`/User/EditUser?email=${authUser.email}`, {
        HoTen: hoTen,
        PhoneNumber: phone,
        DiaChi: diaChi,
        EmailReal: email,
      })
      .then((res) => alert("Sửa thành công"))
      .catch((err) => console.error(err));
  };
  //UPDATE///////////////////////
  const handleUpdateImages = async (e) => {
    const formData = new FormData();
    formData.append("File", image);
    await httpApi
      .put(`/User/UpdateImages?email=${authUser.email}`, formData)
      .then((res) => alert("Cập nhật thành công"))
      .catch((err) => console.error(err));
    window.location.reload();
  };
  const tokenPayload = () => {
    if (!nhapPassCu || !nhapPassMoi) {
      alert("Mật Khẩu Không được để trống");
      return;
    }
    if (nhapPassMoi != XNPassMoi) {
      alert("Mật Khẩu Mới Phải Trùng Nhau");
      return;
    }
    httpApi.interceptors.request.use(function (config) {
      const token = authUser.authenticationToken;
      config.headers.Authorization = token ? `Bearer ${token}` : "";
      return config;
    });
    httpApi
      .post(`Account/ResetPassWord?email=${authUser.email}`, {
        passOld: nhapPassCu,
        passNew: nhapPassMoi,
      })
      .then((response) => {
        if (response.data.message == false) {
          alert(response.data.data);
        } else if (response.data.message == true) {
          alert(response.data.data);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="bg">
      <Link to="/home">
        <i class="fa-solid fa-arrow-left"></i>
      </Link>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <div className="user">
            <div className="userTitleContainer">
              <h3 className="userTitle">Thông tin cá nhân</h3>
            </div>
            <div className="userContainer">
              <div className="userShow">
                <div className="userShowTop">
                  <img
                    src={`${process.env.REACT_APP_URL_HINH}/Images/${userProfile.imagesUser}`}
                    alt=""
                    className="userShowImg"
                  />
                  <div className="userShowTopTitle">
                    <span className="userShowUsername">
                      {userProfile.hoTen}
                    </span>
                    <span className="userShowUserTitle">người dùng</span>
                  </div>
                </div>

                <div className="userShowBottom">
                  <span className="userShowTitle">Tài Khoản</span>
                  <div className="userShowInfo">
                    <PermIdentityIcon className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      {userProfile.userName}
                    </span>
                  </div>
                  <div className="userShowInfo">
                    <CalendarTodayIcon className="userShowIcon" />
                    <span className="userShowInfoTitle">10.12.1999</span>
                  </div>
                  <span className="userShowTitle">
                    Thông Thông Tin Chi Tiết
                  </span>
                  <div className="userShowInfo">
                    <PhoneAndroidIcon className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      {userProfile.phoneNumber}
                    </span>
                  </div>
                  <div className="userShowInfo">
                    <MailOutlineIcon className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      {userProfile.emailReal}
                    </span>
                  </div>
                  <div className="userShowInfo">
                    <LocationSearchingIcon className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      {userProfile.diaChi}
                    </span>
                  </div>
                </div>
                <button
                  className="userUpdateButton"
                  onClick={() => setRender(!render)}
                >
                  Chỉnh Sửa
                </button>
                <button
                  className="userUpdateButton"
                  onClick={() => setRenderPass(!renderPass)}
                >
                  Đổi Mật Khẩu
                </button>
              </div>
              {render && (
                <div className="userUpdate">
                  <span className="userUpdateTitle">Chỉnh Sửa</span>
                  <form className="userUpdateForm">
                    <div className="userUpdateLeft">
                      <div className="userUpdateItem">
                        <label>Họ Tên</label>
                        <input
                          type="text"
                          placeholder={`${userProfile.hoTen}`}
                          className="userUpdateInput"
                          onChange={(e) => {
                            setHoTen(e.target.value);
                          }}
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Email</label>
                        <input
                          type="text"
                          placeholder={`${userProfile.emailReal}`}
                          className="userUpdateInput"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Số điện thoại</label>
                        <input
                          type="text"
                          placeholder={`${userProfile.phoneNumber}`}
                          className="userUpdateInput"
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Địa chỉ</label>
                        <input
                          type="text"
                          placeholder={`${userProfile.diaChi}`}
                          className="userUpdateInput"
                          onChange={(e) => {
                            setDiaChi(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="userUpdateRight">
                      <div className="userUpdateUpload">
                        <img
                          className="userUpdateImg"
                          src={`${process.env.REACT_APP_URL_HINH}/Images/${userProfile.imagesUser}`}
                          alt=""
                        />
                        <label htmlFor="file">
                          <PublishIcon className="userUpdateIcon" />
                        </label>
                        <input
                          type="file"
                          id="file"
                          style={{ display: "none" }}
                          name="File"
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                          }}
                        />
                        <button
                          className="userUpdateButton"
                          onClick={handleUpdateImages}
                        >
                          Thay đổi ảnh đại diện
                        </button>
                      </div>
                      <button
                        className="userUpdateButton"
                        onClick={() => {
                          setRender(render);
                          editUser();
                        }}
                      >
                        Cập Nhật
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
          {renderPass && (
            <div className="user">
              <div className="userContainer">
                <div className="userShow">
                  <div className="userUpdateItem">
                    <label>Mật khẩu cũ</label>
                    <input
                      type="password"
                      placeholder="Nhập mật khẩu"
                      className="userUpdateInput"
                      value={nhapPassCu}
                      onChange={(e) => {
                        setPassCu(e.target.value);
                      }}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Mật khẩu mới</label>
                    <input
                      type="password"
                      placeholder="Nhập mật khẩu mới"
                      className="userUpdateInput"
                      value={nhapPassMoi}
                      onChange={(e) => {
                        setPassMoi(e.target.value);
                      }}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Xác nhận PassWord</label>
                    <input
                      type="password"
                      placeholder="Xác nhận mật khẩu mới"
                      className="userUpdateInput"
                      value={XNPassMoi}
                      onChange={(e) => {
                        setXNPassMoi(e.target.value);
                      }}
                    />
                  </div>
                  <button
                    className="userUpdateButton"
                    onClick={() => tokenPayload()}
                  >
                    Đổi Mật Khẩu
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
