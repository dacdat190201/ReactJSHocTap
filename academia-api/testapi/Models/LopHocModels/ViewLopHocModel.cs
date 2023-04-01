using testapi.Entities;

namespace testapi.Models.LopHocModels
{
    public class ViewLopHocModel
    {
        public int MaLop { get; set; }
        public string TenLop { get; set; }
        public int? MaMh { get; set; }
        public int? MaGv { get; set; }
        
        public Giaovien giaovien { get; set; }
    }
}
