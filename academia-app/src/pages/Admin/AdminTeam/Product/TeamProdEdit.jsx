import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PublishIcon from "@mui/icons-material/Publish";
import { Spinner } from "react-bootstrap";
import httpApi from "../../../../api/domain/httpApi";
const TeamProdEdit = () => {
  const { maMH } = useParams();
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState();
  const [news, SetNews] = useState([]);
  const [tenMh, setTenMh] = useState();
  const [giaBan, setGiaBan] = useState();
  const [chude, setChuDe] = useState([]);
  const [maCD, setMaCD] = useState([]);
  useEffect(() => {
    const callApi = async () => {
      httpApi.get("/Monhoc/GetChuDe").then((res) => {
        setChuDe(res.data.data);
      });
    };
    callApi();
  }, []);
  useEffect(() => {
    const callApi = async () => {
      httpApi.get(`/Monhoc/GetMonhocAsync?MaMh=${maMH}`).then((res) => {
        SetNews(res.data.data);
        setLoading(false);
      });
    };
    callApi();
  }, []);
  const handleUpdateImages = async (e) => {
    const formData = new FormData();
    formData.append("File", image);
    await httpApi
      .put(`/Admin/UpdateHinhAnhProduct?maMh=${maMH}`, formData)
      .then((res) => alert("Cập nhật thành công"))
      .catch((err) => console.error(err));
    window.location.reload();
  };
  const editMonHoc = async (e) => {
    await httpApi
      .put(`/Admin/EditMon?maMh=${maMH}`, {
        TenMH: tenMh,
        GiaBan: giaBan,
        MaChuDe: maCD,
      })
      .then((res) => alert("Sửa thành công"))
      .catch((err) => console.error(err));
  };
  if (loading === true) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Môn Học</h1>
        <Link to="/Giaovien/Listproduct/Newproduct">
          <button className="productAddButton">Thêm Mới</button>
        </Link>
      </div>
      <div className="productTop">
        {/* <div className="productTopLeft">
          <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
          Dang bi y tuong
        </div>
        <div className="productTopRight"> */}
        <div className="productTopLeft">
          <div className="productInfoTop">
            <img
              src={`${process.env.REACT_APP_URL_HINH}/Images/${news.hinhAnh}`}
              alt=""
              className="productInfoImg"
            />
            <span className="productName">{news.tenMh}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{news.maMh}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">giá bán</span>
              <span className="productInfoValue">{news.giaBan}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              placeholder={news.tenMh}
              onChange={(e) => {
                setTenMh(e.target.value);
              }}
            />
            <label>Giá Bán</label>
            <input
              type="text"
              placeholder={news.giaBan}
              onChange={(e) => {
                setGiaBan(e.target.value);
              }}
            />
            <label>Chủ Đề</label>
            <select
              name="active"
              id="active"
              onChange={(e) => {
                setMaCD(e.target.value);
              }}
            >
              <option value="vuilong">Vui lòng chọn</option>;
              {chude &&
                chude.map((item, key) => {
                  return <option value={item.maChuDe}>{item.tenChuDe}</option>;
                })}
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={`${process.env.REACT_APP_URL_HINH}/Images/${news.hinhAnh}`}
                alt=""
                className="productUploadImg"
              />
              <label for="file">
                <PublishIcon />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                name="File"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
              <button className="productButton" onClick={handleUpdateImages}>
                Cập nhật
              </button>
            </div>
            <button
              className="productButton"
              onClick={() => {
                editMonHoc();
              }}
            >
              Chỉnh sửa
            </button>
            <Link to={`/Giaovien/LopHoc`}>
              <button className="productButton"> Xem Lớp Học</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamProdEdit;
