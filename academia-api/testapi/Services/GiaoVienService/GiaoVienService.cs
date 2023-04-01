using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using testapi.Entities;
using System.Linq;
using testapi.Models.API;
using testapi.Models.MonHocModels;
using testapi.Models.TeamModels;
using Microsoft.AspNetCore.Http;
using System.IO;
using testapi.Models.ChuDeModels;
using testapi.Models.GiaoVienModels;
using testapi.Models.LopHocModels;

namespace testapi.Services.GiaoVienService
{
    public class GiaoVienService : IGiaoVienService
    {
        private readonly dbHocTapContext _context;
        private readonly IMapper _mapper;
        public GiaoVienService(dbHocTapContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        private string UploadedFile(IFormFile model)
        {
            string uniqueFileName = null;

            if (model != null)
            {
                string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "giaovien");
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

        public async Task<ApiResult<object>> GetGiaoVienAll()
        {
            try
            {
                var dsGiaoVien = await _context.Giaovien.AsNoTracking().ToListAsync();

                return new ApiResult<object>(message: "true", data: dsGiaoVien);                
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> TeamDetail(int MaGV)
        {
            try
            {


                var giaovien = _context.Giaovien.Include(x => x.Lophoc).ThenInclude(x => x.MaMhNavigation)
                    .Where(x => x.MaGv == MaGV).First();

                int total = 0;

                var dsNoiDung = _mapper.Map<TGiaoVienModels>(giaovien);

                return new ApiResult<object>(message: "true", data: new { total, dsNoiDung });
            }
            catch (Exception ex) { return new ApiResult<object>(message: "false", data: null); }
        }
        public async Task<ApiResult<object>> Get6GiaoVien()
        {
            try
            {
                var data = await _context.Giaovien.AsNoTracking().Take(6).OrderByDescending(x => x.MaGv).ToListAsync();

                return new ApiResult<object>(message: "true", data: data);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
      
        public async Task<ApiResult<object>> UpdateGiaoVien(int MaGv, GiaoVienModel gv)
        {
            try
            {
                Giaovien up = await _context.Giaovien.FirstAsync(x => x.MaGv == MaGv);
                if (up != null)
                {
                  
                    up.HinhAnhGv = UploadedFile(gv.File);


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
        public async Task<ApiResult<object>> Update(int MaGv, GiaoVienModel gv)
        {
            try
            {
                Giaovien up = await _context.Giaovien.FirstAsync(x => x.MaGv == MaGv);
                if (up != null)
                {

  
                    up.TenGv = gv.TenGv;
                    up.Sdt = gv.Sdt;
                    up.Diachi= gv.Diachi;
                    up.Email= gv.Email;
                    up.Ngaysinh= gv.Ngaysinh;


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
        public async Task<ApiResult<object>> PostGiaoVien(GiaoVienModel gv)
        {
            try
            {

                var data = _context.Giaovien.Add(new Giaovien()
                {

                    TenGv = gv.TenGv,
                    Email = gv.Email,
                    Ngaysinh= gv.Ngaysinh,
                    Sdt=gv.Sdt,
                    Diachi=gv.Diachi,
                });
                await _context.SaveChangesAsync();
                return new ApiResult<object>(message: "true", data: data);

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }

        }
        public async Task<ApiResult<object>> DelGV(int magv)
        {
            try
            {
                var monhoc = await _context.Giaovien.FindAsync(magv);
                if (monhoc != null)
                {
                    _context.Giaovien.Remove(monhoc);
                    await _context.SaveChangesAsync();
                }
                return new ApiResult<object>(message: "true", data: monhoc);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        //Lớp Học
        public async Task<ApiResult<object>> GetAllLopHoc()
        {
            try
            {
                var data = await _context.Lophoc.AsNoTracking().OrderByDescending(x => x.MaLop).ToListAsync();

                return new ApiResult<object>(message: "true", data: data);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> GetLop(int MaLop)
        {
            try
            {
                var data = await _context.Lophoc.FirstOrDefaultAsync(x => x.MaLop == MaLop);

                return new ApiResult<object>(message: "true", data: data);

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> UpdateLopHoc(int ma, LopHocModel dt)
        {
            try
            {
                Lophoc up = await _context.Lophoc.FirstAsync(x => x.MaLop == ma);
                if (up != null)
                {
                    up.TenLop =dt.TenLop;
                    up.MaGv =dt.MaGv;
                    up.MaMh =dt.MaMh;
                
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
        public async Task<ApiResult<object>> PostLop(LopHocModel gv)
        {
            try
            {

                var data = _context.Lophoc.Add(new Lophoc()
                {

                    TenLop = gv.TenLop,
                    MaGv =gv.MaGv,
                    MaMh =gv.MaMh,
                });
                await _context.SaveChangesAsync();
                return new ApiResult<object>(message: "true", data: data);

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }

        }
        public async Task<ApiResult<object>> DelLop(int ma)
        {
            try
            {
                var monhoc = await _context.Lophoc.FindAsync(ma);
                if (monhoc != null)
                {
                    _context.Lophoc.Remove(monhoc);
                    await _context.SaveChangesAsync();
                }
                return new ApiResult<object>(message: "true", data: monhoc);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }


    }
}
