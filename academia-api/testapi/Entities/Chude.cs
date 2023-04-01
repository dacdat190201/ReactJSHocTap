using System;
using System.Collections.Generic;

namespace testapi.Entities
{
    public partial class Chude
    {
        public Chude()
        {
            Monhoc = new HashSet<Monhoc>();
        }

        public int MaChuDe { get; set; }
        public string TenChuDe { get; set; }
        public string Images { get; set; }

        public ICollection<Monhoc> Monhoc { get; set; }
    }
}
