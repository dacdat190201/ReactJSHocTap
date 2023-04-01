// import React, { useEffect, useState } from 'react'
// import "./QLMonHoc.css"
// import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
// import AddMonHoc from './AddMonHoc';
// import httpProduct from '../../../api/productAPI/productAPI';
// const QLMonHoc = () => {
//   //const[row, setRow] = useState([]);
//   const[news, SetNews]=useState([])
//   useEffect(()=>{
//     const callApi= async ()=>{
//       httpProduct.get("/GetMonhocAllAsync").then(res => {
//       SetNews(res.data.payload.result)
//       console.log(news)
//     })}
//     callApi()
//   },[])
//   return ( 
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 Mã Môn Học
//               </TableCell>
//               <TableCell>
//                 Tên Môn Học
//               </TableCell>
//               <TableCell>
//                 Hình Ảnh
//               </TableCell>
//               <TableCell>
//                 Số Lượng
//               </TableCell>
//               <TableCell>
//                 Giá Bán
//               </TableCell>
//               <TableCell>
//                 Xử Lí
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//           {
//           news &&
//           news.map((item,key)=>{
//             return(
//                   <tr>
//                     <th align='left'>{item.maMH}</th>
//                     <th align='left'>{item.tenMH}</th>
//                     <th align='left'><img src={`https://localhost:44321/images/${item.hinhAnh}`} style={{width:"90px", height:"120px"}}/></th>
//                     <th align='left'>{item.soLuong}</th>
//                     <th align='left'>{item.giaBan}</th>
//                     <th align='left'><button style={{backgroundColor:'orange'}}>Xóa</button></th>
//                   </tr>
//             )
//           })
//         }
//         </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={"rows.length"}
//         rowsPerPage={"rowsPerPage"}
//         page={"page"}
//         onPageChange={"handleChangePage"}
//         onRowsPerPageChange={"handleChangeRowsPerPage"}
//       />
//       <AddMonHoc/>
//     </Paper>
    
//   )
// }

// export default QLMonHoc