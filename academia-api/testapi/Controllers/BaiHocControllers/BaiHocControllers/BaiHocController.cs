using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using testapi.Models.BaiHocModels;
using testapi.Services.BaiHocServices;
using testapi.Services.MonHocServices;

namespace testapi.Controllers.BaiHocControllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class BaiHocController : ControllerBase
    {        
        private readonly IBaiHocService _baiHocService;



        public BaiHocController(IBaiHocService baiHocService )
        {
            _baiHocService = baiHocService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllBaiHoc(int MaChuong)
        {
            var data = await _baiHocService.GetAllBaiHoc(MaChuong);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> PostBaiHoc([FromBody] BaiHocModel baiHoc)
        {
            var data = await _baiHocService.postBaiHoc(baiHoc);
            if (data == null) return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> DelBaiHoc(int MaBH)
        {
            var data = await _baiHocService.DelBaiHoc(MaBH);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> EditBaiHoc([FromBody] BaiHocModel baiHoc)
        {
            var data = await _baiHocService.EditBaiHoc(baiHoc);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
    }
}
