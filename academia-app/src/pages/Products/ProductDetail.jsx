import { useContext, useEffect, useState } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CauHoi from "./CauHoi";
import { useCart } from "react-use-cart";
import httpApi from "../../api/domain/httpApi";
import { AuthContext } from "../../context/AuthContext";

const ProductDetail = () => {
  // const {user:authUser} = useContext(AuthContext);
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { maMh } = useParams();
  const [noiDung, setNoiDung] = useState([]);
  const history = useNavigate();
  const [for1, setFor1] = useState([]);
  const [for2, setFor2] = useState([]);
  const { user: authUser } = useContext(AuthContext);
  const { addItem } = useCart();
  const VND = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const fetchDetail = async () => {
      httpApi.get(`/Monhoc/MonhocDetails?maMh=${maMh}`).then((res) => {
        if (res.data.message == "true") {
          setDetail(res.data.data.dsNoiDung);
          setFor1(res.data.data.dsNoiDung?.chuong[0]);
          setFor2(res.data.data.dsNoiDung?.chuong[1]);
          setLoading(false);
        }
      });
    };
    fetchDetail();
  }, []);
  const GioHang = async (props) => {
    await httpApi
      .post(`/GioHang/PostGioHang?email=${authUser.email}`, {
        MaMh: props.maMH,
      })
      .then((res) => {
        alert("Mua thành công");
        window.location.reload();
      })
      .catch((err) => alert("Môn học đã có trong giỏ hàng hoặc đã thanh toán"));
  };

  function refreshPage() {
    setTimeout(() => {
      alert("[THÔNG BÁO] Bạn cần mua khóa học để học tiếp");
    }, 10);
  }
  if (loading === true) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (detail.lopHoc.length === 0) {
    return alert("Bai hoc chua san sang"), history("/products");
  }
  let item = {
    id: detail.maMH,
    img: detail.hinhAnh,
    name: detail.tenMH,
    price: detail.giaBan,
  };
  return (
    <div className="bg-detail">
      <Row style={{ width: 1345 }}>
        <img
          className="img"
          src={`${process.env.REACT_APP_URL_HINH}/background/bgdetail.jpeg`}
          height={350}
        />
      </Row>
      <Container>
        <Row style={{ width: 1150 }}>
          <Col sm={8}>
            <div>
              <h6>ĐỀ CƯƠNG KHÓA HỌC</h6>
              <div className="col-detail">DANH SÁCH BÀI HỌC MIỄN PHÍ</div>
              <Table striped bordered hover style={{ width: 750 }}>
                {
                  <tbody>
                    <tr style={{ backgroundColor: "GrayText" }}>
                      <td>{for1?.tenChuong}</td>
                    </tr>
                    {for1 &&
                      for1?.baihoc.map((value, k) => {
                        return (
                          <tr>
                            <td>{value.tenBh}</td>
                            <td onClick={() => setNoiDung(value)}>
                              <Button className="btn-Hoc">Học</Button>
                            </td>
                          </tr>
                        );
                      })}
                    <tr style={{ backgroundColor: "GrayText" }}>
                      <td>{for2?.tenChuong}</td>
                    </tr>
                    {for2 &&
                      for2?.baihoc.map((value, k) => {
                        return (
                          <tr>
                            <td>{value.tenBh}</td>
                            <td onClick={() => setNoiDung(value)}>
                              <Button className="btn-Hoc">Học</Button>
                            </td>
                          </tr>
                        );
                      })}
                    <tr>
                      <td style={{ fontWeight: "bold" }} onClick={refreshPage}>
                        Học tiếp
                      </td>
                    </tr>
                  </tbody>
                }
              </Table>
              <div>
                <h3>Nội dung bài học</h3>
                <div>
                  <div dangerouslySetInnerHTML={{ __html: noiDung.noiDung }} />
                  <CauHoi key={noiDung.maBh} noiDung={noiDung} />
                </div>
              </div>
            </div>
          </Col>
          <Col sm={4}>
            <div className="detail">
              <p>
                Học tập-Luyện đề cùng giảng viên{" "}
                {detail.lopHoc[0].giaoVien.tenGv}- MỤC TIÊU 8+
              </p>
              <h2 className="giaBan">{VND.format(200000)}</h2>
              <span>Đánh giá 5 sao***** Chưa làm</span>
              <span>
                <i className="fa-solid fa-circle-user mr-5"></i>
                Giảng viên: {detail.lopHoc[0].giaoVien.tenGv}
              </span>
              <span>
                <i class="fa-solid fa-briefcase mr-5"></i>
                Môn Học: {detail.tenMH}
              </span>
              <span>
                <i class="fa-solid fa-phone mr-5"></i>
                Liên hệ: {detail.lopHoc[0].giaoVien.sdt}
              </span>
              <span>
                <i class="fa-solid fa-envelope mr-5"></i>
                Email:{detail.lopHoc[0].giaoVien.email}
              </span>
              <div className="btn-detail" key={detail.maMH}>
                <button className="btn-tuvan">TÔI CẦN TƯ VẤN</button>
                <button
                  className="btn-muangay"
                  onClick={() => {
                    addItem(item);
                    GioHang(detail);
                  }}
                >
                  Thêm Vào Giỏ Hàng
                </button>
              </div>
              <button
                className="btn-hocthu"
                onClick={() => alert("Vui lòng chọn bài học bên trái!!")}
              >
                Hoc Thu
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetail;
