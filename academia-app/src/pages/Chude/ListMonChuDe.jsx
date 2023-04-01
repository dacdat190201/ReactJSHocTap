import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import httpApi from "../../api/domain/httpApi";
import Filters from "../Filter/Filters";
import ListProduct from "../Products/ListProduct";
import Chude from "./Chude";
import "./ListMonChuDe.css";
const ListMonChuDe = () => {
  const { maChuDe } = useParams();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [activePrices, setActivePrices] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      httpApi.get(`/Mobile/GetMonHocChuDe?maChuDe=${maChuDe}`).then((res) => {
        setProducts(res.data.data.dsNoiDung);
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

export default ListMonChuDe;
