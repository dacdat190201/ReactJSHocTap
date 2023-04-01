using System.Collections.Generic;

namespace testapi.Models.TeamModels
{
    public class CauHoiModel
    {
        public int MaCh { get; set; }
        public string TenCauHoi { get; set; }
        public string DapAn { get; set; }
        public string LoaiCauHoi { get; set; }


        public List<CauTraLoiModel> Cautraloi { get; set; }
    }
}
