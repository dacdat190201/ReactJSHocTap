using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.Xml;
using System.Threading.Tasks;
using testapi.Entities;
using testapi.Models.AdminModels;
using testapi.Models.AdminModels.PostAllUser;
using testapi.Models.API;
using testapi.Models.MonHocModels;

namespace testapi.Services.AdminService
{
    public class AdminService : IAdminService
    {
        private readonly dbHocTapContext _context;
        private readonly IMapper _mapper;
        const string Images_User = "AdminUser";
        public AdminService(dbHocTapContext context, IMapper mapper)
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
        private string UploadedPro(IFormFile model)
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
        public async Task<ApiResult<object>> UploadProduct(int maMh, MonHocModel mh)
        {
            try
            {
                Monhoc upMh = await _context.Monhoc.FirstAsync(x => x.MaMh == maMh);
                if (upMh != null)
                {

                    upMh.HinhAnh = UploadedPro(mh.File);


                    //_context.AspNetUsers.Update(upUser);
                    await _context.SaveChangesAsync();
                }
                return new ApiResult<object>(message: "true", data: new { upMh });                
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> EditMon(int maMh, MonHocModel mh)
        {
            try
            {

                Monhoc upmh = await _context.Monhoc.Where(x => x.MaMh == maMh).FirstOrDefaultAsync();
                if (upmh != null)
                {
                    upmh.TenMh = mh.TenMH;
                    upmh.GiaBan = mh.GiaBan;
                    upmh.MaChuDe = mh.MaChuDe;
                    //_context.AspNetUsers.Update(updateUser);
                    await _context.SaveChangesAsync();
                }

                return new ApiResult<object>(message: "true", data: new {upmh});                
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> AdminGetAllUser()
        {
            try
            {
                var dsUser = await _context.AspNetUsers.AsNoTracking().ToListAsync();
                int total = dsUser.Count;

                return new ApiResult<object>(message: "true", data: new {total, dsUser});
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> AdminGet5User()
        {
            try
            {
                var dsUser = await _context.AspNetUsers.AsNoTracking().Take(5).OrderByDescending(x => x.MaSinhVien).ToListAsync();
                int total = dsUser.Count;

                return new ApiResult<object>(message: "true", data: new { total, dsUser });                
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> AdminGetUser(int MaSV)
        {
            try
            {
                var user = await _context.AspNetUsers.FirstOrDefaultAsync(x => x.MaSinhVien == MaSV);

                return new ApiResult<object>(message: "true", data: new { user });                

            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> DelAdminUser(string id)
        {
            try
            {
                List<AspNetUserRoles> role = _context.AspNetUserRoles.Where(x=>x.UserId == id).ToList();
                AspNetUsers user = await _context.AspNetUsers.FindAsync(id);
              
                if (user != null)
                {
                    if(role!=null)
                    {
                        _context.AspNetUserRoles.RemoveRange(role);
                    }    
                    _context.AspNetUsers.Remove(user);
                    await _context.SaveChangesAsync();
                }

                return new ApiResult<object>(message: "true", data: user);                
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> UpdateUser(int MaSV, UserView user)
        {
            try
            {
                AspNetUsers upUser = await _context.AspNetUsers.FirstAsync(x => x.MaSinhVien == MaSV);
                if (upUser != null)
                {
                    upUser.HoTen = user.HoTen;
                    upUser.PhoneNumber = user.PhoneNumber;
                    upUser.ImagesUser = UploadedFile(user.File);
                    upUser.EmailReal = user.EmailReal;
                    upUser.DiaChi = user.DiaChi;

                    //_context.AspNetUsers.Update(upUser);
                    await _context.SaveChangesAsync();
                }

                return new ApiResult<object>(message: "true", data: new { upUser });                
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> UpdateQuyen(string email, string quyen)
        {
            try
            {
                AspNetUsers user = await _context.AspNetUsers.FirstAsync(x => x.Email == email);
                AspNetRoles role = await _context.AspNetRoles.FirstAsync(x => x.Name.ToLower() == quyen.ToLower());

                if (user != null && role != null)
                {
                    AspNetUserRoles upRole = await _context.AspNetUserRoles.FirstAsync(t => t.UserId == user.Id);
                    _context.AspNetUserRoles.Remove(upRole);
                    await _context.SaveChangesAsync();

                    upRole.RoleId = role.Id;
                    upRole.Role = role;

                    _context.AspNetUserRoles.Add(upRole);
                    await _context.SaveChangesAsync();
                }
                return new ApiResult<object>(message: "true", data: true);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> postQuen(string email, string name)
        {
            try
            {
                AspNetUsers user = await _context.AspNetUsers.FirstAsync(x => x.Email == email);
                AspNetRoles role = await _context.AspNetRoles.FirstAsync(x => x.Name.ToLower() == name.ToLower());                
                if (user != null && role != null)
                {
                    var upRole = _context.AspNetUserRoles.Add( new AspNetUserRoles()
                    {
                        UserId = user.Id,
                        RoleId = role.Id
                    });
                    await _context.SaveChangesAsync();

                    return new ApiResult<object>(message: "true", data: new { upRole  });                    
                }
                return new ApiResult<object>(message: "false", data: null);
            }
            catch (Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
        }
        public async Task<ApiResult<object>> GetAllQuyen()
        {
            try
            {
                var data = from user in _context.AspNetUsers
                           join userRole in _context.AspNetUserRoles on user.Id equals userRole.UserId
                           join role in _context.AspNetRoles on userRole.RoleId equals role.Id
                           select new { user, role };
                var lstQuen = data.Select(t => new QuyenModel()
                {
                    UserId = t.user.Id,
                    RoleId = t.role.Id,
                    UserName = t.user.UserName,
                    HoTen = t.user.HoTen,
                    RoleName = t.role.Name
                }).ToList();
                return new ApiResult<object>(message: "true", data: lstQuen);
            }
            catch (Exception ex)
            { return new ApiResult<object>(message: "false", data: null); }
        }

    }
}
