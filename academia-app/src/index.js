import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/home/Home";
import AuthProvider from "./context/AuthContext";
import "./index.css";
import App from "./layout/AppLayout/App";
import AcountLayout from "./layout/AuthLayout/AcountLayout";
import { About } from "./pages/about/About";
import SignIn from "./pages/Account/SignIn";
import { SignUp } from "./pages/Account/SignUp";
import { Provider } from "react-redux";
import store from "./app/store";
import PrivateRoute from "./components/route/PrivateRoute";
import AdminLayout from "./layout/AdminLayout/AdminLayout";
import HomeAdmin from "./pages/Admin/HomeAdmin/HomeAdmin";
import EditProduct from "./pages/Admin/ProductAdmin/EditProduct/EditProduct";
import AdminListProduct from "./pages/Admin/ProductAdmin/ListProduct/AdminListProduct";
import EditUser from "./pages/Admin/User/EditUser/EditUser";
import ListUser from "./pages/Admin/User/ListUser/ListUser";
import NewUser from "./pages/Admin/User/NewUser/NewUser";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/Products/Product";
import ProductDetail from "./pages/Products/ProductDetail";
import ListTeams from "./pages/Teams/ListTeams";
import TeamDetails from "./pages/Teams/TeamDetails";
import Hoc from "./pages/User/HocKiemTra/Hoc";
import KiemTra from "./pages/User/HocKiemTra/KiemTra";
import NoiDungBaiHoc from "./pages/User/HocKiemTra/NoiDungBaiHoc";
import Profile from "./pages/User/Profile/Profile";
import UserProduct from "./pages/User/UserProduct/UserProduct";
import reportWebVitals from "./reportWebVitals";
import AuthRoute from "./components/route/AuthRoute";
import Contact from "./pages/contact/Contact";
import NewProduct from "./pages/Admin/ProductAdmin/NewProduct/NewProduct";
import DonHang from "./pages/User/DonHang/DonHang";
import ListMonChuDe from "./pages/Chude/ListMonChuDe";
import ResetPassWord from "./pages/Account/ResetPassWord";
import Forgot from "./pages/Account/Forgot";
import ListKhuyenMai from "./pages/khuyenmai/ListKhuyenMai";
import HoaDonAdmin from "./pages/Admin/HoaDonAdmin/HoaDon/HoaDonAdmin";
import EditHoaDon from "./pages/Admin/HoaDonAdmin/EditHoaDon/EditHoaDon";
import EditKhuyenMai from "./pages/Admin/KhuyenMaiAdmin/EditKhuyenMai/EditKhuyenMai";
import NewKhuyenMai from "./pages/Admin/KhuyenMaiAdmin/NewKhuyenMai/NewKhuyenMai";
import KhuyenMaiAdmin from "./pages/Admin/KhuyenMaiAdmin/KhuyenMaiAdmin";
import EditLopHoc from "./pages/Admin/LopHoc/EditLopHoc/EditLopHoc";
import ListChuDe from "./pages/Admin/ChuDe/ListChuDe/ListChuDe";
import EditChuDe from "./pages/Admin/ChuDe/EditChuDe/EditChuDe";
import ListLopHoc from "./pages/Admin/LopHoc/ListLopHoc/ListLopHoc";
import EditGiaoVien from "./pages/Admin/GiaoVien/EditGiaoVien/EditGiaoVien";
import NewGiaoVien from "./pages/Admin/GiaoVien/NewGiaoVien/NewGiaoVien";
import NewLopHoc from "./pages/Admin/LopHoc/NewLopHoc/NewLopHoc";
import NewHoaDon from "./pages/Admin/HoaDonAdmin/NewHoaDon/NewHoaDon";
import NganHang from "./pages/User/NganHangCauHoi/NganHang";
import AddDeThi from "./pages/User/NganHangCauHoi/AddDeThi";
import AddCauHoi from "./pages/User/NganHangCauHoi/AddCauHoi";
import XepHang from "./pages/User/HocKiemTra/XepHang";
import ThongKe from "./pages/Admin/ThongKe/ThongKe";
import ListQuanLy from "./pages/Admin/QuanLy/ListQuanLy/ListQuanLy";
import EditQuanLy from "./pages/Admin/QuanLy/EditQuanLy/EditQuanLy";
import EditCauHoi from "./pages/User/NganHangCauHoi/EditCauHoi";
import AddNoiDung from "./pages/Admin/NoiDungBaiHoc/AddNoiDung";
import AddChuong from "./pages/Admin/QLMonHoc/AddChuong";
import AdminTeamLayout from "./layout/AdminTeam/AdminTeamLayout";
import AdminTeamProduct from "./pages/Admin/AdminTeam/Product/AdminTeamProduct";
import TeamProdEdit from "./pages/Admin/AdminTeam/Product/TeamProdEdit";
import TeamProNew from "./pages/Admin/AdminTeam/Product/TeamProNew";
import TeamChuDeEdit from "./pages/Admin/AdminTeam/TeamChude/TeamChuDeEdit";
import TeamChuDe from "./pages/Admin/AdminTeam/TeamChude/TeamChuDe";
import TeamLop from "./pages/Admin/AdminTeam/TeamLopHoc/TeamLop";
import TeamLopEdit from "./pages/Admin/AdminTeam/TeamLopHoc/TeamLopEdit";
import TeamLopNew from "./pages/Admin/AdminTeam/TeamLopHoc/TeamLopNew";
import TeamGiaoVien from "./pages/Admin/AdminTeam/TeamGiaovien/TeamGiaoVien";
import TeamBaiHoc from "./pages/Admin/AdminTeam/TeamBaiHoc/TeamBaiHoc";
import TeamNganHang from "./pages/Admin/AdminTeam/TeamCauHoi/TeamNganHang";
import TeamCauHoi from "./pages/Admin/AdminTeam/TeamCauHoi/TeamCauHoi";
import TeamDethi from "./pages/Admin/AdminTeam/TeamCauHoi/TeamDethi";
import TeamEditCauHoi from "./pages/Admin/AdminTeam/TeamCauHoi/TeamEditCauHoi";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Product />} />
              <Route path="/chude/:maChuDe" element={<ListMonChuDe />} />
              <Route path="/prodetail/:maMh" element={<ProductDetail />} />
              <Route path="/products/cart" element={<Cart />} />
              <Route path="/teams" element={<ListTeams />} />
              <Route path="/teams/:maGv" element={<TeamDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/khuyenmai" element={<ListKhuyenMai />} />

              <Route path="/XepHang" element={<XepHang />} />

              <Route
                element={<PrivateRoute authorize={["Student", "Admin"]} />}
              >
                <Route path="/user/:email/product" element={<UserProduct />} />

                <Route path="/user/:email/profile" element={<Profile />} />
                <Route path="/user/:email/product" element={<UserProduct />} />
                <Route path="/user/:email/product/:maMh" element={<Hoc />} />
                <Route path="/user/:email/donhang" element={<DonHang />} />
                <Route
                  path="/user/:email/baihoc/:maBh"
                  element={<NoiDungBaiHoc />}
                />
                <Route path="/dethi/random/:maDe" element={<KiemTra />} />
              </Route>
            </Route>
            <Route path="/" element={<AuthRoute />}>
              <Route path="/" element={<AcountLayout />}>
                {/* Outlet phải thêm vào để trả về trang */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/Account/ResetPassword"
                  element={<ResetPassWord />}
                />
                <Route path="/forgot" element={<Forgot />} />
              </Route>
            </Route>

            <Route path="/">
              <Route path="/Giaovien" element={<AdminTeamLayout />}>
                <Route index element={<AdminTeamProduct />} />
                <Route
                  path="/Giaovien/ListProduct"
                  element={<AdminTeamProduct />}
                />
                <Route
                  path="/Giaovien/ListProduct/Product/:maMH"
                  element={<TeamProdEdit />}
                />
                <Route
                  path="/Giaovien/Listproduct/Newproduct"
                  element={<TeamProNew />}
                />
                <Route path="/Giaovien/ChuDe" element={<TeamChuDe />} />
                <Route
                  path="/Giaovien/ChuDe/:maChuDe"
                  element={<TeamChuDeEdit />}
                />
                <Route path="/Giaovien/LopHoc" element={<TeamLop />} />
                <Route
                  path="/Giaovien/LopHoc/:maLop"
                  element={<TeamLopEdit />}
                />
                <Route path="/Giaovien/LopHoc/New" element={<TeamLopNew />} />
                <Route path="/Giaovien/Team/:maGv" element={<TeamGiaoVien />} />
                <Route
                  path="/Giaovien/NganHangBaiHoc"
                  element={<TeamBaiHoc />}
                />
                <Route path="/Giaovien/NganHang" element={<TeamNganHang />} />
                <Route path="/Giaovien/ThemDeThi" element={<TeamDethi />} />
                <Route
                  path="/Giaovien/ThemCauHoi/:maDe"
                  element={<TeamCauHoi />}
                />
                <Route
                  path="/Giaovien/ThongTinCauHoi/:maDe"
                  element={<TeamEditCauHoi />}
                />
              </Route>
            </Route>

            <Route path="/" element={<PrivateRoute authorize={["Admin"]} />}>
              <Route path="/Admin" element={<AdminLayout />}>
                <Route index element={<HomeAdmin />} />
                <Route path="/Admin/Home" element={<HomeAdmin />} />
                <Route path="/Admin/ListUser" element={<ListUser />} />
                <Route
                  path="/Admin/ListUser/User/:maSinhVien"
                  element={<EditUser />}
                />
                <Route path="/Admin/ListUser/Create" element={<NewUser />} />
                <Route
                  path="/Admin/ListProduct"
                  element={<AdminListProduct />}
                />
                <Route
                  path="/Admin/ListProduct/Product/:maMH"
                  element={<EditProduct />}
                />
                <Route
                  path="/Admin/Listproduct/Newproduct"
                  element={<NewProduct />}
                />
                <Route path="/Admin/ThongKe" element={<ThongKe />} />
                <Route path="/Admin/ChuDe" element={<ListChuDe />} />
                <Route path="/Admin/ChuDe/:maChuDe" element={<EditChuDe />} />
                <Route path="/Admin/LopHoc/:maLop" element={<EditLopHoc />} />
                <Route path="/Admin/LopHoc" element={<ListLopHoc />} />
                <Route path="/Admin/LopHoc/New" element={<NewLopHoc />} />
                <Route
                  path="/Admin/GiaoVien/:maGv"
                  element={<EditGiaoVien />}
                />
                <Route path="/Admin/GiaoVien/New" element={<NewGiaoVien />} />
                <Route path="/Admin/KhuyenMai" element={<KhuyenMaiAdmin />} />
                <Route
                  path="/Admin/KhuyenMai/Edit/:maSale"
                  element={<EditKhuyenMai />}
                />
                <Route
                  path="/Admin/KhuyenMai/KhuyenMaiMoi"
                  element={<NewKhuyenMai />}
                />

                <Route path="/Admin/HoaDon" element={<HoaDonAdmin />} />
                <Route
                  path="/Admin/HoaDon/Edit/:maDh"
                  element={<EditHoaDon />}
                />
                <Route path="/Admin/HoaDon/New" element={<NewHoaDon />} />
                <Route path="/Admin/NganHangBaiHoc" element={<AddChuong />} />
                <Route path="/Admin/NewChuong" element={<AddNoiDung />} />
                <Route path="/Admin/NganHang" element={<NganHang />} />
                <Route path="/Admin/ThemDeThi" element={<AddDeThi />} />
                <Route path="/Admin/ThemCauHoi/:maDe" element={<AddCauHoi />} />
                <Route
                  path="/Admin/ThongTinCauHoi/:maDe"
                  element={<EditCauHoi />}
                />
                <Route path="/Admin/QuanLy" element={<ListQuanLy />} />
                <Route
                  path="/Admin/QuanLy/:userName"
                  element={<EditQuanLy />}
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
