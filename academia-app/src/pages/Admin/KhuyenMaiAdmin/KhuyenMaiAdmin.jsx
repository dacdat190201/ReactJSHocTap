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
import httpApi from "../../../api/domain/httpApi";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const KhuyenMaiAdmin = () => {
  const [news, SetNews] = useState([]);
  const [km, setKM] = useState([]);
  useEffect(() => {
    const callApi = async () => {
      httpApi.get("/GioHang/GetAllMaSale").then((res) => {
        SetNews(res.data.data);
      });
    };
    callApi();
  }, []);
  const delkhuyenmai = async (val) => {
    if (window.confirm("Bạn có muốn mã: " + val.maSale + "?")) {
      setKM = await httpApi
        .post(`/GioHang/DeleteSale?sale=${val.maSale}`)
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
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Mã</TableCell>
                <TableCell>Tên Khuyến Mãi</TableCell>

                <TableCell>Số Lượng</TableCell>
                <TableCell>Ngày Hết Hạn</TableCell>

                <TableCell>Xử Lí</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {news &&
                news.sale?.map((item, key) => {
                  return (
                    <tr>
                      <th align="left">{item.maSale}</th>
                      <th align="left">{item.tenSale}</th>
                      <th align="left">{item.soLuong}</th>
                      <th align="left">{item.ngayHetHan}</th>
                      <th align="left">
                        <Link to={`/Admin/KhuyenMai/Edit/${item.maSale}`}>
                          <button className="userListEdit">Chỉnh sửa</button>
                        </Link>
                        <DeleteOutlineIcon onClick={() => delkhuyenmai(item)} />
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
    </div>
  );
};

export default KhuyenMaiAdmin;
