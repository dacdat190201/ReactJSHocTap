using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using testapi.Entities;
using testapi.Models.ChuongModels;

namespace testapi.Models.MobileModels
{
    public class MobileMonHocModel
    {
        public int MaMh { get; set; }
        public string TenMh { get; set; }
        public string HinhAnh { get; set; }
        public int? SoLuong { get; set; }
        public decimal? GiaBan { get; set; }
        public int? MaChuDe { get; set; }

        public List<ViewChuongModel> Chuong { get; set; }
        public IFormFile File { get; set; }
    }
}
