using System.Collections.Generic;

namespace testapi.Models.KiemTraModels
{
    public class XepHangModel
    {
        public string ID { get; set; }
        public int? MaKT { get; set; }
        public string HoTen { get; set; }
        public string ImagesUser { get; set; }
        public string ThoiGian { get; set; }
        public int? Diem { get; set; }
        public List<string>colors { get; set; }
    }
}
