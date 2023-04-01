import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import httpApi from "../../../../api/domain/httpApi";

const NewHoaDon = () => {
  const [news, SetNews] = useState([]);
  const [email, setEmail] = useState([]);
  const [tongTien, setTongTien] = useState([]);
  const [date, setDate] = useState([]);
  const [tinhTrang, setTinhTrang] = useState([]);
  const history = useNavigate();
  useEffect(() => {
    const callApi = async () => {
      httpApi.get("/Admin/AdminGetAllUser").then((res) => {
        SetNews(res.data.data.dsUser);
        console.log(res.data.data.dsUser);
      });
    };
    callApi();
  }, []);
  const handleCreate = (event) => {
    event.preventDefault();
    if (tongTien !== "" && tongTien !== undefined) {
      httpApi.post("/GioHang/PostHD", {
        //Đặt cùng tên với API
        Id: email,
        NgayLap: date,
        TongTien: tongTien,
        TinhTrang: tinhTrang,
      });
      window.alert("Thành Công");
      history("/Admin/HoaDon");
    } else {
      window.alert("Không được để trống !!!");
    }
  };
  return (
    <div className="user">
      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Thêm Mới Hóa Đơn</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Tài Khoản: </label>
                <select
                  name="active"
                  id="active"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                >
                  <option value="vuilong">Vui lòng chọn</option>;
                  {news &&
                    news.map((item, key) => {
                      return <option value={item.id}>{item.userName}</option>;
                    })}
                </select>
                <div className="userUpdateItem">
                  <label>Tiền</label>
                  <input
                    type="number"
                    placeholder="Nhập Tổng Tiền"
                    className="userUpdateInput"
                    onChange={(e) => {
                      setTongTien(e.target.value);
                    }}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Ngày Lập</label>
                  <input
                    type="date"
                    className="userUpdateInput"
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                  />
                </div>
                <label>Tình Trạng: </label>
                <select
                  name="active"
                  id="active"
                  onChange={(e) => {
                    setTinhTrang(e.target.value);
                  }}
                >
                  <option>Vui Lòng Chọn</option>;
                  <option value="Đã thanh toán">Đã Thanh Toán</option>;
                  <option value="Chua thanh toan">Chưa Thanh Toán</option>;
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

export default NewHoaDon;
