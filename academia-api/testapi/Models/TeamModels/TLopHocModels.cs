using System.Collections.Generic;
using testapi.Entities;

namespace testapi.Models.TeamModels
{
    public class TLopHocModels
    {
        public int MaLop { get; set; }
        public string TenLop { get; set; }
        public int? MaMh { get; set; }
        public int? MaGv { get; set; }

        //public TGiaoVienModels  MaGvNavigation { get; set; }
        public TMonHocModels MaMhNavigation { get; set; }
    }
}
