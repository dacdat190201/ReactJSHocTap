using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using testapi.Models.ChuDeModels;
using testapi.Models.GiaoVienModels;
using testapi.Models.LopHocModels;
using testapi.Services.CauHoiServices;
using testapi.Services.GiaoVienService;

namespace testapi.Controllers.Teams
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly IGiaoVienService  _giaoVienService;
        private readonly ICauHoiService _cauHoiService;


        public TeamsController(IGiaoVienService giaoienService, ICauHoiService cauHoiService)
        {
            _giaoVienService = giaoienService;
            _cauHoiService = cauHoiService;

        }
        [HttpGet]
        public async Task<IActionResult> AllTeamAsync()
        {
            var data = await _giaoVienService.GetGiaoVienAll();
            if (data == null)
                return NotFound();
            return Ok(data);
            //tra ve DL thoi
        }
        [HttpGet]
        public async Task<IActionResult> GetTemsDetail(int MaGV)
        {
            var data = await _giaoVienService.TeamDetail(MaGV);
            if (data == null)
                return NotFound();
            return Ok(data);
            //tra ve DL thoi
        }
        [HttpGet]
        public async Task<IActionResult> GetAllCauHoi()
        {
            var data = await _cauHoiService.GetAllCauHoi();
            if (data == null)
                return NotFound();
            return Ok(data);
            //tra ve DL thoi
        }
        [HttpGet]
        public async Task<IActionResult> Get6GiaoVien()
        {
            var data = await _giaoVienService.Get6GiaoVien();
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllLopHoc()
        {
            var data = await _giaoVienService.GetAllLopHoc();
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateGiaoVien(int MaGv, [FromForm] GiaoVienModel gv)
        {
            var data = await _giaoVienService.UpdateGiaoVien(MaGv, gv);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPut]
        public async Task<IActionResult> Update(int MaGv, [FromBody] GiaoVienModel gv)
        {
            var data = await _giaoVienService.Update(MaGv, gv);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> PostGiaoVien([FromBody] GiaoVienModel gv)
        {
            var data = await _giaoVienService.PostGiaoVien(gv);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpDelete]
        public async Task<IActionResult> DelGV(int ma)
        {
            var data = await _giaoVienService.DelGV(ma);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetLop(int ma)
        {
            var data = await _giaoVienService.GetLop(ma);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateLop(int ma, [FromBody] LopHocModel dt)
        {
            var data = await _giaoVienService.UpdateLopHoc(ma, dt);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> PostLop([FromBody] LopHocModel gv)
        {
            var data = await _giaoVienService.PostLop(gv);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpDelete]
        public async Task<IActionResult> DelLop(int ma)
        {
            var data = await _giaoVienService.DelLop(ma);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
    }
}
