using System;
using System.Collections.Generic;

namespace testapi.Entities
{
    public partial class Baihoc
    {
        public Baihoc()
        {
            Dethi = new HashSet<Dethi>();
            Lichsuhoc = new HashSet<Lichsuhoc>();
        }

        public int MaBh { get; set; }
        public string TenBh { get; set; }
        public int? MaChuong { get; set; }
        public string NoiDung { get; set; }

        public Chuong MaChuongNavigation { get; set; }
        public ICollection<Dethi> Dethi { get; set; }
        public ICollection<Lichsuhoc> Lichsuhoc { get; set; }
    }
}
