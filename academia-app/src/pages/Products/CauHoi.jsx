import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import httpApi from "../../api/domain/httpApi";
import "./CauHoi.css";
const CauHoi = ({ noiDung }) => {
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
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (baihoc === null) {
    return <div>Câu hỏi chưa sẵn sàng</div>;
  }
  return (
    <div>
      <div></div>
      <hr></hr>
      <h4 onClick={() => setRender(!render)}>
        Ôn tập bài học (Click vào đây!!)
      </h4>
      <div>
        {render &&
          baihoc &&
          baihoc.dethicauhoi.map((item, key) => {
            return (
              <div>
                <h6>Câu hỏi</h6>
                <div className="cauhoi">
                  <div>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item.cauHoi.tenCauHoi,
                      }}
                    />

                    <p style={{ color: "darkgoldenrod" }}>
                      Đáp án: {item.cauHoi.dapAn}
                    </p>
                    <p>Giải thích: {item.cauHoi.giaiThich} </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CauHoi;
