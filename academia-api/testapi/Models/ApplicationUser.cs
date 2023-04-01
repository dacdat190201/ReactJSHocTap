﻿using Microsoft.AspNetCore.Identity;

namespace testapi.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string HoTen { get; set; }
        public string DiaChi { get; set; }
        public string EmailReal { get; set; }
    }
}
