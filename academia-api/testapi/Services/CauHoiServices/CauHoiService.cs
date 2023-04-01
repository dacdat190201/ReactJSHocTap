using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Razor.Parser.SyntaxTree;
using testapi.Entities;
using testapi.Models.API;
using testapi.Models.CauHoiModels;
using testapi.Models.DethiModels;
using testapi.Models.DonHangModels;
using testapi.Models.MobileModels;

namespace testapi.Services.CauHoiServices
{
    public class CauHoiService : ICauHoiService
    {
        private dbHocTapContext _context;
        private IMapper _mapper;

        public CauHoiService(dbHocTapContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ApiResult<object>> GetAllCauHoi()
        {
            try
            {
                var data = await _context.Cauhoi.Include(t => t.Cautraloi)
                           .ToListAsync();

                int total = data.Count;

                var dsCauHoi = _mapper.Map<List<CauHoiModel>>(data);


                return new ApiResult<object>(message: "true", data: new { total, dsCauHoi });
            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }
        }
        public async Task<ApiResult<object>> GetCauHoi(int maCh)
        {
            try
            {
                var data = _context.Cauhoi.Include(t => t.Cautraloi)
                           .Where(t => t.MaCh == maCh).First();
                if (data == null)
                    return new ApiResult<object>(message: "false", data: null);

                var result = _mapper.Map<CauHoiModel>(data);


                return new ApiResult<object>(message: "true", data: new { result });

            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }
        }
        public async Task<ApiResult<object>> PostCauHoi(ViewCauHoiModel cauHoi)
        {
            try
            {
                var ct = _context.Cauhoi.Add(new Cauhoi()
                {
                    TenCauHoi = cauHoi.TenCauHoi,
                    DapAn = cauHoi.DapAn,
                    GiaiThich = cauHoi.GiaiThich,
                    LoaiCauHoi = cauHoi.LoaiCauHoi,
                    Type = 1,
                });

                await _context.SaveChangesAsync();

                return new ApiResult<object>(message: "true", data: ct.Entity);

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> DelCauHoi(int maCh)
        {
            try
            {
                Cauhoi cauHoi = await _context.Cauhoi.FindAsync(maCh);
                if (cauHoi != null)
                {
                    var cauTL = from ctl in _context.Cautraloi
                                where ctl.MaCh == maCh
                                select ctl;
                    int total = cauTL.Count();
                    cauTL.Select(t => _context.Remove(t));
                    _context.Cauhoi.Remove(cauHoi);
                    await _context.SaveChangesAsync();
                }
                return new ApiResult<object>(message: "true", data: new { cauHoi });
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> EditCauHoi(int maCh, ViewCauHoiModel cauHoi)
        {
            try
            {
                Cauhoi ct = await _context.Cauhoi.FindAsync(maCh);
                if (ct != null)
                {
                    ct.TenCauHoi = cauHoi.TenCauHoi;
                    ct.LoaiCauHoi = cauHoi.LoaiCauHoi;
                    ct.GiaiThich = cauHoi.GiaiThich;
                    ct.DapAn = cauHoi.DapAn;

                    _context.Cauhoi.Update(ct);
                    await _context.SaveChangesAsync();
                }

                return new ApiResult<object>(message: "true", data: ct);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> GetNewCauHoi()
        {
            try
            {
                var data = await _context.Cauhoi.ToListAsync();

                int total = data.Count;

                var result = _mapper.Map<CauHoiModel>(data[total - 1]);


                return new ApiResult<object>(message: "true", data: result);
            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }
        }
        public async Task<ApiResult<object>> postListCauHoi(List<QuestionModel> lstCauHoi, int maDe)
        {
            try
            {
                if (lstCauHoi.Count < 1)
                    return new ApiResult<object>(message: "false", data: null);
                for (int i = 0; i < lstCauHoi.Count; i++)
                {
                    var ct = _context.Cauhoi.Add(new Cauhoi()
                    {
                        TenCauHoi = lstCauHoi[i].TenCauHoi,
                        DapAn = lstCauHoi[i].DapAn,
                        GiaiThich = lstCauHoi[i].GiaiThich,
                        LoaiCauHoi = lstCauHoi[i].LoaiCauHoi,
                        Type =1,
                    });
                }
                await _context.SaveChangesAsync();

                List<Cauhoi> dsCauHoi = await _context.Cauhoi.AsNoTracking().ToListAsync();

                for (int i = 0; i < lstCauHoi.Count; i++)
                {
                    var cauTL = _context.Cautraloi.Add(new Cautraloi()
                    {
                        MaCh = dsCauHoi[dsCauHoi.Count - lstCauHoi.Count + i].MaCh,
                        CauA = lstCauHoi[i].CauA,
                        CauB = lstCauHoi[i].CauB,
                        CauC = lstCauHoi[i].CauC,
                        CauD = lstCauHoi[i].CauD
                    });
                    _context.Dethicauhoi.Add(new Dethicauhoi()
                    {
                        MaCh = dsCauHoi[dsCauHoi.Count - lstCauHoi.Count + i].MaCh,
                        MaDe = maDe
                    });
                }
                await _context.SaveChangesAsync();
                return new ApiResult<object>(message: "true", data: true);
            }
            catch (Exception ex) { return new ApiResult<object>(message: "false", data: null); }
        }
        
        public async Task<ApiResult<object>> editListCauHoi(List<ViewQuestionModel> lstCauHoi, int maDe)
        {
            try
            {
                if (lstCauHoi.Count < 1)
                    return new ApiResult<object>(message: "false", data: null);
                for (int i = 0; i < lstCauHoi.Count; i++)
                {
                    Cauhoi ct = await _context.Cauhoi.FindAsync(lstCauHoi[i].MaCh);
                    if (ct != null)
                    {
                        ct.TenCauHoi = lstCauHoi[i].TenCauHoi;
                        ct.LoaiCauHoi = lstCauHoi[i].LoaiCauHoi;
                        ct.GiaiThich = lstCauHoi[i].GiaiThich;
                        ct.DapAn = lstCauHoi[i].DapAn;

                        _context.Cauhoi.Update(ct);
                    }
                    Cautraloi cauTL = await _context.Cautraloi.FindAsync(lstCauHoi[i].MaCtl);
                    if (cauTL != null)
                    {
                        cauTL.CauA = lstCauHoi[i].CauA;
                        cauTL.CauB = lstCauHoi[i].CauB;
                        cauTL.CauC = lstCauHoi[i].CauC;
                        cauTL.CauD = lstCauHoi[i].CauD;

                        _context.Cautraloi.Update(cauTL);
                    }
                }

                await _context.SaveChangesAsync();
                return new ApiResult<object>(message: "true", data: true);
            }
            catch (Exception ex) { return new ApiResult<object>(message: "false", data: null); }
        }
    }
}
