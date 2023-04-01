import { Avatar } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import httpApi from "../../api/domain/httpApi";
import "./Chude.css";
const Chude = () => {
  const [chude, setChuDe] = useState();

  useEffect(() => {
    const fetchDetail = async () => {
      httpApi.get("/Mobile/GetAllChuDe").then((res) => {
        setChuDe(res.data.data);
      });
    };
    fetchDetail();
  }, [chude]);
  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 10);
  }
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-chude-bg">
      <p className="line-ct ">Danh Sách Chủ đề</p>
      <div className="bg-chude-bg1">
        <Slider {...settings}>
          {chude &&
            chude.map((item) => (
              <Link to={`/chude/${item.maChuDe}`} onClick={refreshPage}>
                <div>
                  <Avatar
                    src={`${process.env.REACT_APP_URL_HINH}/images/${item.images}`}
                    alt=""
                    sx={{ width: 56, height: 56 }}
                  />
                  <p style={{ fontSize: 10 }}>{item.tenChuDe}</p>
                </div>
              </Link>
            ))}
          <Link to="/products">
            <div>Xem Tất Cả</div>
          </Link>
        </Slider>
      </div>
    </div>
  );
};

export default Chude;
