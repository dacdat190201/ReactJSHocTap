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
import DoneIcon from "@mui/icons-material/Done";
const ListHoaDon = () => {
  const [news, SetNews] = useState([]);
  useEffect(() => {
    const callApi = async () => {
      httpApi.get("/GioHang/getAllHoaDon").then((res) => {
        SetNews(res.data.data.data);
      });
    };
    callApi();
  }, []);
  const [news1, SetNews1] = useState([]);
  useEffect(() => {
    const callApi = async () => {
      httpApi.get("/GioHang/HoaDonHoNay").then((res) => {
        SetNews1(res.data.data.data);
      });
    };
    callApi();
  }, []);
  const edit = async (val) => {
    if (window.confirm("Bạn có muốn cập nhật đơn hàng: " + val.maDh + "?")) {
      await httpApi
        .put(`/GioHang/EditHoaDonTinhTrang?maDh=${val.maDh}`)
        .then((res) => {
          if (res.status === 200) {
            alert("Cập nhật thành công!");
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
    <div className="userList">
      <h4>Đơn Hàng Hôm Nay</h4>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Mã Đơn Hàng</TableCell>
                <TableCell>Tên Người Mua</TableCell>
                <TableCell>Ngày Lập</TableCell>
                <TableCell>Tổng Tiền</TableCell>
                <TableCell>Tình Trạng</TableCell>
                <TableCell>Xử Lí</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {news1 &&
                news1?.map((item, key) => {
                  return (
                    <tr>
                      <th align="left">{item.maDh}</th>
                      <th align="left">{item.idNavigation.hoTen}</th>
                      <th align="left">{item.ngayLap}</th>
                      <th align="left">{item.tongTien}</th>
                      <th align="left">{item.tinhTrang}</th>
                      <th align="left">
                        <Link to={`/Admin/HoaDon/Edit/${item.maDh}`}>
                          <button className="userListEdit">Xem</button>
                        </Link>
                        <DeleteOutlineIcon />
                        {item.tinhTrang === "Đang Duyệt" ? (
                          <DoneIcon onClick={() => edit(item)} />
                        ) : null}
                      </th>
                    </tr>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <hr></hr>
      <h4>Toàn Bộ Đơn Hàng</h4>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Mã Đơn Hàng</TableCell>
                <TableCell>Tên Người Mua</TableCell>
                <TableCell>Ngày Lập</TableCell>
                <TableCell>Tổng Tiền</TableCell>
                <TableCell>Tình Trạng</TableCell>
                <TableCell>Xử Lí</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {news &&
                news?.map((item, key) => {
                  return (
                    <tr>
                      <th align="left">{item.maDh}</th>
                      <th align="left">{item.idNavigation.hoTen}</th>
                      <th align="left">{item.ngayLap}</th>
                      <th align="left">{item.tongTien}</th>
                      <th align="left">{item.tinhTrang}</th>
                      <th align="left">
                        <Link to={`/Admin/HoaDon/Edit/${item.maDh}`}>
                          <button className="userListEdit">Xem</button>
                        </Link>

                        <DeleteOutlineIcon />
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

export default ListHoaDon;
