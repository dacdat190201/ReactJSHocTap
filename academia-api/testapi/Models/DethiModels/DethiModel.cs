using System.Collections.Generic;
using testapi.Entities;
using testapi.Models.BaiHocModels;
using testapi.Models.ChuongModels;
using testapi.Models.DeThiCauHoiModels;
using testapi.Models.KiemTraModels;
using testapi.Models.MonHocModels;

namespace testapi.Models.DethiModels
{
    public class DethiModel
    {
        public int MaDe { get; set; }
        public int? MaBh { get; set; }
        public int? MaChuong { get; set; }
        public int? MaMh { get; set; }
        public string TenDeThi { get; set; }
        public int? Thoigian { get; set; }
        public int? Soluong { get; set; }

      
        public List<DeThiCauHoiModel> Dethicauhoi { get; set; }
        public List<KiemTraModel> KiemTra { get; set; }

    }
}
