import React, { useEffect, useState } from "react";
import "./Hero.css";
import { Title } from "../title/Title";
export const Hero = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [
    "Trang Học Tập Online Đỉnh Cao",
    "I'm Dat - Administrator",
    "Website Thư Viện Cuộc Sống",
  ];
  const period = 2000;
  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };
  return (
    <>
      <div>
        <section className="hero">
          <div className="container">
            <div className="row">
              {/* <Title
                subtitle="WELCOME TO ACADEMIA"
                title="Best Online Education"
              /> */}
              <h3>{`CHÀO MỪNG ĐẾN VỚI ACADEMIA`} </h3>
              <h1>{text}</h1>
              <p>
                Học tập là hạt giống của kiến thức, kiến thức là hạt giống của
                hạnh phúc. Giáo dục là vũ khí mạnh nhất mà người ta có thể sử
                dụng để thay đổi cả thế giới
              </p>
              <div className="button">
                <button className="primary-btn">
                  BẮT ĐẦU NGAY
                  <i className="fa fa-long-arrow-alt-right"></i>
                </button>
                <button>
                  THAM QUAN <i className="fa fa-long-arrow-alt-right"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="marigin"></div>
    </>
  );
};
