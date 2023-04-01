using System;
using System.Collections.Generic;

namespace testapi.Entities
{
    public partial class Hoadon
    {
        public Hoadon()
        {
            Cthoadon = new HashSet<Cthoadon>();
        }

        public int MaDh { get; set; }
        public string Id { get; set; }
        public DateTime? NgayLap { get; set; }
        public decimal? TongTien { get; set; }
        public string TinhTrang { get; set; }

        public AspNetUsers IdNavigation { get; set; }
        public ICollection<Cthoadon> Cthoadon { get; set; }
    }
}
