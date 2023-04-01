import React, { useEffect, useState } from "react";
import httpApi from "../../../api/domain/httpApi";
import "./NoiDungBaiHoc.css";
const NoiDungBaiHoc = ({ noiDung }) => {
  const [baihoc, SetBaiHoc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(false);
  useEffect(() => {
    const fetchBaiHoc = async () => {
      httpApi
        .get(`/Monhoc/MonHocCauHoiDetail?MaBH=${noiDung.maBh}`)
        .then((res) => {
          SetBaiHoc(res.data.data.dsNoiDung);
          setLoading(false);
        });
    };
    fetchBaiHoc();
  }, []);
  if (loading === true) {
    return <div>loading....</div>;
  }
  if (baihoc == null) {
    return (
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="border-cauhoi">
          <h6
            style={{
              textAlign: "center",
              textDecorationLine: "underline",
              color: "Highlight",
            }}
          >
            Câu hỏi chưa sẳn sàng, vui lòng chọn bài học khác
          </h6>
        </div>
      </div>
    );
  }
  return (
    <div className="bg">
      <hr></hr>
      <div className="border-cauhoi">
        <h6
          style={{
            textAlign: "center",
            textDecorationLine: "underline",
            color: "Highlight",
          }}
          onClick={() => setRender(!render)}
        >
          Câu Hỏi Ôn Tập (Click vào đây)
        </h6>
        <div>
          {render &&
            baihoc &&
            baihoc.dethicauhoi.map((item, key) => {
              return (
                <div>
                  <h6>Câu hỏi</h6>
                  <div className="cauhoi">
                    <div>
                      <p>(.): ' {item.cauHoi.tenCauHoi} ? '</p>
                      <p style={{ color: "darkgoldenrod" }}>
                        Đáp án: {item.cauHoi.dapAn}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default NoiDungBaiHoc;
