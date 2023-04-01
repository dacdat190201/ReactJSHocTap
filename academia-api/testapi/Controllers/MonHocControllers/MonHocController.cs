using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage;
using System.Threading.Tasks;
using System.Xml.Linq;
using testapi.Entities;
using testapi.Models.AdminModels.PostAllUser;
using testapi.Models.API;
using testapi.Models.ChuDeModels;
using testapi.Models.MonHocModels;
using testapi.Services;
using testapi.Services.MonHocServices;

namespace testapi.Controllers
{
    // [Authorize]
    [Route("[controller]/[action]")]
    public class MonHocController : Controller
    {

        private readonly IMonHocService _monhocService;
        
        

        public MonHocController(IMonHocService monhocService)
        {
            _monhocService = monhocService;
           
        }
     
        [HttpGet]
        public async Task<IActionResult> GetMonhocAllAsync()
        {
            var data = await _monhocService.GetMonhocAll();
            if (data == null)
                return NotFound();
            return Ok(data);
            //tra ve DL thoi
        }
        [HttpGet]
        public async Task<IActionResult> GetMonhocAsync(int MaMh)
        {
            var data = await _monhocService.GetMonhoc(MaMh);
            if (data == null) return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> PostMonHoc([FromBody] MonHocModel monHoc)
        {
            var data = await _monhocService.PostMonHoc(monHoc);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpDelete]
        public async Task<IActionResult> DelMonhoc(int maMH)
        {
            var data = await _monhocService.DelMonhoc(maMH);
            if (data == null)
                return NotFound();
            return Ok(data);
        }

        [HttpPut]
        public async Task<IActionResult> EditMonhoc(int maMh, [FromBody] MonHocModel monHoc)
        {
            var data = await _monhocService.EditMonhoc(maMh, monHoc);
            if (data == null)
                return NotFound();
            return Ok(data);

        }
       
        //Mapper
        [HttpGet]
        public async Task<IActionResult> MonhocDetails(int maMh)
        {
            var data = await _monhocService.MonhocDetails(maMh);
            if (data == null)
                return NotFound();
            return Ok(data);

        }
        [HttpGet]
        public async Task<IActionResult> MonHocCauHoiDetail(int MaBh)
        {
            var data = await _monhocService.MonHocCauHoiDetails(MaBh);
            if (data == null)
                return NotFound();
            return Ok(data);

        }
        [HttpGet]
        public async Task<IActionResult> Get8MonHoc()
        {
            var data = await _monhocService.Get8MonHoc();
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetChuDe()
        {
            var data = await _monhocService.GetChuDe();
            if (data == null)
                return NotFound();
            return Ok(data);

        }
        [HttpGet]
        public async Task<IActionResult> Get1ChuDe(int machude)
        {
            var data = await _monhocService.Get1ChuDe(machude);
            if (data == null)
                return NotFound();
            return Ok(data);

        }
        [HttpPut]
        public async Task<IActionResult> UpdateChuDe(int MaCD, [FromForm] ChuDeModel chude)
        {
            var data = await _monhocService.UpdateChuDe(MaCD, chude);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> PostChuDe([FromBody] ChuDeModel chude)
        {
            var data = await _monhocService.PostChuDe(chude);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpDelete]
        public async Task<IActionResult> DelChuDe(int macd)
        {
            var data = await _monhocService.DelChuDe(macd);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllChuDe()
        {
            var data = await _monhocService.GetAllChuDe();
            if (data == null)
                return NotFound();
            return Ok(data);

        }
    }
}
