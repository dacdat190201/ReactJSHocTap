using System;
using System.Collections.Generic;
using testapi.Entities;
using testapi.Models.AspNetUsers;

namespace testapi.Models.DonHangModels
{
    public class HoaDonModel
    {
        public int MaDh { get; set; }
        public string Id { get; set; }
        public DateTime? NgayLap { get; set; }
        public decimal? TongTien { get; set; }
        public string TinhTrang { get; set; }
        public AspNetUsersModel IdNavigation { get; set; }

        public List<CTHoaDonModel> Cthoadon { get; set; }
    }
}
