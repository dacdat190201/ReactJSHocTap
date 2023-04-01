using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using testapi.Services.AdminService;
using testapi.Services.DeThiServices;

namespace testapi.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ExampleController : ControllerBase
    {
        private readonly IDeThiService _deThiService;
        private readonly IAdminService _adminService;

        public ExampleController(IDeThiService deThiService, IAdminService adminService)
        {
            _deThiService = deThiService;
            _adminService = adminService;
        }

        [HttpPost]
        public async Task<IActionResult> testABC(string email, string quyen)
        {
            var data = await _adminService.postQuen(email, quyen);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
    }
}
