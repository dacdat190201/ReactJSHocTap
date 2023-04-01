// import React, { useState, useEffect, useContext } from "react";
// import {
//   Form,
//   Button,
//   Col,
//   Container,
//   Row,
//   Spinner,
//   Toast,
// } from "react-bootstrap";
// import httpApi from "../../../api/domain/httpApi";
// import { AuthContext } from "../../../context/AuthContext";
// import { Link, useNavigate, useParams } from "react-router-dom";

// const AddNoiDung = () => {
//   const [loading, setLoading] = useState(true);
//   const [lstMonHoc, setLstMonHoc] = useState([]);
//   const [maMH, setMaMH] = useState();
//   const [tenDeThi, setTenDeThi] = useState();
//   const [show, setShow] = useState(false);
//   const [maDe, setMaDe] = useState();
//   const [tenChuong, setTenChuong] = useState();
//   const [chuong, setChuong] = useState();
//   const [noiDung, setNoiDung] = useState();

//   useEffect(() => {
//     const fectLstMonHoc = async () => {
//       await httpApi.get(`/MonHoc/GetMonhocAllAsync`).then((res) => {
//         setLstMonHoc(res.data.data.result);
//         setLoading(false);
//         console.log(res.data, "Môn Học");
//       });
//     };

//     fectLstMonHoc();
//   }, []);
//   const fetchDeThi = async (maMH) => {
//     await httpApi.get(`/Chuong/GetAllChuong?MaMH=${maMH}`).then((res) => {
//       setChuong(res.data.data);
//       console.log(res.data.data, "Đề thi");
//     });
//   };
//   const loadComboboxMonHoc = (MaMH) => {
//     window.alert(maMH);
//     if (maMH != null) fetchMonHoc(MaMH);
//   };

//   const postChuong = async () => {
//     var kiemTra = {
//       TenChuong: tenChuong,
//       MaMH: maMH,
//     };
//     await httpApi({
//       method: "post",
//       url: `/Chuong/PostChuong`,
//       data: kiemTra,
//     })
//       .then((res) => {
//         alert("Thêm thành công!");
//         layTatCaChuong();
//       })
//       .catch((err) => console.error(err));
//     setShow(true);
//   };
//   const layTatCaChuong = async (MaMH) => {
//     await httpApi({
//       method: "get",
//       url: `/Chuong/GetAllDeThi${MaMH}`,
//     })
//       .then((res) => {
//         setMaDe;
//       })
//       .catch((err) => console.error(err));
//     setShow(true);
//   };
//   // const onClickThem = () => {
//   //   if (maBH == null && maMH == null) alert("Vui lòng chọn loại đề kiểm tra!");
//   //   else {
//   //     window.alert(
//   //       maBH + ";" + maMH + ";" + tenDeThi + " ; " + thoiGian + " ; " + soLuong
//   //     );
//   //     postDeThi();
//   //   }
//   // };
//   return (
//     <div className="bg">
//       <Container>
//         <h2>Tạo Mới Chương</h2>
//         <br />

//         <Container fluid>
//           <div>
//             <Row style={{ width: 550 }}>
//               <Col>
//                 <h4>Danh sách môn học:</h4>
//               </Col>
//               <br />
//               <Col>
//                 <Form.Select
//                   size="lg"
//                   onChange={(e) => {
//                     loadComboboxMonHoc(e.target.value);
//                     setMaMH(e.target.value);
//                   }}
//                 >
//                   {lstMonHoc &&
//                     lstMonHoc.map((v, i) => {
//                       return <option value={v.maMH}>{v.tenMH}</option>;
//                     })}
//                 </Form.Select>
//               </Col>
//             </Row>
//           </div>
//           <br />
//           <div>
//             <form>
//               <div>
//                 <br />
//                 <Row style={{ width: `100%` }}>
//                   <Col
//                     md={{ span: 2 }}
//                     style={{ padding: "8px", marginLeft: 100 }}
//                   >
//                     <p>Tên Chương: </p>
//                   </Col>
//                   <Col md={{ span: 8 }} style={{ padding: "8px" }}>
//                     <Form.Control
//                       type="text"
//                       placeholder="Nhập Chương"
//                       id="txtTenDT"
//                       name="txtTenDT"
//                       onChange={(e) => {
//                         setChuong(e.target.value);
//                       }}
//                     />
//                   </Col>
//                 </Row>
//                 <br />
//                 <Row style={{ width: `100%` }}>
//                   <Col
//                     md={{ span: 2 }}
//                     style={{ padding: "8px", marginLeft: 100 }}
//                   >
//                     Số lượng bài học:{" "}
//                   </Col>
//                 </Row>

//                 <br />
//                 <Row>
//                   <Col></Col>
//                   <Col>
//                     {show ? (
//                       <Button variant="info">
//                         <Link to={`/Admin/ThemCauHoi/${maDe}`}>
//                           Thêm Bài Học
//                         </Link>
//                       </Button>
//                     ) : (
//                       <Button
//                         variant="success"
//                         // onClick={(e) => {
//                         //   onClickThem();
//                         // }}
//                       >
//                         Thêm
//                       </Button>
//                     )}
//                   </Col>
//                   <Col></Col>
//                 </Row>
//               </div>
//               <br />
//             </form>
//           </div>
//         </Container>
//       </Container>
//     </div>
//   );
// };

// export default AddNoiDung;
