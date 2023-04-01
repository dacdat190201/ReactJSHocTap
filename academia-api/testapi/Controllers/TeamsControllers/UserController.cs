using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using testapi.Models.AdminModels.PostAllUser;
using testapi.Models.MonHocModels;
using testapi.Services.GiaoVienService;
using testapi.Services.UserSevice;

namespace testapi.Controllers.Teams
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserSevice _userSevice;


        public UserController(IUserSevice userSevice)
        {
                _userSevice= userSevice;

        }
        [HttpGet]
        public async Task<IActionResult> MonHocByUser(string email)
        {
            var data = await _userSevice.MonhocByUser(email);
            if (data == null)
                return NotFound();
            return Ok(data);
            //tra ve DL thoi
        }
        [HttpGet]
        public async Task<IActionResult> ProfileUser(string email)
        {
            var data = await _userSevice.ProfileUser(email);
            if (data == null)
                return NotFound();
            return Ok(data);
            //tra ve DL thoi
        }
        [HttpPut]
        public async Task<IActionResult> UpdateImages(string email, [FromForm] UserView user)
        {
            var data = await _userSevice.UploadImages(email, user);
            if (data == null)
                return NotFound();
            return Ok(data);

        }
        [HttpPut]
        public async Task<IActionResult> EditUser(string email, [FromBody] UserView user)
        {
            var data = await _userSevice.EditUser(email, user);
            if (data == null)
                return NotFound();
            return Ok(data);

        }
    }
}
