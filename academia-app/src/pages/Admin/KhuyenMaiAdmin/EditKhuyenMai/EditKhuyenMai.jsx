import React, { useEffect, useState } from "react";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import httpApi from "../../../../api/domain/httpApi";
import { Spinner } from "react-bootstrap";
const EditKhuyenMai = () => {
  const { maSale } = useParams();
  const [sale, setSale] = useState();
  const [loading, setLoading] = useState(true);

  const [maKM, setMaKM] = useState();
  const [date, setDate] = useState();
  const [nameKM, setNameKM] = useState();
  const [mota, setMoTa] = useState();
  const [sotiengiam, setSoTienGiam] = useState();
  const [dk, setDK] = useState();
  const [sl, setSL] = useState();
  useEffect(() => {
    const fetchDetail = async () => {
      httpApi.get(`GioHang/GetMaSale?MaSale=${maSale}`).then((res) => {
        setSale(res.data);
        setLoading(false);
      });
    };
    fetchDetail();
  }, []);
  const editKM = async (e) => {
    await httpApi
      .put(`GioHang/EditSale?sale=${maSale}`, {
        MaSale: maKM,
        TenSale: nameKM,
        MoTa: mota,
        DieuKien: dk,
        SoLuong: sl,
        NgayHetHan: date,
        SoTienGiam: sotiengiam,
      })
      .then((res) => alert("Sửa thành công"))
      .catch((err) => console.error(err));
  };
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
        <h1 className="userTitle">Chỉnh Sửa</h1>
        <Link to="/Admin/KhuyenMai/KhuyenMaiMoi">
          <button className="userAddButton">Thêm</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowBottom">
            <span className="userShowTitle">Thông tin khuyến mãi</span>
            <div className="userShowInfo">
              <span className="userShowInfoTitle">Mã Sale:</span>
              <span className="userShowInfoTitle">{sale.data.maSale}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{sale.data.ngayHetHan}</span>
            </div>
            <span className="userShowTitle">Chi tiết khuyến mãi</span>
            <div className="userShowInfo">
              <span className="userShowInfoTitle">Tên Sale:</span>
              <span className="userShowInfoTitle">{sale.data.tenSale}</span>
            </div>
            <div className="userShowInfo">
              <span className="userShowInfoTitle">Mô Tả:</span>
              <span className="userShowInfoTitle">{sale.data.moTa}</span>
            </div>
            <div className="userShowInfo">
              <span className="userShowInfoTitle">Số tiền giảm:</span>
              <span className="userShowInfoTitle">
                {sale.data.soTienGiam} VND
              </span>
            </div>
            <div className="userShowInfo">
              <span className="userShowInfoTitle">Điều Kiện:</span>
              <span className="userShowInfoTitle">
                {sale.data.dieuKien} VND
              </span>
            </div>
            <div className="userShowInfo">
              <span className="userShowInfoTitle">Số Lượng:</span>
              <span className="userShowInfoTitle">{sale.data.soLuong}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Chỉnh sửa</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Mã Sale</label>
                <span className="userShowInfoTitle">{sale.data.maSale}</span>
              </div>
              <div className="userUpdateItem">
                <label>Ngày Hết Hạn</label>
                <input
                  type="date"
                  placeholder="date"
                  className="userUpdateInput"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Tên Sale</label>
                <input
                  type="text"
                  placeholder={sale.data.tenSale}
                  className="userUpdateInput"
                  onChange={(e) => {
                    setNameKM(e.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Mô Tả</label>
                <input
                  type="text"
                  placeholder={sale.data.moTa}
                  className="userUpdateInput"
                  onChange={(e) => {
                    setMoTa(e.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Số tiền giảm</label>
                <input
                  type="number"
                  placeholder={sale.data.soTienGiam}
                  className="userUpdateInput"
                  onChange={(e) => {
                    setSoTienGiam(e.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Điều kiện giảm</label>
                <input
                  type="number"
                  placeholder={sale.data.dieuKien}
                  className="userUpdateInput"
                  onChange={(e) => {
                    setDK(e.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Số Lượng</label>
                <input
                  type="number"
                  placeholder={sale.data.soLuong}
                  className="userUpdateInput"
                  onChange={(e) => {
                    setSL(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <button
                className="userUpdateButton"
                onClick={() => {
                  editKM();
                }}
              >
                Cập Nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditKhuyenMai;
