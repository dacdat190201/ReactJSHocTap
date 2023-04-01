import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import httpApi from "../../../api/domain/httpApi";
import Sidebar from "../Sidebar/Sidebar";
import "./Hoc.css";
import NoiDungBaiHoc from "./NoiDungBaiHoc";
const Hoc = () => {
  const { maMh } = useParams();
  const [maCh, setMaCh] = useState([]);
  const [maDeOnTap, setDeOnTap] = useState([]);

  const [detail, setDetail] = useState([]);
  const [layDe, setLayDe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading2, setLoading2] = useState(true);

  const [noiDung, setNoiDung] = useState([]);
  const [render, setRender] = useState(false);

  const [showOnTap, setShowOnTap] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      httpApi.get(`/Monhoc/MonhocDetails?MaMh=${maMh}`).then((res) => {
        setDetail(res.data.data.dsNoiDung);
        setLoading(false);
      });
    };
    fetchDetail();
  }, []);

  useEffect(() => {
    const fetchDetail = async () => {
      await httpApi.get(`/Dethi/GetDeThiByMaMH?MaMH=${maMh}`).then((res) => {
        setLayDe(res.data.data.result);
        setLoading2(false);
      });
    };
    fetchDetail();
  }, []);

  const layDeOnTap = async (maCh) => {
    await httpApi
      .get(`/Dethi/GetDeThiByMa?Ma=${maCh}&loai=${2}`)
      .then((res) => {
        console.log(res.data.data.result.maDe, "Ma De");
        setDeOnTap(res.data.data.result.maDe);
      });
  };

  const onClickLayDeOnTap = (maChuong) => {
    setShowOnTap(true);
    layDeOnTap(maChuong);
  };

  if (loading === true) {
    return <div>loading....</div>;
  }
  if (isLoading2 === true) {
    return <div>loading....</div>;
  }
  return (
    <div className="bg">
      <Link to="/home">
        <i class="fa-solid fa-arrow-left"></i>
      </Link>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <div className="text-baihoc">
            <h3 className="text-baihoc1">
              <span>BÀI HỌC: {detail.tenMH}</span>
            </h3>
          </div>
          <Row className="head-row">
            <Col sm={8} className="head-col1">
              <div dangerouslySetInnerHTML={{ __html: noiDung.noiDung }} />
              <NoiDungBaiHoc key={noiDung.maBh} noiDung={noiDung} />
            </Col>
            <Col sm={4}>
              <div className="mucluc">Mục Lục</div>
              {detail &&
                detail.chuong.map((item, key) => {
                  return (
                    <div>
                      <div key={key} className="chuong-tab">
                        <h6>
                          <span>{item.tenChuong}</span>
                        </h6>
                      </div>
                      {detail &&
                        detail.chuong[key].baihoc.map((value, k) => {
                          return (
                            <div className="baihoc-tab">
                              <span
                                onClick={() => {
                                  setNoiDung(value);
                                  onClickLayDeOnTap(item.maChuong);
                                }}
                                className="noidung-hover"
                              >
                                {value.tenBh}
                              </span>
                            </div>
                          );
                        })}
                      <div>
                        {showOnTap ? (
                          <Link to={`/dethi/random/${maDeOnTap}`}>
                            <button className="btn btn-info btn-sm">
                              Làm Bài Ôn tập
                            </button>
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              <Link to={`/dethi/random/${layDe.maDe}`}>
                <button className="btn btn-danger ms-2">
                  Làm bài kiểm tra ngay
                </button>
              </Link>
            </Col>
          </Row>
          <Row style={{ width: 700 }} className="head-row">
            <Col sm={7}>
              <div className="baihoctiep">
                <h6>Các bài học tiếp theo</h6>
              </div>
              {detail &&
                detail.chuong.map((item, key) => {
                  return (
                    <div>
                      {detail &&
                        detail.chuong[key].baihoc.map((value, k) => {
                          return (
                            <div className="baihoc-tab">
                              <span
                                onClick={() => setNoiDung(value)}
                                className="noidung-hover"
                                style={{ color: "blue" }}
                              >
                                {value.tenBh}
                              </span>
                              <hr></hr>
                            </div>
                          );
                        })}
                    </div>
                  );
                })}
            </Col>
            <Col sm={5}>
              <div className="baihoctiep">
                <h6>Các chương đang có</h6>
              </div>
              {detail &&
                detail.chuong.map((item, key) => {
                  return (
                    <div>
                      <div key={key}>
                        <h6>
                          <span
                            onClick={() => setRender(!render)}
                            style={{ color: "blue" }}
                          >
                            {item.tenChuong} (xem thêm)
                          </span>
                        </h6>
                        <hr></hr>
                      </div>
                      {render &&
                        detail &&
                        detail.chuong[key].baihoc.map((value, k) => {
                          return (
                            <div className="baihoc-tab">
                              <span
                                onClick={() => setNoiDung(value)}
                                className="noidung-hover"
                              >
                                {value.tenBh}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  );
                })}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Hoc;
