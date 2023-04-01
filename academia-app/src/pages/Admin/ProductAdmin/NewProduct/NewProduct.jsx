import { isContentEditable } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import httpApi from "../../../../api/domain/httpApi";
import "./NewProduct.css";
const NewProduct = () => {
  const history = useNavigate();
  const [tenMH, setTenMH] = useState();
  const [giaBan, setGiaBan] = useState();
  const [news, SetNews] = useState([]);
  const [chude, setChuDe] = useState([]);
  useEffect(() => {
    const callApi = async () => {
      httpApi.get("/Monhoc/GetChuDe").then((res) => {
        SetNews(res.data.data);
        console.log(res.data.data);
      });
    };
    callApi();
  }, []);
  const handleCreate = (event) => {
    event.preventDefault();
    if (
      tenMH !== "" &&
      giaBan !== "" &&
      tenMH !== undefined &&
      giaBan !== undefined &&
      chude !== "vuilong" &&
      chude !== undefined
    ) {
      httpApi.post("/Monhoc/PostMonHoc", {
        //Đặt cùng tên với API
        TenMH: tenMH,
        GiaBan: giaBan,
        MaChuDe: chude,
      });

      window.alert("Thêm Thành Công");
      history("/Admin/ListProduct");
    } else {
      window.alert("Không được để trống !!!");
    }
  };
  // const handleCreate = async (event) => {
  //   event.preventDefault();
  //   if (tenMH !== "" && giaBan !== "") {
  //     try {
  //       await httpApi
  //         .post("/Monhoc/PostMonHoc", {
  //           //Đặt cùng tên với API
  //           TenMH: tenMH,
  //           GiaBan: giaBan,
  //           MaChuDe: chude,
  //         })
  //         .then((res) => {
  //           window.alert("Thêm Thành Công");
  //           history("/Admin/ListProduct");
  //           console.log("post", res);
  //         });
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   } else {
  //     window.alert("Không được để trống !!!");
  //   }
  // };
  return (
    <div>
      <div className="newProduct">
        <div className="productTitleContainer">
          <h1 className="productTitle">Môn Học</h1>
          <Link to="/Admin/ChuDe">
            <button className="productAddButton">Chủ Đề</button>
          </Link>
        </div>
        <form className="addProductForm">
          <div className="addProductItem">
            <label>Tên Môn Học</label>
            <input
              type="text"
              placeholder="nhập tên"
              onChange={(e) => {
                setTenMH(e.target.value);
              }}
            />
          </div>
          <div className="addProductItem">
            <label>Giá Bán</label>
            <input
              type="number"
              placeholder="giá bán"
              onChange={(e) => {
                setGiaBan(e.target.value);
              }}
            />
          </div>
          <div className="addProductItem">
            <label>Chủ Đề</label>
            <select
              name="active"
              id="active"
              onChange={(e) => {
                setChuDe(e.target.value);
              }}
            >
              <option value="vuilong">Vui lòng chọn</option>;
              {news &&
                news.map((item, key) => {
                  return <option value={item.maChuDe}>{item.tenChuDe}</option>;
                })}
            </select>
          </div>
          <button className="addProductButton" onClick={handleCreate}>
            Thêm Mới
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
