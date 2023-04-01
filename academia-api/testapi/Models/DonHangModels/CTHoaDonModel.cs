using testapi.Models.MonHocModels;

namespace testapi.Models.DonHangModels
{
    public class CTHoaDonModel
    {
        public int MaDh { get; set; }
        public int MaMh { get; set; }
        public decimal? GiaBan { get; set; }
        public decimal? ThanhTien { get; set; }
        public MonHocModel MaMhNavigation { get; set; }
    }
}
