using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using testapi.Models.CauTraLoiModels;
using testapi.Services.CauTraLoiServices;

namespace testapi.Controllers.CauTraLoi
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class CauTraLoiController : ControllerBase
    {
        private ICauTraLoiService _cauTraLoiService;
        public CauTraLoiController(ICauTraLoiService cauTraLoiService)
        {
            _cauTraLoiService = cauTraLoiService;
        }

        [HttpGet]
        public async Task<IActionResult> getCauTraLoi(int maCh)
        {
            var data = await _cauTraLoiService.GetCauTraLoi(maCh);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> postCauTraLoi([FromBody] ViewCauTraLoiModel CauTraLoi)
        {
            var data = await _cauTraLoiService.PostCauTraLoi(CauTraLoi);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> delCauTraLoi(int maCh)
        {
            var data = await _cauTraLoiService.DelCauTraLoi(maCh);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> editCauTraLoi(int maCh, [FromBody] ViewCauTraLoiModel CauTraLoi)
        {
            var data = await _cauTraLoiService.EditCauTraLoi(maCh, CauTraLoi);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
    }
}
