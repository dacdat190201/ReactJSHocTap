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
import httpApi from "../../../api/domain/httpApi";

function ThongKe() {
  const [revanue, setRevanue] = useState(0);

  const [lstChuDe, setLstChuDe] = useState([]);
  const [lstData, setLstData] = useState([]);

  const [quy, setQuy] = useState(1);
  const [nam, setNam] = useState(2023);

  const [show, setShow] = useState(1);

  const lstCbbNam = ["2023", "2022", "2021", "2020", "2019"];
  const lstCbbThang = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  useEffect(() => {
    if (show === 1) {
      layThongKeAll();
      layDsChuDe();
    } else if (show === 2) {
      layThongKeThang(1);
    } else if (show === 3) {
      layThongKeQuy(1, 2023);
    }
  }, [show]);

  const layThongKeTheoChuDe = async (maChuDe) => {
    await httpApi({
      method: "get",
      url: `/ThongKe/GetThongKeByChuDe?maChuDe=${maChuDe}`,
    }).then((res) => {
      setLstData(res.data.data);
    });
  };
  const layDsChuDe = async () => {
    await httpApi({
      method: "get",
      url: "/Monhoc/GetAllChuDe",
    })
      .then((res) => setLstChuDe(res.data.data.data))
      .catch((err) => console.log(err));
  };
  const layThongKeAll = async () => {
    await httpApi({
      method: "get",
      url: `/ThongKe/GetThongKeAll`,
    }).then((res) => {
      setLstData(res.data.data);
    });
  };
  const layThongKeThang = async (thang) => {
    await httpApi({
      method: "get",
      url: `/ThongKe/GetThongKeThang?thang=${thang}&nam=2023`,
    }).then((res) => {
      setLstData(res.data.data);
    });
  };
  const layThongKeQuy = async (quy, nam) => {
    await httpApi({
      method: "get",
      url: `/ThongKe/GetThongKeQuy?quy=${quy}&nam=${nam}`,
    }).then((res) => {
      console.log(res.data.data);
      setLstData(res.data.data);
    });
  };
  const loadComboboxChuDe = (maChuDe) => {
    layThongKeTheoChuDe(maChuDe);
  };
  const loadComboboxThang = (thang) => {
    console.log(thang);
    layThongKeThang(thang);
  };
  const loadComboboxNam = (quy2, nam2) => {
    console.log(nam);
    console.log(quy);
    layThongKeQuy(quy2, nam2);
  };
  return (
    <div className="bg">
      <h1>Thống Kê</h1>
      <Container fluid>
        <div>
          <br />

          <Row style={{ width: "100%" }}>
            <Col span="2">
              <h4>Chọn loại:</h4>
            </Col>
            <br />
            <Col span="2">
              <div class="input-group input-group-sm mb-3">
                <div class="">
                  <input
                    class="btn-radio"
                    type="radio"
                    name="rdLoai"
                    value="Tất cả"
                    onChange={(e) => {
                      setShow(1);
                    }}
                  />
                </div>
                <p>Tất cả</p>
              </div>
            </Col>
            <Col span="2">
              <div class="input-group input-group-sm mb-3">
                <div class="">
                  <input
                    class="btn-radio"
                    type="radio"
                    name="rdLoai"
                    value="Tháng"
                    onChange={(e) => {
                      setShow(2);
                    }}
                  />
                </div>
                <p>Tháng</p>
              </div>
            </Col>
            <Col span="2">
              <div class="input-group input-group-sm mb-3">
                <div class="">
                  <input
                    class="btn-radio"
                    type="radio"
                    name="rdLoai"
                    value="Quý"
                    onChange={(e) => {
                      setShow(3);
                    }}
                  />
                </div>
                <p>Quý</p>
              </div>
            </Col>
          </Row>
          <Row style={{ width: "100%" }}>
            <Col xs="3">
              <h4>Thống kê theo: </h4>
            </Col>
            <Col xs="2">
              <div>
                {show === 1 ? (
                  <div>
                    <Form.Select
                      size="lg"
                      onChange={(e) => {
                        loadComboboxChuDe(e.target.value);
                      }}
                    >
                      {lstChuDe &&
                        lstChuDe.map((v, i) => {
                          return (
                            <option value={v.maChuDe}>{v.tenChuDe}</option>
                          );
                        })}
                    </Form.Select>
                  </div>
                ) : show === 2 ? (
                  <div>
                    <Form.Select
                      size="lg"
                      onChange={(e) => {
                        loadComboboxThang(e.target.value);
                      }}
                    >
                      {lstCbbThang &&
                        lstCbbThang.map((v, i) => {
                          return <option value={i + 1}>{v}</option>;
                        })}
                    </Form.Select>
                  </div>
                ) : (
                  <div>
                    <Form.Select
                      size="lg"
                      onChange={(e) => {
                        setNam(e.target.value);
                        loadComboboxNam(quy, e.target.value);
                      }}
                    >
                      {lstCbbNam &&
                        lstCbbNam.map((v, i) => {
                          return <option value={v}>{v}</option>;
                        })}
                    </Form.Select>
                  </div>
                )}
              </div>
            </Col>
            <Col xs="1"></Col>
            <Col>
              <div>
                {show == 3 ? (
                  <div>
                    <Col span="2">
                      <div class="input-group input-group-sm">
                        <div class="">
                          <input
                            class="btn-radio"
                            type="radio"
                            name="rdLoai"
                            value="Quý 1"
                            onChange={(e) => {
                              setQuy(1);
                              loadComboboxNam(1, nam);
                            }}
                          />
                        </div>
                        <p>Quý 1</p>
                      </div>
                    </Col>
                    <Col span="2">
                      <div class="input-group input-group-sm">
                        <div class="">
                          <input
                            class="btn-radio"
                            type="radio"
                            name="rdLoai"
                            value="Quý 2"
                            onChange={(e) => {
                              setQuy(2);
                              loadComboboxNam(2, nam);
                            }}
                          />
                        </div>
                        <p>Quý 2</p>
                      </div>
                    </Col>
                    <Col span="2">
                      <div class="input-group input-group-sm">
                        <div class="">
                          <input
                            class="btn-radio"
                            type="radio"
                            name="rdLoai"
                            value="Quý 3"
                            onChange={(e) => {
                              setQuy(3);
                              loadComboboxNam(3, nam);
                            }}
                          />
                        </div>
                        <p>Quý 3</p>
                      </div>
                    </Col>
                    <Col span="2">
                      <div class="input-group input-group-sm">
                        <div class="">
                          <input
                            class="btn-radio"
                            type="radio"
                            name="rdLoai"
                            value="Quý 4"
                            onChange={(e) => {
                              setQuy(4);
                              loadComboboxNam(4, nam);
                            }}
                          />
                        </div>
                        <p>Quý 4</p>
                      </div>
                    </Col>
                  </div>
                ) : null}
              </div>
            </Col>
          </Row>
          <br />
          <br />
        </div>
        <br />

        <h3>
          <span>Bảng Thống kê</span>
        </h3>
        <br />
        <Table striped bordered hover style={{ with: "80%" }}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã đơn hàng</th>
              <th>Họ tên</th>
              <th>Ngày lập</th>
              <th>Tình Trạng</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {lstData &&
              lstData.map((v, i) => {
                return (
                  <tr>
                    <th>{i + 1}</th>
                    <th>{v.maDh}</th>
                    <th>{v.hoTen}</th>
                    <th>{v.ngayLap}</th>
                    <th>{v.tinhTrang}</th>
                    <th>{v.tongTien} ₫</th>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default ThongKe;
