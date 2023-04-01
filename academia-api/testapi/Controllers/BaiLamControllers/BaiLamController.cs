using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage;
using System.Threading.Tasks;
using System.Xml.Linq;
using testapi.Entities;
using testapi.Models.BaiLamModels;
using testapi.Services;
using testapi.Services.BaiLamServices;
using testapi.Services.KiemTraServices;

namespace testapi.Controllers
{
    // [Authorize]
    [Route("[controller]/[action]")]
    [ApiController]
    public class BaiLamController : ControllerBase
    {
        private readonly IBaiLamService _baiLamService;
        private readonly IKiemTraService _kiemTraService;

        public BaiLamController(IBaiLamService baiLamService, IKiemTraService kiemTraService)
        {
            this._baiLamService = baiLamService;
            _kiemTraService = kiemTraService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBaiLam()
        {
            var data = await _baiLamService.getAllBaiLam();
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> PostBaiLam([FromBody] ViewBaiLamModel bailam)
        {
            var data = await _baiLamService.PostBaiLam(bailam);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetBaiLam(int MaKT)
        {
            var data = await _baiLamService.getBaiLam(MaKT);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
    }
}
