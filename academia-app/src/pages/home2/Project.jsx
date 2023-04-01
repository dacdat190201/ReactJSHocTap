import React, { useEffect, useState } from "react";
import "./Project.css";
import colorSharp2 from "../../assets/img/color-sharp2.png";
import { Col, Container, Nav, Row, Spinner, Tab } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import ProjectCard from "./ProjectCard";
import httpApi from "../../api/domain/httpApi";
import GiaoVien from "./GiaoVien";
import ListKhuyenMai from "../khuyenmai/ListKhuyenMai";
const Project = () => {
  const [projects, setProject] = useState();
  const [loading, setLoading] = useState(true);
  const [giaovien, setGiaoVien] = useState();
  useEffect(() => {
    const fetch = async () => {
      httpApi.get("/Mobile/GetAllChuDe").then((res) => {
        if (res.data.message === "true") {
          setProject(res.data.data);
          setLoading(false);
        }
      });
    };
    fetch();
  }, []);
  useEffect(() => {
    const fetchG = async () => {
      httpApi.get("/Teams/Get6GiaoVien").then((res) => {
        if (res.data.message === "true") {
          setGiaoVien(res.data.data);
          setLoading(false);
        }
      });
    };
    fetchG();
  }, []);
  if (loading === true) {
    return <Spinner animation="border" role="status"></Spinner>;
  }
  return (
    <section className="project" id="project">
      <Container>
        <Row style={{ width: 1276 }}>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Chủ Đề</h2>
                  <p>
                    Bạn không thể làm vừa ý tất cả mọi người, và không phải ai
                    nói gì cũng đúng. Thiên hạ khen chê là chuyện thường tình,
                    tốt nhất là không nên vin vào đó mà nhìn nhận bản thân. Việc
                    mình làm tự biết là tốt hay dở, mỗi ngày cố gắng trở thành
                    một chính mình tốt hơn là được rồi. Các chủ đề này trang bị
                    các kiến thức tốt cho bạn!!
                  </p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav
                      variant="pills"
                      className="nav-pills mb-5 justify-content-center align-items-center"
                      id="pills-tab"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="first">Danh Sách Chủ Đề</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Đội Ngũ Giáo Viên</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Khuyến Mãi</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content
                      style={{ marginLeft: 70 }}
                      id="slideInUp"
                      className={
                        isVisible ? "animate__animated animate__slideInUp" : ""
                      }
                    >
                      <Tab.Pane eventKey="first">
                        <Row style={{ width: 1100 }}>
                          {projects &&
                            projects.map((project, index) => {
                              return (
                                <ProjectCard key={index} props={project} />
                              );
                            })}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <Row style={{ width: 1100 }}>
                          {giaovien &&
                            giaovien.map((giaovien, index) => {
                              return <GiaoVien key={index} props={giaovien} />;
                            })}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <ListKhuyenMai />
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  );
};

export default Project;
