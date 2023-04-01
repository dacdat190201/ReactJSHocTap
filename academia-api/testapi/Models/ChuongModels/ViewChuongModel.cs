using testapi.Entities;

namespace testapi.Models.ChuongModels
{
    public class ViewChuongModel
    {
        public int MaChuong { get; set; }
        public int? MaMh { get; set; }
        public string TenChuong { get; set; }

        public Baihoc baihoc { get; set;}
    }
}
