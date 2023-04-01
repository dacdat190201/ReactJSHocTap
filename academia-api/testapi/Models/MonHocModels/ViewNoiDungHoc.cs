using testapi.Entities;
using testapi.Models.ChuongModels;
using testapi.Models.LopHocModels;

namespace testapi.Models.MonHocModels
{
    public class ViewNoiDungHoc
    {
        public int MaMH { get; set; }
        public string TenMH { get; set; }
        public string HinhAnh { get; set; }
        public decimal? GiaBan { get; set; }

        public ViewChuongModel viewChuong { get; set; }
        public ViewLopHocModel viewLophoc { get; set; }
    }
}
