import React, { useState, useEffect } from "react";
import { Form, Button, Col, Container, Row, Spinner } from "react-bootstrap";

import { Link } from "react-router-dom";
import httpApi from "../../../../api/domain/httpApi";

const TeamDethi = () => {
  const [loading, setLoading] = useState(true);

  const [lstMonHoc, setLstMonHoc] = useState([]);
  const [lstDeThi, setLstDeThi] = useState([]);

  const [monHoc, setMonHoc] = useState();
  const [chuong, setChuong] = useState();

  const [maMH, setMaMH] = useState();
  const [maChuong, setMaChuong] = useState();
  const [maBH, setMaBH] = useState();
  const [maDe, setMaDe] = useState();

  const inputTenDT = document.getElementById("txtTenDT");
  const inputThoiGian = document.getElementById("txtThoiGian");
  const inputSoLuong = document.getElementById("txtSoLuong");

  const [tenDeThi, setTenDeThi] = useState();
  const [thoiGian, setThoiGian] = useState();
  const [soLuong, setSoLuong] = useState();

  const [showCbbBaiHoc, setShowCbbBaiHoc] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fectLstMonHoc = async () => {
      await httpApi.get(`/MonHoc/GetMonhocAllAsync`).then((res) => {
        setLstMonHoc(res.data.data.result);
        setLoading(false);
      });
    };

    fectLstMonHoc();
  }, []);

  const fetchMonHoc = async (maMH) => {
    await httpApi.get(`/MonHoc/MonhocDetails?MaMh=${maMH}`).then((res) => {
      setMonHoc(res.data.data.dsNoiDung);
    });
  };

  const fetchChuong = async (MaCH) => {
    await httpApi.get(`/Chuong/GetViewChuong?MaChuong=${MaCH}`).then((res) => {
      setChuong(res.data.data);
      setMaBH(res.data.data.baihoc[0].maBH);
    });
  };

  const loadComboboxMonHoc = (MaMH) => {
    if (maMH != null) fetchMonHoc(MaMH);
  };

  const loadCbbBaiHoc = (MaCH) => {
    fetchChuong(MaCH);
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  const layTatCaDeThi = async () => {
    await httpApi({
      method: "get",
      url: `/DeThi/GetAllDeThi`,
    })
      .then((res) => {
        setMaDe(res.data.data.data[res.data.data.total - 1].maDe);
      })
      .catch((err) => console.error(err));
    setShow(true);
  };
  const postDeThi = async () => {
    var kiemTra = {
      MaBh: "",
      MaMh: "",
      TenDeThi: tenDeThi,
      Thoigian: thoiGian,
      Soluong: soLuong,
    };
    if (showCbbBaiHoc) {
      kiemTra.MaBh = maBH;
    } else {
      kiemTra.MaMh = maMH;
    }

    await httpApi({
      method: "post",
      url: `/DeThi/PostDeThi`,
      data: kiemTra,
    })
      .then((res) => {
        alert("Thêm thành công!");
        layTatCaDeThi();
      })
      .catch((err) => console.error(err));
    setShow(true);
  };

  const onClickThem = () => {
    if (maBH == null && maMH == null) alert("Vui lòng chọn loại đề kiểm tra!");
    else {
      window.alert(
        maBH + ";" + maMH + ";" + tenDeThi + " ; " + thoiGian + " ; " + soLuong
      );
      postDeThi();

      //<Link to={'/nganhang'}></Link>
    }
  };

  return (
    <div className="bg">
      <Container>
        <h2>Tạo Mới Đề Thi</h2>
        <br />
        <div>
          <div className="content">
            <Row>
              <Col>
                <h4>
                  <b> &emsp;Chọn: </b>
                </h4>
              </Col>

              <Col>
                <div class="input-group input-group-sm mb-3">
                  <div class="">
                    <input
                      class="btn-radio"
                      type="radio"
                      name="cbbLoaiDe"
                      value="Đề Thi"
                      onChange={(e) => setShowCbbBaiHoc(false)}
                    />
                  </div>
                  <p>Đề Thi</p>
                </div>
              </Col>

              <Col>
                <div class="input-group input-group-sm mb-3">
                  <div class="">
                    <input
                      class="btn-radio"
                      type="radio"
                      name="cbbLoaiDe"
                      value="Đề Ôn Tập"
                      onChange={(e) => setShowCbbBaiHoc(true)}
                    />
                  </div>
                  <p>Đề Ôn Tập</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <br />

        <Container fluid>
          <div>
            <Row style={{ width: 550 }}>
              <Col>
                <h4>Danh sách môn học:</h4>
              </Col>
              <br />
              <Col>
                <Form.Select
                  size="lg"
                  onChange={(e) => {
                    loadComboboxMonHoc(e.target.value);
                    setMaMH(e.target.value);
                  }}
                >
                  {lstMonHoc &&
                    lstMonHoc.map((v, i) => {
                      return <option value={v.maMH}>{v.tenMH}</option>;
                    })}
                </Form.Select>
              </Col>
            </Row>
          </div>
          <br />
          <div>
            {showCbbBaiHoc ? (
              <div>
                <h4>Danh sách chương:</h4>
                <br />
                <Form.Select
                  size="lg"
                  name="cbb_Chuong"
                  onChange={(e) => {
                    setMaChuong(e.target.value);
                    loadCbbBaiHoc(e.target.value);
                  }}
                >
                  <option>
                    <p>Vui Lòng Chọn</p>
                  </option>
                  {monHoc &&
                    monHoc.chuong.map((v, i) => {
                      return (
                        <option value={v.maChuong}>
                          <p>{v.tenChuong}</p>
                        </option>
                      );
                    })}
                </Form.Select>
                <h4>Bài học</h4>
                <br />
                <Form.Select
                  size="lg"
                  name="cbb_BaiHoc"
                  onChange={(e) => {
                    setMaBH(e.target.value);
                  }}
                >
                  <option>
                    <p>Vui Lòng Chọn</p>
                  </option>
                  {chuong &&
                    chuong.baihoc.map((v, i) => {
                      return <option value={v.maBh}>{v.tenBh}</option>;
                    })}
                </Form.Select>
              </div>
            ) : null}
          </div>

          <div>
            <form>
              <div>
                <br />
                <Row style={{ width: `100%` }}>
                  <Col
                    md={{ span: 2 }}
                    style={{ padding: "8px", marginLeft: 100 }}
                  >
                    <p>Tên đề thi: </p>
                  </Col>
                  <Col md={{ span: 8 }} style={{ padding: "8px" }}>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên đề thi"
                      id="txtTenDT"
                      name="txtTenDT"
                      onChange={(e) => {
                        setTenDeThi(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <br />
                <Row style={{ width: `100%` }}>
                  <Col
                    md={{ span: 2 }}
                    style={{ padding: "8px", marginLeft: 100 }}
                  >
                    <p>Thời gian: </p>
                  </Col>
                  <Col md={{ span: 3 }} style={{ padding: "8px" }}>
                    <Form.Control
                      type="text"
                      placeholder="Nhập thời gian"
                      id="txtThoiGian"
                      name="txtThoiGian"
                      onChange={(e) => {
                        setThoiGian(e.target.value);
                      }}
                    />
                  </Col>

                  <Col>
                    <Row style={{ width: `100%` }}>
                      <Col
                        md={{ span: 4 }}
                        style={{ padding: "8px", marginLeft: 25 }}
                      >
                        Số lượng câu hỏi:{" "}
                      </Col>
                      <Col md={{ span: 6 }} style={{ padding: "8px" }}>
                        <Form.Control
                          type="text"
                          placeholder="Nhập số lượng"
                          id="txtSoLuong"
                          name="txtSoLuong"
                          onChange={(e) => {
                            setSoLuong(e.target.value);
                          }}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col></Col>
                  <Col>
                    {show ? (
                      <Button variant="info">
                        <Link to={`/Giaovien/ThemCauHoi/${maDe}`}>
                          Thêm Câu Hỏi
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        onClick={(e) => {
                          onClickThem();
                        }}
                      >
                        Thêm
                      </Button>
                    )}
                  </Col>
                  <Col></Col>
                </Row>
              </div>
              <br />
            </form>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default TeamDethi;
