import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { Head } from "./Head";
import { AuthContext } from "../../../context/AuthContext";
import { Nav, NavDropdown } from "react-bootstrap";
import httpApi from "../../../api/domain/httpApi";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../../features/auth.slice";
import { Bolt } from "@mui/icons-material";

export const Header = () => {
  const { isLogin, payload } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [value, setValue] = useState("");
  const [products, setProducts] = useState([]);
  const onChange = (event) => {
    setValue(event.target.value);
  };
  const onSearch = (searchTerm) => {
    setValue(searchTerm);
  };

  useEffect(() => {
    const fetchDetail = async () => {
      httpApi.get("/Monhoc/GetMonhocAllAsync").then((res) => {
        setProducts(res.data.data.result);
      });
    };
    fetchDetail();
  }, []);
  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 10);
  }
  return (
    <>
      <Head />
      <header>
        <nav className="flexSB">
          <ul
            className={click ? "mobile-nav" : "flexSB"}
            onClick={() => setClick(false)}
          >
            {/* Để hiện trên layout, cần bắt buộc có Router chính */}
            <li>
              <Link to="/home">Trang Chủ</Link>
            </li>
            <li>
              <Link to="/products">Khóa Học</Link>
            </li>
            <li>
              <Link to="/teams">Giảng Viên</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <div className="searchbox">
            <input
              className="input-search"
              placeholder="Tìm Kiếm Ngay ..."
              type="text"
              onChange={onChange}
            />{" "}
            <i class="fa-sharp fa-solid fa-magnifying-glass loading"></i>
            {/* <button  onClick={()=>onSearch(value)}>
                        <i class="fa-sharp fa-solid fa-magnifying-glass loading"></i>
                    </button> */}
          </div>

          <div className="start">
            <div className="button">
              {isLogin && payload ? (
                <Nav>
                  <NavDropdown
                    style={{
                      marginTop: "-25px",
                    }}
                    title={`Hi, ${user.email}`}
                    className="font-chu-header"
                  >
                    <NavDropdown.Item>
                      <Link to={`/user/${payload.email}/product`}>
                        Trang của tôi
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => dispatch(resetState())}>
                      Thoát
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              ) : (
                <Link to="/signin">
                  <p style={{ color: "white" }}>Đăng Nhập</p>
                </Link>
              )}
            </div>
          </div>
          {/* menu cho điện thoại */}
          <button className="toggle" onClick={() => setClick(!click)}>
            {click ? (
              <i className="fa fa-times"></i>
            ) : (
              <i className="fa fa-bars"></i>
            )}
          </button>
        </nav>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 searchdesign">
              <table className="table-css table-light table-hover m-0 w-100">
                <tbody>
                  {products
                    .filter((item) => {
                      const searchTerm = value.toLowerCase();
                      const name = item.tenMH.toLowerCase();

                      return (
                        searchTerm &&
                        name.startsWith(searchTerm) &&
                        name !== searchTerm
                      );
                    })
                    .slice(0, 10)
                    .map((item) => (
                      <Link
                        to={`/prodetail/${item.maMH}`}
                        style={{ color: "white" }}
                        onClick={refreshPage}
                      >
                        <tr
                          key={item.tenMH}
                          onClick={() => onSearch(item.tenMH)}
                        >
                          <td style={{ width: 200 }}>
                            {" "}
                            <img
                              src={`${process.env.REACT_APP_URL_HINH}/images/${item.hinhAnh}`}
                              style={{ height: "6rem", width: "4rem" }}
                              alt=""
                            />
                          </td>
                          <td style={{ width: 200 }}> {item.tenMH}</td>
                        </tr>
                        <hr></hr>
                      </Link>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
