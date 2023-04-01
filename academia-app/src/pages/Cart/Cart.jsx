import { integerPropType } from "@mui/utils";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import httpApi from "../../api/domain/httpApi";
import { AuthContext } from "../../context/AuthContext";
import "./CartAuto.css";
const Cart = () => {
  const { user: authUser } = useContext(AuthContext);
  const [news, SetNews] = useState([]);
  const [sale, setSale] = useState([]);
  const [xoa, setXoa] = useState([]);
  var statusGiam = true;
  const history = useNavigate();
  const [maSale, setMaSale] = useState(false);

  useEffect(() => {
    if (!authUser.email) {
      alert("Vui lòng đăng nhập để thực hiện chức năng này");
      history("/");
    }
  }, [authUser.email, history]);

  useEffect(() => {
    const callApi = async () => {
      httpApi.get(`/GioHang/GetGioHang?email=${authUser.email}`).then((res) => {
        SetNews(res.data.data.dsNoiDung);
      });
    };
    callApi();
  }, []);

  const totalPrice = () => {
    var sum = 0;

    news.map((v, i) => {
      sum += v.maMhNavigation.giaBan;
    });
    return sum;
  };

  const defaultDiscount = () => {
    return maSale.soTienGiam ? maSale.soTienGiam : 0;
  };

  const delGio = async (val) => {
    await httpApi
      .delete(`/GioHang/DelGio?email=${authUser.email}&mamh=${val.maMh}`)
      .then((res) => {
        alert("Xóa Thành Công");
        window.location.reload();
      })
      .catch((err) => alert("Xóa Thất Bại"));
  };
  const ThanhToan = async () => {
    await httpApi
      .post(`/GioHang/PostHoaDon?email=${authUser.email}&ma=${maSale.maSale}`)
      .then((res) => {
        if (res.data.message == "true") {
          alert("Đã Thanh Toán. Hệ thống sẽ kiểm tra trong ít phút !!");
          window.location.reload();
        } else if (res.data.message == "false") {
          alert(res.data.data);
        }
      })
      .catch((err) => {
        alert("Thanh Toán Thất Bại", err);
        console.log(err);
      });
  };
  const XemMa = async (e) => {
    if (!sale) {
      alert("Vui lòng nhập mã khuyến mãi");
    } else if (sale.length == 0) {
      alert("Vui lòng nhập mã khuyến mãi");
    } else {
      httpApi.get(`GioHang/HienThiMa?ma=${sale}`).then((res) => {
        if (res.data.message == "true") {
          setMaSale(res.data.data);
        } else {
          alert("Không tồn tại mã khuyến mãi này!!");
          window.location.reload();
        }
      });
    }
  };

  ///////////////////////////////////
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  if (news == false)
    return (
      <div className="bg-cart">
        <br></br>
        <br></br>
        <br></br>
        <img
          src={`${process.env.REACT_APP_URL_HINH}/background/iconCart.png`}
          style={{ width: "100px" }}
          alt=""
        />
        <h6>Không có sản phẩm nào trong giỏ hàng của bạn</h6>
        <button className="btn-tieptucmua">
          <Link to="/products" style={{ color: "white" }}>
            Tiếp tục mua sản phẩm
          </Link>
        </button>
      </div>
    );

  return (
    <div className="hjk">
      <Row style={{ width: "100%" }}>
        <Col md={9}>
          <div className="card" style={{ height: "100%" }}>
            <table>
              <thead className="text-muted">
                <tr className="small text-uppercase">
                  <th scope="col">Product</th>
                  <th scope="col" class="text-right" width="200">
                    Môn Học
                  </th>

                  <th scope="col" width="120">
                    Giá Bán
                  </th>
                  <th scope="col" className="text-right" width="200"></th>
                </tr>
              </thead>
              <tbody>
                {news &&
                  news.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <figure className="itemside">
                            <div className="aside">
                              <img
                                src={`http://localhost:44321/images/${item.maMhNavigation.hinhAnh}`}
                                className="img-sm"
                                height="100"
                                width="100"
                                alt=""
                              />
                            </div>
                          </figure>
                        </td>
                        <td>
                          <div className="info">
                            <a className="title text-dark">
                              Mã Môn:{item.maMhNavigation.maMH}
                            </a>
                            <p className="text-muted small">
                              {item.maMhNavigation.tenMH}
                            </p>
                          </div>
                        </td>

                        <td>
                          <div className="price-wrap">
                            <var className="price">
                              ${item.maMhNavigation.giaBan}
                            </var>
                            <br></br>
                            <small className="text-muted"> $315.20 each </small>
                          </div>
                        </td>
                        <td className="text-right">
                          <a
                            data-original-title="Save to Wishlist"
                            title=""
                            className="btn btn-light mr-2"
                            data-toggle="tooltip"
                          >
                            <i className="fa fa-heart"></i>
                          </a>
                          <a
                            className="btn btn-light"
                            onClick={() => delGio(item)}
                          >
                            Xóa
                          </a>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            <div className="card-body border-top">
              <Link to="/products" style={{ color: "white" }}>
                <a className="btn btn-light">
                  <i className="fa fa-chevron-left"></i> Continue shopping
                </a>
              </Link>
            </div>
            <div className="alert alert-success mt-3">
              <p className="icontext">
                <i className="icon text-success fa fa-truck"></i> Hệ Thống Sẽ
                Kiểm Tra Khi Thanh Toán Thành Công Ngay
              </p>
            </div>
          </div>
        </Col>
        <Col md={3} style={{ backgroundColor: "white" }}>
          <Row
            style={{
              width: "100%",
              height: "200px",
            }}
          >
            <div
              className="card"
              style={{
                width: "100%",
                height: "auto",
              }}
            >
              <div className="">
                <form>
                  <div className="form-group">
                    <Link to={`/khuyenmai`}>
                      {" "}
                      <label>Bạn đã có mã khuyến mãi chưa?</label>
                    </Link>

                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name=""
                        placeholder="Coupon code"
                        onChange={(e) => {
                          setSale(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </form>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    XemMa();
                  }}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </Row>
          <Row style={{ width: "100%" }}>
            <div className="card">
              <div className="card-body">
                <dl className="dlist-align">
                  <dt>Tổng Tiền:</dt>
                  <dd className="text-right">${totalPrice()}</dd>
                </dl>
                <dl>
                  <dt>Giảm Giá:</dt>
                  <dd className="text-right">$ {defaultDiscount()}</dd>
                </dl>
                <dl className="dlist-align">
                  <dt>Thành Tiền:</dt>
                  <dd className="text-right  h5">
                    <strong> ${totalPrice() - defaultDiscount()}</strong>
                  </dd>
                </dl>
                <div>
                  <a
                    className="btn btn-primary"
                    onClick={() => {
                      ThanhToan();
                    }}
                  >
                    Thanh Toán
                  </a>
                </div>

                <hr />
                <p className="text-center mb-3">
                  <img
                    src="https://www.lonite.ch/images/payment-methods.png"
                    height="50"
                    alt=""
                  />
                </p>
              </div>
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
