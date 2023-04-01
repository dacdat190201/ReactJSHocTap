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
import httpApi from "../../../api/domain/httpApi";

const ViewNoiDung = () => {
  const [loading, setLoading] = useState(true);

  const [lstMonHoc, setLstMonHoc] = useState([]);
  const [lstChuong, setChuong] = useState([]);
  const [maChuong, setMaChuong] = useState([]);
  useEffect(() => {
    const fectLstMonHoc = async () => {
      await httpApi.get(`/MonHoc/GetMonhocAllAsync`).then((res) => {
        setLstMonHoc(res.data.data.result);
        setLoading(false);
      });
    };

    fectLstMonHoc();
  }, []);
  const fetchDeThi = async (maMH) => {
    await httpApi.get(`/Chuong/GetAllChuong?MaMH=${maMH}`).then((res) => {
      setChuong(res.data.data);
    });
  };
  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  const loadComboboxMonHoc = (maMH) => {
    if (maMH != null) {
      fetchDeThi(maMH);
      if (lstChuong.length == 0 && loadComboboxMonHoc == "vuilong")
        window.alert("Đang Tải!!");
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
              loadComboboxMonHoc(e.target.value);
            }}
          >
            <option value="">Vui Lòng Chọn</option>;
            {lstMonHoc &&
              lstMonHoc.map((v, i) => {
                return <option value={v.maMH}>{v.tenMH}</option>;
              })}
          </Form.Select>
          <div>
            <br />
            <h3>Danh Sách Chương</h3>
            <br />
            <Form.Select
              size="lg"
              name="cbb_DeThi"
              onChange={(e) => {
                setMaChuong(e.target.value);
              }}
            >
              <option value="vuilong">Vui Lòng Chọn</option>;
              {lstChuong &&
                lstChuong.map((i, key) => {
                  return <option value="">{i.tenChuong}</option>;
                })}
            </Form.Select>

            <Button variant="info">
              <Link to={`/Admin/NewChuong`}>Thêm Chương Mới</Link>
            </Button>
            {/* <Button variant="info" onClick={(e) => onClickXoa()}>
              Xóa Đề Thi
            </Button>
            <Button variant="info">
              <Link to={`/Admin/ThongTinCauHoi/${maDe}`}>
                Xem thông câu hỏi
              </Link>
            </Button> */}
          </div>
          <br />
        </div>
      </Container>
    </div>
  );
};

export default ViewNoiDung;
