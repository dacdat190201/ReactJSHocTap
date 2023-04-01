using System.Collections.Generic;

namespace testapi.Models.MobileModels
{
    public class MobileCauHoiModel
    {
        public int MaCh { get; set; }
        public string TenCauHoi { get; set; }
        public string DapAn { get; set; }
        public string LoaiCauHoi { get; set; }
        public string GiaiThich { get; set; }
        public int? Type { get; set; }

        public List<MoblieCauTraLoiModel> dsCauTraLoi { get; set; }
    }
}
