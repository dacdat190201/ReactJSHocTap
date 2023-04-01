using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
using testapi.Entities;
using testapi.Models.API;
using System.Linq;
using System.Collections.Generic;
using testapi.Models.ChuongModels;
using testapi.Models.MonHocModels;
using testapi.Models.BaiHocModels;

namespace testapi.Services.ChuongService
{
    public class ChuongService : IChuongService
    {
        private readonly dbHocTapContext _context;
        private readonly IMapper _mapper;
        public ChuongService(dbHocTapContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ApiResult<object>> GetAllChuong(int maMH)
        {
            try
            {
                var data = await _context.Chuong.Where(t => t.MaMh == maMH).ToListAsync();

                return new ApiResult<object>(message: "true", data: data);

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> GetChuong(int MaChuong)
        {
            try
            {
                var chuong = await _context.Chuong.FirstOrDefaultAsync(x => x.MaChuong == MaChuong);

                return new ApiResult<object>(message: "true", data: chuong);

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> GetViewChuong(int MaChuong)
        {
            try
            {
                var chuong = await _context.Chuong.Include(t => t.Baihoc).Where(t=> t.MaChuong == MaChuong).FirstAsync();
                var result = _mapper.Map<ChuongModel>(chuong);

                return new ApiResult<object>(message: "true", data: result);

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> GetDetailChuong(int MaChuong)
        {
            try
            {
                var chuong = await _context.Chuong.FirstOrDefaultAsync(x => x.MaChuong == MaChuong);

                return new ApiResult<object>(message: "true", data: chuong);

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> postListChuong(List<ChapterModel> lstChuong, int maMH)
        {
            try
            {
                if (lstChuong.Count < 1)
                    return new ApiResult<object>(message: "false", data: null);
                for (int i = 0; i < lstChuong.Count; i++)
                {
                    var chuong = _context.Chuong.Add(new Chuong()
                    {
                        TenChuong = lstChuong[i].TenChuong,
                        MaMh = maMH
                    });
                }
                await _context.SaveChangesAsync();

                List<Chuong> dsChuong = await _context.Chuong.AsNoTracking().ToListAsync();

                for (int i = 0; i < lstChuong.Count; i++)
                    for (int j = 0; j < lstChuong[i].BaiHoc.Count; j++)
                    {
                        var baiHoc = _context.Baihoc.Add(new Baihoc()
                        {
                            MaChuong = dsChuong[dsChuong.Count - lstChuong.Count + i].MaChuong,
                            TenBh = lstChuong[i].BaiHoc[j].TenBh,
                            NoiDung = lstChuong[i].BaiHoc[j].NoiDung
                        });
                    }
                await _context.SaveChangesAsync();
                return new ApiResult<object>(message: "true", data: true);
            }
            catch (Exception ex) { return new ApiResult<object>(message: "false", data: null); }
        }
        public async Task<ApiResult<object>> editListCauHoi(List<ViewChapterModel> lstChuong)
        {
            try
            {
                if (lstChuong.Count < 1)
                    return new ApiResult<object>(message: "false", data: null);
                for (int i = 0; i < lstChuong.Count; i++)
                {
                    Chuong chuong = await _context.Chuong.FindAsync(lstChuong[i].MaChuong);
                    if (chuong != null)
                    {
                        chuong.TenChuong = lstChuong[i].TenChuong;
                        _context.Chuong.Update(chuong);
                    }
                    for (int j = 0; j < lstChuong[i].BaiHoc.Count; j++)
                    {
                        Baihoc baiHoc = await _context.Baihoc.FindAsync(lstChuong[i].BaiHoc[j].MaBh);
                        if (baiHoc != null)
                        {
                            baiHoc.TenBh = lstChuong[i].BaiHoc[j].TenBh;
                            baiHoc.NoiDung = lstChuong[i].BaiHoc[j].NoiDung;

                            _context.Baihoc.Update(baiHoc);
                        }
                    }
                }

                await _context.SaveChangesAsync();
                return new ApiResult<object>(message: "true", data: true);
            }
            catch (Exception ex) { return new ApiResult<object>(message: "false", data: null); }
        }
        public async Task<ApiResult<object>> postChuong(ViewChuongModel chuong)
        {
            try
            {
                var ch = _context.Chuong.Add(new Chuong()
                {
                    TenChuong = chuong.TenChuong,
                    MaMh = chuong.MaMh
                });

                await _context.SaveChangesAsync();

                return new ApiResult<object>(message: "true", data: true);

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> DelChuong(int maChuong)
        {
            try
            {
                Chuong chuong = await _context.Chuong.FindAsync(maChuong);
                List<Baihoc> dsBaiHoc = _context.Baihoc.Where(t => t.MaChuong == maChuong).ToList();
                for (int i = 0; i < dsBaiHoc.Count; i++)
                {
                    _context.Baihoc.Remove(dsBaiHoc[i]);
                }
                if (chuong != null)
                {
                    _context.Chuong.Remove(chuong);
                    await _context.SaveChangesAsync();
                }
                return new ApiResult<object>(message: "true", data: true);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> EditChuong(ViewChuongModel chuong)
        {
            try
            {
                Chuong chuongUp = await _context.Chuong.FindAsync(chuong.MaChuong);
                if (chuongUp != null)
                {
                    chuongUp.TenChuong = chuong.TenChuong;

                    _context.Chuong.Update(chuongUp);
                    await _context.SaveChangesAsync();
                }

                return new ApiResult<object>(message: "true", data: chuongUp);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> postBaiHoc(BaiHocModel baiHoc)
        {
            try
            {
                var bh = _context.Baihoc.Add(new Baihoc()
                {
                    MaChuong = baiHoc.MaChuong,
                    TenBh = baiHoc.TenBh,
                    NoiDung = baiHoc.NoiDung
                });

                await _context.SaveChangesAsync();

                return new ApiResult<object>(message: "true", data: true);

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
    }
}

