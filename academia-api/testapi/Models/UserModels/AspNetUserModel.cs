using System.Collections.Generic;
using System;
using testapi.Entities;

namespace testapi.Models.UserModels
{
    public class AspNetUserModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string TenHocSinh { get; set; }
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

        public List<HoaDonModels> Hoadon { get; set; }
       // public ICollection<Hoc> Hoc { get; set; }
        //public ICollection<Kiemtra> Kiemtra { get; set; }
    }
}
