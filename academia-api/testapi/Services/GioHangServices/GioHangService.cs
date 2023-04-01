using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System;
using System.Linq;
using System.Threading.Tasks;
using testapi.Entities;
using testapi.Models.API;
using testapi.Models.DonHangModels;
using testapi.Models.MonHocModels;
using testapi.Models.ChuongModels;
using Microsoft.AspNetCore.Identity.UI.Pages.Internal.Account.Manage;
using static Microsoft.AspNetCore.Hosting.Internal.HostingApplication;
using testapi.Models.GioHangModels;
using System.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
using testapi.Models.UserModels;
using testapi.Models.SaleModels;

namespace testapi.Services.GioHangServices
{
    public class GioHangService : IGioHangService
    {
        private readonly dbHocTapContext _context;
        private readonly IMapper _mapper;

        public GioHangService(dbHocTapContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ApiResult<object>> GetAllCTHoaDon(int maDh)
        {
            try
            {
                var data = await _context.Cthoadon.Include(x=>x.MaMhNavigation).Where(x=>x.MaDh == maDh).ToListAsync();
           
                int total = data.Count;
                var result = _mapper.Map<List<CTHoaDonModel>>(data);
                return new ApiResult<object>(message: "true", data: result);
                
            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null);  }
        }

        public async Task<ApiResult<object>> PostCTHoaDon(CTHoaDonModel cthd)
        {
            try
            {
                var ctHoaDon = _context.Cthoadon.Add(new Cthoadon()
                {
                    MaDh = cthd.MaDh,
                    MaMh = cthd.MaMh,
                    GiaBan = cthd.GiaBan,
                    ThanhTien = cthd.ThanhTien
                });

                await _context.SaveChangesAsync();


                return new ApiResult<object>(message: "true", data: ctHoaDon);                

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> PostHD(HoaDonModel hd)
        {
            try
            {
                var HoaDon = _context.Hoadon.Add(new Hoadon()
                {
                    Id = hd.Id,
                    TinhTrang = hd.TinhTrang,
                    NgayLap= hd.NgayLap,
                    TongTien= hd.TongTien
                });

                await _context.SaveChangesAsync();


                return new ApiResult<object>(message: "true", data: HoaDon);

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> DelCTHoaDon(int maDh, int maMh)
        {
            try
            {
                Cthoadon ctHoaDon = await _context.Cthoadon.FindAsync(maDh, maMh);
                if (ctHoaDon != null)
                {
                    _context.Cthoadon.Remove(ctHoaDon);
                    await _context.SaveChangesAsync();
                }

                return new ApiResult<object>(message: "true", data: ctHoaDon);             
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> DelGio(string email, int MaMH)
        {
            try
            {
                var layEmail = _context.AspNetUsers.Where(x => x.Email == email).FirstOrDefault();
                Giohang giohang = await _context.Giohang.Where(x => x.Tinhtrang == "Chua Thanh Toan" && x.Id==layEmail.Id && x.MaMh == MaMH).FirstAsync();
                if (giohang != null)
                {
                    _context.Giohang.Remove(giohang);
                    await _context.SaveChangesAsync();
                }
                return new ApiResult<object>("true", null);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> EditCTHoaDon(CTHoaDonModel cthd)
        {
            try
            {
                Cthoadon ctHoaDon = await _context.Cthoadon.FindAsync(cthd.MaDh, cthd.MaMh);
                if (ctHoaDon != null)
                {
                    ctHoaDon.GiaBan = cthd.GiaBan;
                    ctHoaDon.ThanhTien = cthd.ThanhTien;

                    _context.Cthoadon.Update(ctHoaDon);
                    await _context.SaveChangesAsync();
                }

                return new ApiResult<object>("true", ctHoaDon);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }

        public async Task<ApiResult<object>> GetAllHoaDon()
        {
            try
            {
                var noidung = await _context.Hoadon.Include(x=>x.IdNavigation).OrderByDescending(x=>x.MaDh).ToListAsync();
                int total = noidung.Count;


            
                var data = _mapper.Map<List<HoaDonModel>>(noidung);

                return new ApiResult<object>(message: "true", data: new { total, data });
            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }
        }
        public async Task<ApiResult<object>> GetMaGiamGia()
        {
            try
            {
                var sale = _context.Magiamgia.Where(x=>x.SoLuong>0 && x.NgayHetHan >=DateTime.Now).ToList();

                if(sale == null)
                {
                    return new ApiResult<object>(message: "false", data: null);
                }
                int total = 0;

                return new ApiResult<object>(message: "true", data: new { total, sale });

            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }
        }
        //public async Task<ApiResult<object>> PostHoaDon(string email)
        //{
        //    try
        //    {
        //        var c = new Hoadon()
        //        {              
        //            NgayLap = DateTime.Now,
        //            TinhTrang ="Đã Thanh Toán",
        //            Cthoadon = new List<Cthoadon>()
        //        };
               
        //        var layEmail = _context.AspNetUsers.Where(x => x.Email == email).FirstOrDefault();
        //        //var sale = _context.Magiamgia.Where(x => x.MaSale == MaSale).FirstOrDefault();
        //        //Kiểm tra điều kiện
               
        //        // hóa đơn chi tiết
        //        var gioHang = _context.Giohang.Include(x=>x.MaMhNavigation).Where(x => x.Id == layEmail.Id && x.Tinhtrang == "Chua thanh toan").ToList(); //Lấy list giỏ hàng
        //        decimal total = 0;
        //        gioHang.ForEach(x =>
        //        {
        //            total += x.MaMhNavigation.GiaBan??0;
        //            c.Cthoadon.Add(new Cthoadon()
        //            {

        //                MaMh = x.MaMh,
        //                GiaBan = x.MaMhNavigation.GiaBan,
                        
        //            });
        //            x.Tinhtrang = "Đã thanh toán";

        //        });
                
        //        //if(sale.DieuKien <= total)
        //        //{
        //        //    c.TongTien = total - sale.SoTienGiam;
                    
        //        //}
        //        //else
        //        //{
        //        //    c.TongTien = total;
        //        //}
                
        //        c.TongTien = total;
        //        c.Id = layEmail.Id;
        //        var hoaDon = _context.Hoadon.Add(c);

        //        await _context.SaveChangesAsync();
        //        var dsNoiDung = _mapper.Map<HoaDonModel>(c);

        //        return new ApiResult<object>(message: "true", data: dsNoiDung);                
        //    }
        //    catch (Exception ex)
        //    {
        //        return new ApiResult<object>(message: "false", data: null);
        //    }
        //}
        public async Task<ApiResult<object>> PostHoaDon(string email, string Ma)
        {
            try
            {

                var c = new Hoadon()
                {
                    NgayLap = DateTime.Now,
                    TinhTrang = "Đang Duyệt",
                    Cthoadon = new List<Cthoadon>()
                };

                var layEmail = _context.AspNetUsers.Where(x => x.Email == email).FirstOrDefault();
                
                var sale = _context.Magiamgia.Where(x=>x.MaSale == Ma).FirstOrDefault();
                //Kiểm tra điều kiện

                // hóa đơn chi tiết
                var gioHang = _context.Giohang.Include(x => x.MaMhNavigation).Where(x => x.Id == layEmail.Id && x.Tinhtrang == "Chua thanh toan").ToList(); //Lấy list giỏ hàng
                decimal total = 0;
                
                gioHang.ForEach(x =>
                {
                    total += x.MaMhNavigation.GiaBan ?? 0;
                    c.Cthoadon.Add(new Cthoadon()
                    {

                        MaMh = x.MaMh,
                        GiaBan = x.MaMhNavigation.GiaBan,

                    });
                    //x.Tinhtrang = "Đã thanh toán";
                    x.Tinhtrang = "Đang Duyệt";

                });



                //c.TongTien = total;
           
                if (sale != null && sale.SoLuong >= 1 && sale.NgayHetHan > DateTime.Now)
                {
                    if(sale.DieuKien <= total)
                    {
                        c.TongTien = total - sale.SoTienGiam;
                        sale.SoLuong -= 1;

                    }
                    if (sale.DieuKien > total)
                    {
                        return new ApiResult<object>(message: "false", data: "Điều kiện giảm giá không thỏa mãn!!");
                    }
                    
                }
               
                else
                {
                    c.TongTien = total;
                }

                c.Id = layEmail.Id;
                var hoaDon = _context.Hoadon.Add(c);

                await _context.SaveChangesAsync();
                var dsNoiDung = _mapper.Map<HoaDonModel>(c);

                return new ApiResult<object>(message: "true", data: dsNoiDung);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: "Thanh Toán Không Thành Công !!");
            }
        }
        public async Task<ApiResult<object>> HienThiMa(string ma)
        {
            try
            {
                var data = _context.Magiamgia.Where(x=>x.MaSale == ma).FirstOrDefault();
                if (data != null && data.SoLuong >= 1 && data.NgayHetHan >= DateTime.Now)
                {
                    return new ApiResult<object>(message: "true", data: data);
                }
                return new ApiResult<object>(message: "false", data: "Không tồn tại mã giảm giá này!!");

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: "Không tồn tại mã giảm giá này!!");
            }
        }
        public async Task<ApiResult<object>> DelHoaDon(int maDh)
        {
            try
            {
                Hoadon hoaDon = await _context.Hoadon.FindAsync(maDh);
                if (hoaDon != null)
                {
                    var ctHoaDon = from ctdh in _context.Cthoadon
                                   where ctdh.MaDh == maDh
                                   select ctdh;
                    int total = ctHoaDon.Count();
                    ctHoaDon.Select(t => _context.Remove(t));

                    _context.Hoadon.Remove(hoaDon);
                    await _context.SaveChangesAsync();
                }
                return new ApiResult<object>(message: "true", data: hoaDon);                
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> EditHoaDon(int maDh, HoaDonModel hd)
        {
            try
            {
                Hoadon hoaDon = await _context.Hoadon.FindAsync(maDh);
                if (hoaDon != null)
                {
                    hoaDon.Id = hd.Id;
                    hoaDon.NgayLap = hd.NgayLap;
                    hoaDon.TongTien = hd.TongTien;
                    hoaDon.TinhTrang = hd.TinhTrang;

                    _context.Hoadon.Update(hoaDon);
                    await _context.SaveChangesAsync();
                }
                return new ApiResult<object>(message: "true", data: hoaDon);                
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> EditHoaDonTinhTrang(int maDh)
        {
            try
            {
                Hoadon hoaDon = await _context.Hoadon.FindAsync(maDh);
                if (hoaDon != null)
                {

                    hoaDon.TinhTrang = "Đã Thanh Toán";

                    _context.Hoadon.Update(hoaDon);
                    await _context.SaveChangesAsync();
                }
                return new ApiResult<object>(message: "true", data: hoaDon);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }


        public async Task<ApiResult<object>> PostGioHang(string email, GioHangModel giohang)
        {
            try
            {
             

               var layEmail = _context.AspNetUsers.Where(x=>x.Email == email).FirstOrDefault();
                var gh = _context.Giohang.Add( new Giohang()
                {   
                    Id = layEmail.Id,
                    MaMh = giohang.MaMh,
                    Tinhtrang = "Chua thanh toan",
                    Ngaytao = DateTime.Now,                                                   
                });

                await _context.SaveChangesAsync();

                return new ApiResult<object>(message: "true", data: gh);             
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<ApiResult<object>> GetAllGioHang(string email)
        {
            try
            {
                var layEmail = _context.AspNetUsers.Where(x => x.Email == email).FirstOrDefault();
                var data = await _context.Giohang.AsNoTracking().Where(x=>x.Tinhtrang == "Chua thanh toan" && x.Id == layEmail.Id).Include(x=>x.MaMhNavigation).ToListAsync();
                int total = data.Count;
               
                var dsNoiDung = _mapper.Map<List<GioHangModel>>(data);

                return new ApiResult<object>(message: "true", data: new { total, dsNoiDung });                
            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }
        }
        public async Task<ApiResult<object>> CountGioHang(string email)
        {
            try
            {
                var layEmail = _context.AspNetUsers.Where(x => x.Email == email).FirstOrDefault();
                var data = await _context.Giohang.Where(x => x.Tinhtrang == "Chua thanh toan" && x.Id == layEmail.Id).ToListAsync();
                var c = data.Count();





                return new ApiResult<object>(message: "true", data: new { c });
            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }
        }
        public async Task<ApiResult<object>> HoaDon1Ngay()
        {
            try
            {
            
                var data = await _context.Hoadon.Where(x=>x.TinhTrang == "Đã Thanh Toán" && x.NgayLap == DateTime.Today).ToListAsync();
                var tongtien = data.Sum(x=>x.TongTien);
                var soluong = data.Count();
                var data1 = await _context.Hoadon.Where(x => x.TinhTrang == "Đã Thanh Toán").ToListAsync();
                var tongtien1 = data1.Sum(x => x.TongTien);
                var soluong1 = data1.Count();




                return new ApiResult<object>(message: "true", data: new { soluong, tongtien,soluong1,tongtien1 });
            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }
        }
        public async Task<ApiResult<object>> HoaDonHomNay()
        {
            //try
            //{

            //    var data = await _context.Hoadon.Where(x=> x.NgayLap == DateTime.Today).ToListAsync();
            //    return new ApiResult<object>(message: "true", data: data);
            //}
            //catch (Exception ex)
            //{ return new ApiResult<object>(message: "false", data: null); }
            try
            {
                var noidung = await _context.Hoadon.Include(x => x.IdNavigation).OrderByDescending(x => x.MaDh).Where(x => x.NgayLap == DateTime.Today).ToListAsync();
                int total = noidung.Count;



                var data = _mapper.Map<List<HoaDonModel>>(noidung);

                return new ApiResult<object>(message: "true", data: new { total, data });
            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }
        }
        public async Task<ApiResult<object>> GetAllMaGiamGia()
        {
            try
            {
                var sale = _context.Magiamgia.AsNoTracking().ToList();

                

                return new ApiResult<object>(message: "true", data: new {  sale });

            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }
        }
        public async Task<ApiResult<object>> GetMa(string MaSale)
        {
            try
            {
                var d = await _context.Magiamgia.FirstOrDefaultAsync(x => x.MaSale == MaSale);

                return new ApiResult<object>(message: "true", data: d);

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> EditMa(string maSale, SaleModel sale)
        {
            try
            {
                var update = await _context.Magiamgia.FindAsync(maSale);
                if (update != null)
                {
                    update.TenSale = sale.TenSale;
                    update.MoTa = sale.MoTa;
                    update.SoLuong = sale.SoLuong;
                    update.NgayHetHan = sale.NgayHetHan;
                    update.DieuKien = sale.DieuKien;
                    update.SoTienGiam = sale.SoTienGiam;


                    _context.Magiamgia.Update(update);
                    await _context.SaveChangesAsync();
                }
                return new ApiResult<object>(message: "true", data: update);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> DelMa(string maSale)
        {
            try
            {
                var sale = await _context.Magiamgia.FindAsync(maSale);
                if (sale != null)
                {
                    _context.Magiamgia.Remove(sale);
                    await _context.SaveChangesAsync();
                }
                return new ApiResult<object>(message: "true", data: sale);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> PostMaSale(SaleModel sl)
        {
            try
            {
               
                var sale = _context.Magiamgia.Add(new Magiamgia()
                {
                    MaSale = sl.MaSale,
                    TenSale = sl.TenSale,
                    MoTa = sl.MoTa,
                    SoTienGiam = sl.SoTienGiam,
                    SoLuong = sl.SoLuong,
                    NgayHetHan = sl.NgayHetHan,
                    DieuKien = sl.DieuKien
                });
                await _context.SaveChangesAsync();
                if(sl.MaSale != null)
                {
                    return new ApiResult<object>(message: "true", data: sale);
                }
                return new ApiResult<object>(message: "false", data: null);

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }

        }

    }
    
}
