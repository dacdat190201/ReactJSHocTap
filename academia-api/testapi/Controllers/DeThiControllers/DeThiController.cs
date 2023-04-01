using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;
using testapi.Models.DethiModels;
using testapi.Services.DeThiServices;

namespace testapi.Controllers.DeThi
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class DeThiController : ControllerBase
    {
        private readonly IDeThiService _deThiService;

        public DeThiController(IDeThiService deThiService)
        {
            _deThiService = deThiService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDeThi()
        {
            var data = await _deThiService.GetAllDeThi();
            if (data == null)
                return NotFound();
            return Ok(data);
        }

        [HttpGet]
        public async Task<IActionResult> GetDeThiByMaDe(int maDe)
        {
            var data = await _deThiService.GetDeThiByMaDe(maDe);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetDeThiByMaMH(int maMH)
        {
            var data = await _deThiService.GetDeThiByMaMH(maMH);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllDeThiByMaMH(int maMH)
        {
            var data = await _deThiService.GetAllDeThiByMaMH(maMH);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> PostDeThi([FromBody] ViewDeThiModel deThi)
        {
            var data = await _deThiService.postDeThi(deThi);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> editDeThi(int maDe, [FromBody] ViewDeThiModel deThi)
        {
            var data = await _deThiService.editDeThi(maDe, deThi);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> DelDeThi(int maDe)
        {
            var data = await _deThiService.delDeThi(maDe);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetDeThiByMaMHMobile(int maMH)
        {
            var data = await _deThiService.GetDeThiByMaMHMobile(maMH);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetDeThiByMa(int ma, int loai)
        {
            var data = await _deThiService.GetDeThiByMa(ma, loai);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
    }
}
