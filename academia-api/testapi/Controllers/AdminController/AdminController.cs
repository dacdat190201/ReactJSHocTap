using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using testapi.Models.AdminModels.PostAllUser;
using testapi.Models.MonHocModels;
using testapi.Services.AdminService;
using testapi.Services.MonHocServices;

namespace testapi.Controllers.Admin
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;



        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet]
        public async Task<IActionResult> AdminGetAllUser()
        {
            var data = await _adminService.AdminGetAllUser();
            if (data == null)
                return NotFound();
            return Ok(data);
            //tra ve DL thoi
        }
        [HttpGet]
        public async Task<IActionResult> AdminGet5User()
        {
            var data = await _adminService.AdminGet5User();
            if (data == null)
                return NotFound();
            return Ok(data);
            //tra ve DL thoi
        }
        [HttpGet]
        public async Task<IActionResult> AdminGetUser(int MaSV)
        {
            var data = await _adminService.AdminGetUser(MaSV);
            if (data == null) return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> DelAdminUser(string id)
        {
            var data = await _adminService.DelAdminUser(id);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPut]
        public async Task<IActionResult> AdminUpdateUser(int MaSV, [FromForm]UserView user)
        {
            var data = await _adminService.UpdateUser(MaSV, user);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateHinhAnhProduct(int maMh, [FromForm] MonHocModel mh)
        {
            var data = await _adminService.UploadProduct(maMh, mh);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPut]
        public async Task<IActionResult> EditMon(int maMh, [FromBody] MonHocModel mh)
        {
            var data = await _adminService.EditMon(maMh, mh);
            if (data == null)
                return NotFound();
            return Ok(data);

        }
        [HttpGet]
        public async Task<IActionResult> GetAllQuyen()
        {
            var data = await _adminService.GetAllQuyen();
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> UpdateQuyen(string email, string quyen)
        {
            var data = await _adminService.UpdateQuyen(email, quyen);
            if (data == null)
                return NotFound();
            return Ok(data);
        }

    }
}
