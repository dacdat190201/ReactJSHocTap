// import axios from 'axios';
// import React, { useState } from 'react'
// import "./AddMonHoc.css"
// const AddMonHoc = () => {
//   const[TenMH, setTenMH] = useState()
//   const[HinhAnh, setHinhAnh] = useState()
//   const[SoLuong, setSoLuong] = useState()
//   const[GiaBan, setGiaBan] = useState()
//   const postMonHoc =async (event)=>{
//     event.preventDefault();
//     await axios.post("https://localhost:44321/monhoc/PostMonHoc",{
//       TenMH : TenMH,
//       HinhAnh:HinhAnh,
//       SoLuong:SoLuong,
//       GiaBan:GiaBan
//     }).then(res =>
//       alert("Thêm thành công")).catch(err => console.error(err))
//   }
//   // const addMH = async(event) => 
//   // {
//   //   event.preventDefault();//Đợi để xử lí
//   //   console.log(event.target)
//   //   const TenMH = event.target[0].value;
//   //   const HinhAnh = event.target[1].value;
//   //   const SoLuong = event.target[2].value;
//   //   const GiaBan = event.target[3].value;
//   //   try{
//   //     await addMonHoc({
//   //       //Đặt cùng tên với API
//   //       TenMH:TenMH,
//   //       HinhAnh:HinhAnh,
//   //       SoLuong:SoLuong,
//   //       GiaBan:GiaBan
//   //     })
//   //     window.alert("Thêm Thành Công")
//   //   }catch(err)
//   //   {
//   //     console.error(err)
//   //   }
//   // }
//   return (
//     <form>
//         <fieldset>
//           <legend><h2>THÊM MÔN HỌC</h2></legend>
//           <div>
//             <label>Tên Môn Học</label>
//             <input type="text" placeholder="Nhập môn học" name='TenMH' value={TenMH} onChange={(event)=>{setTenMH(event.target.value)}}/>
//           </div>
//           <br/>
//           <div>
//             <label>Hình Ảnh</label>
//             <input type="text" placeholder="Nhập Hình Ảnh" name='HinhAnh' value={HinhAnh} onChange={(event)=>{setHinhAnh(event.target.value)}} />
//           </div>
//           <br/>
//           <div>
//             <label>Số lượng khóa học</label>
//             <input type="text" placeholder="Nhập Số Lượng" name='SoLuong' value={SoLuong} onChange={(event)=>{setSoLuong(event.target.value)}} />
//           </div>
//           <br/>
//           <div>
//             <label>Giá Bán</label>
//             <input type="text" placeholder="Giá Bán" name='GiaBan' value={GiaBan} onChange={(event)=>{setGiaBan(event.target.value)}}/>
//           </div>
//           <br/>
//           <div>
//             <label>Default file input example</label>
//             <input  type="file" id="formFile" />
//           </div>
//           <br/>
//         </fieldset>
//         <button type="submit" onClick={postMonHoc}>Submit</button>
//       </form>
//   )
// }

// export default AddMonHoc