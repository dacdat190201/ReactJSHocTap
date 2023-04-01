import React, { useEffect, useState } from "react";

import {
  Form,
  Spinner,
  Button,
  Table,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { style } from "@mui/system";
import { Margin, Padding } from "@mui/icons-material";
import { render } from "@testing-library/react";
import { Link, useParams } from "react-router-dom";
import httpApi from "../../../../api/domain/httpApi";
const TeamCauHoi = () => {
  const [cauHoi, setCauHoi] = useState();
  const [soLuong, setSoLuong] = useState(2);
  var [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const { maDe } = useParams();

  const [tenCH, setTenCH] = useState();
  const [giaiThich, setGiaiThich] = useState();
  const [dapAn, setDapAn] = useState();
  const [loaiCH, setLoaiCH] = useState();

  const [cauA, setCauA] = useState();
  const [cauB, setCauB] = useState();
  const [cauC, setCauC] = useState();
  const [cauD, setCauD] = useState();

  const [show, setShow] = useState(false);

  let [txtTenCH, setTxtTenCH] = useState();
  let [txtDapAn, setTxtDapAn] = useState();
  let [txtLoai, setTxtLoai] = useState();
  let [txtCauA, setTxtCauA] = useState();
  let [txtCauB, setTxtCauB] = useState();
  let [txtCauC, setTxtCauC] = useState();
  let [txtCauD, setTxtCauD] = useState();
  let [txtGiaiThich, setTxtGiaiThich] = useState();

  var [lstCauHoi, setLstCauHoi] = useState([]);
  // {
  //   TenCauHoi : '',
  //   DapAn : '',
  //   GiaiThich: '',
  //   LoaiCauHoi: '',
  //   CauA: '',
  //   CauB: '',
  //   CauC: '',
  //   CauD: ''
  // }

  useEffect(() => {
    layDeThi();
  }, []);
  const layDeThi = async () => {
    await httpApi({
      method: "get",
      url: "/DeThi/GetDeThiByMaDe?maDe=" + maDe,
    })
      .then((res) => setSoLuong(res.data.data.result.soluong))
      .catch((err) => console.log(err));
  };
  const postCauHoi = async () => {
    var newCH = {
      TenCauHoi: tenCH,
      DapAn: dapAn,
      GiaiThich: giaiThich,
      LoaiCauHoi: loaiCH,
    };

    await httpApi({
      method: "post",
      url: `/CauHoi/postCauHoi`,
      data: newCH,
    }).then((res) => {
      getNewCauHoi();
    });
  };
  const postCauTraLoi = async () => {
    console.log(cauHoi, "CauHoi");
    var newCTL = {
      MaCh: cauHoi.maCh,
      CauA: cauA,
      CauB: cauB,
      CauC: cauC,
      CauD: cauD,
    };
    await httpApi({
      method: "post",
      url: `/CauTraLoi/PostCauTraLoi`,
      data: newCTL,
    }).then((res) => {
      window.alert("Thành Công!");
    });
  };
  const getNewCauHoi = async () => {
    await httpApi
      .get(`/CauHoi/GetNewCauHoi`)
      .then((res) => {
        setCauHoi(res.data);
        console.log(res.data);
      })
      .then((res) => {
        setLoading(false);
      });
  };
  const postAllQuestion = async () => {
    await httpApi({
      method: "post",
      url: "/CauHoi/postListCauHoi?maDe=" + maDe,
      data: lstCauHoi,
    }).then((res) => {
      alert("Thêm danh sách câu hỏi thành công!");
    });
  };
  const onClickThem = async () => {
    postAllQuestion();
  };
  const ganGiaTri = () => {
    console.log(page);
    console.log(lstCauHoi, "ds");
    var index = 20 - soLuong;
    console.log(lstCauHoi[page - 1], "CauHoi " + index);
    setTxtTenCH(lstCauHoi[page - 1].TenCauHoi);
    setTxtDapAn(lstCauHoi[page - 1].DapAn);
    setTxtLoai(lstCauHoi[page - 1].LoaiCauHoi);
    setTxtCauA(lstCauHoi[page - 1].CauA);
    setTxtCauB(lstCauHoi[page - 1].CauB);
    setTxtCauC(lstCauHoi[page - 1].CauC);
    setTxtCauD(lstCauHoi[page - 1].CauD);
    setTxtGiaiThich(lstCauHoi[page - 1].GiaiThich);
  };
  const layGiaTri = () => {
    var newCauHoi = {
      TenCauHoi: txtTenCH,
      DapAn: txtDapAn,
      GiaiThich: txtGiaiThich,
      LoaiCauHoi: txtLoai,
      CauA: txtCauA,
      CauB: txtCauB,
      CauC: txtCauC,
      CauD: txtCauD,
    };
    if (lstCauHoi.length == page - 2) {
      console.log(page);
      setLstCauHoi([...lstCauHoi, newCauHoi]);
      remove();
    } else {
      lstCauHoi[page - 2] = newCauHoi;
      if (lstCauHoi.length == page - 1) remove();
      else ganGiaTri();
    }
    console.log(lstCauHoi, "lst CauHoi");
  };
  const setOnClickPreve = () => {
    setPage((page -= 1));
    ganGiaTri();
  };
  const setOnClickNext = () => {
    setPage((page += 1));
    layGiaTri();
  };
  const remove = () => {
    setTxtTenCH("");
    setTxtDapAn("");
    setTxtLoai("");
    setTxtCauA("");
    setTxtCauB("");
    setTxtCauC("");
    setTxtCauD("");
    setTxtGiaiThich("");
  };

  return (
    <div className="bg">
      <h2>Thêm Câu Hỏi</h2>
      <br />
      <br />
      <div>
        <Container fluid>
          <span>
            <h5>Câu {page}:</h5>
          </span>
          <Button
            variant="outline-success"
            onClick={(e) => {
              remove();
            }}
          >
            Remove
          </Button>
          <br />

          <div style={{ padding: "8px", marginLeft: 100 }}>
            {page <= soLuong ? (
              <div>
                {/* /// Row Tên câu hỏi */}
                <Row style={{ width: "100%" }}>
                  <Col md={{ span: 2 }}>
                    <label>
                      <h5>Tên câu hỏi:</h5>
                    </label>
                  </Col>
                  <Col md={{ span: 8 }}>
                    <Form.Control
                      as="textarea"
                      placeholder="Nhập tên câu hỏi"
                      style={{ paddingLeft: 20 }}
                      id="txtTenCH"
                      name="txtTenCH"
                      value={txtTenCH}
                      onChange={(e) => {
                        setTxtTenCH(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <br />
                {/* ///Row Đáp án */}
                <Row style={{ width: "100%" }}>
                  <Col md={{ span: 2 }}>
                    <label>
                      <h5>Đáp án:</h5>
                    </label>
                  </Col>

                  <Col md={{ span: 8 }}>
                    <Form.Control
                      type="text"
                      placeholder="Nhập đáp án"
                      style={{ paddingLeft: 20 }}
                      id="txtDapAn"
                      name="txtDapAn"
                      value={txtDapAn}
                      onChange={(e) => {
                        setTxtDapAn(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <br />
                {/* ///Loại câu hỏi */}
                <Row style={{ width: "100%" }}>
                  <Col md={{ span: 2 }}>
                    <label>
                      <h5>Loại câu hỏi:</h5>
                    </label>
                  </Col>

                  <Col md={{ span: 8 }}>
                    <Form.Control
                      type="text"
                      placeholder="Nhập loại câu hỏi"
                      style={{ paddingLeft: 20 }}
                      id="txtLoai"
                      name="txtLoai"
                      value={txtLoai}
                      onChange={(e) => {
                        setTxtLoai(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <br />
                {/* ///Row Đáp an A B C D */}
                <Row style={{ width: `100%` }}>
                  {/* ///Row Đáp an A */}

                  <Col md={{ span: 2 }}>
                    <label>
                      <h5>Câu A:</h5>
                    </label>
                  </Col>

                  <Col md={{ span: 3 }}>
                    <Form.Control
                      type="text"
                      placeholder="Nhập đáp án"
                      id="txtCauA"
                      name="txtCauA"
                      value={txtCauA}
                      onChange={(e) => {
                        setTxtCauA(e.target.value);
                      }}
                    />
                  </Col>

                  {/* ///Row Đáp an B */}

                  <Col md={{ span: 2 }}>
                    <label>
                      <h5>Câu B:</h5>
                    </label>
                  </Col>

                  <Col md={{ span: 3 }}>
                    <Form.Control
                      type="text"
                      placeholder="Nhập đáp án"
                      id="txtCauB"
                      name="txtCauB"
                      value={txtCauB}
                      onChange={(e) => {
                        setTxtCauB(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <br />
                <Row style={{ width: `100%` }}>
                  {/* ///Row Đáp an C */}
                  <Col md={{ span: 2 }}>
                    <label>
                      <h5>Câu C:</h5>
                    </label>
                  </Col>

                  <Col md={{ span: 3 }}>
                    <Form.Control
                      type="text"
                      placeholder="Nhập đáp án"
                      id="txtCauC"
                      name="txtCauC"
                      value={txtCauC}
                      onChange={(e) => {
                        setTxtCauC(e.target.value);
                      }}
                    />
                  </Col>

                  {/* ///Row Đáp an D */}
                  <Col md={{ span: 2 }}>
                    <label>
                      <h5>Câu D:</h5>
                    </label>
                  </Col>

                  <Col md={{ span: 3 }}>
                    <Form.Control
                      type="text"
                      placeholder="Nhập đáp án"
                      id="txtCauD"
                      name="txtCauD"
                      value={txtCauD}
                      onChange={(e) => {
                        setTxtCauD(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <br />
                {/* /// Row Giải thích */}
                <Row style={{ width: "100%" }}>
                  <Col md={{ span: 2 }}>
                    <label>
                      <h5>Lời giải thích:</h5>
                    </label>
                  </Col>
                  <Col md={{ span: 8 }}>
                    <Form.Control
                      as="textarea"
                      placeholder="Nhập Lời giải thích"
                      style={{ height: "100px" }}
                      id="txtGiaiThich"
                      name="txtGiaiThich"
                      value={txtGiaiThich}
                      onChange={(e) => {
                        setTxtGiaiThich(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
              </div>
            ) : (
              <div>
                <h2 style={{ color: "lightseagreen" }}>
                  <span>
                    Vui lòng kiểm tra lại các câu hỏi trước khi thêm tất cả!
                  </span>
                </h2>
              </div>
            )}

            <br />
            {/* /// Row Button preve, next */}
            <Row style={{ width: "100%" }}>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {page > 1 ? (
                  <Button
                    variant="outline-success"
                    onClick={(e) => {
                      setOnClickPreve();
                    }}
                  >
                    Câu Trước
                  </Button>
                ) : null}
              </Col>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "red",
                }}
              >
                <p>
                  <b>{page}</b>
                </p>
              </Col>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                {page <= soLuong ? (
                  <Button
                    variant="outline-success"
                    style={{ justifyContent: "left" }}
                    onClick={(e) => {
                      setOnClickNext();
                    }}
                  >
                    Câu tiếp theo
                  </Button>
                ) : (
                  <Button
                    variant="outline-success"
                    onClick={(e) => {
                      onClickThem();
                    }}
                  >
                    <Link to={"/Giaovien/nganhang"}>Thêm tất cả</Link>
                  </Button>
                )}
              </Col>
            </Row>
          </div>
          <br />
        </Container>
      </div>
    </div>
  );
};

export default TeamCauHoi;
