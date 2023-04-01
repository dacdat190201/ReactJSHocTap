import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner, Toast } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { postBaiLamApi } from "../../../api/ApiBaiLam/apiBaiLam";
import { AuthContext } from "../../../context/AuthContext";
import httpApi from "../../../api/domain/httpApi";
import Sidebar from "../Sidebar/Sidebar";
import "./KiemTra.css";

const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);
  if (minutes <= 10) minutes = "0" + minutes;
  if (seconds <= 10) seconds = "0" + seconds;
  return minutes + ":" + seconds;
};
const KiemTra = () => {
  const { user: auth } = useContext(AuthContext);

  const [layDe, setLayDe] = useState([]);
  const { maDe } = useParams();
  const [data, setData] = useState([]);
  const [kiemTra, setKiemTra] = useState([]);
  const [layKiemTra, setLayKiemTra] = useState([]);
  //const maDe = 8;
  const [isLoading, setLoading] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [gender, setGender] = useState();
  const [lstChoose, setLstChoose] = useState([]);

  const [diem, setDiem] = useState(0);
  const [show, setShow] = useState(false);
  const [showTD, setShowTD] = useState(false);

  const [ketqua, setKetQua] = useState("Đúng");

  const [xemDiem, SetXemDiem] = useState(false);
  const [showKQ, setShowKQ] = useState(false);
  const [showDA, setShowDA] = useState(false);
  const [showGT, setShowGT] = useState(false);

  const [time, SetTime] = useState(3600);
  const [render, Setrender] = useState(false);
  const [render1, Setrender1] = useState(false);
  let interval = null;
  ///////
  const baiLam = {
    MaCh: "",
    DapAn: "",
    MaKt: "",
  };
  ///////

  useEffect(() => {
    const fetchProducts = async () => {
      await httpApi.get(`/Dethi/GetDeThiByMaDe?maDe=${maDe}`).then((res) => {
        setData(res.data.data.result);
        setLoading(false);
      });
    };
    fetchProducts();
  }, []);

  const fetchKiemTra = async () => {
    await httpApi.get(`/KiemTra/GetAllKiemTra`).then((res) => {
      setKiemTra(res.data);

      setLoading2(false);
    });
  };
  useEffect(() => {
    fetchKiemTra();
  }, []);

  useEffect(() => {
    if (render) {
      interval = setInterval(() => {
        SetTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [render]);
  useEffect(() => {
    if (time <= 0) {
      clearInterval(interval);
      alert("Hết Thời Gian Làm");
    }
  });
  if (isLoading || isLoading2) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  const setOnClickTaoBaiKT = async () => {
    // alert(
    //   "Email:" + auth.email + " Ma de: " + maDe + "Ten De:" + data.tenDeThi
    // );
    postKiemTra();
  };
  const postKiemTra = async () => {
    var kiemtra = {
      TenKt: data.tenDeThi,
      Thoigian: "",
      MaDe: data.maDe,
    };
    await httpApi({
      method: "post",
      url: `/KiemTra/PostKiemTra?email=${auth.email}`,
      data: kiemtra,
    })
      .then()
      .catch((err) => console.error(err));
    fetchKiemTra();
  };

  const postBaiLam = async (baiLam) => {
    await httpApi({
      method: "post",
      url: `/Bailam/PostBaiLam`,
      data: baiLam,
    })
      // await (await httpApi.post("/Bailam/PostBaiLam"),
      // {
      //   MaCh: baiLam.MaCh,
      //   DapAn: baiLam.DapAn,
      //   MaKt: baiLam.MaKt,
      // }).data
      .then()
      .catch((err) => console.error(err));
  };

  const tinhDiemKiemTra = async (MaKT, time) => {
    let minutes = 59 - Math.floor(time / 60);
    let seconds = time % 60;

    var thoiGian = minutes + "p " + seconds;
    await httpApi({
      method: "get",
      url: `/KiemTra/tinhDiem?maKT=${MaKT}&thoiGian=${thoiGian}`,
    })
      .then((res) => setDiem(res.data.data))
      .catch((err) => console.log(err));
  };
  const onClickTinhDiem = () => {
    baiLam.MaKt = kiemTra.data.result[kiemTra.data.total - 1].maKt;
    tinhDiemKiemTra(baiLam.MaKt, time);
  };
  const layGiaTri = (e) => {
    if (window.confirm("Xác nhân nộp bài!")) {
      baiLam.MaKt = kiemTra.data.result[kiemTra.data.total - 1].maKt;

      data.dethicauhoi.map((cauhoi, key) => {
        var name = key;
        var checkbox = document.getElementsByName(name);

        for (var i = 0; i < checkbox.length; i++) {
          if (checkbox[i].checked == true) {
            if (checkbox[i].value == "Cau A") {
              baiLam.DapAn = cauhoi.cauHoi.cauTraLoi[0].cauA;
              baiLam.MaCh = cauhoi.cauHoi.cauTraLoi[0].maCh;

              postBaiLamApi(baiLam);
              baiLam.DapAn = "";
              baiLam.MaCh = "";
            }
            if (checkbox[i].value == "Cau B") {
              baiLam.DapAn = cauhoi.cauHoi.cauTraLoi[0].cauB;
              baiLam.MaCh = cauhoi.cauHoi.cauTraLoi[0].maCh;

              postBaiLam(baiLam);
              baiLam.DapAn = "";
              baiLam.MaCh = "";
            }
            if (checkbox[i].value == "Cau C") {
              baiLam.DapAn = cauhoi.cauHoi.cauTraLoi[0].cauC;
              baiLam.MaCh = cauhoi.cauHoi.cauTraLoi[0].maCh;

              postBaiLam(baiLam);
              baiLam.DapAn = "";
              baiLam.MaCh = "";
            }
            if (checkbox[i].value == "Cau D") {
              baiLam.DapAn = cauhoi.cauHoi.cauTraLoi[0].cauD;
              baiLam.MaCh = cauhoi.cauHoi.cauTraLoi[0].maCh;

              postBaiLam(baiLam);
              baiLam.DapAn = "";
              baiLam.MaCh = "";
            }

            lstChoose[key] = checkbox[i].name;
          }
        }
      });
      tinhDiemKiemTra(baiLam.MaKt, time);
      window.alert("Đã nộp bài!");
    }
  };

  //////
  return (
    <div className="bg">
      <Link to="/home">Quay Lại</Link>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Container>
            <Row style={{ width: 950 }}>
              <div className="TenDe-Row">
                <h4>
                  Đề:{data.maDe} - {data.tenDeThi}
                </h4>
              </div>
            </Row>
            <Row style={{ width: 950 }}>
              <Col>
                <div style={{ color: "orange" }}>
                  <h5>Thời gian: {data.thoigian} phút</h5>
                </div>
              </Col>
              <Col style={{ backgroundColor: "white" }}>
                <button
                  onClick={() => {
                    Setrender(true);
                    Setrender1(true);
                    setShowGT(true);
                    setOnClickTaoBaiKT();
                  }}
                  className="btn btn-danger ms-2"
                >
                  Bắt đầu kiểm tra
                </button>
              </Col>
            </Row>
            {render && (
              <div style={{ color: "red", marginBottom: 10 }}>
                <h6>Thời gian còn lại {formatTime(time)}</h6>
              </div>
            )}
            {render1 &&
              data &&
              data.dethicauhoi.map((cauhoi, key) => {
                return (
                  <div class="container-sm text-justify">
                    <h6 style={{ textAlign: "left" }}>
                      Câu {key + 1}: {cauhoi.cauHoi.tenCauHoi}
                    </h6>
                    <h5 style={{ textAlign: "left" }}>
                      ---------------------------------
                    </h5>
                    {/* <h4>Chọn : {gender}</h4> */}

                    <div className="content">
                      <div class="input-group input-group-sm mb-3">
                        <div class="">
                          <input
                            class="btn-radio"
                            type="radio"
                            name={key}
                            value="Cau A"
                            onChange={(e) => setGender(e.target.value)}
                          />
                        </div>
                        <p>A. {cauhoi.cauHoi.cauTraLoi[0].cauA}</p>
                      </div>

                      <div class="input-group input-group-sm mb-3">
                        <div class="">
                          <input
                            class="btn-radio"
                            type="radio"
                            name={key}
                            value="Cau B"
                            onChange={(e) => setGender(e.target.value)}
                          />
                        </div>
                        <p>B. {cauhoi.cauHoi.cauTraLoi[0].cauB}</p>
                      </div>
                      <div class="input-group input-group-sm mb-3">
                        <div class="">
                          <input
                            class="btn-radio"
                            type="radio"
                            name={key}
                            value="Cau C"
                            onChange={(e) => setGender(e.target.value)}
                          />
                        </div>
                        <p>C. {cauhoi.cauHoi.cauTraLoi[0].cauC}</p>
                      </div>
                      <div class="input-group input-group-sm mb-3">
                        <div class="">
                          <input
                            class="btn-radio"
                            type="radio"
                            name={key}
                            value="Cau D"
                            onChange={(e) => setGender(e.target.value)}
                          />
                        </div>
                        <p>D. {cauhoi.cauHoi.cauTraLoi[0].cauD}</p>
                      </div>

                      <div>
                        {showKQ ? (
                          <div>
                            {/* <p>
                              <b style={{ color: "blue" }}>Kết quả: </b>
                              <input
                                id={cauhoi.cauHoi.maCh}
                                name={cauhoi.cauHoi.maCh}
                                value="Đúng"
                                onChange={(e) => setKetQua(e.target.value)}
                              />
                            </p> */}
                            <p style={{ color: "red" }}>
                              <b>Đáp án: </b>
                              {cauhoi.cauHoi.dapAn}
                            </p>
                            <p>
                              <b>Lời Giải: </b>
                            </p>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: cauhoi.cauHoi.giaiThich,
                              }}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
          </Container>
          <Row style={{ width: `100%` }}>
            <Col xs={4} style={{ textAlign: "right" }}>
              <div style={{ with: 100 }}>
                {showKQ ? (
                  <Button
                    variant="info"
                    onClick={() => {
                      //setShow(!show);
                      //Setrender(true);
                      setShowDA(!showDA);
                      //hienThiKetQua();
                    }}
                  >
                    Giải Thích
                  </Button>
                ) : (
                  <div>
                    {showGT ? (
                      <Button
                        variant="info"
                        onClick={(e) => {
                          layGiaTri(e);
                          Setrender(false);
                          setShowKQ(!showKQ);
                        }}
                      >
                        Nộp
                      </Button>
                    ) : null}
                  </div>
                )}
              </div>
            </Col>
            <Col xs={2}>
              <div>
                {showGT ? (
                  <div>
                    {showTD ? (
                      <Button
                        onClick={() => {
                          setShow(true);
                          SetXemDiem(true);
                        }}
                      >
                        Xem điểm
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setShowTD(true);
                          onClickTinhDiem();
                        }}
                      >
                        Tính Điểm
                      </Button>
                    )}
                  </div>
                ) : null}
              </div>
            </Col>
            <Col xs={4} style={{ textAlign: "left" }}>
              <Toast
                onClose={() => setShow(false)}
                show={show}
                delay={3000}
                Sautohide
              >
                <Toast.Header>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                  />
                  <strong className="me-auto">Điểm kiểm tra</strong>
                  <small>Thời gian: {formatTime(time)}</small>
                </Toast.Header>
                <Toast.Body>Điểm của bạn là: {diem}!</Toast.Body>
              </Toast>
            </Col>
          </Row>

          {/* <Container>
            <Row>
              <div class="container-sm text-justify">
                {xemDiem && (
                  <div>
                    <h6>Đáp án đề kiểm tra:</h6>
                  </div>
                )}
                {
                  showKQ ? <TestKT /> : null
                }               
              </div>
            </Row>
          </Container> */}
        </div>
      </div>
    </div>
  );
};

export default KiemTra;
