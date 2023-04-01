using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using testapi.Models.CauHoiModels;
using testapi.Services.CauHoiServices;

namespace testapi.Controllers.CauHoi
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class CauHoiController : ControllerBase
    {
        private readonly ICauHoiService _cauHoiService;

        public CauHoiController(ICauHoiService cauHoiService)
        {
            _cauHoiService = cauHoiService;
        }
        [HttpGet]
        public async Task<IActionResult> getAllCauHoi()
        {
            var data = await _cauHoiService.GetAllCauHoi();
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> getCauHoi(int maCh)
        {
            var data = await _cauHoiService.GetCauHoi(maCh);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> getNewCauHoi()
        {
            var data = await _cauHoiService.GetNewCauHoi();
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> postCauHoi([FromBody] ViewCauHoiModel cauHoi)
        {
            var data = await _cauHoiService.PostCauHoi(cauHoi);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> delCauHoi(int maCh)
        {
            var data = await _cauHoiService.DelCauHoi(maCh);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> editCauHoi(int maCh, [FromBody] ViewCauHoiModel cauHoi)
        {
            var data = await _cauHoiService.EditCauHoi(maCh, cauHoi);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> postListCauHoi([FromBody] List<QuestionModel> lstCauHoi, int maDe)
        {
            var data = await _cauHoiService.postListCauHoi(lstCauHoi, maDe);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> editListCauHoi([FromBody] List<ViewQuestionModel> lstCauHoi, int maDe)
        {
            var data = await _cauHoiService.editListCauHoi(lstCauHoi, maDe);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
    }
}
