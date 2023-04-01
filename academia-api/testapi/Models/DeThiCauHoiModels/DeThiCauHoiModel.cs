using System.Collections.Generic;
using testapi.Entities;
using testapi.Models.CauHoiModels;

namespace testapi.Models.DeThiCauHoiModels
{
    public class DeThiCauHoiModel   
    {
        public int MaCh { get; set; }
        public int MaDe { get; set; }

        public CauHoiModel CauHoi { get; set; }
    }
}
