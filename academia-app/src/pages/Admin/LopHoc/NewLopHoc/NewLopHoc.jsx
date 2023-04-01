import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import httpApi from "../../../../api/domain/httpApi";

const NewLopHoc = () => {
  const [gv, setGv] = useState([]);
  const [news, SetNews] = useState([]);
  const [lop, setLop] = useState([]);

  //Thêm mới
  const [ten2, setTen2] = useState();
  const [maGiaoVien2, setMaGiaoVien2] = useState();
  const [maMon2, setMaMon2] = useState();
  const history = useNavigate();

  useEffect(() => {
    const callApi = async () => {
      httpApi.get("/Teams/AllTeamAsync").then((res) => {
        setGv(res.data.data);
        console.log(res.data.data);
      });
    };
    callApi();
  }, []);

  useEffect(() => {
    const callApi = async () => {
      httpApi.get("/Monhoc/GetMonhocAllAsync").then((res) => {
        setLop(res.data.data.result);
        console.log(news);
      });
    };
    callApi();
  }, []);

  const handleCreate = (event) => {
    event.preventDefault();
    if (ten2 !== "" && ten2 !== undefined) {
      httpApi.post("/Teams/PostLop", {
        //Đặt cùng tên với API
        TenLop: ten2,
        MaMh: maMon2,
        MaGv: maGiaoVien2,
      });
      window.alert("Thành Công");
      history("/Admin/LopHoc");
    } else {
      window.alert("Không được để trống !!!");
    }
  };
  return (
    <div className="user">
      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Thêm Mới Lớp</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Tên Lớp</label>
                <input
                  type="text"
                  placeholder="Nhập Tên Lớp"
                  className="userUpdateInput"
                  onChange={(e) => {
                    setTen2(e.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Giáo viên: </label>
                <select
                  name="active"
                  id="active"
                  onChange={(e) => {
                    setMaGiaoVien2(e.target.value);
                  }}
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
                    setMaMon2(e.target.value);
                  }}
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
              <button className="userUpdateButton" onClick={handleCreate}>
                Thêm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewLopHoc;
