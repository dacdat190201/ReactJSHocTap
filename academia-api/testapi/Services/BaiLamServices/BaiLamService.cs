using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using testapi.Entities;
using testapi.Models.API;
using testapi.Models.BaiLamModels;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace testapi.Services.BaiLamServices
{
    public class BaiLamService : IBaiLamService
    {
        private readonly dbHocTapContext _context;
        public BaiLamService(dbHocTapContext context)
        {
            _context = context;
        }

        public async Task<ApiResult<object>> getAllBaiLam()
        {
            try
            {
                var data = await _context.Bailam.AsNoTracking().ToListAsync();
                int total = data.Count;
                if (total == 0)
                    return new ApiResult<object>(message: "false", data: null);
                return new ApiResult<object>(message: "true", data: new { total, data });
            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }
        }

        public async Task<ApiResult<object>> PostBaiLam(ViewBaiLamModel bailam)
        {
            try
            {
                var postBL = _context.Bailam.Add(new Bailam()
                {
                    MaKt = bailam.MaKt,
                    MaCh = bailam.MaCh,
                    DapAn = bailam.DapAn
                });
                if (postBL is null)
                    return new ApiResult<object>(message: "false", data: null);
                await _context.SaveChangesAsync();
                return new ApiResult<object>(message: "true", data: true);
            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }
        }

        public async Task<ApiResult<object>> getBaiLam(int maKT)
        {
            try
            {
                var data = _context.Bailam.Where(t => t.MaKt == maKT).ToList();

                return new ApiResult<object>(message: "true", data: data);
            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }
        }
    }
}
