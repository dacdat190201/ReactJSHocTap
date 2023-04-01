import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import httpApi from "../../api/domain/httpApi";
import { AuthContext } from "../../context/AuthContext";
import "./ListProduct.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import StarBorderIcon from "@mui/icons-material/StarBorder";
const ListProduct = ({ props, item }) => {
  const { addItem } = useCart();
  const { user: authUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const VND = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const GioHang = async (props) => {
    if (!authUser.email) {
      alert("Vui lòng đăng nhập để thực hiện chức năng này");
    } else {
      await httpApi
        .post(`/GioHang/PostGioHang?email=${authUser.email}`, {
          MaMh: props.maMH,
        })
        .then((res) => {
          alert("Mua thành công");
        })
        .catch((err) =>
          alert("Môn học đã có trong giỏ hàng hoặc đã thanh toán")
        );
    }
  };
  if (!loading) {
    return <div>loading</div>;
  }
  return (
    <div className="productList">
      <div className="productCard">
        <Link to={`/prodetail/${props.maMH}`}>
          <img
            src={`${process.env.REACT_APP_URL_HINH}/images/${props.hinhAnh}`}
            alt="product-img"
            className="productImage"
          />

          <BookmarkIcon className={"productCard__cart"} />
          <WhatshotIcon className={"productCard__fastSelling"} />
        </Link>
        <div className="productCard__content">
          <Link to={`/prodetail/${props.maMH}`}>
            <h3 className="productName">{props.tenMH}</h3>
            <div className="displayStack__1">
              <div className="productPrice">{VND.format(props.giaBan)}</div>
              <div className="productSales"></div>
            </div>
          </Link>
          <div className="displayStack__2">
            <div className="productRating">
              <StarBorderIcon />
            </div>
            <div
              className="productTime"
              onClick={() => {
                addItem(item);
                GioHang(props);
              }}
            >
              <ShoppingCartIcon /> Thêm Vào Giỏ Hàng
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
