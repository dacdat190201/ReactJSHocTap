using testapi.Entities;
using testapi.Models.GiaoVienModels;
using testapi.Models.MonHocModels;

namespace testapi.Models.LopHocModels
{
    public class LopHocModel
    {
        public int MaLop { get; set; }
        public string TenLop { get; set; }
        public int? MaMh { get; set; }
        public int? MaGv { get; set; }
    
        public GiaoVienModel GiaoVien { get; set; }
       
    }
}
