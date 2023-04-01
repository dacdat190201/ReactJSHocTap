using System.Collections.Generic;
using System;
using testapi.Entities;

namespace testapi.Models.UserModels
{
    public class HoaDonModels
    {
        public int MaDh { get; set; }
        public string Id { get; set; }
        public DateTime? NgayLap { get; set; }
        public decimal? TongTien { get; set; }
        public string TinhTrang { get; set; }

        //public AspNetUserModel IdNavigation { get; set; }
        public List<CtHoaDonModel> Cthoadon { get; set; }
    }
}
