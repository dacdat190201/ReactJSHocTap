using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
using testapi.Entities;
using testapi.Models.API;
using System.Collections.Generic;
using testapi.Models.CauHoiModels;
using testapi.Models.ChuongModels;
using System.Linq;
using testapi.Models.BaiHocModels;
using testapi.Services.ChuongService;
namespace testapi.Services.BaiHocServices
{
    public class BaiHocService : IBaiHocService
    {
        private readonly dbHocTapContext _context;
        private readonly IMapper _mapper;
        public BaiHocService(dbHocTapContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ApiResult<object>> GetAllBaiHoc(int maChuong)
        {
            try
            {
                var dsBaiHoc = _context.Baihoc.Where(t => t.MaChuong == maChuong).ToList();
                var data = dsBaiHoc.Select(t => new BaiHocModel()
                {
                    MaBh = t.MaBh,
                    TenBh = t.TenBh,
                    MaChuong = t.MaChuong,
                    NoiDung = t.NoiDung
                }).ToList();
                int total = data.Count();

                return new ApiResult<object>(message: "true", data: new { data, total });

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> GetBaiHoc(int maBH)
        {
            try
            {
                var data = await _context.Baihoc.FirstOrDefaultAsync(x => x.MaBh == maBH);

                return new ApiResult<object>(message: "true", data: data);

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
        public async Task<ApiResult<object>> DelBaiHoc(int maBH)
        {
            try
            {
                Baihoc bh = await _context.Baihoc.FindAsync(maBH);
                if (bh != null)
                {
                    _context.Baihoc.Remove(bh);
                    await _context.SaveChangesAsync();
                }
                return new ApiResult<object>(message: "true", data: true);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> EditBaiHoc(BaiHocModel baiHoc)
        {
            try
            {
                Baihoc baiHocUp = await _context.Baihoc.FindAsync(baiHoc.MaBh);
                if (baiHocUp != null)
                {
                    baiHocUp.TenBh = baiHoc.TenBh;
                    baiHocUp.NoiDung = baiHoc.NoiDung;

                    _context.Baihoc.Update(baiHocUp);
                    await _context.SaveChangesAsync();
                }

                return new ApiResult<object>(message: "true", data: true);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
    }
}
