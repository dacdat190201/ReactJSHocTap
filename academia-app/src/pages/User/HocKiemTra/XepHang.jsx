import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Button,
  Col,
  Container,
  Row,
  Spinner,
  Toast,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import httpApi from "../../../api/domain/httpApi";
import { AuthContext } from "../../../context/AuthContext";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
function XepHang() {
  const [lstXH, setLstXH] = useState([]);
  const [lstXHU, setLstXHU] = useState([]);
  const [lstMH, setLstMH] = useState([]);
  const [lstDe, setLstDe] = useState([]);
  const [lstChuong, setLstChuong] = useState([]);
  const { user: authUser } = useContext(AuthContext);
  useEffect(() => {
    layDsMonHoc();
    layBangXepHang(1);
    layBangXepHangUser(1, authUser.email);
  }, []);

  const layDsMonHoc = async () => {
    await httpApi({
      method: "get",
      url: "/Monhoc/GetMonhocAllAsync",
    })
      .then((res) => {
        setLstMH(res.data.data.result);
      })
      .catch((err) => console.error(err));
  };
  const layDsChuongByMaMH = async (MaMH) => {
    await httpApi.get(`/Chuong/GetAllChuong?MaMH=${MaMH}`).then((res) => {
      setLstChuong(res.data.data);
    });
  };
  const layDSDeThi = async (MaMH) => {
    await httpApi({
      method: "get",
      url: `/DeThi/GetAllDeThiByMaMH?maMH=${MaMH}`,
    })
      .then((res) => {
        setLstDe(res.data.data.result);
      })
      .catch((err) => console.log(err));
  };
  const layBangXepHangUser = async (MaMH) => {
    await httpApi({
      method: "get",
      url: `/KiemTra/GetXepHangUser?maMH=${MaMH}&email=${authUser.email}`,
    })
      .then((res) => {
        if (res.data.data.length !== "0") {
          setLstXHU(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  };
  const layBangXepHang = async (MaMH) => {
    await httpApi({
      method: "get",
      url: `/KiemTra/getXepHang?maMH=${MaMH}`,
    })
      .then((res) => {
        setLstXH(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const layBangXHByMa = async (MaDe, loai) => {
    await httpApi({
      method: "get",
      url: `/KiemTra/getXepHangByMa?Ma=${MaDe}&loai=${loai}`,
    })
      .then((res) => {
        setLstXH(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const layBangXHByMaCh = async (MaCh) => {
    await httpApi({
      method: "get",
      url: `/KiemTra/GetXepHangByMaChuong?MaCh=${MaCh}`,
    })
      .then((res) => {
        setLstXH(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const loadComboboxMonHoc = (MaMH) => {
    if (MaMH != null) {
      layBangXepHang(MaMH);
      layBangXepHangUser(MaMH);
    }
  };
  const loadCbbDeThi = (MaDe) => {
    if (MaDe != null) {
      layBangXHByMa(MaDe, 1);
      //layBangXepHangUser(MaMH);
    }
  };
  const loadCbbChuong = (MaCh) => {
    if (MaCh != null) {
      layBangXHByMa(MaCh, 2);
      //layBangXepHangUser(MaMH);
    }
  };

  return (
    <div
      classname="bg"
      style={{
        backgroundColor: "white",
        marginLeft: "30px",
        marginRight: "30px",
      }}
    >
      <Link to="/home">
        <i class="fa-solid fa-arrow-left"></i>
      </Link>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <Container>
            <h1>Bảng xếp hạng</h1>
            <div>
              <br />
              <Row style={{ width: "100%" }}>
                <Col xs="3">
                  <h4>Danh sách môn học:</h4>
                </Col>
                <br />
                <Col xs="3">
                  <Form.Select
                    size="lg"
                    onChange={(e) => {
                      loadComboboxMonHoc(e.target.value);
                      layDSDeThi(e.target.value);
                      layDsChuongByMaMH(e.target.value);
                    }}
                  >
                    {lstMH &&
                      lstMH.map((v, i) => {
                        return <option value={v.maMH}>{v.tenMH}</option>;
                      })}
                  </Form.Select>
                </Col>
                <Col xs="2">
                  <h4 style={{ textAlign: "right" }}>Đề:</h4>
                </Col>
                <Col xs="4">
                  <Form.Select
                    size="lg"
                    onChange={(e) => {
                      loadCbbDeThi(e.target.value);
                    }}
                  >
                    <option>Vui lòng chọn</option>
                    {lstDe &&
                      lstDe.map((v, i) => {
                        return <option value={v.maDe}>{v.tenDeThi}</option>;
                      })}
                  </Form.Select>
                </Col>
              </Row>
              <br />
              <Row style={{ width: "100%" }}>
                <Col xs="3">
                  <h4>Danh Sách Chương</h4>
                </Col>
                <Col>
                  <Form.Select
                    size="lg"
                    name="cbb_Chuong"
                    onChange={(e) => {
                      loadCbbChuong(e.target.value);
                    }}
                  >
                    <option value="vuilong">Vui Lòng Chọn</option>;
                    {lstChuong &&
                      lstChuong.map((v, key) => {
                        return (
                          <option value={v.maChuong}>{v.tenChuong}</option>
                        );
                      })}
                  </Form.Select>
                </Col>
              </Row>
              <br />
              <br />
            </div>
            <Table>
              <thead>
                <tr>
                  <th>Họ tên</th>
                  <th>Hình ảnh</th>
                  <th>Điểm</th>
                  <th>Thời gian</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>{lstXHU[0]?.hoTen}</th>
                  <th>
                    <img
                      src={`${process.env.REACT_APP_URL_HINH}/Images/${lstXHU[0]?.imagesUser}`}
                      className="userListImg"
                    />
                  </th>
                  <th>{lstXHU[0]?.diem}</th>
                  <th>{lstXHU[0]?.thoiGian}</th>
                </tr>
              </tbody>
            </Table>
            <hr></hr>
            <h5>Bảng xếp hạng</h5>
            <Table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Họ tên</th>
                  <th>Hình ảnh</th>
                  <th>Điểm</th>
                  <th>Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {lstXH &&
                  lstXH.map((v, i) => {
                    return (
                      <tr>
                        <th>{i + 1}</th>
                        <th>{v.hoTen}</th>
                        <th>
                          <img
                            src={`${process.env.REACT_APP_URL_HINH}/Images/${v.imagesUser}`}
                            className="userListImg"
                          />
                        </th>
                        <th>{v.diem}</th>
                        <th>{v.thoiGian}</th>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default XepHang;
