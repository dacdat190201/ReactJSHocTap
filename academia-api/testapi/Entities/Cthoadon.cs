using System;
using System.Collections.Generic;

namespace testapi.Entities
{
    public partial class Cthoadon
    {
        public int MaDh { get; set; }
        public int MaMh { get; set; }
        public decimal? GiaBan { get; set; }
        public decimal? ThanhTien { get; set; }

        public Hoadon MaDhNavigation { get; set; }
        public Monhoc MaMhNavigation { get; set; }
    }
}
