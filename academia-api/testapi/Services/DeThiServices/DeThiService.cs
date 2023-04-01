using AutoMapper;
using Microsoft.Extensions.Configuration.UserSecrets;
using System;
using System.Threading.Tasks;
using testapi.Entities;
using testapi.Models.API;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using testapi.Models.DethiModels;
using System.Collections.Generic;
using testapi.Models.MobileModels;

namespace testapi.Services.DeThiServices
{
    public class DeThiService : IDeThiService
    {
        private readonly dbHocTapContext _context;
        private readonly IMapper _mapper;

        public DeThiService(dbHocTapContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ApiResult<object>> GetAllDeThi()
        {
            try
            {
                var data = await _context.Dethi.AsNoTracking().ToListAsync();
                if (data == null)
                    return new ApiResult<object>(message: "false", data: null);
                int total = data.Count();

                return new ApiResult<object>(message: "true", data: new { total, data });
            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }
        }

        public async Task<ApiResult<object>> GetDeThiByMaDe(int maDe)
        {
            try
            {
                //var data = await _context.Dethi.FirstOrDefaultAsync(x => x.MaDe == maDe);
                var data = _context.Dethi
                    .Include(t => t.Kiemtra).ThenInclude(t => t.Bailam)
                    .Include(t => t.Dethicauhoi).ThenInclude(t => t.MaChNavigation)
                    .ThenInclude(t => t.Cautraloi)
                    .Where(t => t.MaDe == maDe).First();
                //var data = _context.Dethi.Include(t => t.Kiemtra).ThenInclude(t => t.Bailam)
                //    .Where(t => t.MaDe == maDe).First();

                if (data == null)
                    return new ApiResult<object>(message: "false", data: null);

                var result = _mapper.Map<DethiModel>(data);


                return new ApiResult<object>(message: "true", data: new { result });

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> GetDeThiByMaMH(int maMH)
        {
            try
            {
                var data = _context.Dethi
                    .Include(t => t.Kiemtra).ThenInclude(t => t.Bailam)
                    .Include(t => t.Dethicauhoi).ThenInclude(t => t.MaChNavigation)
                    .ThenInclude(t => t.Cautraloi)
                    .Where(t => t.MaMh == maMH).ToList();
                int total = data.Count();
                Random random = new Random();
                int de = random.Next(total);

                if (data == null)
                    return new ApiResult<object>(message: "false", data: null);

                var result = _mapper.Map<DethiModel>(data[de]);

                return new ApiResult<object>(message: "true", data: new { total, result });

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }

        }

        public async Task<ApiResult<object>> GetAllDeThiByMaMH(int maMH)
        {
            try
            {
                var data = _context.Dethi
                    .Include(t => t.Kiemtra).ThenInclude(t => t.Bailam)
                    .Include(t => t.Dethicauhoi).ThenInclude(t => t.MaChNavigation)
                    .ThenInclude(t => t.Cautraloi)
                    .Where(t => t.MaMh == maMH).ToList();
                int total = data.Count();

                if (data == null)
                    return new ApiResult<object>(message: "false", data: null);

                var result = _mapper.Map<List<DethiModel>>(data);

                return new ApiResult<object>(message: "true", data: new { total, result });

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> postDeThi(ViewDeThiModel deThi)
        {
            try
            {
                var dethi = _context.Dethi.Add(new Dethi()
                {
                    MaBh = deThi.MaBh,
                    MaChuong = deThi.MaChuong,
                    MaMh = deThi.MaMh,
                    TenDeThi = deThi.TenDeThi,
                    Thoigian = deThi.Thoigian,
                    Soluong = deThi.Soluong
                });
                await _context.SaveChangesAsync();

                return new ApiResult<object>("true", true);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>("false", false);
            }
        }
        public async Task<ApiResult<object>> editDeThi(int maDe, ViewDeThiModel deThi)
        {
            try
            {
                Dethi dethiUp = _context.Dethi.Where(t => t.MaDe == maDe).First();

                dethiUp.MaBh = deThi.MaBh;
                dethiUp.MaChuong = deThi.MaChuong;
                dethiUp.MaMh = deThi.MaMh;
                dethiUp.TenDeThi = deThi.TenDeThi;
                dethiUp.Thoigian = deThi.Thoigian;
                dethiUp.Soluong = deThi.Soluong;

                await _context.SaveChangesAsync();

                return new ApiResult<object>("true", true);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>("false", false);
            }
        }
        public async Task<ApiResult<object>> delDeThi(int maDe)
        {
            try
            {
                var dethiUp = _context.Dethi.Where(t => t.MaDe == maDe).First();
                _context.Dethi.Remove(dethiUp);

                await _context.SaveChangesAsync();

                return new ApiResult<object>("true", true);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>("false", false);
            }
        }
        public async Task<ApiResult<object>> GetDeThiByMaMHMobile(int maMH)
        {
            try
            {
                var data = _context.Dethi.Where(t => t.MaMh == maMH).ToList();
                int total = data.Count();
                Random random = new Random();
                int de = random.Next(total);

                List<Dethicauhoi> dsDTCH = _context.Dethicauhoi.Where(t => t.MaDe == data[de].MaDe).ToList();
                List<Cauhoi> dsCauHoi = new List<Cauhoi>();
                List<Cautraloi> dsCTL = new List<Cautraloi>();
                foreach (var dtch in dsDTCH)
                {
                    dsCauHoi.Add(_context.Cauhoi.Where(t => t.MaCh == dtch.MaCh).First());
                    dsCTL.Add(_context.Cautraloi.Where(t => t.MaCh == dtch.MaCh).First());
                }

                List<MobileCauHoiModel> dsCHMobile = new List<MobileCauHoiModel>();

                int id = 1;
                for (int i = 0; i < dsCTL.Count; i++)
                {
                    MobileCauHoiModel ch = new MobileCauHoiModel();
                    ch.MaCh = dsCauHoi[i].MaCh;
                    ch.TenCauHoi = dsCauHoi[i].TenCauHoi;
                    ch.DapAn = dsCauHoi[i].DapAn;
                    ch.LoaiCauHoi = dsCauHoi[i].LoaiCauHoi;
                    ch.GiaiThich = dsCauHoi[i].GiaiThich;
                    ch.Type = dsCauHoi[i].Type;

                    List<MoblieCauTraLoiModel> dsCTLMobile = new List<MoblieCauTraLoiModel>();
                    MoblieCauTraLoiModel a = new MoblieCauTraLoiModel(id++, dsCTL[i].MaCh, dsCTL[i].CauA);
                    MoblieCauTraLoiModel b = new MoblieCauTraLoiModel(id++, dsCTL[i].MaCh, dsCTL[i].CauB);
                    MoblieCauTraLoiModel c = new MoblieCauTraLoiModel(id++, dsCTL[i].MaCh, dsCTL[i].CauC);
                    MoblieCauTraLoiModel d = new MoblieCauTraLoiModel(id++, dsCTL[i].MaCh, dsCTL[i].CauD);

                    dsCTLMobile.Add(a);
                    dsCTLMobile.Add(b);
                    dsCTLMobile.Add(c);
                    dsCTLMobile.Add(d);

                    ch.dsCauTraLoi = dsCTLMobile;
                    dsCHMobile.Add(ch);
                }

                Dethi dethi = _context.Dethi.Where(t => t.MaDe == data[de].MaDe).First();
                MobileDeThiModel deThiMobile = new MobileDeThiModel();
                deThiMobile.MaDe = dethi.MaDe;
                deThiMobile.MaBh = dethi.MaBh;
                deThiMobile.MaChuong = dethi.MaChuong;
                deThiMobile.MaMh = dethi.MaMh;
                deThiMobile.TenDeThi = dethi.TenDeThi;
                deThiMobile.Thoigian = dethi.Thoigian;
                deThiMobile.Soluong = dethi.Soluong;

                deThiMobile.dsCauHoi = dsCHMobile;


                return new ApiResult<object>(message: "true", data: deThiMobile);

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }

        public async Task<ApiResult<object>> GetDeThiByMa(int ma, int loai)
        {
            try
            {
                var data = _context.Dethi
                    .Include(t => t.Kiemtra).ThenInclude(t => t.Bailam)
                    .Include(t => t.Dethicauhoi).ThenInclude(t => t.MaChNavigation)
                    .ThenInclude(t => t.Cautraloi)
                    .Where(t => loai == 1 ? t.MaMh == ma : t.MaChuong == ma).ToList();

                int total = data.Count();
                Random random = new Random();
                int de = random.Next(total);

                if (data == null)
                    return new ApiResult<object>(message: "false", data: null);

                var result = _mapper.Map<DethiModel>(data[de]);

                return new ApiResult<object>(message: "true", data: new { total, result });

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }

        }

    }
}
