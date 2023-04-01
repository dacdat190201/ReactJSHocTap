using testapi.Entities;
using testapi.Models.MonHocModels;

namespace testapi.Models.UserModels
{
    public class CtHoaDonModel
    {
        public int MaDh { get; set; }
        public int MaMh { get; set; }
        public decimal? GiaBan { get; set; }
        public decimal? ThanhTien { get; set; }

        //public HoaDonModels MaDhNavigation { get; set; }
        public MonHocModel MaMhNavigation { get; set; }
    }
}
