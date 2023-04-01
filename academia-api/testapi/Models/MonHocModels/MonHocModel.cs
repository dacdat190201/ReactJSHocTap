using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using testapi.Entities;
using testapi.Models.ChuDeModels;
using testapi.Models.ChuongModels;
using testapi.Models.LopHocModels;

namespace testapi.Models.MonHocModels
{
    public class MonHocModel
    {
        public int MaMH { get; set; }
        public string TenMH { get; set; }
        public string HinhAnh { get; set; }
        public int SoLuong { get; set; }
        public int GiaBan { get; set; }
        public int? MaChuDe { get; set; }
        public ChuDeModel MaChuDeNavigation { get; set; }
        public List<ChuongModel> Chuong { get; set; }
        public List<LopHocModel> LopHoc { get; set; }
        public IFormFile File { get; set; }

    }
}
