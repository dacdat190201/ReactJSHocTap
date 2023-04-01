using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using testapi.Models;
using testapi.Models.AccountViewModels;
using testapi.Services;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Text;
using testapi.Extensions;
using testapi.Data;
using testapi.Entities;
using Microsoft.EntityFrameworkCore;
using System.Web.WebPages;
using System.Data;
using testapi.Controllers.Admin;
using testapi.Services.AdminService;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;
using System.Text.Encodings.Web;
using System.Net.WebSockets;
using Message = testapi.Models.AccountViewModels.Message;

//namespace DualAuthCore.Controllers

namespace testapi.Controllers
{
	[Authorize]
	[Route("[controller]/[action]")]
	public class AccountController : Controller
	{
        private readonly IAdminService _adminService;
       
			private readonly UserManager<ApplicationUser> _userManager;
			private readonly SignInManager<ApplicationUser> _signInManager;
			private readonly IEmailSender _emailSender;
            //private readonly EmailSender _emailSenderService;
            private readonly ILogger _logger;
			private readonly IConfiguration _config;
			private readonly ApplicationDbContext _context;
			private readonly IPasswordHasher _passwordHasher;
			private readonly ITokenService _tokenService;
            private readonly dbHocTapContext _data;

        public AccountController(
                IAdminService adminService,
                UserManager<ApplicationUser> userManager,
				SignInManager<ApplicationUser> signInManager,
				IEmailSender emailSender,
                //EmailSender emailSenderService,
				ILogger<AccountController> logger,
				IConfiguration config,
				ApplicationDbContext context,
				IPasswordHasher passwordHasher,
				ITokenService tokenService,
                dbHocTapContext data)
			{				
            _adminService = adminService;
				_userManager = userManager;
				_signInManager = signInManager;
				_emailSender = emailSender;
				_logger = logger;
				_config = config;
				_context = context;
				_passwordHasher = passwordHasher;
				_tokenService = tokenService;
                _data = data;
              //  _emailSenderService= emailSenderService;
			}

		[HttpPost]
		[AllowAnonymous]
        //public async Task<IActionResult> Register(string username, string password)
        public async Task<IActionResult> Register([FromBody] UserPass up)
        {
            try
            {
                var user = new ApplicationUser
                {
                    UserName = up.username,
                    Email = up.username,
                    HoTen = up.hoten,
                    PhoneNumber = up.sdt,
                    DiaChi = up.diachi,
                    EmailReal = up.emailReal
                };

                user.EmailConfirmed = true;

                var result = await _userManager.CreateAsync(user, up.password);
                if (result.Succeeded)
                {
                    
                    _logger.LogInformation("User created a new account with password.");                    

                    // add user 
                    var refreshUser = _context.UserRefreshTokens.SingleOrDefault(u => u.Username == up.username);
                    if (refreshUser != null) return StatusCode(409);

                    _context.UserRefreshTokens.Add(new UserRefreshToken
                    {
                        Username = up.username,
                        Password = _passwordHasher.GenerateIdentityV3Hash(up.password)
                    });
                    await _adminService.postQuen(up.username, "Student");
                
                    refreshUser = _context.UserRefreshTokens.SingleOrDefault(u => u.Username == up.username);
                    
                    return new ObjectResult(new
                    {
                        message = true,
                        data = up
                    });
                }
                else
                {

                    //return BadRequest(string.Join(",", result.Errors.SelectMany(x => x.Description)));
                    return new ObjectResult(new
                    {
                        message = false,
                        data = "Tài khoản đã có hoặc mật khẩu không đúng định dạng Abc@123"
                    });
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost]
		[AllowAnonymous]
		public async Task<IActionResult> RefreshToken(string authenticationToken, string refreshToken)
		{
			var principal = _tokenService.GetPrincipalFromExpiredToken(authenticationToken);
			var username = principal.Identity.Name; //this is mapped to the Name claim by default

			var user = _context.UserRefreshTokens.SingleOrDefault(u => u.Username == username);
			if (user == null || user.RefreshToken != refreshToken) return BadRequest();

			var newJwtToken = _tokenService.GenerateAccessToken(principal.Claims);
			var newRefreshToken = _tokenService.GenerateRefreshToken();

			user.RefreshToken = newRefreshToken;
			await _context.SaveChangesAsync();

			return new ObjectResult(new
			{
				authenticationToken = newJwtToken,
				refreshToken = newRefreshToken
			});
		}

        [HttpPost]
        public async Task<IActionResult> ResetPassWord(string email, [FromBody] ResetPassModel rs)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return new ObjectResult(new
                {
                    message = false,
                    data = "Tài Khoản Không Tồn Tại"
                });
            }

            var result = await _userManager.ChangePasswordAsync(user, rs.passOld, rs.passNew);
            if (result.Succeeded)
            {
                return new ObjectResult(new
                {
                    message = true,
                    data = "Đổi Thành Công"
                });
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
            return new ObjectResult(new
            {
                message = false,
                data = "Không Đổi Được Mật Khẩu"
            });
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPass(string EmailReal,string username)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(username);

                if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return new ObjectResult(new
                    {
                        message = false,
                        data = "Tài Khoản Không Tồn Tại!!"
                    });
                }

                var isRealEmail = user.EmailReal.Equals(EmailReal);
                if(!isRealEmail)
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return new ObjectResult(new
                    {
                        message = false,
                        data = "Email Không Tồn Tại!!"
                    });
                }



                // For more information on how to enable account confirmation and password reset please 
                // visit https://go.microsoft.com/fwlink/?LinkID=532713
                try
                {
                
                    var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                    var callbackUrl = " http://localhost:3000/Account/ResetPassword?code=" + code;
                 

                    var message = new Message(new string[] { EmailReal }, "Reset Password", 
                        //$"Please reset your password by '{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");
                        $"Please reset your password by '{callbackUrl}'>clicking here</a>.");
                    _emailSender.SendEmail(message);


                    return new ObjectResult(new
                    {
                        message = true,
                        data = "Gửi Thành Công, Vui Lòng Vào Email Để Xác Nhận"
                    });
                }
                catch(Exception ex) 
                {
                    throw;
                }
            }

            return new ObjectResult(new
            {
                message = false,
                data = "Không Thành Công"
            });
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult>NewPass([FromBody] ResetPassModel rs)
        {
            var user = await _userManager.FindByEmailAsync(rs.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return new ObjectResult(new
                {
                    message = false,
                    data = "Email Không Tìm Thấy!!"
                });
            }
            var result = await _userManager.ResetPasswordAsync(user, rs.code, rs.passNew);
            if (result.Succeeded)
            {
                return new ObjectResult(new
                {
                    message = true,
                    data = "Đổi Thành Công!!"
                });
            }
            return new ObjectResult(new
            {
                message = false,
                data = "Không Đổi Được Mật Khẩu!!!"
            });
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);

                if (user != null)
                {
                    var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
                    if (result.Succeeded)
                    {
                        string role = findRole(model.Email);
                        var claims = new[]
                        {
                            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.Email, user.Email),
                            new Claim(ClaimTypes.Name, user.Email),
                            new Claim(ClaimTypes.Role, role)
                        };
                     

                        var token = _tokenService.GenerateAccessToken(claims);
                        var newRefreshToken = _tokenService.GenerateRefreshToken();
                        var e = user.Email;
                        var userRefreshToken = _context.UserRefreshTokens.Where(urt => urt.Username == user.Email).FirstOrDefault();
                        //userRefreshToken.RefreshToken = newRefreshToken;
                        await _context.SaveChangesAsync();

                        return new ObjectResult(new
                        {
                            message = true,
                            authenticationToken = token,
                            refreshToken = newRefreshToken,
                            email = e,
                        });
                    }
                }
            }

            return  new ObjectResult(new
            {
                message = false,
                data = "Sai Mật Khẩu"
            });
        }

        public string findRole(string username)
        {
            dbHocTapContext _dbContext = new dbHocTapContext();
            if (username.IsEmpty())
                return null;
            var data = from user in _dbContext.AspNetUsers
                       join userRole in _dbContext.AspNetUserRoles on user.Id equals userRole.UserId
                       join role in _dbContext.AspNetRoles on userRole.RoleId equals role.Id
                       where user.UserName == username
                       select new { user, role };

            string roleName = data.Select(t => t.role.Name).FirstOrDefault();
            return roleName;
        }

        [Authorize]
		public Task<string> GetName()
		{
			return Task.FromResult("dat");
		}
		//Xóa
        //[Authorize]
        //[HttpDelete("GetName/{id}")]
        //public Task<string> GetName(string id)
        //{
        //    return Task.FromResult("dat");
        //}
		//Thêm
    }
}