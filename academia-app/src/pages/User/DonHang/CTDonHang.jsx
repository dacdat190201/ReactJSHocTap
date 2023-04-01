import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { Table } from "react-bootstrap";

const CTDonHang = ({ chitiet, key }) => {
  return (
    <div className="productBottom">
      <TableContainer sx={{ maxHeight: 1000, width: "1000px" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Tên Môn Học</TableCell>
              <TableCell>Hình Ảnh</TableCell>
              <TableCell>Đơn giá</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chitiet &&
              chitiet.cthoadon.map((item, key) => {
                return (
                  <tr>
                    <th>{item.maMhNavigation.tenMH}</th>
                    <th>
                      {" "}
                      <img
                        src={`${process.env.REACT_APP_URL_HINH}/Images/${item.maMhNavigation.hinhAnh}`}
                        className="userListImg"
                        alt=""
                      />
                    </th>
                    <th>{item.maMhNavigation.giaBan}</th>
                  </tr>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CTDonHang;
