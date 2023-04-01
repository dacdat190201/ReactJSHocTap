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

import { Link, useParams } from "react-router-dom";
import httpApi from "../../../../api/domain/httpApi";
const TeamNganHang = () => {
  const [loading, setLoading] = useState(true);

  const [lstMonHoc, setLstMonHoc] = useState([]);
  const [lstDeThi, setLstDeThi] = useState([]);

  const [deThi, setDeThi] = useState([]);
  const [maDe, setMaDe] = useState([]);

  useEffect(() => {
    const fetchMonHoc = async () => {
      await httpApi.get(`/MonHoc/GetMonhocAllAsync`).then((res) => {
        setLstMonHoc(res.data.data.result);
        setLoading(false);
      });
    };

    fetchMonHoc();
  }, []);

  const fetchDeThi = async (maMH) => {
    await httpApi.get(`/DeThi/GetAllDeThiByMaMH?MaMH=${maMH}`).then((res) => {
      setLstDeThi(res.data.data.result);
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
      if (lstDeThi.length == 0) window.alert("Không có môn học nào!");
    }
  };

  const loadCbbDeThi = () => {};
  const delDeThi = async () => {
    await httpApi({
      method: "post",
      url: `/DeThi/DelDeThi?MaDe=${maDe}`,
    })
      .then(alert("Xóa thành công!"))
      .catch((err) => {
        alert("Xóa thất bại!");
        console.log(err);
      });
  };
  const onClickXoa = () => {
    if (window.confirm("Xác nhân xóa đề thi!")) {
      delDeThi();
    }
  };

  return (
    <div className="bg">
      <Container>
        <div>
          <h2>
            <span>Ngân Hàng Câu Hỏi</span>
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
            <h3>Danh sách đề thi</h3>
            <br />
            <Form.Select
              size="lg"
              name="cbb_DeThi"
              onChange={(e) => {
                setMaDe(e.target.value);
              }}
            >
              <option value="">Vui Lòng Chọn</option>;
              {lstDeThi &&
                lstDeThi.map((dethi, key) => {
                  return <option value={dethi.maDe}>{dethi.tenDeThi}</option>;
                })}
            </Form.Select>

            <Button variant="info" className="userListEdit">
              <Link to={`/Giaovien/ThemDeThi`}>Thêm Đề Thi Mới</Link>
            </Button>
            <Button
              variant="info"
              onClick={(e) => onClickXoa()}
              className="userListEdit"
            >
              Xóa Đề Thi
            </Button>
            <Button variant="info" className="userListEdit">
              <Link to={`/Giaovien/ThongTinCauHoi/${maDe}`}>
                Xem thông câu hỏi
              </Link>
            </Button>
          </div>
          <br />
        </div>
      </Container>
    </div>
  );
};

export default TeamNganHang;
