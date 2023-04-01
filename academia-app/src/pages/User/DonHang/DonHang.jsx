import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { blueGrey, lightBlue } from "@mui/material/colors";
import React, { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import httpApi from "../../../api/domain/httpApi";
import { AuthContext } from "../../../context/AuthContext";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import CTDonHang from "./CTDonHang";

const DonHang = () => {
  const [search, setSearch] = useState();
  const [record, setRecord] = useState("");
  const [render, setRender] = useState(false);
  const { user: authUser } = useContext(AuthContext);
  const [chitiet, setChiTiet] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      httpApi.get(`/User/MonHocByUser?email=${authUser.email}`).then((res) => {
        setSearch(res.data.data.result.hoadon);
      });
    };
    fetch();
  }, []);

  return (
    <div className="bg">
      <Link to="/home">
        <i class="fa-solid fa-arrow-left"></i>
      </Link>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="product">
            <div className="productTitleContainer">
              <h3 className="productTitle">Lịch sử mua hàng</h3>
            </div>
            <div className="productTop">
              <div className="productTopRight">
                <Paper sx={{ width: "1000px", overflow: "hidden" }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Form>
                              <InputGroup className="my-3">
                                <Form.Control
                                  onChange={(e) => setRecord(e.target.value)}
                                  placeholder="Vui lòng nhập ngày mua"
                                />
                              </InputGroup>
                            </Form>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Ngày Mua</TableCell>
                          <TableCell>Tổng Tiền</TableCell>
                          <TableCell>Tình Trạng</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {search &&
                          search
                            .filter((item) => {
                              return record.toLowerCase() === ""
                                ? item
                                : item.ngayLap.toLowerCase().includes(record);
                            })
                            .map((item, index) => {
                              return (
                                <tr key={index}>
                                  <th align="left">{item.ngayLap}</th>
                                  <th align="left">{item.tongTien} Đ</th>
                                  <th align="left">{item.tinhTrang}</th>
                                  <th
                                    align="left"
                                    onClick={() => {
                                      setRender(!render);
                                      setChiTiet(item);
                                    }}
                                  >
                                    Xem chi tiết
                                  </th>
                                </tr>
                              );
                            })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </div>
            </div>
            {render && <CTDonHang key={chitiet.maDh} chitiet={chitiet} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonHang;
