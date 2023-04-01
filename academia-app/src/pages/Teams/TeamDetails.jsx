import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import httpApi from "../../api/domain/httpApi";
import "./TeamDetails.css";
const TeamDetails = () => {
  const { maGv } = useParams();
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDetail = async () => {
      httpApi.get(`Teams/GetTemsDetail?maGv=${maGv}`).then((res) => {
        setDetail(res.data.data.dsNoiDung);
        setLoading(false);
      });
    };
    fetchDetail();
  }, []);
  if (loading === true) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    <div className="bg">
      <Container>
        <Row style={{ width: 1150 }}>
          <Col sm={8}>
            {detail &&
              detail.lophoc.map((item, key) => {
                return (
                  <Card className="bg-card" sx={{ maxWidth: 300 }}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={`${process.env.REACT_APP_URL_HINH}/images/${item.maMhNavigation.hinhAnh}`}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.maMhNavigation.tenMh}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Giá bán: ${item.maMhNavigation.giaBan}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        style={{ backgroundColor: "orange" }}
                      >
                        {" "}
                        <Link to={`/prodetail/${item.maMh}`}>Xem ngay</Link>
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
          </Col>
          <Col sm={4}>
            <div className="detail">
              <p>Thông tin Giảng Viên {detail.tenGv}</p>
              <h2 className="giaBan"></h2>
              <span>
                <i className="fa-solid fa-circle-user mr-5"></i>
                Giảng viên: {detail.tenGv}
              </span>
              <span>
                <i class="fa-solid fa-briefcase mr-5"></i>
                Địa chỉ: {detail.diachi}
              </span>
              <span>
                <i class="fa-solid fa-phone mr-5"></i>
                Liên hệ: {detail.sdt}
              </span>
              <span>
                <i class="fa-solid fa-envelope mr-5"></i>
                Email: {detail.email}
              </span>
              <div className="btn-detail">
                <CardMedia
                  component="img"
                  width="200"
                  height="194"
                  image={`${process.env.REACT_APP_URL_HINH}/giaovien/${detail.hinhAnhGv}`}
                  alt="Paella dish"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TeamDetails;
