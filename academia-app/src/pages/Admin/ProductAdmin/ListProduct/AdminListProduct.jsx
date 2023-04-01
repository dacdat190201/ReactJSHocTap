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
import httpApi from "../../../../api/domain/httpApi";
import "./AdminListProduct.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const AdminListProduct = () => {
  const [news, SetNews] = useState([]);
  const [km, setKM] = useState([]);
  useEffect(() => {
    const callApi = async () => {
      httpApi.get("/Monhoc/GetMonhocAllAsync").then((res) => {
        SetNews(res.data.data.result);
      });
    };
    callApi();
  }, []);
  const delmonhoc = async (val) => {
    if (window.confirm("Bạn có muốn môn: " + val.tenMH + "?")) {
      setKM = await httpApi
        .delete(`/MonHoc/DelMonhoc?maMH=${val.maMH}`)
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
    <div className="userList">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Mã Môn Học</TableCell>
                <TableCell>Tên Môn Học</TableCell>
                <TableCell>Hình Ảnh</TableCell>
                <TableCell>Xử Lí</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {news &&
                news.map((item, key) => {
                  return (
                    <tr>
                      <th align="left">{item.maMH}</th>
                      <th align="left">{item.tenMH}</th>
                      <th align="left">
                        <img
                          src={`${process.env.REACT_APP_URL_HINH}/Images/${item.hinhAnh}`}
                          className="userListImg"
                          alt=""
                        />
                      </th>
                      <th align="left">
                        <Link to={`/Admin/ListProduct/Product/${item.maMH}`}>
                          <button className="userListEdit">Chỉnh sửa</button>
                        </Link>
                        <DeleteOutlineIcon onClick={() => delmonhoc(item)} />
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

export default AdminListProduct;
