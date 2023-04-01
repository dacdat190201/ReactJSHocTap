using System.Collections.Generic;
using System;
using testapi.Entities;
using Microsoft.AspNetCore.Http;

namespace testapi.Models.AdminModels.PostAllUser
{
    public class UserView
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string ImagesUser { get; set; }
        public string Email { get; set; }
        public string NormalizedEmail { get; set; }
        public bool EmailConfirmed { get; set; }
        public string PasswordHash { get; set; }
        public string SecurityStamp { get; set; }
        public string ConcurrencyStamp { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public DateTimeOffset? LockoutEnd { get; set; }
        public bool LockoutEnabled { get; set; }
        public int AccessFailedCount { get; set; }
        public int MaSinhVien { get; set; }
        public string NormalizedUserName { get; set; }
        public string HoTen { get; set; }
        public string DiaChi { get; set; }
        public string EmailReal { get; set; }
        public IFormFile File { get; set; }
    }
}
