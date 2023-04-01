using System;
using System.Collections.Generic;

namespace testapi.Entities
{
    public partial class Lophoc
    {
        public int MaLop { get; set; }
        public string TenLop { get; set; }
        public int? MaMh { get; set; }
        public int? MaGv { get; set; }

        public Giaovien MaGvNavigation { get; set; }
        public Monhoc MaMhNavigation { get; set; }
    }
}
