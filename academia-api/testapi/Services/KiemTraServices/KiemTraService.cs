using System;
using System.Threading.Tasks;
using testapi.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.EntityFrameworkCore.Internal;
using testapi.Models.API;
using testapi.Models.MonHocModels;
using AutoMapper;
using System.Collections.Generic;
using testapi.Models.KiemTraModels;
using System.Drawing;

namespace testapi.Services.KiemTraServices
{
    public class KiemTraService : IKiemTraService
    {
        private readonly dbHocTapContext _context;
        private readonly IMapper _mapper;

        public KiemTraService(dbHocTapContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ApiResult<object>> GetAllKiemTra()
        {
            try
            {
                //var data = await _context.Bailam.AsNoTracking().ToListAsync();
                var data = from kiemTra in _context.Kiemtra select kiemTra;

                int total = data.Count();
                if (total == 0)
                    return new ApiResult<object>(message: "false", data: null);

                var result = await data.Select(t => new Kiemtra()
                {
                    MaKt = t.MaKt,
                    TenKt = t.TenKt,
                    MaDe = t.MaDe,
                    Diem = t.Diem,
                    Thoigian = t.Thoigian,
                    Id = t.Id

                }).ToListAsync();
                return new ApiResult<object>(message: "true", data: new { total, result });
            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }
        }
        public async Task<ApiResult<object>> GetKiemTra(int maKT)
        {
            try
            {
                //var data = await _context.Bailam.AsNoTracking().ToListAsync();
                //var data = _context.Dethi
                //    .Include(t => t.Kiemtra).ThenInclude(t => t.Bailam)
                //    .Include(t => t.Dethicauhoi).ThenInclude(t => t.MaChNavigation)
                //    .ThenInclude(t => t.Cautraloi)
                //    .Where(t => t.MaDe == maDe).First();
                var data = _context.Kiemtra
                    .Include(t => t.Bailam)
                    .Where(t => t.MaKt == maKT).First();
                //var data = _context.Dethi.Include(t => t.Kiemtra).ThenInclude(t => t.Bailam)
                //    .Where(t => t.MaDe == maDe).First();

                if (data == null)
                    return new ApiResult<object>(message: "false", data: null);

                var result = _mapper.Map<KiemTraModel>(data);


                return new ApiResult<object>(message: "true", data: new { result });
            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }
        }
        public async Task<ApiResult<object>> postKiemTra(string email, ViewKiemTraModel kiemTra)
        {
            try
            {
                AspNetUsers user = _context.AspNetUsers.Where(t => t.Email == email).First();

                var postKT = _context.Kiemtra.Add(new Kiemtra()
                {
                    TenKt = kiemTra.TenKt,
                    MaDe = kiemTra.MaDe,
                    Diem = 0,
                    Thoigian = kiemTra.Thoigian,
                    Id = user.Id
                });
                if (postKT is null)
                    return new ApiResult<object>(message: "false", data: null);
                await _context.SaveChangesAsync();

                return new ApiResult<object>(message: "true", data: true);
            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }
        }

        public async Task<ApiResult<object>> tinhDiem(int maKT, string thoiGian)
        {
            try
            {
                var data = from kiemtra in _context.Kiemtra
                           join bailam in _context.Bailam on kiemtra.MaKt equals bailam.MaKt
                           join cauhoi in _context.Cauhoi on bailam.MaCh equals cauhoi.MaCh
                           where maKT == kiemtra.MaKt
                           select new { kiemtra, bailam, cauhoi };

                Kiemtra kiemTra = await _context.Kiemtra.FindAsync(maKT);

                Dethi dt = _context.Dethi.Find(kiemTra.MaDe);
                int sl = int.Parse(dt.Soluong.ToString());
                int diem = data.Where(t => t.cauhoi.DapAn == t.bailam.DapAn).ToList().Count();
                diem = diem * (100 / sl);

                kiemTra.Diem = diem;
                kiemTra.Thoigian = thoiGian;

                _context.Kiemtra.Update(kiemTra);
                await _context.SaveChangesAsync();

                return new ApiResult<object>(message: "true", data: diem);
            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }

        }
        public async Task<ApiResult<object>> getXepHangUser(int maMH, string email)
        {
            try
            {
                var data = from kt in _context.Kiemtra
                           join user in _context.AspNetUsers on kt.Id equals user.Id
                           join dt in _context.Dethi on kt.MaDe equals dt.MaDe
                           where dt.MaMh == maMH & user.Email == email
                           orderby kt.Diem descending, kt.Thoigian ascending
                           select new { kt.Id, kt.MaKt, user.HoTen, user.ImagesUser, kt.Diem, kt.Thoigian };
                //var us = _context.Kiemtra.GroupBy(t => t.Id).ToList();
                //List<XepHangModel> lstXH = new List<XepHangModel>();
               


                List<XepHangModel> lstXH = data.Select(t => new XepHangModel()
                {
                    ID = t.Id,
                    MaKT = t.MaKt,
                    HoTen = t.HoTen,
                    ImagesUser = t.ImagesUser,
                    Diem = t.Diem,
                    ThoiGian = t.Thoigian,
                 
                }).ToList();
                lstXH = lstXH.GroupBy(t => t.ID).Select(g => g.First()).ToList();

                return new ApiResult<object>(message: "true", data: lstXH);
            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }
        }

        public async Task<ApiResult<object>> getXepHang(int maMH)
        {
            try
            {
                var data = from kt in _context.Kiemtra
                           join user in _context.AspNetUsers on kt.Id equals user.Id
                           join dt in _context.Dethi on kt.MaDe equals dt.MaDe
                           where dt.MaMh == maMH
                           orderby kt.Diem descending, kt.Thoigian ascending
                           select new { kt.Id, kt.MaKt, user.HoTen, user.ImagesUser, kt.Diem, kt.Thoigian };
                //var us = _context.Kiemtra.GroupBy(t => t.Id).ToList();
                //List<XepHangModel> lstXH = new List<XepHangModel>();
                List<string> dsColor = new List<string>();
                dsColor.Add("rgb(192,192,192)");
                dsColor.Add("rgb(128,128,128)");
               
                
                List<XepHangModel> lstXH = data.Select(t => new XepHangModel()
                {
                    ID = t.Id,
                    MaKT = t.MaKt,
                    HoTen = t.HoTen,
                    ImagesUser = t.ImagesUser,
                    Diem = t.Diem,
                    ThoiGian = t.Thoigian,
                    colors = dsColor,
                }).ToList();
                lstXH = lstXH.GroupBy(t => t.ID).Select(g => g.First()).ToList();
                //List<XepHangModel> lst = lstXH.Where(t=> )

                //for(int i = 0; i < lstXH.Count ; i++)                
                //    for(int j = 0; j < i; )
                //    {
                //        if (lstXH.Count == 0 || lstXH[i] == null)
                //            break;
                //        if (lstXH[i].ID == lstXH[j].ID)
                //            lstXH.RemoveAt(i);
                //        else j++;
                //    }                

                //var result = _mapper.Map<XepHangModel>(data);

                return new ApiResult<object>(message: "true", data:lstXH);
            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }
        }
        public async Task<ApiResult<object>> getXepHangByMa(int ma, int loai)
        {
            try
            {
                var data = from kt in _context.Kiemtra
                           join user in _context.AspNetUsers on kt.Id equals user.Id
                           join dt in _context.Dethi on kt.MaDe equals dt.MaDe
                           where (loai == 1 ? dt.MaDe == ma : dt.MaChuong == ma)
                           orderby kt.Diem descending, kt.Thoigian ascending
                           select new { kt.Id, kt.MaKt, user.HoTen, user.ImagesUser, kt.Diem, kt.Thoigian };
                int total = data.Count();

                List<string> dsColor = new List<string>();
                dsColor.Add("rgb(192,192,192)");
                dsColor.Add("rgb(128,128,128)");


                List<XepHangModel> lstXH = data.Select(t => new XepHangModel()
                {
                    ID = t.Id,
                    MaKT = t.MaKt,
                    HoTen = t.HoTen,
                    ImagesUser = t.ImagesUser,
                    Diem = t.Diem,
                    ThoiGian = t.Thoigian,
                    colors = dsColor,
                }).ToList();
                lstXH = lstXH.GroupBy(t => t.ID).Select(g => g.First()).ToList();

                return new ApiResult<object>(message: "true", data: lstXH);
            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }
        }
    }
}
