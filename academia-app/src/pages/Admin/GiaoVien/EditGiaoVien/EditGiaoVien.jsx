import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import httpApi from "../../../../api/domain/httpApi";
import { Table } from "react-bootstrap";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const EditGiaoVien = () => {
  const [news, SetNews] = useState([]);
  const [n, SetN] = useState([]);
  const [image, setImage] = useState();
  const [ten, setTen] = useState();
  const [email, setEmail] = useState();
  const [sdt, setSdt] = useState();
  const [diachi, setDiaChi] = useState();
  const [ngaysinh, setNgaySinh] = useState();
  const { maGv } = useParams();
  const handleUpdateImages = async (e) => {
    const formData = new FormData();
    formData.append("File", image);
    await httpApi
      .put(`/Teams/UpdateGiaoVien?MaGv=${maGv}`, formData)
      .then((res) => alert("Cập nhật thành công"))
      .catch((err) => console.error(err));
    window.location.reload();
  };
  const edit = async (e) => {
    await httpApi
      .put(`/Teams/Update?maGv=${maGv}`, {
        TenGv: ten,
        Sdt: sdt,
        Diachi: diachi,
        Email: email,
        ngaysinh: ngaysinh,
      })
      .then((res) => {
        alert("Sửa thành công");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    const fetchDetail = async () => {
      httpApi.get(`Teams/GetTemsDetail?MaGv=${maGv}`).then((res) => {
        SetNews(res.data.data.dsNoiDung);
        SetN(res.data.data.dsNoiDung.lophoc);
      });
    };
    fetchDetail();
  }, []);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Giáo Viên</h1>
        <Link to="/Admin/GiaoVien/New">
          <button className="userAddButton">Thêm</button>
        </Link>
      </div>

      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={`${process.env.REACT_APP_URL_HINH}/giaovien/${news.hinhAnhGv}`}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{news.tenGv}</span>
              <span className="userShowUserTitle">
                Mã Giáo Viên: {news.maGv}
              </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Thông tin chi tiết</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{news.tenGv}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{news.ngaysinh}</span>
            </div>
            <span className="userShowTitle">Chi tiết liên hệ</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{news.sdt}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{news.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{news.diachi}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Chỉnh Sửa</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Tên Giáo Viên</label>
                <input
                  type="text"
                  placeholder={news.tenGv}
                  className="userUpdateInput"
                  onChange={(e) => {
                    setTen(e.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Ngày sinh :{news.ngaysinh}</label>
                <input
                  type="date"
                  className="userUpdateInput"
                  onChange={(e) => {
                    setNgaySinh(e.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="email"
                  placeholder={news.email}
                  className="userUpdateInput"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Số Điện Thoại</label>
                <input
                  type="number"
                  placeholder={news.sdt}
                  className="userUpdateInput"
                  onChange={(e) => {
                    setSdt(e.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Địa Chỉ</label>
                <input
                  type="text"
                  placeholder={news.diachi}
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
                  src={`${process.env.REACT_APP_URL_HINH}/giaovien/${news.hinhAnhGv}`}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
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
                  Tải lên
                </button>
              </div>
              <button className="userUpdateButton" onClick={edit}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <h5>Danh sách các lớp đang đứng</h5>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Mã Lớp</TableCell>
                  <TableCell>Tên Lớp</TableCell>

                  <TableCell>Tên Môn</TableCell>

                  <TableCell>Xử Lí</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {n &&
                  n?.map((item, key) => {
                    return (
                      <tr>
                        <th align="left">{item.maLop}</th>
                        <th align="left">{item.tenLop}</th>
                        <th align="left">{item?.maMhNavigation.tenMh}</th>
                        <th align="left">
                          <Link to={`/Admin/LopHoc/${item.maLop}`}>
                            <button className="userListEdit">Xem</button>
                          </Link>
                        </th>
                      </tr>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
};

export default EditGiaoVien;
