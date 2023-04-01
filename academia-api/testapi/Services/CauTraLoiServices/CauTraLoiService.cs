using AutoMapper;
using System.Threading.Tasks;
using System;
using testapi.Entities;
using testapi.Models.API;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using testapi.Models.CauTraLoiModels;

namespace testapi.Services.CauTraLoiServices
{
    public class CauTraLoiService : ICauTraLoiService
    {
        private readonly dbHocTapContext _context;
        private readonly IMapper _mapper;

        public CauTraLoiService(dbHocTapContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ApiResult<object>> GetCauTraLoi(int maCTL)
        {
            try
            {
                var data = _context.Cautraloi.Where(t => t.MaCtl == maCTL).First();
                if (data == null)
                    return new ApiResult<object>(message: "false", data: null);

                return new ApiResult<object>(message: "true", data: new { data });                

            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }
        }

        public async Task<ApiResult<object>> PostCauTraLoi(ViewCauTraLoiModel cauTraLoi)
        {
            try
            {
                var cauTL = _context.Cautraloi.Add(new Cautraloi()
                {
                    MaCh = cauTraLoi.MaCh,
                    CauA = cauTraLoi.CauA,
                    CauB = cauTraLoi.CauB,
                    CauC = cauTraLoi.CauC,
                    CauD = cauTraLoi.CauD
                });

                await _context.SaveChangesAsync();

                return new ApiResult<object>(message: "true", data: cauTL);                

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> DelCauTraLoi(int maCTL)
        {
            try
            {
                Cautraloi cauTL = await _context.Cautraloi.FindAsync(maCTL);
                if (cauTL != null)
                {
                    _context.Cautraloi.Remove(cauTL);
                    await _context.SaveChangesAsync();
                }
                return new ApiResult<object>(message: "true", data: new { cauTL });                
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> EditCauTraLoi(int maCTL, ViewCauTraLoiModel cauTraLoi)
        {
            try
            {
                Cautraloi cauTL = await _context.Cautraloi.FindAsync(maCTL);
                if (cauTL != null)
                {
                    cauTL.MaCh = cauTraLoi.MaCh;
                    cauTL.CauA = cauTraLoi.CauA;
                    cauTL.CauB = cauTraLoi.CauB;
                    cauTL.CauC = cauTraLoi.CauC;
                    cauTL.CauD = cauTraLoi.CauD;

                    _context.Cautraloi.Update(cauTL);
                    await _context.SaveChangesAsync();
                }

                return new ApiResult<object>(message: "true", data: new {cauTL});                
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
    }
}
