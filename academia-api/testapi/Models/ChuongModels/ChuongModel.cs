using System.Collections.Generic;
using testapi.Models.BaiHocModels;

namespace testapi.Models.ChuongModels
{
    public class ChuongModel
    {
        public int MaChuong { get; set; }
        public int? MaMh { get; set; }
        public string TenChuong { get; set; }


        public List<BaiHocModel> Baihoc { get; set; }

    }
}
