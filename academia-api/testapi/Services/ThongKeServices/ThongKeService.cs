using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System;
using testapi.Entities;
using testapi.Models.API;
using testapi.Models.AdminModels;
using System.Net.WebSockets;
using Microsoft.SqlServer.Server;
using System.Reflection.PortableExecutable;
using Microsoft.EntityFrameworkCore.Internal;

namespace testapi.Services.ThongKeServices
{
    public class ThongKeService : IThongKeService
    {
        private readonly dbHocTapContext _context;
        private readonly IMapper _mapper;
        public ThongKeService(dbHocTapContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ApiResult<object>> getDoanhThuNgay()
        {
            try
            {
                DateTime dateTime = DateTime.Now;
                var data = _context.Hoadon.Include(t => t.IdNavigation).Where(t => t.NgayLap == dateTime && t.TinhTrang == "Đã thanh toán");
                decimal sum = decimal.Parse(data.Sum(t => t.TongTien).ToString());
                var result = data.Select(t => new ThongKeModel()
                {
                    MaDh = t.MaDh,
                    HoTen = t.IdNavigation.HoTen,
                    TinhTrang = t.TinhTrang,
                    NgayLap = t.NgayLap,
                    TongTien = t.TongTien,
                }).ToList();
                return new ApiResult<object>(message: "true", data: new { result, sum });
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> getDoanhThuThang()
        {
            try
            {
                DateTime dateTime = DateTime.Now.AddDays(1 - DateTime.Now.Day);
                var data = _context.Hoadon.Where(t => t.NgayLap >= dateTime && t.NgayLap <= DateTime.Now && t.TinhTrang == "Đã thanh toán");
                int total = data.Count();
                decimal sum = decimal.Parse(data.Sum(t => t.TongTien).ToString());

                return new ApiResult<object>(message: "true", data: sum);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> getDoanhThuQuy(int quy, int nam)
        {
            try
            {
                DateTime dateTime = DateTime.Now.AddYears(nam - DateTime.Now.Year).AddDays(1 - DateTime.Now.Day);


                DateTime beginTime = dateTime.AddMonths(1 - DateTime.Now.Month);
                DateTime endTime = dateTime.AddMonths(3 - DateTime.Now.Month).AddDays(30);


                if (quy == 2)
                {
                    beginTime = dateTime.AddMonths(4 - DateTime.Now.Month);
                    endTime = dateTime.AddMonths(6 - DateTime.Now.Month).AddDays(29);
                }
                if (quy == 3)
                {
                    beginTime = dateTime.AddMonths(7 - DateTime.Now.Month);
                    endTime = dateTime.AddMonths(9 - DateTime.Now.Month).AddDays(29);
                }
                if (quy == 4)
                {
                    beginTime = dateTime.AddMonths(10 - DateTime.Now.Month);
                    endTime = dateTime.AddMonths(12 - DateTime.Now.Month).AddDays(30);
                }


                var data = _context.Hoadon.Where(t => t.NgayLap >= beginTime && t.NgayLap <= endTime
                    && t.TinhTrang == "Đã thanh toán");

                decimal sum = decimal.Parse(data.Sum(t => t.TongTien).ToString());

                return new ApiResult<object>(message: "true", data: sum);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> getDoanhThuNam()
        {
            try
            {
                DateTime dateTime = DateTime.Now.AddMonths(1 - DateTime.Now.Month).AddDays(1 - DateTime.Now.Day);
                var data = _context.Hoadon.Where(t => t.NgayLap >= dateTime && t.NgayLap <= DateTime.Now && t.TinhTrang == "Đã thanh toán");
                decimal sum = decimal.Parse(data.Sum(t => t.TongTien).ToString());

                return new ApiResult<object>(message: "true", data: sum);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> getDoanhThuNgayByChuDe(int MaChuDe)
        {
            try
            {
                DateTime dateTime = DateTime.Now;
                var data = from hd in _context.Hoadon
                           join cthd in _context.Cthoadon on hd.MaDh equals cthd.MaDh
                           join mh in _context.Monhoc on cthd.MaMh equals mh.MaMh
                           where hd.TinhTrang == "Đã thanh toán" && mh.MaChuDe == MaChuDe && hd.NgayLap == dateTime
                           select new { cthd.GiaBan };
                decimal sum = decimal.Parse(data.Sum(t => t.GiaBan).ToString());

                return new ApiResult<object>(message: "true", data: sum);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> getDoanhThuThangByChuDe(int thang, int nam, int MaChuDe)
        {
            try
            {
                DateTime dateTime = DateTime.Now.AddYears(nam - DateTime.Now.Year).AddDays(1 - DateTime.Now.Day);


                DateTime beginTime = dateTime.AddMonths(thang - DateTime.Now.Month);
                DateTime endTime = beginTime.AddDays(30);
                if (thang == DateTime.Now.Month)
                    endTime = DateTime.Now;
                var data = from hd in _context.Hoadon
                           join cthd in _context.Cthoadon on hd.MaDh equals cthd.MaDh
                           join mh in _context.Monhoc on cthd.MaMh equals mh.MaMh
                           where hd.TinhTrang == "Đã thanh toán" && mh.MaChuDe == MaChuDe && hd.NgayLap >= beginTime && hd.NgayLap <= endTime
                           select new { cthd.GiaBan };
                decimal sum = decimal.Parse(data.Sum(t => t.GiaBan).ToString());

                return new ApiResult<object>(message: "true", data: sum);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> getDoanhThuQuyByChuDe(int quy, int nam, int MaChuDe)
        {
            try
            {
                DateTime dateTime = DateTime.Now.AddYears(nam - DateTime.Now.Year).AddDays(1 - DateTime.Now.Day);


                DateTime beginTime = dateTime.AddMonths(1 - DateTime.Now.Month);
                DateTime endTime = dateTime.AddMonths(3 - DateTime.Now.Month).AddDays(30);


                if (quy == 2)
                {
                    beginTime = dateTime.AddMonths(4 - DateTime.Now.Month);
                    endTime = dateTime.AddMonths(6 - DateTime.Now.Month).AddDays(29);
                }
                if (quy == 3)
                {
                    beginTime = dateTime.AddMonths(7 - DateTime.Now.Month);
                    endTime = dateTime.AddMonths(9 - DateTime.Now.Month).AddDays(29);
                }
                if (quy == 4)
                {
                    beginTime = dateTime.AddMonths(10 - DateTime.Now.Month);
                    endTime = dateTime.AddMonths(12 - DateTime.Now.Month).AddDays(30);
                }


                var data = from hd in _context.Hoadon
                           join cthd in _context.Cthoadon on hd.MaDh equals cthd.MaDh
                           join mh in _context.Monhoc on cthd.MaMh equals mh.MaMh
                           where hd.TinhTrang == "Đã thanh toán" && mh.MaChuDe == MaChuDe && hd.NgayLap >= beginTime && hd.NgayLap <= endTime
                           select new { cthd.GiaBan };

                decimal sum = decimal.Parse(data.Sum(t => t.GiaBan).ToString());

                return new ApiResult<object>(message: "true", data: sum);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> getThongKeNgay()
        {
            try
            {
                DateTime dateTime = DateTime.Now;
                var data = (from hd in _context.Hoadon
                           join cthd in _context.Cthoadon on hd.MaDh equals cthd.MaDh
                           join user in _context.AspNetUsers on hd.Id equals user.Id
                           where hd.TinhTrang == "Đã thanh toán" && hd.NgayLap == dateTime
                           select new { hd, cthd, user }).Distinct();
                var thongke = data.Select(t => new ThongKeModel()
                {
                    MaDh = t.hd.MaDh,
                    HoTen = t.user.HoTen,
                    TinhTrang = t.hd.TinhTrang,
                    NgayLap = t.hd.NgayLap,
                    TongTien = t.hd.TongTien
                }).ToList();
                thongke = thongke.GroupBy(t => t.MaDh).Select(t => t.First()).ToList();

                return new ApiResult<object>(message: "true", data: thongke);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> getThongKeAll()
        {
            try
            {                
                var data = (from hd in _context.Hoadon
                            join cthd in _context.Cthoadon on hd.MaDh equals cthd.MaDh
                            join user in _context.AspNetUsers on hd.Id equals user.Id
                            where hd.TinhTrang == "Đã thanh toán"
                            select new { hd, cthd, user }).Distinct();
                var thongke = data.Select(t => new ThongKeModel()
                {
                    MaDh = t.hd.MaDh,
                    HoTen = t.user.HoTen,
                    TinhTrang = t.hd.TinhTrang,
                    NgayLap = t.hd.NgayLap,
                    TongTien = t.hd.TongTien
                }).ToList();
                thongke = thongke.GroupBy(t => t.MaDh).Select(t => t.First()).ToList();

                return new ApiResult<object>(message: "true", data: thongke);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> getThongKeByChuDe(int maChuDe)
        {
            try
            {
                var data = (from hd in _context.Hoadon
                            join cthd in _context.Cthoadon on hd.MaDh equals cthd.MaDh
                            join mh in _context.Monhoc on cthd.MaMh equals mh.MaMh
                            join user in _context.AspNetUsers on hd.Id equals user.Id
                            where hd.TinhTrang == "Đã thanh toán" && mh.MaChuDe == maChuDe
                            select new { hd, cthd, user }).Distinct();
                var thongke = data.Select(t => new ThongKeModel()
                {
                    MaDh = t.hd.MaDh,
                    HoTen = t.user.HoTen,
                    TinhTrang = t.hd.TinhTrang,
                    NgayLap = t.hd.NgayLap,
                    TongTien = t.hd.TongTien
                }).ToList();
                thongke = thongke.GroupBy(t => t.MaDh).Select(t => t.First()).ToList();

                return new ApiResult<object>(message: "true", data: thongke);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> getThongKeThang(int thang, int nam)
        {
            try
            {
                DateTime dateTime = DateTime.Now.AddYears(nam - DateTime.Now.Year).AddDays(1 - DateTime.Now.Day);


                DateTime beginTime = dateTime.AddMonths(thang - DateTime.Now.Month);
                DateTime endTime = beginTime.AddDays(30);
                if (thang == DateTime.Now.Month)
                    endTime = DateTime.Now;
                var data = (from hd in _context.Hoadon
                           join cthd in _context.Cthoadon on hd.MaDh equals cthd.MaDh
                           join user in _context.AspNetUsers on hd.Id equals user.Id
                           where hd.TinhTrang == "Đã thanh toán" && hd.NgayLap >= beginTime && hd.NgayLap <= endTime
                           select new { hd, cthd, user }).Distinct();
                
                var thongke = data.Select(t => new ThongKeModel()
                {
                    MaDh = t.hd.MaDh,
                    HoTen = t.user.HoTen,
                    TinhTrang = t.hd.TinhTrang,
                    NgayLap = t.hd.NgayLap,
                    TongTien = t.hd.TongTien
                }).ToList();
                thongke = thongke.GroupBy(t => t.MaDh).Select(t => t.First()).ToList();

                return new ApiResult<object>(message: "true", data: thongke);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> getThongKeQuy(int quy, int nam)
        {
            try
            {
                DateTime dateTime = DateTime.Now.AddYears(nam - DateTime.Now.Year).AddDays(1 - DateTime.Now.Day);


                DateTime beginTime = dateTime.AddMonths(1 - DateTime.Now.Month);
                DateTime endTime = dateTime.AddMonths(3 - DateTime.Now.Month).AddDays(30);


                if (quy == 2)
                {
                    beginTime = dateTime.AddMonths(4 - DateTime.Now.Month);
                    endTime = dateTime.AddMonths(6 - DateTime.Now.Month).AddDays(29);
                }
                if (quy == 3)
                {
                    beginTime = dateTime.AddMonths(7 - DateTime.Now.Month);
                    endTime = dateTime.AddMonths(9 - DateTime.Now.Month).AddDays(29);
                }
                if (quy == 4)
                {
                    beginTime = dateTime.AddMonths(10 - DateTime.Now.Month);
                    endTime = dateTime.AddMonths(12 - DateTime.Now.Month).AddDays(30);
                }


                var data = (from hd in _context.Hoadon
                           join cthd in _context.Cthoadon on hd.MaDh equals cthd.MaDh
                           join user in _context.AspNetUsers on hd.Id equals user.Id
                           where hd.TinhTrang == "Đã thanh toán" && hd.NgayLap >= beginTime && hd.NgayLap <= endTime
                           select new { hd, cthd, user }).Distinct();
                var thongke = data.Select(t => new ThongKeModel()
                {
                    MaDh = t.hd.MaDh,
                    HoTen = t.user.HoTen,
                    TinhTrang = t.hd.TinhTrang,
                    NgayLap = t.hd.NgayLap,
                    TongTien = t.hd.TongTien
                }).ToList();
                thongke = thongke.GroupBy(t => t.MaDh).Select(t => t.First()).ToList();

                return new ApiResult<object>(message: "true", data: thongke);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }

    }
}
