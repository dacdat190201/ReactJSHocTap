using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using testapi.Models.ChuongModels;
using testapi.Models.MonHocModels;
using testapi.Services.BaiHocServices;
using testapi.Services.ChuongService;
using testapi.Services.MonHocServices;

namespace testapi.Controllers.Chuong
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ChuongController : ControllerBase
    {
        private readonly IChuongService _chuongService;
        private readonly IBaiHocService _baiHocService;



        public ChuongController(IChuongService chuongService, IBaiHocService baiHocService)
        {
            _chuongService = chuongService;
            _baiHocService = baiHocService;

        }
        [HttpGet]
        public async Task<IActionResult> GetChuong(int MaChuong)
        {
            var data = await _chuongService.GetChuong(MaChuong);
            if (data == null) return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetViewChuong(int MaChuong)
        {
            var data = await _chuongService.GetViewChuong(MaChuong);
            if (data == null) return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllChuong(int MaMH)
        {
            var data = await _chuongService.GetAllChuong(MaMH);
            if (data == null) return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> PostListChuong([FromBody] List<ChapterModel> lstChuong, int maMH)
        {
            var data = await _chuongService.postListChuong(lstChuong, maMH);
            if (data == null) return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> EditListCauHoi([FromBody] List<ViewChapterModel> lstChuong)
        {
            var data = await _chuongService.editListCauHoi(lstChuong);
            if (data == null) return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> PostChuong([FromBody] ViewChuongModel chuong)
        {
            var data = await _chuongService.postChuong(chuong);
            if (data == null) return NotFound();
            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> DelChuong(int maChuong)
        {
            var data = await _chuongService.DelChuong(maChuong);
            if (data == null) return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> EditChuong([FromBody] ViewChuongModel chuong)
        {
            var data = await _chuongService.EditChuong(chuong);
            if (data == null) return NotFound();
            return Ok(data);
        }
    }
}
