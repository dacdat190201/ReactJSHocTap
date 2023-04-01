using System.Collections.Generic;

namespace testapi.Models.MobileModels
{
    public class MobileDeThiModel
    {
        public int MaDe { get; set; }
        public int? MaBh { get; set; }
        public int? MaChuong { get; set; }
        public int? MaMh { get; set; }
        public string TenDeThi { get; set; }
        public int? Thoigian { get; set; }
        public int? Soluong { get; set; }

        public List<MobileCauHoiModel> dsCauHoi { get; set; }
    }
}
