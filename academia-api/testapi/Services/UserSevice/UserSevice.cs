using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
using testapi.Entities;
using testapi.Models.API;
using testapi.Models.MonHocModels;
using testapi.Services.ChuongService;
using System.Linq;
using testapi.Models.UserModels;
using testapi.Models.AdminModels.PostAllUser;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace testapi.Services.UserSevice
{
    public class UserSevice : IUserSevice
    {
        private readonly dbHocTapContext _context;
        private readonly IMapper _mapper;
        public UserSevice(dbHocTapContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        private string UploadedFile(IFormFile model)
        {
            string uniqueFileName = null;

            if (model != null)
            {
                string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images");
                var extensionName = Path.GetExtension(model.FileName);
                uniqueFileName = Guid.NewGuid().ToString() + extensionName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    model.CopyTo(fileStream);
                }
            }
            return uniqueFileName;
        }
        public async Task<ApiResult<object>> MonhocByUser(string email)
        {
            try
            {
                //var monhoc = _context.Monhoc.Include(x => x.Chuong).ThenInclude(x => x.Baihoc)
                //    .Include(x => x.Lophoc).ThenInclude(x => x.MaGvNavigation).Where(x => x.MaMh == MaMH).First();
                var monhocByUser = _context.AspNetUsers.Include(x => x.Hoadon).ThenInclude(x => x.Cthoadon).ThenInclude(x => x.MaMhNavigation)
                    .Where(x => x.Email == email).First();
                monhocByUser.Hoadon.Where(t => t.TinhTrang == "Đã Thanh Toán").First();
                int total = 0;

                var result = _mapper.Map<AspNetUserModel>(monhocByUser);

                return new ApiResult<object>(message: "true", data: new { total, result });
            }
            catch (Exception ex) { return new ApiResult<object>(message: "false", data: null);  }
        }
        public async Task<ApiResult<object>> ProfileUser(string email)
        {
            try
            {
                var data = await _context.AspNetUsers.FirstOrDefaultAsync(x => x.Email == email);

                return new ApiResult<object>(message: "true", data: data);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> UploadImages(string email, UserView user)
        {
            try
            {
                var data = await _context.AspNetUsers.FirstAsync(x => x.Email == email);
                if (data != null)
                {

                    data.ImagesUser = UploadedFile(user.File);


                    //_context.AspNetUsers.Update(upUser);
                    await _context.SaveChangesAsync();
                }
                return new ApiResult<object>("true", true);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> EditUser(string email, UserView user)
        {
            try
            {

                var data = await _context.AspNetUsers.Where(x => x.Email == email).FirstOrDefaultAsync();
                if (data != null)
                {
                    data.DiaChi = user.DiaChi;
                    data.PhoneNumber = user.PhoneNumber;
                    data.EmailReal = user.EmailReal;
                    data.HoTen = user.HoTen;
                    //_context.AspNetUsers.Update(updateUser);
                    await _context.SaveChangesAsync();
                }
                return new ApiResult<object>("true", true) ;
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }

    }
}
