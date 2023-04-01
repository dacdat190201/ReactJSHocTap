    using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using testapi.Models.MobileModels;
using testapi.Services.CauHoiServices;
using testapi.Services.DeThiServices;
using testapi.Services.GiaoVienService;
using testapi.Services.MobileServices;

namespace testapi.Controllers.MobileController
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class MobileConTroller : ControllerBase
    {
        private readonly IMobileService _mobileService;
       
        public MobileConTroller(IMobileService mobileService, IDeThiService deThiService)
        {
            _mobileService = mobileService;
            
        }
        [HttpGet]
        public async Task<IActionResult> GetAllChuDe()
        {
            var data = await _mobileService.GetAllChuDe();
            if (data == null)
                return NotFound();
            return Ok(data);
            //tra ve DL thoi
        }
        [HttpGet]
        public async Task<IActionResult> GetMonHocChuDe(int maChuDe)
            {
            var data = await _mobileService.GetMonHocChuDe(maChuDe);
            if (data == null)
                return NotFound();
            return Ok(data);
            //tra ve DL thoi
        }
        [HttpGet]
        public async Task<IActionResult> ChuDeMonHocBuy(int chuDe, string email)
        {
            var data = await _mobileService.GetMonHocBuy(chuDe, email);
            if (data == null)
                return NotFound();
            return Ok(data);
            //tra ve DL thoi
        }
        [HttpGet]
        public async Task<IActionResult> GetDetailChuong(int MaChuong)
        {
            var data = await _mobileService.getDetailChuong(MaChuong);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetDeThiByMaMHMobile(int maMH)
        {
            var data = await _mobileService.GetDeThiByMaMHMobile(maMH);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> PostListBaiLam([FromBody] MobileListBaiLam lstBailam)
        {
            var data = await _mobileService.postListBaiLam(lstBailam);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
    }
}
