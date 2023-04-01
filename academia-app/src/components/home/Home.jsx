import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import { Hero } from "./Hero";
import "./Home.css";
import { Link } from "react-router-dom";
import httpApi from "../../api/domain/httpApi";
import Project from "../../pages/home2/Project";
export const Home = () => {
  // const [defaultImage, setDefaultImage] = useState({});
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchDetail = async () => {
      httpApi.get("/MonHoc/Get8MonHoc").then((res) => {
        setUser(res.data.data);
      });
    };
    fetchDetail();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
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
    <>
      <Hero />

      <div className="bg-home">
        <div style={{ backgroundColor: "white", height: 50 }}>
          <h4>
            <span className="line-ct">Môn học mới</span>
          </h4>
        </div>

        <div className="App">
          <Slider {...settings}>
            {user &&
              user.map((item) => (
                <Link to={`/prodetail/${item.maMh}`} style={{ color: "black" }}>
                  <div className="card">
                    <div className="card-top">
                      <img
                        src={`${process.env.REACT_APP_URL_HINH}/images/${item.hinhAnh}`}
                        alt=""
                      />
                      <h1>{item.tenMh}</h1>
                    </div>
                    <div className="card-bottom">
                      <h3>{item.giaBan}</h3>
                      <span className="category">Xem chi tiết</span>
                    </div>
                  </div>
                </Link>
              ))}
          </Slider>
        </div>
        <hr></hr>
        <Project />
      </div>
    </>
  );
};
