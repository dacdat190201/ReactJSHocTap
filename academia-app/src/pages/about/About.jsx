import React from "react";
import "./About.css";
import mainImages from "../../api/domain/mainImages";
export const About = () => {
  console.log(process.env);
  return (
    <div className="bg-about">
      <div className="section1">
        <div className="container1">
          <div className="content-section1">
            <div className="title1">
              <h1>Về Chúng Tôi</h1>
            </div>
            <div className="content">
              <h3>
                Chúng tôi "Academia" xin hân hạnh được đồng hành cùng quý khách
                hàng
              </h3>
              <p>
                Academia là một website hỗ trợ học tập, giúp khách hàng củng cố
                được kiến thức. Những bài học quý giá được tập hợp tại nhiều nơi
                từ những nguồn giáo viên dạy giỏi trên cả nước. Sẽ giúp cho quý
                khách hàng có thêm kiến thức và đạt điểm cao trong các kì thi
                sau.
              </p>
              <div className="button1">
                <a href>Đọc</a>
              </div>
            </div>
            <div className="social1">
              <a href>
                <i className="fab fa-facebook-f" />
              </a>
              <a href>
                <i className="fab fa-twitter" />
              </a>
              <a href>
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
          <div className="image-section1">
            <img
              src={`${process.env.REACT_APP_URL_HINH}/background/hoctap.webp`}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
