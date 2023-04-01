import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <section className="newletter">
        <div className="container flexSB">
          <div className="left row">
            <h1>Newsletter - Stay tune and get the latest update</h1>
            <span>Far far away, behind the word mountains</span>
          </div>
          <div className="right row">
            <input type="text" placeholder="Enter email address" />
            <i className="fa fa-paper-plane"></i>
          </div>
        </div>
      </section>
      <footer>
        <div className="container padding">
          <div className="box logo">
            <h1>ACADEMIA</h1>
            <span>ONLINE EDUCATION & LEARNING</span>
            <p>Mọi thắc mắc xin vui lòng liên hệ đến chúng tôi</p>

            <i className="fab fa-facebook-f icon"></i>
            <i className="fab fa-twitter icon"></i>
            <i className="fab fa-instagram icon"></i>
          </div>
          <div className="box link">
            <h3>Mở rộng</h3>
            <ul>
              <li>Về chúng tôi</li>
              <li>Dịch vụ</li>
              <li>Khóa học</li>
              <li>Liên Hệ</li>
            </ul>
          </div>
          <div className="box link">
            <h3>Khám phá</h3>
            <ul>
              <li>Về chúng tôi</li>
              <li>Teams</li>
              <li>Khóa học</li>
              <li>Liên Hệ</li>
              <li>Feedbacks</li>
            </ul>
          </div>
          <div className="box">
            <h3>Recent Post</h3>
            <ul>
              <li>Về chúng tôi</li>
              <li>Teams</li>
              <li>Khóa học</li>
              <li>Liên Hệ</li>
              <li>Feedbacks</li>
            </ul>
          </div>
          <div className="box last">
            <h3>Bạn có câu hỏi nào không?</h3>
            <ul>
              <li>
                <i className="fa fa-map"></i>
                140 Lê Trọng Tấn, phường Tây Thạnh, Tân Phú, TP.HCM
              </li>
              <li>
                <i className="fa fa-phone-alt"></i>
                +84 966519397
              </li>
              <li>
                <i className="fa fa-paper-plane"></i>
                dacdat190201@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="legal">
        <p>
          Copyright ©2022 All rights | This website is made with{" "}
          <i className="fa fa-heart"></i> by dacdat190201@gmail.com
        </p>
      </div>
    </>
  );
};

export default Footer;
