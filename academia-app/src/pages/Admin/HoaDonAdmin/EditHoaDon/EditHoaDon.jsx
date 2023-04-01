import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@mui/icons-material";
import {
  Paper,
  Table,
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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./EditHoaDon.css";
const EditHoaDon = () => {
  const { maDh } = useParams();
  const [news, SetNews] = useState([]);
  const [mon, setMon] = useState([]);
  const [mamon, setMaMon] = useState([]);
  const [xem, setXem] = useState();
  const [giaBan, setGiaBan] = useState();
  useEffect(() => {
    const callApi = async () => {
      httpApi.get(`/GioHang/getAllCTHoaDon?maDh=${maDh}`).then((res) => {
        SetNews(res.data.data);
      });
    };
    callApi();
  }, []);
  useEffect(() => {
    const callApi = async () => {
      httpApi.get("/Monhoc/GetMonhocAllAsync").then((res) => {
        setMon(res.data.data.result);
      });
    };
    callApi();
  }, []);
  const handleCreate = (event) => {
    event.preventDefault();
    httpApi.post("/GioHang/postCTHoaDon", {
      //Đặt cùng tên với API
      MaDh: maDh,
      MaMh: mamon,
      GiaBan: giaBan,
    });
    window.alert("Thành Công");
    window.location.reload();
  };
  const del = async (val) => {
    if (window.confirm("Bạn có muốn xóa: " + val.maMhNavigation.tenMH + "?")) {
      await httpApi
        .post(
          `/GioHang/deleteCTHoaDon?maDh=${maDh}&maMh=${val.maMhNavigation.maMH}`
        )
        .then((res) => {
          if (res.status === 200) {
            alert("Đã xóa  thành công!");
            window.location.reload();
          } else {
            window.alert("Thất bại!");
          }
        });
    } else {
      window.alert("Thất bại!");
    }
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Chỉnh Sửa</h1>
        <Link to="/Admin/HoaDon/New">
          <button className="userAddButton">Thêm</button>
        </Link>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Mã Đơn Hàng</TableCell>
                <TableCell>Tên Môn Học</TableCell>
                <TableCell>Hình Ảnh</TableCell>
                <TableCell>Giá Bán</TableCell>

                <TableCell>Xử Lí</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {news &&
                news?.map((item, key) => {
                  return (
                    <tr>
                      <th align="left">{item.maDh}</th>
                      <th align="left">{item.maMhNavigation.tenMH}</th>
                      <th align="left">
                        <img
                          src={`${process.env.REACT_APP_URL_HINH}/images/${item.maMhNavigation.hinhAnh}`}
                          className="userListImg"
                        />
                      </th>
                      <th align="left">{item.giaBan}</th>

                      <th align="left">
                        <DeleteOutlineIcon onClick={() => del(item)} />
                      </th>
                    </tr>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count="lenght"
          rowsPerPage={"rowsPerPage"}
          page={"page"}
          onPageChange={"handleChangePage"}
          onRowsPerPageChange={"handleChangeRowsPerPage"}
        />
      </Paper>
      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Chỉnh Sửa</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Nhập Giá Bán</label>
                <input
                  type="text"
                  placeholder="Vui lòng nhập"
                  className="userUpdateInput"
                  onChange={(e) => {
                    setGiaBan(e.target.value);
                  }}
                />
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
                  {mon &&
                    mon.map((item, key) => {
                      return (
                        <option value={item.maMH}>
                          {item.maMH} - {item.tenMH}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
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

export default EditHoaDon;
