using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using testapi.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using testapi.Models.MonHocModels;
using System.Security.Cryptography;
using System.Linq;
using testapi.Models.API;
using testapi.Models.ChuongModels;
using testapi.Models.LopHocModels;
using AutoMapper;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using testapi.Models.DethiModels;
using Microsoft.AspNetCore.Http;
using System.IO;
using testapi.Models.AdminModels.PostAllUser;
using testapi.Models.ChuDeModels;

namespace testapi.Services.MonHocServices
{
    public class MonHocService : IMonHocService
    {
        private readonly dbHocTapContext _context;
        private readonly IMapper _mapper;
        public MonHocService(dbHocTapContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ApiResult<object>> GetMonhocAll()
        {
            try
            {
                var data = await _context.Monhoc.AsNoTracking().ToListAsync();
                int total = data.Count;
                if( data is null)
                    return new ApiResult<object>(message: "false", data: null);
                
                var result = data.Select(t => new ViewMonHocModel()
                {
                    MaMH = t.MaMh,
                    TenMH = t.TenMh,
                    HinhAnh = t.HinhAnh,
                    SoLuong = t.SoLuong,
                    GiaBan = t.GiaBan
                }).ToList();

                return new ApiResult<object>(message: "true", data: new { total, result });
           
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> GetMonhoc(int MaMH)
        {
            try
            {
                var monhoc = await _context.Monhoc.FirstOrDefaultAsync(x=>x.MaMh == MaMH);

                return new ApiResult<object>(message: "true", data: monhoc);                

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }

        public async Task<ApiResult<object>> PostMonHoc(MonHocModel mh)
        {
            try
            {

                var monhoc = _context.Monhoc.Add(new Monhoc()
                {
                    TenMh = mh.TenMH,
                    HinhAnh = mh.HinhAnh,
                    SoLuong = mh.SoLuong,
                    GiaBan = mh.GiaBan,
                    MaChuDe = mh.MaChuDe
                    
                }) ;
                await _context.SaveChangesAsync();
                return new ApiResult<object>(message: "true", data: monhoc);                

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }

        }
        public async Task<ApiResult<object>> DelMonhoc(int mamh)
        {
            try
            {
                var monhoc = await _context.Monhoc.FindAsync(mamh);
                if(monhoc !=null)
                {
                    _context.Monhoc.Remove(monhoc);
                    await _context.SaveChangesAsync();
                }
                return new ApiResult<object>(message: "true", data: monhoc);                
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> EditMonhoc(int maMH, MonHocModel monHoc)
        {
            try
            {
                var updMonhoc = await _context.Monhoc.FindAsync(maMH);
                if (updMonhoc != null)
                {
                    updMonhoc.TenMh = monHoc.TenMH;
                    updMonhoc.HinhAnh = monHoc.HinhAnh;
                    updMonhoc.SoLuong = monHoc.SoLuong;
                    updMonhoc.GiaBan = monHoc.GiaBan;

                    _context.Monhoc.Update(updMonhoc);
                    await _context.SaveChangesAsync();
                }
                return new ApiResult<object>(message: "true", data: updMonhoc);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> MonhocDetails(int MaMH)
        {
            try
            {
                var monhoc = _context.Monhoc.Include(x => x.Chuong).ThenInclude(x => x.Baihoc)
                    .Include(x => x.Lophoc).ThenInclude(x => x.MaGvNavigation).Where(x => x.MaMh == MaMH).First();

                var dsNoiDung = _mapper.Map<MonHocModel>(monhoc);

                return new ApiResult<object>(message: "true", data: new { dsNoiDung });               
            }
            catch (Exception ex) { return new ApiResult<object>(message: "false", data: null); }
        }
        public async Task<ApiResult<object>> MonHocCauHoiDetails(int MaBH)
        {
            try
            {
                var deThi = _context.Dethi.AsNoTracking()
                    //.Include(x => x.Dethicauhoi)
                    .OrderBy(x=>x.MaDe)
                    .FirstOrDefault(x => x.MaBh == MaBH);
                if (deThi != null)
                {
                    var dethicauhois = _context.Dethicauhoi.AsNoTracking()
                        .Include(x=>x.MaChNavigation)
                        .Where(x => x.MaDe == deThi.MaDe).ToList();

                    deThi.Dethicauhoi= dethicauhois;
                }
                int total = 0;

                var dsNoiDung = _mapper.Map<DethiModel>(deThi);

                return new ApiResult<object>(message: "true", data: new { total, dsNoiDung });                
            }
            catch (Exception ex) { return new ApiResult<object>(message: "false", data: null); }
        }

        public async Task<ApiResult<object>> Get8MonHoc()
        {
            try
            {
                var data = await _context.Monhoc.AsNoTracking().Take(8).OrderByDescending(x => x.MaMh).ToListAsync();

                return new ApiResult<object>(message: "true", data: data);                
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        //Chủ Đề
        private string UploadedFile(IFormFile model)
        {
            string uniqueFileName = null;

            if (model != null)
            {
                string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images");
                var extensionName = Path.GetExtension(model.FileName);
                uniqueFileName = Guid.NewGuid().ToString() + extensionName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    model.CopyTo(fileStream);
                }
            }
            return uniqueFileName;
        }
       
        public async Task<ApiResult<object>> GetChuDe()
        {
            try
            {
                var data = await _context.Chude.AsNoTracking().ToListAsync();

                return new ApiResult<object>(message: "true", data: data);

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> Get1ChuDe(int MaChuDe)
        {
            try
            {
                var data = await _context.Chude.FirstOrDefaultAsync(x => x.MaChuDe == MaChuDe);

                return new ApiResult<object>(message: "true", data: data);

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> UpdateChuDe(int MaCD, ChuDeModel cd)
        {
            try
            {
                Chude up = await _context.Chude.FirstAsync(x => x.MaChuDe == MaCD);
                if (up != null)
                {
                    up.TenChuDe = cd.TenChuDe;
                    up.Images = UploadedFile(cd.File);
             

                    //_context.AspNetUsers.Update(upUser);
                    await _context.SaveChangesAsync();
                }

                return new ApiResult<object>(message: "true", data: new { up });
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> PostChuDe(ChuDeModel mh)
        {
            try
            {

                var monhoc = _context.Chude.Add(new Chude()
                {
           
                    TenChuDe = mh.TenChuDe,
                   

                });
                await _context.SaveChangesAsync();
                return new ApiResult<object>(message: "true", data: monhoc);

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }

        }
        public async Task<ApiResult<object>> DelChuDe(int macd)
        {
            try
            {
                var monhoc = await _context.Chude.FindAsync(macd);
                if (monhoc != null)
                {
                    _context.Chude.Remove(monhoc);
                    await _context.SaveChangesAsync();
                }
                return new ApiResult<object>(message: "true", data: monhoc);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> GetAllChuDe()
        {
            try
            {
                var data = await _context.Chude.AsNoTracking().ToListAsync();
                int total = data.Count;
                return new ApiResult<object>(message: "true", data: new { total, data });
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }

    }
}
