import React, { useState, useEffect } from "react";
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
import httpApi from "../../../../api/domain/httpApi";
const TeamBaiHoc = () => {
  const [loading, setLoading] = useState(true);

  const [lstMonHoc, setLstMonHoc] = useState([]);
  const [lstChuong, setLstChuong] = useState([]);
  const [lstBaiHoc, setLstBaiHoc] = useState([]);

  const [maMH, setMaMH] = useState([]);
  const [maChuong, setMaChuong] = useState([]);
  const [txtTenChuong, setTxtTenChuong] = useState([]);
  const [maBH, setMaBH] = useState([]);
  const [txtTenBH, setTxtTenBH] = useState([]);
  const [txtNoiDung, setTxtNoiDung] = useState([]);

  const [showCH, setShowCH] = useState(false);
  const [showThemCH, setShowThemCH] = useState(false);
  const [showBH, setShowBH] = useState(false);
  const [showThemBH, setShowThemBH] = useState(false);

  useEffect(() => {
    const fectLstMonHoc = async () => {
      await httpApi.get(`/MonHoc/GetMonhocAllAsync`).then((res) => {
        setLstMonHoc(res.data.data.result);
        setLoading(false);
      });
    };

    fectLstMonHoc();
  }, []);

  const layDsChuongByMaMH = async (MaMH) => {
    await httpApi.get(`/Chuong/GetAllChuong?MaMH=${MaMH}`).then((res) => {
      setLstChuong(res.data.data);
    });
  };
  const layDsBaiHocByMaCH = async (maChuong) => {
    await httpApi
      .get(`/BaiHoc/GetAllBaiHoc?MaChuong=${maChuong}`)
      .then((res) => {
        setLstBaiHoc(res.data.data.data);
      });
  };
  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  const loadCbbMonHoc = (maMH) => {
    if (maMH != null) {
      layDsChuongByMaMH(maMH);
      if (lstChuong.length == 0 && loadCbbMonHoc == "vuilong")
        window.alert("Đang Tải!!");
      else setTxtTenChuong("");
    }
  };
  const loadCbbChuong = (MaChuong) => {
    if (MaChuong != null) {
      layDsBaiHocByMaCH(MaChuong);
      if (lstChuong.length == 0 && loadCbbChuong == "vuilong") {
        window.alert("Đang Tải!!");
        setShowCH(false);
      } else {
        setShowCH(true);
        setShowThemCH(false);
        setTxtTenBH("");
        setTxtNoiDung("");
      }
    }
  };
  const loadCbbBaiHoc = (MaBH) => {
    if (MaBH != null) {
      if (lstChuong.length == 0 && loadCbbBaiHoc == "vuilong") {
        window.alert("Đang Tải!!");
        setShowBH(false);
      } else {
        setShowBH(true);
        setShowThemBH(false);
      }
    }
  };
  const postChuong = async () => {
    await httpApi({
      method: "post",
      url: `/Chuong/PostChuong?MaMH=${maMH}`,
      data: {
        MaMH: maMH,
        TenChuong: txtTenChuong,
      },
    })
      .then((res) => {
        alert("Thêm thành công!");
        setShowCH(true);
        setShowThemCH(false);
        layDsChuongByMaMH(maMH);
      })
      .catch((err) => {
        alert("Thêm thất bại!");
        console.log(err);
      });
  };
  const delChuong = async () => {
    await httpApi({
      method: "post",
      url: `/Chuong/DelChuong?MaChuong=${maChuong}`,
    })
      .then((res) => {
        alert("Xóa thành công!");
        layDsChuongByMaMH(maMH);
      })
      .catch((err) => {
        alert("Thất bại!");
        console.log(err);
      });
  };
  const editChuong = async () => {
    await httpApi({
      method: "post",
      url: `/Chuong/EditChuong?MaChuong=${maChuong}`,
      data: {
        MaChuong: maChuong,
        TenChuong: txtTenChuong,
      },
    })
      .then((res) => {
        alert("Sửa thành công!");
        layDsChuongByMaMH(maMH);
      })
      .catch((err) => {
        alert("Thất bại!");
        console.log(err);
      });
  };

  const onClickThem = () => {
    setShowThemCH(true);
    setShowCH(!showCH);
    setTxtTenChuong("");
  };
  const onClickXoa = () => {
    if (maChuong == null) {
      alert("Vui lòng chọn chương!");
    } else {
      delChuong();
      setShowCH(false);
      setMaChuong("");
      loadCbbChuong(maMH);
    }
  };
  const onClickSua = () => {
    console.log(maChuong, "machuong");
    if (maChuong == null) {
      alert("Vui lòng chọn chương!");
    } else {
      editChuong();
      loadCbbChuong(maMH);
    }
  };
  const postBaiHoc = async () => {
    await httpApi({
      method: "post",
      url: `/BaiHoc/PostBaiHoc`,
      data: {
        MaChuong: maChuong,
        TenBh: txtTenBH,
        NoiDung: txtNoiDung,
      },
    })
      .then((res) => {
        alert("Thêm thành công!");
        setShowBH(false);
        setShowThemBH(false);
        layDsBaiHocByMaCH(maChuong);
      })
      .catch((err) => {
        alert("Thêm thất bại!");
        console.log(err);
      });
  };
  const delBaiHoc = async () => {
    await httpApi({
      method: "post",
      url: `/BaiHoc/DelBaiHoc?MaBH=${maBH}`,
    })
      .then((res) => {
        alert("Xóa thành công!");
        layDsBaiHocByMaCH(maChuong);
      })
      .catch((err) => {
        alert("Thất bại!");
        console.log(err);
      });
  };
  const editBaiHoc = async () => {
    await httpApi({
      method: "post",
      url: `/BaiHoc/EditBaiHoc?MaBH=${maBH}`,
      data: {
        MaBH: maBH,
        TenBH: txtTenBH,
        NoiDung: txtNoiDung,
      },
    })
      .then((res) => {
        alert("Xóa thành công!");
        layDsBaiHocByMaCH(maChuong);
      })
      .catch((err) => {
        alert("Thất bại!");
        console.log(err);
      });
  };

  const onClickThemBH = () => {
    setShowThemBH(true);
    setShowBH(!showBH);
    setTxtTenBH("");
    setTxtNoiDung("");
  };
  const onClickXoaBH = () => {
    if (maBH == null) {
      alert("Vui lòng chọn chương!");
    } else {
      delBaiHoc();
      setShowBH(false);
      setMaBH("");
      loadCbbBaiHoc(maBH);
    }
  };
  const onClickSuaBH = () => {
    if (maChuong == null) {
      alert("Vui lòng chọn chương!");
    } else {
      editBaiHoc();
      loadCbbBaiHoc(maMH);
    }
  };
  return (
    <div className="bg">
      <Container>
        <div>
          <h2>
            <span>Ngân Hàng Bài Học</span>
          </h2>
          <br />
          <br />
          <h3>Danh sách môn học</h3>
          <br />
          <Form.Select
            size="lg"
            name="cbb_MonHoc"
            onChange={(e) => {
              setMaMH(e.target.value);
              loadCbbMonHoc(e.target.value);
            }}
          >
            <option value="">Vui Lòng Chọn</option>;
            {lstMonHoc &&
              lstMonHoc.map((v, i) => {
                return <option value={v.maMH}>{v.tenMH}</option>;
              })}
          </Form.Select>
          <br />
          <Row style={{ width: "100%" }}>
            <Col xs="6">
              <h3>Danh Sách Chương</h3>
            </Col>
            <Col xs="2" style={{ textAlign: "right" }}>
              <Button
                className="userListEdit"
                variant="info"
                onClick={(e) => {
                  onClickThem();
                }}
              >
                Thêm
              </Button>
            </Col>
            <Col xs="2" style={{ textAlign: "right" }}>
              <Button
                variant="info"
                onClick={(e) => {
                  onClickXoa();
                }}
                className="userListEdit"
              >
                Xóa
              </Button>
            </Col>
            <Col xs="2" style={{ textAlign: "right" }}>
              <Button
                variant="info"
                onClick={(e) => {
                  onClickSua();
                }}
                className="userListEdit"
              >
                Sửa
              </Button>
            </Col>
          </Row>
          <br />
          <div>
            {showCH ? (
              <Row style={{ width: "100%" }}>
                <Col xs="3" style={{ textAlign: "center" }}>
                  <h4>Tên Chương</h4>
                </Col>
                <Col xs="8">
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên chương"
                    style={{ height: "40px" }}
                    id="txtTenChuong"
                    name="txtTenChuong"
                    value={txtTenChuong}
                    onChange={(e) => {
                      setTxtTenChuong(e.target.value);
                    }}
                  />
                </Col>
                <Col xs="1">
                  {showThemCH ? (
                    <a
                      className="btn btn-light"
                      onClick={(e) => {
                        postChuong();
                      }}
                    >
                      <i className="fa fa-chevron-right"></i>
                    </a>
                  ) : null}
                </Col>
              </Row>
            ) : null}
          </div>

          <br />

          <Form.Select
            size="lg"
            name="cbb_Chuong"
            onChange={(e) => {
              setMaChuong(lstChuong[e.target.value].maChuong);
              setTxtTenChuong(lstChuong[e.target.value].tenChuong);
              loadCbbChuong(lstChuong[e.target.value].maChuong);
            }}
          >
            <option value="vuilong">Vui Lòng Chọn</option>;
            {lstChuong &&
              lstChuong.map((v, key) => {
                return <option value={key}>{v.tenChuong}</option>;
              })}
          </Form.Select>
          <br />
          <Row style={{ width: "100%" }}>
            <Col xs="6">
              <h3>Danh Sách Bài Học</h3>
            </Col>
            <Col xs="2" style={{ textAlign: "right" }}>
              <Button
                variant="info"
                onClick={(e) => {
                  onClickThemBH();
                }}
                className="userListEdit"
              >
                Thêm
              </Button>
            </Col>
            <Col xs="2" style={{ textAlign: "right" }}>
              <Button
                variant="info"
                onClick={(e) => {
                  onClickXoaBH();
                }}
                className="userListEdit"
              >
                Xóa
              </Button>
            </Col>
            <Col xs="2" style={{ textAlign: "right" }}>
              <Button
                variant="info"
                onClick={(e) => {
                  onClickSuaBH();
                }}
                className="userListEdit"
              >
                Sửa
              </Button>
            </Col>
          </Row>
          <br />
          <div>
            {showBH ? (
              <div>
                <Row style={{ width: "100%" }}>
                  <Col xs="3" style={{ textAlign: "center" }}>
                    <h4>Tên bài học:</h4>
                  </Col>
                  <Col xs="8">
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên bài học"
                      style={{ height: "40px" }}
                      id="txtTenBH"
                      name="txtTenBH"
                      value={txtTenBH}
                      onChange={(e) => {
                        setTxtTenBH(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Row style={{ width: "100%" }}>
                  <Col xs="3" style={{ textAlign: "center" }}>
                    <h4>Nội dung:</h4>
                  </Col>
                  <Col xs="8">
                    <Form.Control
                      as="textarea"
                      placeholder="Nhập nội dung bài học"
                      style={{ height: "100px" }}
                      id="txtNoiDung"
                      name="txtNoiDung"
                      value={txtNoiDung}
                      onChange={(e) => {
                        setTxtNoiDung(e.target.value);
                      }}
                    />
                  </Col>
                  <Col xs="1">
                    {showThemBH ? (
                      <a
                        className="btn btn-light"
                        onClick={(e) => {
                          postBaiHoc();
                        }}
                      >
                        <i className="fa fa-chevron-right"></i>
                      </a>
                    ) : null}
                  </Col>
                </Row>
              </div>
            ) : null}
          </div>

          <br />

          <Form.Select
            size="lg"
            name="cbb_BaiHoc"
            onChange={(e) => {
              setMaBH(lstBaiHoc[e.target.value].maBh);
              setTxtTenBH(lstBaiHoc[e.target.value].tenBh);
              setTxtNoiDung(lstBaiHoc[e.target.value].noiDung);
              loadCbbBaiHoc(lstBaiHoc[e.target.value].maBh);
            }}
          >
            <option value="vuilong">Vui Lòng Chọn</option>;
            {lstBaiHoc &&
              lstBaiHoc.map((v, key) => {
                return <option value={key}>{v.tenBh}</option>;
              })}
          </Form.Select>

          <br />
        </div>
      </Container>
    </div>
  );
};
export default TeamBaiHoc;
