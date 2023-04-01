import React, { useContext, useEffect, useState } from "react";

import {
  Form,
  Spinner,
  Button,
  Table,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import httpApi from "../../../../api/domain/httpApi";
const TeamEditCauHoi = () => {
  const [cauHoi, setCauHoi] = useState();
  const [soLuong, setSoLuong] = useState(2);
  var [page, setPage] = useState(1);

  const { maDe } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  let [txtTenCH, setTxtTenCH] = useState();
  let [txtDapAn, setTxtDapAn] = useState();
  let [txtLoai, setTxtLoai] = useState();
  let [txtCauA, setTxtCauA] = useState();
  let [txtCauB, setTxtCauB] = useState();
  let [txtCauC, setTxtCauC] = useState();
  let [txtCauD, setTxtCauD] = useState();
  let [txtGiaiThich, setTxtGiaiThich] = useState();

  var [lstCauHoi, setLstCauHoi] = useState([]);

  useEffect(() => {
    const layDeThiByMaDe = async () => {
      await httpApi.get(`/Dethi/GetDeThiByMaDe?maDe=${maDe}`).then((res) => {
        setData(res.data.data.result);
        setLoading(false);
        setSoLuong(res.data.data.result.soluong);
        // if(lstCauHoi.length <= res.data.data.result.dethicauhoi.length)
        loadLstCauHoi(res.data.data.result.dethicauhoi);
      });
    };
    layDeThiByMaDe();
  }, []);

  const loadLstCauHoi = (dethi) => {
    for (var i = 0; lstCauHoi.length < dethi.length; i++) {
      var newCauHoi = {
        MaCH: dethi[i].cauHoi.maCh,
        TenCauHoi: dethi[i].cauHoi.tenCauHoi,
        DapAn: dethi[i].cauHoi.dapAn,
        GiaiThich: dethi[i].cauHoi.giaiThich,
        LoaiCauHoi: dethi[i].cauHoi.loaiCauHoi,
        MaCTL: dethi[i].cauHoi.cauTraLoi[0].maCtl,
        CauA: dethi[i].cauHoi.cauTraLoi[0].cauA,
        CauB: dethi[i].cauHoi.cauTraLoi[0].cauB,
        CauC: dethi[i].cauHoi.cauTraLoi[0].cauC,
        CauD: dethi[i].cauHoi.cauTraLoi[0].cauD,
      };
      lstCauHoi.push(newCauHoi);
      //setLstCauHoi([...lstCauHoi, newCauHoi]);
    }
    ganGiaTri();
  };
  const ganGiaTri = () => {
    console.log(lstCauHoi, "dsch");
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
      MaCH: lstCauHoi[page - 2].MaCH,
      TenCauHoi: txtTenCH,
      DapAn: txtDapAn,
      GiaiThich: txtGiaiThich,
      LoaiCauHoi: txtLoai,
      MaCTL: lstCauHoi[page - 2].MaCTL,
      CauA: txtCauA,
      CauB: txtCauB,
      CauC: txtCauC,
      CauD: txtCauD,
    };
    if (lstCauHoi.length == page - 2) {
      //console.log(page);
      setLstCauHoi([...lstCauHoi, newCauHoi]);
      remove();
    } else {
      lstCauHoi[page - 2] = newCauHoi;
      if (lstCauHoi.length == page - 1) remove();
      else ganGiaTri();
    }
    //console.log(lstCauHoi, "lst CauHoi");
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
  const setOnClickPreve = () => {
    setPage((page -= 1));
    ganGiaTri();
  };
  const setOnClickNext = () => {
    setPage((page += 1));
    layGiaTri();
  };

  const editLstCauHoi = async () => {
    await httpApi({
      method: "post",
      url: `/CauHoi/editListCauHoi?maDe=${maDe}`,
      data: lstCauHoi,
    })
      .then((res) => {
        alert("Đã sửa danh sách câu hỏi thành công!");
      })
      .catch((err) => {
        alert("Thất bại!");
        console.log(err);
      });
  };

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    <div classname="bg">
      <Container>
        <h1>Thông tin câu hỏi</h1>
        <Row style={{ width: "100%" }}>
          <div className="TenDe-Row">
            <h4>
              <br />
              Đề:{data.maDe} - {data.tenDeThi}
            </h4>
            <br />
          </div>
        </Row>
        <Row style={{ width: "100%" }}>
          <Col>
            <span>
              <h5>Câu {page}:</h5>
            </span>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <Button variant="info">
              <Link to={"/admin/nganhang"}>Quay về</Link>
            </Button>
          </Col>
        </Row>
        {/* <Row>
                      <Button variant="info" ><Link to={'/nganhang'}>Quay về</Link></Button>
                  </Row> */}
        <Row style={{ width: "100%" }}>
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
                    Vui lòng kiểm tra lại các câu hỏi trước khi sửa tất cả!
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
                      editLstCauHoi();
                    }}
                  >
                    <Link to={"/nganhang"}>Sửa tất cả</Link>
                  </Button>
                )}
              </Col>
            </Row>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default TeamEditCauHoi;
