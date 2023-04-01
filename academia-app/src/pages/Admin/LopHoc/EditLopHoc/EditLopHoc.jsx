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

const EditLopHoc = () => {
  const { maLop } = useParams();
  const [loading, setLoading] = useState(true);
  const [gv, setGv] = useState([]);
  const [news, SetNews] = useState([]);
  const [lop, setLop] = useState([]);
  const [ten, setTen] = useState();
  const [maGiaoVien, setMaGiaoVien] = useState();
  const [maMon, setMaMon] = useState();
  //Thêm mới

  useEffect(() => {
    const callApi = async () => {
      httpApi.get(`/Teams/GetLop?ma=${maLop}`).then((res) => {
        SetNews(res.data.data);
        setLoading(false);
      });
    };
    callApi();
  }, []);
  useEffect(() => {
    const callApi = async () => {
      httpApi.get("/Teams/AllTeamAsync").then((res) => {
        setGv(res.data.data);
      });
    };
    callApi();
  }, []);

  useEffect(() => {
    const callApi = async () => {
      httpApi.get("/Monhoc/GetMonhocAllAsync").then((res) => {
        setLop(res.data.data.result);
      });
    };
    callApi();
  }, []);
  const edit = async (e) => {
    await httpApi
      .put(`/Teams/UpdateLop?ma=${maLop}`, {
        TenLop: ten,
        MaMh: maMon,
        MaGv: maGiaoVien,
      })
      .then((res) => {
        alert("Sửa thành công");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Lớp Học</h1>
        <Link to="/Admin/LopHoc/New">
          <button className="userAddButton">Thêm Lớp</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">{news.tenLop}</span>
              <span className="userShowUserTitle">Mã Lớp: {news.maLop}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">chi tiết</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">
                Mã Giáo Viên: {news.maGv}
              </span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">Mã Môn Học: {news.maMh}</span>
            </div>
            <hr></hr>
            <span className="userShowTitle">Chỉnh sửa chi tiết</span>
            <div className="userUpdateItem">
              <div className="userUpdateItem">
                <label>Tên Lớp</label>
                <input
                  type="text"
                  placeholder="Nhập"
                  className="userUpdateInput"
                  onChange={(e) => {
                    setTen(e.target.value);
                  }}
                />
              </div>
              <label>Giáo viên: </label>
              <select
                name="active"
                id="active"
                onChange={(e) => {
                  setMaGiaoVien(e.target.value);
                }}
                className="userUpdateInput"
              >
                <option value="vuilong">Vui lòng chọn</option>;
                {gv &&
                  gv.map((item, key) => {
                    return (
                      <option value={item.maGv}>
                        {item.maGv} - {item.tenGv}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="userUpdateItem">
              <label>Môn Học: </label>
              <select
                name="active"
                id="active"
                onChange={(e) => {
                  setMaMon(e.target.value);
                }}
                className="userUpdateInput"
              >
                <option value="vuilong">Vui lòng chọn</option>;
                {lop &&
                  lop.map((item, key) => {
                    return (
                      <option value={item.maMH}>
                        {item.maMH} - {item.tenMH}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <button className="userUpdateButton" onClick={edit}>
            Cập Nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLopHoc;
