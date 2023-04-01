using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
using testapi.Entities;
using testapi.Models.API;
using testapi.Services.MonHocServices;
using System.Linq;
using System.Collections.Generic;
using testapi.Models.UserModels;
using testapi.Models.MonHocModels;
using Microsoft.AspNetCore.Identity;
using testapi.Data;
using testapi.Models;
using Microsoft.Extensions.Logging;
using testapi.Models.ChuDeModels;
using testapi.Models.ChuongModels;
using testapi.Models.MobileModels;

namespace testapi.Services.MobileServices
{
    public class MobileService : IMobileService
    {
        private readonly dbHocTapContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender _emailSender;
        private readonly ILogger _logger;
        private readonly IConfigurationProvider _config;
        private readonly ApplicationDbContext _context1;
        private readonly IPasswordHasher _passwordHasher;
        private readonly ITokenService _tokenService;
        public MobileService(dbHocTapContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ApiResult<object>> GetAllChuDe()
        {
            try
            {
                List<Chude> dsUser = await _context.Chude.AsNoTracking().ToListAsync();
                var data = await _context.Chude.AsNoTracking().ToListAsync();

                return new ApiResult<object>(message: "true", data: data);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> GetMonHocBuy(int ChuDe,string email)
        {
            try
            {
            
                var user = _context.AspNetUsers.Include(x => x.Hoadon).ThenInclude(x => x.Cthoadon).ThenInclude(x => x.MaMhNavigation)
                    .Where(x => x.Email == email).First();

                var monhocs = user.Hoadon.SelectMany(x=>x.Cthoadon.Select(i=>i.MaMhNavigation)).ToList();
                monhocs = monhocs.Where(x=>x.MaChuDe == ChuDe).ToList();
           
                List<Monhoc> dsMonHoc = new List<Monhoc>();
                for (int i = 0; i < monhocs.Count; i++)
                {
                    var monhoc = _context.Monhoc.Include(x => x.Chuong).Where(x => x.MaMh == monhocs[i].MaMh).First();
                    dsMonHoc.Add(monhoc);
                }
                int total = monhocs.Count;


                var dsNoiDung = _mapper.Map<List<MonHocModel>>(monhocs);
                return new ApiResult<object>(message: "true", data: new { total, dsNoiDung });
            }
            catch (Exception ex) { throw; }
        }
        public async Task<ApiResult<object>> GetMonHocChuDe(int ChuDe)
        {
            try
            {
                var monhocs = _context.Monhoc.Where(x=> ChuDe == 0 || x.MaChuDe==ChuDe).ToList();
               
                int total = monhocs.Count;



                var dsNoiDung = _mapper.Map<List<MonHocModel>>(monhocs);
                return new ApiResult<object>(message: "true", data: new { total, dsNoiDung });
            }
            catch (Exception ex) { throw; }
        }
        public async Task<ApiResult<object>> getDetailChuong(int MaChuong)
        {
            try
            {
                var data = _context.Chuong.Include(t => t.Baihoc).Where(t => t.MaChuong == MaChuong).First();


                var chuong = _mapper.Map<ChuongModel>(data);
                return new ApiResult<object>(message: "true", data: new { chuong });
            }
            catch (Exception ex) { return new ApiResult<object>(message: "false", data: null); }
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
        public async Task<ApiResult<object>> postListBaiLam(MobileListBaiLam lstBaiLam)
        {
            try
            {
                if (lstBaiLam == null)
                    return new ApiResult<object>(message: "false", data: null);
                for (int i = 0; i < lstBaiLam.dsBaiLam.Count; i++)
                {
                    var postBL = _context.Bailam.Add(new Bailam()
                    {
                        MaKt = lstBaiLam.dsBaiLam[i].MaKt,
                        MaCh = lstBaiLam.dsBaiLam[i].MaCh,
                        DapAn = lstBaiLam.dsBaiLam[i].DapAn
                    });
                }

                await _context.SaveChangesAsync();
                return new ApiResult<object>(message: "true", data: true);
            }
            catch (Exception ex) { return new ApiResult<object>(message: "false", data: null); }

        }
    }
}
