using System;
using System.Collections.Generic;

namespace testapi.Entities
{
    public partial class Chuong
    {
        public Chuong()
        {
            Baihoc = new HashSet<Baihoc>();
            Dethi = new HashSet<Dethi>();
        }

        public int MaChuong { get; set; }
        public int? MaMh { get; set; }
        public string TenChuong { get; set; }

        public Monhoc MaMhNavigation { get; set; }
        public ICollection<Baihoc> Baihoc { get; set; }
        public ICollection<Dethi> Dethi { get; set; }
    }
}
