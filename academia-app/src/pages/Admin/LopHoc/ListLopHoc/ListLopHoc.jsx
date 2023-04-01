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
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import httpApi from "../../../../api/domain/httpApi";
const ListLopHoc = () => {
  const [news, SetNews] = useState([]);
  const [km, setKM] = useState([]);
  useEffect(() => {
    const callApi = async () => {
      httpApi.get("/Teams/GetAllLopHoc").then((res) => {
        SetNews(res.data.data);
      });
    };
    callApi();
  }, []);
  const [gv, setGv] = useState([]);
  useEffect(() => {
    const callApi = async () => {
      httpApi.get("/Teams/AllTeamAsync").then((res) => {
        setGv(res.data.data);
      });
    };
    callApi();
  }, []);
  const delgv = async (val) => {
    if (window.confirm("Bạn có muốn xóa: " + val.tenGv + "?")) {
      await httpApi.delete(`/Teams/DelGv?ma=${val.maGv}`).then((res) => {
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
  const delLop = async (val) => {
    if (window.confirm("Bạn có muốn xóa: " + val.tenLop + "?")) {
      await httpApi.delete(`/Teams/DelLop?ma=${val.maLop}`).then((res) => {
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
    <div>
      <div className="userTitleContainer">
        <h4>Danh sách Lớp đang có</h4>
        <Link to="/Admin/LopHoc/New">
          <button className="userAddButton">Thêm Lớp Học</button>
        </Link>
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Mã Lớp Học</TableCell>
                <TableCell>Tên Lớp Học</TableCell>

                <TableCell>Mã Môn Học</TableCell>
                <TableCell>Mã Giáo Viên</TableCell>

                <TableCell>Xử Lí</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {news &&
                news.map((item, key) => {
                  return (
                    <tr>
                      <th align="left">{item.maLop}</th>
                      <th align="left">{item.tenLop}</th>
                      <th align="left">{item.maMh}</th>
                      <th align="left">{item.maGv}</th>
                      <th align="left">
                        <Link to={`/Admin/LopHoc/${item.maLop}`}>
                          <button className="userListEdit">Chỉnh Sửa</button>
                        </Link>
                        <DeleteOutlineIcon onClick={() => delLop(item)} />
                      </th>
                    </tr>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <hr></hr>
      <h4>Danh sách Giáo Viên</h4>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Mã Giáo Viên</TableCell>
                <TableCell>Tên Giáo Viên</TableCell>

                <TableCell>Hình Ảnh</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Địa Chỉ</TableCell>
                <TableCell>Xử Lí</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gv &&
                gv.map((item, key) => {
                  return (
                    <tr>
                      <th align="left">{item.maGv}</th>
                      <th align="left">{item.tenGv}</th>
                      <th align="left">
                        <img
                          src={`${process.env.REACT_APP_URL_HINH}/giaovien/${item.hinhAnhGv}`}
                          className="userListImg"
                          alt=""
                        />
                      </th>
                      <th align="left">{item.email}</th>
                      <th align="left">{item.diachi}</th>
                      <th align="left">
                        <Link to={`/Admin/GiaoVien/${item.maGv}`}>
                          <button className="userListEdit">Xem</button>
                        </Link>
                        <DeleteOutlineIcon onClick={() => delgv(item)} />
                      </th>
                    </tr>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default ListLopHoc;
