import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ListUser.css";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Table } from "react-bootstrap";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import httpApi from "../../../../api/domain/httpApi";
const ListUser = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchDetail = async () => {
      httpApi.get("/Admin/AdminGetAllUser").then((res) => {
        setUser(res.data.data.dsUser);
      });
    };
    fetchDetail();
  }, []);
  const delMonHoc = async (val) => {
    if (window.confirm("Bạn có muốn xóa tài khoản: " + val.hoTen + "?")) {
      await httpApi.post(`/Admin/DelAdminUser?id=${val.id}`).then((res) => {
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
    window.location.reload();
  };
  return (
    <div className="userList">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Mã Người Dùng</TableCell>
                <TableCell>Tên Người Dùng</TableCell>
                <TableCell>Hình Ảnh</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số Điện Thoại</TableCell>
                <TableCell>Xử Lí</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user &&
                user.map((item, key) => {
                  return (
                    <tr>
                      <th align="left" key={key}>
                        {item.maSinhVien}
                      </th>
                      <th align="left">{item.hoTen}</th>
                      <th align="left">
                        <img
                          src={`${process.env.REACT_APP_URL_HINH}/Images/${item.imagesUser}`}
                          className="userListImg"
                        />
                      </th>
                      <th align="left">{item.email}</th>
                      <th align="left">{item.phoneNumber}</th>
                      <th align="left">
                        <Link to={`/Admin/ListUser/User/${item.maSinhVien}`}>
                          <button className="userListEdit">Chỉnh sửa</button>
                        </Link>
                        <DeleteOutlineIcon onClick={() => delMonHoc(item)} />
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

export default ListUser;
