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
const ListQuanLy = () => {
  const [news, SetNews] = useState([]);
  const [km, setKM] = useState([]);
  const [quyen, setQuyen] = useState([]);
  const [email, setEmail] = useState([]);
  useEffect(() => {
    const callApi = async () => {
      httpApi.get("/Admin/GetAllQuyen").then((res) => {
        SetNews(res.data.data);
      });
    };
    callApi();
  }, []);
  const edit = async (event) => {
    event.preventDefault();
    console.log(quyen);
    if (quyen !== "vuilong" && !quyen.length == 0) {
      await httpApi
        .get(`/Admin/UpdateQuyen?email=${km.userName}&quyen=${quyen}`)
        .then((res) => {
          alert("Sửa thành công");
          window.location.reload();
        })
        .catch((err) => console.error(err));
    } else {
      window.alert("Không được để trống !!!");
    }
  };
  return (
    <div>
      <div className="userTitleContainer">
        <h4>Danh sách Quản Lý Page</h4>
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Mã ID</TableCell>
                <TableCell>UserName</TableCell>
                <TableCell>Họ Tên</TableCell>
                <TableCell>Quyền</TableCell>
                <TableCell>Sửa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {news &&
                news.map((item, key) => {
                  return (
                    <tr>
                      <th align="left">{item.userId}</th>
                      <th align="left">{item.userName}</th>
                      <th align="left">{item.hoTen}</th>
                      <th align="left">{item.roleName}</th>
                      <th align="left">
                        <button
                          className="userListEdit"
                          onClick={() => {
                            setKM(item);
                          }}
                        >
                          Chỉnh Sửa
                        </button>

                        {/* <Link to={`/Admin/QuanLy/${item.userName}`}>
                          <button className="userListEdit">Chỉnh Sửa</button>
                        </Link> */}
                        {/* <DeleteOutlineIcon onClick={() => delLop(item)} /> */}
                      </th>
                    </tr>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowBottom">
            <hr></hr>
            <span className="userShowTitle">Chỉnh sửa chi tiết</span>
            <div className="userUpdateItem">
              <div className="userUpdateItem">
                <label>Tên User: {km.userName} </label>
              </div>
              <label>Quyền Hiện Tại: {km.roleName} </label>
              <select
                name="active"
                id="active"
                onChange={(e) => {
                  setQuyen(e.target.value);
                }}
                className="userUpdateInput"
              >
                <option value="vuilong">Vui lòng chọn</option>;
                <option value="Admin">Admin</option>;
                <option value="Student">Student</option>;
                <option value="Teacher">Teacher</option>;
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

export default ListQuanLy;
