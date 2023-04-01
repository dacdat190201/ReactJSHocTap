import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import httpApi from "../../../../api/domain/httpApi";

const EditChuDe = () => {
  const { maChuDe } = useParams();
  const [chude, setChuDe] = useState([]);
  const [TenChuDe, setTenChuDe] = useState();
  const [newChuDe, setNewChuDe] = useState();
  const [image, setImage] = useState();
  const history = useNavigate();
  //////////////////////////////////////
  //UPDATE///////////////////////
  const handleUpdate = async (e) => {
    const formData = new FormData();
    formData.append("File", image);
    formData.append("TenChuDe", TenChuDe);

    await httpApi
      .put(`/MonHoc/UpdateChuDe?MaCD=${maChuDe}`, formData)
      .then((res) => alert("Cập nhật thành công"))
      .catch((err) => console.error(err));
    window.location.reload();
  };
  useEffect(() => {
    const callApi = async () => {
      httpApi.get(`/Monhoc/Get1ChuDe?machude=${maChuDe}`).then((res) => {
        setChuDe(res.data.data);
      });
    };
    callApi();
  }, []);
  const handleCreate = (event) => {
    event.preventDefault();
    if (newChuDe !== "" && newChuDe !== undefined) {
      httpApi.post("/Monhoc/PostChuDe", {
        //Đặt cùng tên với API
        TenChuDe: newChuDe,
      });
      window.alert("Thành Công");
      history("/Admin/ChuDe");
    } else {
      window.alert("Không được để trống !!!");
    }
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Chủ Đề</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={`${process.env.REACT_APP_URL_HINH}/Images/${chude.images}`}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{chude.tenChuDe}</span>
              <span className="userShowUserTitle">Chủ đề</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Thông tin liên quan</span>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{chude.tenChuDe}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">
                Mã chủ đề: {chude.maChuDe}
              </span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userUpdateItem">
              <label>Tên Chủ Đề</label>
              <input
                type="text"
                placeholder={chude.tenChuDe}
                className="userUpdateInput"
                name="TenChuDe"
                onChange={(e) => {
                  setTenChuDe(e.target.value);
                }}
              />
            </div>
            <div className="userUpdateItem">
              <label>Hình Ảnh</label>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={`${process.env.REACT_APP_URL_HINH}/Images/${chude.images}`}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
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
                Chỉnh sửa
              </button>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Thêm Mới Chủ Đề</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Nhập tên chủ đề mới</label>
                <input
                  type="text"
                  placeholder="Vui lòng nhập"
                  className="userUpdateInput"
                  onChange={(e) => {
                    setNewChuDe(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <button className="userUpdateButton" onClick={handleCreate}>
                Thêm Mới
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditChuDe;
