using System.Collections.Generic;
using testapi.Entities;
using testapi.Models.CauTraLoiModels;
using testapi.Models.DeThiCauHoiModels;

namespace testapi.Models.CauHoiModels
{
    public class CauHoiModel
    {
        public int MaCh { get; set; }
        public string TenCauHoi { get; set; }
        public string DapAn { get; set; }
        public string LoaiCauHoi { get; set; }
        public string GiaiThich { get; set; }
        public int? Type { get; set; }
        public List<CauTraLoiModel> CauTraLoi { get; set; }
    }
}
