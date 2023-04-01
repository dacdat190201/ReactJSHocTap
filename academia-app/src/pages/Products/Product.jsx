import React, { useContext, useEffect, useState } from "react";
import httpApi from "../../api/domain/httpApi";
import { AuthContext } from "../../context/AuthContext";
import Chude from "../Chude/Chude";
import Filters from "../Filter/Filters";
import ListProduct from "./ListProduct";
import "./Product.css";
const Product = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [activePrices, setActivePrices] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      httpApi.get("/Monhoc/GetMonhocAllAsync").then((res) => {
        setProducts(res.data.data.result);
      });
    };
    fetchDetail();
  }, []);

  return (
    <div>
      <Chude />
      <Filters
        products={products}
        setFilters={setFilters}
        activePrices={activePrices}
        setActivePrices={setActivePrices}
      />
      <div className="DanhSach">
        {filters.map((item, index) => {
          let p = {
            id: item.maMH,
            img: item.hinhAnh,
            name: item.tenMH,
            price: item.giaBan,
          };
          return (
            <ListProduct
              id={item.maMH}
              hinhAnh={item.hinhAnh}
              tenMH={item.tenMH}
              giaBan={item.giaBan}
              key={item.maMH}
              props={item}
              item={p}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Product;
