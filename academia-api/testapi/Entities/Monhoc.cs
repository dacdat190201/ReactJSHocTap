using System;
using System.Collections.Generic;

namespace testapi.Entities
{
    public partial class Monhoc
    {
        public Monhoc()
        {
            Chuong = new HashSet<Chuong>();
            Cthoadon = new HashSet<Cthoadon>();
            Dethi = new HashSet<Dethi>();
            Giohang = new HashSet<Giohang>();
            Lophoc = new HashSet<Lophoc>();
        }

        public int MaMh { get; set; }
        public string TenMh { get; set; }
        public string HinhAnh { get; set; }
        public int? SoLuong { get; set; }
        public decimal? GiaBan { get; set; }
        public int? MaChuDe { get; set; }

        public Chude MaChuDeNavigation { get; set; }
        public ICollection<Chuong> Chuong { get; set; }
        public ICollection<Cthoadon> Cthoadon { get; set; }
        public ICollection<Dethi> Dethi { get; set; }
        public ICollection<Giohang> Giohang { get; set; }
        public ICollection<Lophoc> Lophoc { get; set; }
    }
}
