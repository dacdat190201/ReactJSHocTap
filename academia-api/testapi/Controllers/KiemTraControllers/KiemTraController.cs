using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using testapi.Models.KiemTraModels;
using testapi.Services.BaiLamServices;
using testapi.Services.KiemTraServices;

namespace testapi.Controllers.KiemTraControllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class KiemTraController : ControllerBase
    {
        private readonly IKiemTraService _kiemTraService;

        public KiemTraController(IKiemTraService kiemTraService)
        {
            _kiemTraService = kiemTraService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllKiemTra()
        {
            var data = await _kiemTraService.GetAllKiemTra();
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetKiemTra(int MaKT)
        {
            var data = await _kiemTraService.GetKiemTra(MaKT);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> PostKiemTra(string email, [FromBody] ViewKiemTraModel kiemTra)
        {
            var data = await _kiemTraService.postKiemTra(email, kiemTra);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> tinhDiem(int maKT, string thoiGian)
        {
            var data = await _kiemTraService.tinhDiem(maKT, thoiGian);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetXepHang(int maMH)
        {
            var data = await _kiemTraService.getXepHang(maMH);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetXepHangByMa(int ma, int loai)
        {
            var data = await _kiemTraService.getXepHangByMa(ma, loai);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetXepHangUser(int maMH,string email)
        {
            var data = await _kiemTraService.getXepHangUser(maMH,email);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
    }
}
