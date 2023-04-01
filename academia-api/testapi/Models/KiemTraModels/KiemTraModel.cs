using System.Collections.Generic;
using testapi.Entities;
using testapi.Models.BaiLamModels;

namespace testapi.Models.KiemTraModels
{
    public class KiemTraModel
    {
        public int MaKt { get; set; }
        public string TenKt { get; set; }
        public int? MaHoc { get; set; }
        public int? MaDe { get; set; }
        public int? Diem { get; set; }
        public string Thoigian { get; set; }
        public string Id { get; set; }

     //   public AspNetUsers IdNavigation { get; set; }
       // public Dethi MaDeNavigation { get; set; }
        //public Hoc MaHocNavigation { get; set; }
        public List<BaiLamModel> Bailam { get; set; }
    }
}
