import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./EditUser.css";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import PublishIcon from "@mui/icons-material/Publish";
import httpApi from "../../../../api/domain/httpApi";
import { Spinner } from "react-bootstrap";
const EditUser = () => {
  const [userEdit, setUserEdit] = useState();
  const [loading, setLoading] = useState(true);
  const { maSinhVien } = useParams();

  //////////////////////////////////////
  const [hoTen, setHoTen] = useState();
  const [phone, setPhone] = useState();
  const [image, setImage] = useState();
  const [email, setEmail] = useState();
  const [diaChi, setDiaChi] = useState();
  //////////////////////////////////////
  //UPDATE///////////////////////
  const handleUpdate = async (e) => {
    const formData = new FormData();
    formData.append("File", image);
    formData.append("HoTen", hoTen);
    formData.append("PhoneNumber", phone);
    formData.append("EmailReal", email);
    formData.append("DiaChi", diaChi);

    await httpApi
      .put(`/Admin/AdminUpdateUser?MaSV=${maSinhVien}`, formData)
      .then((res) => alert("Cập nhật thành công"))
      .catch((err) => console.error(err));
    window.location.reload();
  };
  /////////////////////////////
  useEffect(() => {
    const fetchDetail = async () => {
      httpApi.get(`/Admin/AdminGetUser?MaSV=${maSinhVien}`).then((res) => {
        setUserEdit(res.data.data.user);
        setLoading(false);
      });
    };
    fetchDetail();
  }, []);
  if (loading === true) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Chỉnh Sửa Người Dùng</h1>
        <Link to="/Admin/ListUser/Create">
          <button className="userAddButton">ThêmMới</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={`${process.env.REACT_APP_URL_HINH}/Images/${userEdit.imagesUser}`}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{userEdit.hoTen}</span>
              <span className="userShowUserTitle">Người Dùng</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Chi Tiết Tài Khoản</span>
            <div className="userShowInfo">
              <PermIdentityIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{userEdit.userName}</span>
            </div>
            <div className="userShowInfo">
              <CalendarTodayIcon className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Liên Hệ Tài Khoản</span>
            <div className="userShowInfo">
              <PhoneAndroidIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{userEdit.phoneNumber}</span>
            </div>
            <div className="userShowInfo">
              <MailOutlineIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{userEdit.emailReal}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearchingIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{userEdit.diaChi}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Chỉnh Sửa</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Họ Tên</label>
                <input
                  type="text"
                  placeholder={userEdit.hoTen}
                  className="userUpdateInput"
                  name="HoTen"
                  onChange={(e) => {
                    setHoTen(e.target.value);
                  }}
                />
              </div>

              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="annabeck99@gmail.com"
                  className="userUpdateInput"
                  name="EmailReal"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Số Điện Thoại</label>
                <input
                  type="text"
                  placeholder={userEdit.phoneNumber}
                  className="userUpdateInput"
                  name="PhoneNumBer"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                  name="DiaChi"
                  onChange={(e) => {
                    setDiaChi(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  src={`${process.env.REACT_APP_URL_HINH}/Images/${userEdit.imagesUser}`}
                  alt=""
                  className="productUploadImg"
                />
                <label htmlFor="file">
                  <PublishIcon className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  name="File"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  style={{ display: "none" }}
                />
              </div>
              <button className="userUpdateButton" onClick={handleUpdate}>
                Cập Nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
